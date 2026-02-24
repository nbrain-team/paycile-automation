import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import { sendSms } from './services/smsProvider';
import { createProspect as bonzoCreateProspect, optInProspect as bonzoOptIn } from './services/bonzoApi';
import { generateTtsMp3 } from './services/elevenLabs';
import { storeVoicemailMp3, getVoicemailMp3 } from './services/mediaStore';
import { sendVoicemailDrop } from './services/voicemailProvider';
import { generateInboxResponse, generateResponseOptions } from './inbox-ai-generator';
import { searchPeople, searchOrganizations } from './services/apolloApi';
import { sendGraphEmail, isGraphConfigured } from './services/graphEmailProvider';
import { startEmailQueueWorker, queueBulkEmails, getQueueStats } from './services/emailQueue';
import { generateCampaign, refineContent, generateVariations } from './ai-campaign-builder';
import { personalizeContent, PersonalizationContact } from './ai-personalizer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
dotenv.config();

// Extend Express Request type to include user property from JWT
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();
app.use(cors({
  origin: [
    'https://paycile-automation.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();

// Auth helpers
function requireEnv(name: string): string {
  const v = (process.env as any)[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v as string;
}

// Add unsubscribe link to email body
function addUnsubscribeLink(emailBody: string, contactId: string, companyAddress?: string): string {
  const baseUrl = process.env.BASE_URL || 'https://adtv-events-server.onrender.com';
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${contactId}`;
  
  const address = companyAddress || '123 Main Street, Suite 100, City, ST 12345';
  
  const footer = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
      <p style="margin: 5px 0;">${address}</p>
      <p style="margin: 5px 0;">
        <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a> from this list
      </p>
    </div>
  `;
  
  // If email already has closing body/html tags, insert before them
  if (emailBody.includes('</body>')) {
    return emailBody.replace('</body>', `${footer}</body>`);
  } else if (emailBody.includes('</html>')) {
    return emailBody.replace('</html>', `${footer}</html>`);
  } else {
    // Otherwise just append
    return emailBody + footer;
  }
}

function authMiddleware(req: any, _res: any, next: any) {
  try {
    const hdr = (req.headers['authorization'] || '').toString();
    const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : '';
    if (token) {
      const decoded: any = jwt.verify(token, requireEnv('JWT_SECRET'));
      req.user = decoded;
    }
  } catch {}
  next();
}

app.use(authMiddleware);

// Content templates loader (CSV from repo root), with simple cache
type ContentTemplate = { id: string; type: 'email'|'sms'|'voicemail'; name: string; subject?: string; body?: string; text?: string; tts_script?: string };
let contentTemplatesCache: { at: number; items: ContentTemplate[] } | null = null;

function resolveTemplatesCsvPath(): string | null {
  const candidates = [
    // When running from built dist (apps/server/dist/src)
    path.resolve(__dirname, '../../../../templates.csv'),
    // When running with cwd at apps/server
    path.resolve(process.cwd(), '../../templates.csv'),
    // Fallbacks
    path.resolve(process.cwd(), '../templates.csv'),
    path.resolve(process.cwd(), 'templates.csv'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}
async function loadContentTemplates(): Promise<ContentTemplate[]> {
  try {
    // Prefer DB-backed content templates
    const dbItems = await prisma.contentTemplate.findMany({ orderBy: { createdAt: 'desc' } }) as any[];
    if (Array.isArray(dbItems) && dbItems.length) {
      return dbItems.map((t) => ({ id: t.id, type: t.type, name: t.name, subject: t.subject || undefined, body: t.body || undefined, text: t.text || undefined, tts_script: t.ttsScript || undefined }));
    }
    const now = Date.now();
    if (contentTemplatesCache && now - contentTemplatesCache.at < 60_000) return contentTemplatesCache.items;
    const csvPath = resolveTemplatesCsvPath();
    if (!csvPath) {
      contentTemplatesCache = { at: now, items: [] };
      return [];
    }
    const csv = fs.readFileSync(csvPath, 'utf8');
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true } as any);
    if ((parsed as any).errors && (parsed as any).errors.length) {
      contentTemplatesCache = { at: now, items: [] };
      return [];
    }
    const rows: any[] = Array.isArray((parsed as any).data) ? ((parsed as any).data as any[]) : [];
    const items = rows
      .map((row) => {
        const name = String(row.Name || row.name || '').trim();
        const content = String(row.Content || row.content || '').trim();
        const typeRaw = String(row.Type || row.type || '').trim().toLowerCase();
        if (!name || !content || !typeRaw) return null;
        let type: 'email'|'sms'|'voicemail' | null = null;
        if (typeRaw.startsWith('email')) type = 'email';
        else if (typeRaw.startsWith('sms')) type = 'sms';
        else if (typeRaw.startsWith('voice')) type = 'voicemail';
        if (!type) return null;
        const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const id = `ct_${slugify(name)}_${type}`;
        if (type === 'email') {
          const match = content.match(/^\s*Subject\s*:\s*(.*)$/mi);
          if (match) {
            const subject = (match[1] || '').trim();
            const body = content.replace(match[0], '').trim();
            return { id, type, name, subject, body } as ContentTemplate;
          }
          return { id, type, name, body: content } as ContentTemplate;
        }
        if (type === 'sms') return { id, type, name, text: content } as ContentTemplate;
        return { id, type, name, tts_script: content } as ContentTemplate;
      })
      .filter(Boolean) as ContentTemplate[];
    // De-duplicate by id
    const byId: Record<string, ContentTemplate> = {};
    for (const it of items) if (!byId[it.id]) byId[it.id] = it;
    const out = Object.values(byId);
    // Also seed DB once if empty
    try {
      const count = await prisma.contentTemplate.count();
      if (count === 0 && out.length) {
        await prisma.contentTemplate.createMany({ data: out.map((t) => ({ id: t.id, type: t.type, name: t.name, subject: t.subject || null, body: t.body || null, text: t.text || null, ttsScript: t.tts_script || null })) });
      }
    } catch {}
    contentTemplatesCache = { at: now, items: out };
    return out;
  } catch {
    return [];
  }
}

function renderMergeTags(input: string, ctx: Record<string, any>): string {
  if (!input) return '';
  return input.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_m, key) => {
    const path = String(key || '').trim().split('.');
    let cur: any = ctx;
    for (const p of path) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]; else return '';
    }
    return String(cur ?? '');
  });
}

function splitName(full: string): { first_name: string; last_name: string } {
  const raw = String(full || '').trim();
  if (!raw) return { first_name: '', last_name: '' };
  const parts = raw.split(/\s+/);
  const first = parts.shift() || '';
  const last = parts.join(' ');
  return { first_name: first, last_name: last };
}

async function resolveSmsTextFromConfig(config: any): Promise<string> {
  try {
    if (config?.template_id) {
      const templates = await loadContentTemplates();
      const t = templates.find((x) => x.id === config.template_id && x.type === 'sms');
      if (t?.text) return String(t.text);
      // Template specified but not found: strict mode -> empty
      // eslint-disable-next-line no-console
      console.warn('[execute] SMS template not found or empty for id:', config.template_id);
      return '';
    }
    // No template selected: allow custom content
    if (config?.text) return String(config.text);
    if (config?.message) return String(config.message);
    if (config?.content?.text) return String(config.content.text);
  } catch {}
  return '';
}

async function resolveEmailFromConfig(config: any): Promise<{ subject: string; body: string }> {
  try {
    if (config?.template_id) {
      const templates = await loadContentTemplates();
      const t = templates.find((x) => x.id === config.template_id && x.type === 'email');
      if (t) return { subject: String(t.subject || ''), body: String(t.body || '') };
      // eslint-disable-next-line no-console
      console.warn('[execute] Email template not found for id:', config.template_id);
      return { subject: '', body: '' };
    }
    // Format B: nested content object
    if (config?.content && (config.content.subject || config.content.body)) {
      return { subject: String(config.content.subject || ''), body: String(config.content.body || '') };
    }
    if (config?.content?.text) {
      return { subject: '', body: String(config.content.text) };
    }
    // Format C: top-level subject/body (AI builder legacy format)
    if (config?.subject || config?.body) {
      return { subject: String(config.subject || ''), body: String(config.body || '') };
    }
  } catch {}
  return { subject: '', body: '' };
}

async function resolveVoicemailScriptFromConfig(config: any): Promise<string> {
  try {
    if (config?.template_id) {
      const templates = await loadContentTemplates();
      const t = templates.find((x) => x.id === config.template_id && x.type === 'voicemail');
      if (t?.tts_script) return String(t.tts_script);
      // eslint-disable-next-line no-console
      console.warn('[execute] Voicemail template not found for id:', config.template_id);
      return '';
    }
    if (config?.tts?.custom_script) return String(config.tts.custom_script);
    // Format C: top-level ttsScript (AI builder legacy format)
    if (config?.ttsScript) return String(config.ttsScript);
  } catch {}
  return '';
}
// Outbound SMS via provider adapter (Bonzo/Twilio)
app.post('/api/sms/send', async (req, res) => {
  try {
    const candidate: any = (typeof (req as any).body === 'string'
      ? (()=> { try { return JSON.parse((req as any).body || '{}'); } catch { return {}; } })()
      : ((req as any).body && Object.keys((req as any).body||{}).length ? (req as any).body : (req as any).query)) || {};
    const body = z.object({ to: z.string().optional(), text: z.string().min(1), contactId: z.string().optional() }).parse(candidate);
    let toNumber = body.to || '';
    if (!toNumber && body.contactId) {
      const contact = await prisma.contact.findUnique({ where: { id: body.contactId } });
      toNumber = contact?.phone || '';
    }
    // normalize E.164 best-effort for US numbers
    if (toNumber && !/^\+\d+$/i.test(toNumber)) {
      const digits = toNumber.replace(/\D/g, '');
      if (digits.length === 10) toNumber = `+1${digits}`;
      else if (digits.length === 11 && digits.startsWith('1')) toNumber = `+${digits}`;
    }
    if (!toNumber) {
      return res.status(400).json({ error: 'Missing destination number' });
    }
    // Ensure conversation exists and log message regardless of Twilio status (so Inbox shows activity)
    let convoId: string | null = null;
    if (body.contactId) {
      let convo = await prisma.conversation.findFirst({ where: { contactId: body.contactId, channel: 'sms' } });
      if (!convo) convo = await prisma.conversation.create({ data: { contactId: body.contactId, channel: 'sms' } });
      convoId = convo.id;
    }

    const result = await sendSms({ to: toNumber, text: body.text });
    const sent = result.sent;
    const sid = result.sid;

    if (convoId) {
      await prisma.message.create({ data: { conversationId: convoId, direction: 'out', text: body.text } });
    }

    res.json({ ok: true, sent, sid, provider: (process.env.SMS_PROVIDER||'').toLowerCase()|| (sent ? 'twilio' : 'mock'), simulated: !sent });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'send error' });
  }
});

// Check Twilio message status
app.get('/api/sms/status/:sid', async (req, res) => {
  try {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env as any;
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      return res.status(400).json({ error: 'Missing Twilio env' });
    }
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const m = await client.messages(req.params.sid).fetch();
    res.json({ sid: m.sid, status: m.status, to: m.to, from: m.from, errorCode: m.errorCode, errorMessage: m.errorMessage });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'status error' });
  }
});



// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Email queue stats
app.get('/api/email-queue/stats', async (_req, res) => {
  try {
    const stats = await getQueueStats();
    res.json(stats);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'error' });
  }
});

// Serve temp-hosted TTS mp3s (in-memory, ephemeral). Not for production.
app.get('/media/vm/:id.mp3', async (req, res) => {
  const buf = getVoicemailMp3(String(req.params.id || ''));
  if (!buf) return res.status(404).end();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(buf);
});

// Dev-only: upload a raw MP3 and get a public URL for Slybroadcast testing
app.post('/media/upload/raw', express.raw({ type: '*/*', limit: '100mb' }), async (req, res) => {
  try {
    const bodyBuf = Buffer.isBuffer((req as any).body) ? (req as any).body : Buffer.from((req as any).body || '');
    if (!bodyBuf || bodyBuf.length === 0) return res.status(400).json({ error: 'empty body' });
    const id = storeVoicemailMp3(bodyBuf);
    const base = (process.env.PUBLIC_BASE_URL || (((req.headers['x-forwarded-proto'] || req.protocol) + '://' + req.get('host'))));
    const url = `${String(base).replace(/\/$/, '')}/media/vm/${id}.mp3`;
    res.json({ url });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'upload failed' });
  }
});

// Templates
app.get('/api/templates', async (_req, res) => {
  const list = await prisma.template.findMany({ include: { nodes: true, edges: true } });
  res.json(list);
});

app.post('/api/templates', async (req, res) => {
  const body = z.object({ name: z.string(), graph: z.object({ nodes: z.array(z.any()), edges: z.array(z.any()) }) }).parse(req.body);
  const created = await prisma.template.create({ data: { name: body.name, nodes: { create: body.graph.nodes.map((n: any)=> ({ key: n.id, type: n.type, name: n.name, configJson: n.config?JSON.stringify(n.config):null })) }, edges: { create: body.graph.edges.map((e: any)=> ({ fromKey: e.from, toKey: e.to, conditionJson: e.condition?JSON.stringify(e.condition):null })) } } });
  res.json(created);
});

app.get('/api/templates/:id', async (req, res) => {
  const tpl = await prisma.template.findUnique({ where: { id: req.params.id }, include: { nodes: true, edges: true } });
  if (!tpl) return res.status(404).json({ error: 'Not found' });
  res.json(tpl);
});

app.put('/api/templates/:id/graph', async (req, res) => {
  const body = z.object({ nodes: z.array(z.any()), edges: z.array(z.any()) }).parse(req.body);
  // Replace nodes/edges transactionally
  await prisma.$transaction([
    prisma.node.deleteMany({ where: { templateId: req.params.id } }),
    prisma.edge.deleteMany({ where: { templateId: req.params.id } }),
    prisma.node.createMany({ data: body.nodes.map((n: any)=> ({ id: n._id || undefined, templateId: req.params.id, key: n.id, type: n.type, name: n.name, configJson: n.config?JSON.stringify(n.config):null, posX: n.pos?.x ?? null, posY: n.pos?.y ?? null })) }),
    prisma.edge.createMany({ data: body.edges.map((e: any)=> ({ id: e._id || undefined, templateId: req.params.id, fromKey: e.from, toKey: e.to, conditionJson: e.condition?JSON.stringify(e.condition):null })) })
  ]);
  const tpl = await prisma.template.findUnique({ where: { id: req.params.id }, include: { nodes: true, edges: true } });
  res.json(tpl);
});

// Delete template
app.delete('/api/templates/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Detach campaigns that reference this template (keep their cloned campaign graph intact)
    await prisma.campaign.updateMany({ where: { templateId: id }, data: { templateId: null } });
    await prisma.$transaction([
      prisma.node.deleteMany({ where: { templateId: id } }),
      prisma.edge.deleteMany({ where: { templateId: id } }),
      prisma.template.delete({ where: { id } }),
    ]);
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'delete error' });
  }
});

// Duplicate template
app.post('/api/templates/:id/duplicate', async (req, res) => {
  try {
    const id = req.params.id;
    const body = z.object({ name: z.string() }).parse(req.body);
    
    // Fetch the original template with nodes and edges
    const original = await prisma.template.findUnique({
      where: { id },
      include: { nodes: true, edges: true }
    });
    
    if (!original) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    // Create the duplicate template with all nodes and edges
    const duplicate = await prisma.template.create({
      data: {
        name: body.name,
        status: original.status,
        version: 1, // Start at version 1 for the duplicate
        nodes: {
          create: original.nodes.map((n: any) => ({
            key: n.key,
            type: n.type,
            name: n.name,
            configJson: n.configJson,
            posX: n.posX,
            posY: n.posY
          }))
        },
        edges: {
          create: original.edges.map((e: any) => ({
            fromKey: e.fromKey,
            toKey: e.toKey,
            conditionJson: e.conditionJson
          }))
        }
      },
      include: { nodes: true, edges: true }
    });
    
    res.json(duplicate);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'duplicate error' });
  }
});

