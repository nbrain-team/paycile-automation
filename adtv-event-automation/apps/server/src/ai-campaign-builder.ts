/**
 * AI Campaign Builder
 * 
 * Generates complete multi-step marketing campaigns with content
 * using OpenAI GPT-4, enhanced with Paycile-specific context
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Load Paycile knowledge base for context-aware content generation
let PAYCILE_CONTEXT = '';
try {
  const contextPath = path.join(__dirname, '../../../PAYCILE_KNOWLEDGE_BASE.md');
  if (fs.existsSync(contextPath)) {
    PAYCILE_CONTEXT = fs.readFileSync(contextPath, 'utf-8');
  }
} catch (error) {
  console.warn('[AI Campaign Builder] Could not load Paycile knowledge base:', error);
}

export interface CampaignBuilderRequest {
  campaignDescription: string;
  numberOfSteps: number;
  availableNodeTypes: string[]; // e.g., ['email_send', 'sms_send', 'wait', 'voicemail_drop']
  targetAudience?: string;
  campaignGoal?: string;
  tone?: string; // professional, casual, urgent, friendly
  industry?: string; // real estate, insurance, property management, etc.
  targetPersona?: string; // cfo, controller, arap, property_finance, treasury, accountant, small_biz, auditor
  landingPageUrl?: string; // URL to include in CTAs if provided
  calendarLink?: string; // Sender's calendar/booking link (e.g., Calendly URL)
}

export interface GeneratedCampaignNode {
  id: string;
  type: string;
  name: string;
  config: {
    content?: { subject?: string; body?: string; text?: string };
    tts?: { custom_script?: string };
    waitDuration?: number;
    waitUnit?: 'hours' | 'days';
    description?: string;
    // Legacy top-level fields (AI may still produce these; normalized on save)
    subject?: string;
    body?: string;
    text?: string;
    ttsScript?: string;
  };
  posX: number;
  posY: number;
}

export interface GeneratedCampaignEdge {
  from: string;
  to: string;
  condition?: any;
}

export interface GeneratedCampaign {
  name: string;
  description: string;
  nodes: GeneratedCampaignNode[];
  edges: GeneratedCampaignEdge[];
  estimatedDuration: string;
  recommendedAudience: string;
}

/**
 * Generate a complete campaign with AI
 */
