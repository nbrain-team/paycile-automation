// Email Queue Service with Throttling (1-2.5 minute random delays)
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { sendGraphEmail, isGraphConfigured } from './graphEmailProvider';

const prisma = new PrismaClient();

// Track if worker is running
let workerRunning = false;
let workerInterval: NodeJS.Timeout | null = null;

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
  
  const queued = await prisma.emailQueue.create({
    data: {
      campaignId: params.campaignId,
      contactId: params.contactId,
      to: params.to,
      subject: params.subject,
      body: params.body,
      userId: params.userId || null,
      status: 'pending',
      scheduledFor,
    },
  });
  
  return queued;
}

/**
 * Queue multiple emails with staggered delays
 */
export async function queueBulkEmails(emails: Array<{
  campaignId: string;
  contactId: string;
  to: string;
  subject: string;
  body: string;
  userId?: string;
}>) {
  const now = new Date();
  const queued = [];
  
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    // Stagger each email by 1-2.5 minutes from the previous one
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
        // Mark as processing
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: 'processing' },
        });
        
        let messageId: string | undefined;
        let provider = 'unknown';
        
        // Try Microsoft Graph API first
        if (isGraphConfigured()) {
          const result = await sendGraphEmail({
            to: email.to,
            subject: email.subject,
            body: email.body,
            from: process.env.EMAIL_FROM,
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
          
          // Try to get user-specific SMTP settings
          if (email.userId) {
            const user = await prisma.user.findUnique({ where: { id: email.userId } });
            if (user?.smtpHost && user?.smtpPort && user?.smtpUser && user?.smtpPass) {
              smtpHost = user.smtpHost;
              smtpPort = user.smtpPort;
              smtpUser = user.smtpUser;
              smtpPass = user.smtpPass;
              smtpSecure = user.smtpSecure ?? true;
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
          
          const info = await transporter.sendMail({
            from: smtpUser,
            to: email.to,
            subject: email.subject,
            html: email.body,
          });
          
          messageId = info.messageId;
          provider = 'smtp';
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