// Template Versions - List all versions for a template
app.get('/api/templates/:id/versions', async (req, res) => {
  try {
    const versions = await prisma.templateVersion.findMany({
      where: { baseTemplateId: req.params.id },
      include: { campaign: { select: { id: true, name: true, createdAt: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(versions.map(v => ({
      id: v.id,
      versionName: v.versionName,
      description: v.description,
      createdBy: v.createdBy,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
      campaign: v.campaign,
      nodesCount: JSON.parse(v.nodesJson || '[]').length,
      edgesCount: JSON.parse(v.edgesJson || '[]').length,
    })));
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'fetch error' });
  }
});

// Get specific template version with full data
app.get('/api/templates/:templateId/versions/:versionId', async (req, res) => {
  try {
    const version = await prisma.templateVersion.findUnique({
      where: { id: req.params.versionId },
      include: { campaign: true, baseTemplate: true }
    });
    if (!version) return res.status(404).json({ error: 'Version not found' });
    res.json({
      ...version,
      nodes: JSON.parse(version.nodesJson || '[]'),
      edges: JSON.parse(version.edgesJson || '[]'),
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'fetch error' });
  }
});

// Create a new template version (from campaign customization)
app.post('/api/templates/:id/versions', async (req, res) => {
  try {
    const body = z.object({
      versionName: z.string(),
      description: z.string().optional(),
      campaignId: z.string().optional(),
      nodes: z.array(z.any()),
      edges: z.array(z.any()),
      createdBy: z.string().optional(),
    }).parse(req.body);
    
    const version = await prisma.templateVersion.create({
      data: {
        baseTemplateId: req.params.id,
        versionName: body.versionName,
        description: body.description,
        campaignId: body.campaignId,
        nodesJson: JSON.stringify(body.nodes),
        edgesJson: JSON.stringify(body.edges),
        createdBy: body.createdBy,
      }
    });
    
    res.json({
      ...version,
      nodes: JSON.parse(version.nodesJson),
      edges: JSON.parse(version.edgesJson),
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'create error' });
  }
});

// Update template version
app.patch('/api/templates/:templateId/versions/:versionId', async (req, res) => {
  try {
    const body = z.object({
      versionName: z.string().optional(),
      description: z.string().optional(),
      nodes: z.array(z.any()).optional(),
      edges: z.array(z.any()).optional(),
    }).parse(req.body);
    
    const data: any = {};
    if (body.versionName) data.versionName = body.versionName;
    if (body.description !== undefined) data.description = body.description;
    if (body.nodes) data.nodesJson = JSON.stringify(body.nodes);
    if (body.edges) data.edgesJson = JSON.stringify(body.edges);
    
    const version = await prisma.templateVersion.update({
      where: { id: req.params.versionId },
      data
    });
    
    res.json({
      ...version,
      nodes: JSON.parse(version.nodesJson),
      edges: JSON.parse(version.edgesJson),
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'update error' });
  }
});

// Delete template version
app.delete('/api/templates/:templateId/versions/:versionId', async (req, res) => {
  try {
    await prisma.templateVersion.delete({ where: { id: req.params.versionId } });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'delete error' });
  }
});

// Export template or version to CSV
app.get('/api/templates/:id/export/csv', async (req, res) => {
  try {
    const versionId = req.query.versionId as string | undefined;
    let nodes: any[] = [];
    let edges: any[] = [];
    let templateName = 'template';
    
    if (versionId) {
      const version = await prisma.templateVersion.findUnique({
        where: { id: versionId },
        include: { baseTemplate: true }
      });
      if (!version) return res.status(404).json({ error: 'Version not found' });
      nodes = JSON.parse(version.nodesJson || '[]');
      edges = JSON.parse(version.edgesJson || '[]');
      templateName = `${version.baseTemplate.name}_${version.versionName}`;
    } else {
      const template = await prisma.template.findUnique({
        where: { id: req.params.id },
        include: { nodes: true, edges: true }
      });
      if (!template) return res.status(404).json({ error: 'Template not found' });
      nodes = template.nodes.map(n => ({
        id: n.key,
        type: n.type,
        name: n.name,
        config: n.configJson ? JSON.parse(n.configJson) : {},
        pos: (n.posX != null && n.posY != null) ? { x: n.posX, y: n.posY } : undefined
      }));
      edges = template.edges.map(e => ({
        from: e.fromKey,
        to: e.toKey,
        condition: e.conditionJson ? JSON.parse(e.conditionJson) : {}
      }));
      templateName = template.name;
    }
    
    // Build CSV with columns: NodeID, NodeType, NodeName, ConfigJSON, FromNode, ToNode, EdgeConditionJSON
    const rows: string[] = ['NodeID,NodeType,NodeName,ConfigJSON,PosX,PosY,EdgeFrom,EdgeTo,EdgeConditionJSON'];
    
    // Map node IDs to their data
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    
    // Create rows for each node with its outgoing edges
    for (const node of nodes) {
      const outgoingEdges = edges.filter(e => e.from === node.id);
      
      if (outgoingEdges.length === 0) {
        // Node with no outgoing edges
        rows.push([
          `"${node.id}"`,
          `"${node.type}"`,
          `"${node.name}"`,
          `"${JSON.stringify(node.config || {}).replace(/"/g, '""')}"`,
          node.pos?.x || '',
          node.pos?.y || '',
          '',
          '',
          ''
        ].join(','));
      } else {
        // Node with outgoing edges - create a row for each edge
        for (const edge of outgoingEdges) {
          rows.push([
            `"${node.id}"`,
            `"${node.type}"`,
            `"${node.name}"`,
            `"${JSON.stringify(node.config || {}).replace(/"/g, '""')}"`,
            node.pos?.x || '',
            node.pos?.y || '',
            `"${edge.from}"`,
            `"${edge.to}"`,
            `"${JSON.stringify(edge.condition || {}).replace(/"/g, '""')}"`,
          ].join(','));
        }
      }
    }
    
    const csv = rows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${templateName.replace(/[^a-z0-9]/gi, '_')}.csv"`);
    res.send(csv);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'export error' });
  }
});

// Import CSV to update template or create version
app.post('/api/templates/:id/import/csv', async (req, res) => {
  try {
    const body = z.object({
      csvData: z.string(),
      createVersion: z.boolean().default(false),
      versionName: z.string().optional(),
      campaignId: z.string().optional(),
    }).parse(req.body);
    
    const parsed = Papa.parse(body.csvData, { header: true, skipEmptyLines: true }) as any;
    const rows: any[] = Array.isArray(parsed.data) ? parsed.data : [];
    
    // Rebuild nodes and edges from CSV
    const nodeMap = new Map<string, any>();
    const edges: any[] = [];
    
    for (const row of rows) {
      const nodeId = String(row.NodeID || '').trim();
      if (!nodeId) continue;
      
      // Add or update node
      if (!nodeMap.has(nodeId)) {
        const config = row.ConfigJSON ? JSON.parse(String(row.ConfigJSON)) : {};
        nodeMap.set(nodeId, {
          id: nodeId,
          type: String(row.NodeType || 'stage').trim(),
          name: String(row.NodeName || nodeId).trim(),
          config,
          pos: (row.PosX && row.PosY) ? { x: parseFloat(row.PosX), y: parseFloat(row.PosY) } : undefined
        });
      }
      
      // Add edge if present
      const edgeFrom = String(row.EdgeFrom || '').trim();
      const edgeTo = String(row.EdgeTo || '').trim();
      if (edgeFrom && edgeTo) {
        const condition = row.EdgeConditionJSON ? JSON.parse(String(row.EdgeConditionJSON)) : {};
        // Avoid duplicates
        if (!edges.some(e => e.from === edgeFrom && e.to === edgeTo)) {
          edges.push({ from: edgeFrom, to: edgeTo, condition });
        }
      }
    }
    
    const nodes = Array.from(nodeMap.values());
    
    if (body.createVersion) {
      // Create a new version
      const versionName = body.versionName || `Import ${new Date().toISOString().slice(0, 10)}`;
      const version = await prisma.templateVersion.create({
        data: {
          baseTemplateId: req.params.id,
          versionName,
          description: `Imported from CSV with ${nodes.length} nodes and ${edges.length} edges`,
          campaignId: body.campaignId,
          nodesJson: JSON.stringify(nodes),
          edgesJson: JSON.stringify(edges),
        }
      });
      
      res.json({
        ok: true,
        version: {
          id: version.id,
          versionName: version.versionName,
          nodesCount: nodes.length,
          edgesCount: edges.length,
        }
      });
    } else {
      // Update the base template
      await prisma.$transaction([
        prisma.node.deleteMany({ where: { templateId: req.params.id } }),
        prisma.edge.deleteMany({ where: { templateId: req.params.id } }),
        prisma.node.createMany({
          data: nodes.map((n: any) => ({
            templateId: req.params.id,
            key: n.id,
            type: n.type,
            name: n.name,
            configJson: JSON.stringify(n.config || {}),
            posX: n.pos?.x ?? null,
            posY: n.pos?.y ?? null,
          }))
        }),
        prisma.edge.createMany({
          data: edges.map((e: any) => ({
            templateId: req.params.id,
            fromKey: e.from,
            toKey: e.to,
            conditionJson: JSON.stringify(e.condition || {}),
          }))
        })
      ]);
      
      res.json({
        ok: true,
        nodesCount: nodes.length,
        edgesCount: edges.length,
      });
    }
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'import error' });
  }
});

// Content Templates (from CSV in repo root)
app.get('/api/content-templates', async (_req, res) => {
  try {
    const list = await prisma.contentTemplate.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(list.map((t) => ({ id: t.id, type: t.type, name: t.name, subject: t.subject || undefined, body: t.body || undefined, text: t.text || undefined, tts_script: t.ttsScript || undefined })));
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'import error' });
  }
});

// Create content template
app.post('/api/content-templates', async (req, res) => {
  try {
    const body = z.object({ type: z.enum(['email','sms','voicemail']), name: z.string(), subject: z.string().optional(), body: z.string().optional(), text: z.string().optional(), tts_script: z.string().optional() }).parse(req.body);
    const created = await prisma.contentTemplate.create({ data: { type: body.type, name: body.name, subject: body.subject || null, body: body.body || null, text: body.text || null, ttsScript: body.tts_script || null } });
    res.json({ id: created.id, type: created.type, name: created.name, subject: created.subject || undefined, body: created.body || undefined, text: created.text || undefined, tts_script: created.ttsScript || undefined });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'create error' });
  }
});

// Update content template
app.patch('/api/content-templates/:id', async (req, res) => {
  try {
    const body = z.object({ 
      type: z.enum(['email','sms','voicemail']).optional(), 
      name: z.string().optional(), 
      subject: z.string().optional(), 
      body: z.string().optional(), 
      text: z.string().optional(), 
      tts_script: z.string().optional() 
    }).parse(req.body);
    
    const updateData: any = {};
    if (body.type !== undefined) updateData.type = body.type;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.subject !== undefined) updateData.subject = body.subject || null;
    if (body.body !== undefined) updateData.body = body.body || null;
    if (body.text !== undefined) updateData.text = body.text || null;
    if (body.tts_script !== undefined) updateData.ttsScript = body.tts_script || null;
    
    const updated = await prisma.contentTemplate.update({ 
      where: { id: req.params.id }, 
      data: updateData 
    });
    
    res.json({ 
      id: updated.id, 
      type: updated.type, 
      name: updated.name, 
      subject: updated.subject || undefined, 
      body: updated.body || undefined, 
      text: updated.text || undefined, 
      tts_script: updated.ttsScript || undefined 
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'update error' });
  }
});

// Delete content template
app.delete('/api/content-templates/:id', async (req, res) => {
  try {
    await prisma.contentTemplate.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'delete error' });
  }
});

// Campaigns
app.get('/api/campaigns', async (_req, res) => {
  const list = await prisma.campaign.findMany({ include: { contacts: true, template: true } });
  res.json(list);
});

app.post('/api/campaigns', async (req, res) => {
  const body = z.object({
    name: z.string(), ownerName: z.string(), ownerEmail: z.string(), ownerPhone: z.string().optional(),
    city: z.string().optional(), state: z.string().optional(), videoLink: z.string().optional(), eventLink: z.string().optional(),
    eventType: z.string(), eventDate: z.string(), launchDate: z.string().optional(),
    hotelName: z.string().optional(), hotelAddress: z.string().optional(), calendlyLink: z.string().optional(),
    templateId: z.string().optional(), status: z.string().optional(), senderUserId: z.string().optional()
  }).parse(req.body);
  const created = await prisma.campaign.create({ data: {
    name: body.name, ownerName: body.ownerName, ownerEmail: body.ownerEmail, ownerPhone: body.ownerPhone,
    city: body.city, state: body.state, videoLink: body.videoLink, eventLink: body.eventLink,
    eventType: body.eventType, eventDate: new Date(body.eventDate), launchDate: body.launchDate ? new Date(body.launchDate) : undefined,
    hotelName: body.hotelName, hotelAddress: body.hotelAddress, calendlyLink: body.calendlyLink, senderUserId: body.senderUserId,
    templateId: body.templateId, status: body.status || 'draft'
  } });
  // If a template is provided, clone its nodes/edges to campaign graph
  if (body.templateId) {
    const [tplNodes, tplEdges] = await Promise.all([
      prisma.node.findMany({ where: { templateId: body.templateId } }),
      prisma.edge.findMany({ where: { templateId: body.templateId } })
    ]);
    if (tplNodes.length > 0) {
      await prisma.campaignNode.createMany({ data: tplNodes.map((n) => ({
        campaignId: created.id,
        key: n.key,
        type: n.type,
        name: n.name,
        configJson: n.configJson || null,
        posX: n.posX ?? null,
        posY: n.posY ?? null,
      })) });
    }
    if (tplEdges.length > 0) {
      await prisma.campaignEdge.createMany({ data: tplEdges.map((e) => ({
        campaignId: created.id,
        fromKey: e.fromKey,
        toKey: e.toKey,
        conditionJson: e.conditionJson || null,
      })) });
    }
  }
  res.json(created);
});

// Update campaign
app.patch('/api/campaigns/:id', async (req, res) => {
  try {
    const updates: any = {};
    const body = req.body;
    
    if (body.name !== undefined) updates.name = body.name;
    if (body.status !== undefined) updates.status = body.status;
    if (body.ownerName !== undefined) updates.ownerName = body.ownerName;
    if (body.ownerEmail !== undefined) updates.ownerEmail = body.ownerEmail;
    if (body.ownerPhone !== undefined) updates.ownerPhone = body.ownerPhone;
    if (body.city !== undefined) updates.city = body.city;
    if (body.state !== undefined) updates.state = body.state;
    if (body.videoLink !== undefined) updates.videoLink = body.videoLink;
    if (body.eventLink !== undefined) updates.eventLink = body.eventLink;
    if (body.launchDate !== undefined) updates.launchDate = body.launchDate ? new Date(body.launchDate) : null;
    if (body.templateId !== undefined) updates.templateId = body.templateId;
    
    const updated = await prisma.campaign.update({
      where: { id: req.params.id },
      data: updates
    });
    
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'update error' });
  }
});

// Delete campaign
app.delete('/api/campaigns/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Delete in order: messages → conversations → contacts → campaign nodes/edges → campaign
    await prisma.$transaction([
      prisma.message.deleteMany({ where: { convo: { contact: { campaignId: id } } } }),
      prisma.conversation.deleteMany({ where: { contact: { campaignId: id } } }),
      prisma.contact.deleteMany({ where: { campaignId: id } }),
      prisma.campaignNode.deleteMany({ where: { campaignId: id } }),
      prisma.campaignEdge.deleteMany({ where: { campaignId: id } }),
      prisma.campaign.delete({ where: { id } })
    ]);
    
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'delete error' });
  }
});