export async function generateCampaign(
  request: CampaignBuilderRequest,
  existingTemplates?: Array<{ type: string; subject?: string; body?: string; text?: string; ttsScript?: string }>
): Promise<GeneratedCampaign> {
  
  // Build tone reference from existing templates
  let toneReference = '';
  if (existingTemplates && existingTemplates.length > 0) {
    toneReference = `\n\nIMPORTANT - TONE AND STYLE REFERENCE:
The following are examples of existing company content that represents the desired tone, style, and voice. 
Study these carefully and match this exact tone in your generated content:

`;
    existingTemplates.slice(0, 5).forEach((template, index) => {
      toneReference += `\nEXAMPLE ${index + 1} (${template.type}):\n`;
      if (template.subject) toneReference += `Subject: ${template.subject}\n`;
      if (template.body) toneReference += `Body: ${template.body.substring(0, 500)}...\n`;
      if (template.text) toneReference += `Text: ${template.text}\n`;
      if (template.ttsScript) toneReference += `Script: ${template.ttsScript.substring(0, 300)}...\n`;
    });
    toneReference += `\nYour generated content MUST match the tone, style, formality level, and voice of these examples.`;
  }

  // Add Paycile Master Intelligence Layer context
  let paycileContext = '';
  if (PAYCILE_CONTEXT) {
    paycileContext = `\n\nPAYCILE MASTER INTELLIGENCE LAYER:
${PAYCILE_CONTEXT.substring(0, 6000)}
`;
  }

  // Always inject the core messaging DNA regardless of knowledge base availability
  const paycileCoreDNA = `

PAYCILE IDENTITY & MESSAGING DNA (MANDATORY):

ONE-LINE IDENTITY: Paycile is compliance-grade reconciliation infrastructure that makes financial truth real-time across fragmented payment systems in insurance and property management.

CATEGORY: Financial control infrastructure — NOT "back-office automation," NOT "AI reconciliation," NOT "just payments."

MESSAGE SPINE (every piece of content must trace back to this):
1. Reconciliation isn't admin. It's financial truth.
2. When payment flows fragment across systems, manual reconciliation becomes risk, delay, and burnout.
3. Paycile makes reconciliation real-time, rules-driven, and audit-aligned across the systems you already run — so close cycles compress and confidence rises.

LANGUAGE GUARDRAILS — PHRASE BANK (use these):
- "financial truth"
- "cross-system reconciliation"  
- "audit-ready trails" / "audit-aligned"
- "exception handling"
- "continuous close direction"
- "control layer" / "infrastructure layer"

LANGUAGE GUARDRAILS — AVOID LIST (never use these):
- "AI-powered reconciliation" as the lead
- "set it and forget it"
- "guaranteed compliance"
- "eliminates all risk"
- "instant integration"
- Don't lead with "AI" — lead with transparency and control
- Don't claim "we replace your ERP" or "rip and replace"
- Don't pick fights with named incumbents

PROOF STRATEGY (Paycile is early-stage — no big logo claims):
- Anchor proof in workflow truth ("this is where exceptions live")
- Use measurable deltas (hours saved, exceptions reduced, close days reduced)
- Emphasize transparency (how reconciliation decisions are explained)
- Frame as outcomes the buyer already values, not unsubstantiated case studies

CHANNEL RULES:
- Email: Lead with problem reframe (reconciliation = financial truth), ask a scope question, offer tiny next step (not scheduling pressure)
- SMS: One sentence reframe + one question. No claims, no links unless requested.
- Voicemail: 10-18 seconds. Acknowledge role + one pain + one question. Call-back feels optional, not forceful.
- LinkedIn: Lead with shared industry context, reference a specific challenge their role faces, offer insight not a pitch.

OUTCOMES THAT MATTER (what Paycile buys them — use these, not feature lists):
- Faster close / "continuous close" directionality
- Lower compliance anxiety (audit-ready trails)
- Fewer reconciliation hours + less exception firefighting
- Higher confidence in financial truth (forecasting, reporting)
- Reduced operational fragility (less spreadsheet dependency)

FIT-TEST QUESTIONS (weave into messaging naturally):
- "Are you reconciling across multiple systems — or mostly within one platform?"
- "Where do exceptions live today — spreadsheets, inbox, or inside your system?"
- "How many days does close take when everything goes 'normally'?"
- "When an auditor asks 'why did this match,' can you show the logic quickly?"
`;

  // Build persona-specific guidance
  const personaGuidance = request.targetPersona ? getPersonaGuidance(request.targetPersona) : '';
  
  // Build landing page / calendar CTA guidance
  const calendarGuidance = request.calendarLink
    ? `\n\nCALENDAR BOOKING LINK:
The sender has a booking link: ${request.calendarLink}
Use this REAL URL in all scheduling CTAs. Examples:
- "Book a time on our calendar: ${request.calendarLink}"
- "[Schedule a 30-minute demo](${request.calendarLink})"
NEVER use "#" or placeholder URLs when this link is available.`
    : '';
  const landingPageGuidance = request.landingPageUrl 
    ? `\n\nLANDING PAGE CTA:
This campaign has a dedicated landing page at: ${request.landingPageUrl}
Include this URL in email CTAs and SMS messages as appropriate.`
    : '';

  const systemPrompt = `You are an expert B2B outbound strategist creating multi-channel campaigns for Paycile — compliance-grade reconciliation infrastructure for insurance and property management.

YOUR ABSOLUTE RULES:
1. Every piece of content must trace back to the Message Spine: "Reconciliation isn't admin. It's financial truth."
2. NEVER lead with AI claims. Lead with transparency, control, and audit-readiness.
3. NEVER use feature soup. Frame everything as outcomes the buyer already budgets for.
4. Use the Phrase Bank. Avoid the Avoid List. No exceptions.
5. Paycile is early-stage — frame proof as workflow truth and measurable deltas, not logo claims.
${paycileCoreDNA}${toneReference}${paycileContext}${personaGuidance}${calendarGuidance}${landingPageGuidance}

WORKFLOW DESIGN PRINCIPLES:
You design intelligent multi-step workflows. The user selects channels (email, SMS, voicemail, LinkedIn), and YOU add:
- WAIT nodes: Strategic timing between touchpoints (2-3 days typical)
- DECISION nodes: Engagement-based routing (opened email → nurture, no open → re-engage)
- STAGE nodes: Milestone markers (Initial Outreach, Follow-Up, Closing)
- TASK nodes: Manual intervention points (BDR review high-value prospect)

WORKFLOW SEQUENCING:
- Email → WAIT (2 days) → Email Follow-up
- Email → WAIT (1 day) → DECISION (opened?) → branch paths
- Email → WAIT (2-3 days) → SMS (single tension reinforcement)
- Email → WAIT (3 days) → Voicemail (personal escalation)
- LinkedIn → WAIT (3 days) → Email (cross-channel)
- STAGE nodes at phase transitions
- TASK nodes when human judgment adds value

WORKFLOW INTELLIGENCE EXAMPLES:
- Email → WAIT (2 days) → Email Follow-up (better than immediate email spam)
- Email → WAIT (1 day) → DECISION (opened?) → Yes: Nurture path | No: Re-engage path
- Email → WAIT (2 days) → SMS (multi-channel reinforcement)
- Email → WAIT (3 days) → Voicemail (escalation for non-responders)
- STAGE nodes at transitions: "Initial Outreach" → "Follow-Up" → "Closing Sequence"
- TASK node: "BDR Review - High Intent Prospect" (when prospect downloads content)

IMPORTANT: You must return ONLY valid JSON with no additional text, markdown formatting, or code blocks.`;

  const userPrompt = `Create a ${request.numberOfSteps}-step marketing campaign with the following details:

CAMPAIGN DESCRIPTION:
${request.campaignDescription}

TARGET AUDIENCE:
${request.targetAudience || 'Financial decision-makers (CFOs, Controllers, Finance Managers)'}

CAMPAIGN GOAL:
${request.campaignGoal || 'Schedule product demonstrations and drive qualified leads'}

TONE:
${request.tone || 'Professional and benefit-focused'}

INDUSTRY:
${request.industry || 'Financial Services / Payment Processing'}

COMMUNICATION CHANNELS AVAILABLE:
${request.availableNodeTypes.filter(t => ['email_send', 'sms_send', 'voicemail_drop', 'linkedin_connect', 'linkedin_message', 'linkedin_post'].includes(t)).join(', ')}

WORKFLOW NODES YOU CONTROL:
- wait: Strategic delays (REQUIRED between major touches - use intelligently!)
- decision: Engagement-based routing (use for opened/clicked logic)
- stage: Milestone markers (use to organize campaign phases)
- task: Manual intervention (use when BDR/sales should engage)

NODE TYPE SPECIFICATIONS:
- email_send: Send email (requires subject and body with personalization)
- sms_send: Send SMS text (requires text, max 160 chars, urgent/timely only)
- voicemail_drop: Direct-to-voicemail (requires ttsScript, 30-45 seconds)
- linkedin_connect: LinkedIn connection request (requires text, max 300 chars, brief personalized note)
- linkedin_message: LinkedIn DM (requires text, professional tone)
- linkedin_post: LinkedIn post (requires text, thought leadership content)
- wait: Delay (requires waitDuration: number and waitUnit: 'hours' | 'days')
- decision: Conditional branch (requires description of condition)
- stage: Milestone (requires name and description)
- task: Manual task (requires description for team member)

INSTRUCTIONS:
1. Design a campaign with approximately ${request.numberOfSteps} communication touchpoints
2. Start with a "start" node (id: "N00")
3. Use sequential node IDs: N10, N20, N30, etc. (increment by 10)
4. INTELLIGENTLY design workflow:
   - Add WAIT nodes between ALL communication touches (don't spam!)
   - Add DECISION nodes when engagement affects routing
   - Add STAGE nodes to mark campaign phases
   - Add TASK nodes when manual intervention makes sense
5. Strategic timing:
   - Email → WAIT 2-3 days → Email (standard nurture)
   - Email → WAIT 1 day → SMS (urgent follow-up)
   - Email → WAIT 3 days → Voicemail (escalation)
6. Write compelling, specific content for each communication node
7. Position nodes vertically with 150px spacing (posY: 0, 150, 300, etc.)
8. All nodes should have posX: 400 (centered)
9. Create edges connecting each node to build the workflow
10. Make content specific to the campaign description, not generic
11. Reference Paycile's value propositions and quantifiable ROI metrics
12. Use personalization tokens: {{contact.first_name}}, {{contact.last_name}}, {{contact.email}}, {{contact.phone}}, {{contact.company}}, {{campaign.name}}
13. CRITICAL: Don't just create communication nodes - design an intelligent workflow with waits, decisions, stages

CONTENT GUIDELINES FOR PAYCILE:

FIRST EMAIL (CRITICAL - MUST BE DETAILED):
The first email in any campaign MUST be comprehensive and value-rich. Follow this structure:

1. DIRECT OPENING: Lead with the core problem/benefit
   Example: "I'll be direct: Your finance team is spending 96+ days per year on manual payment reconciliation."

2. QUANTIFY THE PROBLEM: Use bullet points with specific metrics
   Example:
   • 8-12 hours per week matching carrier payments
   • 3-5 days at month-end reconciling across entities
   • Countless hours investigating exceptions and errors

3. BOLD QUESTION: Challenge their current state
   Example: "**What if you could automate all of it?**"

4. PAYCILE SOLUTION: Explain what Paycile does specifically
   Example: "Paycile gives you real-time cash visibility across all carriers, entities, and accounts—without the manual work. Our customers save 96+ days annually and close their books in days, not weeks."

5. CLEAR VALUE PROPOSITION: What they get
   Example: "I'd like to show you how in a quick 30-minute executive demo."

6. DUAL CTA: Provide two ways to respond
   - Primary: Link to calendar booking page (use the CALENDAR BOOKING LINK if provided, or landing page URL, or {{campaign.calendly_link}} merge tag)
   - Secondary: "Or reply to this email and I'll send you times that work."
   - NEVER use "#" as a placeholder URL. Always use a real link or merge tag.

7. PROFESSIONAL SIGNATURE: Use {{sender.signature}} merge tag

FIRST EMAIL LENGTH: 200-300 words (longer than follow-ups)
FIRST EMAIL TONE: Confident, direct, benefit-driven, consultative

FOLLOW-UP EMAILS (SHORTER):
- 100-150 words max
- Reference previous email
- Add new angle or urgency
- Clear CTA
- Use {{sender.signature}}

OTHER CONTENT:
- SMS messages: Under 160 characters, urgent value prop, clear action
- Voicemail scripts: 30-45 seconds when read, conversational, mention Paycile and key benefit
- Focus on business outcomes: time saved, costs recovered, errors eliminated
- Reference industry-specific challenges when applicable

Return ONLY this JSON structure (no markdown, no code blocks, just raw JSON):
{
  "name": "Campaign Name",
  "description": "Brief campaign description",
  "nodes": [
    {
      "id": "N00",
      "type": "start",
      "name": "Campaign Start",
      "config": {
        "description": "Starting point"
      },
      "posX": 400,
      "posY": 0
    },
    {
      "id": "N10",
      "type": "email_send",
      "name": "Email 1: Introduction",
      "config": {
        "content": {
          "subject": "Email subject here",
          "body": "Full email body here with personalization tokens"
        }
      },
      "posX": 400,
      "posY": 150
    },
    {
      "id": "N20",
      "type": "sms_send",
      "name": "SMS Follow-up",
      "config": {
        "content": {
          "text": "SMS message text here"
        }
      },
      "posX": 400,
      "posY": 300
    },
    {
      "id": "N30",
      "type": "voicemail_drop",
      "name": "Voicemail",
      "config": {
        "tts": {
          "custom_script": "Voicemail script here"
        }
      },
      "posX": 400,
      "posY": 450
    },
    {
      "id": "N40",
      "type": "linkedin_message",
      "name": "LinkedIn DM: Introduction",
      "config": {
        "content": {
          "text": "Full LinkedIn message text here. Keep it professional, 300 chars max."
        }
      },
      "posX": 400,
      "posY": 600
    }
  ],
  "edges": [
    { "from": "N00", "to": "N10" },
    { "from": "N10", "to": "N20" },
    { "from": "N20", "to": "N30" },
    { "from": "N30", "to": "N40" }
  ],
  "estimatedDuration": "7 days",
  "recommendedAudience": "Target audience description"
}

CRITICAL CONFIG FORMAT RULES:
- email_send nodes: config.content.subject and config.content.body (MUST be nested inside "content")
- sms_send nodes: config.content.text (MUST be nested inside "content")
- voicemail_drop nodes: config.tts.custom_script (MUST be nested inside "tts")
- linkedin_connect nodes: config.content.text (MUST be nested inside "content" - write the FULL connection note, max 300 chars)
- linkedin_message nodes: config.content.text (MUST be nested inside "content" - write the FULL message text)
- linkedin_post nodes: config.content.text (MUST be nested inside "content" - write the FULL post text)
- wait nodes: config.waitDuration and config.waitUnit
- decision/stage/task nodes: config.description
- NEVER put subject/body/text at the top level of config - ALWAYS nest inside "content" or "tts"
- EVERY communication node MUST have actual content written out - never leave content empty`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or "gpt-4o" for latest
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" } // Forces JSON response
    });
    
    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }
    
    // Parse the JSON
    const campaign: GeneratedCampaign = JSON.parse(content);
    
    // Validate the structure
    if (!campaign.nodes || !Array.isArray(campaign.nodes) || campaign.nodes.length === 0) {
      throw new Error('Generated campaign has no nodes');
    }
    
    if (!campaign.edges || !Array.isArray(campaign.edges)) {
      throw new Error('Generated campaign has no edges');
    }
    
    // Ensure all nodes have required fields and normalize config format
    campaign.nodes = campaign.nodes.map((node, index) => {
      const cfg: any = node.config || {};

      // Normalize Format C (top-level subject/body) → Format B (nested content)
      if (cfg.subject || cfg.body) {
        cfg.content = cfg.content || {};
        cfg.content.subject = cfg.content.subject || cfg.subject;
        cfg.content.body = cfg.content.body || cfg.body;
        delete cfg.subject;
        delete cfg.body;
      }
      if (cfg.text && !cfg.content?.text) {
        cfg.content = cfg.content || {};
        cfg.content.text = cfg.text;
        delete cfg.text;
      }
      if (cfg.ttsScript && !cfg.tts?.custom_script) {
        cfg.tts = cfg.tts || {};
        cfg.tts.custom_script = cfg.ttsScript;
        delete cfg.ttsScript;
      }

      return {
        ...node,
        id: node.id || `N${index * 10}`,
        posX: node.posX || 400,
        posY: node.posY || (index * 150),
        config: cfg,
      };
    });
    
    return campaign;
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Error:', error);
    throw new Error(`Failed to generate campaign: ${error.message}`);
  }
}

