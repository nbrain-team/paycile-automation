// Email Queue Service with Throttling (1-2.5 minute random delays)
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { sendGraphEmail, sendGraphEmailAsUser, isGraphConfigured, refreshUserMicrosoftToken } from './graphEmailProvider';

const prisma = new PrismaClient();

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
        
        // Add unsubscribe link to email body
        const baseUrl = process.env.BASE_URL || 'https://adtv-events-server.onrender.com';
        const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${email.contactId}`;
        const companyAddress = process.env.COMPANY_ADDRESS || '123 Main Street, Suite 100, City, ST 12345';
        
        const footer = `
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;">${companyAddress}</p>
            <p style="margin: 5px 0;">
              <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a> from this list
            </p>
          </div>
        `;
        
        // Convert plain-text body to HTML before appending footer
        let emailBodyWithFooter = email.body;
        if (!/<[a-z][\s\S]*>/i.test(emailBodyWithFooter)) {
          emailBodyWithFooter = emailBodyWithFooter
            .split('\n\n').map(p => `<p style="margin:0 0 12px 0;">${p.replace(/\n/g, '<br>')}</p>`).join('');
        }

        if (emailBodyWithFooter.includes('</body>')) {
          emailBodyWithFooter = emailBodyWithFooter.replace('</body>', `${footer}</body>`);
        } else if (emailBodyWithFooter.includes('</html>')) {
          emailBodyWithFooter = emailBodyWithFooter.replace('</html>', `${footer}</html>`);
        } else {
          emailBodyWithFooter = emailBodyWithFooter + footer;
        }

        let messageId: string | undefined;
        let provider = 'unknown';

        // Load sender user if specified on the queue item
        let senderUser: any = null;
        if (email.userId) {
          senderUser = await prisma.user.findUnique({ where: { id: email.userId } });
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