// Execute SMS nodes for a campaign (minimal executor)
app.post('/api/campaigns/:id/execute-sms', async (req, res) => {
  try {
    const body = z.object({ nodeKey: z.string().optional(), text: z.string().optional() }).parse(req.body || {});
    const campaignId = req.params.id;
    const [nodes, contacts] = await Promise.all([
      prisma.campaignNode.findMany({ where: { campaignId } }),
      prisma.contact.findMany({ where: { campaignId } }),
    ]);
    const smsNodes = nodes.filter((n) => n.type === 'sms_send' && (!body.nodeKey || n.key === body.nodeKey));
    if (smsNodes.length === 0) return res.json({ ok: true, sent: 0 });
    let total = 0;
    for (const contact of contacts) {
      const toNumber = (contact.phone || '').trim();
      if (!toNumber) continue;
      const msgTextRaw = body.text || (() => {
        try { const cfg = smsNodes[0].configJson ? JSON.parse(smsNodes[0].configJson) : {}; return cfg; } catch { return {}; }
      })();
      const cfgFirst = typeof msgTextRaw === 'string' ? { text: msgTextRaw } : (msgTextRaw || {});
      const resolvedText = await resolveSmsTextFromConfig(cfgFirst);
      const np = splitName(contact.name || '');
      const msgText = renderMergeTags(resolvedText || `Hi {{contact.first_name}}`, {
        contact: { name: contact.name, first_name: np.first_name, last_name: np.last_name, email: contact.email, phone: contact.phone },
        campaign: {},
      }).trim();

      const result = await sendSms({ to: toNumber, text: msgText });
      // Ensure conversation and log message
      let convo = await prisma.conversation.findFirst({ where: { contactId: contact.id, channel: 'sms' } });
      if (!convo) convo = await prisma.conversation.create({ data: { contactId: contact.id, channel: 'sms' } });
      await prisma.message.create({ data: { conversationId: convo.id, direction: 'out', text: msgText } });
      if (result.sent) total++;
    }
    res.json({ ok: true, sent: total });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'execute error' });
  }
});

// Combined executor: send emails and SMS for first matching nodes
app.post('/api/campaigns/:id/execute', async (req, res) => {
  try {
    const body = z.object({ nodeKey: z.string().optional() }).parse(req.body || {});
    const campaignId = req.params.id;
  const [nodes, contacts, campaign] = await Promise.all([
      prisma.campaignNode.findMany({ where: { campaignId } }),
      prisma.contact.findMany({ where: { campaignId } }),
    prisma.campaign.findUnique({ where: { id: campaignId }, include: { senderUser: true } }),
    ]);
    const firstSms = nodes.find((n) => n.type === 'sms_send' && (!body.nodeKey || n.key === body.nodeKey));
    const firstEmail = nodes.find((n) => n.type === 'email_send' && (!body.nodeKey || n.key === body.nodeKey));
    const firstVm = nodes.find((n) => n.type === 'voicemail_drop' && (!body.nodeKey || n.key === body.nodeKey));

    let smsSent = 0;
    let emailSent = 0;
    let vmQueued = 0;
    const senderUser = (campaign as any)?.senderUser;
    const campaignCtx = {
      name: campaign?.name,
      owner_name: campaign?.ownerName,
      owner_email: campaign?.ownerEmail,
      owner_phone: campaign?.ownerPhone,
      event_type: campaign?.eventType,
      city: campaign?.city,
      state: campaign?.state,
      launch_date: campaign?.launchDate ? campaign.launchDate.toISOString().slice(0,10) : '',
      event_date: campaign?.eventDate ? campaign.eventDate.toISOString().slice(0,10) : '',
      video_link: campaign?.videoLink,
      event_link: campaign?.eventLink,
      hotel_name: campaign?.hotelName,
      hotel_address: campaign?.hotelAddress,
      calendly_link: campaign?.calendlyLink,
      sender_name: senderUser?.name || campaign?.ownerName || '',
      sender_email: senderUser?.microsoftEmail || senderUser?.email || campaign?.ownerEmail || '',
      sender_phone: senderUser?.phone || campaign?.ownerPhone || '',
    } as any;

    if (firstSms) {
      let cfg: any = {};
      try { cfg = firstSms.configJson ? JSON.parse(firstSms.configJson) : {}; } catch {}
      const baseText = await resolveSmsTextFromConfig(cfg);
      for (const ct of contacts) {
        if (!ct.phone) continue;
        const np = splitName(ct.name || '');
        const text = renderMergeTags(baseText, { contact: { name: ct.name, first_name: np.first_name, last_name: np.last_name, email: ct.email, phone: ct.phone }, campaign: campaignCtx }).trim();
        const resSms = await sendSms({ to: ct.phone, text, fromNumber: (campaign as any)?.senderUser?.smsFromNumber || undefined });
        let convo = await prisma.conversation.findFirst({ where: { contactId: ct.id, channel: 'sms' } });
        if (!convo) convo = await prisma.conversation.create({ data: { contactId: ct.id, channel: 'sms' } });
        await prisma.message.create({ data: { conversationId: convo.id, direction: 'out', text } });
        if (resSms.sent) smsSent++;
      }
    }

    if (firstEmail) {
      let cfg: any = {};
      try { cfg = firstEmail.configJson ? JSON.parse(firstEmail.configJson) : {}; } catch {}
      const { subject, body: emailBody } = await resolveEmailFromConfig(cfg);
      const emailsToQueue = [];

      // If AI personalization is enabled, pre-load all personalized emails for this node
      let personalizedMap: Record<string, { subject: string; body: string }> = {};
      if (campaign?.aiPersonalization) {
        const peList = await prisma.personalizedEmail.findMany({
          where: { campaignId, nodeKey: firstEmail.key, status: { in: ['approved', 'edited'] } },
        });
        for (const pe of peList) {
          // Use edited content if available, otherwise use AI-generated content
          personalizedMap[pe.contactId] = {
            subject: pe.editedSubject || pe.subject,
            body: pe.editedBody || pe.body,
          };
        }
      }
      
      for (const ct of contacts) {
        if (!ct.email) continue;
        let sub: string;
        let bod: string;

        // Check for approved personalized version first
        if (personalizedMap[ct.id]) {
          sub = personalizedMap[ct.id].subject;
          bod = personalizedMap[ct.id].body;
        } else {
          // Fall back to standard mail-merge
          const np = splitName(ct.name || '');
          sub = renderMergeTags(subject || '', { contact: { name: ct.name, first_name: np.first_name, last_name: np.last_name, email: ct.email, phone: ct.phone }, campaign: campaignCtx }).trim();
          bod = renderMergeTags(emailBody || '', { contact: { name: ct.name, first_name: np.first_name, last_name: np.last_name, email: ct.email, phone: ct.phone }, campaign: campaignCtx }).trim();
        }
        
        emailsToQueue.push({
          campaignId,
          contactId: ct.id,
          to: ct.email,
          subject: sub,
          body: bod,
          userId: campaign?.senderUserId || undefined,
        });
      }
      
      // Queue all emails with staggered delays (1-2.5 min between each)
      if (emailsToQueue.length > 0) {
        await queueBulkEmails(emailsToQueue);
        emailSent = emailsToQueue.length;
      }
    }

    if (firstVm) {
      let cfg: any = {};
      try { cfg = firstVm.configJson ? JSON.parse(firstVm.configJson) : {}; } catch {}
      const baseScript = await resolveVoicemailScriptFromConfig(cfg);
      for (const ct of contacts) {
        if (!ct.phone) continue;
        const np = splitName(ct.name || '');
        const script = renderMergeTags(baseScript, { contact: { name: ct.name, first_name: np.first_name, last_name: np.last_name, email: ct.email, phone: ct.phone }, campaign: campaignCtx });
        
        // Generate audio with ElevenLabs
        let audioUrl = '';
        try {
          const tts = await generateTtsMp3({ script });
          if (tts.ok && tts.audioUrl) {
            if (tts.audioUrl.startsWith('data:audio/mpeg;base64,')) {
              const b64 = tts.audioUrl.replace('data:audio/mpeg;base64,', '');
              const buf = Buffer.from(b64, 'base64');
              const id = storeVoicemailMp3(buf);
              const base = (process.env.PUBLIC_BASE_URL || (((req.headers['x-forwarded-proto'] || req.protocol) + '://' + req.get('host'))));
              audioUrl = `${String(base).replace(/\/$/, '')}/media/vm/${id}.mp3`;
            } else {
              audioUrl = tts.audioUrl;
            }
          }
        } catch (e) {
          console.error('[execute] TTS generation failed:', e);
        }
        
        // Send to DropCowboy
        const r = await sendVoicemailDrop({ 
          to: ct.phone, 
          audioUrl: audioUrl || undefined,
          ttsScript: script,
          callerId: ((campaign as any)?.senderUser?.vmCallerId) || process.env.DROPCOWBOY_CALLER_ID || undefined, 
          campaignId: campaign?.id 
        });
        
        if (r.queued) vmQueued++;
        else {
          // eslint-disable-next-line no-console
          console.warn('[execute] Voicemail drop failed', { to: ct.phone, audioUrl, raw: r.raw });
        }
      }
    }

    res.json({ ok: true, smsSent, emailQueued: emailSent, vmQueued });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'execute error' });
  }
});

app.patch('/api/campaigns/:id', async (req, res) => {
  try {
    const body = z.object({
      name: z.string().optional(),
      ownerName: z.string().optional(),
      ownerEmail: z.string().optional(),
      ownerPhone: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      videoLink: z.string().optional(),
      eventLink: z.string().optional(),
      eventType: z.string().optional(),
      eventDate: z.string().optional(),
      launchDate: z.string().optional(),
      hotelName: z.string().optional(),
      hotelAddress: z.string().optional(),
      calendlyLink: z.string().optional(),
      status: z.string().optional(),
      templateId: z.string().optional(),
      importGraph: z.boolean().optional(),
      senderUserId: z.string().optional(),
      aiPersonalization: z.boolean().optional(),
    }).partial().parse(req.body);

    // Normalize empty strings to null/undefined where appropriate
    const updateData: any = {
      name: body.name,
      ownerName: body.ownerName,
      ownerEmail: body.ownerEmail,
      ownerPhone: body.ownerPhone,
      city: body.city,
      state: body.state,
      videoLink: body.videoLink,
      eventLink: body.eventLink,
      eventType: body.eventType,
      status: body.status,
      hotelName: body.hotelName,
      hotelAddress: body.hotelAddress,
      calendlyLink: body.calendlyLink,
    };
    if (typeof body.aiPersonalization === 'boolean') {
      updateData.aiPersonalization = body.aiPersonalization;
    }
    if (typeof body.templateId !== 'undefined') {
      updateData.templateId = body.templateId === '' ? null : body.templateId;
    }
    if (body.eventDate) {
      updateData.eventDate = new Date(body.eventDate);
    }
    if (body.launchDate) {
      updateData.launchDate = new Date(body.launchDate);
    }
    if (typeof body.senderUserId !== 'undefined') {
      updateData.senderUserId = body.senderUserId === '' ? null : body.senderUserId;
    }

    const updated = await prisma.campaign.update({
      where: { id: req.params.id },
      data: updateData,
    });

    // If requested, replace campaign graph with the template's nodes/edges
    if (body.importGraph && body.templateId) {
      const [tplNodes, tplEdges] = await Promise.all([
        prisma.node.findMany({ where: { templateId: body.templateId } }),
        prisma.edge.findMany({ where: { templateId: body.templateId } }),
      ]);

      await prisma.$transaction([
        prisma.campaignNode.deleteMany({ where: { campaignId: updated.id } }),
        prisma.campaignEdge.deleteMany({ where: { campaignId: updated.id } }),
      ]);

      if (tplNodes.length > 0) {
        await prisma.campaignNode.createMany({
          data: tplNodes.map((n) => ({
            campaignId: updated.id,
            key: n.key,
            type: n.type,
            name: n.name,
            configJson: n.configJson || null,
            posX: n.posX ?? null,
            posY: n.posY ?? null,
          })),
        });
      }
      if (tplEdges.length > 0) {
        await prisma.campaignEdge.createMany({
          data: tplEdges.map((e) => ({
            campaignId: updated.id,
            fromKey: e.fromKey,
            toKey: e.toKey,
            conditionJson: e.conditionJson || null,
          })),
        });
      }
    }

    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'update error' });
  }
});

// Contacts
app.get('/api/campaigns/:id/contacts', async (req, res) => {
  const contacts = await prisma.contact.findMany({ where: { campaignId: req.params.id } });
  res.json(contacts);
});

app.post('/api/campaigns/:id/contacts/bulk', async (req, res) => {
  const body = z.object({ contacts: z.array(z.any()) }).parse(req.body);
  const created = await prisma.$transaction(body.contacts.map((c: any) => prisma.contact.create({ data: { campaignId: req.params.id, name: c.name, company: c.company, email: c.email, phone: c.phone, city: c.city, state: c.state, url: c.url, status: c.status||'No Activity', stageKey: c.stageId||null, rawJson: c.raw?JSON.stringify(c.raw):null } })));
  // Ensure a conversation exists for each contact (prefer sms if phone present)
  for (const ct of created) {
    const existing = await prisma.conversation.findFirst({ where: { contactId: ct.id } });
    if (!existing) {
      const channel = ct.phone ? 'sms' : 'email';
      await prisma.conversation.create({ data: { contactId: ct.id, channel } });
    }
  }
  res.json({ count: created.length });
});

app.post('/api/campaigns/:id/contacts', async (req, res) => {
  const c = z.object({
    name: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: z.string().optional(),
    stageId: z.string().optional(),
    raw: z.any().optional(),
  }).parse(req.body);
  const fullName = (c.name && c.name.trim()) || `${(c.firstName||'').trim()} ${(c.lastName||'').trim()}`.trim() || 'Contact';
  const created = await prisma.contact.create({ data: { campaignId: req.params.id, name: fullName, email: c.email, phone: c.phone, status: c.status||'No Activity', stageKey: c.stageId||null, rawJson: c.raw?JSON.stringify(c.raw):null } });
  // Create Bonzo prospect and opt in for SMS (best-effort)
  try {
    const names = String(c.name||'').split(' ');
    const first = names.shift() || 'Prospect';
    const last = names.join(' ') || '';
    const createdProspect = await bonzoCreateProspect({ firstName: first, lastName: last, email: c.email, phone: c.phone, externalId: created.id });
    if (createdProspect?.id) await bonzoOptIn(createdProspect.id, 'sms');
  } catch {}
  // Ensure conversation exists
  const existing = await prisma.conversation.findFirst({ where: { contactId: created.id } });
  if (!existing) {
    await prisma.conversation.create({ data: { contactId: created.id, channel: created.phone ? 'sms' : 'email' } });
  }
  res.json(created);
});

