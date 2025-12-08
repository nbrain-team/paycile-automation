// Final Funnel: Commissions Finance Automation (80 nodes)
// Run: node scripts/final_commissions_funnel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Commissions-specific content templates
const commissionsContent = [
  {
    id: 'nct_commissions_vm',
    type: 'voicemail',
    name: '[Commissions] VM: One source of truth',
    ttsScript: `Hi {{contact.first_name}}, Katie from Newbury Partners. I help staffing firms eliminate the chaos of manual commission calculations. One of our clients was spending 80 hours a month on reconciliation and still had a 12 percent error rate. We automated their entire process. One source of truth pulling from CRM, payroll, GL, and Excel. I'd love to show you how. My number is 555-0123. Talk soon!`
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
    id: 'nct_commissions_demo_thankyou',
    type: 'email',
    name: '[Commissions] Demo thank you + next steps',
    subject: 'Thanks for your time - next steps',
    body: `{{contact.first_name}},

Thanks for the time today. Really enjoyed walking through your commission structure.

Here's what I'm sending over:

1. Custom ROI analysis based on your numbers
2. Implementation timeline (8-12 weeks typical)
3. Reference customer contact (similar firm size)
4. Technical specifications for your IT team

Based on what you shared, I'm estimating you're spending $180K annually on manual commission processes (direct time + error cost + opportunity cost).

Automation would get that down to under $30K while eliminating dispute risk.

Let's talk next steps?

-Katie

[Schedule Follow-up Call]`
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMMISSIONS FUNNEL - 80 NODES
// ═══════════════════════════════════════════════════════════════════════════

const commissionsFunnel = {
  id: 'newbury_commissions',
  name: 'Newbury: Commissions Finance Automation',
  status: 'published',
  version: 1,
  nodes: [
    // Start + Awareness (1-23)
    {key:'CM001',type:'start',name:'CFOs/Finance/HR Leaders (All Staffing)',posX:50,posY:100},
    {key:'CM002',type:'stage',name:'Awareness: Pain-First Outreach',posX:250,posY:100},
    {key:'CM003',type:'email_send',name:'Email: Manual calc cost',posX:450,posY:50,configJson:JSON.stringify({template_id:'nct_commissions_cold_1'})},
    {key:'CM004',type:'wait',name:'Wait 4 hours',posX:650,posY:50,configJson:JSON.stringify({duration:'PT4H'})},
    {key:'CM005',type:'decision',name:'Email Opened?',posX:850,posY:50},
    {key:'CM006',type:'email_send',name:'AI Follow-up',posX:1050,posY:20,configJson:JSON.stringify({ai:true})},
    {key:'CM007',type:'sms_send',name:'SMS: Dispute question',posX:450,posY:150,configJson:JSON.stringify({template_id:'nct_commissions_sms_1'})},
    {key:'CM008',type:'wait',name:'Wait 1 day',posX:650,posY:150,configJson:JSON.stringify({duration:'P1D'})},
    {key:'CM009',type:'voicemail_drop',name:'VM: One source of truth',posX:850,posY:150,configJson:JSON.stringify({template_id:'nct_commissions_vm'})},
    {key:'CM010',type:'wait',name:'Wait 3 days',posX:1050,posY:150,configJson:JSON.stringify({duration:'P3D'})},
    {key:'CM011',type:'email_send',name:'Case Study: 80hrs saved',posX:1250,posY:150,configJson:JSON.stringify({template_id:'nct_commissions_case_study'})},
    {key:'CM012',type:'linkedin_connect',name:'LinkedIn Connect',posX:450,posY:250},
    {key:'CM013',type:'wait',name:'Wait 2 days',posX:650,posY:250,configJson:JSON.stringify({duration:'P2D'})},
    {key:'CM014',type:'linkedin_message',name:'LinkedIn outreach',posX:850,posY:250},
    {key:'CM015',type:'decision',name:'Check Engagement',posX:1050,posY:250},
    {key:'CM016',type:'tag',name:'Tag: Hot - CFO engaged',posX:1250,posY:220},
    {key:'CM017',type:'tag',name:'Tag: Warm',posX:1250,posY:280},
    {key:'CM018',type:'decision',name:'Q4 Season?',posX:50,posY:350},
    {key:'CM019',type:'email_send',name:'Q4 Commission Chaos',posX:250,posY:320,configJson:JSON.stringify({template_id:'nct_commissions_q4_chaos'})},
    {key:'CM020',type:'wait',name:'Wait 2 days',posX:450,posY:320,configJson:JSON.stringify({duration:'P2D'})},
    {key:'CM021',type:'email_send',name:'Year-end automation offer',posX:650,posY:320},
    {key:'CM022',type:'task',name:'Task: Urgent Q4 follow-up',posX:850,posY:320},
    {key:'CM023',type:'stage',name:'Move to Consideration',posX:1050,posY:320},
    
    // Consideration (24-48)
    {key:'CM024',type:'stage',name:'Consideration: Educational Authority',posX:50,posY:500},
    {key:'CM025',type:'email_send',name:'Whitepaper: True Cost',posX:250,posY:500,configJson:JSON.stringify({template_id:'nct_commissions_whitepaper'})},
    {key:'CM026',type:'wait',name:'Wait 2 days',posX:450,posY:500,configJson:JSON.stringify({duration:'P2D'})},
    {key:'CM027',type:'email_send',name:'Video: Commission automation',posX:650,posY:500},
    {key:'CM028',type:'wait',name:'Wait 3 days',posX:850,posY:500,configJson:JSON.stringify({duration:'P3D'})},
    {key:'CM029',type:'email_send',name:'Live calculation demo',posX:1050,posY:500},
    {key:'CM030',type:'wait',name:'Wait 2 days',posX:1250,posY:500,configJson:JSON.stringify({duration:'P2D'})},
    {key:'CM031',type:'email_send',name:'Integration map',posX:1450,posY:500},
    {key:'CM032',type:'wait',name:'Wait 3 days',posX:1650,posY:500,configJson:JSON.stringify({duration:'P3D'})},
    {key:'CM033',type:'email_send',name:'Webinar: Modernizing Comp',posX:1850,posY:500},
    {key:'CM034',type:'wait',name:'Until webinar',posX:50,posY:600},
    {key:'CM035',type:'decision',name:'Attended?',posX:250,posY:600},
    {key:'CM036',type:'email_send',name:'Webinar follow-up',posX:450,posY:580},
    {key:'CM037',type:'email_send',name:'Missed - replay',posX:450,posY:620},
    {key:'CM038',type:'decision',name:'Objection Type?',posX:650,posY:600},
    {key:'CM039',type:'email_send',name:'Obj: Too complex',posX:850,posY:560},
    {key:'CM040',type:'email_send',name:'Obj: Integration concerns',posX:850,posY:600},
    {key:'CM041',type:'email_send',name:'Obj: Team doesn\'t trust auto',posX:850,posY:640},
    {key:'CM042',type:'email_send',name:'Obj: Too risky mid-year',posX:850,posY:680},
    {key:'CM043',type:'email_send',name:'Obj: Excel works fine',posX:850,posY:720},
    {key:'CM044',type:'stage',name:'Personalized Demo Paths',posX:1100,posY:600},
    {key:'CM045',type:'decision',name:'Stakeholder Role?',posX:1300,posY:600},
    {key:'CM046',type:'task',name:'CFO track: ROI demo',posX:1500,posY:560},
    {key:'CM047',type:'task',name:'HR track: Employee satisfaction',posX:1500,posY:600},
    {key:'CM048',type:'task',name:'IT track: Security/integrations',posX:1500,posY:640},
    
    // Proof of Concept (49-66)
    {key:'CM049',type:'stage',name:'Proof of Concept Offer',posX:50,posY:800},
    {key:'CM050',type:'email_send',name:'Free POC: Model one plan',posX:250,posY:800,configJson:JSON.stringify({template_id:'nct_commissions_poc_offer'})},
    {key:'CM051',type:'task',name:'Schedule POC kickoff',posX:450,posY:800},
    {key:'CM052',type:'wait',name:'Week 1: Mapping',posX:650,posY:800,configJson:JSON.stringify({duration:'P7D'})},
    {key:'CM053',type:'email_send',name:'POC: Week 1 update',posX:850,posY:800},
    {key:'CM054',type:'wait',name:'Week 2: Build',posX:1050,posY:800,configJson:JSON.stringify({duration:'P7D'})},
    {key:'CM055',type:'email_send',name:'POC: Initial results',posX:1250,posY:800},
    {key:'CM056',type:'task',name:'Parallel calc review',posX:1450,posY:800},
    {key:'CM057',type:'decision',name:'Discrepancies Found?',posX:1650,posY:800},
    {key:'CM058',type:'email_send',name:'POC Results: Found errors',posX:1850,posY:770},
    {key:'CM059',type:'email_send',name:'POC Results: Validation',posX:1850,posY:830},
    {key:'CM060',type:'stage',name:'Stakeholder Alignment',posX:50,posY:900},
    {key:'CM061',type:'task',name:'CFO business case presentation',posX:250,posY:900},
    {key:'CM062',type:'task',name:'IT security review',posX:450,posY:900},
    {key:'CM063',type:'task',name:'HR change management plan',posX:650,posY:900},
    {key:'CM064',type:'task',name:'Sales leadership buy-in',posX:850,posY:900},
    {key:'CM065',type:'decision',name:'All Stakeholders Aligned?',posX:1050,posY:900},
    {key:'CM066',type:'stage',name:'Contract Negotiation',posX:1250,posY:900},
    
    // Closing & Onboarding (67-80)
    {key:'CM067',type:'email_send',name:'MSA template',posX:1450,posY:900},
    {key:'CM068',type:'email_send',name:'SLA commitments',posX:1650,posY:900},
    {key:'CM069',type:'email_send',name:'Data migration plan',posX:1850,posY:900},
    {key:'CM070',type:'decision',name:'Deal Status?',posX:50,posY:1050},
    {key:'CM071',type:'stage',name:'Deal Won - Implementation',posX:250,posY:1050},
    {key:'CM072',type:'email_send',name:'Welcome + kickoff',posX:450,posY:1050},
    {key:'CM073',type:'task',name:'All-stakeholder kickoff',posX:650,posY:1050},
    {key:'CM074',type:'wait',name:'Week 1-4: Mapping',posX:850,posY:1050,configJson:JSON.stringify({duration:'P28D'})},
    {key:'CM075',type:'email_send',name:'Implementation: Phase 1 update',posX:1050,posY:1050},
    {key:'CM076',type:'wait',name:'Week 5-8: Parallel run',posX:1250,posY:1050,configJson:JSON.stringify({duration:'P28D'})},
    {key:'CM077',type:'email_send',name:'Parallel run results',posX:1450,posY:1050},
    {key:'CM078',type:'task',name:'Go-live support (24/7)',posX:1650,posY:1050},
    {key:'CM079',type:'email_send',name:'Post-launch optimization',posX:1850,posY:1050},
    {key:'CM080',type:'goal',name:'GOAL: Advocate',posX:2050,posY:1050},
  ],
  edges: [
    {fromKey:'CM001',toKey:'CM002'},{fromKey:'CM002',toKey:'CM003'},{fromKey:'CM002',toKey:'CM007'},
    {fromKey:'CM002',toKey:'CM012'},{fromKey:'CM003',toKey:'CM004'},{fromKey:'CM004',toKey:'CM005'},
    {fromKey:'CM005',toKey:'CM006',conditionJson:JSON.stringify({field:'opened',op:'eq',value:true})},
    {fromKey:'CM005',toKey:'CM018',conditionJson:JSON.stringify({field:'opened',op:'eq',value:false})},
    {fromKey:'CM006',toKey:'CM015'},{fromKey:'CM007',toKey:'CM008'},{fromKey:'CM008',toKey:'CM009'},
    {fromKey:'CM009',toKey:'CM010'},{fromKey:'CM010',toKey:'CM011'},{fromKey:'CM011',toKey:'CM015'},
    {fromKey:'CM012',toKey:'CM013'},{fromKey:'CM013',toKey:'CM014'},{fromKey:'CM014',toKey:'CM015'},
    {fromKey:'CM015',toKey:'CM016',conditionJson:JSON.stringify({field:'engagement',op:'eq',value:'hot'})},
    {fromKey:'CM015',toKey:'CM017',conditionJson:JSON.stringify({field:'engagement',op:'eq',value:'warm'})},
    {fromKey:'CM016',toKey:'CM044'},{fromKey:'CM017',toKey:'CM024'},
    {fromKey:'CM018',toKey:'CM019',conditionJson:JSON.stringify({field:'q4',op:'eq',value:true})},
    {fromKey:'CM018',toKey:'CM024',conditionJson:JSON.stringify({field:'q4',op:'eq',value:false})},
    {fromKey:'CM019',toKey:'CM020'},{fromKey:'CM020',toKey:'CM021'},{fromKey:'CM021',toKey:'CM022'},
    {fromKey:'CM022',toKey:'CM023'},{fromKey:'CM023',toKey:'CM044'},
    {fromKey:'CM024',toKey:'CM025'},{fromKey:'CM025',toKey:'CM026'},{fromKey:'CM026',toKey:'CM027'},
    {fromKey:'CM027',toKey:'CM028'},{fromKey:'CM028',toKey:'CM029'},{fromKey:'CM029',toKey:'CM030'},
    {fromKey:'CM030',toKey:'CM031'},{fromKey:'CM031',toKey:'CM032'},{fromKey:'CM032',toKey:'CM033'},
    {fromKey:'CM033',toKey:'CM034'},{fromKey:'CM034',toKey:'CM035'},
    {fromKey:'CM035',toKey:'CM036',conditionJson:JSON.stringify({field:'attended',op:'eq',value:true})},
    {fromKey:'CM035',toKey:'CM037',conditionJson:JSON.stringify({field:'attended',op:'eq',value:false})},
    {fromKey:'CM036',toKey:'CM044'},{fromKey:'CM037',toKey:'CM044'},{fromKey:'CM038',toKey:'CM039'},
    {fromKey:'CM038',toKey:'CM040'},{fromKey:'CM038',toKey:'CM041'},{fromKey:'CM038',toKey:'CM042'},
    {fromKey:'CM038',toKey:'CM043'},{fromKey:'CM044',toKey:'CM045'},
    {fromKey:'CM045',toKey:'CM046',conditionJson:JSON.stringify({field:'role',op:'eq',value:'cfo'})},
    {fromKey:'CM045',toKey:'CM047',conditionJson:JSON.stringify({field:'role',op:'eq',value:'hr'})},
    {fromKey:'CM045',toKey:'CM048',conditionJson:JSON.stringify({field:'role',op:'eq',value:'it'})},
    {fromKey:'CM046',toKey:'CM049'},{fromKey:'CM047',toKey:'CM049'},{fromKey:'CM048',toKey:'CM049'},
    {fromKey:'CM049',toKey:'CM050'},{fromKey:'CM050',toKey:'CM051'},{fromKey:'CM051',toKey:'CM052'},
    {fromKey:'CM052',toKey:'CM053'},{fromKey:'CM053',toKey:'CM054'},{fromKey:'CM054',toKey:'CM055'},
    {fromKey:'CM055',toKey:'CM056'},{fromKey:'CM056',toKey:'CM057'},
    {fromKey:'CM057',toKey:'CM058',conditionJson:JSON.stringify({field:'errors_found',op:'gt',value:0})},
    {fromKey:'CM057',toKey:'CM059',conditionJson:JSON.stringify({field:'errors_found',op:'eq',value:0})},
    {fromKey:'CM058',toKey:'CM060'},{fromKey:'CM059',toKey:'CM060'},
    {fromKey:'CM060',toKey:'CM061'},{fromKey:'CM061',toKey:'CM062'},{fromKey:'CM062',toKey:'CM063'},
    {fromKey:'CM063',toKey:'CM064'},{fromKey:'CM064',toKey:'CM065'},
    {fromKey:'CM065',toKey:'CM066',conditionJson:JSON.stringify({field:'aligned',op:'eq',value:true})},
    {fromKey:'CM065',toKey:'CM060',conditionJson:JSON.stringify({field:'aligned',op:'eq',value:false})},
    {fromKey:'CM066',toKey:'CM067'},{fromKey:'CM067',toKey:'CM068'},{fromKey:'CM068',toKey:'CM069'},
    {fromKey:'CM069',toKey:'CM070'},
    {fromKey:'CM070',toKey:'CM071',conditionJson:JSON.stringify({field:'status',op:'eq',value:'won'})},
    {fromKey:'CM071',toKey:'CM072'},{fromKey:'CM072',toKey:'CM073'},{fromKey:'CM073',toKey:'CM074'},
    {fromKey:'CM074',toKey:'CM075'},{fromKey:'CM075',toKey:'CM076'},{fromKey:'CM076',toKey:'CM077'},
    {fromKey:'CM077',toKey:'CM078'},{fromKey:'CM078',toKey:'CM079'},{fromKey:'CM079',toKey:'CM080'},
  ]
};

console.log(`✅ Commissions Funnel: ${commissionsFunnel.nodes.length} nodes, ${commissionsFunnel.edges.length} edges`);

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🚀 FINAL FUNNEL: COMMISSIONS');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Add commissions content
    console.log('📝 Adding Commissions content templates...\n');
    for (const ct of commissionsContent) {
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
    
    // Create Commissions funnel
    console.log('\n🎯 Creating Commissions Funnel (80 nodes)...\n');
    await createFunnel(commissionsFunnel);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 ALL 3 NEWBURY FUNNELS COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ DealSheet: 85 nodes`);
    console.log(`✅ Kanban: 82 nodes`);
    console.log(`✅ Commissions: 80 nodes`);
    console.log(`✅ TOTAL: 247 nodes across 3 comprehensive funnels`);
    console.log('\n🔥 Ready to demo for Katie! Refresh browser!\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

async function createFunnel(funnel) {
  await prisma.node.deleteMany({where:{templateId:funnel.id}});
  await prisma.edge.deleteMany({where:{templateId:funnel.id}});
  await prisma.template.delete({where:{id:funnel.id}}).catch(()=>{});
  
  const template = await prisma.template.create({
    data: {id:funnel.id, name:funnel.name, status:funnel.status, version:funnel.version}
  });
  
  for (const node of funnel.nodes) {
    await prisma.node.create({
      data: {
        templateId: template.id,
        key: node.key,
        type: node.type,
        name: node.name,
        posX: node.posX,
        posY: node.posY,
        configJson: node.configJson || null
      }
    });
  }
  
  for (const edge of funnel.edges) {
    await prisma.edge.create({
      data: {
        templateId: template.id,
        fromKey: edge.fromKey,
        toKey: edge.toKey,
        conditionJson: edge.conditionJson || null
      }
    });
  }
  
  console.log(`✅ ${funnel.name} - ${funnel.nodes.length} nodes, ${funnel.edges.length} edges\n`);
}

seed().catch(console.error);

