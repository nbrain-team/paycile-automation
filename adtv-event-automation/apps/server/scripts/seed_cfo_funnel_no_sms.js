// CFO Funnel Template WITHOUT SMS - Copy of CFO Insurance Funnel
// Run: node scripts/seed_cfo_funnel_no_sms.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// =============================================================================
// CFO INSURANCE VERTICAL - CONTENT TEMPLATES (NO SMS)
// =============================================================================

const cfoInsuranceContentNoSMS = [
  // Email Templates
  {
    id: 'cfo_ins_email_01_intro',
    type: 'email',
    name: 'CFO Insurance - Initial Outreach',
    subject: '{{contact.first_name}}, save 96 days per year on period-end close',
    body: `Hi {{contact.first_name}},

I'll be direct: Your finance team is spending 96+ days per year on manual payment reconciliation. That's nearly 4 months of productive time lost to matching transactions and hunting down discrepancies.

Most insurance CFOs I speak with are shocked when they calculate the actual time cost:
• 8-12 hours per week matching carrier payments
• 3-5 days at month-end reconciling across entities  
• Countless hours investigating exceptions and errors

**What if you could automate all of it?**

Paycile gives you real-time cash visibility across all carriers, entities, and accounts—without the manual work. Our customers save 96+ days annually and close their books in days, not weeks.

I'd like to show you how in a quick 30-minute executive demo.

**Book a time here:** {{landing_page_url}}

Or reply to this email and I'll send you times that work.

Best regards,
Jim Fitzgerald
CFO Solutions - Paycile
jim@paycile.com`
  },
  {
    id: 'cfo_ins_email_02_value',
    type: 'email',
    name: 'CFO Insurance - Value Proposition',
    subject: 'Real-time cash visibility across all your insurance entities',
    body: `{{contact.first_name}},

Following up on my previous note about automating your payment reconciliation.

Here's what makes insurance reconciliation uniquely challenging:
• Multiple carriers with different payment formats
• Complex commission structures and premium allocations
• Managing companies, reinsurers, and direct payments
• Consolidation across subsidiaries and entities

**Your team is manually managing all of this.**

Paycile was built specifically for this complexity. We automatically:
✓ Match payments from any carrier format
✓ Handle commission structures and allocations  
✓ Reconcile across all entities in real-time
✓ Provide audit-ready documentation instantly

The result? **100% payment accuracy and 96 days saved per year.**

See it in action: {{landing_page_url}}

Ready to discuss how this works for your operation?

Jim Fitzgerald
CFO Solutions - Paycile`
  },
  {
    id: 'cfo_ins_email_03_case_study',
    type: 'email',
    name: 'CFO Insurance - Case Study',
    subject: 'How this insurance CFO cut close time from 3 weeks to 4 days',
    body: `{{contact.first_name}},

Thought you'd find this relevant:

One of our insurance clients (multi-state, $500M+ in premium) was spending 3 weeks on month-end close. Their team of 6 was buried in spreadsheets, manually matching carrier payments across 12 entities.

**After implementing Paycile:**
• Close cycle: 3 weeks → 4 days
• Reconciliation errors: 12-15/month → 0
• Finance team size: Same 6 people, now doing strategic work
• Cash visibility: Month-end reporting → Real-time dashboard

The CFO told me: "I finally have time to be a strategic advisor instead of a transaction processor."

**Could your team use an extra 96 days per year?**

I'd be happy to walk you through exactly how we did it.

Book 30 minutes: {{landing_page_url}}

Jim Fitzgerald
CFO Solutions - Paycile`
  },
  {
    id: 'cfo_ins_email_04_demo_follow',
    type: 'email',
    name: 'CFO Insurance - Demo Follow-up',
    subject: 'Following up - automating your payment reconciliation',
    body: `{{contact.first_name}},

I wanted to follow up one more time about automating your payment reconciliation process.

I know you're busy (that's exactly why this matters), so I'll keep this brief:

**The question isn't whether to automate—it's when.**

Every month you delay is another:
• 8 days of manual reconciliation work
• Risk of errors in financial reporting  
• Delayed close impacting board reporting
• Strategic decisions based on outdated cash position

I've set aside a few times this week for executive demos. 30 minutes to show you:
1. How we automate multi-carrier reconciliation
2. Real-time cash visibility across all entities
3. The exact ROI for your operation

**Pick a time:** {{landing_page_url}}

Or if this isn't a priority right now, just let me know and I won't follow up further.

Best,
Jim Fitzgerald
Paycile`
  },
  {
    id: 'cfo_ins_email_05_objection',
    type: 'email',
    name: 'CFO Insurance - Addressing Concerns',
    subject: 'Concerned about implementation complexity?',
    body: `{{contact.first_name}},

The most common objection I hear from insurance CFOs:

*"This sounds great, but we can't afford the disruption of implementing new systems during close season."*

I get it. Your team is already maxed out.

Here's what you should know:
• **Implementation:** 30-45 days, not 6-12 months
• **Disruption:** We run parallel to your existing process until you're confident
• **Training:** Your team is up and running in 2-3 days
• **ROI:** Most clients see positive ROI in the first month

One CFO recently told me: *"The cost of NOT implementing was higher than implementing. We were losing $40K/month in productivity."*

Worth a 30-minute conversation to see if it's right for you?

**Schedule here:** {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },

  // Voicemail Templates
  {
    id: 'cfo_ins_vm_01_intro',
    type: 'voicemail',
    name: 'CFO Insurance - VM Intro',
    ttsScript: 'Hi {{contact.first_name}}, this is Jim Fitzgerald with Paycile. I specialize in helping insurance CFOs eliminate manual payment reconciliation. Our clients save 96 days per year and get real-time cash visibility across all their insurance carriers and entities. I\'d love to show you how in a quick 30-minute demo. Visit paycile.com/landing/cfo-insurance to book a time, or call me back at 555-0123. Thanks!'
  },
  {
    id: 'cfo_ins_vm_02_value',
    type: 'voicemail',
    name: 'CFO Insurance - VM Value Prop',
    ttsScript: 'Hi {{contact.first_name}}, Jim Fitzgerald from Paycile following up. I wanted to share a quick stat: The average insurance CFO spends 96 days per year on manual reconciliation. We automate that entire process, giving you real-time visibility and perfect accuracy. Insurance-specific demo takes just 30 minutes. Book at paycile.com/landing/cfo-insurance. Thanks!'
  },
  {
    id: 'cfo_ins_vm_03_case_study',
    type: 'voicemail',
    name: 'CFO Insurance - VM Case Study',
    ttsScript: 'Hi {{contact.first_name}}, Jim from Paycile. Just wrapped a call with an insurance CFO who cut their close time from 3 weeks to 4 days using our platform. They\'re managing 12 entities and multiple carriers, just like you. If you\'d like to see how they did it, I have a few demo slots this week. Book at paycile.com/landing/cfo-insurance or call me at 555-0123. Thanks!'
  },
];

// =============================================================================
// CFO INSURANCE - NO SMS FUNNEL (Based on 90-Node version)
// =============================================================================

const cfoInsuranceFunnelNoSMS = {
  id: 'funnel_cfo_no_sms',
  name: 'CFO-Funnel-No-SMS',
  status: 'published',
  version: 1,
  nodes: [
    // START & TARGETING (Nodes 0-4) - IDENTICAL
    { key: 'N000', type: 'start', name: 'Import: Insurance CFO List', posX: 100, posY: 500, config: {} },
    { key: 'N001', type: 'filter', name: 'Filter: Insurance Industry Only', posX: 300, posY: 500, config: { criteria: 'industry=insurance' } },
    { key: 'N002', type: 'filter', name: 'Filter: Title = CFO/VP Finance/Finance Director', posX: 500, posY: 500, config: { criteria: 'title_contains=CFO,VP Finance,Finance Director' } },
    { key: 'N003', type: 'tag', name: 'Tag: CFO-Insurance-Vertical', posX: 700, posY: 500, config: { tag: 'cfo-insurance' } },
    { key: 'N004', type: 'stage', name: 'STAGE: Day 1 - Initial Outreach', posX: 900, posY: 500, config: {} },

    // DAY 1 - EMAIL SEQUENCE (Nodes 5-9) - IDENTICAL
    { key: 'N005', type: 'email_send', name: 'Send: Initial CFO Email (96 Days)', posX: 1100, posY: 400, config: { template_id: 'cfo_ins_email_01_intro', landing_page: '/landing/cfo-insurance' } },
    { key: 'N006', type: 'wait', name: 'Wait: 2 Hours', posX: 1300, posY: 400, config: { duration: 'PT2H' } },
    { key: 'N007', type: 'decision', name: 'Check: Email Opened?', posX: 1500, posY: 400, config: { condition: 'email_opened' } },
    { key: 'N008', type: 'tag', name: 'Tag: Email-Engaged', posX: 1700, posY: 300, config: { tag: 'email-engaged' } },
    { key: 'N009', type: 'tag', name: 'Tag: Email-Not-Opened', posX: 1700, posY: 500, config: { tag: 'email-not-opened' } },

    // DAY 1 - LINKEDIN (Nodes 10-12) - IDENTICAL
    { key: 'N010', type: 'linkedin_connect', name: 'LinkedIn: Send Connection Request', posX: 1100, posY: 600, config: { message: 'Hi {{contact.first_name}}, I help insurance CFOs automate payment reconciliation. Would love to connect!' } },
    { key: 'N011', type: 'wait', name: 'Wait: 4 Hours', posX: 1300, posY: 600, config: { duration: 'PT4H' } },
    { key: 'N012', type: 'decision', name: 'Check: LinkedIn Accepted?', posX: 1500, posY: 600, config: { condition: 'linkedin_accepted' } },

    // HIGH ENGAGEMENT PATH (Nodes 13-20) - REMOVED SMS N017, adjusted flow
    { key: 'N013', type: 'stage', name: 'STAGE: High Engagement Path', posX: 1900, posY: 250, config: {} },
    { key: 'N014', type: 'wait', name: 'Wait: 3 Hours', posX: 2100, posY: 250, config: { duration: 'PT3H' } },
    { key: 'N015', type: 'decision', name: 'Check: Link Clicked?', posX: 2300, posY: 250, config: { condition: 'link_clicked' } },
    { key: 'N016', type: 'tag', name: 'Tag: HOT-LEAD', posX: 2500, posY: 150, config: { tag: 'hot-lead', score: 100 } },
    // N017 SMS REMOVED
    { key: 'N018', type: 'wait', name: 'Wait: 30 Minutes', posX: 2700, posY: 150, config: { duration: 'PT30M' } },
    { key: 'N019', type: 'decision', name: 'Check: Email Reply?', posX: 2900, posY: 150, config: { condition: 'email_reply' } },
    { key: 'N020', type: 'task', name: 'TASK: BDR Call - Hot Lead', posX: 3100, posY: 50, config: { assign_to: 'BDR', priority: 'urgent' } },

    // MEDIUM ENGAGEMENT PATH (Nodes 21-30) - IDENTICAL
    { key: 'N021', type: 'stage', name: 'STAGE: Medium Engagement', posX: 2500, posY: 350, config: {} },
    { key: 'N022', type: 'wait', name: 'Wait: 6 Hours', posX: 2700, posY: 350, config: { duration: 'PT6H' } },
    { key: 'N023', type: 'linkedin_message', name: 'LinkedIn: Send Message', posX: 2900, posY: 350, config: { message: 'Thanks for connecting! I help insurance CFOs save 96 days/year on reconciliation. Worth a quick call?' } },
    { key: 'N024', type: 'wait', name: 'Wait: 12 Hours', posX: 3100, posY: 350, config: { duration: 'PT12H' } },
    { key: 'N025', type: 'decision', name: 'Check: LinkedIn Reply?', posX: 3300, posY: 350, config: { condition: 'linkedin_reply' } },
    { key: 'N026', type: 'tag', name: 'Tag: Warm-Lead', posX: 3500, posY: 300, config: { tag: 'warm-lead', score: 50 } },
    { key: 'N027', type: 'task', name: 'TASK: BDR Follow-up Call', posX: 3700, posY: 300, config: { assign_to: 'BDR', priority: 'normal' } },
    { key: 'N028', type: 'email_send', name: 'Send: Value Prop Email', posX: 3500, posY: 400, config: { template_id: 'cfo_ins_email_02_value' } },
    { key: 'N029', type: 'wait', name: 'Wait: 1 Day', posX: 3700, posY: 400, config: { duration: 'P1D' } },
    { key: 'N030', type: 'decision', name: 'Check: Email Response?', posX: 3900, posY: 400, config: { condition: 'email_reply' } },

    // DAY 3 - RE-ENGAGEMENT (Nodes 31-40) - REMOVED SMS N033, adjusted flow
    { key: 'N031', type: 'stage', name: 'STAGE: Day 3 - Re-engagement', posX: 1900, posY: 550, config: {} },
    { key: 'N032', type: 'wait', name: 'Wait: Until Day 3', posX: 2100, posY: 550, config: { duration: 'P2D' } },
    // N033 SMS REMOVED
    { key: 'N034', type: 'wait', name: 'Wait: 2 Hours', posX: 2300, posY: 550, config: { duration: 'PT2H' } },
    { key: 'N035', type: 'decision', name: 'Check: Any Activity?', posX: 2500, posY: 550, config: { condition: 'any_activity' } },
    { key: 'N036', type: 'voicemail_drop', name: 'Drop: Voicemail Intro', posX: 2700, posY: 650, config: { template_id: 'cfo_ins_vm_01_intro' } },
    { key: 'N037', type: 'wait', name: 'Wait: 4 Hours', posX: 2900, posY: 650, config: { duration: 'PT4H' } },
    { key: 'N038', type: 'decision', name: 'Check: Voicemail Callback?', posX: 3100, posY: 650, config: { condition: 'inbound_call' } },
    { key: 'N039', type: 'email_send', name: 'Send: Case Study Email', posX: 2700, posY: 500, config: { template_id: 'cfo_ins_email_03_case_study' } },
    { key: 'N040', type: 'wait', name: 'Wait: 1 Day', posX: 2900, posY: 500, config: { duration: 'P1D' } },

    // DAY 5 - ENGAGEMENT SCORING (Nodes 41-50) - IDENTICAL
    { key: 'N041', type: 'stage', name: 'STAGE: Day 5 - Engagement Scoring', posX: 100, posY: 900, config: {} },
    { key: 'N042', type: 'scoring', name: 'Calculate: Engagement Score', posX: 300, posY: 900, config: { 
      rules: [
        { action: 'email_opened', points: 10 },
        { action: 'link_clicked', points: 25 },
        { action: 'email_reply', points: 50 },
        { action: 'linkedin_accepted', points: 15 },
        { action: 'linkedin_reply', points: 30 }
      ]
    } },
    { key: 'N043', type: 'decision', name: 'Decision: Score >= 75?', posX: 500, posY: 900, config: { condition: 'score_gte_75' } },
    { key: 'N044', type: 'tag', name: 'Tag: VERY-HOT', posX: 700, posY: 800, config: { tag: 'very-hot', score: 100 } },
    { key: 'N045', type: 'task', name: 'TASK: Immediate BDR Outreach', posX: 900, posY: 800, config: { assign_to: 'BDR', priority: 'urgent', note: 'High engagement - call ASAP' } },
    { key: 'N046', type: 'decision', name: 'Decision: Score 40-74?', posX: 700, posY: 900, config: { condition: 'score_40_to_74' } },
    { key: 'N047', type: 'tag', name: 'Tag: Warm', posX: 900, posY: 900, config: { tag: 'warm', score: 50 } },
    { key: 'N048', type: 'email_send', name: 'Send: Demo Follow-up', posX: 1100, posY: 900, config: { template_id: 'cfo_ins_email_04_demo_follow' } },
    { key: 'N049', type: 'decision', name: 'Decision: Score < 40?', posX: 700, posY: 1000, config: { condition: 'score_lt_40' } },
    { key: 'N050', type: 'tag', name: 'Tag: Cold', posX: 900, posY: 1000, config: { tag: 'cold' } },

    // DAY 7 - FINAL PUSH (Nodes 51-60) - REMOVED SMS N053, adjusted flow
    { key: 'N051', type: 'stage', name: 'STAGE: Day 7 - Final Push', posX: 1300, posY: 900, config: {} },
    { key: 'N052', type: 'wait', name: 'Wait: Until Day 7', posX: 1500, posY: 900, config: { duration: 'P2D' } },
    // N053 SMS REMOVED
    { key: 'N054', type: 'wait', name: 'Wait: 3 Hours', posX: 1700, posY: 900, config: { duration: 'PT3H' } },
    { key: 'N055', type: 'voicemail_drop', name: 'Drop: VM Value Prop', posX: 1900, posY: 900, config: { template_id: 'cfo_ins_vm_02_value' } },
    { key: 'N056', type: 'wait', name: 'Wait: 4 Hours', posX: 2100, posY: 900, config: { duration: 'PT4H' } },
    { key: 'N057', type: 'email_send', name: 'Send: Objection Handler Email', posX: 2300, posY: 900, config: { template_id: 'cfo_ins_email_05_objection' } },
    { key: 'N058', type: 'wait', name: 'Wait: 2 Days', posX: 2500, posY: 900, config: { duration: 'P2D' } },
    { key: 'N059', type: 'decision', name: 'Check: Any Engagement?', posX: 2700, posY: 900, config: { condition: 'any_activity' } },
    { key: 'N060', type: 'task', name: 'TASK: BDR Last Attempt Call', posX: 2900, posY: 850, config: { assign_to: 'BDR' } },

    // POSITIVE RESPONSE HANDLER (Nodes 61-70) - REMOVED SMS N067, adjusted flow
    { key: 'N061', type: 'stage', name: 'STAGE: Positive Response Received', posX: 3300, posY: 150, config: {} },
    { key: 'N062', type: 'tag', name: 'Tag: DEMO-REQUESTED', posX: 3500, posY: 150, config: { tag: 'demo-requested' } },
    { key: 'N063', type: 'task', name: 'TASK: Schedule Demo', posX: 3700, posY: 150, config: { assign_to: 'BDR', priority: 'urgent', note: 'Schedule CFO demo ASAP' } },
    { key: 'N064', type: 'wait', name: 'Wait: 1 Hour', posX: 3900, posY: 150, config: { duration: 'PT1H' } },
    { key: 'N065', type: 'email_send', name: 'Send: Demo Confirmation', posX: 4100, posY: 150, config: { template_id: 'demo_confirmation', subject: 'Your Paycile Demo - {{demo_date}}' } },
    { key: 'N066', type: 'wait', name: 'Wait: Until 1 Day Before Demo', posX: 4300, posY: 150, config: { duration: 'until_demo_minus_1d' } },
    // N067 SMS REMOVED
    { key: 'N068', type: 'wait', name: 'Wait: Until Demo Time', posX: 4500, posY: 150, config: { duration: 'until_demo_time' } },
    { key: 'N069', type: 'task', name: 'TASK: Demo Conducted', posX: 4700, posY: 150, config: { assign_to: 'Sales', note: 'Mark demo as completed' } },
    { key: 'N070', type: 'decision', name: 'Check: Demo Attended?', posX: 4900, posY: 150, config: { condition: 'demo_attended' } },

    // POST-DEMO FOLLOW-UP (Nodes 71-80) - IDENTICAL
    { key: 'N071', type: 'stage', name: 'STAGE: Post-Demo Follow-up', posX: 5100, posY: 100, config: {} },
    { key: 'N072', type: 'wait', name: 'Wait: 2 Hours After Demo', posX: 5300, posY: 100, config: { duration: 'PT2H' } },
    { key: 'N073', type: 'email_send', name: 'Send: Thank You + Next Steps', posX: 5500, posY: 100, config: { template_id: 'demo_thank_you', subject: 'Thanks for your time today {{contact.first_name}}' } },
    { key: 'N074', type: 'wait', name: 'Wait: 1 Day', posX: 5700, posY: 100, config: { duration: 'P1D' } },
    { key: 'N075', type: 'task', name: 'TASK: Send Proposal', posX: 5900, posY: 100, config: { assign_to: 'Sales', note: 'Send custom proposal' } },
    { key: 'N076', type: 'wait', name: 'Wait: 2 Days', posX: 6100, posY: 100, config: { duration: 'P2D' } },
    { key: 'N077', type: 'decision', name: 'Check: Proposal Response?', posX: 6300, posY: 100, config: { condition: 'proposal_response' } },
    { key: 'N078', type: 'email_send', name: 'Send: Proposal Follow-up', posX: 6500, posY: 150, config: { template_id: 'proposal_follow_up' } },
    { key: 'N079', type: 'task', name: 'TASK: Sales Call', posX: 6700, posY: 150, config: { assign_to: 'Sales' } },
    { key: 'N080', type: 'goal', name: 'GOAL: Opportunity Created', posX: 6900, posY: 50, config: {} },

    // NO-SHOW PATH (Nodes 81-85) - REMOVED SMS N083, adjusted flow
    { key: 'N081', type: 'stage', name: 'STAGE: Demo No-Show Recovery', posX: 5100, posY: 250, config: {} },
    { key: 'N082', type: 'email_send', name: 'Send: Sorry We Missed You', posX: 5300, posY: 250, config: { template_id: 'demo_no_show', subject: 'We missed you at today\'s demo' } },
    // N083 SMS REMOVED
    { key: 'N084', type: 'wait', name: 'Wait: 2 Days', posX: 5500, posY: 250, config: { duration: 'P2D' } },
    { key: 'N085', type: 'decision', name: 'Check: Rescheduled?', posX: 5700, posY: 250, config: { condition: 'demo_rescheduled' } },

    // LONG-TERM NURTURE (Nodes 86-89) - IDENTICAL
    { key: 'N086', type: 'stage', name: 'STAGE: Long-term Nurture', posX: 2900, posY: 1000, config: {} },
    { key: 'N087', type: 'wait', name: 'Wait: 30 Days', posX: 3100, posY: 1000, config: { duration: 'P30D' } },
    { key: 'N088', type: 'email_send', name: 'Send: Re-engagement Email', posX: 3300, posY: 1000, config: { template_id: 'reengagement_30d', subject: 'Still struggling with manual reconciliation?' } },
    { key: 'N089', type: 'decision', name: 'Check: Re-engaged?', posX: 3500, posY: 1000, config: { condition: 'email_opened' } },
    { key: 'N090', type: 'exit', name: 'EXIT: End Campaign', posX: 3700, posY: 1050, config: {} },
  ],
  edges: [
    // Start sequence
    { from: 'N000', to: 'N001' },
    { from: 'N001', to: 'N002' },
    { from: 'N002', to: 'N003' },
    { from: 'N003', to: 'N004' },
    
    // Day 1 - Parallel email and LinkedIn
    { from: 'N004', to: 'N005' },
    { from: 'N004', to: 'N010' },
    
    // Email path
    { from: 'N005', to: 'N006' },
    { from: 'N006', to: 'N007' },
    { from: 'N007', to: 'N008', condition: { email_opened: true } },
    { from: 'N007', to: 'N009', condition: { email_opened: false } },
    
    // LinkedIn path
    { from: 'N010', to: 'N011' },
    { from: 'N011', to: 'N012' },
    
    // High engagement path (opened + clicked) - ADJUSTED: Skip SMS N017
    { from: 'N008', to: 'N013' },
    { from: 'N013', to: 'N014' },
    { from: 'N014', to: 'N015' },
    { from: 'N015', to: 'N016', condition: { link_clicked: true } },
    { from: 'N016', to: 'N018' }, // Skip N017 SMS
    { from: 'N018', to: 'N019' },
    { from: 'N019', to: 'N020', condition: { email_reply: true } },
    { from: 'N020', to: 'N061' }, // Jump to positive response handler
    
    // Medium engagement path
    { from: 'N015', to: 'N021', condition: { link_clicked: false } },
    { from: 'N012', to: 'N021', condition: { linkedin_accepted: true } },
    { from: 'N021', to: 'N022' },
    { from: 'N022', to: 'N023' },
    { from: 'N023', to: 'N024' },
    { from: 'N024', to: 'N025' },
    { from: 'N025', to: 'N026', condition: { linkedin_reply: true } },
    { from: 'N026', to: 'N027' },
    { from: 'N027', to: 'N061' }, // Jump to positive response handler
    { from: 'N025', to: 'N028', condition: { linkedin_reply: false } },
    { from: 'N028', to: 'N029' },
    { from: 'N029', to: 'N030' },
    { from: 'N030', to: 'N061', condition: { email_reply: true } },
    
    // Day 3 re-engagement - ADJUSTED: Skip SMS N033
    { from: 'N009', to: 'N031' }, // Not opened path
    { from: 'N012', to: 'N031', condition: { linkedin_accepted: false } },
    { from: 'N030', to: 'N031', condition: { email_reply: false } },
    { from: 'N019', to: 'N031', condition: { email_reply: false } }, // Added: if no email reply from hot path
    { from: 'N031', to: 'N032' },
    { from: 'N032', to: 'N034' }, // Skip N033 SMS
    { from: 'N034', to: 'N035' },
    { from: 'N035', to: 'N061', condition: { any_activity: true } },
    { from: 'N035', to: 'N036', condition: { any_activity: false } },
    { from: 'N036', to: 'N037' },
    { from: 'N037', to: 'N038' },
    { from: 'N038', to: 'N061', condition: { inbound_call: true } },
    { from: 'N038', to: 'N039', condition: { inbound_call: false } },
    { from: 'N039', to: 'N040' },
    { from: 'N040', to: 'N041' },
    
    // Day 5 scoring
    { from: 'N041', to: 'N042' },
    { from: 'N042', to: 'N043' },
    { from: 'N043', to: 'N044', condition: { score_gte_75: true } },
    { from: 'N044', to: 'N045' },
    { from: 'N045', to: 'N061' },
    { from: 'N043', to: 'N046', condition: { score_gte_75: false } },
    { from: 'N046', to: 'N047', condition: { score_40_to_74: true } },
    { from: 'N047', to: 'N048' },
    { from: 'N048', to: 'N051' },
    { from: 'N046', to: 'N049', condition: { score_40_to_74: false } },
    { from: 'N049', to: 'N050' },
    { from: 'N050', to: 'N086' }, // Jump to long-term nurture
    
    // Day 7 final push - ADJUSTED: Skip SMS N053
    { from: 'N051', to: 'N052' },
    { from: 'N052', to: 'N054' }, // Skip N053 SMS
    { from: 'N054', to: 'N055' },
    { from: 'N055', to: 'N056' },
    { from: 'N056', to: 'N057' },
    { from: 'N057', to: 'N058' },
    { from: 'N058', to: 'N059' },
    { from: 'N059', to: 'N060', condition: { any_activity: true } },
    { from: 'N060', to: 'N061' },
    { from: 'N059', to: 'N086', condition: { any_activity: false } },
    
    // Positive response handler - ADJUSTED: Skip SMS N067
    { from: 'N061', to: 'N062' },
    { from: 'N062', to: 'N063' },
    { from: 'N063', to: 'N064' },
    { from: 'N064', to: 'N065' },
    { from: 'N065', to: 'N066' },
    { from: 'N066', to: 'N068' }, // Skip N067 SMS
    { from: 'N068', to: 'N069' },
    { from: 'N069', to: 'N070' },
    { from: 'N070', to: 'N071', condition: { demo_attended: true } },
    { from: 'N070', to: 'N081', condition: { demo_attended: false } },
    
    // Post-demo follow-up
    { from: 'N071', to: 'N072' },
    { from: 'N072', to: 'N073' },
    { from: 'N073', to: 'N074' },
    { from: 'N074', to: 'N075' },
    { from: 'N075', to: 'N076' },
    { from: 'N076', to: 'N077' },
    { from: 'N077', to: 'N080', condition: { proposal_response: true } },
    { from: 'N077', to: 'N078', condition: { proposal_response: false } },
    { from: 'N078', to: 'N079' },
    { from: 'N079', to: 'N080' },
    
    // No-show path - ADJUSTED: Skip SMS N083
    { from: 'N081', to: 'N082' },
    { from: 'N082', to: 'N084' }, // Skip N083 SMS
    { from: 'N084', to: 'N085' },
    { from: 'N085', to: 'N068', condition: { demo_rescheduled: true } }, // Back to demo time
    { from: 'N085', to: 'N086', condition: { demo_rescheduled: false } }, // To nurture
    
    // Long-term nurture
    { from: 'N086', to: 'N087' },
    { from: 'N087', to: 'N088' },
    { from: 'N088', to: 'N089' },
    { from: 'N089', to: 'N004', condition: { email_opened: true } }, // Re-engage from start
    { from: 'N089', to: 'N090', condition: { email_opened: false } }, // Exit
  ]
};

// =============================================================================
// SEED FUNCTION
// =============================================================================

async function seed() {
  console.log('🚀 Seeding CFO Funnel (No SMS)...\n');

  try {
    // 1. Create or update content templates (no SMS)
    console.log('📧 Creating content templates (Email + Voicemail only)...');
    for (const template of cfoInsuranceContentNoSMS) {
      await prisma.contentTemplate.upsert({
        where: { id: template.id },
        update: {
          type: template.type,
          name: template.name,
          subject: template.subject || null,
          body: template.body || null,
          text: template.text || null,
          ttsScript: template.ttsScript || null,
        },
        create: {
          id: template.id,
          type: template.type,
          name: template.name,
          subject: template.subject || null,
          body: template.body || null,
          text: template.text || null,
          ttsScript: template.ttsScript || null,
        },
      });
    }
    console.log(`✅ Created ${cfoInsuranceContentNoSMS.length} content templates\n`);

    // 2. Create funnel template
    console.log('🎯 Creating CFO-Funnel-No-SMS...');
    const funnel = cfoInsuranceFunnelNoSMS;
    
    // Delete existing funnel if it exists
    const existing = await prisma.template.findUnique({
      where: { id: funnel.id },
    });
    
    if (existing) {
      console.log('⚠️  Existing funnel found, deleting...');
      await prisma.template.delete({ where: { id: funnel.id } });
    }

    // Create funnel template
    await prisma.template.create({
      data: {
        id: funnel.id,
        name: funnel.name,
        status: funnel.status,
        version: funnel.version,
        nodesJson: JSON.stringify(funnel.nodes),
        edgesJson: JSON.stringify(funnel.edges),
      },
    });

    console.log(`✅ Created funnel: ${funnel.name}`);
    console.log(`   - ${funnel.nodes.length} nodes (${funnel.nodes.filter(n => n.type === 'sms_send').length} SMS nodes removed)`);
    console.log(`   - ${funnel.edges.length} edges\n`);

    console.log('🎉 CFO-Funnel-No-SMS seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - Funnel ID: ${funnel.id}`);
    console.log(`   - Funnel Name: ${funnel.name}`);
    console.log(`   - Total Nodes: ${funnel.nodes.length}`);
    console.log(`   - Email Nodes: ${funnel.nodes.filter(n => n.type === 'email_send').length}`);
    console.log(`   - Voicemail Nodes: ${funnel.nodes.filter(n => n.type === 'voicemail_drop').length}`);
    console.log(`   - SMS Nodes: ${funnel.nodes.filter(n => n.type === 'sms_send').length} (all removed)`);
    console.log(`   - LinkedIn Nodes: ${funnel.nodes.filter(n => n.type === 'linkedin_connect' || n.type === 'linkedin_message').length}`);
    console.log(`   - Decision Nodes: ${funnel.nodes.filter(n => n.type === 'decision').length}`);
    console.log(`   - Task Nodes: ${funnel.nodes.filter(n => n.type === 'task').length}`);

  } catch (error) {
    console.error('❌ Error seeding funnel:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