// Backfill: create Bonzo prospects and opt-in for all contacts (optionally by campaignId)
app.post('/api/bonzo/backfill', async (req, res) => {
  try {
    const campaignId = (req.query?.campaignId as string | undefined) || undefined;
    const where: any = campaignId ? { campaignId } : {};
    const contacts = await prisma.contact.findMany({ where });
    // Preload campaigns to attach source name
    const campaignIds = Array.from(new Set(contacts.map((c) => c.campaignId).filter(Boolean))) as string[];
    const campaigns = campaignIds.length ? await prisma.campaign.findMany({ where: { id: { in: campaignIds } } }) : [];
    const idToCampaign: Record<string, { id: string; name: string }> = {};
    campaigns.forEach((c: any) => { idToCampaign[c.id] = { id: c.id, name: c.name }; });

    let createdCount = 0;
    let optedCount = 0;
    for (const ct of contacts) {
      if (!ct.phone && !ct.email) continue;
      const names = String(ct.name||'').split(' ');
      const first = names.shift() || 'Prospect';
      const last = names.join(' ') || '';
      const src = ct.campaignId && idToCampaign[ct.campaignId] ? `ADTV:${idToCampaign[ct.campaignId].name}` : 'ADTV';
      try {
        const p = await bonzoCreateProspect({ firstName: first, lastName: last, email: ct.email || undefined, phone: ct.phone || undefined, externalId: `${ct.id}` });
        if (p?.id) {
          createdCount++;
          const ok = await bonzoOptIn(p.id, 'sms');
          if (ok) optedCount++;
        }
      } catch {}
    }
    res.json({ ok: true, processed: contacts.length, created: createdCount, optedIn: optedCount });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'backfill error' });
  }
});

// Update contact
app.patch('/api/contacts/:id', async (req, res) => {
  try {
    const body = z.object({
      name: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      company: z.string().optional(),
      email: z.string().nullable().optional(),
      phone: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      state: z.string().nullable().optional(),
      url: z.string().nullable().optional(),
      status: z.string().optional(),
      stageId: z.string().nullable().optional(),
      raw: z.any().optional(),
    }).parse(req.body);
    const nameFromParts = `${(body.firstName||'').trim()} ${(body.lastName||'').trim()}`.trim();
    const updated = await prisma.contact.update({
      where: { id: req.params.id },
      data: {
        name: (body.name ? body.name : (nameFromParts || undefined)) as any,
        company: body.company as any,
        email: (body.email ?? undefined) as any,
        phone: (body.phone ?? undefined) as any,
        city: (body.city ?? undefined) as any,
        state: (body.state ?? undefined) as any,
        url: (body.url ?? undefined) as any,
        status: body.status as any,
        stageKey: (body.stageId ?? undefined) as any,
        rawJson: body.raw ? JSON.stringify(body.raw) : undefined,
      },
    });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'update error' });
  }
});

// Campaign graph
app.get('/api/campaigns/:id/graph', async (req, res) => {
  const [nodes, edges] = await Promise.all([
    prisma.campaignNode.findMany({ where: { campaignId: req.params.id } }),
    prisma.campaignEdge.findMany({ where: { campaignId: req.params.id } }),
  ]);
  res.json({
    nodes: nodes.map((n) => ({ id: n.key, type: n.type, name: n.name, config: n.configJson ? JSON.parse(n.configJson) : undefined, pos: (n.posX!=null && n.posY!=null) ? { x: n.posX, y: n.posY } : undefined })),
    edges: edges.map((e) => ({ from: e.fromKey, to: e.toKey, condition: e.conditionJson ? JSON.parse(e.conditionJson) : undefined })),
  });
});

// Inbox (mock endpoints)
app.get('/api/conversations', async (_req, res) => {
  const convos = await prisma.conversation.findMany({ include: { messages: true, contact: true } });
  res.json(convos);
});

app.post('/api/messages', async (req, res) => {
  const m = z.object({ conversationId: z.string().optional(), contactId: z.string().optional(), text: z.string(), subject: z.string().optional(), direction: z.enum(['in','out']), provider: z.string().optional(), providerMessageId: z.string().optional() }).parse(req.body);
  let conversationId = m.conversationId || null;
  if (!conversationId && m.contactId) {
    let convo = await prisma.conversation.findFirst({ where: { contactId: m.contactId } });
    if (!convo) {
      convo = await prisma.conversation.create({ data: { contactId: m.contactId, channel: 'sms' } });
    }
    conversationId = convo.id;
  }
  if (!conversationId) return res.status(400).json({ error: 'conversationId or contactId required' });
  const created = await prisma.message.create({ data: { conversationId, text: m.text, subject: m.subject, provider: m.provider, providerMessageId: m.providerMessageId, direction: m.direction } });
  res.json(created);
});

// Dashboard stats
app.get('/api/stats', async (_req, res) => {
  const [campaignsCount, contactsCount, msgs] = await Promise.all([
    prisma.campaign.count(),
    prisma.contact.count(),
    prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 500, include: { convo: { include: { contact: true } } } })
  ]);
  const inbound = msgs.filter((m) => m.direction === 'in');
  const respondedQuestion = inbound.filter((m) => m.text.includes('?')).length;
  const respondedNeg = inbound.filter((m) => /\b(stop|no)\b/i.test(m.text)).length;
  const respondedPos = Math.max(inbound.length - respondedQuestion - respondedNeg, 0);
  const [rsvpConfirmed, attended, esignSent, signed] = await Promise.all([
    prisma.contact.count({ where: { status: 'Received RSVP' } }),
    prisma.contact.count({ where: { status: 'Showed Up To Event' } }),
    prisma.contact.count({ where: { status: 'Received Agreement' } }),
    prisma.contact.count({ where: { status: 'Signed Agreement' } })
  ]);
  const recentActivity = msgs.slice(0, 5).map((m) => ({
    id: m.id,
    text: m.text,
    direction: m.direction,
    time: m.createdAt,
    contact: m.convo?.contact?.name || 'Contact'
  }));
  // Build simple timeseries of messages by day (last 30 days)
  const byDay: Record<string, { in: number; out: number }> = {};
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay[key] = { in: 0, out: 0 };
  }
  msgs.forEach((m) => {
    const key = m.createdAt.toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = { in: 0, out: 0 };
    if (m.direction === 'in') byDay[key].in++;
    else byDay[key].out++;
  });
  const messagesByDay = Object.entries(byDay)
    .sort((a,b)=> a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, in: v.in, out: v.out }));
  res.json({
    enrolled: contactsCount,
    messaged: msgs.length,
    respondedPos,
    respondedQuestion,
    respondedNeg,
    rsvpConfirmed,
    attended,
    esignSent,
    signed,
    podioCreated: signed,
    campaigns: campaignsCount,
    recentActivity,
    messagesByDay
  });
});

// Campaign-specific analytics
app.get('/api/campaigns/:id/stats', async (req, res) => {
  const id = req.params.id;
  const [contacts, convos] = await Promise.all([
    prisma.contact.findMany({ where: { campaignId: id } }),
    prisma.conversation.findMany({ where: { contact: { campaignId: id } }, select: { id: true } })
  ]);
  const convoIds = convos.map((c) => c.id);
  const msgs = convoIds.length
    ? await prisma.message.findMany({ where: { conversationId: { in: convoIds } }, orderBy: { createdAt: 'desc' } })
    : [];

  const statusCounts = contacts.reduce<Record<string, number>>((acc, c) => { acc[c.status] = (acc[c.status]||0) + 1; return acc; }, {});
  const inbound = msgs.filter((m) => m.direction === 'in');
  const outbound = msgs.filter((m) => m.direction === 'out');
  
  // Get conversations by channel to determine message types
  const convosWithChannel = await prisma.conversation.findMany({
    where: { contact: { campaignId: id } },
    select: { id: true, channel: true }
  });
  const convoChannelMap = new Map(convosWithChannel.map(c => [c.id, c.channel]));
  
  // Categorize outbound messages by channel
  const emails = outbound.filter((m) => {
    const channel = convoChannelMap.get(m.conversationId);
    return channel === 'email' || m.provider === 'smtp' || m.provider === 'graph' || m.subject;
  });
  
  const sms = outbound.filter((m) => {
    const channel = convoChannelMap.get(m.conversationId);
    return channel === 'sms' || m.provider === 'twilio' || m.provider === 'bonzo';
  });
  
  const voicemails = outbound.filter((m) => {
    const channel = convoChannelMap.get(m.conversationId);
    return channel === 'voicemail' || m.provider === 'slybroadcast' || m.provider === 'dropcowboy';
  });
  
  const linkedin = outbound.filter((m) => {
    const channel = convoChannelMap.get(m.conversationId);
    return channel === 'linkedin';
  });

  const byDay: Record<string, { in: number; out: number }> = {};
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay[key] = { in: 0, out: 0 };
  }
  msgs.forEach((m) => {
    const key = m.createdAt.toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = { in: 0, out: 0 };
    if (m.direction === 'in') byDay[key].in++;
    else byDay[key].out++;
  });
  const messagesByDay = Object.entries(byDay)
    .sort((a,b)=> a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, in: v.in, out: v.out }));

  const rsvpConfirmed = contacts.filter((c)=> c.status === 'Received RSVP').length;
  const attended = contacts.filter((c)=> c.status === 'Showed Up To Event').length;
  const esignSent = contacts.filter((c)=> c.status === 'Received Agreement').length;
  const signed = contacts.filter((c)=> c.status === 'Signed Agreement').length;
  const demosBooked = contacts.filter((c)=> c.status === 'Demo Booked' || c.status === 'Demo Scheduled').length;
  const assessments = contacts.filter((c)=> c.status === 'Assessment Requested').length;

  res.json({
    totals: {
      contacts: contacts.length,
      messages: msgs.length,
      inbound: inbound.length,
      outbound: outbound.length,
      emails: emails.length,
      sms: sms.length,
      voicemails: voicemails.length,
      linkedin: linkedin.length,
    },
    statusCounts,
    messagesByDay,
    funnel: { rsvpConfirmed, attended, esignSent, signed, demosBooked, assessments },
    recentMessages: msgs.slice(0, 20).map((m)=> ({ id: m.id, direction: m.direction, text: m.text, time: m.createdAt }))
  });
});

// Dev email test endpoint (uses SMTP creds from env)
app.post('/api/test-email', async (req, res) => {
  try {
    const body = z.object({ to: z.string().email(), subject: z.string(), text: z.string() }).parse(req.body);
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env as any;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return res.status(400).json({ error: 'Missing SMTP env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS' });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const info = await transporter.sendMail({ from: SMTP_USER, to: body.to, subject: body.subject, text: body.text });
    res.json({ ok: true, messageId: info.messageId });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'send error' });
  }
});

// Send email via Microsoft Graph API or SMTP
app.post('/api/email/send', async (req, res) => {
  try {
    const body = z.object({
      to: z.string().email(),
      subject: z.string().default(''),
      body: z.string().default(''),
      userId: z.string().optional(),
      contactId: z.string().optional(),
    }).parse(req.body);

    // Check if contact has unsubscribed
    if (body.contactId) {
      const contact = await prisma.contact.findUnique({
        where: { id: body.contactId }
      });
      
      if (contact?.unsubscribed) {
        return res.status(400).json({ error: 'Contact has unsubscribed' });
      }
    }

    // Add unsubscribe link if contactId is provided
    let emailBody = body.body;
    if (body.contactId) {
      emailBody = addUnsubscribeLink(body.body, body.contactId, process.env.COMPANY_ADDRESS);
    }

    let messageId: string | undefined;
    let provider = 'unknown';

    // Try Microsoft Graph API first (modern, secure method)
    if (isGraphConfigured()) {
      const result = await sendGraphEmail({
        to: body.to,
        subject: body.subject,
        body: emailBody,
        from: process.env.EMAIL_FROM
      });

      if (result.sent) {
        messageId = result.messageId;
        provider = 'graph';
      } else {
        console.error('Graph API failed, falling back to SMTP:', result.error);
        // Fall through to SMTP
      }
    }

    // Fallback to SMTP if Graph API not configured or failed
    if (!messageId) {
      let smtpHost = process.env.SMTP_HOST;
      let smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
      let smtpUser = process.env.SMTP_USER;
      let smtpPass = process.env.SMTP_PASS;
      let smtpSecure = (process.env.SMTP_SECURE === 'true') || (smtpPort === 465);

      if (body.userId || (!smtpHost || !smtpPort || !smtpUser || !smtpPass)) {
        const user = body.userId ? await prisma.user.findUnique({ where: { id: body.userId } }) : await prisma.user.findFirst();
        if (user?.smtpHost && user?.smtpPort && user?.smtpUser && user?.smtpPass) {
          smtpHost = user.smtpHost;
          smtpPort = user.smtpPort as number;
          smtpUser = user.smtpUser as string;
          smtpPass = user.smtpPass as string;
          smtpSecure = user.smtpSecure ?? true;
        }
      }

      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        return res.status(400).json({ error: 'Missing email configuration (Graph API or SMTP)' });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });
      const info = await transporter.sendMail({ from: smtpUser, to: body.to, subject: body.subject, text: body.body });
      messageId = info.messageId;
      provider = 'smtp';
    }

    // Log to conversation if contactId provided
    if (body.contactId) {
      let convo = await prisma.conversation.findFirst({ where: { contactId: body.contactId } });
      if (!convo) {
        convo = await prisma.conversation.create({ data: { contactId: body.contactId, channel: 'email' } });
      }
      await prisma.message.create({ 
        data: { 
          conversationId: convo.id, 
          direction: 'out', 
          text: (body.subject ? `[${body.subject}]\n\n` : '') + body.body,
          subject: body.subject,
          provider
        } 
      });
    }

    res.json({ ok: true, messageId, provider });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'send error' });
  }
});

// Twilio inbound SMS webhook (POST x-www-form-urlencoded)
app.post('/api/twilio/inbound-sms', async (req, res) => {
  try {
    const from = String(req.body.From || '').trim();
    const to = String(req.body.To || '').trim();
    const text = String(req.body.Body || '').trim();
    if (!from || !text) {
      return res.status(200).type('text/xml').send('<Response></Response>');
    }
    // normalize: last 10 digits to match stored formats loosely
    const last10 = from.replace(/\D/g, '').slice(-10);
    const contact = await prisma.contact.findFirst({
      where: { phone: { contains: last10 } },
      orderBy: { createdAt: 'desc' },
    });
    if (contact) {
      let convo = await prisma.conversation.findFirst({ where: { contactId: contact.id, channel: 'sms' } });
      if (!convo) {
        convo = await prisma.conversation.create({ data: { contactId: contact.id, channel: 'sms' } });
      }
      await prisma.message.create({ data: { conversationId: convo.id, direction: 'in', text } });
      // bump status to Needs BDR and check out from automation
      await prisma.contact.update({ 
        where: { id: contact.id }, 
        data: { 
          status: 'Needs BDR',
          automationCheckedOut: true,
          automationCheckedOutAt: new Date(),
          automationPausedNodeKey: contact.stageKey || null
        } 
      });
    }
    // empty TwiML response
    return res.status(200).type('text/xml').send('<Response></Response>');
  } catch (e) {
    return res.status(200).type('text/xml').send('<Response></Response>');
  }
});

// Bonzo inbound SMS webhook (JSON or form). Map to our conversation log.
app.post('/api/bonzo/inbound-sms', async (req, res) => {
  try {
    const token = process.env.BONZO_WEBHOOK_TOKEN;
    if (token) {
      const provided = (req.headers['x-bonzo-token'] || req.query.token || req.body?.token || '').toString();
      if (!provided || provided !== token) return res.status(401).json({ ok: false });
    }
    const from = String((req.body && (req.body.from || req.body.From)) || '').trim();
    const text = String((req.body && (req.body.text || req.body.body || req.body.Body)) || '').trim();
    if (!from || !text) return res.status(200).json({ ok: true });
    const last10 = from.replace(/\D/g, '').slice(-10);
    const contact = await prisma.contact.findFirst({ where: { phone: { contains: last10 } }, orderBy: { createdAt: 'desc' } });
    if (contact) {
      let convo = await prisma.conversation.findFirst({ where: { contactId: contact.id, channel: 'sms' } });
      if (!convo) convo = await prisma.conversation.create({ data: { contactId: contact.id, channel: 'sms' } });
      await prisma.message.create({ data: { conversationId: convo.id, direction: 'in', text } });
      await prisma.contact.update({ 
        where: { id: contact.id }, 
        data: { 
          status: 'Needs BDR',
          automationCheckedOut: true,
          automationCheckedOutAt: new Date(),
          automationPausedNodeKey: contact.stageKey || null
        } 
      });
    }
    return res.status(200).json({ ok: true });
  } catch (_e) {
    return res.status(200).json({ ok: true });
  }
});

