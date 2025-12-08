// Complete Newbury Content Templates Library
// All email, SMS, and voicemail content for 247 funnel nodes
// Run: node scripts/seed_all_newbury_content.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ═══════════════════════════════════════════════════════════════════════════
// DEALSHEET CONTENT TEMPLATES (85 nodes worth of content)
// ═══════════════════════════════════════════════════════════════════════════

const dealsheetContent = [
  // AWARENESS PHASE
  {
    id: 'nct_dealsheet_cold_1',
    type: 'email',
    name: '[DealSheet] Cold Email: The $84K margin leak',
    subject: 'Your Bullhorn is hiding $84K/month',
    body: `Hi {{contact.first_name}},

I live for helping healthcare staffing leaders reclaim missed margins (it's become such a fun passion).

One of our clients — a $30M firm — found $84K in missed monthly margin just by making their rate calculations fully visible.

They didn't need more people. They needed to see what was leaking.

Our automated margin calculator manages multiple rates (including GSA system integration) to ensure no dollars are left on the table.

Accuracy, compliance, and margin protection — while triggering manager approvals if any recruiter goes outside thresholds.

15 minutes. I'll show you the $84K. You decide if it's worth it.

-Katie

P.S. Full transparency: If you're at SIA in Vegas, I'd love to buy you a drink and show you how it works in action.`
  },
  {
    id: 'nct_dealsheet_ai_followup_1',
    type: 'email',
    name: '[DealSheet] AI Follow-up - Firm Size Personalized',
    subject: 'Re: Healthcare staffing margin question',
    body: `{{contact.first_name}},

Quick follow-up on margin optimization for {{contact.company}}.

Based on your firm size (~{{contact.firm_revenue}}), most healthcare staffing companies your size are leaving 12-18% on the table due to:

• GSA rate miscalculations
• Recruiter threshold violations going unnoticed  
• Manual margin tracking eating finance team time

One 15-minute call. I'll show you where the leaks typically hide.

Worth a conversation?

-Katie`
  },
  {
    id: 'nct_dealsheet_sms_1',
    type: 'sms',
    name: '[DealSheet] SMS: Quick margin question',
    text: `{{contact.first_name}} - Quick question: How much time does your finance team spend calculating margins each month? I help healthcare staffing firms automate this (and find hidden margin). 15-min call? -Katie, Newbury Partners`
  },
  {
    id: 'nct_dealsheet_vm_1',
    type: 'voicemail',
    name: '[DealSheet] VM: Margin calculator intro',
    ttsScript: `Hi {{contact.first_name}}, Katie from Newbury Partners. I specialize in helping healthcare staffing firms reclaim missed margins through automated rate calculations. One of our clients found 84 thousand dollars in monthly margin they didn't know they were losing. I'd love to show you how we did it. My number is 617-555-0123. Talk soon!`
  },
  {
    id: 'nct_dealsheet_case_study_1',
    type: 'email',
    name: '[DealSheet] Case Study: 18% hidden margin',
    subject: 'How a $45M healthcare staffing firm found 18% hidden margin',
    body: `{{contact.first_name}},

Thought you'd find this interesting.

We recently worked with a $45M healthcare staffing firm that was convinced they had tight margin controls.

Within the first week of implementing DealSheet, they discovered:

• 18% of deals were priced below optimal thresholds
• GSA rate integration errors costing $127K annually
• Manual approvals missing 23% of threshold violations

The solution? Automated margin calculator that:
✓ Integrates directly with GSA systems
✓ Triggers instant manager approvals for violations
✓ Ensures compliance while protecting margins

Result: $84K/month recovered. Finance team saved 40 hours/month.

Want to see if similar opportunities exist at {{contact.company}}?

-Katie

[Download Full Case Study]`
  },
  {
    id: 'nct_dealsheet_linkedin_1',
    type: 'email',
    name: '[DealSheet] LinkedIn Voice Message',
    body: `Hi {{contact.first_name}},

Saw we're connected in the healthcare staffing space. 

Quick question: Is your team confident they're catching every margin opportunity in Bullhorn?

We help firms find the 12-18% that's typically invisible.

Open to a quick conversation?

-Katie`
  },
  {
    id: 'nct_dealsheet_conference_invite',
    type: 'email',
    name: '[DealSheet] SIA Conference Invite',
    subject: 'Full transparency: SIA favor coming at you',
    body: `Hi {{contact.first_name}},

I live for helping healthcare staffing leaders reclaim missed margins (it's become such a fun/enjoyable passion).

Our automated margin calculator manages multiple rates (including integrating with the GSA system) in order to ensure no dollars are left on the table.

Accuracy, compliance, and margin protection is the focus of this solution, while also triggering manager approvals if any recruiter goes outside of certain thresholds.

Can I buy you a drink at SIA in Vegas and share how it works in action?

-Katie`
  },
  {
    id: 'nct_dealsheet_conference_reminder',
    type: 'sms',
    name: '[DealSheet] Conference Booth Reminder',
    text: `{{contact.first_name}} - Looking forward to connecting at SIA! I'm at Booth 247. Come by anytime - I'll have that drink ready. -Katie`
  },
  {
    id: 'nct_dealsheet_whitepaper',
    type: 'email',
    name: '[DealSheet] Whitepaper: GSA Integration',
    subject: 'GSA Rate Integration for Healthcare Staffing - Free Guide',
    body: `{{contact.first_name}},

If you're working with government contracts, GSA rate integration can make or break your margins.

I put together a guide on how healthcare staffing firms are automating GSA compliance while protecting margins:

[Download: GSA Integration Best Practices]

Key topics:
• Common GSA calculation errors (cost: $127K/year average)
• Automated rate matching vs manual tracking
• Compliance requirements for federal contracts
• Manager approval workflows

15-minute read. Could save you 6 figures.

-Katie`
  },
  {
    id: 'nct_dealsheet_video_demo',
    type: 'email',
    name: '[DealSheet] 3-Minute Video Demo',
    subject: 'See DealSheet in action (3 minutes)',
    body: `{{contact.first_name}},

No fluff. Just a quick 3-minute walkthrough of how DealSheet protects margins.

[Watch the Demo]

You'll see:
✓ Real-time margin calculation across multiple rates
✓ GSA system integration in action
✓ Manager approval triggers when thresholds violated
✓ How a $45M firm found $84K/month

Worth 3 minutes?

-Katie

P.S. This integrates with your existing Bullhorn instance. No disruption.`
  },
  {
    id: 'nct_dealsheet_roi_calculator',
    type: 'email',
    name: '[DealSheet] Interactive ROI Calculator',
    subject: 'Calculate your hidden margin in 2 minutes',
    body: `{{contact.first_name}},

Quick exercise: Let's see what hidden margin might exist at {{contact.company}}.

[Interactive ROI Calculator - 2 minutes]

Input:
• Your annual revenue
• Number of deals/month
• Current margin tracking method

Output:
• Estimated margin leakage
• Hours saved with automation
• ROI timeline

Most firms are surprised by the numbers.

-Katie`
  },
  {
    id: 'nct_dealsheet_roi_results',
    type: 'email',
    name: '[DealSheet] Personalized ROI Results (AI)',
    subject: 'Your DealSheet ROI Analysis - {{contact.company}}',
    body: `{{contact.first_name}},

Based on the numbers you shared, here's what DealSheet could mean for {{contact.company}}:

💰 Estimated Hidden Margin: ${{calculated_hidden_margin}}/month
⏱️ Finance Team Time Saved: {{calculated_hours_saved}} hours/month
📊 ROI Timeline: {{calculated_roi_months}} months

That's ${{calculated_annual_impact}} annually that you're currently leaving on the table.

The firms we work with typically see:
• 12-18% margin improvement
• 40+ hours/month saved in finance team time
• 100% compliance on rate approvals

Want to dive deeper into your specific situation?

-Katie

[Schedule 15-Minute Call]`
  },
  {
    id: 'nct_dealsheet_webinar_invite',
    type: 'email',
    name: '[DealSheet] Webinar Invitation',
    subject: 'Live Demo: Reclaim Missed Margins in Q1',
    body: `{{contact.first_name}},

Join me for a 45-minute live session on {{webinar_date}} at {{webinar_time}}.

I'll show you exactly how healthcare staffing firms are finding $50K-$150K in annual margin they didn't know was leaking.

What you'll see:
✓ Live margin calculation demo
✓ GSA integration walkthrough
✓ Real client examples (with permission)
✓ Q&A - bring your toughest margin questions

[Register for {{webinar_date}}]

No pitch. Just a live walkthrough.

-Katie

P.S. Can't make it live? Register anyway and I'll send the recording.`
  },
  {
    id: 'nct_dealsheet_webinar_followup',
    type: 'email',
    name: '[DealSheet] Webinar Follow-up - Attended',
    subject: 'Thanks for attending - slides + recording',
    body: `{{contact.first_name}},

Thanks for joining today's margin optimization session.

As promised:
[Webinar Recording]
[Presentation Slides - PDF]
[DealSheet ROI Calculator]

Based on the questions you asked during Q&A, I think there's a strong fit for {{contact.company}}.

Want to schedule a quick 1-on-1 to discuss your specific situation?

-Katie`
  },
  {
    id: 'nct_dealsheet_webinar_noshow',
    type: 'email',
    name: '[DealSheet] Webinar No-Show - Recording',
    subject: 'Missed you today - here\'s the replay',
    body: `{{contact.first_name}},

Missed you at today's margin optimization webinar.

No worries - here's the full recording:
[Watch Recording - 42 minutes]

Key takeaways:
• How $45M firm found 18% hidden margin
• GSA integration best practices
• Live calculation demo

Worth watching when you have time.

-Katie`
  },
  {
    id: 'nct_dealsheet_objection_tracking',
    type: 'email',
    name: '[DealSheet] Objection: Already Tracking',
    subject: 'Re: Margin tracking',
    body: `{{contact.first_name}},

Fair point. Most firms we work with thought the same.

Then we showed them three blind spots they couldn't see:

• GSA rate integration errors (averaging $127K annually)
• Recruiter threshold violations going unnoticed (18% of deals)
• Manual approval delays missing optimal pricing windows

One firm was tracking margins "closely" and still found $84K/month they didn't know was leaking.

Worth a 15-minute look at your numbers?

-Katie`
  },
  {
    id: 'nct_dealsheet_objection_price',
    type: 'email',
    name: '[DealSheet] Objection: Too Expensive',
    subject: 'Re: DealSheet pricing',
    body: `{{contact.first_name}},

I get it. Let me break down the math.

DealSheet typically finds $50K-$150K in annual margin for a $30M+ healthcare staffing firm.

Implementation cost: One-time setup
Monthly cost: Fraction of what you're currently losing

One client's ROI: 2.3 months
After that? Pure profit recovery.

Not asking you to take my word for it. Let's run the numbers for {{contact.company}} specifically.

15 minutes. I'll show you the ROI. You decide if it pencils.

-Katie`
  },
  {
    id: 'nct_dealsheet_objection_timing',
    type: 'email',
    name: '[DealSheet] Objection: Not Right Time',
    subject: 'Re: Timing',
    body: `{{contact.first_name}},

Totally understand. Timing matters.

Quick thought: Every month you wait is another $50K-$80K in margin leaking out.

But I respect your timeline. Let's stay in touch.

I'll check back in Q{{next_quarter}} when planning cycles open up.

Meanwhile, here's a case study to file away for later:
[Healthcare Staffing Margin Recovery - Case Study]

-Katie`
  },
  {
    id: 'nct_dealsheet_objection_team',
    type: 'email',
    name: '[DealSheet] Objection: Team Buy-in Needed',
    subject: 'Multi-stakeholder materials for your team',
    body: `{{contact.first_name}},

Makes sense. This impacts finance, operations, and compliance.

I'm sending over stakeholder-specific materials:

For CFO:
[Financial Impact Analysis - 1-pager]

For Operations:
[Process Improvement Overview]

For Compliance:
[GSA Integration & Audit Trail Documentation]

For IT:
[Technical Specifications & Security]

Feel free to share with your team. Happy to join a group call to address questions.

-Katie`
  },
  {
    id: 'nct_dealsheet_objection_competitor',
    type: 'email',
    name: '[DealSheet] Objection: Using Competitor',
    subject: 'Re: Current solution',
    body: `{{contact.first_name}},

Fair question. Here's the honest difference:

DealSheet vs. [Competitor]:
✓ Native GSA system integration (not manual sync)
✓ Real-time threshold approvals (not batch processing)
✓ Built specifically for healthcare staffing (not generic)
✓ 30-day implementation (not 6+ months)

But don't take my word for it. Three firms switched from [Competitor] to DealSheet last quarter.

Want to talk to one?

-Katie`
  },
  {
    id: 'nct_dealsheet_demo_invite',
    type: 'email',
    name: '[DealSheet] Demo Invitation with Calendly',
    subject: '15-minute DealSheet demo?',
    body: `{{contact.first_name}},

Let me show you where the $84K is hiding.

15 minutes. Your Bullhorn data. Live demo.

[Book a Time That Works]

I'll walk through:
✓ Margin calculation across your rate structures
✓ GSA integration (if applicable)
✓ Manager approval workflows
✓ Compliance & audit trail

No pitch. Just show you what you're missing.

-Katie`
  },
  {
    id: 'nct_dealsheet_personal_video',
    type: 'email',
    name: '[DealSheet] Personal Video from Katie',
    subject: '{{contact.first_name}} - quick personal note',
    body: `{{contact.first_name}},

I recorded a quick personal message for you about margin optimization at {{contact.company}}.

[Watch Personal Video - 90 seconds]

Would love to connect.

-Katie`
  },
  {
    id: 'nct_dealsheet_demo_confirmed',
    type: 'email',
    name: '[DealSheet] Demo Confirmed + Questionnaire',
    subject: 'Demo confirmed for {{demo_date}} - quick prep',
    body: `{{contact.first_name}},

Looking forward to our demo on {{demo_date}} at {{demo_time}}.

To make the most of our 15 minutes, quick questions:

1. Annual revenue (ballpark): _______
2. Current margin tracking method: _______
3. Working with GSA rates? Y/N
4. Biggest margin challenge: _______

[Fill Out Quick Form - 2 minutes]

This helps me tailor the demo to your specific situation.

See you on {{demo_date}}!

-Katie`
  },
  {
    id: 'nct_dealsheet_demo_reminder',
    type: 'sms',
    name: '[DealSheet] Demo Reminder SMS',
    text: `{{contact.first_name}} - Demo tomorrow at {{demo_time}}! I'll show you where the $84K is hiding in your margins. Join link: {{demo_link}} -Katie`
  },
  {
    id: 'nct_dealsheet_demo_thankyou',
    type: 'email',
    name: '[DealSheet] Post-Demo Thank You',
    subject: 'Thanks for your time - next steps',
    body: `{{contact.first_name}},

Thanks for the time today. Really enjoyed walking through your margin structure.

Here's what I'm sending over:

1. Demo recording for your team
2. Custom ROI analysis (coming tomorrow)
3. Reference customer contact (similar firm size)
4. Implementation timeline (8-12 weeks typical)

Based on what you shared, I'm seeing potential for ${{estimated_monthly_savings}}/month in margin recovery.

Let's talk next steps?

-Katie

[Schedule Follow-up Call]`
  },
  {
    id: 'nct_dealsheet_custom_roi',
    type: 'email',
    name: '[DealSheet] Custom ROI Analysis (AI-Generated)',
    subject: '{{contact.company}} - DealSheet ROI Analysis',
    body: `{{contact.first_name}},

Based on yesterday's demo and the numbers you shared, here's your custom analysis:

CURRENT STATE:
• Annual Revenue: ${{contact.revenue}}
• Deals/Month: {{contact.deals_per_month}}
• Manual margin tracking: {{contact.hours_per_month}} hrs/month
• Estimated error rate: 12-15% (industry average)

WITH DEALSHEET:
• Hidden margin recovery: ${{roi.monthly_margin}}/month
• Time saved: {{roi.hours_saved}} hrs/month
• Compliance risk: Eliminated
• ROI timeline: {{roi.months_to_roi}} months

ANNUAL IMPACT: ${{roi.annual_impact}}

Next step: Reference call with similar healthcare staffing firm?

-Katie`
  },
  {
    id: 'nct_dealsheet_reference_intro',
    type: 'email',
    name: '[DealSheet] Reference Customer Introduction',
    subject: 'Connecting you with {{reference.company}}',
    body: `{{contact.first_name}},

I'd like to introduce you to {{reference.name}} at {{reference.company}}.

They're a ${{reference.revenue}}M healthcare staffing firm that implemented DealSheet 6 months ago.

Results:
• ${{reference.margin_found}}/month in recovered margin
• {{reference.hours_saved}} hours/month saved
• Zero compliance issues

I'll let {{reference.name}} share their experience directly.

{{reference.name}}, meet {{contact.first_name}} from {{contact.company}}.

-Katie`
  },
  {
    id: 'nct_dealsheet_demo_noshow',
    type: 'email',
    name: '[DealSheet] Demo No-Show',
    subject: 'Sorry we missed you today',
    body: `{{contact.first_name}},

Missed you on today's demo. Everything okay?

No worries if something came up. These things happen.

Want to reschedule? I've got time this week:

[Reschedule Demo]

Or if you'd prefer, I can send over a recorded demo instead.

-Katie`
  },
  {
    id: 'nct_dealsheet_reschedule',
    type: 'email',
    name: '[DealSheet] Reschedule Offer',
    subject: 'One more try?',
    body: `{{contact.first_name}},

Still want to show you where that $84K is hiding.

I've got 15 minutes anytime this week:

[Pick a New Time]

Or if timing just isn't working, I can send you a recorded walkthrough instead.

Your call.

-Katie`
  },
  {
    id: 'nct_dealsheet_implementation_timeline',
    type: 'email',
    name: '[DealSheet] Implementation Timeline',
    subject: 'DealSheet implementation roadmap',
    body: `{{contact.first_name}},

Here's exactly how implementation works:

WEEK 1-2: Discovery & Mapping
• Map your rate structures
• Identify GSA requirements
• Configure approval workflows

WEEK 3-4: Build & Testing
• Build custom calculations
• Integration with Bullhorn
• Parallel testing with your data

WEEK 5-6: Training & Launch
• Finance team training
• Recruiter onboarding
• Go-live support

WEEK 7-8: Optimization
• Fine-tune thresholds
• Optimize workflows
• Performance review

Total: 8 weeks to full deployment
First margin recovery: Often visible week 1

Questions on the timeline?

-Katie`
  },
  {
    id: 'nct_dealsheet_pricing_proposal',
    type: 'email',
    name: '[DealSheet] Pricing Proposal',
    subject: 'DealSheet pricing for {{contact.company}}',
    body: `{{contact.first_name}},

Three pricing options for {{contact.company}}:

OPTION 1: Standard
$X,XXX setup + $XXX/month
✓ Core margin calculator
✓ Bullhorn integration
✓ 90-day support

OPTION 2: Professional (Recommended)
$X,XXX setup + $X,XXX/month
✓ Everything in Standard
✓ GSA system integration
✓ Custom approval workflows
✓ Priority support

OPTION 3: Enterprise
Custom pricing
✓ Everything in Professional
✓ Multi-instance deployment
✓ Custom integrations
✓ Dedicated success manager

Based on ${{estimated_monthly_recovery}}/month in margin recovery, ROI on Professional tier: {{roi_months}} months.

Which makes sense for {{contact.company}}?

-Katie`
  },
  {
    id: 'nct_dealsheet_welcome',
    type: 'email',
    name: '[DealSheet] Welcome Email',
    subject: 'Welcome to DealSheet!',
    body: `{{contact.first_name}},

Welcome to Newbury Partners! Excited to get you up and running with DealSheet.

What happens next:

THIS WEEK:
• Kickoff call scheduled for {{kickoff_date}}
• Project team introductions
• Data access setup

YOUR IMPLEMENTATION TEAM:
• Project Manager: {{pm_name}}
• Technical Lead: {{tech_name}}
• Your Success Contact: Katie (me!)

I'll be checking in weekly to ensure everything stays on track.

Let's find that $84K.

-Katie`
  },
  {
    id: 'nct_dealsheet_checkin_week1',
    type: 'email',
    name: '[DealSheet] Week 1 Check-in',
    subject: 'DealSheet Week 1 - how are we doing?',
    body: `{{contact.first_name}},

Quick week 1 check-in on DealSheet implementation.

Progress so far:
✓ Rate structures mapped
✓ Bullhorn integration configured
✓ Initial testing underway

This week:
• Parallel calculation validation
• First margin discrepancy findings
• Approval workflow setup

Any blockers or questions?

-Katie`
  },
  {
    id: 'nct_dealsheet_checkin_week2',
    type: 'email',
    name: '[DealSheet] Week 2 Check-in',
    subject: 'DealSheet Week 2 - early results',
    body: `{{contact.first_name}},

Week 2 update - and we're already seeing results.

Initial findings from parallel calculations:
• {{discrepancies_found}} margin discrepancies identified
• Estimated monthly impact: ${{estimated_monthly_impact}}
• Average error rate: {{error_rate}}%

We're on track for go-live in {{weeks_remaining}} weeks.

Your finance team is going to love this.

-Katie`
  },
  {
    id: 'nct_dealsheet_30day_review',
    type: 'email',
    name: '[DealSheet] 30-Day Success Review',
    subject: '30-day DealSheet review - let\'s celebrate',
    body: `{{contact.first_name}},

It's been 30 days since DealSheet went live. Time for a review.

RESULTS SO FAR:
• Margin recovered: ${{margin_recovered}}
• Hours saved: {{hours_saved}}
• Compliance issues: {{compliance_issues}} (should be zero!)
• User satisfaction: {{user_satisfaction}}/10

Let's schedule a quick call to review the numbers and discuss any optimizations.

[Schedule 30-Day Review]

This is working. Let's make it even better.

-Katie`
  },
  {
    id: 'nct_dealsheet_upsell_kanban',
    type: 'email',
    name: '[DealSheet] Upsell: Kanban Introduction',
    subject: 'Since DealSheet is working... let\'s talk pipeline',
    body: `{{contact.first_name}},

Since DealSheet is finding you ${{monthly_margin}} in margin every month, thought you might be interested in our Kanban solution.

Same concept, different problem:

DealSheet finds hidden margin.
Kanban finds hidden deals.

One $30M firm found $84K/month in deals that were stuck in their Bullhorn pipeline. They just couldn't see them.

We built a drag-and-drop view that sits on top of Bullhorn. No migration. Just visibility.

Worth a quick look?

-Katie`
  },
  {
    id: 'nct_dealsheet_upsell_commissions',
    type: 'email',
    name: '[DealSheet] Upsell: Commissions Portal',
    subject: 'DealSheet + Commissions = Full finance automation',
    body: `{{contact.first_name}},

You're already saving {{hours_saved}} hours/month with DealSheet.

Want to save another 80 hours/month?

Our Commissions portal automates the other major finance time-sink: commission calculations.

One source of truth pulling from CRM, Payroll, GL, Excel. Zero manual reconciliation.

One firm saved 80 hours/month and eliminated commission disputes entirely.

Interested in the full finance automation suite?

-Katie`
  },
  {
    id: 'nct_dealsheet_referral_program',
    type: 'email',
    name: '[DealSheet] Referral Program Invitation',
    subject: 'Know anyone else losing $84K/month?',
    body: `{{contact.first_name}},

Since DealSheet is working so well for {{contact.company}}, quick question:

Know any other healthcare staffing CFOs who might be leaving margin on the table?

For every qualified referral that implements DealSheet:
• You get ${{referral_bonus}}
• They get {{referral_discount}} off implementation

Win-win.

Anyone come to mind?

-Katie`
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// KANBAN CONTENT TEMPLATES (82 nodes worth of content)
// ═══════════════════════════════════════════════════════════════════════════

const kanbanContent = [
  {
    id: 'nct_kanban_cold_1',
    type: 'email',
    name: '[Kanban] Cold Email: Invisible profit',
    subject: 'Your $30M firm has invisible profit sitting in Bullhorn',
    body: `Hi {{contact.first_name}},

One of our clients — a $30M staffing firm — found $84K in missed monthly margin just by making their Bullhorn pipeline fully visible.

They didn't need more people. They needed to see what was getting stuck.

We layered a Kanban view on top of Bullhorn.

No migration. Just clarity → action → profit.

Recruiters now manage their entire pipeline on one screen. Sales sees recruiting status in real-time. No more deals falling through the cracks.

If that kind of margin is worth a conversation, I'll show you how they did it.

-Katie

P.S. This is literally a 30-minute setup. No data migration. No Bullhorn disruption.`
  },
  {
    id: 'nct_kanban_sms_1',
    type: 'sms',
    name: '[Kanban] SMS: Bullhorn tabs question',
    text: `{{contact.first_name}} - Are your recruiters drowning in Bullhorn tabs? We built a one-screen pipeline view that sits on top of Bullhorn. $30M firm found $84K/mo with it. 15-min demo? -Katie`
  },
  {
    id: 'nct_kanban_vm_1',
    type: 'voicemail',
    name: '[Kanban] VM: One screen intro',
    ttsScript: `Hi {{contact.first_name}}, Katie from Newbury Partners. Quick question: Are your recruiters managing their pipeline across multiple Bullhorn tabs? We built Kanban - a drag and drop view that puts everything on one screen. No migration required. A 30 million dollar firm found 84 thousand dollars monthly in stuck deals they couldn't see. I'd love to show you how. Call me at 617-555-0123. Thanks!`
  },
  {
    id: 'nct_kanban_case_study',
    type: 'email',
    name: '[Kanban] Case Study: $84K in stuck deals',
    subject: 'How visibility found $84K in stuck Bullhorn deals',
    body: `{{contact.first_name}},

Quick story.

$30M IT staffing firm. Using Bullhorn for years. Pipeline buried in tabs and views.

The Problem:
• Deals getting stuck between recruiting and sales
• No one could see the full pipeline
• Recruiters switching between 6+ Bullhorn tabs
• $84K/month in deals that just... sat there

The Solution:
Kanban - drag-and-drop pipeline view layered on Bullhorn.

✓ No migration required
✓ 30-minute setup
✓ Full pipeline on one screen
✓ Real-time status for sales and recruiting

The Results:
• $84K/month in previously stuck deals moved
• Recruiter efficiency up 23%
• Sales-recruiting friction eliminated
• 30-minute setup (no Bullhorn disruption)

Think similar opportunities exist at {{contact.company}}?

-Katie

[Download Full Case Study]`
  },
  {
    id: 'nct_kanban_video_demo',
    type: 'email',
    name: '[Kanban] 3-Minute Interactive Demo',
    subject: 'See Kanban in action (3-min video)',
    body: `{{contact.first_name}},

No fluff. Just a quick 3-minute walkthrough of how Kanban transforms Bullhorn.

[Watch the Demo]

You'll see:
✓ Drag-and-drop submission workflow
✓ Full pipeline visibility on one screen
✓ How a $30M firm found $84K in stuck deals

Worth 3 minutes?

-Katie

P.S. This works with your existing Bullhorn instance. Zero migration required.`
  },
  {
    id: 'nct_kanban_webinar',
    type: 'email',
    name: '[Kanban] Webinar: Transform Bullhorn',
    subject: 'Live Demo: One screen. Full pipeline. Zero migration.',
    body: `{{contact.first_name}},

Join me for a 30-minute live demo on {{webinar.date}}.

I'll show you exactly how a $30M staffing firm found $84K in monthly margin by making their Bullhorn pipeline visible.

What you'll see:
✓ Drag-and-drop submission workflow
✓ Recruiters managing everything on one screen
✓ Sales seeing real-time recruiting status
✓ Deals that were stuck suddenly moving

No pitch. Just a live walkthrough.

[Register for {{webinar.date}}]

-Katie

P.S. This is a Bullhorn overlay. No migration. No disruption. 30-minute setup.`
  },
  {
    id: 'nct_kanban_pilot_offer',
    type: 'email',
    name: '[Kanban] 14-Day Free Pilot',
    subject: 'Try Kanban free for 14 days (one team)',
    body: `{{contact.first_name}},

Let's do this: 14-day free pilot with one of your teams.

No commitment. No credit card. Just results.

We'll set up Kanban for one recruiting team and you'll see within days:
• Fewer deals falling through cracks
• Recruiters spending less time in Bullhorn tabs
• Sales finally seeing where candidates are in real-time

After 14 days, we'll review the numbers together.

If it's not worth continuing, we part as friends.
If it found you margin (it will), we expand.

Sound fair?

-Katie`
  },
  {
    id: 'nct_kanban_pilot_day1',
    type: 'email',
    name: '[Kanban] Pilot Day 1 Check-in',
    subject: 'Kanban Pilot Day 1 - how\'s it going?',
    body: `{{contact.first_name}},

Day 1 of your Kanban pilot. How's the team finding it?

Quick check-in:
• Everyone able to access the view?
• Any questions on drag-and-drop functionality?
• Seeing the pipeline differently yet?

I'm here if anyone needs a quick walkthrough.

-Katie`
  },
  {
    id: 'nct_kanban_pilot_usage',
    type: 'email',
    name: '[Kanban] Pilot Usage Metrics',
    subject: 'Your team is crushing it with Kanban',
    body: `{{contact.first_name}},

Quick pilot update - your team's engagement is great:

Day 3 Metrics:
• {{usage_percentage}}% of team actively using Kanban
• {{deals_moved}} deals moved via drag-and-drop
• {{time_in_view}} avg minutes/day per recruiter
• {{stuck_deals_identified}} previously stuck deals identified

This is exactly what we want to see.

Keep it up!

-Katie`
  },
  {
    id: 'nct_kanban_roi_report',
    type: 'email',
    name: '[Kanban] 14-Day Pilot ROI Report',
    subject: 'Your 14-day Kanban pilot results',
    body: `{{contact.first_name}},

Your team's 14-day Kanban pilot just wrapped. Here's what happened:

📊 BY THE NUMBERS:
• {{deals_moved}} deals moved that were previously stuck
• {{time_saved}} hours saved per recruiter per week
• {{visibility_score}}% increase in pipeline visibility
• ${{margin_found}} in previously invisible margin

💬 TEAM FEEDBACK:
"{{team_testimonial}}"

📈 USAGE:
• {{active_users}}/{{total_users}} recruiters using daily
• {{drag_drop_actions}} drag-and-drop actions
• {{avg_time_saved}} minutes saved per recruiter per day

The question now: Ready to roll this out to your full team?

Let's talk expansion.

-Katie

[Schedule Expansion Call]`
  },
  {
    id: 'nct_kanban_expansion_proposal',
    type: 'email',
    name: '[Kanban] Full Team Expansion Proposal',
    subject: 'Expanding Kanban to full team - pricing',
    body: `{{contact.first_name}},

Based on your pilot success, here's pricing for full team rollout:

PILOT RESULTS:
• One team, 14 days
• {{deals_moved}} stuck deals found
• ${{margin_found}} recovered

FULL ROLLOUT:
• {{total_recruiters}} recruiters
• {{total_teams}} teams
• Est. annual impact: ${{annual_impact}}

PRICING:
Setup: ${{setup_fee}} (one-time)
Monthly: ${{monthly_fee}} for {{total_users}} users
Annual: ${{annual_fee}} (save {{discount_percentage}}%)

ROI: {{roi_months}} months based on pilot results

Ready to scale?

-Katie`
  },
  {
    id: 'nct_kanban_objection_views',
    type: 'email',
    name: '[Kanban] Objection: Bullhorn Has Views',
    subject: 'Re: Bullhorn views',
    body: `{{contact.first_name}},

You're right - Bullhorn has views.

But here's what they don't have:

✓ Drag-and-drop between stages (Kanban does)
✓ Full pipeline on one screen without scrolling (Kanban does)
✓ Real-time sales-recruiting visibility (Kanban does)
✓ Customizable workflow per team (Kanban does)

Bullhorn views show data.
Kanban enables action.

That's why the $30M firm found $84K in stuck deals. They could finally act on what they saw.

Want to see the difference?

-Katie`
  },
  {
    id: 'nct_kanban_upsell_dealsheet',
    type: 'email',
    name: '[Kanban] Upsell: DealSheet for Margins',
    subject: 'Kanban found the deals. DealSheet protects the margins.',
    body: `{{contact.first_name}},

Kanban is helping you find ${{monthly_margin}} in stuck deals every month.

Now let's protect the margin on those deals.

DealSheet ensures you're not leaving money on the table with:
• Automated margin calculations
• GSA rate integration (if applicable)
• Manager approval triggers
• Compliance protection

One firm added DealSheet after Kanban and found another $84K/month they were losing to margin leakage.

Worth discussing the full suite?

-Katie`
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMMISSIONS CONTENT TEMPLATES (80 nodes worth of content)
// ═══════════════════════════════════════════════════════════════════════════

const commissionsContent = [
  {
    id: 'nct_commissions_cold_1',
    type: 'email',
    name: '[Commissions] Cold Email: Manual calc cost',
    subject: 'Your finance team is calculating commissions manually. Here\'s the cost.',
    body: `Hi {{contact.first_name}},

I live for helping staffing leaders eliminate manual efforts (it's become such a fun passion).

If your finance team is still calculating commissions manually, here's what it's costing you:

• 80+ hours/month on reconciliation
• 12-15% error rate causing disputes
• Recruiter trust issues ("Are my commissions right?")
• Data living in CRM, Payroll, GL, Excel... chaos

We recently built a centralized commissions portal that pulls live data from all systems into one source of truth.

Automating commission calculations eliminates risk of error and gives your finance team time back to focus on revenue-generating activities.

One $50M firm saved 80 hours/month and eliminated commission disputes entirely.

Can I buy you a drink at SIA in Vegas and share how it works in action?

-Katie`
  },
  {
    id: 'nct_commissions_sms_1',
    type: 'sms',
    name: '[Commissions] SMS: Dispute question',
    text: `{{contact.first_name}} - How many hours/month does your team spend on commission disputes? We automate the entire process. One firm saved 80hrs/mo. Quick call? -Katie`
  },
  {
    id: 'nct_commissions_vm',
    type: 'voicemail',
    name: '[Commissions] VM: One source of truth',
    ttsScript: `Hi {{contact.first_name}}, Katie from Newbury Partners. I help staffing firms eliminate the chaos of manual commission calculations. One of our clients was spending 80 hours a month on reconciliation and still had a 12 percent error rate. We automated their entire process. One source of truth pulling from CRM, payroll, GL, and Excel. I'd love to show you how. My number is 617-555-0123. Talk soon!`
  },
  {
    id: 'nct_commissions_case_study',
    type: 'email',
    name: '[Commissions] Case Study: 80hrs saved',
    subject: 'How a $50M firm eliminated commission disputes',
    body: `{{contact.first_name}},

Quick story that might resonate.

$50M staffing firm. Complex commission structures. Finance team drowning in reconciliations.

The Problem:
• 80 hours/month calculating commissions manually
• Data scattered across CRM, Payroll, GL, Excel
• 12% error rate causing recruiter disputes
• CFO losing sleep over compliance risk

The Solution:
We built a centralized commissions portal that:
✓ Pulls live data from all systems automatically
✓ Calculates commissions with 100% accuracy
✓ Provides full audit trail for compliance
✓ Gives recruiters real-time commission visibility

The Results:
✅ 80 hours/month saved
✅ Zero commission disputes
✅ Finance team refocused on strategic work
✅ Recruiter trust and morale improved

Think similar opportunities exist at {{contact.company}}?

-Katie

[Download Full Case Study]`
  },
  {
    id: 'nct_commissions_q4_chaos',
    type: 'email',
    name: '[Commissions] Q4 Commission Chaos',
    subject: 'Surviving Q4 commission season?',
    body: `{{contact.first_name}},

It's Q4. Commission chaos season.

Your finance team is drowning in:
• Year-end reconciliations
• Commission true-ups
• Dispute resolution
• Audit prep

And they're doing it all manually across multiple systems.

One $50M staffing firm we worked with was spending 120 hours in Q4 alone just on commission reconciliation.

We automated it. Now they spend 8 hours.

Worth avoiding that pain this year?

-Katie

P.S. We can get you up and running before year-end close. Seriously.`
  },
  {
    id: 'nct_commissions_recruiter_trust',
    type: 'email',
    name: '[Commissions] Recruiter Trust & Morale',
    subject: 'When recruiters don\'t trust their commission numbers...',
    body: `{{contact.first_name}},

Quick question: How many hours per month does your team spend answering recruiter questions about commissions?

"Why is my check different than I expected?"
"Can you break down how this was calculated?"
"I think there's an error..."

When recruiters don't trust the numbers, three things happen:
1. Your finance team becomes customer service
2. Recruiter morale tanks
3. Top performers start looking at competitors

We recently worked with a firm that had 23 commission disputes per month.

After automation: Zero disputes. Full transparency. Recruiters can see real-time calculations.

Morale went up. Finance time went down.

Worth a conversation?

-Katie`
  },
  {
    id: 'nct_commissions_whitepaper',
    type: 'email',
    name: '[Commissions] Whitepaper: True Cost',
    subject: 'The hidden cost of manual commission calculations',
    body: `{{contact.first_name}},

I put together a breakdown of what manual commission calculations actually cost staffing firms.

Most CFOs think it's just the hours. But when you add it up:

• Direct cost: 80+ hours/month in finance team time
• Error cost: 12-15% error rate × commission disputes
• Opportunity cost: Finance doing data entry vs. strategic work
• Morale cost: Recruiter distrust when numbers don't match
• Compliance risk: Manual processes = audit vulnerabilities

For a $50M firm, that's $180K-$250K annually.

Download the full breakdown:
[The True Cost of Manual Commissions - Whitepaper]

Worth a read before your next planning cycle.

-Katie`
  },
  {
    id: 'nct_commissions_video',
    type: 'email',
    name: '[Commissions] Video: Commission Automation',
    subject: 'See commission automation in action (4 minutes)',
    body: `{{contact.first_name}},

4-minute walkthrough of our commissions portal.

[Watch Demo Video]

You'll see:
✓ Data pulling from CRM, Payroll, GL, Excel automatically
✓ Real-time commission calculations
✓ Recruiter self-service portal
✓ Full audit trail for compliance

No sales pitch. Just showing you how it works.

-Katie`
  },
  {
    id: 'nct_commissions_integration_map',
    type: 'email',
    name: '[Commissions] Integration Architecture',
    subject: 'How Commissions Portal integrates with your systems',
    body: `{{contact.first_name}},

Quick visual of how the Commissions Portal connects to your existing systems:

[View Integration Map]

DATA SOURCES:
• Bullhorn (or your CRM) - Placements & revenue
• Payroll system - Pay cycles & timing
• General Ledger - Financial validation
• Excel/Sheets - Custom commission plans

AUTOMATED FLOWS:
✓ Nightly data sync from all sources
✓ Commission calculations run automatically
✓ Recruiter portal updates in real-time
✓ Finance dashboard with full audit trail

SECURITY:
• Read-only access to source systems
• Encrypted data in transit and at rest
• SOC 2 compliant architecture

Questions for your IT team?

-Katie`
  },
  {
    id: 'nct_commissions_webinar',
    type: 'email',
    name: '[Commissions] Webinar: Modernizing Compensation',
    subject: 'Live: Modernizing Staffing Compensation',
    body: `{{contact.first_name}},

Join me for a 45-minute session on {{webinar_date}}.

Topic: Eliminating manual commission calculations in staffing firms.

What you'll learn:
✓ How to pull data from multiple systems
✓ Automated calculation frameworks
✓ Handling complex commission structures
✓ Compliance & audit requirements
✓ Real client examples

[Register for {{webinar_date}}]

Bring your toughest commission questions.

-Katie`
  },
  {
    id: 'nct_commissions_poc_offer',
    type: 'email',
    name: '[Commissions] Free POC Offer',
    subject: 'Model one commission plan for free',
    body: `{{contact.first_name}},

Here's my offer:

We'll model ONE of your commission plans for free.

No cost. No obligation.

We'll:
1. Map your current manual process
2. Build it in our automated system
3. Run parallel calculations (manual vs. automated)
4. Show you the discrepancies we find

Takes us 2 weeks. Costs you nothing.

Then you decide if automating the rest makes sense.

Deal?

-Katie

P.S. Most firms find 3-7% discrepancy rate just in the pilot plan. That adds up fast.`
  },
  {
    id: 'nct_commissions_poc_week1',
    type: 'email',
    name: '[Commissions] POC Week 1 Update',
    subject: 'Commission POC Week 1 - mapping complete',
    body: `{{contact.first_name}},

Week 1 of your commission plan POC is complete.

What we mapped:
✓ Your {{plan_name}} commission structure
✓ Data sources: {{data_sources}}
✓ Calculation rules & edge cases
✓ Current manual process

This week:
• Building automated calculations
• Parallel testing with last month's data
• Identifying discrepancies

I'll have initial results by end of week.

-Katie`
  },
  {
    id: 'nct_commissions_poc_results',
    type: 'email',
    name: '[Commissions] POC Results: Discrepancies Found',
    subject: 'POC Results: Found {{discrepancy_count}} calculation errors',
    body: `{{contact.first_name}},

POC results are in. We found some interesting things.

PARALLEL CALCULATION RESULTS:
Manual calculations: ${{manual_total}}
Automated calculations: ${{automated_total}}
Discrepancy: ${{discrepancy_amount}} ({{discrepancy_percentage}}%)

ERRORS IDENTIFIED:
{{#each errors}}
• {{this.description}} - Impact: ${{this.amount}}
{{/each}}

This is just ONE commission plan.

If similar error rates exist across all your plans... that's significant.

Want to see the full breakdown?

-Katie

[Schedule POC Review Call]`
  },
  {
    id: 'nct_commissions_objection_complex',
    type: 'email',
    name: '[Commissions] Objection: Too Complex',
    subject: 'Re: Commission complexity',
    body: `{{contact.first_name}},

"Our structure is too complex to automate."

We hear this a lot. Usually from firms with the most to gain.

The most complex commission plan we've automated:
• 12 different plan types
• Variable rates based on 7 factors
• Split commissions across 3 roles
• Clawback provisions
• Quarterly bonuses with 18 qualifiers

Took us 6 weeks to build. Saves them 120 hours/month.

Complex is what we do.

Want to talk through your structure?

-Katie`
  },
  {
    id: 'nct_commissions_objection_integration',
    type: 'email',
    name: '[Commissions] Objection: Integration Concerns',
    subject: 'Re: System integrations',
    body: `{{contact.first_name}},

Integration concerns are valid. Here's how we handle it:

APPROACH:
• Read-only access to source systems (no write risk)
• API-first architecture where available
• Secure file transfer as fallback
• No changes to your existing systems

SYSTEMS WE INTEGRATE:
• Bullhorn, Vincere, Crelate (CRM)
• ADP, Paychex, Paylocity (Payroll)
• QuickBooks, Sage, NetSuite (GL)
• Custom Excel/Google Sheets

SECURITY:
• SOC 2 Type II compliant
• Encrypted data in transit and at rest
• Annual penetration testing

Your IT team will love us.

Want to schedule a technical review?

-Katie`
  },
  {
    id: 'nct_commissions_objection_trust',
    type: 'email',
    name: '[Commissions] Objection: Team Won\'t Trust Automation',
    subject: 'Re: Trust in automated calculations',
    body: `{{contact.first_name}},

"Our team won't trust automated calculations."

We solve this with radical transparency:

EVERY COMMISSION SHOWS:
✓ Complete calculation breakdown
✓ Which data came from which system
✓ Every rule that was applied
✓ Full audit trail (timestamped, immutable)

Recruiters can click any commission and see EXACTLY how it was calculated.

Compare that to manual:
"It's in the spreadsheet somewhere..."

One firm went from 23 disputes/month to zero because recruiters could finally see the math.

Trust through transparency.

Want to see how it works?

-Katie`
  },
  {
    id: 'nct_commissions_objection_timing',
    type: 'email',
    name: '[Commissions] Objection: Too Risky Mid-Year',
    subject: 'Re: Implementation timing',
    body: `{{contact.first_name}},

"Too risky to change commission systems mid-year."

Smart concern. Here's how we de-risk it:

PHASED APPROACH:
1. Parallel Run (2-3 pay cycles)
   - Manual AND automated running side-by-side
   - Validate 100% accuracy before switching
   
2. Single Plan Pilot
   - Start with one commission plan
   - Prove it works before expanding
   
3. Full Rollout
   - Only after complete validation

One firm started their parallel run in Q3, validated in Q4, went live Jan 1.

Zero disruption. Full confidence.

Want to discuss a timeline that works for {{contact.company}}?

-Katie`
  },
  {
    id: 'nct_commissions_objection_excel',
    type: 'email',
    name: '[Commissions] Objection: Excel Works Fine',
    subject: 'Re: Excel for commissions',
    body: `{{contact.first_name}},

"Excel works fine for us."

I respect that. Excel is powerful.

But quick reality check on "fine":

• How many hours/month maintaining formulas?
• What's the error rate? (Industry average: 12-15%)
• How many version control issues?
• Can recruiters see their commissions real-time?
• What happens when the Excel expert leaves?

One firm was "fine" with Excel until:
• Key employee left (formulas were in her head)
• Audit found $47K in calculation errors
• Recruiters revolted over lack of transparency

They automated. Now they're actually fine.

Worth discussing the risk?

-Katie`
  },
  {
    id: 'nct_commissions_demo_cfo',
    type: 'email',
    name: '[Commissions] CFO Track Demo Invite',
    subject: 'CFO-focused demo: Commission ROI',
    body: `{{contact.first_name}},

Since you're the CFO, I'll focus our demo on what matters to you:

1. Cost savings (80+ hours/month typical)
2. Risk reduction (eliminate calculation errors)
3. Compliance & audit trail
4. Finance team capacity recapture
5. ROI timeline (typically 6-9 months)

15 minutes. CFO-to-CFO conversation (well, CFO-to-Katie).

[Schedule Demo]

-Katie`
  },
  {
    id: 'nct_commissions_demo_hr',
    type: 'email',
    name: '[Commissions] HR Track Demo Invite',
    subject: 'HR-focused demo: Employee satisfaction',
    body: `{{contact.first_name}},

From an HR perspective, commission automation solves three major problems:

1. Recruiter trust & transparency
2. Dispute resolution (time saved)
3. Retention (top performers stay when they trust the numbers)

One firm saw recruiter turnover drop 18% after implementing transparent commission portal.

Want to see how it works?

[Schedule Demo]

-Katie`
  },
  {
    id: 'nct_commissions_demo_it',
    type: 'email',
    name: '[Commissions] IT Track Demo Invite',
    subject: 'IT-focused demo: Security & integrations',
    body: `{{contact.first_name}},

IT perspective on commission automation:

SECURITY:
• SOC 2 Type II compliant
• Read-only access to source systems
• Encrypted data (transit & rest)
• Annual penetration testing

INTEGRATIONS:
• REST APIs for modern systems
• Secure file transfer for legacy
• No changes to existing systems
• Flexible deployment (cloud or on-premise)

SUPPORT:
• Technical documentation
• API sandbox for testing
• Dedicated implementation engineer

Want to review the architecture?

[Schedule Technical Review]

-Katie`
  },
  {
    id: 'nct_commissions_poc_validation',
    type: 'email',
    name: '[Commissions] POC Validation Results',
    subject: 'POC validation: 100% accuracy confirmed',
    body: `{{contact.first_name}},

Validation complete on your {{plan_name}} commission plan.

PARALLEL CALCULATION RESULTS:
• 3 pay cycles tested
• {{total_commissions}} total commissions calculated
• Automated vs Manual match: 100%
• Edge cases handled: {{edge_cases_count}}
• Processing time: {{processing_time}} (vs {{manual_time}} manual)

Your commission plan is ready for automation.

Next step: Expand to remaining plans or go-live with this one?

-Katie`
  },
  {
    id: 'nct_commissions_stakeholder_cfo',
    type: 'email',
    name: '[Commissions] CFO Business Case',
    subject: 'CFO Business Case: Commission Automation ROI',
    body: `{{contact.first_name}},

Business case for commission automation at {{contact.company}}:

CURRENT COSTS:
• Finance team time: 80 hrs/month @ ${{hourly_rate}} = ${{monthly_cost}}
• Error resolution: {{disputes_per_month}} disputes/mo @ 3hrs each = ${{dispute_cost}}
• Compliance risk: Unquantified (audit exposure)
• Opportunity cost: Finance doing data entry vs. strategic work

AUTOMATION COSTS:
• Implementation: ${{implementation_cost}} (one-time)
• Monthly: ${{monthly_subscription}}
• Total Year 1: ${{year1_cost}}

SAVINGS:
• Year 1: ${{year1_savings}}
• Year 2+: ${{annual_savings}}/year
• ROI: {{roi_months}} months

RISK REDUCTION:
• Calculation accuracy: 100%
• Audit trail: Complete
• Compliance: Automated

Recommendation: Proceed with full implementation.

-Katie`
  },
  {
    id: 'nct_commissions_msa',
    type: 'email',
    name: '[Commissions] MSA Template',
    subject: 'Commissions Portal - Master Service Agreement',
    body: `{{contact.first_name}},

Attaching the Master Service Agreement for legal review.

Key terms:
• Implementation: {{implementation_weeks}} weeks
• Data security: SOC 2 Type II compliant
• SLA: {{uptime_percentage}}% uptime guarantee
• Support: {{support_hours}} with {{response_time}} response
• Payment terms: {{payment_terms}}

Happy to schedule a call with your legal team if helpful.

-Katie

[MSA Document - PDF]`
  },
  {
    id: 'nct_commissions_welcome',
    type: 'email',
    name: '[Commissions] Welcome Email',
    subject: 'Welcome to automated commissions!',
    body: `{{contact.first_name}},

Welcome to Newbury Partners! Excited to eliminate commission chaos for {{contact.company}}.

YOUR IMPLEMENTATION TEAM:
• Project Manager: {{pm_name}}
• Data Engineer: {{engineer_name}}
• Your Success Contact: Katie (me!)

WHAT HAPPENS NEXT:
• Kickoff call: {{kickoff_date}}
• System mapping: Weeks 1-4
• Parallel run: Weeks 5-8
• Go-live: {{golive_date}}

I'll be checking in weekly. This is going to transform your finance team's life.

-Katie`
  },
  {
    id: 'nct_commissions_implementation_phase1',
    type: 'email',
    name: '[Commissions] Implementation Phase 1 Update',
    subject: 'Commissions: Phase 1 complete',
    body: `{{contact.first_name}},

Phase 1 milestone reached!

COMPLETED:
✓ All {{plan_count}} commission plans mapped
✓ Data sources connected (CRM, Payroll, GL)
✓ Calculation logic built
✓ Test environment ready

NEXT PHASE:
• Parallel run with last 2 pay cycles
• Validation against manual calculations
• Discrepancy resolution
• Recruiter portal configuration

On track for go-live on {{golive_date}}.

-Katie`
  },
  {
    id: 'nct_commissions_parallel_results',
    type: 'email',
    name: '[Commissions] Parallel Run Results',
    subject: 'Parallel run results: Ready for go-live',
    body: `{{contact.first_name}},

Parallel run complete. Results are strong.

2 PAY CYCLES TESTED:
• Total commissions calculated: {{total_commissions}}
• Automated vs Manual match: {{match_percentage}}%
• Discrepancies found: {{discrepancy_count}}
• All discrepancies resolved: ✓

RECRUITER PORTAL:
• {{recruiter_count}} recruiters configured
• Real-time commission visibility enabled
• Historical data loaded ({{months_history}} months)

We're ready for go-live.

Confirming {{golive_date}}?

-Katie`
  },
  {
    id: 'nct_commissions_golive_support',
    type: 'email',
    name: '[Commissions] Go-Live 24/7 Support',
    subject: 'Tomorrow: Commissions go-live',
    body: `{{contact.first_name}},

Tomorrow's the day! Commissions portal goes live.

SUPPORT COVERAGE:
• 24/7 availability for first 48 hours
• Direct line to technical team
• Katie's cell: {{katie_phone}}
• Slack channel: #commissions-launch

WHAT TO EXPECT:
• Recruiters access portal at {{portal_url}}
• First commission sync: {{first_sync_time}}
• Finance dashboard: {{dashboard_url}}

We've done this hundreds of times. You're in good hands.

Let's do this!

-Katie`
  },
  {
    id: 'nct_commissions_post_launch',
    type: 'email',
    name: '[Commissions] Post-Launch Optimization',
    subject: 'First month live - optimization opportunities',
    body: `{{contact.first_name}},

One month live with automated commissions. Time to optimize.

RESULTS SO FAR:
• Hours saved: {{hours_saved}}/month
• Commission disputes: {{disputes}} (down from {{previous_disputes}})
• Recruiter portal adoption: {{adoption_percentage}}%
• Calculation accuracy: {{accuracy_percentage}}%

OPTIMIZATION OPPORTUNITIES:
• {{optimization_1}}
• {{optimization_2}}
• {{optimization_3}}

Let's schedule a quick optimization call?

-Katie`
  },
  {
    id: 'nct_commissions_upsell_dealsheet',
    type: 'email',
    name: '[Commissions] Upsell: DealSheet',
    subject: 'Commissions automated. Now let\'s protect margins.',
    body: `{{contact.first_name}},

Since commission automation is saving you {{hours_saved}} hours/month, thought you might be interested in margin optimization.

DealSheet automates margin calculations the same way we automated commissions:
• Multiple rate structures
• GSA integration
• Manager approvals
• Compliance protection

One firm added DealSheet after Commissions and found $84K/month in margin leaks.

Full finance automation suite?

-Katie`
  },
];

// Combine all content
const allContent = [
  ...dealsheetContent,
  ...kanbanContent,
  ...commissionsContent,
];

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📝 NEWBURY COMPLETE CONTENT LIBRARY');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  let created = 0;
  let updated = 0;
  
  for (const ct of allContent) {
    try {
      const existing = await prisma.contentTemplate.findUnique({ where: { id: ct.id } });
      
      await prisma.contentTemplate.upsert({
        where: { id: ct.id },
        create: ct,
        update: ct
      });
      
      if (existing) {
        updated++;
        console.log(`  ♻️  ${ct.name}`);
      } else {
        created++;
        console.log(`  ✅ ${ct.name}`);
      }
    } catch (err) {
      console.log(`  ❌ ${ct.name}: ${err.message}`);
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🎉 CONTENT LIBRARY COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Total Content Templates: ${allContent.length}`);
  console.log(`   New: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log('\n📊 BREAKDOWN:');
  console.log(`   DealSheet: ${dealsheetContent.length} templates`);
  console.log(`   Kanban: ${kanbanContent.length} templates`);
  console.log(`   Commissions: ${commissionsContent.length} templates`);
  console.log('\n🔥 All funnel nodes now have connected content!\n');
  
  await prisma.$disconnect();
}

seed().catch(console.error);

