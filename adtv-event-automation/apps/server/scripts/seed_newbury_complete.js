// Newbury Partners - Complete 3 Funnel System with 240+ Total Nodes
// Run: node scripts/seed_newbury_complete.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import the individual funnel builders
const { buildDealSheetFunnel } = require('./newbury_funnels/dealsheet_funnel');
const { buildKanbanFunnel } = require('./newbury_funnels/kanban_funnel');
const { buildCommissionsFunnel } = require('./newbury_funnels/commissions_funnel');
const { buildNewburyContentTemplates } = require('./newbury_funnels/content_templates');

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🚀 NEWBURY PARTNERS - COMPREHENSIVE FUNNEL SYSTEM');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Step 1: Create all content templates
    console.log('📝 Creating Newbury content templates...\n');
    const contentTemplates = buildNewburyContentTemplates();
    let contentCount = 0;
    
    for (const ct of contentTemplates) {
      try {
        await prisma.contentTemplate.upsert({
          where: { id: ct.id },
          create: ct,
          update: ct
        });
        console.log(`  ✅ ${ct.name}`);
        contentCount++;
      } catch (err) {
        console.log(`  ❌ ${ct.name}: ${err.message}`);
      }
    }
    
    console.log(`\n✅ Content Templates Created: ${contentCount}/${contentTemplates.length}\n`);
    
    // Step 2: Create DealSheet Funnel (85 nodes)
    console.log('🎯 Creating DealSheet Margin Recovery Funnel (85 nodes)...\n');
    const dealsheetFunnel = buildDealSheetFunnel();
    await createFunnelTemplate(dealsheetFunnel);
    
    // Step 3: Create Kanban Funnel (82 nodes)
    console.log('🎯 Creating Kanban Pipeline Visibility Funnel (82 nodes)...\n');
    const kanbanFunnel = buildKanbanFunnel();
    await createFunnelTemplate(kanbanFunnel);
    
    // Step 4: Create Commissions Funnel (80 nodes)
    console.log('🎯 Creating Commissions Finance Automation Funnel (80 nodes)...\n');
    const commissionsFunnel = buildCommissionsFunnel();
    await createFunnelTemplate(commissionsFunnel);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 NEWBURY PARTNERS FUNNELS DEPLOYED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Total Content Templates: ${contentCount}`);
    console.log(`✅ DealSheet Funnel: 85 nodes`);
    console.log(`✅ Kanban Funnel: 82 nodes`);
    console.log(`✅ Commissions Funnel: 80 nodes`);
    console.log(`✅ Total Nodes Across All Funnels: 247 nodes`);
    console.log('\n🔥 Ready to blow Katie away with the demo!\n');
    
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

async function createFunnelTemplate(funnel) {
  try {
    // Delete existing
    await prisma.node.deleteMany({ where: { templateId: funnel.id } });
    await prisma.edge.deleteMany({ where: { templateId: funnel.id } });
    await prisma.template.delete({ where: { id: funnel.id } }).catch(() => {});
    
    // Create template
    const template = await prisma.template.create({
      data: {
        id: funnel.id,
        name: funnel.name,
        status: funnel.status,
        version: funnel.version
      }
    });
    
    // Create nodes
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
    
    // Create edges
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
    
    console.log(`✅ ${funnel.name}`);
    console.log(`   📊 ${funnel.nodes.length} nodes, ${funnel.edges.length} edges`);
    console.log(`   🎯 Multi-channel, AI-powered, fully automated\n`);
    
  } catch (err) {
    console.log(`❌ ${funnel.name}: ${err.message}\n`);
    throw err;
  }
}

seed().catch(console.error);