// Voicemail: generate via ElevenLabs (optional) and drop via Slybroadcast
app.post('/api/voicemail/drop', async (req, res) => {
  try {
    const candidate: any = (typeof (req as any).body === 'string'
      ? (()=> { try { return JSON.parse((req as any).body || '{}'); } catch { return {}; } })()
      : ((req as any).body && Object.keys((req as any).body||{}).length ? (req as any).body : (req as any).query)) || {};
    const body = z.object({
      to: z.string().optional(),
      contactId: z.string().optional(),
      audioUrl: z.string().url().optional(),
      ttsScript: z.string().optional(),
      callerId: z.string().optional(),
      scheduleAt: z.string().optional(),
      campaignId: z.string().optional(),
    }).parse(candidate);

    let toNumber = body.to || '';
    if (!toNumber && body.contactId) {
      const contact = await prisma.contact.findUnique({ where: { id: body.contactId } });
      toNumber = contact?.phone || '';
    }
    if (!toNumber) return res.status(400).json({ error: 'Missing destination number' });

    // Generate audio with ElevenLabs if ttsScript provided
    let audioUrl = body.audioUrl || '';
    if (!audioUrl && body.ttsScript) {
      const tts = await generateTtsMp3({ script: body.ttsScript });
      if (tts.ok && tts.audioUrl) {
        // Convert data URL to Buffer and host at /media
        if (tts.audioUrl.startsWith('data:audio/mpeg;base64,')) {
          const b64 = tts.audioUrl.replace('data:audio/mpeg;base64,', '');
          const buf = Buffer.from(b64, 'base64');
          const id = storeVoicemailMp3(buf);
          const base = (process.env.PUBLIC_BASE_URL || ((req.headers['x-forwarded-proto'] || req.protocol) + '://' + req.get('host')));
          audioUrl = `${String(base).replace(/\/$/, '')}/media/vm/${id}.mp3`;
        } else {
          audioUrl = tts.audioUrl;
        }
      }
    }

    // Send to DropCowboy with audio URL
    const result = await sendVoicemailDrop({
      to: toNumber,
      ttsScript: body.ttsScript,
      audioUrl: audioUrl || undefined,
      callerId: body.callerId,
      scheduleAt: body.scheduleAt,
      campaignId: body.campaignId,
    });

    // Log as message in conversation if contactId present
    if (body.contactId) {
      let convo = await prisma.conversation.findFirst({ where: { contactId: body.contactId, channel: 'sms' } });
      if (!convo) convo = await prisma.conversation.create({ data: { contactId: body.contactId, channel: 'sms' } });
      await prisma.message.create({ data: { conversationId: convo.id, direction: 'out', text: `[Voicemail drop queued]` } });
    }

    res.json({ ok: result.queued, provider: result.provider, id: result.id, raw: result.raw });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'voicemail error' });
  }
});


// ═══════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ═══════════════════════════════════════════════════════════════

// List all users (admin only)
app.get('/api/users', async (req: any, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const caller = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!caller || caller.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    const users = await prisma.user.findMany({
      select: {
        id: true, name: true, email: true, role: true, phone: true,
        googleEmail: true, microsoftEmail: true, linkedinProfileUrl: true,
        createdAt: true, updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Failed to list users' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const body = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().optional(),
      role: z.enum(['bdr', 'admin']).optional(),
      phone: z.string().optional(),
      smsFromNumber: z.string().optional(),
      vmCallerId: z.string().optional(),
      smtp: z.object({ host: z.string(), port: z.number(), user: z.string(), pass: z.string(), secure: z.boolean().optional() }).optional(),
    }).parse(req.body);
    const passwordHash = body.password ? await bcrypt.hash(body.password, 10) : null;
    const created = await prisma.user.create({
      data: {
        name: body.name, email: body.email, role: body.role || 'bdr', passwordHash,
        phone: body.phone || null, smsFromNumber: body.smsFromNumber || null, vmCallerId: body.vmCallerId || null,
        smtpHost: body.smtp?.host, smtpPort: body.smtp?.port, smtpUser: body.smtp?.user, smtpPass: body.smtp?.pass, smtpSecure: body.smtp?.secure ?? true,
      },
    });
    res.json({ id: created.id, name: created.name, email: created.email, role: created.role });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Failed to create user' });
  }
});

// Update user (admin only)
app.patch('/api/users/:id', async (req: any, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const caller = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!caller || caller.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    const body = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      role: z.enum(['bdr', 'admin']).optional(),
      phone: z.string().optional(),
      password: z.string().optional(),
    }).parse(req.body);

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.role !== undefined) updateData.role = body.role;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.password) updateData.passwordHash = await bcrypt.hash(body.password, 10);

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
    });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Failed to update user' });
  }
});

// Delete user (admin only)
app.delete('/api/users/:id', async (req: any, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const caller = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!caller || caller.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    if (req.params.id === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' });

    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Failed to delete user' });
  }
});

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const body = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, requireEnv('JWT_SECRET'), { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'login error' });
  }
});

app.get('/api/auth/me', async (req: any, res) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, smsFromNumber: user.smsFromNumber, vmCallerId: user.vmCallerId, googleEmail: user.googleEmail, microsoftEmail: user.microsoftEmail, linkedinProfileUrl: user.linkedinProfileUrl });
});

// BDR CSV import
function resolveBdrCsvPath(): string | null {
  const candidates = [
    path.resolve(__dirname, '../../../../bdr.csv'),
    path.resolve(process.cwd(), '../../bdr.csv'),
    path.resolve(process.cwd(), '../bdr.csv'),
    path.resolve(process.cwd(), 'bdr.csv'),
  ];
  for (const p of candidates) { if (fs.existsSync(p)) return p; }
  return null;
}

app.post('/api/users/import/bdr', async (_req, res) => {
  try {
    const csvPath = resolveBdrCsvPath();
    if (!csvPath) return res.status(404).json({ error: 'bdr.csv not found in repo root' });
    const csv = fs.readFileSync(csvPath, 'utf8');
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true } as any);
    const rows: any[] = Array.isArray((parsed as any).data) ? ((parsed as any).data as any[]) : [];
    let created = 0;
    for (const r of rows) {
      const name = String(r.name || r.Name || '').trim();
      const email = String(r.email || r.Email || '').trim();
      const phone = String(r.phone || r.Phone || '').trim();
      const smsFromNumber = String(r.smsFromNumber || r.SmsFromNumber || '').trim();
      const vmCallerId = String(r.vmCallerId || r.VmCallerId || '').trim();
      if (!name || !email) continue;
      try {
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) continue;
        const passwordHash = await bcrypt.hash('123456', 10);
        await prisma.user.create({ data: { name, email, role: 'bdr', passwordHash, phone: phone || null, smsFromNumber: smsFromNumber || null, vmCallerId: vmCallerId || null } });
        created++;
      } catch {}
    }
    res.json({ ok: true, created });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'import error' });
  }
});

// Google OAuth2 / Gmail
function createOAuthClient() {
  const clientId = requireEnv('GOOGLE_CLIENT_ID');
  const clientSecret = requireEnv('GOOGLE_CLIENT_SECRET');
  const redirectUri = requireEnv('GOOGLE_REDIRECT_URI');
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

app.get('/api/auth/google/initiate', async (req: any, res) => {
  try {
    const userId = (req.user?.id || req.query.userId || '').toString();
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const oauth2Client = createOAuthClient();
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
    ];
    const url = oauth2Client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: scopes, include_granted_scopes: true, state: JSON.stringify({ userId }) });
    res.json({ url });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'oauth error' });
  }
});

app.get('/api/auth/google/callback', async (req: any, res) => {
  try {
    const code = (req.query.code || '').toString();
    const state = (() => { try { return JSON.parse((req.query.state || '').toString() || '{}'); } catch { return {}; } })();
    const userId = (state && state.userId) ? String(state.userId) : '';
    if (!code || !userId) return res.status(400).json({ error: 'missing code or userId' });
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const me = await oauth2.userinfo.get();
    const googleEmail = (me.data && (me.data as any).email) ? String((me.data as any).email) : null;
    await prisma.user.update({ where: { id: userId }, data: {
      googleAccessToken: tokens.access_token || null,
      googleRefreshToken: tokens.refresh_token || null,
      googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      googleScope: Array.isArray(tokens.scope) ? (tokens.scope as any).join(' ') : ((tokens.scope as any) || null),
      googleEmail,
    } });
    res.json({ ok: true, googleEmail });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'callback error' });
  }
});

// ═══════════════════════════════════════════════════════════════
// MICROSOFT OAUTH (Per-User Email Authorization)
// ═══════════════════════════════════════════════════════════════

app.get('/api/auth/microsoft/initiate', async (req: any, res) => {
  try {
    const userId = (req.user?.id || req.query.userId || '').toString();
    if (!userId) return res.status(400).json({ error: 'userId required' });

    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const tenantId = process.env.MICROSOFT_TENANT_ID || 'common';
    const redirectUri = process.env.MICROSOFT_REDIRECT_URI || `${process.env.PUBLIC_BASE_URL || 'http://localhost:4000'}/api/auth/microsoft/callback`;

    if (!clientId) return res.status(400).json({ error: 'Microsoft OAuth not configured (MICROSOFT_CLIENT_ID missing)' });

    const scopes = ['openid', 'profile', 'email', 'offline_access', 'Mail.Send', 'User.Read'];
    const state = JSON.stringify({ userId });

    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
      `client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_mode=query` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&state=${encodeURIComponent(state)}` +
      `&prompt=consent`;

    res.json({ url });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Microsoft OAuth initiate error' });
  }
});

app.get('/api/auth/microsoft/callback', async (req: any, res) => {
  try {
    const code = (req.query.code || '').toString();
    const stateRaw = (req.query.state || '').toString();
    const state = (() => { try { return JSON.parse(stateRaw || '{}'); } catch { return {}; } })();
    const userId = state?.userId ? String(state.userId) : '';

    if (!code || !userId) return res.status(400).send('Missing code or userId. <a href="/">Go back</a>');

    const clientId = process.env.MICROSOFT_CLIENT_ID!;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;
    const tenantId = process.env.MICROSOFT_TENANT_ID || 'common';
    const redirectUri = process.env.MICROSOFT_REDIRECT_URI || `${process.env.PUBLIC_BASE_URL || 'http://localhost:4000'}/api/auth/microsoft/callback`;

    // Exchange code for tokens
    const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        scope: 'openid profile email offline_access Mail.Send User.Read',
      }).toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[Microsoft OAuth] Token exchange failed:', errText);
      return res.status(400).send('Microsoft token exchange failed. <a href="/">Go back</a>');
    }

    const tokens: any = await tokenRes.json();

    // Get user profile to find their email
    const profileRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile: any = profileRes.ok ? await profileRes.json() : {};
    const microsoftEmail = profile.mail || profile.userPrincipalName || null;

    console.log('[Microsoft OAuth] Connected:', microsoftEmail, 'for user:', userId);

    await prisma.user.update({
      where: { id: userId },
      data: {
        microsoftEmail,
        microsoftAccessToken: tokens.access_token || null,
        microsoftRefreshToken: tokens.refresh_token || null,
        microsoftTokenExpiry: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : null,
      },
    });

    // Redirect to frontend settings page with success
    const frontendUrl = process.env.PUBLIC_FRONTEND_URL || process.env.VITE_API_URL?.replace(/\/api$/, '') || '/';
    res.redirect(`${frontendUrl}/settings?microsoft=connected&email=${encodeURIComponent(microsoftEmail || '')}`);
  } catch (e: any) {
    console.error('[Microsoft OAuth] Callback error:', e);
    res.status(400).send('Microsoft OAuth failed: ' + (e?.message || 'unknown error') + '. <a href="/">Go back</a>');
  }
});

// Disconnect Microsoft
app.post('/api/auth/microsoft/disconnect', async (req: any, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    await prisma.user.update({
      where: { id: req.user.id },
      data: { microsoftEmail: null, microsoftAccessToken: null, microsoftRefreshToken: null, microsoftTokenExpiry: null },
    });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'disconnect error' });
  }
});

// ═══════════════════════════════════════════════════════════════
// LINKEDIN OAUTH
// ═══════════════════════════════════════════════════════════════

app.get('/api/auth/linkedin/initiate', async (req: any, res) => {
  try {
    const userId = (req.user?.id || req.query.userId || '').toString();
    if (!userId) return res.status(400).json({ error: 'userId required' });

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${process.env.PUBLIC_BASE_URL || 'http://localhost:4000'}/api/auth/linkedin/callback`;

    if (!clientId) return res.status(400).json({ error: 'LinkedIn OAuth not configured (LINKEDIN_CLIENT_ID missing)' });

    const scopes = ['openid', 'profile', 'email'];
    const state = JSON.stringify({ userId });

    const url = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code` +
      `&client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(state)}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}`;

    res.json({ url });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'LinkedIn OAuth initiate error' });
  }
});

app.get('/api/auth/linkedin/callback', async (req: any, res) => {
  try {
    const code = (req.query.code || '').toString();
    const stateRaw = (req.query.state || '').toString();
    const state = (() => { try { return JSON.parse(stateRaw || '{}'); } catch { return {}; } })();
    const userId = state?.userId ? String(state.userId) : '';

    if (!code || !userId) return res.status(400).send('Missing code or userId. <a href="/">Go back</a>');

    const clientId = process.env.LINKEDIN_CLIENT_ID!;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${process.env.PUBLIC_BASE_URL || 'http://localhost:4000'}/api/auth/linkedin/callback`;

    // Exchange code for tokens
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[LinkedIn OAuth] Token exchange failed:', errText);
      return res.status(400).send('LinkedIn token exchange failed. <a href="/">Go back</a>');
    }

    const tokens: any = await tokenRes.json();

    // Get user profile
    const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile: any = profileRes.ok ? await profileRes.json() : {};
    const linkedinProfileUrl = profile.sub ? `https://www.linkedin.com/in/${profile.sub}` : null;

    console.log('[LinkedIn OAuth] Connected for user:', userId, 'profile:', linkedinProfileUrl);

    await prisma.user.update({
      where: { id: userId },
      data: {
        linkedinProfileUrl: linkedinProfileUrl || profile.picture || 'connected',
        linkedinAccessToken: tokens.access_token || null,
        linkedinRefreshToken: tokens.refresh_token || null,
        linkedinTokenExpiry: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : null,
      },
    });

    const frontendUrl = process.env.PUBLIC_FRONTEND_URL || '/';
    res.redirect(`${frontendUrl}/settings?linkedin=connected`);
  } catch (e: any) {
    console.error('[LinkedIn OAuth] Callback error:', e);
    res.status(400).send('LinkedIn OAuth failed: ' + (e?.message || 'unknown error') + '. <a href="/">Go back</a>');
  }
});

// Disconnect LinkedIn
app.post('/api/auth/linkedin/disconnect', async (req: any, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    await prisma.user.update({
      where: { id: req.user.id },
      data: { linkedinProfileUrl: null, linkedinAccessToken: null, linkedinRefreshToken: null, linkedinTokenExpiry: null },
    });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'disconnect error' });
  }
});