/**
 * Refine or regenerate specific campaign content
 */
export async function refineContent(
  nodeType: string,
  currentContent: any,
  refinementRequest: string,
  campaignContext?: string
): Promise<any> {
  
  const prompt = `You are refining content for a Paycile marketing campaign node.

NODE TYPE: ${nodeType}
CAMPAIGN CONTEXT: ${campaignContext || 'Paycile payment reconciliation platform marketing campaign'}

CURRENT CONTENT:
${JSON.stringify(currentContent, null, 2)}

REFINEMENT REQUEST:
${refinementRequest}

PAYCILE CONTEXT:
- Platform: Automated payment reconciliation for businesses
- Target: CFOs, Controllers, Finance Managers
- Value: Cost savings, time efficiency, automated reconciliation
- Tone: Professional, benefit-driven, data-informed

Please provide improved content that addresses the refinement request while maintaining the campaign's tone and goals.
Use personalization tokens where appropriate: {{contact.first_name}}, {{contact.last_name}}, {{contact.company}}

Return ONLY valid JSON with the updated content fields (subject, body, text, or ttsScript as appropriate).
No markdown, no code blocks, just raw JSON.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content generated');
    
    return JSON.parse(content);
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Refine error:', error);
    throw new Error(`Failed to refine content: ${error.message}`);
  }
}

/**
 * Generate variations of campaign content for A/B testing
 */
export async function generateVariations(
  nodeType: string,
  originalContent: any,
  numberOfVariations: number = 3
): Promise<any[]> {
  
  const prompt = `Create ${numberOfVariations} variations of this Paycile marketing content for A/B testing.

NODE TYPE: ${nodeType}

ORIGINAL CONTENT:
${JSON.stringify(originalContent, null, 2)}

Create ${numberOfVariations} distinct variations that:
1. Test different value propositions (cost savings vs. time efficiency vs. automation benefits)
2. Use different emotional appeals (urgency vs. opportunity vs. pain point)
3. Vary the call-to-action approach (demo scheduling vs. consultation vs. learning more)
4. Maintain similar length and structure
5. Stay true to Paycile's professional, benefit-driven tone
6. Reference different pain points (reconciliation errors, manual processes, cost recovery, compliance)

Return ONLY a JSON array of ${numberOfVariations} objects, each with the same structure as the original.
No markdown, no code blocks, just raw JSON array.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.8, // Higher temperature for more variety
      response_format: { type: "json_object" }
    });
    
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content generated');
    
    const parsed = JSON.parse(content);
    // Handle both array and object with variations key
    return Array.isArray(parsed) ? parsed : (parsed.variations || []);
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Variations error:', error);
    throw new Error(`Failed to generate variations: ${error.message}`);
  }
}

