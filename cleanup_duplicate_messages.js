// Clean up duplicate messages - keep only 1 message per contact with Email Sent/Opened
// Delete all messages for contacts with No Activity

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CAMPAIGN_ID = 'cmk2tcx0q001e1403fls3rwc2';

async function main() {
  console.log('\n🧹 Cleaning up duplicate messages for CFO Funnel...\n');
  
  try {
    // Get all contacts for this campaign
    const contacts = await prisma.contact.findMany({
      where: { campaignId: CAMPAIGN_ID },
      include: {
        conversations: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' }
            }
          }
        }
      }
    });
    
    console.log(`Found ${contacts.length} contacts\n`);
    
    let messagesDeleted = 0;
    let conversationsDeleted = 0;
    
    for (const contact of contacts) {
      if (contact.status === 'No Activity') {
        // Delete ALL messages and conversations for No Activity contacts
        for (const conv of contact.conversations) {
          if (conv.messages.length > 0) {
            await prisma.message.deleteMany({
              where: { conversationId: conv.id }
            });
            messagesDeleted += conv.messages.length;
          }
          
          await prisma.conversation.delete({
            where: { id: conv.id }
          });
          conversationsDeleted++;
        }
      } else if (contact.status === 'Email Sent' || contact.status === 'Email Opened') {
        // Keep only the FIRST message, delete the rest
        for (const conv of contact.conversations) {
          if (conv.messages.length > 1) {
            const messagesToDelete = conv.messages.slice(1); // Keep first, delete rest
            
            for (const msg of messagesToDelete) {
              await prisma.message.delete({
                where: { id: msg.id }
              });
              messagesDeleted++;
            }
          }
        }
      }
      
      if ((contacts.indexOf(contact) + 1) % 25 === 0) {
        console.log(`  ✓ Processed ${contacts.indexOf(contact) + 1}/${contacts.length} contacts...`);
      }
    }
    
    // Verify final counts
    const finalStats = await prisma.contact.groupBy({
      by: ['status'],
      where: { campaignId: CAMPAIGN_ID },
      _count: true
    });
    
    const totalMessages = await prisma.message.count({
      where: {
        convo: {
          contact: {
            campaignId: CAMPAIGN_ID
          }
        }
      }
    });
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 CLEANUP COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`🗑️  Messages Deleted: ${messagesDeleted}`);
    console.log(`🗑️  Conversations Deleted: ${conversationsDeleted}`);
    console.log('\n📊 Final Status Distribution:');
    finalStats.forEach(s => {
      console.log(`   ${s.status}: ${s._count}`);
    });
    console.log(`\n📧 Total Messages Remaining: ${totalMessages}`);
    console.log('   (Should be 178: 12 opened + 166 sent)');
    console.log('\n🔗 View: https://paycile-automation.onrender.com/campaigns/' + CAMPAIGN_ID);
    console.log('\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
    console.error(err.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);