app.post('/api/gmail/sync', async (req, res) => {
  try {
    const body = z.object({ userId: z.string(), days: z.number().optional() }).parse(req.body || {});
    const user = await prisma.user.findUnique({ where: { id: body.userId } });
    if (!user || !user.googleRefreshToken) return res.status(400).json({ error: 'Google not connected' });
    const oauth2Client = createOAuthClient();
    oauth2Client.setCredentials({ refresh_token: user.googleRefreshToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const sinceDays = Math.max(1, Math.min(60, body.days || 30));
    const sent = await prisma.message.findMany({
      where: { direction: 'out', subject: { not: null }, convo: { contact: { email: { not: null } } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { convo: { include: { contact: true } } },
    });

    let imported = 0;
    for (const m of sent) {
      const contactEmail = (m as any).convo?.contact?.email as string | undefined;
      const subject = m.subject as string | undefined;
      if (!contactEmail || !subject) continue;
      const q = `from:${contactEmail} to:${user.googleEmail || user.email} subject:\"${subject.replace(/\\\"/g, '"')}\" newer_than:${sinceDays}d`;
      const list = await gmail.users.messages.list({ userId: 'me', q, maxResults: 5 });
      const msgs = list.data.messages || [];
      for (const gm of msgs) {
        const msgId = gm.id as string;
        const exists = await prisma.message.findFirst({ where: { provider: 'gmail', providerMessageId: msgId } });
        if (exists) continue;
        const full = await gmail.users.messages.get({ userId: 'me', id: msgId, format: 'full' });
        const snippet = full.data.snippet || '';
        await prisma.message.create({ data: { conversationId: m.conversationId, direction: 'in', text: snippet || '[Gmail reply]', subject: subject, provider: 'gmail', providerMessageId: msgId, providerThreadId: (full.data.threadId as any) || null, rawJson: JSON.stringify(full.data || {}) } });
        imported++;
      }
    }
    res.json({ ok: true, imported });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'sync error' });
  }
});

// Contact automation check-in/check-out
app.post('/api/contacts/:id/checkout', async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: {
        automationCheckedOut: true,
        automationCheckedOutAt: new Date(),
        automationPausedNodeKey: req.body.nodeKey || null,
      },
    });
    res.json({ ok: true, contact });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'checkout error' });
  }
});

app.post('/api/contacts/:id/checkin', async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: {
        automationCheckedOut: false,
        // Restore to paused node or keep current stage
        stageKey: req.body.resumeFromPausedNode ? undefined : req.body.stageKey,
      },
    });
    res.json({ ok: true, contact });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'checkin error' });
  }
});

// AI-powered response generation using Gemini
app.post('/api/ai/generate-response', async (req, res) => {
  try {
    console.log('[AI] Generate response request received for contactId:', req.body?.contactId);
    const body = z.object({
      contactId: z.string(),
      conversationHistory: z.array(z.object({
        direction: z.enum(['in', 'out']),
        text: z.string(),
        time: z.string(),
      })).optional(),
    }).parse(req.body);

    const contact = await prisma.contact.findUnique({
      where: { id: body.contactId },
      include: { campaign: true },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Get conversation history if not provided
    let history = body.conversationHistory || [];
    if (!history.length) {
      const convo = await prisma.conversation.findFirst({
        where: { contactId: contact.id },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
      });
      if (convo) {
        history = convo.messages.map((m) => ({
          direction: m.direction as 'in' | 'out',
          text: m.text,
          time: m.createdAt.toISOString(),
        }));
      }
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'GEMINI_API_KEY not configured' });
    }

    // Build context for AI
    const campaignContext = contact.campaign
      ? `Campaign: ${contact.campaign.name}\nEvent Type: ${contact.campaign.eventType}\nEvent Date: ${contact.campaign.eventDate}\nLocation: ${contact.campaign.city}, ${contact.campaign.state}`
      : '';

    const conversationContext = history
      .map((m) => `${m.direction === 'in' ? 'Contact' : 'You'}: ${m.text}`)
      .join('\n');

    const prompt = `You are a professional business development representative responding to a contact in a real estate event automation system.

Contact Details:
- Name: ${contact.name}
- Status: ${contact.status}
${campaignContext}

Recent Conversation:
${conversationContext || 'No previous messages'}

Based on the conversation history and context, generate a professional, helpful, and engaging response. The response should:
1. Be conversational and friendly
2. Address any questions or concerns raised
3. Guide the contact toward attending the event or next steps
4. Be concise (2-3 sentences max for SMS)
5. Include a clear call-to-action when appropriate

Generate only the response text, without any labels or prefixes:`;

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('[AI] Gemini API error:', errorText);
      return res.status(500).json({ error: 'Failed to generate AI response' });
    }

    const geminiData: any = await geminiResponse.json();
    const generatedText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!generatedText) {
      return res.status(500).json({ error: 'No response generated' });
    }

    res.json({ ok: true, response: generatedText.trim() });
  } catch (e: any) {
    console.error('[AI] Generate response error:', e);
    res.status(500).json({ error: e?.message || 'generation error' });
  }
});

// ═══════════════════════════════════════════════════════════════
// AI INBOX RESPONSE GENERATOR - Newbury Partners Voice
// ═══════════════════════════════════════════════════════════════

/**
 * Generate AI response for inbox message
 * POST /api/ai/inbox/generate-response
 */
app.post('/api/ai/inbox/generate-response', async (req, res) => {
  try {
    const body = z.object({
      messageId: z.string(),
      incomingMessage: z.object({
        id: z.string(),
        from: z.string(),
        fromEmail: z.string(),
        fromCompany: z.string().optional(),
        subject: z.string(),
        body: z.string(),
        timestamp: z.string(),
      }),
      contactInfo: z.object({
        name: z.string(),
        company: z.string(),
        title: z.string().optional(),
        industry: z.string().optional(),
        firmSize: z.string().optional(),
      }).optional(),
      campaignContext: z.object({
        product: z.enum(['dealsheet', 'kanban', 'commissions']),
        stage: z.enum(['awareness', 'consideration', 'decision', 'retention']),
      }).optional(),
      bdrNotes: z.string().optional(),
    }).parse(req.body);

    const generatedResponse = await generateInboxResponse({
      incomingMessage: body.incomingMessage,
      contactInfo: body.contactInfo,
      campaignContext: body.campaignContext,
      bdrNotes: body.bdrNotes,
    });

    res.json({
      success: true,
      response: generatedResponse,
    });
  } catch (e: any) {
    console.error('AI Response Generation Error:', e);
    res.status(500).json({ error: e?.message || 'AI generation failed' });
  }
});

/**
 * Generate multiple response options for BDR to choose from
 * POST /api/ai/inbox/generate-options
 */
app.post('/api/ai/inbox/generate-options', async (req, res) => {
  try {
    const body = z.object({
      incomingMessage: z.object({
        id: z.string(),
        from: z.string(),
        fromEmail: z.string(),
        fromCompany: z.string().optional(),
        subject: z.string(),
        body: z.string(),
        timestamp: z.string(),
      }),
      contactInfo: z.object({
        name: z.string(),
        company: z.string(),
        title: z.string().optional(),
        industry: z.string().optional(),
        firmSize: z.string().optional(),
      }).optional(),
      campaignContext: z.object({
        product: z.enum(['dealsheet', 'kanban', 'commissions']),
        stage: z.enum(['awareness', 'consideration', 'decision', 'retention']),
      }).optional(),
      count: z.number().min(1).max(3).default(3),
    }).parse(req.body);

    const options = await generateResponseOptions({
      incomingMessage: body.incomingMessage,
      contactInfo: body.contactInfo,
      campaignContext: body.campaignContext,
    }, body.count);

    res.json({
      success: true,
      options,
    });
  } catch (e: any) {
    console.error('AI Options Generation Error:', e);
    res.status(500).json({ error: e?.message || 'AI options generation failed' });
  }
});

// ═══════════════════════════════════════════════════════════════
// AI CAMPAIGN BUILDER
// ═══════════════════════════════════════════════════════════════

/**
 * Generate a complete AI-powered marketing campaign
 * POST /api/ai/campaign/generate
 */
app.post('/api/ai/campaign/generate', async (req, res) => {
  try {
    const {
      campaignDescription,
      numberOfSteps,
      availableNodeTypes,
      targetAudience,
      campaignGoal,
      tone,
      industry,
      includeExistingTemplates,
    } = req.body;

    // Validate inputs
    if (!campaignDescription || !campaignDescription.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Campaign description is required' 
      });
    }

    // Optionally fetch existing templates to match tone
    let existingTemplates: any[] = [];
    if (includeExistingTemplates) {
      try {
        const templates = await prisma.contentTemplate.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            type: true,
            subject: true,
            body: true,
            text: true,
            ttsScript: true,
          }
        });
        
        existingTemplates = templates.map(t => ({
          type: t.type,
          subject: t.subject || undefined,
          body: t.body || undefined,
          text: t.text || undefined,
          ttsScript: t.ttsScript || undefined,
        }));
      } catch (err) {
        console.warn('[AI Campaign] Could not fetch existing templates:', err);
      }
    }

    const campaign = await generateCampaign({
      campaignDescription,
      numberOfSteps: numberOfSteps || 5,
      availableNodeTypes: availableNodeTypes || ['email_send', 'sms_send', 'wait', 'voicemail_drop'],
      targetAudience,
      campaignGoal,
      tone,
      industry,
    }, existingTemplates);

    console.log('✅ AI Campaign Generated:', campaign.name);

    res.json({ success: true, campaign });
  } catch (error: any) {
    console.error('[AI Campaign Generate]', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate campaign' 
    });
  }
});

/**
 * Refine specific campaign content with AI
 * POST /api/ai/campaign/refine
 */
app.post('/api/ai/campaign/refine', async (req, res) => {
  try {
    const { nodeType, currentContent, refinementRequest, campaignContext } = req.body;

    if (!nodeType || !currentContent) {
      return res.status(400).json({ 
        success: false, 
        error: 'nodeType and currentContent are required' 
      });
    }

    if (!refinementRequest || !refinementRequest.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'refinementRequest is required' 
      });
    }

    const refinedContent = await refineContent(
      nodeType,
      currentContent,
      refinementRequest,
      campaignContext
    );

    console.log('✅ AI Content Refined for node type:', nodeType);

    res.json({ success: true, content: refinedContent });
  } catch (error: any) {
    console.error('[AI Campaign Refine]', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to refine content' 
    });
  }
});

/**
 * Generate A/B test variations of campaign content
 * POST /api/ai/campaign/variations
 */
// Save AI-generated campaign as template (workaround for CORS issues)
app.post('/api/ai/campaign/save-as-template', async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    
    if (!name || !nodes || !edges) {
      return res.status(400).json({ error: 'Missing required fields: name, nodes, edges' });
    }
    
    // Normalize config format: convert top-level subject/body/text (Format C)
    // to nested content/tts (Format B) before persisting
    function normalizeNodeConfig(config: any): any {
      if (!config || typeof config !== 'object') return config;
      const cfg = { ...config };
      // email: top-level subject/body → content.subject/content.body
      if (cfg.subject || cfg.body) {
        cfg.content = cfg.content || {};
        cfg.content.subject = cfg.content.subject || cfg.subject;
        cfg.content.body = cfg.content.body || cfg.body;
        delete cfg.subject;
        delete cfg.body;
      }
      // sms: top-level text → content.text
      if (cfg.text && !cfg.content?.text) {
        cfg.content = cfg.content || {};
        cfg.content.text = cfg.text;
        delete cfg.text;
      }
      // voicemail: top-level ttsScript → tts.custom_script
      if (cfg.ttsScript && !cfg.tts?.custom_script) {
        cfg.tts = cfg.tts || {};
        cfg.tts.custom_script = cfg.ttsScript;
        delete cfg.ttsScript;
      }
      return cfg;
    }

    // Create template - handle both AI format and frontend format
    const created = await prisma.template.create({
      data: {
        name,
        status: 'draft',
        nodes: {
          create: nodes.map((n: any) => {
            let config = n.config || {};
            // Parse configJson if it's a string
            if (n.configJson && typeof n.configJson === 'string') {
              try { config = JSON.parse(n.configJson); } catch {}
            }
            config = normalizeNodeConfig(config);
            return {
              // Handle both formats: {id, type, name} and {key, type, name}
              key: n.key || n.id,
              type: n.type,
              name: n.name,
              configJson: JSON.stringify(config),
              posX: n.posX ?? null,
              posY: n.posY ?? null,
            };
          })
        },
        edges: {
          create: edges.map((e: any) => ({
            // Handle both {from, to} and {fromKey, toKey}
            fromKey: e.fromKey || e.from,
            toKey: e.toKey || e.to,
            // Handle both {condition: obj} and {conditionJson: string}
            conditionJson: e.conditionJson || (e.condition ? JSON.stringify(e.condition) : null)
          }))
        }
      },
      include: { nodes: true, edges: true }
    });
    
    res.json(created);
  } catch (error: any) {
    console.error('[AI Campaign Save] Error:', error);
    res.status(500).json({ error: error.message || 'Failed to save campaign' });
  }
});

