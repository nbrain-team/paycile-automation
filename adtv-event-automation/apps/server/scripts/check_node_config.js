// Check node configuration for CFO template
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkNodes() {
  try {
    const template = await prisma.template.findUnique({
      where: { id: 'cmk4g9s1b0000cq0xsa507s23' },
      include: { nodes: true }
    });
    
    if (!template) {
      console.log('❌ Template not found');
      return;
    }
    
    console.log('✅ Template:', template.name);
    console.log('📊 Total nodes:', template.nodes.length);
    console.log('\n📧 Email/Voicemail nodes with config:\n');
    
    const contentNodes = template.nodes.filter(n => 
      ['email_send', 'voicemail_drop'].includes(n.type)
    );
    
    console.log(`Found ${contentNodes.length} content nodes\n`);
    
    contentNodes.forEach(node => {
      const config = node.configJson ? JSON.parse(node.configJson) : {};
      console.log('Node:', node.key, '-', node.name);
      console.log('Type:', node.type);
      console.log('Has template_id:', !!config.template_id);
      if (config.template_id) {
        console.log('template_id:', config.template_id);
      }
      console.log('Full config:', JSON.stringify(config, null, 2));
      console.log('---\n');
    });
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkNodes();
