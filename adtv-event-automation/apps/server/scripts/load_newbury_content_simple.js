// Load Newbury Content Templates (Simple Version)
// Run: node scripts/load_newbury_content_simple.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const contentTemplates = [
  // DEALSHEET TEMPLATES
  {
    id: 'nct_dealsheet_cold_1',
    type: 'email',
    name: '[DealSheet] Cold Email: The $84K margin leak',
    subject: 'Your Bullhorn is hiding $84K/month',
    body: 'Hi {{contact.first_name}},\n\nI live for helping healthcare staffing leaders reclaim missed margins (it\'s become such a fun passion).\n\nOne of our clients — a $30M firm — found $84K in missed monthly margin just by making their rate calculations fully visible.\n\nThey didn\'t need more people. They needed to see what was leaking.\n\nOur automated margin calculator manages multiple rates (including GSA system integration) to ensure no dollars are left on the table.\n\nAccuracy, compliance, and margin protection — while triggering manager approvals if any recruiter goes outside thresholds.\n\n15 minutes. I\'ll show you the $84K. You decide if it\'s worth it.\n\n-Katie\n\nP.S. Full transparency: If you\'re at SIA in Vegas, I\'d love to buy you a drink and show you how it works in action.'
  },
  {
    id: 'nct_dealsheet_ai_followup_1',
    type: 'email',
    name: '[DealSheet] AI Follow-up based on firm size',
    subject: 'Re: Healthcare staffing margin question',
    body: '{{contact.first_name}},\n\nQuick follow-up on margin optimization for {{contact.company}}.\n\nBased on your firm size, most healthcare staffing companies your size are leaving 12-18% on the table due to:\n\n• GSA rate miscalculations\n• Recruiter threshold violations going unnoticed\n• Manual margin tracking eating finance team time\n\nOne 15-minute call. I\'ll show you where the leaks typically hide.\n\nWorth a conversation?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_sms_1',
    type: 'sms',
    name: '[DealSheet] SMS: Quick margin question',
    text: '{{contact.first_name}} - Quick question: How much time does your finance team spend calculating margins each month? I help healthcare staffing firms automate this (and find hidden margin). 15-min call? -Katie, Newbury Partners'
  },
  {
    id: 'nct_dealsheet_vm_1',
    type: 'voicemail',
    name: '[DealSheet] VM: Margin calculator intro',
    ttsScript: 'Hi {{contact.first_name}}, Katie from Newbury Partners. I specialize in helping healthcare staffing firms reclaim missed margins through automated rate calculations. One of our clients found 84 thousand dollars in monthly margin they didn\'t know they were losing. I\'d love to show you how we did it. My number is 617-555-0123. Talk soon!'
  },
  {
    id: 'nct_dealsheet_case_study_1',
    type: 'email',
    name: '[DealSheet] Case Study: 18% hidden margin',
    subject: 'How a $45M healthcare staffing firm found 18% hidden margin',
    body: '{{contact.first_name}},\n\nThought you\'d find this interesting.\n\nWe recently worked with a $45M healthcare staffing firm that was convinced they had tight margin controls.\n\nWithin the first week of implementing DealSheet, they discovered:\n\n• 18% of deals were priced below optimal thresholds\n• GSA rate integration errors costing $127K annually\n• Manual approvals missing 23% of threshold violations\n\nThe solution? Automated margin calculator that:\n✓ Integrates directly with GSA systems\n✓ Triggers instant manager approvals for violations\n✓ Ensures compliance while protecting margins\n\nResult: $84K/month recovered. Finance team saved 40 hours/month.\n\nWant to see if similar opportunities exist at {{contact.company}}?\n\n-Katie'
  },

  // KANBAN TEMPLATES
  {
    id: 'nct_kanban_cold_1',
    type: 'email',
    name: '[Kanban] Cold Email: Invisible profit in Bullhorn',
    subject: 'Your $30M firm has invisible profit sitting in Bullhorn',
    body: 'Hi {{contact.first_name}},\n\nOne of our clients — a $30M staffing firm — found $84K in missed monthly margin just by making their Bullhorn pipeline fully visible.\n\nThey didn\'t need more people. They needed to see what was getting stuck.\n\nWe layered a Kanban view on top of Bullhorn.\n\nNo migration. Just clarity → action → profit.\n\nRecruiters now manage their entire pipeline on one screen. Sales sees recruiting status in real-time. No more deals falling through the cracks.\n\nIf that kind of margin is worth a conversation, I\'ll show you how they did it.\n\n-Katie\n\nP.S. This is literally a 30-minute setup. No data migration. No Bullhorn disruption.'
  },
  {
    id: 'nct_kanban_sms_1',
    type: 'sms',
    name: '[Kanban] SMS: Bullhorn drowning question',
    text: '{{contact.first_name}} - Are your recruiters drowning in Bullhorn tabs? We built a one-screen pipeline view that sits on top of Bullhorn. $30M firm found $84K/mo with it. 15-min demo? -Katie'
  },
  {
    id: 'nct_kanban_video_demo',
    type: 'email',
    name: '[Kanban] 3-min interactive demo',
    subject: 'See Kanban in action (3-min video)',
    body: '{{contact.first_name}},\n\nNo fluff. Just a quick 3-minute walkthrough of how Kanban transforms Bullhorn.\n\nYou\'ll see:\n✓ Drag-and-drop submission workflow\n✓ Full pipeline visibility on one screen\n✓ How a $30M firm found $84K in stuck deals\n\nWorth 3 minutes?\n\n-Katie\n\nP.S. This works with your existing Bullhorn instance. Zero migration required.'
  },
  {
    id: 'nct_kanban_webinar',
    type: 'email',
    name: '[Kanban] Webinar: Transform Bullhorn in 30 min',
    subject: 'Live Demo: One screen. Full pipeline. Zero migration.',
    body: 'Join me for a 30-minute live demo.\n\nI\'ll show you exactly how a $30M staffing firm found $84K in monthly margin by making their Bullhorn pipeline visible.\n\nWhat you\'ll see:\n✓ Drag-and-drop submission workflow\n✓ Recruiters managing everything on one screen\n✓ Sales seeing real-time recruiting status\n✓ Deals that were stuck suddenly moving\n\nNo pitch. Just a live walkthrough.\n\n-Katie\n\nP.S. This is a Bullhorn overlay. No migration. No disruption. 30-minute setup.'
  },
  {
    id: 'nct_kanban_pilot_offer',
    type: 'email',
    name: '[Kanban] 14-day free pilot offer',
    subject: 'Try Kanban free for 14 days (one team)',
    body: '{{contact.first_name}},\n\nLet\'s do this: 14-day free pilot with one of your teams.\n\nNo commitment. No credit card. Just results.\n\nWe\'ll set up Kanban for one recruiting team and you\'ll see within days:\n• Fewer deals falling through cracks\n• Recruiters spending less time in Bullhorn tabs\n• Sales finally seeing where candidates are in real-time\n\nAfter 14 days, we\'ll review the numbers together.\n\nIf it\'s not worth continuing, we part as friends.\nIf it found you margin (it will), we expand.\n\nSound fair?\n\n-Katie'
  },
  {
    id: 'nct_kanban_roi_report',
    type: 'email',
    name: '[Kanban] Pilot ROI Report',
    subject: 'Your 14-day Kanban pilot results',
    body: 'Your team\'s 14-day Kanban pilot just wrapped. Here\'s what happened:\n\nBY THE NUMBERS:\n• Deals moved that were previously stuck\n• Hours saved per recruiter per week\n• Increase in pipeline visibility\n• Previously invisible margin found\n\nTEAM FEEDBACK:\nRecruiters love it.\n\nThe question now: Ready to roll this out to your full team?\n\nLet\'s talk expansion.\n\n-Katie'
  },

  // COMMISSIONS TEMPLATES
  {
    id: 'nct_commissions_cold_1',
    type: 'email',
    name: '[Commissions] Cold Email: Manual calc cost',
    subject: 'Your finance team is calculating commissions manually. Here\'s the cost.',
    body: 'Hi {{contact.first_name}},\n\nI live for helping staffing leaders eliminate manual efforts (it\'s become such a fun passion).\n\nIf your finance team is still calculating commissions manually, here\'s what it\'s costing you:\n\n• 80+ hours/month on reconciliation\n• 12-15% error rate causing disputes\n• Recruiter trust issues\n• Data living in CRM, Payroll, GL, Excel... chaos\n\nWe recently built a centralized commissions portal that pulls live data from all systems into one source of truth.\n\nAutomating commission calculations eliminates risk of error and gives your finance team time back to focus on revenue-generating activities.\n\nOne $50M firm saved 80 hours/month and eliminated commission disputes entirely.\n\nCan I buy you a drink at SIA in Vegas and share how it works in action?\n\n-Katie'
  },
  {
    id: 'nct_commissions_sms_1',
    type: 'sms',
    name: '[Commissions] SMS: Dispute question',
    text: '{{contact.first_name}} - How many hours/month does your team spend on commission disputes? We automate the entire process. One firm saved 80hrs/mo. Quick call? -Katie'
  },
  {
    id: 'nct_commissions_vm',
    type: 'voicemail',
    name: '[Commissions] VM: One source of truth',
    ttsScript: 'Hi {{contact.first_name}}, Katie from Newbury Partners. I help staffing firms eliminate the chaos of manual commission calculations. One of our clients was spending 80 hours a month on reconciliation and still had a 12 percent error rate. We automated their entire process. One source of truth pulling from CRM, payroll, GL, and Excel. I\'d love to show you how. My number is 617-555-0123. Talk soon!'
  },
  {
    id: 'nct_commissions_case_study',
    type: 'email',
    name: '[Commissions] Case Study: 80hrs saved',
    subject: 'How a $50M firm eliminated commission disputes',
    body: 'Quick story that might resonate.\n\n$50M staffing firm. Complex commission structures. Finance team drowning in reconciliations.\n\nThe Problem:\n• 80 hours/month calculating commissions manually\n• Data scattered across CRM, Payroll, GL, Excel\n• 12% error rate causing recruiter disputes\n• CFO losing sleep over compliance risk\n\nThe Solution:\nWe built a centralized commissions portal that:\n✓ Pulls live data from all systems automatically\n✓ Calculates commissions with 100% accuracy\n✓ Provides full audit trail for compliance\n✓ Gives recruiters real-time commission visibility\n\nThe Results:\n✅ 80 hours/month saved\n✅ Zero commission disputes\n✅ Finance team refocused on strategic work\n✅ Recruiter trust and morale improved\n\nThink similar opportunities exist at {{contact.company}}?\n\n-Katie'
  },
  {
    id: 'nct_commissions_q4_chaos',
    type: 'email',
    name: '[Commissions] Q4 Commission Chaos',
    subject: 'Surviving Q4 commission season?',
    body: 'It\'s Q4. Commission chaos season.\n\nYour finance team is drowning in:\n• Year-end reconciliations\n• Commission true-ups\n• Dispute resolution\n• Audit prep\n\nAnd they\'re doing it all manually across multiple systems.\n\nOne $50M staffing firm we worked with was spending 120 hours in Q4 alone just on commission reconciliation.\n\nWe automated it. Now they spend 8 hours.\n\nWorth avoiding that pain this year?\n\n-Katie\n\nP.S. We can get you up and running before year-end close. Seriously.'
  },
  {
    id: 'nct_commissions_whitepaper',
    type: 'email',
    name: '[Commissions] Whitepaper: True Cost of Manual',
    subject: 'The hidden cost of manual commission calculations',
    body: 'I put together a breakdown of what manual commission calculations actually cost staffing firms.\n\nMost CFOs think it\'s just the hours. But when you add it up:\n\n• Direct cost: 80+ hours/month in finance team time\n• Error cost: 12-15% error rate causing disputes\n• Opportunity cost: Finance doing data entry vs. strategic work\n• Morale cost: Recruiter distrust when numbers don\'t match\n• Compliance risk: Manual processes = audit vulnerabilities\n\nFor a $50M firm, that\'s $180K-$250K annually.\n\nWorth a read before your next planning cycle.\n\n-Katie'
  },
  {
    id: 'nct_commissions_poc_offer',
    type: 'email',
    name: '[Commissions] Free POC offer',
    subject: 'Model one commission plan for free',
    body: 'Here\'s my offer:\n\nWe\'ll model ONE of your commission plans for free.\n\nNo cost. No obligation.\n\nWe\'ll:\n1. Map your current manual process\n2. Build it in our automated system\n3. Run parallel calculations (manual vs. automated)\n4. Show you the discrepancies we find\n\nTakes us 2 weeks. Costs you nothing.\n\nThen you decide if automating the rest makes sense.\n\nDeal?\n\n-Katie\n\nP.S. Most firms find 3-7% discrepancy rate just in the pilot plan. That adds up fast.'
  },
  {
    id: 'nct_dealsheet_conference_invite',
    type: 'email',
    name: '[DealSheet] SIA Conference Invite',
    subject: 'Full transparency: SIA favor coming at you',
    body: 'I live for helping healthcare staffing leaders reclaim missed margins.\n\nOur automated margin calculator manages multiple rates (including integrating with the GSA system) in order to ensure no dollars are left on the table.\n\nAccuracy, compliance, and margin protection is the focus of this solution, while also triggering manager approvals if any recruiter goes outside of certain thresholds.\n\nCan I buy you a drink at SIA in Vegas and share how it works in action?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_demo_invite',
    type: 'email',
    name: '[DealSheet] Demo Invitation with Calendly',
    subject: '15-minute DealSheet demo?',
    body: 'Let me show you where the $84K is hiding.\n\n15 minutes. Your Bullhorn data. Live demo.\n\nI\'ll walk through:\n✓ Margin calculation across your rate structures\n✓ GSA integration (if applicable)\n✓ Manager approval workflows\n✓ Compliance & audit trail\n\nNo pitch. Just show you what you\'re missing.\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_demo_thankyou',
    type: 'email',
    name: '[DealSheet] Post-Demo Thank You',
    subject: 'Thanks for your time - next steps',
    body: 'Thanks for the time today. Really enjoyed walking through your margin structure.\n\nHere\'s what I\'m sending over:\n\n1. Demo recording for your team\n2. Custom ROI analysis (coming tomorrow)\n3. Reference customer contact (similar firm size)\n4. Implementation timeline (8-12 weeks typical)\n\nLet\'s talk next steps?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_objection_tracking',
    type: 'email',
    name: '[DealSheet] Objection: Already Tracking',
    subject: 'Re: Margin tracking',
    body: 'Fair point. Most firms we work with thought the same.\n\nThen we showed them three blind spots they couldn\'t see:\n\n• GSA rate integration errors (averaging $127K annually)\n• Recruiter threshold violations going unnoticed (18% of deals)\n• Manual approval delays missing optimal pricing windows\n\nOne firm was tracking margins "closely" and still found $84K/month they didn\'t know was leaking.\n\nWorth a 15-minute look at your numbers?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_welcome',
    type: 'email',
    name: '[DealSheet] Welcome Email',
    subject: 'Welcome to DealSheet!',
    body: 'Welcome to Newbury Partners! Excited to get you up and running with DealSheet.\n\nWhat happens next:\n\nTHIS WEEK:\n• Kickoff call scheduled\n• Project team introductions\n• Data access setup\n\nI\'ll be checking in weekly to ensure everything stays on track.\n\nLet\'s find that $84K.\n\n-Katie'
  },
  {
    id: 'nct_kanban_pilot_day1',
    type: 'email',
    name: '[Kanban] Pilot Day 1 Check-in',
    subject: 'Kanban Pilot Day 1 - how\'s it going?',
    body: 'Day 1 of your Kanban pilot. How\'s the team finding it?\n\nQuick check-in:\n• Everyone able to access the view?\n• Any questions on drag-and-drop functionality?\n• Seeing the pipeline differently yet?\n\nI\'m here if anyone needs a quick walkthrough.\n\n-Katie'
  },
  {
    id: 'nct_commissions_demo_thankyou',
    type: 'email',
    name: '[Commissions] Demo thank you + next steps',
    subject: 'Thanks for your time - next steps',
    body: 'Thanks for the time today. Really enjoyed walking through your commission structure.\n\nHere\'s what I\'m sending over:\n\n1. Custom ROI analysis based on your numbers\n2. Implementation timeline (8-12 weeks typical)\n3. Reference customer contact (similar firm size)\n4. Technical specifications for your IT team\n\nLet\'s talk next steps?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_upsell_kanban',
    type: 'email',
    name: '[DealSheet] Upsell: Kanban Introduction',
    subject: 'Since DealSheet is working... let\'s talk pipeline',
    body: 'Since DealSheet is finding you margin every month, thought you might be interested in our Kanban solution.\n\nSame concept, different problem:\n\nDealSheet finds hidden margin.\nKanban finds hidden deals.\n\nOne $30M firm found $84K/month in deals that were stuck in their Bullhorn pipeline. They just couldn\'t see them.\n\nWe built a drag-and-drop view that sits on top of Bullhorn. No migration. Just visibility.\n\nWorth a quick look?\n\n-Katie'
  },
  {
    id: 'nct_dealsheet_upsell_commissions',
    type: 'email',
    name: '[DealSheet] Upsell: Commissions Portal',
    subject: 'DealSheet + Commissions = Full finance automation',
    body: 'You\'re already saving hours with DealSheet.\n\nWant to save another 80 hours/month?\n\nOur Commissions portal automates the other major finance time-sink: commission calculations.\n\nOne source of truth pulling from CRM, Payroll, GL, Excel. Zero manual reconciliation.\n\nOne firm saved 80 hours/month and eliminated commission disputes entirely.\n\nInterested in the full finance automation suite?\n\n-Katie'
  },
];

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📝 LOADING NEWBURY CONTENT TEMPLATES');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  let created = 0;
  let updated = 0;
  
  for (const ct of contentTemplates) {
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
  console.log('🎉 CONTENT TEMPLATES LOADED!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Total: ${contentTemplates.length} templates`);
  console.log(`   New: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log('\n🔥 Content templates now visible in Funnel Templates page!\n');
  
  await prisma.$disconnect();
}

seed().catch(console.error);