app.post('/api/ai/campaign/variations', async (req, res) => {
  try {
    const { nodeType, originalContent, numberOfVariations } = req.body;

    if (!nodeType || !originalContent) {
      return res.status(400).json({ 
        success: false, 
        error: 'nodeType and originalContent are required' 
      });
    }

    const variations = await generateVariations(
      nodeType,
      originalContent,
      numberOfVariations || 3
    );

    console.log(`✅ Generated ${variations.length} AI content variations`);

    res.json({ success: true, variations });
  } catch (error: any) {
    console.error('[AI Campaign Variations]', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate variations' 
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// APOLLO.IO INTEGRATION
// ═══════════════════════════════════════════════════════════════

/**
 * Search for people using Apollo.io
 * POST /api/apollo/people/search
 */
app.post('/api/apollo/people/search', async (req, res) => {
  try {
    const body = z.object({
      q_keywords: z.string().optional(),
      person_titles: z.array(z.string()).optional(),
      person_seniorities: z.array(z.string()).optional(),
      organization_num_employees_ranges: z.array(z.string()).optional(),
      organization_locations: z.array(z.string()).optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }).parse(req.body);

    const result = await searchPeople(body);

    res.json({
      success: true,
      data: result,
    });
  } catch (e: any) {
    console.error('Apollo People Search Error:', e);
    res.status(500).json({ error: e?.message || 'Apollo search failed' });
  }
});

/**
 * Search for organizations using Apollo.io
 * POST /api/apollo/organizations/search
 */
app.post('/api/apollo/organizations/search', async (req, res) => {
  try {
    const body = z.object({
      q_organization_keyword_tags: z.array(z.string()).optional(),
      organization_num_employees_ranges: z.array(z.string()).optional(),
      organization_locations: z.array(z.string()).optional(),
      industry_tag_ids: z.array(z.string()).optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }).parse(req.body);

    const result = await searchOrganizations(body);

    res.json({
      success: true,
      data: result,
    });
  } catch (e: any) {
    console.error('Apollo Organizations Search Error:', e);
    res.status(500).json({ error: e?.message || 'Apollo search failed' });
  }
});

// ═══════════════════════════════════════════════════════════════
// AI EMAIL PERSONALIZATION
// ═══════════════════════════════════════════════════════════════

// In-memory tracking for personalization jobs (simple approach)
const personalizationJobs: Record<string, { total: number; completed: number; failed: number; running: boolean }> = {};

/**
 * Trigger AI personalization generation for all contacts × email nodes
 * POST /api/campaigns/:id/personalize
 */
app.post('/api/campaigns/:id/personalize', async (req, res) => {
  const campaignId = req.params.id;
  try {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    // Get all email_send nodes
    const emailNodes = await prisma.campaignNode.findMany({
      where: { campaignId, type: 'email_send' },
    });
    if (emailNodes.length === 0) {
      return res.status(400).json({ error: 'No email nodes found in campaign funnel' });
    }

    // Get all contacts with email
    const contacts = await prisma.contact.findMany({
      where: { campaignId, email: { not: null } },
    });
    if (contacts.length === 0) {
      return res.status(400).json({ error: 'No contacts with email addresses in this campaign' });
    }

    const total = contacts.length * emailNodes.length;
    personalizationJobs[campaignId] = { total, completed: 0, failed: 0, running: true };

    // Return immediately; process in background
    res.json({ success: true, total, message: 'Personalization started' });

    // Background processing
    const campaignCtx = { name: campaign.name, ownerName: campaign.ownerName, eventType: campaign.eventType };

    for (const node of emailNodes) {
      let cfg: any = {};
      try { cfg = node.configJson ? JSON.parse(node.configJson) : {}; } catch {}
      const { subject: origSubject, body: origBody } = await resolveEmailFromConfig(cfg);

      if (!origSubject && !origBody) {
        // Skip nodes with no content
        personalizationJobs[campaignId].completed += contacts.length;
        continue;
      }

      for (const ct of contacts) {
        try {
          // Parse rawJson for extra contact data
          let rawData: any = {};
          try { rawData = ct.rawJson ? JSON.parse(ct.rawJson) : {}; } catch {}

          const np = splitName(ct.name || '');
          const contactData: PersonalizationContact = {
            first_name: np.first_name,
            last_name: np.last_name,
            company: ct.company || rawData.company || '',
            title: rawData.title || '',
            industry: rawData.industry || rawData.organization_industry || '',
            city: ct.city || '',
            state: ct.state || '',
            email: ct.email || '',
            revenue: rawData.revenue || rawData.firm_revenue || '',
            employees: rawData.employees || rawData.estimated_employees || '',
            technologies: rawData.technologies || '',
          };

          // Apply merge tags to get the "original" rendered version for this contact
          const mergeCtx = { contact: { name: ct.name, first_name: np.first_name, last_name: np.last_name, email: ct.email, phone: ct.phone }, campaign: { name: campaign.name, owner_name: campaign.ownerName } };
          const renderedSubject = renderMergeTags(origSubject || '', mergeCtx);
          const renderedBody = renderMergeTags(origBody || '', mergeCtx);

          const result = await personalizeContent(
            contactData,
            { type: 'email', subject: renderedSubject, body: renderedBody },
            campaignCtx
          );

          // Upsert the personalized email record
          await prisma.personalizedEmail.upsert({
            where: {
              campaignId_contactId_nodeKey: { campaignId, contactId: ct.id, nodeKey: node.key },
            },
            create: {
              campaignId,
              contactId: ct.id,
              nodeKey: node.key,
              originalSubject: renderedSubject,
              originalBody: renderedBody,
              subject: result.subject || renderedSubject,
              body: result.body || renderedBody,
              rationale: result.rationale || '',
              status: 'pending',
            },
            update: {
              originalSubject: renderedSubject,
              originalBody: renderedBody,
              subject: result.subject || renderedSubject,
              body: result.body || renderedBody,
              rationale: result.rationale || '',
              status: 'pending',
              editedSubject: null,
              editedBody: null,
            },
          });

          personalizationJobs[campaignId].completed++;
        } catch (err) {
          console.error(`[personalize] Failed for contact ${ct.id}, node ${node.key}:`, err);
          personalizationJobs[campaignId].failed++;
          personalizationJobs[campaignId].completed++;
        }

        // Rate limiting between contacts
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }

    personalizationJobs[campaignId].running = false;

    // Update campaign to mark personalization enabled
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { aiPersonalization: true },
    });

  } catch (e: any) {
    console.error('Personalization trigger error:', e);
    if (personalizationJobs[campaignId]) personalizationJobs[campaignId].running = false;
    // Only send error if headers not already sent
    if (!res.headersSent) {
      res.status(500).json({ error: e?.message || 'Personalization failed' });
    }
  }
});

/**
 * Get personalization job status
 * GET /api/campaigns/:id/personalize/status
 */
app.get('/api/campaigns/:id/personalize/status', async (req, res) => {
  const campaignId = req.params.id;
  const job = personalizationJobs[campaignId];
  if (!job) {
    // Check if there are any persisted personalized emails
    const count = await prisma.personalizedEmail.count({ where: { campaignId } });
    if (count > 0) {
      return res.json({ total: count, completed: count, failed: 0, running: false });
    }
    return res.json({ total: 0, completed: 0, failed: 0, running: false });
  }
  res.json(job);
});

/**
 * Get all personalized emails for a campaign
 * GET /api/campaigns/:id/personalized-emails
 */
app.get('/api/campaigns/:id/personalized-emails', async (req, res) => {
  try {
    const emails = await prisma.personalizedEmail.findMany({
      where: { campaignId: req.params.id },
      include: {
        contact: { select: { id: true, name: true, company: true, email: true } },
      },
      orderBy: [{ nodeKey: 'asc' }, { contact: { name: 'asc' } }],
    });
    res.json(emails);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Failed to load personalized emails' });
  }
});

/**
 * Update a single personalized email (approve, reject, edit)
 * PATCH /api/personalized-emails/:id
 */
app.patch('/api/personalized-emails/:id', async (req, res) => {
  try {
    const body = z.object({
      status: z.enum(['pending', 'approved', 'edited', 'rejected']).optional(),
      editedSubject: z.string().optional(),
      editedBody: z.string().optional(),
    }).parse(req.body);

    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.editedSubject !== undefined) updateData.editedSubject = body.editedSubject;
    if (body.editedBody !== undefined) updateData.editedBody = body.editedBody;

    // If editing content, auto-set status to 'edited'
    if (body.editedSubject !== undefined || body.editedBody !== undefined) {
      updateData.status = 'edited';
    }

    const updated = await prisma.personalizedEmail.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Update failed' });
  }
});

/**
 * Bulk approve all pending personalized emails for a campaign
 * PATCH /api/campaigns/:id/personalized-emails/bulk-approve
 */
app.patch('/api/campaigns/:id/personalized-emails/bulk-approve', async (req, res) => {
  try {
    const result = await prisma.personalizedEmail.updateMany({
      where: { campaignId: req.params.id, status: 'pending' },
      data: { status: 'approved' },
    });
    res.json({ success: true, count: result.count });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Bulk approve failed' });
  }
});

/**
 * ADMIN: Run comprehensive Paycile funnel seed
 * POST /api/admin/seed-comprehensive-funnels
 */
app.post('/api/admin/seed-comprehensive-funnels', async (req, res) => {
  try {
    // Import and run the seed script
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    console.log('🚀 Running comprehensive funnel seed...');
    
    const { stdout, stderr } = await execPromise(
      'node scripts/seed_comprehensive_paycile_funnels.js',
      { cwd: '/opt/render/project/src/apps/server' }
    );
    
    console.log('Seed output:', stdout);
    if (stderr) console.error('Seed errors:', stderr);
    
    res.json({
      success: true,
      message: 'Comprehensive funnels seeded successfully',
      output: stdout,
      errors: stderr
    });
  } catch (e: any) {
    console.error('Seed failed:', e);
    res.status(500).json({ 
      error: e?.message || 'Seed failed',
      output: e?.stdout,
      errors: e?.stderr
    });
  }
});

/**
 * ADMIN: Import Apollo Yardi contacts
 * POST /api/admin/import-apollo-yardi-contacts
 */
app.post('/api/admin/import-apollo-yardi-contacts', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    console.log('🎯 Importing Apollo Yardi contacts...');
    
    const { stdout, stderr } = await execPromise(
      'node scripts/import_apollo_yardi_contacts.js',
      { cwd: '/opt/render/project/src/apps/server', timeout: 120000 }
    );
    
    console.log('Import output:', stdout);
    if (stderr) console.error('Import errors:', stderr);
    
    res.json({
      success: true,
      message: 'Apollo Yardi contacts imported successfully',
      output: stdout,
      errors: stderr
    });
  } catch (e: any) {
    console.error('Import failed:', e);
    res.status(500).json({ 
      error: e?.message || 'Import failed',
      output: e?.stdout,
      errors: e?.stderr
    });
  }
});

/**
 * ADMIN: Populate CFO Insurance Mock Data
 * POST /api/admin/populate-cfo-mock-data
 */
app.post('/api/admin/populate-cfo-mock-data', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    console.log('📊 Populating CFO Insurance mock data...');
    
    const { stdout, stderr } = await execPromise(
      'node scripts/populate_cfo_insurance_mock_data.js',
      { cwd: '/opt/render/project/src/apps/server', timeout: 180000 }
    );
    
    console.log('Mock data output:', stdout);
    if (stderr) console.error('Mock data errors:', stderr);
    
    res.json({
      success: true,
      message: 'CFO Insurance mock data populated successfully',
      output: stdout,
      errors: stderr
    });
  } catch (e: any) {
    console.error('Mock data population failed:', e);
    res.status(500).json({ 
      error: e?.message || 'Mock data population failed',
      output: e?.stdout,
      errors: e?.stderr
    });
  }
});

/**
 * ADMIN: Cleanup duplicate messages for CFO campaign
 * POST /api/admin/cleanup-cfo-messages
 */
app.post('/api/admin/cleanup-cfo-messages', async (req, res) => {
  try {
    console.log('🧹 Cleaning up duplicate CFO messages...');
    
    const CAMPAIGN_ID = 'cmk2tcx0q001e1403fls3rwc2';
    
    // Get all contacts for this campaign
    const contacts = await prisma.contact.findMany({
      where: { campaignId: CAMPAIGN_ID },
      include: {
        conversations: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' }
            }
          }
        }
      }
    });
    
    let messagesDeleted = 0;
    let conversationsDeleted = 0;
    
    for (const contact of contacts) {
      if (contact.status === 'No Activity') {
        // Delete ALL messages and conversations for No Activity contacts
        for (const conv of contact.conversations) {
          if (conv.messages.length > 0) {
            await prisma.message.deleteMany({
              where: { conversationId: conv.id }
            });
            messagesDeleted += conv.messages.length;
          }
          
          await prisma.conversation.delete({
            where: { id: conv.id }
          });
          conversationsDeleted++;
        }
      } else if (contact.status === 'Email Sent' || contact.status === 'Email Opened') {
        // Keep only the FIRST message, delete the rest
        for (const conv of contact.conversations) {
          if (conv.messages.length > 1) {
            const messagesToDelete = conv.messages.slice(1);
            
            for (const msg of messagesToDelete) {
              await prisma.message.delete({
                where: { id: msg.id }
              });
              messagesDeleted++;
            }
          }
        }
      }
    }
    
    // Verify final counts
    const finalStats = await prisma.contact.groupBy({
      by: ['status'],
      where: { campaignId: CAMPAIGN_ID },
      _count: true
    });
    
    const totalMessages = await prisma.message.count({
      where: {
        convo: {
          contact: {
            campaignId: CAMPAIGN_ID
          }
        }
      }
    });
    
    res.json({
      success: true,
      messagesDeleted,
      conversationsDeleted,
      finalStats,
      totalMessages,
      message: `Cleaned up ${messagesDeleted} duplicate messages`
    });
    
  } catch (e: any) {
    console.error('Cleanup failed:', e);
    res.status(500).json({ 
      error: e?.message || 'Cleanup failed'
    });
  }
});

// =============================================================================
// LEAD SUBMISSION FROM LANDING PAGES → HUBSPOT
// =============================================================================

app.post('/api/leads/submit', async (req, res) => {
  try {
    const leadData = req.body;
    
    console.log('📝 Received lead submission:', leadData.email);

    // Validate required fields
    if (!leadData.email || !leadData.firstName || !leadData.lastName || !leadData.company) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Push to HubSpot
    const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
    
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error('❌ HUBSPOT_ACCESS_TOKEN not configured');
      return res.status(500).json({ error: 'HubSpot integration not configured' });
    }

    // Use only standard HubSpot properties that definitely exist
    const hubspotProperties: any = {
      email: leadData.email,
      firstname: leadData.firstName,
      lastname: leadData.lastName,
      company: leadData.company,
      phone: leadData.phone || '',
      jobtitle: leadData.jobTitle || '',
      lifecyclestage: 'lead',
      // Use hs_analytics_source for tracking (this is writable on contact creation)
      hs_analytics_source: 'OFFLINE'
    };

    // Add standard properties that are safe
    if (leadData.companySize) {
      hubspotProperties.company_size = leadData.companySize;
    }
    
    // Store PLG Campaign data in notes instead of read-only properties
    const additionalData = {
      source: leadData.source || 'Landing Page',
      persona: leadData.persona,
      campaign_name: leadData.campaign_name,
      status: leadData.status,
      lead_score: leadData.lead_score,
      message: leadData.message,
      record_source: 'PLG CAMPAIGN', // Store in note for tracking
      marketing_contact_status: 'Marketing Contact' // Store in note
    };

    // Try to find existing contact
    let hubspotContactId = null;
    try {
      const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: leadData.email
            }]
          }]
        })
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.results && searchData.results.length > 0) {
          hubspotContactId = searchData.results[0].id;
        }
      }
    } catch (searchError) {
      console.log('Contact not found, will create new');
    }

    // Create or update contact in HubSpot
    let hubspotResponse;
    if (hubspotContactId) {
      // Update existing contact
      hubspotResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${hubspotContactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: hubspotProperties })
      });
      console.log(`✅ Updated HubSpot contact: ${leadData.email} (ID: ${hubspotContactId})`);
    } else {
      // Create new contact
      hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: hubspotProperties })
      });
      
      if (hubspotResponse.ok) {
        const hubspotData = await hubspotResponse.json();
        hubspotContactId = hubspotData.id;
        console.log(`✅ Created HubSpot contact: ${leadData.email} (ID: ${hubspotContactId})`);
      }
    }

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json().catch(() => ({}));
      console.error('❌ HubSpot API error:', JSON.stringify(errorData, null, 2));
      console.error('❌ HubSpot status:', hubspotResponse.status);
      console.error('❌ Properties sent:', JSON.stringify(hubspotProperties, null, 2));
      throw new Error(`Failed to sync with HubSpot: ${errorData.message || hubspotResponse.statusText}`);
    }

    // Create a note with all the additional data including PLG Campaign tags
    if (hubspotContactId) {
      try {
        const noteBody = `
          <div style="background: #f0f9ff; padding: 12px; border-left: 4px solid #0891b2; margin-bottom: 16px;">
            <strong>🎯 PLG CAMPAIGN LEAD</strong>
          </div>
          
          <strong>📊 Lead Information:</strong><br>
          <strong>RECORD_SOURCE:</strong> PLG CAMPAIGN<br>
          <strong>MARKETING_CONTACT_STATUS:</strong> Marketing Contact<br>
          <strong>Source:</strong> ${additionalData.source}<br>
          <strong>Campaign:</strong> ${additionalData.campaign_name || 'N/A'}<br>
          <strong>Persona:</strong> ${additionalData.persona || 'N/A'}<br>
          <strong>Lead Score:</strong> ${additionalData.lead_score || 'N/A'}<br>
          <strong>Status:</strong> ${additionalData.status || 'new'}<br>
          <strong>Company Size:</strong> ${leadData.companySize || 'N/A'}<br><br>
          ${additionalData.message ? `<strong>💬 Message from Lead:</strong><br><div style="background: #f9fafb; padding: 8px; border-radius: 4px; margin-top: 8px;">${additionalData.message}</div>` : ''}
        `;
        
        await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: {
              hs_timestamp: Date.now(),
              hs_note_body: noteBody
            },
            associations: [{
              to: { id: hubspotContactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }]
            }]
          })
        });
        console.log(`✅ Added note to HubSpot contact ${hubspotContactId}`);
      } catch (noteError) {
        console.error('Failed to create note:', noteError);
      }
    }

    // Send notification email to sales team
    try {
      const notificationSubject = `🎯 New Lead: ${leadData.firstName} ${leadData.lastName} from ${leadData.company}`;
      const notificationBody = `
        <h2>New Lead Submission from CFO Insurance Landing Page</h2>
        <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Company:</strong> ${leadData.company}</p>
        <p><strong>Job Title:</strong> ${leadData.jobTitle || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${leadData.phone || 'Not provided'}</p>
        <p><strong>Company Size:</strong> ${leadData.companySize || 'Not provided'}</p>
        ${leadData.message ? `<p><strong>Message:</strong><br>${leadData.message}</p>` : ''}
        <p><strong>Source:</strong> ${leadData.source || 'Landing Page'}</p>
        <p><strong>HubSpot Contact ID:</strong> ${hubspotContactId}</p>
        <hr>
        <p><a href="https://app.hubspot.com/contacts/${process.env.HUBSPOT_PORTAL_ID || '243314049'}/contact/${hubspotContactId}">View in HubSpot</a></p>
      `;

      if (isGraphConfigured()) {
        await sendGraphEmail({
          to: process.env.SALES_NOTIFICATION_EMAIL || 'jim@paycile.com',
          subject: notificationSubject,
          body: notificationBody
        });
        console.log('✅ Sent notification email to sales team');
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    res.json({ 
      success: true, 
      message: 'Lead submitted successfully',
      hubspot_contact_id: hubspotContactId
    });

  } catch (error: any) {
    console.error('❌ Lead submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit lead',
      details: error.message 
    });
  }
});

