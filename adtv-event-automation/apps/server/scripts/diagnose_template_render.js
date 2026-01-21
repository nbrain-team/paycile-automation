// Diagnostic script to check CFO Insurance - Non SMS template on Render
// Run this on Render shell: node scripts/diagnose_template_render.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TEMPLATE_ID = 'cmk4g9s1b0000cq0xsa507s23';

async function diagnose() {
  console.log('🔍 Diagnosing CFO Insurance - Non SMS template...\n');

  try {
    // 1. Check if template exists
    const template = await prisma.template.findUnique({
      where: { id: TEMPLATE_ID },
      include: { nodes: true, edges: true }
    });

    if (!template) {
      console.log('❌ Template not found with ID:', TEMPLATE_ID);
      console.log('\n📋 Available templates:');
      const allTemplates = await prisma.template.findMany({
        select: { id: true, name: true, status: true }
      });
      allTemplates.forEach(t => console.log(`   ${t.id} - ${t.name} (${t.status})`));
      return;
    }

    console.log(`✅ Template found: ${template.name}`);
    console.log(`   Status: ${template.status}`);
    console.log(`   Nodes: ${template.nodes.length}`);
    console.log(`   Edges: ${template.edges.length}\n`);

    // 2. Check content nodes
    const contentNodes = template.nodes.filter(n => 
      ['email_send', 'sms_send', 'voicemail_drop'].includes(n.type)
    );

    console.log(`📧 Content nodes: ${contentNodes.length}\n`);

    for (const node of contentNodes) {
      const config = node.configJson ? JSON.parse(node.configJson) : {};
      console.log(`Node ${node.key} (${node.type}): ${node.name}`);
      console.log(`   Config: ${JSON.stringify(config, null, 2)}`);
      
      if (config.template_id) {
        const ct = await prisma.contentTemplate.findUnique({
          where: { id: config.template_id }
        });
        if (ct) {
          console.log(`   ✅ Linked to: "${ct.name}" (${ct.type})`);
        } else {
          console.log(`   ❌ template_id "${config.template_id}" NOT FOUND`);
        }
      } else {
        console.log(`   ⚠️  NO template_id in config`);
      }
      console.log('');
    }

    // 3. List available CFO content templates
    console.log('📚 Available CFO Insurance content templates:\n');
    const cfoTemplates = await prisma.contentTemplate.findMany({
      where: {
        OR: [
          { id: { startsWith: 'cfo_ins_' } },
          { name: { contains: 'CFO Insurance' } }
        ]
      },
      orderBy: [{ type: 'asc' }, { id: 'asc' }]
    });

    cfoTemplates.forEach(ct => {
      console.log(`   ${ct.type.padEnd(10)} ${ct.id.padEnd(30)} "${ct.name}"`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

diagnose();
