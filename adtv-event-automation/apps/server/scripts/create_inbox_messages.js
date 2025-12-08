// Create sample inbox messages for Newbury campaigns
// Run: node scripts/create_inbox_messages.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('💬 CREATING INBOX MESSAGES FOR AI TESTING');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Get the Newbury contacts
    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          { campaignId: 'camp_newbury_dealsheet_demo' },
          { campaignId: 'camp_newbury_kanban_demo' },
          { campaignId: 'camp_newbury_commissions_demo' },
        ]
      }
    });
    
    console.log(`Found ${contacts.length} Newbury contacts\n`);
    
    // Sample incoming messages to test AI responses
    const sampleMessages = [
      {
        contactEmail: 'sarah.martinez@healthstaff.com',
        channel: 'email',
        subject: 'Re: Your Bullhorn is hiding $84K/month',
        body: `Katie,

Thanks for reaching out. I'm definitely interested in learning more about margin optimization. 

We do use GSA rates and I know our finance team spends a lot of time on this. Can you send over more information about how the integration works?

Also, what's the typical implementation timeline?

Thanks,
Sarah Martinez
CFO, HealthStaff Solutions`
      },
      {
        contactEmail: 'mike.thompson@techrecruit.com',
        channel: 'email',
        subject: 'Re: Your $30M firm has invisible profit',
        body: `Hi Katie,

The $84K number caught my attention. We're definitely struggling with pipeline visibility in Bullhorn.

My recruiters are constantly asking where candidates are in the process and our sales team has zero visibility.

Can we schedule a quick demo? I'd like to see how this works without disrupting our current Bullhorn setup.

Mike Thompson
VP of Sales, TechRecruit Partners`
      },
      {
        contactEmail: 'lisa.anderson@executivesearch.com',
        channel: 'email',
        subject: 'Re: Manual commission calculations',
        body: `Katie,

You're hitting a nerve. Our finance team is drowning in commission reconciliation, especially during Q4.

We have 5 different commission plans and data is scattered across multiple systems. The error rate is probably higher than we'd like to admit.

Is this something that can handle complex commission structures? Ours are pretty intricate.

Lisa Anderson
CFO, Executive Search Partners`
      },
      {
        contactEmail: 'david.chen@medhire.com',
        channel: 'sms',
        body: `Katie, interested in the margin calculator. Can you send me some info? -David`
      },
      {
        contactEmail: 'amanda.r@talentfirst.com',
        channel: 'email',
        subject: 'Re: Kanban demo',
        body: `Katie,

I'm skeptical. We've tried other Bullhorn add-ons before and they always end up causing more problems than they solve.

What makes Kanban different? And how do I know my team will actually use it?

Amanda Rodriguez
Director of Recruiting`
      },
    ];
    
    let messagesCreated = 0;
    
    for (const msg of sampleMessages) {
      const contact = contacts.find(c => c.email === msg.contactEmail);
      if (!contact) {
        console.log(`  ⏭️  Skipping ${msg.contactEmail} - contact not found`);
        continue;
      }
      
      try {
        // Create or get conversation
        let conversation = await prisma.conversation.findFirst({
          where: {
            contactId: contact.id,
            channel: msg.channel
          }
        });
        
        if (!conversation) {
          conversation = await prisma.conversation.create({
            data: {
              contactId: contact.id,
              channel: msg.channel
            }
          });
        }
        
        // Create incoming message
        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            direction: 'in',
            text: msg.body,
          }
        });
        
        messagesCreated++;
        console.log(`  ✅ Message from ${contact.name} (${msg.channel})`);
        
      } catch (err) {
        console.log(`  ❌ ${contact.name}: ${err.message}`);
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 INBOX MESSAGES CREATED!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ ${messagesCreated} messages added to inbox`);
    console.log('\n🔥 Refresh browser to see messages!');
    console.log('💡 Click any message and hit "Generate Response With AI"\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch(console.error);