/**
 * Get persona-specific messaging guidance aligned with Paycile MIL
 */
function getPersonaGuidance(persona: string): string {
  const personaMap: Record<string, string> = {
    cfo: `
PERSONA: CFO / Financial Executive (ICP 1 — Insurance Carrier / MGA Finance Ops)
TONE: Executive-level. Direct. Outcome-anchored. No fluff.
THEY FEEL: Month-end close pain, audit pressure, multi-system fragmentation, distorted financial reporting.
THEY CARE ABOUT: Controls, audit trails, exception handling, speed of close, confidence in financials.

PROBLEM REFRAME:
Manual reconciliation is treated like admin but functionally it creates delayed close cycles, distorted reporting, and audit exposure. In insurance, reconciliation is the economic circulatory system.

MESSAGING APPROACH:
- Lead with the economic truth of fragmented reconciliation
- Frame Paycile as a control layer, not an automation tool
- Ask scope questions: "Across all systems or only inside the platform?"
- Reference close cycle compression and audit-ready confidence
- NEVER claim AI leadership — lead with transparency and rules-driven control

SAMPLE HOOKS (adapt, don't copy verbatim):
- "How many days does close take when everything goes 'normally'?"
- "When an auditor asks 'why did this match,' can your team show the logic in seconds?"
- "Reconciliation across fragmented carriers isn't admin — it's your financial truth"

CTA STYLE: Tiny next step, not scheduling pressure. "Worth a 15-minute look?" or "Happy to show how the control layer works."`,

    controller: `
PERSONA: Finance Manager / Controller (ICP 1/2 — Multi-system environments)
TONE: Operational, compliance-aware, team-focused. Empathetic to workload.
THEY FEEL: Manual workloads, cross-entity complexity, period-end pressure, spreadsheet fragility.
THEY CARE ABOUT: Fewer reconciliation hours, audit-ready trails, reduced exception firefighting, team efficiency.

PROBLEM REFRAME:
Controllers are trapped between leadership demanding faster close and teams drowning in manual matching. The real cost isn't hours — it's the confidence gap in financial truth.

MESSAGING APPROACH:
- Acknowledge the operational reality (not condescend)
- Frame Paycile as reducing fragility (less spreadsheet dependency)
- Reference "continuous close direction" as the aspiration
- Ask where exceptions live: spreadsheets, inbox, or inside their system
- Emphasize audit-aligned trails that build automatically

SAMPLE HOOKS:
- "Where do your exceptions live today — spreadsheets, inbox, or inside your system?"
- "Month-end close shouldn't require tribal knowledge and overtime"
- "Audit-ready trails that build themselves — so your team analyzes instead of matching"

CTA STYLE: "See how the control layer works" or "Quick look at how close cycles compress?"`,

    arap: `
PERSONA: AR/AP Specialist (ICP 2 — Insurance Agency Ops)
TONE: Practical, efficient, results-grounded. Respect their expertise.
THEY FEEL: Payment complexity, reconciliation backlog, manual matching chaos, exception overload.
THEY CARE ABOUT: Time savings, fewer errors, clean books, reduced exceptions.

PROBLEM REFRAME:
AR/AP teams are the ones who feel fragmentation first. Every mismatched payment, every exception, every write-off traces back to manual reconciliation across systems that don't talk to each other.

MESSAGING APPROACH:
- Lead with the exception problem (where they live, how they multiply)
- Frame outcomes in their language: fewer exceptions, cleaner books, less firefighting
- Reference cross-system matching as the core unlock
- Don't oversell — frame as measurable deltas they can verify

SAMPLE HOOKS:
- "Are you reconciling across multiple systems — or mostly within one platform?"
- "Exceptions multiply when systems don't talk to each other"
- "Cross-system reconciliation that stands up to scrutiny — not another automation claim"

CTA STYLE: "See exception handling in action" or "Quick demo of cross-system matching?"`,

    treasury: `
PERSONA: Treasury / Cash Manager
TONE: Data-driven, forecasting-anchored, risk-conscious. Strategic.
THEY FEEL: Multi-source data lag, timing mismatches, forecasting gaps, compliance pressure.
THEY CARE ABOUT: Real-time visibility, confidence in cash position, audit-ready transparency.

PROBLEM REFRAME:
Treasury can't forecast what it can't reconcile. When payment flows fragment across multiple sources, the cash position becomes a guess until month-end — and by then, the decision window has passed.

MESSAGING APPROACH:
- Connect reconciliation accuracy to forecasting confidence
- Frame as real-time financial truth (T+0 direction)
- Reference the shift from tolerating lag to demanding accuracy
- Ask about close cycle length and multi-source complexity

SAMPLE HOOKS:
- "How confident is your cash position on day 5 of the month vs. day 25?"
- "Forecasting accuracy starts with reconciliation accuracy"
- "Financial truth shouldn't require waiting for month-end"

CTA STYLE: "See real-time reconciliation" or "Quick look at how cross-system visibility works?"`,

    property_finance: `
PERSONA: Property Management Finance / Trust Accounting (ICP 3)
TONE: Operations-focused, compliance-aware, property-specific.
THEY FEEL: High transaction volumes, multi-entity disbursement complexity, trust accounting constraints.
THEY CARE ABOUT: Accuracy, traceability, clean audit trails, reduced manual work, trust compliance.

PROBLEM REFRAME:
Property management finance teams deal with trust accounting constraints that make reconciliation errors compliance events, not just inconveniences. Multi-property, multi-entity flows create fragmentation that spreadsheets can't safely handle.

MESSAGING APPROACH:
- Acknowledge trust accounting as a compliance constraint (not just efficiency)
- Frame Paycile as a control layer across property management systems
- Reference traceability and audit trails as non-negotiable
- Ask about multi-entity complexity and where exceptions accumulate

SAMPLE HOOKS:
- "Trust account reconciliation errors aren't just inefficiency — they're compliance events"
- "Multi-property disbursements across entities: where do exceptions accumulate?"
- "Audit-aligned reconciliation across your property management stack"

CTA STYLE: "See trust account reconciliation" or "Quick look at multi-entity control?"`,

    accountant: `
PERSONA: Accountant / GL Specialist
TONE: Detail-oriented, accuracy-first, practical. Respect the craft.
THEY FEEL: Spreadsheet dependency, manual matching fatigue, bank reconciliation backlogs.
THEY CARE ABOUT: Accuracy, clean GL, less manual data entry, traceable matching logic.

PROBLEM REFRAME:
Accountants know that reconciliation accuracy is the foundation of everything downstream — reporting, audits, forecasting. But when the process depends on spreadsheets and manual matching, accuracy becomes a function of effort, not infrastructure.

MESSAGING APPROACH:
- Respect their precision and framing
- Position Paycile as infrastructure that matches their standards
- Reference rules-driven matching that shows its logic
- Ask about spreadsheet dependency and exception handling

SAMPLE HOOKS:
- "When an auditor asks 'why did this match,' can you show the rules in seconds?"
- "Reconciliation accuracy shouldn't depend on spreadsheet formulas"
- "Rules-driven matching with audit trails — the infrastructure your accuracy deserves"

CTA STYLE: "See matching logic in action" or "Quick look at rules-driven reconciliation?"`,

    small_biz: `
PERSONA: Small Business Owner / CEO
TONE: Growth-focused, accessible, outcome-driven. No jargon.
THEY FEEL: Lack of financial visibility, reconciliation as an afterthought, scaling pain.
- Cash flow uncertainty
- Limited finance resources

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- ROI in 8-12 months
- Centralized financial visibility
- Scalable without hiring more staff
- Enterprise-grade tools at SMB pricing

MESSAGING HOOKS:
- "You can't scale on spreadsheets—here's what works"
- "Enterprise-grade reconciliation at small business prices"
- "Free your team from manual work and focus on growth"

CTA STYLE: "Start free trial", "See ROI calculator", "Schedule consultation"`,

    auditor: `
PERSONA: Auditor / Compliance Officer
TONE: Risk-focused, compliance-oriented, evidence-based
KEY PAIN POINTS:
- Limited traceability in manual processes
- Manual audit sampling
- Fraud detection delays
- Compliance documentation burden

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 25% audit cost reduction
- 70% faster fraud detection
- Complete audit trail automation
- Real-time compliance monitoring

MESSAGING HOOKS:
- "Manual audits miss patterns"
- "Fraud detection shouldn't be reactive"
- "Compliance documentation is mission-critical"

CTA STYLE: "See compliance features", "Schedule audit demo", "Review security"`,
  };

  return personaMap[persona] || '';
}
