// Update Derek's profile and CFO Property Management template content
const { PrismaClient } = require('@prisma/client');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a/paycile_automation_db';

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } }
});

const TEMPLATE_ID = 'cmm0u58qj0000rkmj6gmk3jeh';
const DEREK_USER_ID = 'cmlidftn50000nwxt63mcn342';

async function main() {
  // 1. Update Derek's profile with phone and Calendly
  console.log('Updating Derek Stewart profile...');
  await prisma.user.update({
    where: { id: DEREK_USER_ID },
    data: {
      phone: '610-207-4324',
      calendlyLink: 'https://calendly.com/derek-paycile/30min',
    }
  });
  const derek = await prisma.user.findUnique({ where: { id: DEREK_USER_ID }, select: { name: true, phone: true, calendlyLink: true } });
  console.log('  Derek profile updated:', derek);

  // 2. Update Email 1: first-touch email
  const email1Body = [
    'Hi {{contact.first_name}},',
    '',
    "I'll be direct: Your finance team is likely spending 96+ days per year on manual payment reconciliation. Consider the impact:",
    '',
    '- 8-12 hours per week matching carrier payments',
    '- 3-5 days at month-end reconciling across entities',
    '- Countless hours investigating exceptions and errors',
    '',
    '<strong>What if you could automate all of it?</strong>',
    '',
    'Paycile offers real-time cash visibility across all carriers, entities, and accounts\u2014without the manual work. Our customers save 96+ days annually and close their books in days, not weeks.',
    '',
    'I\'d like to show you how in a quick 30-minute executive demo. You can <a href="{{sender.calendly_link}}">book a time directly here</a> or reply to this email, and I\'ll send over some options.',
    '',
    'Best,',
    '{{sender.signature_minimal}}',
  ].join('\n');

  // 3. Update Email 2: follow-up email
  const email2Body = [
    'Hi {{contact.first_name}},',
    '',
    'Just following up on my last email about transforming your reconciliation process. With Paycile, you\'re not just automating routine tasks; you\'re enabling:',
    '',
    '- Faster close cycles',
    '- Lower compliance anxiety with audit-ready trails',
    '- Significant reduction in reconciliation hours and exception firefighting',
    '',
    'Can we take 30 minutes to explore how this can be your reality? <a href="{{sender.calendly_link}}">Let\'s find a time that works for you.</a>',
    '',
    'Best,',
    '{{sender.signature_full}}',
  ].join('\n');

  // Load template nodes
  const nodes = await prisma.node.findMany({ where: { templateId: TEMPLATE_ID } });

  for (const node of nodes) {
    if (node.type !== 'email_send' || !node.configJson) continue;
    const cfg = JSON.parse(node.configJson);

    if (node.key === 'N10') {
      console.log('\nUpdating Email 1 (N10):', node.name);
      cfg.content = cfg.content || {};
      cfg.content.body = email1Body;
      await prisma.node.update({ where: { id: node.id }, data: { configJson: JSON.stringify(cfg) } });
      console.log('  Updated.');
    }

    if (node.key === 'N30') {
      console.log('\nUpdating Email 2 (N30):', node.name);
      cfg.content = cfg.content || {};
      cfg.content.body = email2Body;
      await prisma.node.update({ where: { id: node.id }, data: { configJson: JSON.stringify(cfg) } });
      console.log('  Updated.');
    }
  }

  // 4. Also update any campaigns that were created from this template
  const campaignNodes = await prisma.campaignNode.findMany({
    where: {
      campaign: { templateId: TEMPLATE_ID },
      type: 'email_send',
    }
  });

  for (const cn of campaignNodes) {
    if (!cn.configJson) continue;
    const cfg = JSON.parse(cn.configJson);

    if (cn.key === 'N10') {
      console.log('\nUpdating Campaign Node (N10):', cn.name);
      cfg.content = cfg.content || {};
      cfg.content.body = email1Body;
      await prisma.campaignNode.update({ where: { id: cn.id }, data: { configJson: JSON.stringify(cfg) } });
      console.log('  Updated.');
    }

    if (cn.key === 'N30') {
      console.log('\nUpdating Campaign Node (N30):', cn.name);
      cfg.content = cfg.content || {};
      cfg.content.body = email2Body;
      await prisma.campaignNode.update({ where: { id: cn.id }, data: { configJson: JSON.stringify(cfg) } });
      console.log('  Updated.');
    }
  }

  console.log('\nDone!');
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
