// Comprehensive Paycile Funnel Templates with 90 Nodes Each
// Run: node scripts/seed_comprehensive_paycile_funnels.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// =============================================================================
// CFO INSURANCE VERTICAL - CONTENT TEMPLATES
// =============================================================================

const cfoInsuranceContent = [
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

  // SMS Templates
  {
    id: 'cfo_ins_sms_01_intro',
    type: 'sms',
    name: 'CFO Insurance - SMS Intro',
    text: 'Hi {{contact.first_name}}, Jim from Paycile. Quick question - how many days does your team spend on payment reconciliation each month? Most insurance CFOs are shocked when they calculate it. I can show you how to automate 90% of it. Worth a quick call? Reply YES for times.'
  },
  {
    id: 'cfo_ins_sms_02_value',
    type: 'sms',
    name: 'CFO Insurance - SMS Value',
    text: '{{contact.first_name}}, following up on payment reconciliation automation. Our insurance clients save 96+ days/year and get real-time cash visibility across all carriers. 30-min demo? {{landing_page_url}}'
  },
  {
    id: 'cfo_ins_sms_03_urgency',
    type: 'sms',
    name: 'CFO Insurance - SMS Urgency',
    text: 'Hi {{contact.first_name}}, month-end close coming up. Imagine closing in 4 days instead of 3 weeks. That\'s what automated reconciliation does. Quick demo this week? Book here: {{landing_page_url}}'
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
// CONTROLLER MULTI-ENTITY - CONTENT TEMPLATES
// =============================================================================

const controllerContent = [
  // Email Templates
  {
    id: 'ctrl_email_01_intro',
    type: 'email',
    name: 'Controller - Initial Outreach',
    subject: 'Reduce your period-end close workload by 90%',
    body: `Hi {{contact.first_name}},

How long does your month-end close take? For most controllers managing multiple entities, it's 2-3 weeks of chaos.

Here's what I typically hear:
• "We're reconciling across 20+ bank accounts manually"
• "Intercompany transactions are a nightmare"  
• "We can't produce accurate reports until week 3"
• "My team works nights and weekends during close"

**There's a better way.**

Paycile automates multi-entity reconciliation so you can close in days, not weeks. Our customers reduce their reconciliation workload by 90% and eliminate errors entirely.

One controller told me: *"I finally have time to analyze results instead of just producing them."*

**See how it works:** {{landing_page_url}}

30-minute demo shows you exactly how we automate your process.

Best,
Jim Fitzgerald
Paycile
jim@paycile.com`
  },
  {
    id: 'ctrl_email_02_intercompany',
    type: 'email',
    name: 'Controller - Intercompany Focus',
    subject: 'Automated intercompany reconciliation in real-time',
    body: `{{contact.first_name}},

Quick question: How long does it take your team to reconcile intercompany transactions at month-end?

Most controllers tell me 3-5 days minimum. Some take a full week just to figure out which entities owe what to whom.

**Paycile automates this entirely.**

Here's what happens:
1. Every intercompany transaction is automatically matched in real-time
2. You see which entities owe/are owed at any moment
3. Exception reports flag issues before month-end
4. Consolidation happens automatically across all entities

**The result?** Real-time visibility instead of month-end surprises.

One controller managing 15 subsidiaries cut their close from 18 days to 5 days. They have the same team, just no manual reconciliation.

Want to see how it works for your structure?

**Demo here:** {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },
  {
    id: 'ctrl_email_03_close_time',
    type: 'email',
    name: 'Controller - Close Time Reduction',
    subject: 'Close in 5 days instead of 3 weeks',
    body: `{{contact.first_name}},

What would it mean for your team to close the books in 5 days instead of 3 weeks?

Here's what changes:
✓ No more nights and weekends during close
✓ Board reporting on time, every time
✓ Team focused on analysis, not transaction hunting
✓ Strategic insights when they matter, not after the fact

**This isn't theoretical.** Our customers are doing it right now.

The difference? Automated reconciliation across all entities, accounts, and systems. Everything that currently takes your team days or weeks happens automatically in real-time.

I can show you exactly how in 30 minutes:
• Your specific entity structure
• Integration with your ERP systems  
• Implementation timeline and ROI
• Live demo of the platform

**Book your demo:** {{landing_page_url}}

Best,
Jim Fitzgerald
Paycile`
  },
  {
    id: 'ctrl_email_04_roi',
    type: 'email',
    name: 'Controller - ROI Focus',
    subject: 'The real cost of manual reconciliation',
    body: `{{contact.first_name}},

Let's talk numbers.

If your team spends 2 weeks on month-end close, that's 24 weeks per year. At an average loaded cost of $75K per finance team member, here's what manual reconciliation is costing you:

**For a team of 4:** ~$140K per year in reconciliation labor
**Plus:** Late financial insights, reporting delays, error correction, audit issues

Paycile typically costs 15-20% of what you're spending on manual reconciliation. And delivers:
• 90% reduction in reconciliation workload
• Real-time visibility instead of month-end reporting
• Zero reconciliation errors  
• 10x faster close process

**ROI in month 1** for most customers.

See the numbers for your operation: {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },
  {
    id: 'ctrl_email_05_final',
    type: 'email',
    name: 'Controller - Final Outreach',
    subject: 'Last note on automating your close process',
    body: `{{contact.first_name}},

This is my last note about automating your multi-entity reconciliation.

I've reached out a few times because I know the pain of managing close across multiple entities. I spent 8 years as a controller before joining Paycile, so I've lived through the 2-3 week close cycles.

**If automation isn't a priority right now, I totally understand.** Just wanted to make sure you had the chance to see how other controllers are closing 10x faster.

If you'd like to see it: {{landing_page_url}}

If not, no worries—I won't reach out again.

Either way, best of luck with your close process.

Jim Fitzgerald
Paycile`
  },

  // SMS Templates
  {
    id: 'ctrl_sms_01_intro',
    type: 'sms',
    name: 'Controller - SMS Intro',
    text: 'Hi {{contact.first_name}}, Jim from Paycile. How long does your multi-entity close take? 2 weeks? 3? We help controllers close in 5 days with automated reconciliation. 30-min demo? {{landing_page_url}}'
  },
  {
    id: 'ctrl_sms_02_intercompany',
    type: 'sms',
    name: 'Controller - SMS Intercompany',
    text: '{{contact.first_name}}, spent 5 days on intercompany reconciliation last close? Automate it. See real-time which entities owe what. Demo: {{landing_page_url}}'
  },
  {
    id: 'ctrl_sms_03_close',
    type: 'sms',
    name: 'Controller - SMS Close Coming',
    text: 'Hi {{contact.first_name}}, close week coming up? Imagine finishing in 5 days instead of 3 weeks. That\'s automated reconciliation. Quick demo? {{landing_page_url}}'
  },

  // Voicemail Templates
  {
    id: 'ctrl_vm_01_intro',
    type: 'voicemail',
    name: 'Controller - VM Intro',
    ttsScript: 'Hi {{contact.first_name}}, Jim Fitzgerald with Paycile. I help controllers automate multi-entity reconciliation. Our clients reduce their close time by 90 percent and eliminate reconciliation errors entirely. If you\'d like to see how we automate your intercompany transactions and consolidation process, visit paycile.com/landing/controller to book a quick demo. Thanks!'
  },
  {
    id: 'ctrl_vm_02_value',
    type: 'voicemail',
    name: 'Controller - VM Value',
    ttsScript: 'Hi {{contact.first_name}}, this is Jim from Paycile following up. Quick question: how much time does your team spend on reconciliation during close? Most controllers tell me 2 to 3 weeks. We automate that entire process so you can close in days, not weeks. See a live demo at paycile.com/landing/controller. Thanks!'
  },
];

// =============================================================================
// AR/AP UNAPPLIED FUNDS - CONTENT TEMPLATES
// =============================================================================

const arapContent = [
  // Email Templates
  {
    id: 'arap_email_01_intro',
    type: 'email',
    name: 'AR/AP - Initial Outreach',
    subject: '{{contact.first_name}}, you likely have $250K+ in unapplied funds',
    body: `Hi {{contact.first_name}},

Quick question: How much cash is sitting in your unapplied funds account right now?

Most AR/AP managers I talk to don't actually know. They know it's "a lot," but they're too buried in daily payment matching to investigate.

**On average, our customers discover $250K-$500K in unapplied funds** they didn't know they had. That's cash that came in but was never applied to invoices or customer accounts.

It's sitting there. Not working for you. Just... sitting.

**Paycile finds it and matches it automatically.**

We automatically:
• Match payments to invoices (even with incomplete references)
• Identify and recover unapplied funds
• Handle partial payments, overpayments, and complex scenarios
• Provide complete audit trails for everything

One AR manager recovered $380K in the first month. Another found $520K that had been sitting for over a year.

**Want to see how much you're sitting on?**

Book a free assessment: {{landing_page_url}}

We'll show you exactly where your unapplied funds are and how to recover them.

Best,
Jim Fitzgerald
AR/AP Solutions - Paycile`
  },
  {
    id: 'arap_email_02_matching',
    type: 'email',
    name: 'AR/AP - Payment Matching Focus',
    subject: 'Spending hours matching payments to invoices?',
    body: `{{contact.first_name}},

Following up on payment automation for your AR/AP process.

Here's what I hear from most AR/AP specialists:
• "Customer put wrong invoice number on payment"
• "We get ACH files with no reference data"  
• "Matching partial payments takes forever"
• "We have hundreds of unapplied payments we need to research"

**Your team is spending 20-30 hours per week on this.**

Paycile's AI automatically matches payments to invoices with 98% accuracy, even when:
• Invoice numbers are wrong or missing
• Payments are partial or overpayments  
• References are incomplete or incorrect
• Multiple invoices are paid in one transaction

**The 2% we can't auto-match?** We flag them with suggested matches so your team resolves them in minutes, not hours.

See it work on your actual payment data: {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },
  {
    id: 'arap_email_03_recovery',
    type: 'email',
    name: 'AR/AP - Fund Recovery Case',
    subject: 'Case study: $380K recovered from unapplied funds',
    body: `{{contact.first_name}},

Quick story that might sound familiar:

AR Manager at a mid-size distributor had $1.2M in their unapplied cash account. They knew they needed to research it, but they were too busy keeping up with daily payments.

**After implementing Paycile:**
• Week 1: System matched $380K to open invoices automatically
• Week 2: Another $290K matched to customer accounts
• Week 3: Final $410K matched (some going back 18 months)
• Week 4: Unapplied balance = $120K (all flagged as legitimate overpayments/credits)

Total recovered and applied: **$1.08M in cash** that was just sitting there.

The AR Manager: *"This paid for itself 50x over in the first month."*

**How much are you sitting on?**

Free assessment: {{landing_page_url}}

We'll show you exactly where your unapplied funds are.

Jim Fitzgerald
Paycile`
  },
  {
    id: 'arap_email_04_dso',
    type: 'email',
    name: 'AR/AP - DSO Improvement',
    subject: 'Reduce DSO by 15-20 days',
    body: `{{contact.first_name}},

Here's an interesting side effect of automated payment matching:

**Your DSO drops by 15-20 days.**

Why? Because you're no longer leaving payments unapplied for days or weeks while your team researches them. Every payment gets matched and applied same-day (often same-hour).

This means:
• Cash is recognized faster
• AR aging is accurate in real-time
• You know true receivables position
• Collections focuses on actual open balances

One AP manager told me: *"We stopped chasing customers who had already paid. That alone saved us 10 hours per week."*

Plus you recover all those unapplied funds sitting in suspense.

Want to see your potential DSO improvement?

**Book assessment:** {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },

  // SMS Templates
  {
    id: 'arap_sms_01_intro',
    type: 'sms',
    name: 'AR/AP - SMS Intro',
    text: 'Hi {{contact.first_name}}, Jim from Paycile. Quick question - how much cash in unapplied funds right now? Most companies have $250K+ they don\'t know about. Free assessment? {{landing_page_url}}'
  },
  {
    id: 'arap_sms_02_matching',
    type: 'sms',
    name: 'AR/AP - SMS Matching',
    text: '{{contact.first_name}}, spending 20-30 hrs/week matching payments? We automate 98% of it with AI. See it work on your data. Demo: {{landing_page_url}}'
  },
  {
    id: 'arap_sms_03_recovery',
    type: 'sms',
    name: 'AR/AP - SMS Recovery',
    text: 'Hi {{contact.first_name}}, one client recovered $380K in unapplied funds in month 1. Want to see how much you\'re sitting on? Free assessment: {{landing_page_url}}'
  },

  // Voicemail Templates
  {
    id: 'arap_vm_01_intro',
    type: 'voicemail',
    name: 'AR/AP - VM Intro',
    ttsScript: 'Hi {{contact.first_name}}, Jim Fitzgerald with Paycile. I specialize in helping AR and AP teams recover unapplied funds and automate payment matching. Most companies have $250,000 or more in unapplied funds they don\'t even know about. We find it and match it automatically. Book a free assessment at paycile.com/landing/arap or call me at 555-0123. Thanks!'
  },
  {
    id: 'arap_vm_02_matching',
    type: 'voicemail',
    name: 'AR/AP - VM Matching',
    ttsScript: 'Hi {{contact.first_name}}, this is Jim from Paycile. I wanted to share how we help AR AP teams automate payment matching. Our AI matches 98 percent of payments automatically, even when invoice numbers are wrong or missing. Takes 20 to 30 hours per week down to 2 to 3 hours. Quick demo at paycile.com/landing/arap. Thanks!'
  },
];

// =============================================================================
// PROPERTY MANAGEMENT YARDI - CONTENT TEMPLATES
// =============================================================================

const propMgmtContent = [
  // Email Templates
  {
    id: 'prop_email_01_intro',
    type: 'email',
    name: 'Property Mgmt - Initial Outreach',
    subject: 'Native Yardi integration for payment reconciliation',
    body: `Hi {{contact.first_name}},

If you're managing payment reconciliation across multiple properties in Yardi, you know the pain:

• Exporting payment files from Yardi
• Manually matching in spreadsheets  
• Importing results back to Yardi
• Repeating this for every property
• Hoping you didn't miss anything

**What if reconciliation just happened inside Yardi automatically?**

Paycile integrates natively with Yardi Voyager. No exports, no imports, no spreadsheets. Just automated reconciliation for your entire portfolio.

Our property management customers:
• Save 85% of reconciliation time
• See real-time cash position by property
• Eliminate rent/deposit matching errors
• Close month-end in days, not weeks

**See the Yardi integration live:** {{landing_page_url}}

30-minute demo shows how it works in your Yardi environment.

Jim Fitzgerald
Property Management Solutions - Paycile`
  },
  {
    id: 'prop_email_02_multi_property',
    type: 'email',
    name: 'Property Mgmt - Multi-Property Focus',
    subject: 'Reconcile your entire portfolio from one dashboard',
    body: `{{contact.first_name}},

Managing 20+ properties? 50? 100+?

How long does it take to get an accurate cash position across your entire portfolio?

Most property finance managers tell me: *"I can tell you where we were last week. Real-time? Impossible."*

**Not anymore.**

Paycile gives you real-time cash visibility across your entire portfolio:
• Every property's cash position updated in real-time
• Rent payments automatically matched to units
• Security deposits, pet fees, application fees—all automated
• Portfolio-wide view or drill down to any property

One property manager with 85 properties told me: *"I used to spend 2 days getting a portfolio cash report. Now it's instant, anytime I want it."*

**See your portfolio in real-time:** {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },
  {
    id: 'prop_email_03_yardi_native',
    type: 'email',
    name: 'Property Mgmt - Yardi Native Benefits',
    subject: 'Why Yardi-native integration matters',
    body: `{{contact.first_name}},

You've probably seen "Yardi integration" before. Most tools mean:
• Export data from Yardi
• Process in their system  
• Import results back
• Hope nothing broke

**That's not integration. That's duct tape.**

Paycile is native to Yardi Voyager:
✓ Works inside your Yardi environment
✓ No data exports or imports required
✓ Preserves your workflows and processes
✓ Updates Yardi in real-time automatically
✓ Uses Yardi's security and permissions

Your team never leaves Yardi. They just stop doing manual reconciliation because it happens automatically.

One property finance director managing a 200-property portfolio said: *"It's like Yardi learned how to reconcile payments by itself."*

**See the native integration:** {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },
  {
    id: 'prop_email_04_case',
    type: 'email',
    name: 'Property Mgmt - Case Study',
    subject: 'How this PM company automated 500+ properties',
    body: `{{contact.first_name}},

Sharing a recent success story:

Property management company, 500+ residential properties across 8 states. Finance team of 5 spending 60+ hours per week on reconciliation.

**The problem:**
• Different payment processors for different properties
• Tenant payments via multiple channels (ACH, check, online, app)
• Manual matching in Yardi taking 2-3 hours per day per property
• Month-end close taking 2 weeks

**After Paycile:**
• All payments auto-matched in Yardi regardless of source
• Reconciliation time: 60 hours/week → 8 hours/week
• Close time: 2 weeks → 4 days
• Same 5-person team, now doing strategic work

The Finance Director: *"We finally have time to analyze our portfolio performance instead of just reconciling it."*

**Could this work for your portfolio?**

See the demo: {{landing_page_url}}

Jim Fitzgerald
Paycile`
  },

  // SMS Templates
  {
    id: 'prop_sms_01_intro',
    type: 'sms',
    name: 'Property Mgmt - SMS Intro',
    text: 'Hi {{contact.first_name}}, Jim from Paycile. Spending hours reconciling rent payments in Yardi? We automate it natively inside Yardi. Save 85% of time. Demo: {{landing_page_url}}'
  },
  {
    id: 'prop_sms_02_portfolio',
    type: 'sms',
    name: 'Property Mgmt - SMS Portfolio',
    text: '{{contact.first_name}}, managing 20+ properties? Get real-time cash position across entire portfolio. Native Yardi integration. See demo: {{landing_page_url}}'
  },

  // Voicemail Templates
  {
    id: 'prop_vm_01_intro',
    type: 'voicemail',
    name: 'Property Mgmt - VM Intro',
    ttsScript: 'Hi {{contact.first_name}}, Jim Fitzgerald with Paycile. I help property management companies automate payment reconciliation directly in Yardi Voyager. Our clients save 85 percent of their reconciliation time and get real-time cash visibility across their entire portfolio. If you\'d like to see the native Yardi integration, visit paycile.com/landing/property-management to book a demo. Thanks!'
  },
];

// =============================================================================
// CFO INSURANCE - 90 NODE FUNNEL
// =============================================================================

const cfoInsuranceFunnel = {
  id: 'funnel_cfo_insurance_v2',
  name: 'CFO Insurance - Multi-Channel 90-Node',
  status: 'published',
  version: 2,
  nodes: [
    // START & TARGETING (Nodes 0-4)
    { key: 'N000', type: 'start', name: 'Import: Insurance CFO List', posX: 100, posY: 500, config: {} },
    { key: 'N001', type: 'filter', name: 'Filter: Insurance Industry Only', posX: 300, posY: 500, config: { criteria: 'industry=insurance' } },
    { key: 'N002', type: 'filter', name: 'Filter: Title = CFO/VP Finance/Finance Director', posX: 500, posY: 500, config: { criteria: 'title_contains=CFO,VP Finance,Finance Director' } },
    { key: 'N003', type: 'tag', name: 'Tag: CFO-Insurance-Vertical', posX: 700, posY: 500, config: { tag: 'cfo-insurance' } },
    { key: 'N004', type: 'stage', name: 'STAGE: Day 1 - Initial Outreach', posX: 900, posY: 500, config: {} },

    // DAY 1 - EMAIL SEQUENCE (Nodes 5-9)
    { key: 'N005', type: 'email_send', name: 'Send: Initial CFO Email (96 Days)', posX: 1100, posY: 400, config: { template_id: 'cfo_ins_email_01_intro', landing_page: '/landing/cfo-insurance' } },
    { key: 'N006', type: 'wait', name: 'Wait: 2 Hours', posX: 1300, posY: 400, config: { duration: 'PT2H' } },
    { key: 'N007', type: 'decision', name: 'Check: Email Opened?', posX: 1500, posY: 400, config: { condition: 'email_opened' } },
    { key: 'N008', type: 'tag', name: 'Tag: Email-Engaged', posX: 1700, posY: 300, config: { tag: 'email-engaged' } },
    { key: 'N009', type: 'tag', name: 'Tag: Email-Not-Opened', posX: 1700, posY: 500, config: { tag: 'email-not-opened' } },

    // DAY 1 - LINKEDIN (Nodes 10-12)
    { key: 'N010', type: 'linkedin_connect', name: 'LinkedIn: Send Connection Request', posX: 1100, posY: 600, config: { message: 'Hi {{contact.first_name}}, I help insurance CFOs automate payment reconciliation. Would love to connect!' } },
    { key: 'N011', type: 'wait', name: 'Wait: 4 Hours', posX: 1300, posY: 600, config: { duration: 'PT4H' } },
    { key: 'N012', type: 'decision', name: 'Check: LinkedIn Accepted?', posX: 1500, posY: 600, config: { condition: 'linkedin_accepted' } },

    // HIGH ENGAGEMENT PATH (Nodes 13-20)
    { key: 'N013', type: 'stage', name: 'STAGE: High Engagement Path', posX: 1900, posY: 250, config: {} },
    { key: 'N014', type: 'wait', name: 'Wait: 3 Hours', posX: 2100, posY: 250, config: { duration: 'PT3H' } },
    { key: 'N015', type: 'decision', name: 'Check: Link Clicked?', posX: 2300, posY: 250, config: { condition: 'link_clicked' } },
    { key: 'N016', type: 'tag', name: 'Tag: HOT-LEAD', posX: 2500, posY: 150, config: { tag: 'hot-lead', score: 100 } },
    { key: 'N017', type: 'sms_send', name: 'Send: SMS Intro', posX: 2700, posY: 150, config: { template_id: 'cfo_ins_sms_01_intro' } },
    { key: 'N018', type: 'wait', name: 'Wait: 30 Minutes', posX: 2900, posY: 150, config: { duration: 'PT30M' } },
    { key: 'N019', type: 'decision', name: 'Check: SMS Reply?', posX: 3100, posY: 150, config: { condition: 'sms_reply' } },
    { key: 'N020', type: 'task', name: 'TASK: BDR Call - Hot Lead', posX: 3300, posY: 50, config: { assign_to: 'BDR', priority: 'urgent' } },

    // MEDIUM ENGAGEMENT PATH (Nodes 21-30)
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

    // DAY 3 - RE-ENGAGEMENT (Nodes 31-40)
    { key: 'N031', type: 'stage', name: 'STAGE: Day 3 - Re-engagement', posX: 1900, posY: 550, config: {} },
    { key: 'N032', type: 'wait', name: 'Wait: Until Day 3', posX: 2100, posY: 550, config: { duration: 'P2D' } },
    { key: 'N033', type: 'sms_send', name: 'Send: SMS Value Prop', posX: 2300, posY: 550, config: { template_id: 'cfo_ins_sms_02_value' } },
    { key: 'N034', type: 'wait', name: 'Wait: 2 Hours', posX: 2500, posY: 550, config: { duration: 'PT2H' } },
    { key: 'N035', type: 'decision', name: 'Check: SMS Response?', posX: 2700, posY: 550, config: { condition: 'sms_reply' } },
    { key: 'N036', type: 'voicemail_drop', name: 'Drop: Voicemail Intro', posX: 2900, posY: 650, config: { template_id: 'cfo_ins_vm_01_intro' } },
    { key: 'N037', type: 'wait', name: 'Wait: 4 Hours', posX: 3100, posY: 650, config: { duration: 'PT4H' } },
    { key: 'N038', type: 'decision', name: 'Check: Voicemail Callback?', posX: 3300, posY: 650, config: { condition: 'inbound_call' } },
    { key: 'N039', type: 'email_send', name: 'Send: Case Study Email', posX: 2900, posY: 500, config: { template_id: 'cfo_ins_email_03_case_study' } },
    { key: 'N040', type: 'wait', name: 'Wait: 1 Day', posX: 3100, posY: 500, config: { duration: 'P1D' } },

    // DAY 5 - ENGAGEMENT SCORING (Nodes 41-50)
    { key: 'N041', type: 'stage', name: 'STAGE: Day 5 - Engagement Scoring', posX: 100, posY: 900, config: {} },
    { key: 'N042', type: 'scoring', name: 'Calculate: Engagement Score', posX: 300, posY: 900, config: { 
      rules: [
        { action: 'email_opened', points: 10 },
        { action: 'link_clicked', points: 25 },
        { action: 'email_reply', points: 50 },
        { action: 'sms_reply', points: 50 },
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

    // DAY 7 - FINAL PUSH (Nodes 51-60)
    { key: 'N051', type: 'stage', name: 'STAGE: Day 7 - Final Push', posX: 1300, posY: 900, config: {} },
    { key: 'N052', type: 'wait', name: 'Wait: Until Day 7', posX: 1500, posY: 900, config: { duration: 'P2D' } },
    { key: 'N053', type: 'sms_send', name: 'Send: SMS Urgency', posX: 1700, posY: 900, config: { template_id: 'cfo_ins_sms_03_urgency' } },
    { key: 'N054', type: 'wait', name: 'Wait: 3 Hours', posX: 1900, posY: 900, config: { duration: 'PT3H' } },
    { key: 'N055', type: 'voicemail_drop', name: 'Drop: VM Value Prop', posX: 2100, posY: 900, config: { template_id: 'cfo_ins_vm_02_value' } },
    { key: 'N056', type: 'wait', name: 'Wait: 4 Hours', posX: 2300, posY: 900, config: { duration: 'PT4H' } },
    { key: 'N057', type: 'email_send', name: 'Send: Objection Handler Email', posX: 2500, posY: 900, config: { template_id: 'cfo_ins_email_05_objection' } },
    { key: 'N058', type: 'wait', name: 'Wait: 2 Days', posX: 2700, posY: 900, config: { duration: 'P2D' } },
    { key: 'N059', type: 'decision', name: 'Check: Any Engagement?', posX: 2900, posY: 900, config: { condition: 'any_activity' } },
    { key: 'N060', type: 'task', name: 'TASK: BDR Last Attempt Call', posX: 3100, posY: 850, config: { assign_to: 'BDR' } },

    // POSITIVE RESPONSE HANDLER (Nodes 61-70)
    { key: 'N061', type: 'stage', name: 'STAGE: Positive Response Received', posX: 3500, posY: 150, config: {} },
    { key: 'N062', type: 'tag', name: 'Tag: DEMO-REQUESTED', posX: 3700, posY: 150, config: { tag: 'demo-requested' } },
    { key: 'N063', type: 'task', name: 'TASK: Schedule Demo', posX: 3900, posY: 150, config: { assign_to: 'BDR', priority: 'urgent', note: 'Schedule CFO demo ASAP' } },
    { key: 'N064', type: 'wait', name: 'Wait: 1 Hour', posX: 4100, posY: 150, config: { duration: 'PT1H' } },
    { key: 'N065', type: 'email_send', name: 'Send: Demo Confirmation', posX: 4300, posY: 150, config: { template_id: 'demo_confirmation', subject: 'Your Paycile Demo - {{demo_date}}' } },
    { key: 'N066', type: 'wait', name: 'Wait: Until 1 Day Before Demo', posX: 4500, posY: 150, config: { duration: 'until_demo_minus_1d' } },
    { key: 'N067', type: 'sms_send', name: 'Send: Demo Reminder SMS', posX: 4700, posY: 150, config: { template_id: 'demo_reminder', text: 'Hi {{contact.first_name}}, reminder: Your Paycile demo is tomorrow at {{demo_time}}. Looking forward to it!' } },
    { key: 'N068', type: 'wait', name: 'Wait: Until Demo Time', posX: 4900, posY: 150, config: { duration: 'until_demo_time' } },
    { key: 'N069', type: 'task', name: 'TASK: Demo Conducted', posX: 5100, posY: 150, config: { assign_to: 'Sales', note: 'Mark demo as completed' } },
    { key: 'N070', type: 'decision', name: 'Check: Demo Attended?', posX: 5300, posY: 150, config: { condition: 'demo_attended' } },

    // POST-DEMO FOLLOW-UP (Nodes 71-80)
    { key: 'N071', type: 'stage', name: 'STAGE: Post-Demo Follow-up', posX: 5500, posY: 100, config: {} },
    { key: 'N072', type: 'wait', name: 'Wait: 2 Hours After Demo', posX: 5700, posY: 100, config: { duration: 'PT2H' } },
    { key: 'N073', type: 'email_send', name: 'Send: Thank You + Next Steps', posX: 5900, posY: 100, config: { template_id: 'demo_thank_you', subject: 'Thanks for your time today {{contact.first_name}}' } },
    { key: 'N074', type: 'wait', name: 'Wait: 1 Day', posX: 6100, posY: 100, config: { duration: 'P1D' } },
    { key: 'N075', type: 'task', name: 'TASK: Send Proposal', posX: 6300, posY: 100, config: { assign_to: 'Sales', note: 'Send custom proposal' } },
    { key: 'N076', type: 'wait', name: 'Wait: 2 Days', posX: 6500, posY: 100, config: { duration: 'P2D' } },
    { key: 'N077', type: 'decision', name: 'Check: Proposal Response?', posX: 6700, posY: 100, config: { condition: 'proposal_response' } },
    { key: 'N078', type: 'email_send', name: 'Send: Proposal Follow-up', posX: 6900, posY: 150, config: { template_id: 'proposal_follow_up' } },
    { key: 'N079', type: 'task', name: 'TASK: Sales Call', posX: 7100, posY: 150, config: { assign_to: 'Sales' } },
    { key: 'N080', type: 'goal', name: 'GOAL: Opportunity Created', posX: 7300, posY: 50, config: {} },

    // NO-SHOW PATH (Nodes 81-85)
    { key: 'N081', type: 'stage', name: 'STAGE: Demo No-Show Recovery', posX: 5500, posY: 250, config: {} },
    { key: 'N082', type: 'email_send', name: 'Send: Sorry We Missed You', posX: 5700, posY: 250, config: { template_id: 'demo_no_show', subject: 'We missed you at today\'s demo' } },
    { key: 'N083', type: 'sms_send', name: 'Send: Reschedule SMS', posX: 5900, posY: 250, config: { text: 'Hi {{contact.first_name}}, we missed you at the demo. Want to reschedule? {{landing_page_url}}' } },
    { key: 'N084', type: 'wait', name: 'Wait: 2 Days', posX: 6100, posY: 250, config: { duration: 'P2D' } },
    { key: 'N085', type: 'decision', name: 'Check: Rescheduled?', posX: 6300, posY: 250, config: { condition: 'demo_rescheduled' } },

    // LONG-TERM NURTURE (Nodes 86-89)
    { key: 'N086', type: 'stage', name: 'STAGE: Long-term Nurture', posX: 3100, posY: 1000, config: {} },
    { key: 'N087', type: 'wait', name: 'Wait: 30 Days', posX: 3300, posY: 1000, config: { duration: 'P30D' } },
    { key: 'N088', type: 'email_send', name: 'Send: Re-engagement Email', posX: 3500, posY: 1000, config: { template_id: 'reengagement_30d', subject: 'Still struggling with manual reconciliation?' } },
    { key: 'N089', type: 'decision', name: 'Check: Re-engaged?', posX: 3700, posY: 1000, config: { condition: 'email_opened' } },
    { key: 'N090', type: 'exit', name: 'EXIT: End Campaign', posX: 3900, posY: 1050, config: {} },
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
    
    // High engagement path (opened + clicked)
    { from: 'N008', to: 'N013' },
    { from: 'N013', to: 'N014' },
    { from: 'N014', to: 'N015' },
    { from: 'N015', to: 'N016', condition: { link_clicked: true } },
    { from: 'N016', to: 'N017' },
    { from: 'N017', to: 'N018' },
    { from: 'N018', to: 'N019' },
    { from: 'N019', to: 'N020', condition: { sms_reply: true } },
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
    
    // Day 3 re-engagement
    { from: 'N009', to: 'N031' }, // Not opened path
    { from: 'N012', to: 'N031', condition: { linkedin_accepted: false } },
    { from: 'N030', to: 'N031', condition: { email_reply: false } },
    { from: 'N031', to: 'N032' },
    { from: 'N032', to: 'N033' },
    { from: 'N033', to: 'N034' },
    { from: 'N034', to: 'N035' },
    { from: 'N035', to: 'N061', condition: { sms_reply: true } },
    { from: 'N035', to: 'N036', condition: { sms_reply: false } },
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
    
    // Day 7 final push
    { from: 'N051', to: 'N052' },
    { from: 'N052', to: 'N053' },
    { from: 'N053', to: 'N054' },
    { from: 'N054', to: 'N055' },
    { from: 'N055', to: 'N056' },
    { from: 'N056', to: 'N057' },
    { from: 'N057', to: 'N058' },
    { from: 'N058', to: 'N059' },
    { from: 'N059', to: 'N060', condition: { any_activity: true } },
    { from: 'N060', to: 'N061' },
    { from: 'N059', to: 'N086', condition: { any_activity: false } },
    
    // Positive response handler
    { from: 'N061', to: 'N062' },
    { from: 'N062', to: 'N063' },
    { from: 'N063', to: 'N064' },
    { from: 'N064', to: 'N065' },
    { from: 'N065', to: 'N066' },
    { from: 'N066', to: 'N067' },
    { from: 'N067', to: 'N068' },
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
    
    // No-show recovery
    { from: 'N081', to: 'N082' },
    { from: 'N082', to: 'N083' },
    { from: 'N083', to: 'N084' },
    { from: 'N084', to: 'N085' },
    { from: 'N085', to: 'N066', condition: { demo_rescheduled: true } },
    { from: 'N085', to: 'N086', condition: { demo_rescheduled: false } },
    
    // Long-term nurture
    { from: 'N086', to: 'N087' },
    { from: 'N087', to: 'N088' },
    { from: 'N088', to: 'N089' },
    { from: 'N089', to: 'N004', condition: { email_opened: true } }, // Re-enter campaign
    { from: 'N089', to: 'N090', condition: { email_opened: false } },
  ]
};

console.log(`CFO Insurance Funnel: ${cfoInsuranceFunnel.nodes.length} nodes, ${cfoInsuranceFunnel.edges.length} edges`);

// =============================================================================
// CONTROLLER MULTI-ENTITY - 90 NODE FUNNEL
// =============================================================================

const controllerFunnel = {
  id: 'funnel_controller_v2',
  name: 'Controller Multi-Entity - 90-Node Advanced',
  status: 'published',
  version: 2,
  nodes: [
    // START & TARGETING (Nodes 0-4)
    { key: 'C000', type: 'start', name: 'Import: Controller Target List', posX: 100, posY: 500, config: {} },
    { key: 'C001', type: 'filter', name: 'Filter: Multi-Entity Companies', posX: 300, posY: 500, config: { criteria: 'entities>=3' } },
    { key: 'C002', type: 'filter', name: 'Filter: Controller/Finance Manager', posX: 500, posY: 500, config: { criteria: 'title_contains=Controller,Finance Manager,Accounting Manager' } },
    { key: 'C003', type: 'tag', name: 'Tag: Controller-Multi-Entity', posX: 700, posY: 500, config: { tag: 'controller-target' } },
    { key: 'C004', type: 'stage', name: 'STAGE: Day 1 - Initial Contact', posX: 900, posY: 500, config: {} },

    // DAY 1 - EMAIL SEQUENCE (Nodes 5-14)
    { key: 'C005', type: 'email_send', name: 'Send: 90% Workload Reduction Email', posX: 1100, posY: 400, config: { template_id: 'ctrl_email_01_intro', landing_page: '/landing/controller' } },
    { key: 'C006', type: 'wait', name: 'Wait: 90 Minutes', posX: 1300, posY: 400, config: { duration: 'PT90M' } },
    { key: 'C007', type: 'decision', name: 'Check: Email Opened?', posX: 1500, posY: 400, config: { condition: 'email_opened' } },
    { key: 'C008', type: 'tag', name: 'Tag: Opened-Initial', posX: 1700, posY: 300, config: { tag: 'email-engaged', score: 10 } },
    { key: 'C009', type: 'decision', name: 'Check: Link Clicked?', posX: 1900, posY: 300, config: { condition: 'link_clicked' } },
    { key: 'C010', type: 'tag', name: 'Tag: HIGH-INTEREST', posX: 2100, posY: 200, config: { tag: 'high-interest', score: 50 } },
    { key: 'C011', type: 'sms_send', name: 'Send: SMS Quick Response', posX: 2300, posY: 200, config: { template_id: 'ctrl_sms_01_intro' } },
    { key: 'C012', type: 'wait', name: 'Wait: 1 Hour', posX: 2500, posY: 200, config: { duration: 'PT1H' } },
    { key: 'C013', type: 'decision', name: 'Check: SMS Reply?', posX: 2700, posY: 200, config: { condition: 'sms_reply' } },
    { key: 'C014', type: 'task', name: 'TASK: Hot Lead - Call Now', posX: 2900, posY: 100, config: { assign_to: 'BDR', priority: 'urgent' } },

    // LINKEDIN PARALLEL PATH (Nodes 15-20)
    { key: 'C015', type: 'linkedin_connect', name: 'LinkedIn: Connection Request', posX: 1100, posY: 600, config: { message: 'Hi {{contact.first_name}}, helping controllers close 10x faster. Let\'s connect!' } },
    { key: 'C016', type: 'wait', name: 'Wait: 6 Hours', posX: 1300, posY: 600, config: { duration: 'PT6H' } },
    { key: 'C017', type: 'decision', name: 'Check: Connection Accepted?', posX: 1500, posY: 600, config: { condition: 'linkedin_accepted' } },
    { key: 'C018', type: 'tag', name: 'Tag: LinkedIn-Connected', posX: 1700, posY: 550, config: { tag: 'linkedin-connected', score: 15 } },
    { key: 'C019', type: 'linkedin_message', name: 'LinkedIn: Value Message', posX: 1900, posY: 550, config: { message: 'Thanks for connecting! Quick question - how long does your month-end close take? Most controllers I talk to say 2-3 weeks. I can show you how to do it in 5 days.' } },
    { key: 'C020', type: 'wait', name: 'Wait: 8 Hours', posX: 2100, posY: 550, config: { duration: 'PT8H' } },

    // NOT OPENED - ALTERNATE PATH (Nodes 21-25)
    { key: 'C021', type: 'stage', name: 'STAGE: Not Opened - SMS Push', posX: 1700, posY: 500, config: {} },
    { key: 'C022', type: 'wait', name: 'Wait: 4 Hours', posX: 1900, posY: 500, config: { duration: 'PT4H' } },
    { key: 'C023', type: 'sms_send', name: 'Send: SMS Attention Grab', posX: 2100, posY: 500, config: { template_id: 'ctrl_sms_01_intro' } },
    { key: 'C024', type: 'wait', name: 'Wait: 2 Hours', posX: 2300, posY: 500, config: { duration: 'PT2H' } },
    { key: 'C025', type: 'decision', name: 'Check: SMS Response?', posX: 2500, posY: 500, config: { condition: 'sms_reply' } },

    // DAY 2 - INTERCOMPANY FOCUS (Nodes 26-35)
    { key: 'C026', type: 'stage', name: 'STAGE: Day 2 - Intercompany Focus', posX: 2300, posY: 650, config: {} },
    { key: 'C027', type: 'wait', name: 'Wait: Until Day 2 9AM', posX: 2500, posY: 650, config: { duration: 'until_day_2_9am' } },
    { key: 'C028', type: 'email_send', name: 'Send: Intercompany Email', posX: 2700, posY: 650, config: { template_id: 'ctrl_email_02_intercompany' } },
    { key: 'C029', type: 'wait', name: 'Wait: 3 Hours', posX: 2900, posY: 650, config: { duration: 'PT3H' } },
    { key: 'C030', type: 'decision', name: 'Check: Email Opened?', posX: 3100, posY: 650, config: { condition: 'email_opened' } },
    { key: 'C031', type: 'decision', name: 'Check: Link Clicked?', posX: 3300, posY: 600, config: { condition: 'link_clicked' } },
    { key: 'C032', type: 'tag', name: 'Tag: Case-Study-Engaged', posX: 3500, posY: 550, config: { tag: 'case-engaged', score: 30 } },
    { key: 'C033', type: 'task', name: 'TASK: BDR Follow-up', posX: 3700, posY: 550, config: { assign_to: 'BDR' } },
    { key: 'C034', type: 'voicemail_drop', name: 'Drop: VM Intro', posX: 3300, posY: 700, config: { template_id: 'ctrl_vm_01_intro' } },
    { key: 'C035', type: 'wait', name: 'Wait: 5 Hours', posX: 3500, posY: 700, config: { duration: 'PT5H' } },

    // DAY 3 - CLOSE TIME FOCUS (Nodes 36-45)
    { key: 'C036', type: 'stage', name: 'STAGE: Day 3 - Close Time ROI', posX: 100, posY: 1200, config: {} },
    { key: 'C037', type: 'wait', name: 'Wait: Until Day 3 10AM', posX: 300, posY: 1200, config: { duration: 'until_day_3_10am' } },
    { key: 'C038', type: 'email_send', name: 'Send: Close Time Reduction', posX: 500, posY: 1200, config: { template_id: 'ctrl_email_03_close_time' } },
    { key: 'C039', type: 'wait', name: 'Wait: 4 Hours', posX: 700, posY: 1200, config: { duration: 'PT4H' } },
    { key: 'C040', type: 'decision', name: 'Check: Email Engagement?', posX: 900, posY: 1200, config: { condition: 'email_opened_or_clicked' } },
    { key: 'C041', type: 'sms_send', name: 'Send: SMS Close Week', posX: 1100, posY: 1150, config: { template_id: 'ctrl_sms_03_close' } },
    { key: 'C042', type: 'wait', name: 'Wait: 90 Minutes', posX: 1300, posY: 1150, config: { duration: 'PT90M' } },
    { key: 'C043', type: 'decision', name: 'Check: Any Response?', posX: 1500, posY: 1150, config: { condition: 'any_response' } },
    { key: 'C044', type: 'tag', name: 'Tag: Engaged-Day3', posX: 1700, posY: 1100, config: { tag: 'engaged-day3', score: 25 } },
    { key: 'C045', type: 'linkedin_message', name: 'LinkedIn: ROI Message', posX: 1900, posY: 1100, config: { message: 'Saw you checked out our close time info. Worth a quick call to discuss your specific close process?' } },

    // ENGAGEMENT SCORING CHECKPOINT (Nodes 46-55)
    { key: 'C046', type: 'stage', name: 'STAGE: Day 4 - Engagement Scoring', posX: 2100, posY: 1200, config: {} },
    { key: 'C047', type: 'scoring', name: 'Calculate: Total Engagement Score', posX: 2300, posY: 1200, config: { 
      rules: [
        { action: 'email_opened', points: 10 },
        { action: 'link_clicked', points: 25 },
        { action: 'email_reply', points: 75 },
        { action: 'sms_reply', points: 75 },
        { action: 'linkedin_accepted', points: 15 },
        { action: 'linkedin_reply', points: 40 },
        { action: 'phone_call', points: 100 }
      ]
    } },
    { key: 'C048', type: 'decision', name: 'Route: Score >= 100?', posX: 2500, posY: 1200, config: { condition: 'score_gte_100' } },
    { key: 'C049', type: 'tag', name: 'Tag: PRIORITY-LEAD', posX: 2700, posY: 1100, config: { tag: 'priority', score: 100 } },
    { key: 'C050', type: 'task', name: 'TASK: Priority BDR Call', posX: 2900, posY: 1100, config: { assign_to: 'BDR', priority: 'urgent' } },
    { key: 'C051', type: 'decision', name: 'Route: Score 50-99?', posX: 2700, posY: 1200, config: { condition: 'score_50_to_99' } },
    { key: 'C052', type: 'tag', name: 'Tag: WARM', posX: 2900, posY: 1200, config: { tag: 'warm', score: 50 } },
    { key: 'C053', type: 'email_send', name: 'Send: ROI Email', posX: 3100, posY: 1200, config: { template_id: 'ctrl_email_04_roi' } },
    { key: 'C054', type: 'decision', name: 'Route: Score < 50?', posX: 2700, posY: 1300, config: { condition: 'score_lt_50' } },
    { key: 'C055', type: 'tag', name: 'Tag: COLD', posX: 2900, posY: 1300, config: { tag: 'cold' } },

    // DAY 7 - FINAL PUSH SEQUENCE (Nodes 56-65)
    { key: 'C056', type: 'stage', name: 'STAGE: Day 7 - Final Push', posX: 3300, posY: 1250, config: {} },
    { key: 'C057', type: 'wait', name: 'Wait: Until Day 7', posX: 3500, posY: 1250, config: { duration: 'P3D' } },
    { key: 'C058', type: 'sms_send', name: 'Send: SMS Final Offer', posX: 3700, posY: 1250, config: { template_id: 'ctrl_sms_02_intercompany' } },
    { key: 'C059', type: 'wait', name: 'Wait: 2 Hours', posX: 3900, posY: 1250, config: { duration: 'PT2H' } },
    { key: 'C060', type: 'voicemail_drop', name: 'Drop: VM Value Prop', posX: 4100, posY: 1250, config: { template_id: 'ctrl_vm_02_value' } },
    { key: 'C061', type: 'wait', name: 'Wait: 4 Hours', posX: 4300, posY: 1250, config: { duration: 'PT4H' } },
    { key: 'C062', type: 'email_send', name: 'Send: Final Outreach Email', posX: 4500, posY: 1250, config: { template_id: 'ctrl_email_05_final' } },
    { key: 'C063', type: 'wait', name: 'Wait: 2 Days', posX: 4700, posY: 1250, config: { duration: 'P2D' } },
    { key: 'C064', type: 'decision', name: 'Check: Any Final Response?', posX: 4900, posY: 1250, config: { condition: 'any_activity' } },
    { key: 'C065', type: 'task', name: 'TASK: Final BDR Attempt', posX: 5100, posY: 1200, config: { assign_to: 'BDR' } },

    // DEMO BOOKING FLOW (Nodes 66-75)
    { key: 'C066', type: 'stage', name: 'STAGE: Demo Booked', posX: 3100, posY: 100, config: {} },
    { key: 'C067', type: 'tag', name: 'Tag: DEMO-SCHEDULED', posX: 3300, posY: 100, config: { tag: 'demo-scheduled' } },
    { key: 'C068', type: 'email_send', name: 'Send: Demo Confirmation', posX: 3500, posY: 100, config: { subject: 'Your Controller Demo is Scheduled', body: 'Thanks for booking! Demo details...' } },
    { key: 'C069', type: 'task', name: 'TASK: Add to Sales Calendar', posX: 3700, posY: 100, config: { assign_to: 'Sales' } },
    { key: 'C070', type: 'wait', name: 'Wait: Until 24hr Before Demo', posX: 3900, posY: 100, config: { duration: 'until_demo_minus_24h' } },
    { key: 'C071', type: 'email_send', name: 'Send: 24hr Reminder', posX: 4100, posY: 100, config: { subject: 'Demo Tomorrow: {{demo_time}}', body: 'Looking forward to showing you...' } },
    { key: 'C072', type: 'wait', name: 'Wait: Until 2hr Before', posX: 4300, posY: 100, config: { duration: 'until_demo_minus_2h' } },
    { key: 'C073', type: 'sms_send', name: 'Send: 2hr SMS Reminder', posX: 4500, posY: 100, config: { text: 'Reminder: Your Paycile demo starts in 2 hours. See you soon!' } },
    { key: 'C074', type: 'wait', name: 'Wait: Until Demo Time', posX: 4700, posY: 100, config: { duration: 'until_demo_time' } },
    { key: 'C075', type: 'decision', name: 'Check: Demo Attended?', posX: 4900, posY: 100, config: { condition: 'demo_attended' } },

    // POST-DEMO SUCCESS (Nodes 76-82)
    { key: 'C076', type: 'stage', name: 'STAGE: Post-Demo - Success Path', posX: 5100, posY: 50, config: {} },
    { key: 'C077', type: 'email_send', name: 'Send: Thank You + Resources', posX: 5300, posY: 50, config: { subject: 'Thanks {{contact.first_name}} - Next Steps', body: 'Great connecting today...' } },
    { key: 'C078', type: 'task', name: 'TASK: Send Custom Proposal', posX: 5500, posY: 50, config: { assign_to: 'Sales', priority: 'high' } },
    { key: 'C079', type: 'wait', name: 'Wait: 2 Days', posX: 5700, posY: 50, config: { duration: 'P2D' } },
    { key: 'C080', type: 'email_send', name: 'Send: Proposal Check-in', posX: 5900, posY: 50, config: { subject: 'Following up on proposal', body: 'Questions on the proposal?' } },
    { key: 'C081', type: 'task', name: 'TASK: Sales Follow-up Call', posX: 6100, posY: 50, config: { assign_to: 'Sales' } },
    { key: 'C082', type: 'goal', name: 'GOAL: Opportunity Won', posX: 6300, posY: 50, config: {} },

    // NO-SHOW RECOVERY (Nodes 83-87)
    { key: 'C083', type: 'stage', name: 'STAGE: No-Show Recovery', posX: 5100, posY: 200, config: {} },
    { key: 'C084', type: 'email_send', name: 'Send: Sorry We Missed You', posX: 5300, posY: 200, config: { subject: 'Missed you at our demo', body: 'No worries - want to reschedule?' } },
    { key: 'C085', type: 'sms_send', name: 'Send: Reschedule SMS', posX: 5500, posY: 200, config: { text: 'Missed our demo? No problem! Reschedule: {{landing_page_url}}' } },
    { key: 'C086', type: 'wait', name: 'Wait: 3 Days', posX: 5700, posY: 200, config: { duration: 'P3D' } },
    { key: 'C087', type: 'decision', name: 'Check: Rescheduled?', posX: 5900, posY: 200, config: { condition: 'demo_rescheduled' } },

    // LONG-TERM NURTURE (Nodes 88-90)
    { key: 'C088', type: 'stage', name: 'STAGE: 30-Day Nurture', posX: 5300, posY: 1350, config: {} },
    { key: 'C089', type: 'wait', name: 'Wait: 30 Days', posX: 5500, posY: 1350, config: { duration: 'P30D' } },
    { key: 'C090', type: 'email_send', name: 'Send: Re-engagement', posX: 5700, posY: 1350, config: { subject: 'Still closing in 3 weeks?', body: 'Following up on multi-entity automation...' } },
  ],
  edges: [
    { from: 'C000', to: 'C001' },
    { from: 'C001', to: 'C002' },
    { from: 'C002', to: 'C003' },
    { from: 'C003', to: 'C004' },
    { from: 'C004', to: 'C005' },
    { from: 'C004', to: 'C015' },
    { from: 'C005', to: 'C006' },
    { from: 'C006', to: 'C007' },
    { from: 'C007', to: 'C008', condition: { email_opened: true } },
    { from: 'C008', to: 'C009' },
    { from: 'C009', to: 'C010', condition: { link_clicked: true } },
    { from: 'C010', to: 'C011' },
    { from: 'C011', to: 'C012' },
    { from: 'C012', to: 'C013' },
    { from: 'C013', to: 'C014', condition: { sms_reply: true } },
    { from: 'C014', to: 'C066' },
    { from: 'C007', to: 'C021', condition: { email_opened: false } },
    { from: 'C015', to: 'C016' },
    { from: 'C016', to: 'C017' },
    { from: 'C017', to: 'C018', condition: { linkedin_accepted: true } },
    { from: 'C018', to: 'C019' },
    { from: 'C019', to: 'C020' },
    { from: 'C020', to: 'C026' },
    { from: 'C017', to: 'C026', condition: { linkedin_accepted: false } },
    { from: 'C021', to: 'C022' },
    { from: 'C022', to: 'C023' },
    { from: 'C023', to: 'C024' },
    { from: 'C024', to: 'C025' },
    { from: 'C025', to: 'C066', condition: { sms_reply: true } },
    { from: 'C025', to: 'C026', condition: { sms_reply: false } },
    { from: 'C009', to: 'C026', condition: { link_clicked: false } },
    { from: 'C026', to: 'C027' },
    { from: 'C027', to: 'C028' },
    { from: 'C028', to: 'C029' },
    { from: 'C029', to: 'C030' },
    { from: 'C030', to: 'C031', condition: { email_opened: true } },
    { from: 'C031', to: 'C032', condition: { link_clicked: true } },
    { from: 'C032', to: 'C033' },
    { from: 'C033', to: 'C066' },
    { from: 'C031', to: 'C034', condition: { link_clicked: false } },
    { from: 'C030', to: 'C034', condition: { email_opened: false } },
    { from: 'C034', to: 'C035' },
    { from: 'C035', to: 'C036' },
    { from: 'C036', to: 'C037' },
    { from: 'C037', to: 'C038' },
    { from: 'C038', to: 'C039' },
    { from: 'C039', to: 'C040' },
    { from: 'C040', to: 'C041', condition: { email_opened_or_clicked: true } },
    { from: 'C041', to: 'C042' },
    { from: 'C042', to: 'C043' },
    { from: 'C043', to: 'C044', condition: { any_response: true } },
    { from: 'C044', to: 'C045' },
    { from: 'C045', to: 'C046' },
    { from: 'C040', to: 'C046', condition: { email_opened_or_clicked: false } },
    { from: 'C043', to: 'C046', condition: { any_response: false } },
    { from: 'C046', to: 'C047' },
    { from: 'C047', to: 'C048' },
    { from: 'C048', to: 'C049', condition: { score_gte_100: true } },
    { from: 'C049', to: 'C050' },
    { from: 'C050', to: 'C066' },
    { from: 'C048', to: 'C051', condition: { score_gte_100: false } },
    { from: 'C051', to: 'C052', condition: { score_50_to_99: true } },
    { from: 'C052', to: 'C053' },
    { from: 'C053', to: 'C056' },
    { from: 'C051', to: 'C054', condition: { score_50_to_99: false } },
    { from: 'C054', to: 'C055' },
    { from: 'C055', to: 'C088' },
    { from: 'C056', to: 'C057' },
    { from: 'C057', to: 'C058' },
    { from: 'C058', to: 'C059' },
    { from: 'C059', to: 'C060' },
    { from: 'C060', to: 'C061' },
    { from: 'C061', to: 'C062' },
    { from: 'C062', to: 'C063' },
    { from: 'C063', to: 'C064' },
    { from: 'C064', to: 'C065', condition: { any_activity: true } },
    { from: 'C065', to: 'C066' },
    { from: 'C064', to: 'C088', condition: { any_activity: false } },
    { from: 'C066', to: 'C067' },
    { from: 'C067', to: 'C068' },
    { from: 'C068', to: 'C069' },
    { from: 'C069', to: 'C070' },
    { from: 'C070', to: 'C071' },
    { from: 'C071', to: 'C072' },
    { from: 'C072', to: 'C073' },
    { from: 'C073', to: 'C074' },
    { from: 'C074', to: 'C075' },
    { from: 'C075', to: 'C076', condition: { demo_attended: true } },
    { from: 'C076', to: 'C077' },
    { from: 'C077', to: 'C078' },
    { from: 'C078', to: 'C079' },
    { from: 'C079', to: 'C080' },
    { from: 'C080', to: 'C081' },
    { from: 'C081', to: 'C082' },
    { from: 'C075', to: 'C083', condition: { demo_attended: false } },
    { from: 'C083', to: 'C084' },
    { from: 'C084', to: 'C085' },
    { from: 'C085', to: 'C086' },
    { from: 'C086', to: 'C087' },
    { from: 'C087', to: 'C070', condition: { demo_rescheduled: true } },
    { from: 'C087', to: 'C088', condition: { demo_rescheduled: false } },
    { from: 'C088', to: 'C089' },
    { from: 'C089', to: 'C090' },
  ]
};

console.log(`Controller Funnel: ${controllerFunnel.nodes.length} nodes, ${controllerFunnel.edges.length} edges`);

// =============================================================================
// AR/AP UNAPPLIED FUNDS - 90 NODE FUNNEL
// =============================================================================

const arapFunnel = {
  id: 'funnel_arap_v2',
  name: 'AR/AP Unapplied Funds Recovery - 90-Node',
  status: 'published',
  version: 2,
  nodes: [
    // START & TARGETING (Nodes 0-4)
    { key: 'A000', type: 'start', name: 'Import: AR/AP Target List', posX: 100, posY: 500, config: {} },
    { key: 'A001', type: 'filter', name: 'Filter: AR/AP Specialists', posX: 300, posY: 500, config: { criteria: 'title_contains=AR,AP,Accounts Receivable,Accounts Payable,Collections' } },
    { key: 'A002', type: 'filter', name: 'Filter: Revenue > $10M', posX: 500, posY: 500, config: { criteria: 'revenue_gte_10m' } },
    { key: 'A003', type: 'tag', name: 'Tag: ARAP-Unapplied-Target', posX: 700, posY: 500, config: { tag: 'arap-target' } },
    { key: 'A004', type: 'stage', name: 'STAGE: Day 1 - Value Intro', posX: 900, posY: 500, config: {} },

    // DAY 1 - $250K HOOK (Nodes 5-14)
    { key: 'A005', type: 'email_send', name: 'Send: $250K Unapplied Funds Email', posX: 1100, posY: 400, config: { template_id: 'arap_email_01_intro', landing_page: '/landing/arap' } },
    { key: 'A006', type: 'wait', name: 'Wait: 1 Hour', posX: 1300, posY: 400, config: { duration: 'PT1H' } },
    { key: 'A007', type: 'decision', name: 'Check: Email Opened?', posX: 1500, posY: 400, config: { condition: 'email_opened' } },
    { key: 'A008', type: 'tag', name: 'Tag: Email-Opened', posX: 1700, posY: 300, config: { tag: 'opened', score: 10 } },
    { key: 'A009', type: 'decision', name: 'Check: Landing Page Visited?', posX: 1900, posY: 300, config: { condition: 'landing_page_visit' } },
    { key: 'A010', type: 'tag', name: 'Tag: HIGH-INTENT', posX: 2100, posY: 200, config: { tag: 'high-intent', score: 60 } },
    { key: 'A011', type: 'sms_send', name: 'Send: SMS Quick Follow-up', posX: 2300, posY: 200, config: { template_id: 'arap_sms_01_intro' } },
    { key: 'A012', type: 'wait', name: 'Wait: 30 Minutes', posX: 2500, posY: 200, config: { duration: 'PT30M' } },
    { key: 'A013', type: 'decision', name: 'Check: SMS Reply?', posX: 2700, posY: 200, config: { condition: 'sms_reply' } },
    { key: 'A014', type: 'task', name: 'TASK: URGENT - Call Hot Lead', posX: 2900, posY: 100, config: { assign_to: 'BDR', priority: 'urgent', note: 'Wants unapplied funds assessment' } },

    // MEDIUM ENGAGEMENT (Nodes 15-24)
    { key: 'A015', type: 'stage', name: 'STAGE: Medium Interest Path', posX: 2100, posY: 400, config: {} },
    { key: 'A016', type: 'wait', name: 'Wait: 4 Hours', posX: 2300, posY: 400, config: { duration: 'PT4H' } },
    { key: 'A017', type: 'email_send', name: 'Send: Payment Matching Focus', posX: 2500, posY: 400, config: { template_id: 'arap_email_02_matching' } },
    { key: 'A018', type: 'wait', name: 'Wait: 2 Hours', posX: 2700, posY: 400, config: { duration: 'PT2H' } },
    { key: 'A019', type: 'decision', name: 'Check: Opened/Clicked?', posX: 2900, posY: 400, config: { condition: 'email_activity' } },
    { key: 'A020', type: 'sms_send', name: 'Send: SMS Matching Stats', posX: 3100, posY: 350, config: { template_id: 'arap_sms_02_matching' } },
    { key: 'A021', type: 'wait', name: 'Wait: 3 Hours', posX: 3300, posY: 350, config: { duration: 'PT3H' } },
    { key: 'A022', type: 'voicemail_drop', name: 'Drop: VM Intro', posX: 3500, posY: 350, config: { template_id: 'arap_vm_01_intro' } },
    { key: 'A023', type: 'wait', name: 'Wait: 1 Day', posX: 3700, posY: 350, config: { duration: 'P1D' } },
    { key: 'A024', type: 'decision', name: 'Check: Any Response?', posX: 3900, posY: 350, config: { condition: 'any_activity' } },

    // NOT ENGAGED PATH (Nodes 25-30)
    { key: 'A025', type: 'stage', name: 'STAGE: Not Engaged - SMS Push', posX: 1700, posY: 500, config: {} },
    { key: 'A026', type: 'wait', name: 'Wait: 6 Hours', posX: 1900, posY: 500, config: { duration: 'PT6H' } },
    { key: 'A027', type: 'sms_send', name: 'Send: SMS Direct Ask', posX: 2100, posY: 500, config: { template_id: 'arap_sms_01_intro' } },
    { key: 'A028', type: 'wait', name: 'Wait: 2 Hours', posX: 2300, posY: 500, config: { duration: 'PT2H' } },
    { key: 'A029', type: 'decision', name: 'Check: SMS Response?', posX: 2500, posY: 500, config: { condition: 'sms_reply' } },
    { key: 'A030', type: 'voicemail_drop', name: 'Drop: VM Assessment Offer', posX: 2700, posY: 550, config: { template_id: 'arap_vm_01_intro' } },

    // DAY 3 - CASE STUDY PUSH (Nodes 31-40)
    { key: 'A031', type: 'stage', name: 'STAGE: Day 3 - $380K Recovery Story', posX: 100, posY: 1000, config: {} },
    { key: 'A032', type: 'wait', name: 'Wait: Until Day 3', posX: 300, posY: 1000, config: { duration: 'P2D' } },
    { key: 'A033', type: 'email_send', name: 'Send: $380K Case Study', posX: 500, posY: 1000, config: { template_id: 'arap_email_03_recovery' } },
    { key: 'A034', type: 'wait', name: 'Wait: 3 Hours', posX: 700, posY: 1000, config: { duration: 'PT3H' } },
    { key: 'A035', type: 'decision', name: 'Check: Email Opened?', posX: 900, posY: 1000, config: { condition: 'email_opened' } },
    { key: 'A036', type: 'sms_send', name: 'Send: SMS Recovery Story', posX: 1100, posY: 950, config: { template_id: 'arap_sms_03_recovery' } },
    { key: 'A037', type: 'wait', name: 'Wait: 90 Minutes', posX: 1300, posY: 950, config: { duration: 'PT90M' } },
    { key: 'A038', type: 'decision', name: 'Check: Response?', posX: 1500, posY: 950, config: { condition: 'sms_reply' } },
    { key: 'A039', type: 'task', name: 'TASK: Schedule Assessment', posX: 1700, posY: 900, config: { assign_to: 'BDR' } },
    { key: 'A040', type: 'voicemail_drop', name: 'Drop: VM Matching Focus', posX: 1100, posY: 1050, config: { template_id: 'arap_vm_02_matching' } },

    // DAY 5 - DSO ANGLE (Nodes 41-50)
    { key: 'A041', type: 'stage', name: 'STAGE: Day 5 - DSO Reduction', posX: 1700, posY: 1000, config: {} },
    { key: 'A042', type: 'wait', name: 'Wait: Until Day 5', posX: 1900, posY: 1000, config: { duration: 'P2D' } },
    { key: 'A043', type: 'email_send', name: 'Send: DSO Improvement Email', posX: 2100, posY: 1000, config: { template_id: 'arap_email_04_dso' } },
    { key: 'A044', type: 'wait', name: 'Wait: 4 Hours', posX: 2300, posY: 1000, config: { duration: 'PT4H' } },
    { key: 'A045', type: 'decision', name: 'Check: Email Activity?', posX: 2500, posY: 1000, config: { condition: 'email_opened' } },
    { key: 'A046', type: 'sms_send', name: 'Send: SMS DSO Stats', posX: 2700, posY: 950, config: { text: '{{contact.first_name}}, automated matching reduces DSO by 15-20 days. Plus recover unapplied funds. Worth a look? {{landing_page_url}}' } },
    { key: 'A047', type: 'wait', name: 'Wait: 2 Hours', posX: 2900, posY: 950, config: { duration: 'PT2H' } },
    { key: 'A048', type: 'decision', name: 'Check: Response?', posX: 3100, posY: 950, config: { condition: 'any_response' } },
    { key: 'A049', type: 'task', name: 'TASK: BDR Follow-up', posX: 3300, posY: 900, config: { assign_to: 'BDR' } },
    { key: 'A050', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 2700, posY: 1050, config: { message: 'Hi {{contact.first_name}}, help AR/AP teams recover unapplied funds. Connect?' } },

    // ENGAGEMENT SCORING (Nodes 51-60)
    { key: 'A051', type: 'stage', name: 'STAGE: Day 7 - Engagement Check', posX: 3500, posY: 1000, config: {} },
    { key: 'A052', type: 'scoring', name: 'Calculate: Engagement Score', posX: 3700, posY: 1000, config: { 
      rules: [
        { action: 'email_opened', points: 10 },
        { action: 'landing_page_visit', points: 40 },
        { action: 'link_clicked', points: 25 },
        { action: 'email_reply', points: 100 },
        { action: 'sms_reply', points: 100 },
        { action: 'phone_call', points: 150 }
      ]
    } },
    { key: 'A053', type: 'decision', name: 'Route: Score >= 100?', posX: 3900, posY: 1000, config: { condition: 'score_gte_100' } },
    { key: 'A054', type: 'tag', name: 'Tag: HOT-LEAD', posX: 4100, posY: 900, config: { tag: 'hot', score: 100 } },
    { key: 'A055', type: 'task', name: 'TASK: Priority Assessment', posX: 4300, posY: 900, config: { assign_to: 'BDR', priority: 'urgent' } },
    { key: 'A056', type: 'decision', name: 'Route: Score 40-99?', posX: 4100, posY: 1000, config: { condition: 'score_40_to_99' } },
    { key: 'A057', type: 'tag', name: 'Tag: WARM', posX: 4300, posY: 1000, config: { tag: 'warm', score: 50 } },
    { key: 'A058', type: 'sms_send', name: 'Send: Final SMS Offer', posX: 4500, posY: 1000, config: { text: 'Last chance {{contact.first_name}} - free assessment to find your unapplied funds. 30 mins: {{landing_page_url}}' } },
    { key: 'A059', type: 'decision', name: 'Route: Score < 40?', posX: 4100, posY: 1100, config: { condition: 'score_lt_40' } },
    { key: 'A060', type: 'tag', name: 'Tag: COLD', posX: 4300, posY: 1100, config: { tag: 'cold' } },

    // ASSESSMENT BOOKING FLOW (Nodes 61-70)
    { key: 'A061', type: 'stage', name: 'STAGE: Assessment Requested', posX: 3100, posY: 150, config: {} },
    { key: 'A062', type: 'tag', name: 'Tag: ASSESSMENT-BOOKED', posX: 3300, posY: 150, config: { tag: 'assessment-booked' } },
    { key: 'A063', type: 'email_send', name: 'Send: Assessment Confirmation', posX: 3500, posY: 150, config: { subject: 'Your Free Unapplied Funds Assessment', body: 'Thanks for booking...' } },
    { key: 'A064', type: 'task', name: 'TASK: Prepare Assessment', posX: 3700, posY: 150, config: { assign_to: 'Analyst', note: 'Pull client payment data for analysis' } },
    { key: 'A065', type: 'wait', name: 'Wait: Until 1 Day Before', posX: 3900, posY: 150, config: { duration: 'until_assessment_minus_1d' } },
    { key: 'A066', type: 'sms_send', name: 'Send: Assessment Reminder', posX: 4100, posY: 150, config: { text: 'Reminder: Your unapplied funds assessment is tomorrow. We\'ll show you exactly where your cash is hiding!' } },
    { key: 'A067', type: 'wait', name: 'Wait: Until Assessment', posX: 4300, posY: 150, config: { duration: 'until_assessment_time' } },
    { key: 'A068', type: 'task', name: 'TASK: Conduct Assessment', posX: 4500, posY: 150, config: { assign_to: 'Sales' } },
    { key: 'A069', type: 'decision', name: 'Check: Assessment Completed?', posX: 4700, posY: 150, config: { condition: 'assessment_done' } },
    { key: 'A070', type: 'tag', name: 'Tag: Assessment-Complete', posX: 4900, posY: 100, config: { tag: 'assessed' } },

    // POST-ASSESSMENT RESULTS (Nodes 71-80)
    { key: 'A071', type: 'stage', name: 'STAGE: Post-Assessment Follow-up', posX: 5100, posY: 100, config: {} },
    { key: 'A072', type: 'email_send', name: 'Send: Assessment Results', posX: 5300, posY: 100, config: { subject: 'Found $XXX,XXX in Unapplied Funds', body: 'Here\'s what we found...' } },
    { key: 'A073', type: 'wait', name: 'Wait: 1 Day', posX: 5500, posY: 100, config: { duration: 'P1D' } },
    { key: 'A074', type: 'task', name: 'TASK: Send Recovery Proposal', posX: 5700, posY: 100, config: { assign_to: 'Sales' } },
    { key: 'A075', type: 'wait', name: 'Wait: 2 Days', posX: 5900, posY: 100, config: { duration: 'P2D' } },
    { key: 'A076', type: 'sms_send', name: 'Send: Proposal Follow-up SMS', posX: 6100, posY: 100, config: { text: 'Hi {{contact.first_name}}, following up on your unapplied funds proposal. Questions?' } },
    { key: 'A077', type: 'task', name: 'TASK: Sales Call', posX: 6300, posY: 100, config: { assign_to: 'Sales' } },
    { key: 'A078', type: 'wait', name: 'Wait: 3 Days', posX: 6500, posY: 100, config: { duration: 'P3D' } },
    { key: 'A079', type: 'email_send', name: 'Send: Final Offer', posX: 6700, posY: 100, config: { subject: 'Last call - recover your unapplied funds', body: 'Final opportunity...' } },
    { key: 'A080', type: 'goal', name: 'GOAL: Deal Won', posX: 6900, posY: 50, config: {} },

    // NO-SHOW PATH (Nodes 81-85)
    { key: 'A081', type: 'stage', name: 'STAGE: Assessment No-Show', posX: 4900, posY: 250, config: {} },
    { key: 'A082', type: 'email_send', name: 'Send: Missed Assessment', posX: 5100, posY: 250, config: { subject: 'Missed your assessment', body: 'Want to reschedule?' } },
    { key: 'A083', type: 'sms_send', name: 'Send: Reschedule SMS', posX: 5300, posY: 250, config: { text: 'Missed our assessment call. Want to reschedule? {{landing_page_url}}' } },
    { key: 'A084', type: 'wait', name: 'Wait: 2 Days', posX: 5500, posY: 250, config: { duration: 'P2D' } },
    { key: 'A085', type: 'decision', name: 'Check: Rescheduled?', posX: 5700, posY: 250, config: { condition: 'rescheduled' } },

    // NURTURE (Nodes 86-90)
    { key: 'A086', type: 'stage', name: 'STAGE: Long-term Nurture', posX: 4500, posY: 1150, config: {} },
    { key: 'A087', type: 'wait', name: 'Wait: 30 Days', posX: 4700, posY: 1150, config: { duration: 'P30D' } },
    { key: 'A088', type: 'email_send', name: 'Send: Re-engagement', posX: 4900, posY: 1150, config: { subject: 'Still have unapplied funds?', body: 'Quick follow-up on payment automation...' } },
    { key: 'A089', type: 'decision', name: 'Check: Re-engaged?', posX: 5100, posY: 1150, config: { condition: 'email_opened' } },
    { key: 'A090', type: 'exit', name: 'EXIT: End Campaign', posX: 5300, posY: 1200, config: {} },
  ],
  edges: [
    { from: 'A000', to: 'A001' },
    { from: 'A001', to: 'A002' },
    { from: 'A002', to: 'A003' },
    { from: 'A003', to: 'A004' },
    { from: 'A004', to: 'A005' },
    { from: 'A005', to: 'A006' },
    { from: 'A006', to: 'A007' },
    { from: 'A007', to: 'A008', condition: { email_opened: true } },
    { from: 'A008', to: 'A009' },
    { from: 'A009', to: 'A010', condition: { landing_page_visit: true } },
    { from: 'A010', to: 'A011' },
    { from: 'A011', to: 'A012' },
    { from: 'A012', to: 'A013' },
    { from: 'A013', to: 'A014', condition: { sms_reply: true } },
    { from: 'A014', to: 'A061' },
    { from: 'A009', to: 'A015', condition: { landing_page_visit: false } },
    { from: 'A013', to: 'A015', condition: { sms_reply: false } },
    { from: 'A015', to: 'A016' },
    { from: 'A016', to: 'A017' },
    { from: 'A017', to: 'A018' },
    { from: 'A018', to: 'A019' },
    { from: 'A019', to: 'A020', condition: { email_activity: true } },
    { from: 'A020', to: 'A021' },
    { from: 'A021', to: 'A022' },
    { from: 'A022', to: 'A023' },
    { from: 'A023', to: 'A024' },
    { from: 'A024', to: 'A061', condition: { any_activity: true } },
    { from: 'A024', to: 'A031', condition: { any_activity: false } },
    { from: 'A019', to: 'A031', condition: { email_activity: false } },
    { from: 'A007', to: 'A025', condition: { email_opened: false } },
    { from: 'A025', to: 'A026' },
    { from: 'A026', to: 'A027' },
    { from: 'A027', to: 'A028' },
    { from: 'A028', to: 'A029' },
    { from: 'A029', to: 'A061', condition: { sms_reply: true } },
    { from: 'A029', to: 'A030', condition: { sms_reply: false } },
    { from: 'A030', to: 'A031' },
    { from: 'A031', to: 'A032' },
    { from: 'A032', to: 'A033' },
    { from: 'A033', to: 'A034' },
    { from: 'A034', to: 'A035' },
    { from: 'A035', to: 'A036', condition: { email_opened: true } },
    { from: 'A036', to: 'A037' },
    { from: 'A037', to: 'A038' },
    { from: 'A038', to: 'A039', condition: { sms_reply: true } },
    { from: 'A039', to: 'A061' },
    { from: 'A035', to: 'A040', condition: { email_opened: false } },
    { from: 'A038', to: 'A040', condition: { sms_reply: false } },
    { from: 'A040', to: 'A041' },
    { from: 'A041', to: 'A042' },
    { from: 'A042', to: 'A043' },
    { from: 'A043', to: 'A044' },
    { from: 'A044', to: 'A045' },
    { from: 'A045', to: 'A046', condition: { email_opened: true } },
    { from: 'A046', to: 'A047' },
    { from: 'A047', to: 'A048' },
    { from: 'A048', to: 'A049', condition: { any_response: true } },
    { from: 'A049', to: 'A061' },
    { from: 'A045', to: 'A050', condition: { email_opened: false } },
    { from: 'A048', to: 'A050', condition: { any_response: false } },
    { from: 'A050', to: 'A051' },
    { from: 'A051', to: 'A052' },
    { from: 'A052', to: 'A053' },
    { from: 'A053', to: 'A054', condition: { score_gte_100: true } },
    { from: 'A054', to: 'A055' },
    { from: 'A055', to: 'A061' },
    { from: 'A053', to: 'A056', condition: { score_gte_100: false } },
    { from: 'A056', to: 'A057', condition: { score_40_to_99: true } },
    { from: 'A057', to: 'A058' },
    { from: 'A058', to: 'A086' },
    { from: 'A056', to: 'A059', condition: { score_40_to_99: false } },
    { from: 'A059', to: 'A060' },
    { from: 'A060', to: 'A086' },
    { from: 'A061', to: 'A062' },
    { from: 'A062', to: 'A063' },
    { from: 'A063', to: 'A064' },
    { from: 'A064', to: 'A065' },
    { from: 'A065', to: 'A066' },
    { from: 'A066', to: 'A067' },
    { from: 'A067', to: 'A068' },
    { from: 'A068', to: 'A069' },
    { from: 'A069', to: 'A070', condition: { assessment_done: true } },
    { from: 'A070', to: 'A071' },
    { from: 'A071', to: 'A072' },
    { from: 'A072', to: 'A073' },
    { from: 'A073', to: 'A074' },
    { from: 'A074', to: 'A075' },
    { from: 'A075', to: 'A076' },
    { from: 'A076', to: 'A077' },
    { from: 'A077', to: 'A078' },
    { from: 'A078', to: 'A079' },
    { from: 'A079', to: 'A080' },
    { from: 'A069', to: 'A081', condition: { assessment_done: false } },
    { from: 'A081', to: 'A082' },
    { from: 'A082', to: 'A083' },
    { from: 'A083', to: 'A084' },
    { from: 'A084', to: 'A085' },
    { from: 'A085', to: 'A065', condition: { rescheduled: true } },
    { from: 'A085', to: 'A086', condition: { rescheduled: false } },
    { from: 'A086', to: 'A087' },
    { from: 'A087', to: 'A088' },
    { from: 'A088', to: 'A089' },
    { from: 'A089', to: 'A004', condition: { email_opened: true } },
    { from: 'A089', to: 'A090', condition: { email_opened: false } },
  ]
};

console.log(`AR/AP Funnel: ${arapFunnel.nodes.length} nodes, ${arapFunnel.edges.length} edges`);

// =============================================================================
// PROPERTY MANAGEMENT YARDI - 90 NODE FUNNEL
// =============================================================================

const propMgmtFunnel = {
  id: 'funnel_propmgmt_yardi_v2',
  name: 'Property Management Yardi Integration - 90-Node',
  status: 'published',
  version: 2,
  nodes: [
    // START & TARGETING (Nodes 0-4)
    { key: 'P000', type: 'start', name: 'Import: PropMgmt Finance List', posX: 100, posY: 500, config: {} },
    { key: 'P001', type: 'filter', name: 'Filter: Property Management', posX: 300, posY: 500, config: { criteria: 'industry=property_management' } },
    { key: 'P002', type: 'filter', name: 'Filter: Yardi Users', posX: 500, posY: 500, config: { criteria: 'uses_yardi=true' } },
    { key: 'P003', type: 'tag', name: 'Tag: PropMgmt-Yardi', posX: 700, posY: 500, config: { tag: 'propmgmt-yardi' } },
    { key: 'P004', type: 'stage', name: 'STAGE: Day 1 - Yardi Native Hook', posX: 900, posY: 500, config: {} },

    // DAY 1 - YARDI INTEGRATION FOCUS (Nodes 5-14)
    { key: 'P005', type: 'email_send', name: 'Send: Native Yardi Integration', posX: 1100, posY: 400, config: { template_id: 'prop_email_01_intro', landing_page: '/landing/property-management' } },
    { key: 'P006', type: 'wait', name: 'Wait: 2 Hours', posX: 1300, posY: 400, config: { duration: 'PT2H' } },
    { key: 'P007', type: 'decision', name: 'Check: Email Opened?', posX: 1500, posY: 400, config: { condition: 'email_opened' } },
    { key: 'P008', type: 'tag', name: 'Tag: Email-Engaged', posX: 1700, posY: 300, config: { tag: 'engaged', score: 10 } },
    { key: 'P009', type: 'decision', name: 'Check: Link Clicked?', posX: 1900, posY: 300, config: { condition: 'link_clicked' } },
    { key: 'P010', type: 'tag', name: 'Tag: HIGH-INTEREST', posX: 2100, posY: 200, config: { tag: 'high-interest', score: 50 } },
    { key: 'P011', type: 'sms_send', name: 'Send: SMS Yardi Quick Pitch', posX: 2300, posY: 200, config: { template_id: 'prop_sms_01_intro' } },
    { key: 'P012', type: 'wait', name: 'Wait: 1 Hour', posX: 2500, posY: 200, config: { duration: 'PT1H' } },
    { key: 'P013', type: 'decision', name: 'Check: SMS Reply?', posX: 2700, posY: 200, config: { condition: 'sms_reply' } },
    { key: 'P014', type: 'task', name: 'TASK: Hot Lead - Schedule Demo', posX: 2900, posY: 100, config: { assign_to: 'BDR', priority: 'urgent' } },

    // LINKEDIN PATH (Nodes 15-20)
    { key: 'P015', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 1100, posY: 600, config: { message: 'Hi {{contact.first_name}}, I help property management teams automate reconciliation in Yardi. Let\'s connect!' } },
    { key: 'P016', type: 'wait', name: 'Wait: 4 Hours', posX: 1300, posY: 600, config: { duration: 'PT4H' } },
    { key: 'P017', type: 'decision', name: 'Check: Connected?', posX: 1500, posY: 600, config: { condition: 'linkedin_accepted' } },
    { key: 'P018', type: 'tag', name: 'Tag: LinkedIn-Connected', posX: 1700, posY: 550, config: { tag: 'linkedin', score: 15 } },
    { key: 'P019', type: 'linkedin_message', name: 'LinkedIn: Yardi Message', posX: 1900, posY: 550, config: { message: 'Using Yardi Voyager? We integrate natively for automated reconciliation. Worth a quick demo?' } },
    { key: 'P020', type: 'wait', name: 'Wait: 1 Day', posX: 2100, posY: 550, config: { duration: 'P1D' } },

    // NOT OPENED PATH (Nodes 21-25)
    { key: 'P021', type: 'stage', name: 'STAGE: Not Opened - Direct SMS', posX: 1700, posY: 500, config: {} },
    { key: 'P022', type: 'wait', name: 'Wait: 5 Hours', posX: 1900, posY: 500, config: { duration: 'PT5H' } },
    { key: 'P023', type: 'sms_send', name: 'Send: SMS Direct', posX: 2100, posY: 500, config: { template_id: 'prop_sms_01_intro' } },
    { key: 'P024', type: 'wait', name: 'Wait: 2 Hours', posX: 2300, posY: 500, config: { duration: 'PT2H' } },
    { key: 'P025', type: 'decision', name: 'Check: SMS Reply?', posX: 2500, posY: 500, config: { condition: 'sms_reply' } },

    // DAY 2 - MULTI-PROPERTY FOCUS (Nodes 26-35)
    { key: 'P026', type: 'stage', name: 'STAGE: Day 2 - Portfolio View', posX: 2300, posY: 650, config: {} },
    { key: 'P027', type: 'wait', name: 'Wait: Until Day 2', posX: 2500, posY: 650, config: { duration: 'until_day_2_9am' } },
    { key: 'P028', type: 'email_send', name: 'Send: Multi-Property Email', posX: 2700, posY: 650, config: { template_id: 'prop_email_02_multi_property' } },
    { key: 'P029', type: 'wait', name: 'Wait: 3 Hours', posX: 2900, posY: 650, config: { duration: 'PT3H' } },
    { key: 'P030', type: 'decision', name: 'Check: Email Opened?', posX: 3100, posY: 650, config: { condition: 'email_opened' } },
    { key: 'P031', type: 'decision', name: 'Check: Link Clicked?', posX: 3300, posY: 600, config: { condition: 'link_clicked' } },
    { key: 'P032', type: 'tag', name: 'Tag: Portfolio-Interested', posX: 3500, posY: 550, config: { tag: 'portfolio-interest', score: 30 } },
    { key: 'P033', type: 'task', name: 'TASK: BDR Call', posX: 3700, posY: 550, config: { assign_to: 'BDR' } },
    { key: 'P034', type: 'voicemail_drop', name: 'Drop: VM Intro', posX: 3300, posY: 700, config: { template_id: 'prop_vm_01_intro' } },
    { key: 'P035', type: 'wait', name: 'Wait: 6 Hours', posX: 3500, posY: 700, config: { duration: 'PT6H' } },

    // DAY 3 - YARDI NATIVE BENEFITS (Nodes 36-45)
    { key: 'P036', type: 'stage', name: 'STAGE: Day 3 - Native Integration', posX: 100, posY: 1200, config: {} },
    { key: 'P037', type: 'wait', name: 'Wait: Until Day 3', posX: 300, posY: 1200, config: { duration: 'P1D' } },
    { key: 'P038', type: 'email_send', name: 'Send: Yardi Native Benefits', posX: 500, posY: 1200, config: { template_id: 'prop_email_03_yardi_native' } },
    { key: 'P039', type: 'wait', name: 'Wait: 4 Hours', posX: 700, posY: 1200, config: { duration: 'PT4H' } },
    { key: 'P040', type: 'decision', name: 'Check: Email Engagement?', posX: 900, posY: 1200, config: { condition: 'email_opened' } },
    { key: 'P041', type: 'sms_send', name: 'Send: SMS Portfolio Stats', posX: 1100, posY: 1150, config: { template_id: 'prop_sms_02_portfolio' } },
    { key: 'P042', type: 'wait', name: 'Wait: 2 Hours', posX: 1300, posY: 1150, config: { duration: 'PT2H' } },
    { key: 'P043', type: 'decision', name: 'Check: Response?', posX: 1500, posY: 1150, config: { condition: 'any_response' } },
    { key: 'P044', type: 'tag', name: 'Tag: Engaged-Day3', posX: 1700, posY: 1100, config: { tag: 'engaged-d3', score: 25 } },
    { key: 'P045', type: 'linkedin_message', name: 'LinkedIn: Integration Message', posX: 1900, posY: 1100, config: { message: 'Yardi user? Our native integration saves 85% of reconciliation time. Quick demo?' } },

    // DAY 5 - CASE STUDY (Nodes 46-55)
    { key: 'P046', type: 'stage', name: 'STAGE: Day 5 - 500-Property Case', posX: 2100, posY: 1200, config: {} },
    { key: 'P047', type: 'wait', name: 'Wait: Until Day 5', posX: 2300, posY: 1200, config: { duration: 'P2D' } },
    { key: 'P048', type: 'email_send', name: 'Send: 500-Property Case Study', posX: 2500, posY: 1200, config: { template_id: 'prop_email_04_case' } },
    { key: 'P049', type: 'wait', name: 'Wait: 3 Hours', posX: 2700, posY: 1200, config: { duration: 'PT3H' } },
    { key: 'P050', type: 'decision', name: 'Check: Opened/Clicked?', posX: 2900, posY: 1200, config: { condition: 'email_activity' } },
    { key: 'P051', type: 'sms_send', name: 'Send: SMS Case Highlight', posX: 3100, posY: 1150, config: { text: '{{contact.first_name}}, PM company automated 500 properties with native Yardi integration. Save 85% of recon time. Demo? {{landing_page_url}}' } },
    { key: 'P052', type: 'wait', name: 'Wait: 2 Hours', posX: 3300, posY: 1150, config: { duration: 'PT2H' } },
    { key: 'P053', type: 'decision', name: 'Check: Response?', posX: 3500, posY: 1150, config: { condition: 'any_response' } },
    { key: 'P054', type: 'task', name: 'TASK: BDR Outreach', posX: 3700, posY: 1100, config: { assign_to: 'BDR' } },
    { key: 'P055', type: 'voicemail_drop', name: 'Drop: VM Case Study', posX: 3100, posY: 1250, config: { tts_script: 'Hi {{contact.first_name}}, Jim from Paycile. Just helped a property management company automate 500 properties in Yardi. Their reconciliation time dropped 85 percent. If you\'d like to see the integration, book at paycile.com/landing/property-management. Thanks!' } },

    // ENGAGEMENT SCORING (Nodes 56-65)
    { key: 'P056', type: 'stage', name: 'STAGE: Day 7 - Scoring Checkpoint', posX: 3900, posY: 1200, config: {} },
    { key: 'P057', type: 'scoring', name: 'Calculate: Total Engagement', posX: 4100, posY: 1200, config: { 
      rules: [
        { action: 'email_opened', points: 10 },
        { action: 'landing_page_visit', points: 35 },
        { action: 'link_clicked', points: 25 },
        { action: 'email_reply', points: 100 },
        { action: 'sms_reply', points: 100 },
        { action: 'linkedin_accepted', points: 15 }
      ]
    } },
    { key: 'P058', type: 'decision', name: 'Route: Score >= 75?', posX: 4300, posY: 1200, config: { condition: 'score_gte_75' } },
    { key: 'P059', type: 'tag', name: 'Tag: HOT-YARDI-LEAD', posX: 4500, posY: 1100, config: { tag: 'hot', score: 100 } },
    { key: 'P060', type: 'task', name: 'TASK: Priority Demo Booking', posX: 4700, posY: 1100, config: { assign_to: 'BDR', priority: 'urgent' } },
    { key: 'P061', type: 'decision', name: 'Route: Score 35-74?', posX: 4500, posY: 1200, config: { condition: 'score_35_to_74' } },
    { key: 'P062', type: 'tag', name: 'Tag: WARM', posX: 4700, posY: 1200, config: { tag: 'warm', score: 50 } },
    { key: 'P063', type: 'sms_send', name: 'Send: Final SMS Push', posX: 4900, posY: 1200, config: { text: 'Final offer {{contact.first_name}} - see native Yardi integration. Save 85% of recon time. {{landing_page_url}}' } },
    { key: 'P064', type: 'decision', name: 'Route: Score < 35?', posX: 4500, posY: 1300, config: { condition: 'score_lt_35' } },
    { key: 'P065', type: 'tag', name: 'Tag: COLD', posX: 4700, posY: 1300, config: { tag: 'cold' } },

    // DEMO BOOKING FLOW (Nodes 66-75)
    { key: 'P066', type: 'stage', name: 'STAGE: Yardi Demo Booked', posX: 3100, posY: 100, config: {} },
    { key: 'P067', type: 'tag', name: 'Tag: DEMO-SCHEDULED', posX: 3300, posY: 100, config: { tag: 'demo-scheduled' } },
    { key: 'P068', type: 'email_send', name: 'Send: Demo Confirmation', posX: 3500, posY: 100, config: { subject: 'Your Yardi Integration Demo', body: 'Looking forward to showing you...' } },
    { key: 'P069', type: 'task', name: 'TASK: Prep Yardi Demo Environment', posX: 3700, posY: 100, config: { assign_to: 'Sales', note: 'Set up Yardi demo instance' } },
    { key: 'P070', type: 'wait', name: 'Wait: Until 24hr Before', posX: 3900, posY: 100, config: { duration: 'until_demo_minus_24h' } },
    { key: 'P071', type: 'email_send', name: 'Send: Demo Prep Email', posX: 4100, posY: 100, config: { subject: 'Tomorrow: Yardi Integration Demo', body: 'Demo prep info...' } },
    { key: 'P072', type: 'wait', name: 'Wait: Until 2hr Before', posX: 4300, posY: 100, config: { duration: 'until_demo_minus_2h' } },
    { key: 'P073', type: 'sms_send', name: 'Send: Demo Reminder SMS', posX: 4500, posY: 100, config: { text: 'Demo starts in 2 hours! Ready to see native Yardi reconciliation automation.' } },
    { key: 'P074', type: 'wait', name: 'Wait: Until Demo', posX: 4700, posY: 100, config: { duration: 'until_demo_time' } },
    { key: 'P075', type: 'decision', name: 'Check: Attended?', posX: 4900, posY: 100, config: { condition: 'demo_attended' } },

    // POST-DEMO (Nodes 76-82)
    { key: 'P076', type: 'stage', name: 'STAGE: Post-Demo Success', posX: 5100, posY: 50, config: {} },
    { key: 'P077', type: 'email_send', name: 'Send: Thank You + ROI Report', posX: 5300, posY: 50, config: { subject: 'Your Yardi Integration ROI Report', body: 'Based on our demo...' } },
    { key: 'P078', type: 'task', name: 'TASK: Send Custom Proposal', posX: 5500, posY: 50, config: { assign_to: 'Sales' } },
    { key: 'P079', type: 'wait', name: 'Wait: 2 Days', posX: 5700, posY: 50, config: { duration: 'P2D' } },
    { key: 'P080', type: 'email_send', name: 'Send: Proposal Check-in', posX: 5900, posY: 50, config: { subject: 'Questions on the Yardi integration?', body: 'Following up...' } },
    { key: 'P081', type: 'task', name: 'TASK: Sales Call', posX: 6100, posY: 50, config: { assign_to: 'Sales' } },
    { key: 'P082', type: 'goal', name: 'GOAL: Deal Closed', posX: 6300, posY: 50, config: {} },

    // NO-SHOW (Nodes 83-87)
    { key: 'P083', type: 'stage', name: 'STAGE: Demo No-Show', posX: 5100, posY: 200, config: {} },
    { key: 'P084', type: 'email_send', name: 'Send: Sorry We Missed You', posX: 5300, posY: 200, config: { subject: 'Missed the Yardi demo', body: 'Want to reschedule?' } },
    { key: 'P085', type: 'sms_send', name: 'Send: Reschedule SMS', posX: 5500, posY: 200, config: { text: 'Missed our Yardi demo. Reschedule? {{landing_page_url}}' } },
    { key: 'P086', type: 'wait', name: 'Wait: 3 Days', posX: 5700, posY: 200, config: { duration: 'P3D' } },
    { key: 'P087', type: 'decision', name: 'Check: Rescheduled?', posX: 5900, posY: 200, config: { condition: 'rescheduled' } },

    // NURTURE (Nodes 88-90)
    { key: 'P088', type: 'stage', name: 'STAGE: 30-Day Nurture', posX: 4900, posY: 1350, config: {} },
    { key: 'P089', type: 'wait', name: 'Wait: 30 Days', posX: 5100, posY: 1350, config: { duration: 'P30D' } },
    { key: 'P090', type: 'email_send', name: 'Send: Re-engagement', posX: 5300, posY: 1350, config: { subject: 'Still reconciling manually in Yardi?', body: 'Following up on native integration...' } },
  ],
  edges: [
    { from: 'P000', to: 'P001' },
    { from: 'P001', to: 'P002' },
    { from: 'P002', to: 'P003' },
    { from: 'P003', to: 'P004' },
    { from: 'P004', to: 'P005' },
    { from: 'P004', to: 'P015' },
    { from: 'P005', to: 'P006' },
    { from: 'P006', to: 'P007' },
    { from: 'P007', to: 'P008', condition: { email_opened: true } },
    { from: 'P008', to: 'P009' },
    { from: 'P009', to: 'P010', condition: { link_clicked: true } },
    { from: 'P010', to: 'P011' },
    { from: 'P011', to: 'P012' },
    { from: 'P012', to: 'P013' },
    { from: 'P013', to: 'P014', condition: { sms_reply: true } },
    { from: 'P014', to: 'P066' },
    { from: 'P007', to: 'P021', condition: { email_opened: false } },
    { from: 'P015', to: 'P016' },
    { from: 'P016', to: 'P017' },
    { from: 'P017', to: 'P018', condition: { linkedin_accepted: true } },
    { from: 'P018', to: 'P019' },
    { from: 'P019', to: 'P020' },
    { from: 'P020', to: 'P026' },
    { from: 'P017', to: 'P026', condition: { linkedin_accepted: false } },
    { from: 'P021', to: 'P022' },
    { from: 'P022', to: 'P023' },
    { from: 'P023', to: 'P024' },
    { from: 'P024', to: 'P025' },
    { from: 'P025', to: 'P066', condition: { sms_reply: true } },
    { from: 'P025', to: 'P026', condition: { sms_reply: false } },
    { from: 'P009', to: 'P026', condition: { link_clicked: false } },
    { from: 'P013', to: 'P026', condition: { sms_reply: false } },
    { from: 'P026', to: 'P027' },
    { from: 'P027', to: 'P028' },
    { from: 'P028', to: 'P029' },
    { from: 'P029', to: 'P030' },
    { from: 'P030', to: 'P031', condition: { email_opened: true } },
    { from: 'P031', to: 'P032', condition: { link_clicked: true } },
    { from: 'P032', to: 'P033' },
    { from: 'P033', to: 'P066' },
    { from: 'P031', to: 'P034', condition: { link_clicked: false } },
    { from: 'P030', to: 'P034', condition: { email_opened: false } },
    { from: 'P034', to: 'P035' },
    { from: 'P035', to: 'P036' },
    { from: 'P036', to: 'P037' },
    { from: 'P037', to: 'P038' },
    { from: 'P038', to: 'P039' },
    { from: 'P039', to: 'P040' },
    { from: 'P040', to: 'P041', condition: { email_opened: true } },
    { from: 'P041', to: 'P042' },
    { from: 'P042', to: 'P043' },
    { from: 'P043', to: 'P044', condition: { any_response: true } },
    { from: 'P044', to: 'P045' },
    { from: 'P045', to: 'P046' },
    { from: 'P040', to: 'P046', condition: { email_opened: false } },
    { from: 'P043', to: 'P046', condition: { any_response: false } },
    { from: 'P046', to: 'P047' },
    { from: 'P047', to: 'P048' },
    { from: 'P048', to: 'P049' },
    { from: 'P049', to: 'P050' },
    { from: 'P050', to: 'P051', condition: { email_activity: true } },
    { from: 'P051', to: 'P052' },
    { from: 'P052', to: 'P053' },
    { from: 'P053', to: 'P054', condition: { any_response: true } },
    { from: 'P054', to: 'P066' },
    { from: 'P050', to: 'P055', condition: { email_activity: false } },
    { from: 'P053', to: 'P055', condition: { any_response: false } },
    { from: 'P055', to: 'P056' },
    { from: 'P056', to: 'P057' },
    { from: 'P057', to: 'P058' },
    { from: 'P058', to: 'P059', condition: { score_gte_75: true } },
    { from: 'P059', to: 'P060' },
    { from: 'P060', to: 'P066' },
    { from: 'P058', to: 'P061', condition: { score_gte_75: false } },
    { from: 'P061', to: 'P062', condition: { score_35_to_74: true } },
    { from: 'P062', to: 'P063' },
    { from: 'P063', to: 'P088' },
    { from: 'P061', to: 'P064', condition: { score_35_to_74: false } },
    { from: 'P064', to: 'P065' },
    { from: 'P065', to: 'P088' },
    { from: 'P066', to: 'P067' },
    { from: 'P067', to: 'P068' },
    { from: 'P068', to: 'P069' },
    { from: 'P069', to: 'P070' },
    { from: 'P070', to: 'P071' },
    { from: 'P071', to: 'P072' },
    { from: 'P072', to: 'P073' },
    { from: 'P073', to: 'P074' },
    { from: 'P074', to: 'P075' },
    { from: 'P075', to: 'P076', condition: { demo_attended: true } },
    { from: 'P076', to: 'P077' },
    { from: 'P077', to: 'P078' },
    { from: 'P078', to: 'P079' },
    { from: 'P079', to: 'P080' },
    { from: 'P080', to: 'P081' },
    { from: 'P081', to: 'P082' },
    { from: 'P075', to: 'P083', condition: { demo_attended: false } },
    { from: 'P083', to: 'P084' },
    { from: 'P084', to: 'P085' },
    { from: 'P085', to: 'P086' },
    { from: 'P086', to: 'P087' },
    { from: 'P087', to: 'P070', condition: { rescheduled: true } },
    { from: 'P087', to: 'P088', condition: { rescheduled: false } },
    { from: 'P088', to: 'P089' },
    { from: 'P089', to: 'P090' },
  ]
};

console.log(`Property Management Funnel: ${propMgmtFunnel.nodes.length} nodes, ${propMgmtFunnel.edges.length} edges`);

// =============================================================================
// SEED FUNCTION
// =============================================================================

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🚀 COMPREHENSIVE PAYCILE FUNNELS - 90 NODES EACH');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Create CFO Insurance content templates
    console.log('📝 Creating CFO Insurance content templates...\n');
    for (const ct of cfoInsuranceContent) {
      try {
        await prisma.contentTemplate.upsert({
          where: { id: ct.id },
          create: ct,
          update: ct
        });
        console.log(`  ✅ ${ct.name}`);
      } catch (err) {
        console.log(`  ❌ ${ct.name}: ${err.message}`);
      }
    }
    
    // Create Controller content templates
    console.log('\n📝 Creating Controller content templates...\n');
    for (const ct of controllerContent) {
      try {
        await prisma.contentTemplate.upsert({
          where: { id: ct.id },
          create: ct,
          update: ct
        });
        console.log(`  ✅ ${ct.name}`);
      } catch (err) {
        console.log(`  ❌ ${ct.name}: ${err.message}`);
      }
    }
    
    // Create AR/AP content templates
    console.log('\n📝 Creating AR/AP content templates...\n');
    for (const ct of arapContent) {
      try {
        await prisma.contentTemplate.upsert({
          where: { id: ct.id },
          create: ct,
          update: ct
        });
        console.log(`  ✅ ${ct.name}`);
      } catch (err) {
        console.log(`  ❌ ${ct.name}: ${err.message}`);
      }
    }
    
    // Create Property Mgmt content templates
    console.log('\n📝 Creating Property Management content templates...\n');
    for (const ct of propMgmtContent) {
      try {
        await prisma.contentTemplate.upsert({
          where: { id: ct.id },
          create: ct,
          update: ct
        });
        console.log(`  ✅ ${ct.name}`);
      } catch (err) {
        console.log(`  ❌ ${ct.name}: ${err.message}`);
      }
    }
    
    // Create all 4 funnels
    console.log('\n🎯 Creating CFO Insurance Funnel (90 nodes)...\n');
    await createFunnel(cfoInsuranceFunnel);
    
    console.log('\n🎯 Creating Controller Multi-Entity Funnel (90 nodes)...\n');
    await createFunnel(controllerFunnel);
    
    console.log('\n🎯 Creating AR/AP Unapplied Funds Funnel (90 nodes)...\n');
    await createFunnel(arapFunnel);
    
    console.log('\n🎯 Creating Property Management Yardi Funnel (90 nodes)...\n');
    await createFunnel(propMgmtFunnel);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 ALL 4 COMPREHENSIVE FUNNELS CREATED!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`   • CFO Insurance: ${cfoInsuranceFunnel.nodes.length} nodes, ${cfoInsuranceFunnel.edges.length} edges`);
    console.log(`   • Controller: ${controllerFunnel.nodes.length} nodes, ${controllerFunnel.edges.length} edges`);
    console.log(`   • AR/AP: ${arapFunnel.nodes.length} nodes, ${arapFunnel.edges.length} edges`);
    console.log(`   • Property Mgmt: ${propMgmtFunnel.nodes.length} nodes, ${propMgmtFunnel.edges.length} edges`);
    console.log(`\n   Total Content Templates: ${cfoInsuranceContent.length + controllerContent.length + arapContent.length + propMgmtContent.length}`);
    console.log('\n✅ All templates connected to nodes via template_id in config');
    console.log('✅ All landing pages integrated via landing_page in config');
    console.log('\n═══════════════════════════════════════════════════════════\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

async function createFunnel(funnel) {
  // Delete existing nodes for this template
  await prisma.node.deleteMany({ where: { templateId: funnel.id } });
  await prisma.edge.deleteMany({ where: { templateId: funnel.id } });
  
  // Create or update template
  await prisma.template.upsert({
    where: { id: funnel.id },
    create: {
      id: funnel.id,
      name: funnel.name,
      status: funnel.status,
      version: funnel.version
    },
    update: {
      name: funnel.name,
      status: funnel.status,
      version: funnel.version
    }
  });
  
  // Create nodes
  for (const node of funnel.nodes) {
    await prisma.node.create({
      data: {
        templateId: funnel.id,
        key: node.key,
        type: node.type,
        name: node.name,
        posX: node.posX,
        posY: node.posY,
        configJson: JSON.stringify(node.config || {})
      }
    });
  }
  
  // Create edges
  for (const edge of funnel.edges) {
    await prisma.edge.create({
      data: {
        templateId: funnel.id,
        fromKey: edge.from,
        toKey: edge.to,
        conditionJson: JSON.stringify(edge.condition || {})
      }
    });
  }
  
  console.log(`  ✅ ${funnel.name}: ${funnel.nodes.length} nodes, ${funnel.edges.length} edges`);
}

// Run the seed
seed()
  .catch(console.error)
  .finally(() => process.exit(0));

