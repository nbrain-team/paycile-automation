// Add Missing Content Templates for CFO Funnel
// Run: node scripts/add_missing_cfo_templates.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const missingTemplates = [
  {
    id: 'demo_confirmation',
    type: 'email',
    name: 'Demo Confirmation',
    subject: 'Your Paycile Demo - {{demo_date}}',
    body: `Hi {{contact.first_name}},

Thank you for scheduling a demo with Paycile! We're excited to show you how we can help automate your payment reconciliation process.

**Demo Details:**
Date & Time: {{demo_date}}
Duration: 30 minutes
Meeting Link: {{meeting_link}}

**What We'll Cover:**
• Live walkthrough of automated reconciliation
• Insurance-specific use cases
• ROI calculation for your operation
• Q&A session

**To Prepare:**
Feel free to bring any questions about your current reconciliation process. The more we understand your challenges, the more valuable the demo will be.

Looking forward to speaking with you!

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  },
  {
    id: 'demo_thank_you',
    type: 'email',
    name: 'Post-Demo Thank You',
    subject: 'Thanks for your time today {{contact.first_name}}',
    body: `Hi {{contact.first_name}},

Thank you for taking the time to meet with us today. It was great learning about your reconciliation challenges and showing you how Paycile can help.

**As Discussed:**
• Automated multi-carrier reconciliation
• Real-time cash visibility across all entities
• 96+ days saved annually
• ROI: {{estimated_roi}}

**Next Steps:**
I'll send over a custom proposal by {{proposal_date}} that outlines:
- Implementation timeline
- Pricing specific to your needs
- Expected ROI and time savings
- Support and training included

In the meantime, if you have any questions or need clarification on anything we discussed, please don't hesitate to reach out.

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  },
  {
    id: 'proposal_follow_up',
    type: 'email',
    name: 'Proposal Follow-up',
    subject: 'Following up on your Paycile proposal',
    body: `Hi {{contact.first_name}},

I wanted to follow up on the proposal I sent over last week for automating your payment reconciliation.

I know these decisions take time, and you may have questions. I'm happy to:
• Walk through any part of the proposal
• Adjust the scope or timeline
• Connect you with a current customer in insurance
• Schedule a technical deep-dive with our team

**Quick Reminder of the Value:**
• Save 96+ days per year on manual reconciliation
• Real-time cash visibility across all entities
• Reduce errors and improve audit readiness
• ROI typically achieved in first 30 days

What questions can I answer for you?

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  },
  {
    id: 'demo_no_show',
    type: 'email',
    name: 'Demo No-Show Recovery',
    subject: 'We missed you at today\'s demo',
    body: `Hi {{contact.first_name}},

I noticed we missed you at today's scheduled demo. No worries - I know things come up!

If you're still interested in seeing how Paycile can automate your payment reconciliation and save your team 96+ days per year, I'd be happy to reschedule.

**Quick 30-Minute Demo Covers:**
• Live system walkthrough
• Insurance-specific use cases
• ROI calculation for your operation
• Q&A session

You can reschedule here: {{landing_page_url}}

Or if now isn't the right time, just let me know and I'll follow up in a few months.

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  },
  {
    id: 'reengagement_30d',
    type: 'email',
    name: '30-Day Re-engagement',
    subject: 'Still struggling with manual reconciliation?',
    body: `Hi {{contact.first_name}},

I reached out a few weeks ago about automating your payment reconciliation process. I wanted to check back in to see if this is still a priority for you.

**What's Changed Since We Last Spoke:**
• New insurance-specific features launched
• Even faster implementation (30-45 days)
• Enhanced reporting for audit compliance
• Additional customer success stories

**The Problem Hasn't Gone Away:**
Your team is still spending 96+ days per year on manual reconciliation. That's nearly 4 months of productive time that could be spent on strategic financial analysis instead of data entry.

**Worth Another Look?**
If timing is better now, I'd love to show you what's new and how we can help. 30 minutes for a quick demo?

Book here: {{landing_page_url}}

Or if this isn't a priority right now, just let me know and I won't follow up further.

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  }
];

async function addMissingTemplates() {
  console.log('📝 Adding missing content templates...\n');

  try {
    for (const template of missingTemplates) {
      await prisma.contentTemplate.upsert({
        where: { id: template.id },
        update: {
          type: template.type,
          name: template.name,
          subject: template.subject || null,
          body: template.body || null,
        },
        create: {
          id: template.id,
          type: template.type,
          name: template.name,
          subject: template.subject || null,
          body: template.body || null,
        },
      });
      console.log(`✅ Created: ${template.name} (${template.id})`);
    }

    console.log(`\n✅ Successfully created ${missingTemplates.length} missing templates!\n`);
    console.log('🎯 Now all CFO funnel nodes should have proper content connections.\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addMissingTemplates()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
