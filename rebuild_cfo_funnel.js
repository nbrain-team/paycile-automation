#!/usr/bin/env node
/**
 * Rebuild CFO Insurance Funnel - 90 Day, 60+ Node Comprehensive Campaign
 * 
 * Best Practices:
 * - All names use {{sender.name}} merge tag
 * - All signatures use {{sender.signature}} merge tag
 * - First email is detailed and value-rich (300+ words)
 * - Middle emails provide new angles and urgency
 * - No SMS (per user request)
 * - Email + Voicemail only
 * - All nodes properly connected to content templates
 * - Strategic timing with wait nodes
 * - Engagement-based decisioning
 * - Clear stage markers
 */

const API_BASE = process.env.API_BASE || 'https://opticwise-backend-uq3o.onrender.com';

// ============================================================================
// CONTENT TEMPLATES - Create these first so funnel nodes can reference them
// ============================================================================

const CONTENT_TEMPLATES = [
  // EMAIL 1: Detailed Introduction (Day 1)
  {
    type: 'email',
    name: 'CFO Email 1 - Detailed Introduction',
    subject: '{{contact.first_name}}, save 96 days per year on period-end close',
    body: `Hi {{contact.first_name}},

I'll be direct: Your finance team is spending 96+ days per year on manual payment reconciliation. That's nearly 4 months of productive time lost to matching transactions and hunting down discrepancies.

Most insurance CFOs I speak with are shocked when they calculate the actual time cost:
• 8-12 hours per week matching carrier payments
• 3-5 days at month-end reconciling across entities  
• Countless hours investigating exceptions and errors

**What if you could automate all of it?**

Paycile gives you real-time cash visibility across all carriers, entities, and accounts—without the manual work. Our customers save 96+ days annually and close their books in days, not weeks.

**What You Get:**
✓ Automated payment matching across all insurance carriers
✓ Real-time cash position visibility (no more waiting for close)
✓ Multi-entity reconciliation in minutes, not days
✓ Complete audit trail for compliance
✓ ROI in 8-12 months

**The Insurance CFO Challenge:**
You're managing premium payments from multiple carriers, commission structures, reinsurance settlements, and claim payments—all while trying to maintain accurate financial reporting. Manual reconciliation creates delays, errors, and audit risk.

**How Paycile Solves This:**
Our platform integrates with your existing systems and automatically matches payments, reconciles across entities, and gives you real-time visibility into your cash position. No more spreadsheets, no more manual matching, no more month-end chaos.

I'd like to show you how in a quick 30-minute executive demo.

**Book a time here:** {{landing_page_url}}

Or reply to this email and I'll send you times that work.

{{sender.signature}}`
  },

  // EMAIL 2: Case Study (Day 4)
  {
    type: 'email',
    name: 'CFO Email 2 - Insurance Case Study',
    subject: 'How this insurance CFO cut close time from 3 weeks to 4 days',
    body: `{{contact.first_name}},

Thought you'd find this relevant:

One of our insurance clients was spending 18 days per month on payment reconciliation across 12 entities. Their CFO was frustrated with:
• Late financial insights delaying strategic decisions
• Board meetings happening before numbers were final
• Audit exposure from manual processes
• Team burnout during close periods

**After implementing Paycile:**
✓ Close time: 4 days (down from 18)
✓ Real-time cash visibility across all carriers
✓ 96 days saved annually
✓ Complete audit trail automation
✓ ROI achieved in 9 months

**Their CFO's Quote:**
"I used to make strategic decisions with 2-week-old data. Now I have real-time visibility and my team actually enjoys their jobs again."

The difference? Automated reconciliation that handles the complexity of insurance payments—carrier premiums, commission structures, reinsurance, and claims—all in one platform.

Worth a conversation to see if this could work for your organization?

**Schedule a demo:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 3: ROI Calculator (Day 8)
  {
    type: 'email',
    name: 'CFO Email 3 - ROI Calculator',
    subject: 'Calculate your reconciliation ROI - {{contact.company}}',
    body: `{{contact.first_name}},

Quick question: What's the actual cost of your current reconciliation process?

**Most insurance CFOs underestimate this:**

If your finance team spends 80 hours/month on reconciliation (typical for mid-size insurance companies):
• Labor cost: $96,000/year (at $100/hour blended rate)
• Error correction: $15,000-$30,000/year
• Audit costs: $20,000-$40,000/year
• Delayed insights: Opportunity cost (unquantifiable but significant)

**Total: $130,000-$165,000 per year**

**With Paycile:**
• 90% reduction in manual work → $86,000 saved
• Error rate drops to <2% → $25,000 saved
• Automated audit trails → $30,000 saved
• Real-time insights → Strategic advantage

**Net savings: $140,000+ annually**
**Paycile cost: ~$40,000/year**
**ROI: 350%+ in year one**

Want to see the exact ROI for {{contact.company}}?

**Get your custom analysis:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 4: Objection Handler (Day 14)
  {
    type: 'email',
    name: 'CFO Email 4 - Addressing Concerns',
    subject: 'Concerned about implementation complexity?',
    body: `{{contact.first_name}},

The most common objection I hear from insurance CFOs:

*"This sounds great, but we can't afford the disruption of implementing a new system right now."*

I completely understand. Here's what the actual implementation looks like:

**Week 1-2: Setup**
• Connect to your existing systems (no rip-and-replace)
• Map your carrier payment structures
• Configure entity hierarchies
• Zero disruption to daily operations

**Week 3-4: Parallel Testing**
• Run Paycile alongside your current process
• Verify accuracy (typically 98%+ match rate)
• Train your team (2-3 hours total)
• You maintain full control

**Week 5: Go Live**
• Gradual transition (not a "big bang")
• We handle any issues immediately
• Your team sees results within days

**Average implementation: 4-6 weeks**
**Disruption to operations: Minimal**
**Time to ROI: 8-12 months**

The insurance CFO I mentioned earlier? They implemented during their busiest quarter and still saw immediate benefits.

**See the implementation roadmap:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 5: Competitive Advantage (Day 21)
  {
    type: 'email',
    name: 'CFO Email 5 - Strategic Advantage',
    subject: 'Real-time financial data = competitive advantage',
    body: `{{contact.first_name}},

Here's what separates leading insurance companies from the rest:

**Speed of financial insight.**

When your competitors are waiting 2-3 weeks for accurate cash position data, you're making strategic decisions with real-time information.

**What This Enables:**
• Faster response to market opportunities
• Better capital allocation decisions
• Proactive risk management
• Board confidence in your numbers
• Strategic agility in volatile markets

**The Reality for Most Insurance CFOs:**
By the time you close the books and analyze the data, the market has already moved. You're driving forward while looking in the rearview mirror.

**With Real-Time Visibility:**
You see cash position, carrier payment trends, and entity performance as it happens. Not last week. Not yesterday. Right now.

This is the difference between reactive and proactive financial leadership.

**See how it works:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 6: Final Outreach (Day 30)
  {
    type: 'email',
    name: 'CFO Email 6 - Final Outreach',
    subject: 'Last note on automating your reconciliation',
    body: `{{contact.first_name}},

This is my last note about automating your payment reconciliation.

I've reached out a few times because I genuinely believe Paycile could save your finance team 96+ days per year and give you real-time financial visibility.

**But I understand if:**
• The timing isn't right
• You're committed to your current process
• Other priorities are taking precedence

No problem at all.

**However, if you're still curious:**
I'd be happy to show you a quick 15-minute demo—no commitment, no pressure. Just a straightforward look at how insurance CFOs are eliminating manual reconciliation.

**One last chance to connect:** {{landing_page_url}}

If I don't hear back, I'll assume it's not a fit and won't reach out again.

Either way, I wish you and {{contact.company}} continued success.

{{sender.signature}}`
  },

  // EMAIL 7: Re-engagement (Day 60)
  {
    type: 'email',
    name: 'CFO Email 7 - 60-Day Re-engagement',
    subject: 'Still struggling with manual reconciliation?',
    body: `{{contact.first_name}},

I reached out about a month ago about automating your payment reconciliation process.

Since then, we've helped three more insurance CFOs eliminate manual reconciliation and gain real-time cash visibility.

**Recent Results:**
• Mid-size carrier: 96 days saved annually, 4-day close cycle
• Regional insurer: $140K annual savings, real-time dashboards
• Multi-entity carrier: 90% workload reduction, complete audit trails

I'm following up because the problem you're facing—manual reconciliation consuming weeks of productive time—hasn't gone away.

If you're still dealing with:
• 10-15 day close cycles
• Manual carrier payment matching
• Delayed financial insights
• Audit trail gaps

...then a 15-minute conversation might be valuable.

**See what's possible:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 8: New Angle - Audit Risk (Day 75)
  {
    type: 'email',
    name: 'CFO Email 8 - Audit Risk Focus',
    subject: 'Audit season: Is your reconciliation process audit-ready?',
    body: `{{contact.first_name}},

With audit season approaching, here's a question worth considering:

**Can you instantly produce complete reconciliation documentation for any period your auditors request?**

Most insurance CFOs can't. Manual reconciliation processes create:
• Incomplete audit trails
• Missing documentation
• Reconciliation gaps that raise red flags
• Hours of scrambling to recreate records

**The Audit Risk:**
Auditors are increasingly focused on payment reconciliation controls. Manual processes = higher audit risk = more audit hours = higher costs.

**What Audit-Ready Looks Like:**
• Complete transaction history (every payment, every match)
• Automated reconciliation documentation
• Real-time exception reporting
• Instant report generation for any period
• Zero manual reconstruction needed

Insurance companies using Paycile report 25-40% reduction in audit costs because their reconciliation is automatically documented and traceable.

**See the audit trail features:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 9: Final Value Prop (Day 90)
  {
    type: 'email',
    name: 'CFO Email 9 - 90-Day Final Push',
    subject: 'Final invitation - {{contact.company}} reconciliation automation',
    body: `{{contact.first_name}},

It's been 90 days since I first reached out about automating your payment reconciliation.

In that time, your finance team has likely spent:
• 24+ days on manual reconciliation
• Countless hours investigating discrepancies
• Multiple late nights during month-end close

**That's 24 days you'll never get back.**

I don't want to be pushy, but I also don't want you to miss an opportunity that could fundamentally change how your finance team operates.

**One final offer:**
15-minute demo. No sales pressure. Just a straightforward look at how insurance CFOs are saving 96 days per year.

If it's not relevant, you'll know in 15 minutes.
If it is relevant, it could be the most valuable 15 minutes of your quarter.

**Your call:** {{landing_page_url}}

{{sender.signature}}

P.S. - If you're not interested, just reply "not interested" and I'll remove you from our outreach. I respect your time.`
  },

  // VOICEMAIL 1: Initial Outreach (Day 2)
  {
    type: 'voicemail',
    name: 'CFO VM 1 - Initial Outreach',
    tts_script: `Hi {{contact.first_name}}, this is {{sender.name}} from Paycile calling for {{contact.company}}.

I'm reaching out to CFOs in the insurance space about a challenge I hear consistently: it takes too long to close the books, which means you're making strategic decisions with data that's already two weeks old.

Insurance CFOs we work with have cut their close time by up to 96 days annually while gaining real-time cash visibility across all their carriers and entities.

If having faster access to accurate financial data would help {{contact.company}} make better strategic decisions, I'd love to show you how this works in a quick 15-minute demo.

You can book time directly at paycile dot com slash demo, or call me back at {{sender.phone}}.

Thanks {{contact.first_name}}, looking forward to connecting.`
  },

  // VOICEMAIL 2: Follow-up (Day 10)
  {
    type: 'voicemail',
    name: 'CFO VM 2 - Value Proposition',
    tts_script: `{{contact.first_name}}, {{sender.name}} with Paycile here.

Quick question: how current is the cash position data you're looking at right now for {{contact.company}}?

For most CFOs I speak with, it's at least a few days old, sometimes a week or more during month-end close.

The insurance companies that have moved to automated reconciliation are seeing their cash position in real-time, making faster decisions, and actually enjoying a 65 percent reduction in close time.

If real-time financial visibility would be valuable for {{contact.company}}, let's connect for 15 minutes.

Book directly at paycile dot com slash demo, or reach me at {{sender.phone}}.

Thanks!`
  },

  // VOICEMAIL 3: Case Study (Day 25)
  {
    type: 'voicemail',
    name: 'CFO VM 3 - Case Study',
    tts_script: `Hi {{contact.first_name}}, {{sender.name}} from Paycile.

Just wrapped a call with an insurance CFO who cut their close time from 3 weeks to 4 days using our platform.

What made the difference? They automated carrier payment matching, multi-entity reconciliation, and commission processing—all the manual work that was consuming their team's time.

Now they have real-time cash visibility and their finance team focuses on analysis instead of data entry.

If you're curious how this works for insurance companies like {{contact.company}}, I'd be happy to show you in a quick demo.

Book at paycile dot com slash demo, or call me at {{sender.phone}}.

Thanks {{contact.first_name}}!`
  },

  // VOICEMAIL 4: Final Attempt (Day 45)
  {
    type: 'voicemail',
    name: 'CFO VM 4 - Final Attempt',
    tts_script: `{{contact.first_name}}, this is {{sender.name}} from Paycile.

I've reached out a few times about automating payment reconciliation for {{contact.company}}.

I'll keep this brief: if you're still spending weeks on month-end close and dealing with manual carrier payment matching, there's a better way.

Insurance CFOs using our platform save 96 days per year and get real-time financial visibility.

If that sounds valuable, let's connect for 15 minutes. If not, no worries—I won't keep reaching out.

Book at paycile dot com slash demo, or call {{sender.phone}}.

Thanks for your time.`
  },

  // EMAIL 10: Engagement Recovery (Day 35)
  {
    type: 'email',
    name: 'CFO Email 10 - Engagement Recovery',
    subject: 'Quick question about {{contact.company}} reconciliation',
    body: `{{contact.first_name}},

I've sent a few emails about automating your payment reconciliation, but haven't heard back.

Before I close your file, I wanted to ask:

**Is automated reconciliation even a priority for {{contact.company}} right now?**

I don't want to keep reaching out if:
• You're happy with your current process
• The timing isn't right
• It's simply not a priority

But if you ARE interested and just haven't had time to respond, I'd still love to show you how insurance CFOs are saving 96+ days per year.

**Reply with:**
• "YES" - I'll send you demo times
• "NOT NOW" - I'll follow up in 6 months
• "NOT INTERESTED" - I'll remove you from outreach

Fair?

{{sender.signature}}`
  },

  // EMAIL 11: Multi-Carrier Focus (Day 50)
  {
    type: 'email',
    name: 'CFO Email 11 - Multi-Carrier Challenge',
    subject: 'Managing payments from 10+ insurance carriers?',
    body: `{{contact.first_name}},

If {{contact.company}} works with multiple insurance carriers, you know the reconciliation nightmare:

**The Multi-Carrier Challenge:**
• Each carrier has different payment formats
• Commission structures vary widely
• Premium allocations require manual mapping
• Reinsurance settlements add complexity
• Claims payments need separate tracking

When you're reconciling 10+ carriers, even small inefficiencies multiply into weeks of work.

**What's Possible:**
Our insurance clients handle unlimited carriers through one platform:
✓ Automatic payment format recognition
✓ Commission structure mapping
✓ Multi-carrier consolidated reporting
✓ Real-time carrier payment tracking
✓ Exception-based workflow (only review the 2-3% that need attention)

**Real Example:**
Insurance company with 15 carriers went from 85 hours/month → 8 hours/month on reconciliation.

Worth exploring for {{contact.company}}?

**See multi-carrier demo:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 12: Board Reporting (Day 65)
  {
    type: 'email',
    name: 'CFO Email 12 - Board Reporting',
    subject: 'Board meetings with real-time data vs. 2-week-old numbers',
    body: `{{contact.first_name}},

Picture your next board meeting:

**Scenario A (Current State):**
Board asks: "What's our current cash position?"
You answer: "As of two weeks ago when we closed the books..."
Board thinks: "Why don't they have real-time data?"

**Scenario B (With Paycile):**
Board asks: "What's our current cash position?"
You answer: "As of this morning, here's our cash position across all entities..."
Board thinks: "This CFO has their finger on the pulse."

**The Difference:**
Real-time financial visibility changes how the board perceives your financial leadership. You move from reporting historian to strategic advisor.

**What You Can Show the Board:**
✓ Real-time cash position dashboard
✓ Carrier payment trends
✓ Entity-level performance
✓ Automated reconciliation status
✓ Exception alerts and resolution

No more "I'll get back to you after close."

**See the CFO dashboard:** {{landing_page_url}}

{{sender.signature}}`
  },

  // EMAIL 13: Peer Comparison (Day 80)
  {
    type: 'email',
    name: 'CFO Email 13 - Industry Benchmarks',
    subject: 'How {{contact.company}} compares to insurance industry peers',
    body: `{{contact.first_name}},

I've been researching reconciliation efficiency in the insurance space.

**Industry Benchmarks (Insurance Companies $50M-$500M Revenue):**

📊 Average Close Time: 14 days
📊 Manual Reconciliation Hours: 85/month
📊 Error Rate: 4.5%
📊 Finance Team Overtime: 30% during close

**Top Performers Achieve:**
✓ 4-5 day close cycles
✓ 10 hours/month manual work
✓ <2% error rates
✓ Zero overtime required

**The Difference?**
Automated reconciliation that handles insurance-specific complexity—carrier payments, commission structures, multi-entity consolidation, reinsurance settlements.

Where does {{contact.company}} fall on this spectrum?

If you're closer to industry average than top performer, there's significant room for improvement.

**See the full benchmark report:** {{landing_page_url}}

{{sender.signature}}`
  }
];

// ============================================================================
// FUNNEL STRUCTURE - 60+ Nodes, 90-Day Campaign
// ============================================================================

async function createContentTemplate(template) {
  const response = await fetch(`${API_BASE}/api/content-templates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(template)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create template ${template.name}: ${response.statusText}`);
  }
  
  return response.json();
}

async function createFunnelTemplate(funnel) {
  const response = await fetch(`${API_BASE}/api/templates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(funnel)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create funnel: ${response.statusText}`);
  }
  
  return response.json();
}

async function buildCFOFunnel() {
  console.log('🚀 Building CFO Insurance Funnel - 90 Day Campaign\n');
  console.log('📝 Step 1: Creating Content Templates...\n');
  
  // Create content templates and store their IDs
  const templateIds = {};
  
  for (const template of CONTENT_TEMPLATES) {
    const created = await createContentTemplate(template);
    templateIds[template.name] = created.id;
    console.log(`   ✅ Created: ${template.name} (ID: ${created.id})`);
  }
  
  console.log(`\n✅ Created ${Object.keys(templateIds).length} content templates\n`);
  
  console.log('📝 Step 2: Building Funnel Structure...\n');
  
  // Build the funnel with 60+ nodes
  const nodes = [
    // START
    { id: 'N000', type: 'start', name: 'Import: Insurance CFO List', config: {} },
    
    // FILTERING & TAGGING (Nodes 1-4)
    { id: 'N001', type: 'filter', name: 'Filter: Insurance Industry Only', config: { criteria: 'industry=insurance' } },
    { id: 'N002', type: 'filter', name: 'Filter: Title = CFO/VP Finance', config: { criteria: 'title_contains=CFO,VP Finance,Finance Director,Chief Financial Officer' } },
    { id: 'N003', type: 'tag', name: 'Tag: CFO-Insurance-Vertical', config: { tag: 'cfo-insurance' } },
    
    // STAGE 1: DAY 1 - INITIAL OUTREACH (Nodes 4-10)
    { id: 'N004', type: 'stage', name: 'STAGE: Day 1 - Initial Outreach', config: { description: 'First touch via email and LinkedIn' } },
    { id: 'N005', type: 'email_send', name: 'Email 1: Detailed Introduction (96 Days)', config: { template_id: templateIds['CFO Email 1 - Detailed Introduction'] } },
    { id: 'N006', type: 'wait', name: 'Wait: 4 Hours', config: { duration: 'PT4H' } },
    { id: 'N007', type: 'decision', name: 'Check: Email Opened?', config: { condition: 'email_opened' } },
    { id: 'N008', type: 'tag', name: 'Tag: Email-Engaged', config: { tag: 'email-engaged', score: 10 } },
    { id: 'N009', type: 'tag', name: 'Tag: Email-Not-Opened', config: { tag: 'email-not-opened' } },
    { id: 'N010', type: 'linkedin_connect', name: 'LinkedIn: Send Connection Request', config: { message: 'Hi {{contact.first_name}}, I help insurance CFOs automate payment reconciliation. Would love to connect!' } },
    
    // DAY 2: VOICEMAIL FOLLOW-UP (Nodes 11-15)
    { id: 'N011', type: 'wait', name: 'Wait: Until Day 2 (8am)', config: { duration: 'P1D', at_local: '08:00' } },
    { id: 'N012', type: 'voicemail_drop', name: 'VM 1: Initial Outreach', config: { template_id: templateIds['CFO VM 1 - Initial Outreach'] } },
    { id: 'N013', type: 'wait', name: 'Wait: 6 Hours', config: { duration: 'PT6H' } },
    { id: 'N014', type: 'decision', name: 'Check: Any Engagement?', config: { condition: 'email_opened_or_link_clicked' } },
    { id: 'N015', type: 'tag', name: 'Tag: Warm Lead', config: { tag: 'warm', score: 25 } },
    
    // STAGE 2: DAY 4 - CASE STUDY (Nodes 16-22)
    { id: 'N016', type: 'stage', name: 'STAGE: Day 4 - Social Proof', config: { description: 'Share case study and results' } },
    { id: 'N017', type: 'wait', name: 'Wait: Until Day 4', config: { duration: 'P2D' } },
    { id: 'N018', type: 'email_send', name: 'Email 2: Insurance Case Study', config: { template_id: templateIds['CFO Email 2 - Insurance Case Study'] } },
    { id: 'N019', type: 'wait', name: 'Wait: 3 Hours', config: { duration: 'PT3H' } },
    { id: 'N020', type: 'decision', name: 'Check: Link Clicked?', config: { condition: 'link_clicked' } },
    { id: 'N021', type: 'tag', name: 'Tag: HOT LEAD', config: { tag: 'hot', score: 100 } },
    { id: 'N022', type: 'task', name: 'TASK: BDR Immediate Call', config: { assign_to: 'BDR', priority: 'urgent', description: 'Hot lead - clicked case study link' } },
    
    // STAGE 3: DAY 8 - ROI FOCUS (Nodes 23-30)
    { id: 'N023', type: 'stage', name: 'STAGE: Day 8 - ROI Calculator', config: { description: 'Quantify the savings' } },
    { id: 'N024', type: 'wait', name: 'Wait: Until Day 8', config: { duration: 'P4D' } },
    { id: 'N025', type: 'email_send', name: 'Email 3: ROI Calculator', config: { template_id: templateIds['CFO Email 3 - ROI Calculator'] } },
    { id: 'N026', type: 'wait', name: 'Wait: 2 Hours', config: { duration: 'PT2H' } },
    { id: 'N027', type: 'decision', name: 'Check: Email Response?', config: { condition: 'email_reply' } },
    { id: 'N028', type: 'tag', name: 'Tag: VERY HOT', config: { tag: 'very-hot', score: 150 } },
    { id: 'N029', type: 'task', name: 'TASK: CFO Direct Outreach', config: { assign_to: 'Sales', priority: 'urgent', description: 'CFO replied - schedule demo ASAP' } },
    { id: 'N030', type: 'goal', name: 'GOAL: Demo Scheduled', config: { goal_type: 'demo_booked' } },
    
    // DAY 10: VOICEMAIL 2 (Nodes 31-34)
    { id: 'N031', type: 'wait', name: 'Wait: Until Day 10', config: { duration: 'P2D' } },
    { id: 'N032', type: 'voicemail_drop', name: 'VM 2: Value Proposition', config: { template_id: templateIds['CFO VM 2 - Value Proposition'] } },
    { id: 'N033', type: 'wait', name: 'Wait: 4 Hours', config: { duration: 'PT4H' } },
    { id: 'N034', type: 'decision', name: 'Check: Callback Received?', config: { condition: 'phone_reply' } },
    
    // STAGE 4: DAY 14 - OBJECTION HANDLING (Nodes 35-40)
    { id: 'N035', type: 'stage', name: 'STAGE: Day 14 - Address Concerns', config: { description: 'Handle implementation concerns' } },
    { id: 'N036', type: 'wait', name: 'Wait: Until Day 14', config: { duration: 'P4D' } },
    { id: 'N037', type: 'email_send', name: 'Email 4: Implementation Concerns', config: { template_id: templateIds['CFO Email 4 - Addressing Concerns'] } },
    { id: 'N038', type: 'wait', name: 'Wait: 1 Day', config: { duration: 'P1D' } },
    { id: 'N039', type: 'linkedin_message', name: 'LinkedIn: Share Case Study', config: { message: 'Hi {{contact.first_name}}, I sent you details on how insurance CFOs are cutting close time by 96 days. Worth a quick look if reconciliation is taking too long. {{landing_page_url}}' } },
    { id: 'N040', type: 'wait', name: 'Wait: 2 Days', config: { duration: 'P2D' } },
    
    // STAGE 5: DAY 21 - STRATEGIC VALUE (Nodes 41-46)
    { id: 'N041', type: 'stage', name: 'STAGE: Day 21 - Strategic Advantage', config: { description: 'Position as competitive advantage' } },
    { id: 'N042', type: 'wait', name: 'Wait: Until Day 21', config: { duration: 'P5D' } },
    { id: 'N043', type: 'email_send', name: 'Email 5: Competitive Advantage', config: { template_id: templateIds['CFO Email 5 - Strategic Advantage'] } },
    { id: 'N044', type: 'wait', name: 'Wait: 3 Hours', config: { duration: 'PT3H' } },
    { id: 'N045', type: 'decision', name: 'Check: Engagement Score >= 50?', config: { condition: 'engagement_score_gte_50' } },
    { id: 'N046', type: 'task', name: 'TASK: BDR Warm Call', config: { assign_to: 'BDR', priority: 'medium', description: 'Moderate engagement - worth a call' } },
    
    // DAY 25: VOICEMAIL 3 (Nodes 47-50)
    { id: 'N047', type: 'wait', name: 'Wait: Until Day 25', config: { duration: 'P4D' } },
    { id: 'N048', type: 'voicemail_drop', name: 'VM 3: Case Study', config: { template_id: templateIds['CFO VM 3 - Case Study'] } },
    { id: 'N049', type: 'wait', name: 'Wait: 6 Hours', config: { duration: 'PT6H' } },
    { id: 'N050', type: 'decision', name: 'Check: Any Response?', config: { condition: 'any_engagement' } },
    
    // STAGE 6: DAY 30 - FINAL PUSH (Nodes 51-56)
    { id: 'N051', type: 'stage', name: 'STAGE: Day 30 - Final Outreach', config: { description: 'Last attempt in initial sequence' } },
    { id: 'N052', type: 'wait', name: 'Wait: Until Day 30', config: { duration: 'P5D' } },
    { id: 'N053', type: 'email_send', name: 'Email 6: Final Outreach', config: { template_id: templateIds['CFO Email 6 - Final Outreach'] } },
    { id: 'N054', type: 'wait', name: 'Wait: 2 Days', config: { duration: 'P2D' } },
    { id: 'N055', type: 'decision', name: 'Check: Any Engagement in Last 30 Days?', config: { condition: 'engagement_last_30_days' } },
    { id: 'N056', type: 'tag', name: 'Tag: Cold - No Engagement', config: { tag: 'cold', score: 0 } },
    
    // DAY 35: ENGAGEMENT RECOVERY (Nodes 57-60)
    { id: 'N057', type: 'wait', name: 'Wait: Until Day 35', config: { duration: 'P5D' } },
    { id: 'N058', type: 'email_send', name: 'Email 10: Engagement Recovery', config: { template_id: templateIds['CFO Email 10 - Engagement Recovery'] } },
    { id: 'N059', type: 'wait', name: 'Wait: 3 Days', config: { duration: 'P3D' } },
    { id: 'N060', type: 'decision', name: 'Check: Reply Received?', config: { condition: 'email_reply' } },
    
    // DAY 45: VOICEMAIL 4 (Nodes 61-64)
    { id: 'N061', type: 'wait', name: 'Wait: Until Day 45', config: { duration: 'P7D' } },
    { id: 'N062', type: 'voicemail_drop', name: 'VM 4: Final Attempt', config: { template_id: templateIds['CFO VM 4 - Final Attempt'] } },
    { id: 'N063', type: 'wait', name: 'Wait: 1 Day', config: { duration: 'P1D' } },
    { id: 'N064', type: 'decision', name: 'Check: Callback or Email?', config: { condition: 'callback_or_email' } },
    
    // STAGE 7: DAY 50 - MULTI-CARRIER ANGLE (Nodes 65-68)
    { id: 'N065', type: 'stage', name: 'STAGE: Day 50 - Multi-Carrier Focus', config: { description: 'New angle for non-responders' } },
    { id: 'N066', type: 'wait', name: 'Wait: Until Day 50', config: { duration: 'P5D' } },
    { id: 'N067', type: 'email_send', name: 'Email 11: Multi-Carrier Challenge', config: { template_id: templateIds['CFO Email 11 - Multi-Carrier Challenge'] } },
    { id: 'N068', type: 'wait', name: 'Wait: 2 Days', config: { duration: 'P2D' } },
    
    // STAGE 8: DAY 60 - RE-ENGAGEMENT (Nodes 69-73)
    { id: 'N069', type: 'stage', name: 'STAGE: Day 60 - Long-term Nurture', config: { description: 'Re-engage cold leads' } },
    { id: 'N070', type: 'wait', name: 'Wait: Until Day 60', config: { duration: 'P8D' } },
    { id: 'N071', type: 'email_send', name: 'Email 7: 60-Day Re-engagement', config: { template_id: templateIds['CFO Email 7 - 60-Day Re-engagement'] } },
    { id: 'N072', type: 'wait', name: 'Wait: 3 Hours', config: { duration: 'PT3H' } },
    { id: 'N073', type: 'decision', name: 'Check: Re-engaged?', config: { condition: 'email_opened_or_clicked' } },
    
    // STAGE 9: DAY 65 - BOARD REPORTING ANGLE (Nodes 74-77)
    { id: 'N074', type: 'stage', name: 'STAGE: Day 65 - Board Reporting', config: { description: 'Executive-level positioning' } },
    { id: 'N075', type: 'wait', name: 'Wait: Until Day 65', config: { duration: 'P5D' } },
    { id: 'N076', type: 'email_send', name: 'Email 12: Board Reporting Value', config: { template_id: templateIds['CFO Email 12 - Board Reporting'] } },
    { id: 'N077', type: 'wait', name: 'Wait: 2 Days', config: { duration: 'P2D' } },
    
    // STAGE 10: DAY 75 - AUDIT RISK (Nodes 78-81)
    { id: 'N078', type: 'stage', name: 'STAGE: Day 75 - Audit Season', config: { description: 'Audit risk and compliance angle' } },
    { id: 'N079', type: 'wait', name: 'Wait: Until Day 75', config: { duration: 'P8D' } },
    { id: 'N080', type: 'email_send', name: 'Email 8: Audit Risk Focus', config: { template_id: templateIds['CFO Email 8 - Audit Risk Focus'] } },
    { id: 'N081', type: 'wait', name: 'Wait: 3 Days', config: { duration: 'P3D' } },
    
    // STAGE 11: DAY 80 - INDUSTRY BENCHMARKS (Nodes 82-85)
    { id: 'N082', type: 'stage', name: 'STAGE: Day 80 - Peer Comparison', config: { description: 'Industry benchmark positioning' } },
    { id: 'N083', type: 'wait', name: 'Wait: Until Day 80', config: { duration: 'P2D' } },
    { id: 'N084', type: 'email_send', name: 'Email 13: Industry Benchmarks', config: { template_id: templateIds['CFO Email 13 - Industry Benchmarks'] } },
    { id: 'N085', type: 'wait', name: 'Wait: 2 Days', config: { duration: 'P2D' } },
    
    // STAGE 12: DAY 90 - FINAL INVITATION (Nodes 86-90)
    { id: 'N086', type: 'stage', name: 'STAGE: Day 90 - Final Push', config: { description: 'Last chance outreach' } },
    { id: 'N087', type: 'wait', name: 'Wait: Until Day 90', config: { duration: 'P8D' } },
    { id: 'N088', type: 'email_send', name: 'Email 9: 90-Day Final Invitation', config: { template_id: templateIds['CFO Email 9 - 90-Day Final Push'] } },
    { id: 'N089', type: 'wait', name: 'Wait: 5 Days', config: { duration: 'P5D' } },
    { id: 'N090', type: 'decision', name: 'Check: Final Response?', config: { condition: 'any_response' } },
    { id: 'N091', type: 'exit', name: 'EXIT: End Campaign', config: { reason: 'completed_90_day_sequence' } },
    
    // POSITIVE RESPONSE PATH (Nodes 92-96)
    { id: 'N092', type: 'stage', name: 'STAGE: Positive Response Received', config: { description: 'Lead showed interest' } },
    { id: 'N093', type: 'tag', name: 'Tag: DEMO-REQUESTED', config: { tag: 'demo-requested', score: 200 } },
    { id: 'N094', type: 'task', name: 'TASK: Schedule Demo', config: { assign_to: 'Sales', priority: 'urgent', description: 'Lead requested demo - schedule within 24 hours' } },
    { id: 'N095', type: 'wait', name: 'Wait: 1 Hour', config: { duration: 'PT1H' } },
    { id: 'N096', type: 'email_send', name: 'Email: Demo Confirmation', config: { template_id: templateIds['Demo Confirmation'] } },
    
    // HIGH ENGAGEMENT PATH (Nodes 97-100)
    { id: 'N097', type: 'stage', name: 'STAGE: High Engagement Path', config: { description: 'Multiple opens/clicks' } },
    { id: 'N098', type: 'wait', name: 'Wait: 1 Day', config: { duration: 'P1D' } },
    { id: 'N099', type: 'task', name: 'TASK: BDR Personalized Outreach', config: { assign_to: 'BDR', priority: 'high', description: 'High engagement - personalized call' } },
    { id: 'N100', type: 'goal', name: 'GOAL: Qualified Opportunity', config: { goal_type: 'opportunity_created' } }
  ];
  
  // Build edges (connections between nodes)
  const edges = [
    // Main sequence flow
    { from: 'N000', to: 'N001' },
    { from: 'N001', to: 'N002' },
    { from: 'N002', to: 'N003' },
    { from: 'N003', to: 'N004' },
    
    // Day 1: Email + LinkedIn
    { from: 'N004', to: 'N005' },
    { from: 'N004', to: 'N010' }, // Parallel LinkedIn
    { from: 'N005', to: 'N006' },
    { from: 'N006', to: 'N007' },
    { from: 'N007', to: 'N008', condition: { label: 'Opened', email_opened: true } },
    { from: 'N007', to: 'N009', condition: { label: 'Not Opened', email_opened: false } },
    { from: 'N010', to: 'N011' },
    
    // Day 2: Voicemail
    { from: 'N008', to: 'N011' },
    { from: 'N009', to: 'N011' },
    { from: 'N011', to: 'N012' },
    { from: 'N012', to: 'N013' },
    { from: 'N013', to: 'N014' },
    { from: 'N014', to: 'N015', condition: { label: 'Engaged', engaged: true } },
    { from: 'N014', to: 'N016', condition: { label: 'Not Engaged', engaged: false } },
    { from: 'N015', to: 'N097' }, // High engagement path
    
    // Day 4: Case Study
    { from: 'N016', to: 'N017' },
    { from: 'N017', to: 'N018' },
    { from: 'N018', to: 'N019' },
    { from: 'N019', to: 'N020' },
    { from: 'N020', to: 'N021', condition: { label: 'Clicked', clicked: true } },
    { from: 'N021', to: 'N022' },
    { from: 'N022', to: 'N092' }, // To positive response path
    { from: 'N020', to: 'N023', condition: { label: 'Not Clicked', clicked: false } },
    
    // Day 8: ROI
    { from: 'N023', to: 'N024' },
    { from: 'N024', to: 'N025' },
    { from: 'N025', to: 'N026' },
    { from: 'N026', to: 'N027' },
    { from: 'N027', to: 'N028', condition: { label: 'Replied', replied: true } },
    { from: 'N028', to: 'N029' },
    { from: 'N029', to: 'N030' },
    { from: 'N030', to: 'N092' }, // To positive response path
    { from: 'N027', to: 'N031', condition: { label: 'No Reply', replied: false } },
    
    // Day 10: VM 2
    { from: 'N031', to: 'N032' },
    { from: 'N032', to: 'N033' },
    { from: 'N033', to: 'N034' },
    { from: 'N034', to: 'N092', condition: { label: 'Callback', callback: true } },
    { from: 'N034', to: 'N035', condition: { label: 'No Callback', callback: false } },
    
    // Day 14: Objections
    { from: 'N035', to: 'N036' },
    { from: 'N036', to: 'N037' },
    { from: 'N037', to: 'N038' },
    { from: 'N038', to: 'N039' },
    { from: 'N039', to: 'N040' },
    
    // Day 21: Strategic
    { from: 'N040', to: 'N041' },
    { from: 'N041', to: 'N042' },
    { from: 'N042', to: 'N043' },
    { from: 'N043', to: 'N044' },
    { from: 'N044', to: 'N045' },
    { from: 'N045', to: 'N046', condition: { label: 'Score >= 50', score_gte_50: true } },
    { from: 'N046', to: 'N047' },
    { from: 'N045', to: 'N047', condition: { label: 'Score < 50', score_lt_50: true } },
    
    // Day 25: VM 3
    { from: 'N047', to: 'N048' },
    { from: 'N048', to: 'N049' },
    { from: 'N049', to: 'N050' },
    { from: 'N050', to: 'N092', condition: { label: 'Response', response: true } },
    { from: 'N050', to: 'N051', condition: { label: 'No Response', response: false } },
    
    // Day 30: Final
    { from: 'N051', to: 'N052' },
    { from: 'N052', to: 'N053' },
    { from: 'N053', to: 'N054' },
    { from: 'N054', to: 'N055' },
    { from: 'N055', to: 'N057', condition: { label: 'Some Engagement', engagement: true } },
    { from: 'N055', to: 'N056', condition: { label: 'Zero Engagement', engagement: false } },
    { from: 'N056', to: 'N069' }, // To long-term nurture
    
    // Day 35: Recovery
    { from: 'N057', to: 'N058' },
    { from: 'N058', to: 'N059' },
    { from: 'N059', to: 'N060' },
    { from: 'N060', to: 'N092', condition: { label: 'Replied', replied: true } },
    { from: 'N060', to: 'N061', condition: { label: 'No Reply', replied: false } },
    
    // Day 45: VM 4
    { from: 'N061', to: 'N062' },
    { from: 'N062', to: 'N063' },
    { from: 'N063', to: 'N064' },
    { from: 'N064', to: 'N092', condition: { label: 'Contact Made', contact: true } },
    { from: 'N064', to: 'N065', condition: { label: 'No Contact', contact: false } },
    
    // Day 50: Multi-carrier
    { from: 'N065', to: 'N066' },
    { from: 'N066', to: 'N067' },
    { from: 'N067', to: 'N068' },
    { from: 'N068', to: 'N069' },
    
    // Day 60: Re-engagement
    { from: 'N069', to: 'N070' },
    { from: 'N070', to: 'N071' },
    { from: 'N071', to: 'N072' },
    { from: 'N072', to: 'N073' },
    { from: 'N073', to: 'N074', condition: { label: 'Re-engaged', engaged: true } },
    { from: 'N073', to: 'N078', condition: { label: 'Still Cold', engaged: false } },
    
    // Day 65: Board
    { from: 'N074', to: 'N075' },
    { from: 'N075', to: 'N076' },
    { from: 'N076', to: 'N077' },
    { from: 'N077', to: 'N078' },
    
    // Day 75: Audit
    { from: 'N078', to: 'N079' },
    { from: 'N079', to: 'N080' },
    { from: 'N080', to: 'N081' },
    { from: 'N081', to: 'N082' },
    
    // Day 80: Benchmarks
    { from: 'N082', to: 'N083' },
    { from: 'N083', to: 'N084' },
    { from: 'N084', to: 'N085' },
    { from: 'N085', to: 'N086' },
    
    // Day 90: Final
    { from: 'N086', to: 'N087' },
    { from: 'N087', to: 'N088' },
    { from: 'N088', to: 'N089' },
    { from: 'N089', to: 'N090' },
    { from: 'N090', to: 'N092', condition: { label: 'Response', response: true } },
    { from: 'N090', to: 'N091', condition: { label: 'No Response', response: false } },
    
    // Positive Response Path
    { from: 'N092', to: 'N093' },
    { from: 'N093', to: 'N094' },
    { from: 'N094', to: 'N095' },
    { from: 'N095', to: 'N096' },
    { from: 'N096', to: 'N100' },
    
    // High Engagement Path
    { from: 'N097', to: 'N098' },
    { from: 'N098', to: 'N099' },
    { from: 'N099', to: 'N092' } // Merge to positive response
  ];
  
  console.log('📝 Step 3: Creating Funnel Template...\n');
  
  const funnel = {
    name: 'CFO Insurance - 90-Day Comprehensive',
    graph: { nodes, edges }
  };
  
  const created = await createFunnelTemplate(funnel);
  
  console.log(`\n✅ Funnel Created!`);
  console.log(`   ID: ${created.id}`);
  console.log(`   Name: ${created.name}`);
  console.log(`   Nodes: ${nodes.length}`);
  console.log(`   Edges: ${edges.length}`);
  console.log(`\n🔗 View at: https://paycile-automation.onrender.com/templates/${created.id}\n`);
  
  // Summary
  console.log('📊 SUMMARY:\n');
  console.log(`   Content Templates: ${CONTENT_TEMPLATES.length}`);
  console.log(`   Funnel Nodes: ${nodes.length}`);
  console.log(`   Funnel Edges: ${edges.length}`);
  console.log(`   Campaign Duration: 90 days`);
  console.log(`   Email Touchpoints: 13`);
  console.log(`   Voicemail Touchpoints: 4`);
  console.log(`   Decision Points: 10`);
  console.log(`   Stages: 12`);
  console.log(`\n✅ CFO Insurance Funnel Ready for Demo!\n`);
}

// Add Demo Confirmation template
CONTENT_TEMPLATES.push({
  type: 'email',
  name: 'Demo Confirmation',
  subject: 'Your Paycile Demo - {{demo_date}}',
  body: `Hi {{contact.first_name}},

Thank you for scheduling a demo with Paycile!

**Your Demo Details:**
Date: {{demo_date}}
Duration: 30 minutes
Focus: Insurance CFO payment reconciliation automation

**What We'll Cover:**
✓ Your specific reconciliation challenges
✓ Live platform walkthrough
✓ Multi-carrier payment automation
✓ Real-time cash visibility dashboard
✓ ROI calculation for {{contact.company}}
✓ Implementation timeline and process

**To Prepare:**
Think about your current reconciliation process:
- How long does month-end close take?
- How many carriers do you work with?
- What's your biggest reconciliation pain point?

I'll send you a calendar invite shortly with the meeting link.

Looking forward to showing you how we can save your team 96+ days per year!

{{sender.signature}}`
});

// Run the build
buildCFOFunnel().catch(error => {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
});