// =============================================================================
// EMAIL REPLY TRACKING → HUBSPOT
// =============================================================================

// Webhook endpoint for email replies (configure in email provider)
app.post('/api/email/reply-webhook', async (req, res) => {
  try {
    const { from, to, subject, body, messageId } = req.body;
    
    console.log('📬 Received email reply:', from);
    
    // Find contact by email
    const contact = await prisma.contact.findFirst({
      where: { email: from },
      include: { campaign: true }
    });
    
    if (!contact) {
      console.log('⚠️ Email reply from unknown contact:', from);
      return res.json({ ok: true, message: 'Contact not found, skipped' });
    }
    
    // Log the reply to conversation
    let convo = await prisma.conversation.findFirst({
      where: { contactId: contact.id, channel: 'email' }
    });
    
    if (!convo) {
      convo = await prisma.conversation.create({
        data: { contactId: contact.id, channel: 'email' }
      });
    }
    
    await prisma.message.create({
      data: {
        conversationId: convo.id,
        direction: 'in',
        text: body || '',
        subject: subject || '',
        providerMessageId: messageId || undefined,
        rawJson: JSON.stringify(req.body)
      }
    });
    
    // Push reply to HubSpot with PLG tags
    const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
    
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        // Find or create HubSpot contact
        const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: 'email',
                operator: 'EQ',
                value: from
              }]
            }]
          })
        });
        
        let hubspotContactId = null;
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.results && searchData.results.length > 0) {
            hubspotContactId = searchData.results[0].id;
          }
        }
        
        // Update contact properties with PLG tags
        const hubspotProperties: any = {
          // RECORD_SOURCE = PLG CAMPAIGN
          hs_analytics_source: 'OFFLINE',
          hs_analytics_source_data_1: 'PLG CAMPAIGN',
          hs_analytics_source_data_2: 'Email Reply',
          // MARKETING_CONTACT_STATUS = Marketing Contact
          hs_marketable_status: 'Marketing Contact',
          hs_lead_status: 'OPEN',
          lifecyclestage: 'lead'
        };
        
        if (contact.campaign) {
          hubspotProperties.paycile_campaign_name = contact.campaign.name;
        }
        
        if (hubspotContactId) {
          // Update existing contact
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${hubspotContactId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ properties: hubspotProperties })
          });
          
          // Add note with email reply content
          await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              properties: {
                hs_timestamp: Date.now(),
                hs_note_body: `<strong>Email Reply - ${contact.campaign?.name || 'Campaign'}</strong><br><br><strong>Subject:</strong> ${subject || 'No subject'}<br><br>${body || 'No body'}`
              },
              associations: [{
                to: { id: hubspotContactId },
                types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }]
              }]
            })
          });
          
          console.log(`✅ Pushed email reply to HubSpot (Contact ID: ${hubspotContactId})`);
        }
      } catch (hubspotError) {
        console.error('❌ Failed to push to HubSpot:', hubspotError);
      }
    }
    
    res.json({ ok: true, message: 'Reply logged successfully' });
    
  } catch (error: any) {
    console.error('❌ Email reply webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// ADMIN: DATABASE MANAGEMENT ENDPOINTS
// =============================================================================

// Create/update admin user (one-time setup)
app.post('/api/admin/create-admin-user', async (req, res) => {
  try {
    // Check if admin already exists
    const existing = await prisma.user.findUnique({ where: { email: 'admin@paycile.com' } });
    
    // Always reset password to Pass@123
    const passwordHash = await bcrypt.hash('Pass@123', 10);
    
    let admin;
    if (existing) {
      // Update existing user's password
      admin = await prisma.user.update({
        where: { email: 'admin@paycile.com' },
        data: { passwordHash, role: 'admin' }
      });
      
      res.json({ 
        ok: true, 
        message: 'Admin user password updated',
        email: 'admin@paycile.com',
        credentials: {
          email: 'admin@paycile.com',
          password: 'Pass@123'
        }
      });
    } else {
      // Create new admin user
      admin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@paycile.com',
          role: 'admin',
          passwordHash
        }
      });
      
      res.json({
        ok: true,
        message: 'Admin user created successfully',
        email: admin.email,
        credentials: {
          email: 'admin@paycile.com',
          password: 'Pass@123'
        }
      });
    }
  } catch (error: any) {
    console.error('[Create Admin] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// ADMIN: DATABASE MANAGEMENT ENDPOINTS
// =============================================================================

// Clear all funnel templates and content templates
app.post('/api/admin/clear-all-templates', async (req, res) => {
  try {
    console.log('🗑️ Clearing all templates...');
    
    // Delete all funnel template nodes and edges first (foreign key constraints)
    const nodesDeleted = await prisma.node.deleteMany({});
    const edgesDeleted = await prisma.edge.deleteMany({});
    
    // Delete all template versions
    const versionsDeleted = await prisma.templateVersion.deleteMany({});
    
    // Delete all funnel templates
    const templatesDeleted = await prisma.template.deleteMany({});
    
    // Delete all content templates
    const contentTemplatesDeleted = await prisma.contentTemplate.deleteMany({});
    
    console.log('✅ Cleanup complete');
    
    res.json({
      ok: true,
      message: 'All templates cleared successfully',
      deleted: {
        funnelTemplates: templatesDeleted.count,
        nodes: nodesDeleted.count,
        edges: edgesDeleted.count,
        templateVersions: versionsDeleted.count,
        contentTemplates: contentTemplatesDeleted.count
      }
    });
    
  } catch (error: any) {
    console.error('❌ Clear templates error:', error);
    res.status(500).json({ 
      error: error.message,
      hint: 'Check database constraints'
    });
  }
});

app.post('/api/admin/run-migration', async (req, res) => {
  try {
    // Simple endpoint to create SmtpConfig table if it doesn't exist
    // This is a workaround for Render shell access issues
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SmtpConfig" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "smtpHost" TEXT NOT NULL,
        "smtpPort" INTEGER NOT NULL,
        "smtpUser" TEXT NOT NULL,
        "smtpPass" TEXT NOT NULL,
        "smtpSecure" BOOLEAN NOT NULL DEFAULT true,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "dailySent" INTEGER NOT NULL DEFAULT 0,
        "lastUsed" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "SmtpConfig_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SmtpConfig_email_key" ON "SmtpConfig"("email");
    `);
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "EmailQueue" ADD COLUMN IF NOT EXISTS "smtpConfigId" TEXT;
    `);
    
    res.json({ 
      ok: true, 
      message: 'Migration completed successfully',
      tables_created: ['SmtpConfig'],
      columns_added: ['EmailQueue.smtpConfigId']
    });
    
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({ 
      error: error.message,
      hint: 'Table might already exist, which is fine'
    });
  }
});

// =============================================================================
// SENDER EMAILS (for campaign creation dropdown)
// =============================================================================

app.get('/api/sender-emails', async (_req, res) => {
  try {
    const emails: Array<{ email: string; name: string; source: string; userId?: string }> = [];
    const seen = new Set<string>();

    // Build a lookup from email -> userId so every entry can carry its user ID
    const allUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, smtpUser: true, microsoftEmail: true },
    });
    const emailToUser = new Map<string, { id: string; name: string }>();
    for (const u of allUsers) {
      if (u.email) emailToUser.set(u.email.toLowerCase(), { id: u.id, name: u.name });
      if (u.smtpUser) emailToUser.set(u.smtpUser.toLowerCase(), { id: u.id, name: u.name });
      if (u.microsoftEmail) emailToUser.set(u.microsoftEmail.toLowerCase(), { id: u.id, name: u.name });
    }

    // 1. Primary SMTP from environment variables
    const envSmtpUser = process.env.SMTP_USER;
    const envSmtpFrom = process.env.SMTP_FROM;

    if (envSmtpUser) {
      seen.add(envSmtpUser.toLowerCase());
      const match = emailToUser.get(envSmtpUser.toLowerCase());
      emails.push({ email: envSmtpUser, name: match?.name || envSmtpUser, source: 'env', userId: match?.id });
    }
    if (envSmtpFrom && !seen.has(envSmtpFrom.toLowerCase())) {
      seen.add(envSmtpFrom.toLowerCase());
      const match = emailToUser.get(envSmtpFrom.toLowerCase());
      emails.push({ email: envSmtpFrom, name: match?.name || envSmtpFrom, source: 'env', userId: match?.id });
    }

    // 2. SmtpConfig entries (rotation/additional sender addresses)
    try {
      const configs = await prisma.smtpConfig.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
      for (const c of configs) {
        if (c.email && !seen.has(c.email.toLowerCase())) {
          seen.add(c.email.toLowerCase());
          const match = emailToUser.get(c.email.toLowerCase());
          emails.push({ email: c.email, name: match?.name || c.email, source: 'smtp', userId: match?.id });
        }
      }
    } catch (err: any) {
      console.warn('[sender-emails] SmtpConfig query failed:', err?.message);
    }

    // 3. Users with email
    for (const u of allUsers) {
      const addr = u.smtpUser || u.email;
      if (addr && !seen.has(addr.toLowerCase())) {
        seen.add(addr.toLowerCase());
        emails.push({ email: addr, name: u.name || addr, source: 'user', userId: u.id });
      }
    }

    // 4. Users with Microsoft email connected (via OAuth)
    for (const u of allUsers) {
      if (u.microsoftEmail && !seen.has(u.microsoftEmail.toLowerCase())) {
        seen.add(u.microsoftEmail.toLowerCase());
        emails.push({ email: u.microsoftEmail, name: u.name || u.microsoftEmail, source: 'microsoft', userId: u.id });
      }
    }

    console.log('[sender-emails] Returning', emails.length, 'sender emails');
    res.json(emails);
  } catch (e: any) {
    console.error('[sender-emails] Endpoint error:', e);
    res.status(500).json({ error: e?.message || 'Failed to load sender emails' });
  }
});

// =============================================================================
// SMTP CONFIGURATION MANAGEMENT
// =============================================================================

// Get all SMTP configurations
app.get('/api/smtp/configs', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const configs = await prisma.smtpConfig.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    // Don't return passwords to frontend
    res.json(configs.map(c => ({
      id: c.id,
      email: c.email,
      smtpHost: c.smtpHost,
      smtpPort: c.smtpPort,
      smtpUser: c.smtpUser,
      smtpSecure: c.smtpSecure,
      dailySent: c.dailySent,
      lastUsed: c.lastUsed,
      createdAt: c.createdAt
    })));
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'fetch error' });
  }
});

// Create SMTP configuration
app.post('/api/smtp/configs', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const body = z.object({
      email: z.string().email(),
      smtpHost: z.string(),
      smtpPort: z.number(),
      smtpUser: z.string(),
      smtpPass: z.string(),
      smtpSecure: z.boolean()
    }).parse(req.body);
    
    const config = await prisma.smtpConfig.create({
      data: {
        email: body.email,
        smtpHost: body.smtpHost,
        smtpPort: body.smtpPort,
        smtpUser: body.smtpUser,
        smtpPass: body.smtpPass, // TODO: Encrypt in production
        smtpSecure: body.smtpSecure
      }
    });
    
    res.json({
      id: config.id,
      email: config.email,
      smtpHost: config.smtpHost,
      smtpPort: config.smtpPort,
      smtpUser: config.smtpUser,
      smtpSecure: config.smtpSecure
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'create error' });
  }
});

// Delete SMTP configuration
app.delete('/api/smtp/configs/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await prisma.smtpConfig.delete({
      where: { id: req.params.id }
    });
    
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'delete error' });
  }
});

// Unsubscribe endpoint
app.get('/api/unsubscribe/:contactId', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
      include: { campaign: true }
    });
    
    if (!contact) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Contact Not Found</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>Contact Not Found</h1>
          <p>We couldn't find this contact in our system.</p>
        </body>
        </html>
      `);
    }
    
    if (contact.unsubscribed) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Already Unsubscribed</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>Already Unsubscribed</h1>
          <p>You have already been unsubscribed from our communications.</p>
          <p>If you continue to receive emails, please contact us directly.</p>
        </body>
        </html>
      `);
    }
    
    await prisma.contact.update({
      where: { id: contactId },
      data: { 
        unsubscribed: true,
        unsubscribedAt: new Date()
      }
    });
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Successfully Unsubscribed</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center;">
        <h1 style="color: #28a745;">✓ Successfully Unsubscribed</h1>
        <p>You have been removed from our email list.</p>
        <p>You will no longer receive emails from the <strong>${contact.campaign.name}</strong> campaign.</p>
        <p style="margin-top: 40px; color: #666; font-size: 14px;">
          If this was a mistake, please contact us at ${contact.campaign.ownerEmail}
        </p>
      </body>
      </html>
    `);
    
  } catch (error: any) {
    console.error('Unsubscribe error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
        <h1>Error</h1>
        <p>An error occurred while processing your request. Please try again later.</p>
      </body>
      </html>
    `);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on :${port}`);
  console.log('✓ AI Inbox Response Generator: POST /api/ai/inbox/generate-response');
  console.log('✓ AI Response Options: POST /api/ai/inbox/generate-options');
  console.log('✓ AI Campaign Builder: POST /api/ai/campaign/generate');
  console.log('✓ AI Campaign Refine: POST /api/ai/campaign/refine');
  console.log('✓ AI Campaign Variations: POST /api/ai/campaign/variations');
  console.log('✓ Check-in endpoint registered at POST /api/contacts/:id/checkin');
  console.log('✓ Check-out endpoint registered at POST /api/contacts/:id/checkout');
  console.log('✓ Apollo People Search: POST /api/apollo/people/search');
  console.log('✓ Apollo Organizations Search: POST /api/apollo/organizations/search');
  console.log('✓ AI Personalization: POST /api/campaigns/:id/personalize');
  console.log('✓ AI Personalization Status: GET /api/campaigns/:id/personalize/status');
  console.log('✓ Personalized Emails: GET /api/campaigns/:id/personalized-emails');
  console.log('✓ Update Personalized Email: PATCH /api/personalized-emails/:id');
  console.log('✓ Bulk Approve: PATCH /api/campaigns/:id/personalized-emails/bulk-approve');
  console.log('✓ Lead Submission → HubSpot: POST /api/leads/submit');
  console.log('✓ ADMIN Seed Endpoint: POST /api/admin/seed-comprehensive-funnels');
  console.log('✓ ADMIN Import Apollo Yardi: POST /api/admin/import-apollo-yardi-contacts');
  console.log('✓ ADMIN Populate CFO Mock Data: POST /api/admin/populate-cfo-mock-data');
  
  // Start email queue worker for throttled sending
  startEmailQueueWorker();
  console.log('✓ Email Queue Worker: Started (1-2.5 min throttling)');
});


