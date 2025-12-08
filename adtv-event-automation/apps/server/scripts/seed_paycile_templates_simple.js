// Simple Paycile Template Seeder
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const funnelTemplates = [
  {
    id: 'tpl_cfo_insurance',
    name: 'CFO Outreach - Insurance Vertical',
    status: 'published',
    nodes: [
      { key: 'N00', type: 'start', name: 'CFO Target List', posX: 100, posY: 100 },
      { key: 'N10', type: 'email_send', name: 'Email: Save 96 Days on Close', posX: 300, posY: 100 },
      { key: 'N20', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 500, posY: 100 },
      { key: 'N30', type: 'sms_send', name: 'SMS: Real-Time Visibility', posX: 700, posY: 100 },
      { key: 'N40', type: 'voicemail_drop', name: 'VM: Strategic Oversight', posX: 900, posY: 100 },
      { key: 'N50', type: 'decision', name: 'Response Check', posX: 500, posY: 250 },
      { key: 'N60', type: 'goal', name: 'Demo Booked', posX: 300, posY: 400 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 400 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N20' },
      { fromKey: 'N20', toKey: 'N30' },
      { fromKey: 'N30', toKey: 'N40' },
      { fromKey: 'N40', toKey: 'N50' },
      { fromKey: 'N50', toKey: 'N60' },
      { fromKey: 'N50', toKey: 'N99' }
    ]
  },
  {
    id: 'tpl_controller_multi',
    name: 'Controller - Multi-Entity Reconciliation',
    status: 'published',
    nodes: [
      { key: 'N00', type: 'start', name: 'Controller List', posX: 100, posY: 100 },
      { key: 'N10', type: 'email_send', name: 'Email: 90% Workload Reduction', posX: 300, posY: 100 },
      { key: 'N20', type: 'sms_send', name: 'SMS: Multi-Entity Automation', posX: 500, posY: 100 },
      { key: 'N30', type: 'voicemail_drop', name: 'VM: Period-End Close', posX: 700, posY: 100 },
      { key: 'N40', type: 'linkedin_message', name: 'LinkedIn: Case Study', posX: 900, posY: 100 },
      { key: 'N50', type: 'goal', name: 'Demo Scheduled', posX: 500, posY: 300 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 300 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N20' },
      { fromKey: 'N20', toKey: 'N30' },
      { fromKey: 'N30', toKey: 'N40' },
      { fromKey: 'N40', toKey: 'N50' }
    ]
  },
  {
    id: 'tpl_arap_funds',
    name: 'AR/AP - Unapplied Funds Recovery',
    status: 'published',
    nodes: [
      { key: 'N00', type: 'start', name: 'AR/AP List', posX: 100, posY: 100 },
      { key: 'N10', type: 'email_send', name: 'Email: Find $250K Unapplied', posX: 300, posY: 100 },
      { key: 'N20', type: 'sms_send', name: 'SMS: 90% Auto-Matching', posX: 500, posY: 100 },
      { key: 'N30', type: 'voicemail_drop', name: 'VM: Unapplied Recovery', posX: 700, posY: 100 },
      { key: 'N40', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 900, posY: 100 },
      { key: 'N50', type: 'goal', name: 'Assessment Booked', posX: 500, posY: 300 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 300 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N20' },
      { fromKey: 'N20', toKey: 'N30' },
      { fromKey: 'N30', toKey: 'N40' },
      { fromKey: 'N40', toKey: 'N50' }
    ]
  },
  {
    id: 'tpl_propmgmt_yardi',
    name: 'Property Management - Yardi Integration',
    status: 'published',
    nodes: [
      { key: 'N00', type: 'start', name: 'Yardi User List', posX: 100, posY: 100 },
      { key: 'N10', type: 'email_send', name: 'Email: Native Yardi Integration', posX: 300, posY: 100 },
      { key: 'N20', type: 'sms_send', name: 'SMS: Multi-Property Rec', posX: 500, posY: 100 },
      { key: 'N30', type: 'voicemail_drop', name: 'VM: Yardi Case Study', posX: 700, posY: 100 },
      { key: 'N40', type: 'linkedin_message', name: 'LinkedIn: Success Story', posX: 900, posY: 100 },
      { key: 'N50', type: 'goal', name: 'Demo Booked', posX: 500, posY: 300 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 300 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N20' },
      { fromKey: 'N20', toKey: 'N30' },
      { fromKey: 'N30', toKey: 'N40' },
      { fromKey: 'N40', toKey: 'N50' }
    ]
  }
];

const contentTemplates = [
  { id: 'ct_cfo_email_1', type: 'email', name: 'CFO - Save 96 Days Email', subject: '{{FirstName}}, saving 96 days annually', body: 'CFO focused email about period-end close optimization. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_cfo_sms_1', type: 'sms', name: 'CFO - Cash Visibility SMS', text: '{{FirstName}}, real-time cash visibility demo: {{ShortLink}}' },
  { id: 'ct_cfo_vm_1', type: 'voicemail', name: 'CFO - Strategic Oversight VM', ttsScript: 'CFO voicemail script. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_controller_email_1', type: 'email', name: 'Controller - 90% Workload Email', subject: '90% workload reduction', body: 'Controller multi-entity reconciliation email. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_controller_sms_1', type: 'sms', name: 'Controller - Multi-Entity SMS', text: 'Multi-entity rec automation: {{ShortLink}}' },
  { id: 'ct_controller_vm_1', type: 'voicemail', name: 'Controller - Close Time VM', ttsScript: 'Controller voicemail. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_arap_email_1', type: 'email', name: 'AR/AP - Unapplied Funds Email', subject: 'Find $250K in unapplied funds', body: 'AR/AP unapplied funds email. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_arap_sms_1', type: 'sms', name: 'AR/AP - Recovery SMS', text: '90% payment matching: {{ShortLink}}' },
  { id: 'ct_arap_vm_1', type: 'voicemail', name: 'AR/AP - Collections VM', ttsScript: 'AR/AP voicemail. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_propmgmt_email_1', type: 'email', name: 'PropMgmt - Yardi Email', subject: 'Native Yardi integration', body: 'Property management Yardi integration email. Full content in PAYCILE_CONTENT_TEMPLATES.md' },
  { id: 'ct_propmgmt_sms_1', type: 'sms', name: 'PropMgmt - Multi-Property SMS', text: 'Yardi automation demo: {{ShortLink}}' },
  { id: 'ct_propmgmt_vm_1', type: 'voicemail', name: 'PropMgmt - Case Study VM', ttsScript: 'Property management voicemail. Full content in PAYCILE_CONTENT_TEMPLATES.md' }
];

async function seed() {
  console.log('\n🌱 Seeding Paycile templates...\n');

  // Content Templates
  console.log('📧 Creating content templates...');
  for (const tpl of contentTemplates) {
    try {
      await prisma.contentTemplate.upsert({
        where: { id: tpl.id },
        create: { id: tpl.id, type: tpl.type, name: tpl.name, subject: tpl.subject, body: tpl.body, text: tpl.text, ttsScript: tpl.ttsScript },
        update: { name: tpl.name, subject: tpl.subject, body: tpl.body, text: tpl.text, ttsScript: tpl.ttsScript }
      });
      console.log(`  ✅ ${tpl.name}`);
    } catch (err) {
      console.log(`  ❌ ${tpl.name}: ${err.message}`);
    }
  }

  // Funnel Templates
  console.log('\n🎯 Creating funnel templates...');
  for (const tpl of funnelTemplates) {
    try {
      const template = await prisma.template.upsert({
        where: { id: tpl.id },
        create: { id: tpl.id, name: tpl.name, status: tpl.status, version: 1 },
        update: { name: tpl.name, status: tpl.status }
      });

      // Delete existing nodes/edges
      await prisma.node.deleteMany({ where: { templateId: tpl.id } });
      await prisma.edge.deleteMany({ where: { templateId: tpl.id } });

      // Create nodes
      for (const node of tpl.nodes) {
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

      // Create edges
      for (const edge of tpl.edges) {
        await prisma.edge.create({
          data: {
            templateId: template.id,
            fromKey: edge.fromKey,
            toKey: edge.toKey,
            conditionJson: edge.conditionJson || null
          }
        });
      }

      console.log(`  ✅ ${tpl.name} (${tpl.nodes.length} nodes, ${tpl.edges.length} edges)`);
    } catch (err) {
      console.log(`  ❌ ${tpl.name}: ${err.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('🎉 Paycile templates seeded successfully!');
  console.log('═══════════════════════════════════════════');
  console.log(`Content Templates: ${contentTemplates.length}`);
  console.log(`Funnel Templates: ${funnelTemplates.length}`);
  console.log('\n✅ Refresh browser to see templates!\n');

  await prisma.$disconnect();
}

seed().catch(console.error);
