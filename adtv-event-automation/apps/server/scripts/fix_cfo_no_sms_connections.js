// Fix CFO Insurance - Non SMS Funnel Template Connections
// This script ensures nodes are properly stored in the Node table with correct template_id references

const { PrismaClient } = require('@prisma/client');

// Use Render production database
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a/paycile_automation_db';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

const TEMPLATE_ID = 'cmk4g9s1b0000cq0xsa507s23'; // CFO Insurance - Non SMS template ID

async function fixConnections() {
  console.log('🔧 Fixing CFO Insurance - Non SMS funnel connections...\n');

  try {
    // 1. Load the template
    const template = await prisma.template.findUnique({
      where: { id: TEMPLATE_ID },
      include: { nodes: true, edges: true }
    });

    if (!template) {
      console.error('❌ Template not found:', TEMPLATE_ID);
      process.exit(1);
    }

    console.log(`📋 Template: ${template.name}`);
    console.log(`   Current nodes in DB: ${template.nodes.length}`);
    console.log(`   Current edges in DB: ${template.edges.length}\n`);

    // 2. Check if nodes are empty (stored in nodesJson instead)
    if (template.nodes.length === 0) {
      console.log('⚠️  No nodes found in Node table. Checking for JSON storage...\n');
      
      // Check if there's a nodesJson field (shouldn't be in schema, but might be in DB)
      const rawTemplate = await prisma.$queryRaw`
        SELECT "nodesJson", "edgesJson" FROM "Template" WHERE id = ${TEMPLATE_ID}
      `;
      
      if (rawTemplate && rawTemplate[0]) {
        const nodesJson = rawTemplate[0].nodesJson;
        const edgesJson = rawTemplate[0].edgesJson;
        
        if (nodesJson && edgesJson) {
          console.log('✅ Found JSON data, migrating to proper tables...\n');
          
          const nodes = JSON.parse(nodesJson);
          const edges = JSON.parse(edgesJson);
          
          console.log(`   Nodes to create: ${nodes.length}`);
          console.log(`   Edges to create: ${edges.length}\n`);
          
          // Create nodes
          for (const node of nodes) {
            await prisma.node.create({
              data: {
                templateId: TEMPLATE_ID,
                key: node.key,
                type: node.type,
                name: node.name,
                configJson: JSON.stringify(node.config || {}),
                posX: node.posX ?? null,
                posY: node.posY ?? null
              }
            });
          }
          
          // Create edges
          for (const edge of edges) {
            await prisma.edge.create({
              data: {
                templateId: TEMPLATE_ID,
                fromKey: edge.from,
                toKey: edge.to,
                conditionJson: JSON.stringify(edge.condition || {})
              }
            });
          }
          
          console.log('✅ Migration complete!\n');
        }
      }
    }

    // 3. Verify all email and voicemail nodes have template_id
    const updatedTemplate = await prisma.template.findUnique({
      where: { id: TEMPLATE_ID },
      include: { nodes: true, edges: true }
    });

    console.log('🔍 Verifying node configurations...\n');
    
    const contentNodes = updatedTemplate.nodes.filter(n => 
      ['email_send', 'sms_send', 'voicemail_drop'].includes(n.type)
    );
    
    console.log(`   Content nodes found: ${contentNodes.length}\n`);
    
    let fixedCount = 0;
    for (const node of contentNodes) {
      const config = node.configJson ? JSON.parse(node.configJson) : {};
      
      if (!config.template_id) {
        console.log(`   ⚠️  Node ${node.key} (${node.name}) missing template_id`);
        fixedCount++;
      } else {
        // Verify the content template exists
        const contentTemplate = await prisma.contentTemplate.findUnique({
          where: { id: config.template_id }
        });
        
        if (contentTemplate) {
          console.log(`   ✅ Node ${node.key}: ${config.template_id} → "${contentTemplate.name}"`);
        } else {
          console.log(`   ❌ Node ${node.key}: template_id "${config.template_id}" NOT FOUND in database`);
          fixedCount++;
        }
      }
    }
    
    if (fixedCount > 0) {
      console.log(`\n⚠️  Found ${fixedCount} nodes with missing or invalid template connections`);
      console.log('   These need to be fixed manually or by re-running the seed script\n');
    } else {
      console.log('\n🎉 All content nodes have valid template connections!\n');
    }

    // 4. List all content templates for reference
    console.log('📚 Available Content Templates:\n');
    const contentTemplates = await prisma.contentTemplate.findMany({
      where: {
        OR: [
          { id: { startsWith: 'cfo_ins_' } },
          { name: { contains: 'CFO Insurance' } }
        ]
      },
      orderBy: { type: 'asc' }
    });
    
    for (const ct of contentTemplates) {
      console.log(`   ${ct.type.padEnd(10)} ${ct.id.padEnd(30)} "${ct.name}"`);
    }
    
    console.log('\n✅ Verification complete!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixConnections()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
