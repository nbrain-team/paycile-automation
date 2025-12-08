// Seed Test Inbox Messages for AI Response Testing
// Run: node scripts/seed_test_messages.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('\n📬 Creating test inbox messages...\n');

  try {
    // Get or create a test contact
    const campaigns = await prisma.campaign.findMany({ take: 1 });
    if (!campaigns.length) {
      console.log('❌ No campaigns found. Please create a campaign first.');
      await prisma.$disconnect();
      return;
    }

    const campaign = campaigns[0];
    console.log(`✓ Using campaign: ${campaign.name}`);

    // Create test contact
    let contact = await prisma.contact.findFirst({
      where: { email: 'test@example.com' }
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          campaignId: campaign.id,
          name: 'John Smith',
          email: 'test@example.com',
          phone: '+15555551234',
          status: 'Needs BDR',
          company: 'Test Company Inc'
        }
      });
      console.log(`✓ Created test contact: ${contact.name}`);
    } else {
      console.log(`✓ Using existing contact: ${contact.name}`);
    }

    // Create conversation
    let conversation = await prisma.conversation.findFirst({
      where: { contactId: contact.id, channel: 'sms' }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          contactId: contact.id,
          channel: 'sms'
        }
      });
      console.log('✓ Created conversation');
    }

    // Create test messages
    const testMessages = [
      {
        direction: 'out',
        text: 'Hi John, this is Katie from Paycile. I wanted to reach out about automating your reconciliation process. Do you have time for a quick call this week?',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        direction: 'in',
        text: 'Hi Katie, thanks for reaching out. Can you tell me more about what Paycile does? We currently use QuickBooks.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        direction: 'out',
        text: 'Absolutely! Paycile automates bank reconciliation and helps finance teams save 90%+ of their time. We integrate directly with QuickBooks. Would you be open to a 15-minute demo?',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
      },
      {
        direction: 'in',
        text: 'That sounds interesting. What does the pricing look like? And do you have any case studies from companies similar to ours?',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      }
    ];

    for (const msg of testMessages) {
      const existing = await prisma.message.findFirst({
        where: {
          conversationId: conversation.id,
          text: msg.text
        }
      });

      if (!existing) {
        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            direction: msg.direction,
            text: msg.text,
            createdAt: msg.createdAt
          }
        });
        console.log(`  ✅ ${msg.direction === 'in' ? '📥 Inbound' : '📤 Outbound'}: ${msg.text.substring(0, 50)}...`);
      }
    }

    console.log('\n═══════════════════════════════════════════');
    console.log('✅ Test messages created successfully!');
    console.log('═══════════════════════════════════════════');
    console.log('\nNow you can:');
    console.log('  1. Refresh your browser');
    console.log('  2. Go to Inbox');
    console.log('  3. Select the conversation with John Smith');
    console.log('  4. Click "✨ Generate Response With AI" button');
    console.log('\n');

    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();






