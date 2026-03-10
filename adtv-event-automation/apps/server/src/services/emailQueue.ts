// Email Queue Service with Throttling (1-2.5 minute random delays)
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { sendGraphEmail, sendGraphEmailAsUser, isGraphConfigured, refreshUserMicrosoftToken } from './graphEmailProvider';

const prisma = new PrismaClient();

/**
 * Build an HTML email signature.
 * @param variant 'minimal' for first-touch emails (name + phone + unsubscribe only),
 *                'full' for follow-ups (branded Paycile signature with logo and links)
 */
const SIGNATURE_MARKER = '<!-- paycile-sig -->';

export function buildEmailSignature(
  senderName: string,
  senderEmail: string,
  senderPhone: string,
  variant: 'minimal' | 'full' = 'full',
  calendlyLink?: string,
): string {
  if (variant === 'minimal') {
    return `${SIGNATURE_MARKER}
      <div style="margin-top:24px; padding-top:16px; border-top:1px solid #e5e7eb; font-size:13px; color:#374151; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <p style="margin:0 0 2px 0; font-weight:600;">${senderName}</p>
        ${senderPhone ? `<p style="margin:0; color:#6b7280;">${senderPhone}</p>` : ''}
      </div>
    `;
  }

  return `${SIGNATURE_MARKER}
    <div style="margin-top:32px; padding-top:20px; border-top:2px solid #10b981; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:13px; color:#374151;">
        <tr>
          <td style="padding-right:16px; vertical-align:top;">
            <img src="https://paycile-automation.onrender.com/paycile-logo.svg" alt="Paycile" width="100" style="display:block;" />
          </td>
          <td style="border-left:2px solid #10b981; padding-left:16px; vertical-align:top;">
            <p style="margin:0 0 2px 0; font-weight:700; font-size:14px; color:#111827;">${senderName}</p>
            <p style="margin:0 0 6px 0; color:#6b7280; font-size:12px;">Paycile</p>
            ${senderPhone ? `<p style="margin:0 0 2px 0; color:#374151; font-size:12px;">${senderPhone}</p>` : ''}
            <p style="margin:0 0 2px 0;"><a href="mailto:${senderEmail}" style="color:#10b981; text-decoration:none; font-size:12px;">${senderEmail}</a></p>
            ${calendlyLink ? `<p style="margin:4px 0 0 0;"><a href="${calendlyLink}" style="color:#10b981; text-decoration:none; font-size:12px;">Schedule a Meeting</a></p>` : ''}
            <p style="margin:8px 0 0 0;">
              <a href="https://www.linkedin.com/company/paycile" style="color:#6b7280; text-decoration:none; font-size:11px; margin-right:12px;">LinkedIn</a>
              <a href="https://paycile.com" style="color:#6b7280; text-decoration:none; font-size:11px;">paycile.com</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

// Track if worker is running
let workerRunning = false;
let workerInterval: NodeJS.Timeout | null = null;

/**
 * Get next SMTP config for rotation (round-robin)
 */
async function getNextSmtpConfig(): Promise<any | null> {
  try {
    // Get all active SMTP configs, ordered by last used (oldest first)
    const configs = await prisma.smtpConfig.findMany({
      where: { isActive: true },
      orderBy: [
        { lastUsed: 'asc' }, // Null values (never used) come first
        { createdAt: 'asc' }  // Then oldest first
      ],
    });
    
    if (configs.length === 0) {
      return null; // Fall back to env vars
    }
    
    // Return the first (least recently used) config
    return configs[0];
  } catch (e) {
    console.error('[EmailQueue] Error getting SMTP config:', e);
    return null;
  }
}

/**
 * Add email to queue with random delay between 1-2.5 minutes from now
 */
export async function queueEmail(params: {
  campaignId: string;
  contactId: string;
  to: string;
  subject: string;
  body: string;
  userId?: string;
  immediateDelay?: boolean; // If true, schedule immediately (for first email)
}) {
  const now = new Date();
  let scheduledFor: Date;
  
  if (params.immediateDelay) {
    // Schedule immediately for first email
    scheduledFor = now;
  } else {
    // Random delay between 1-2.5 minutes (60000-150000 ms)
    const delayMs = 60000 + Math.random() * 90000;
    scheduledFor = new Date(now.getTime() + delayMs);
  }
  
  // Get next SMTP config for rotation
  const smtpConfig = await getNextSmtpConfig();
  
  const queued = await prisma.emailQueue.create({
    data: {
      campaignId: params.campaignId,
      contactId: params.contactId,
      to: params.to,
      subject: params.subject,
      body: params.body,
      userId: params.userId || null,
      smtpConfigId: smtpConfig?.id || null,
      status: 'pending',
      scheduledFor,
    },
  });
  
  return queued;
}

/**
 * Queue multiple emails with staggered delays.
 * Prevents duplicates: skips contacts that already have a pending/processing/sent
 * entry for the same campaign, and deduplicates the input array.
 */
export async function queueBulkEmails(emails: Array<{
  campaignId: string;
  contactId: string;
  to: string;
  subject: string;
  body: string;
  userId?: string;
}>) {
  if (emails.length === 0) return [];

  // Deduplicate input by contactId (keep first occurrence)
  const seen = new Set<string>();
  const unique = emails.filter(e => {
    if (seen.has(e.contactId)) return false;
    seen.add(e.contactId);
    return true;
  });

  // Check for existing queue entries that are already pending/processing/sent
  const campaignId = unique[0].campaignId;
  const existingEntries = await prisma.emailQueue.findMany({
    where: {
      campaignId,
      contactId: { in: unique.map(e => e.contactId) },
      status: { in: ['pending', 'processing', 'sent'] },
    },
    select: { contactId: true },
  });
  const alreadyQueued = new Set(existingEntries.map(e => e.contactId));

  const toQueue = unique.filter(e => !alreadyQueued.has(e.contactId));
  if (toQueue.length < unique.length) {
    console.log(`[EmailQueue] Skipped ${unique.length - toQueue.length} duplicate(s)`);
  }

  const now = new Date();
  const queued = [];
  
  for (let i = 0; i < toQueue.length; i++) {
    const email = toQueue[i];
    const delayMs = i * (60000 + Math.random() * 90000);
    const scheduledFor = new Date(now.getTime() + delayMs);
    
    const item = await prisma.emailQueue.create({
      data: {
        campaignId: email.campaignId,
        contactId: email.contactId,
        to: email.to,
        subject: email.subject,
        body: email.body,
        userId: email.userId || null,
        status: 'pending',
        scheduledFor,
      },
    });
    
    queued.push(item);
  }
  
  return queued;
}

/**
 * Process pending emails that are due to be sent
 */
async function processQueue() {
  try {
    const now = new Date();
    
    // Get all pending emails that are scheduled for now or earlier
    const pending = await prisma.emailQueue.findMany({
      where: {
        status: 'pending',
        scheduledFor: { lte: now },
      },
      orderBy: { scheduledFor: 'asc' },
      take: 10, // Process 10 at a time
    });
    
    if (pending.length === 0) {
      return;
    }
    
    console.log(`[EmailQueue] Processing ${pending.length} emails...`);
    
    for (const email of pending) {
      try {
        // Check if contact has unsubscribed
        const contact = await prisma.contact.findUnique({
          where: { id: email.contactId }
        });
        
        if (contact?.unsubscribed) {
          console.log(`[EmailQueue] Skipping email to ${email.to} - contact unsubscribed`);
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: { 
              status: 'failed',
              error: 'Contact unsubscribed'
            },
          });
          continue;
        }
        
        // Mark as processing
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: 'processing' },
        });
        
        let messageId: string | undefined;
        let provider = 'unknown';

        // Load sender user if specified on the queue item
        let senderUser: any = null;
        if (email.userId) {
          senderUser = await prisma.user.findUnique({ where: { id: email.userId } });
        }

        // Determine if this is a first-touch email (no prior sent emails to this contact in this campaign)
        const priorSentCount = await prisma.emailQueue.count({
          where: {
            campaignId: email.campaignId,
            contactId: email.contactId,
            status: 'sent',
            id: { not: email.id },
          },
        });
        const isFirstTouch = priorSentCount === 0;

        // Add unsubscribe link and company address footer
        const baseUrl = process.env.BASE_URL || 'https://adtv-events-server.onrender.com';
        const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${email.contactId}`;
        const companyAddress = process.env.COMPANY_ADDRESS || 'Paycile - 10555 New York Ave, Ste. 100, Urbandale, IA 50322';

        // Only auto-inject signature if no merge tag already rendered one
        const hasSignatureFromMergeTag = email.body.includes(SIGNATURE_MARKER);
        let signatureBlock = '';
        if (!hasSignatureFromMergeTag) {
          const senderName = senderUser?.name || '';
          const senderEmailAddr = senderUser?.microsoftEmail || senderUser?.email || '';
          const senderPhone = senderUser?.phone || '';
          const senderCalendly = senderUser?.calendlyLink || '';
          const signatureVariant = isFirstTouch ? 'minimal' : 'full';
          signatureBlock = buildEmailSignature(senderName, senderEmailAddr, senderPhone, signatureVariant, senderCalendly);
        }
        
        const footer = `
          ${signatureBlock}
          <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <p style="margin: 4px 0;">${companyAddress}</p>
            <p style="margin: 4px 0;">
              <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> from future emails
            </p>
          </div>
        `;
        
        // Convert plain-text body to HTML before appending footer
        let emailBodyWithFooter = email.body.replace(/\\n/g, '\n');
        if (!/<[a-z][\s\S]*>/i.test(emailBodyWithFooter)) {
          // Pure plain text: wrap in paragraph tags
          emailBodyWithFooter = emailBodyWithFooter
            .split('\n\n').map(p => `<p style="margin:0 0 12px 0;">${p.replace(/\n/g, '<br>')}</p>`).join('');
        } else if (/\n/.test(emailBodyWithFooter)) {
          // Mixed HTML + plain text (e.g. AI-personalized content with some HTML):
          // convert remaining newlines to <br> so line breaks aren't swallowed
          emailBodyWithFooter = emailBodyWithFooter.replace(/([^>])\n/g, '$1<br>\n');
        }

        if (emailBodyWithFooter.includes('</body>')) {
          emailBodyWithFooter = emailBodyWithFooter.replace('</body>', `${footer}</body>`);
        } else if (emailBodyWithFooter.includes('</html>')) {
          emailBodyWithFooter = emailBodyWithFooter.replace('</html>', `${footer}</html>`);
        } else {
          emailBodyWithFooter = emailBodyWithFooter + footer;
        }

        // Try sending via the sender user's delegated Microsoft token first
        if (senderUser?.microsoftRefreshToken) {
          try {
            let accessToken = senderUser.microsoftAccessToken;
            const expiry = senderUser.microsoftTokenExpiry ? new Date(senderUser.microsoftTokenExpiry).getTime() : 0;

            if (!accessToken || Date.now() > expiry - 300000) {
              const refreshed = await refreshUserMicrosoftToken(senderUser.microsoftRefreshToken);
              if (refreshed) {
                accessToken = refreshed.access_token;
                await prisma.user.update({
                  where: { id: senderUser.id },
                  data: {
                    microsoftAccessToken: refreshed.access_token,
                    ...(refreshed.refresh_token ? { microsoftRefreshToken: refreshed.refresh_token } : {}),
                    microsoftTokenExpiry: new Date(Date.now() + refreshed.expires_in * 1000),
                  },
                });
              }
            }

            if (accessToken) {
              const result = await sendGraphEmailAsUser(accessToken, {
                to: email.to,
                subject: email.subject,
                body: emailBodyWithFooter,
              });
              if (result.sent) {
                messageId = result.messageId;
                provider = 'graph';
              }
            }
          } catch (e: any) {
            console.warn(`[EmailQueue] Delegated send failed for ${senderUser.email}, falling back:`, e.message);
          }
        }

        // Fallback: app-level Graph API using sender's Microsoft email (or env default)
        if (!messageId && isGraphConfigured()) {
          const fromAddr = senderUser?.microsoftEmail || senderUser?.email || process.env.EMAIL_FROM;
          const result = await sendGraphEmail({
            to: email.to,
            subject: email.subject,
            body: emailBodyWithFooter,
            from: fromAddr,
          });
          
          if (result.sent) {
            messageId = result.messageId;
            provider = 'graph';
          }
        }
        
        // Fallback to SMTP if Graph API not configured or failed
        if (!messageId) {
          let smtpHost = process.env.SMTP_HOST;
          let smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
          let smtpUser = process.env.SMTP_USER;
          let smtpPass = process.env.SMTP_PASS;
          let smtpSecure = (process.env.SMTP_SECURE === 'true') || (smtpPort === 465);
          let fromEmail = smtpUser;
          
          // SMTP ROTATION: Use the SMTP config assigned to this email
          if (email.smtpConfigId) {
            const smtpConfig = await prisma.smtpConfig.findUnique({
              where: { id: email.smtpConfigId }
            });
            
            if (smtpConfig && smtpConfig.isActive) {
              smtpHost = smtpConfig.smtpHost;
              smtpPort = smtpConfig.smtpPort;
              smtpUser = smtpConfig.smtpUser;
              smtpPass = smtpConfig.smtpPass;
              smtpSecure = smtpConfig.smtpSecure;
              fromEmail = smtpConfig.email;
              provider = `smtp-${smtpConfig.email}`;
              
              // Update last used timestamp and daily count
              await prisma.smtpConfig.update({
                where: { id: smtpConfig.id },
                data: {
                  lastUsed: new Date(),
                  dailySent: smtpConfig.dailySent + 1
                }
              });
            }
          }
          // Try to get user-specific SMTP settings (legacy support)
          else if (email.userId) {
            const user = await prisma.user.findUnique({ where: { id: email.userId } });
            if (user?.smtpHost && user?.smtpPort && user?.smtpUser && user?.smtpPass) {
              smtpHost = user.smtpHost;
              smtpPort = user.smtpPort;
              smtpUser = user.smtpUser;
              smtpPass = user.smtpPass;
              smtpSecure = user.smtpSecure ?? true;
              fromEmail = smtpUser;
            }
          }
          
          if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            throw new Error('Missing email configuration (Graph API or SMTP)');
          }
          
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: { user: smtpUser, pass: smtpPass },
          });
          
          const fromDisplay = senderUser?.name
            ? `"${senderUser.name}" <${fromEmail}>`
            : fromEmail;
          const info = await transporter.sendMail({
            from: fromDisplay,
            to: email.to,
            subject: email.subject,
            html: emailBodyWithFooter,
          });
          
          messageId = info.messageId;
          if (!provider || provider === 'unknown') provider = 'smtp';
        }
        
        // Log to conversation
        let convo = await prisma.conversation.findFirst({
          where: { contactId: email.contactId, channel: 'email' },
        });
        
        if (!convo) {
          convo = await prisma.conversation.create({
            data: { contactId: email.contactId, channel: 'email' },
          });
        }
        
        await prisma.message.create({
          data: {
            conversationId: convo.id,
            direction: 'out',
            text: (email.subject ? `[${email.subject}]\n\n` : '') + email.body,
            subject: email.subject,
            provider,
            providerMessageId: messageId,
          },
        });
        
        // Mark as sent
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: 'sent',
            sentAt: new Date(),
          },
        });
        
        console.log(`[EmailQueue] ✓ Sent email to ${email.to} (${provider})`);
        
      } catch (error: any) {
        console.error(`[EmailQueue] ✗ Failed to send email to ${email.to}:`, error.message);
        
        // Mark as failed
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: 'failed',
            error: error.message || 'Unknown error',
          },
        });
      }
    }
    
  } catch (error) {
    console.error('[EmailQueue] Error processing queue:', error);
  }
}

/**
 * Start the email queue worker (runs every 30 seconds)
 */
export function startEmailQueueWorker() {
  if (workerRunning) {
    console.log('[EmailQueue] Worker already running');
    return;
  }
  
  workerRunning = true;
  console.log('[EmailQueue] Starting worker (checks every 30 seconds)...');
  
  // Process immediately on start
  processQueue().catch(console.error);
  
  // Then process every 30 seconds
  workerInterval = setInterval(() => {
    processQueue().catch(console.error);
  }, 30000); // 30 seconds
}

/**
 * Stop the email queue worker
 */
export function stopEmailQueueWorker() {
  if (workerInterval) {
    clearInterval(workerInterval);
    workerInterval = null;
  }
  workerRunning = false;
  console.log('[EmailQueue] Worker stopped');
}

/**
 * Get queue statistics
 */
export async function getQueueStats() {
  const [pending, sent, failed, total] = await Promise.all([
    prisma.emailQueue.count({ where: { status: 'pending' } }),
    prisma.emailQueue.count({ where: { status: 'sent' } }),
    prisma.emailQueue.count({ where: { status: 'failed' } }),
    prisma.emailQueue.count(),
  ]);
  
  return { pending, sent, failed, total };
}





