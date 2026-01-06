// Populate Mock Data for CFO Insurance Campaign
// Run: node scripts/populate_cfo_insurance_mock_data.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const CAMPAIGN_ID = 'live_qe1v81z2ye';

// Helper to generate realistic timestamps over the past 7 days
function randomDate(daysAgo) {
  const now = new Date();
  const start = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  const end = new Date(now.getTime() - ((daysAgo - 1) * 24 * 60 * 60 * 1000));
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Contact statuses with realistic distribution
const statusDistribution = [
  { status: 'Email Sent', weight: 50 },
  { status: 'Email Opened', weight: 25 },
  { status: 'Link Clicked', weight: 10 },
  { status: 'Needs BDR', weight: 8 },
  { status: 'Received RSVP', weight: 5 },
  { status: 'No Activity', weight: 2 }
];

function getRandomStatus() {
  const totalWeight = statusDistribution.reduce((sum, s) => sum + s.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const s of statusDistribution) {
    random -= s.weight;
    if (random <= 0) return s.status;
  }
  return 'Email Sent';
}

// Sample email subjects and bodies for the CFO Insurance campaign
const emailTemplates = [
  {
    subject: "Exclusive CFO Insurance Opportunity - Limited Time",
    body: `Hi {{name}},

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We're hosting a private event focused on innovative insurance solutions specifically designed for financial executives. This isn't your typical insurance pitch - we're talking about comprehensive coverage that understands the unique risks CFOs face.

Key benefits:
• Tailored coverage for executive liability
• Competitive rates negotiated specifically for CFOs
• Expert consultation on risk management
• Networking with industry peers

Would you be interested in learning more? I'd love to schedule a brief call to discuss how this could benefit you and your organization.

Best regards,
Stanley
Paycile Insurance Solutions`
  },
  {
    subject: "CFO-Specific Insurance Coverage - Let's Talk",
    body: `Hello {{name}},

As a CFO, you understand the importance of comprehensive risk management. I'm reaching out because we've developed an insurance program specifically for financial executives.

This program addresses:
- D&O coverage tailored for CFOs
- Cyber liability protection
- Professional indemnity
- Personal asset protection

I'd appreciate 15 minutes of your time to explore whether this could be a fit for your needs.

Are you available for a quick call this week?

Regards,
Stanley
stanley@paycile.com`
  }
];

// Sample inbound responses (for contacts that replied)
const inboundResponses = [
  "Thanks for reaching out. I'd be interested in learning more. When can we schedule a call?",
  "This sounds interesting. Can you send me more details about the coverage options?",
  "I'm currently reviewing our insurance policies. What makes your offering different?",
  "Yes, I'd like to discuss this. Are you available Thursday afternoon?",
  "Can you provide some case studies or references from other CFOs?",
  "I'm interested but quite busy this month. Can we connect early next month?",
  "Please send me the full proposal and pricing information.",
  "I'd like to include our risk manager in this conversation. Can you accommodate that?"
];

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📊 POPULATING MOCK DATA FOR CFO INSURANCE CAMPAIGN');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // Check if campaign exists
    const campaign = await prisma.campaign.findUnique({
      where: { id: CAMPAIGN_ID }
    });

    if (!campaign) {
      console.log(`❌ Campaign ${CAMPAIGN_ID} not found!`);
      console.log('Please create the campaign first or update the CAMPAIGN_ID in this script.\n');
      await prisma.$disconnect();
      return;
    }

    console.log(`✅ Found campaign: ${campaign.name}\n`);

    // Read the CSV file
    const csvPath = path.join(__dirname, '../../../sent-emails.csv');
    if (!fs.existsSync(csvPath)) {
      console.log(`❌ File not found: ${csvPath}`);
      await prisma.$disconnect();
      return;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Skip header row
    const dataLines = lines.slice(1);
    
    console.log(`📧 Processing ${dataLines.length} email addresses...\n`);

    let contactsCreated = 0;
    let conversationsCreated = 0;
    let messagesCreated = 0;
    let responsesCreated = 0;

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i];
      const parts = line.split('\t');
      
      if (parts.length < 3) continue;

      const firstName = parts[0]?.trim() || '';
      const lastName = parts[1]?.trim() || '';
      const email = parts[2]?.trim() || '';
      const phone = parts[3]?.trim() || '';

      if (!email || !firstName) continue;

      const fullName = `${firstName} ${lastName}`.trim();
      const status = getRandomStatus();
      
      // Determine which day the email was sent (spread over 7 days)
      const daysSinceStart = Math.floor(i / (dataLines.length / 7)) + 1;
      const sentDate = randomDate(8 - daysSinceStart);

      try {
        // Check if contact already exists
        let contact = await prisma.contact.findFirst({
          where: {
            email: email,
            campaignId: CAMPAIGN_ID
          }
        });

        if (!contact) {
          // Create contact
          contact = await prisma.contact.create({
            data: {
              campaignId: CAMPAIGN_ID,
              name: fullName,
              email: email,
              phone: phone || null,
              status: status,
              company: `${lastName} Enterprises`,
              city: ['New York', 'San Francisco', 'Chicago', 'Boston', 'Austin'][i % 5],
              state: ['NY', 'CA', 'IL', 'MA', 'TX'][i % 5],
              stageKey: 'N1',
              createdAt: sentDate
            }
          });
          contactsCreated++;
        }

        // Create email conversation
        let conversation = await prisma.conversation.findFirst({
          where: {
            contactId: contact.id,
            channel: 'email'
          }
        });

        if (!conversation) {
          conversation = await prisma.conversation.create({
            data: {
              contactId: contact.id,
              channel: 'email'
            }
          });
          conversationsCreated++;
        }

        // Create outbound email message
        const template = emailTemplates[i % emailTemplates.length];
        const personalizedBody = template.body.replace('{{name}}', firstName);

        const existingOutbound = await prisma.message.findFirst({
          where: {
            conversationId: conversation.id,
            direction: 'out'
          }
        });

        if (!existingOutbound) {
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              direction: 'out',
              text: personalizedBody,
              subject: template.subject,
              provider: 'smtp',
              providerMessageId: `msg_${Date.now()}_${i}`,
              createdAt: sentDate
            }
          });
          messagesCreated++;
        }

        // For contacts with "Needs BDR" or "Received RSVP" status, create inbound response
        if ((status === 'Needs BDR' || status === 'Received RSVP') && Math.random() > 0.3) {
          const responseDate = new Date(sentDate.getTime() + (Math.random() * 2 * 24 * 60 * 60 * 1000)); // 0-2 days after
          
          const existingInbound = await prisma.message.findFirst({
            where: {
              conversationId: conversation.id,
              direction: 'in'
            }
          });

          if (!existingInbound) {
            await prisma.message.create({
              data: {
                conversationId: conversation.id,
                direction: 'in',
                text: inboundResponses[Math.floor(Math.random() * inboundResponses.length)],
                subject: `Re: ${template.subject}`,
                provider: 'smtp',
                providerMessageId: `msg_in_${Date.now()}_${i}`,
                createdAt: responseDate
              }
            });
            responsesCreated++;
          }
        }

        // Progress indicator
        if ((i + 1) % 25 === 0) {
          console.log(`  ✓ Processed ${i + 1}/${dataLines.length} contacts...`);
        }

      } catch (err) {
        console.log(`  ⚠️  Error processing ${email}: ${err.message}`);
      }
    }

    // Update campaign totals
    const totalContacts = await prisma.contact.count({
      where: { campaignId: CAMPAIGN_ID }
    });

    await prisma.campaign.update({
      where: { id: CAMPAIGN_ID },
      data: {
        totalContacts: totalContacts,
        enrichedContacts: totalContacts,
        emailsGenerated: totalContacts,
        status: 'active'
      }
    });

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 MOCK DATA POPULATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Contacts Created: ${contactsCreated}`);
    console.log(`✅ Conversations Created: ${conversationsCreated}`);
    console.log(`✅ Outbound Emails: ${messagesCreated}`);
    console.log(`✅ Inbound Responses: ${responsesCreated}`);
    console.log(`✅ Total Contacts in Campaign: ${totalContacts}`);
    console.log('\n📊 Status Distribution:');
    
    const statusCounts = await prisma.contact.groupBy({
      by: ['status'],
      where: { campaignId: CAMPAIGN_ID },
      _count: true
    });

    statusCounts.forEach(s => {
      console.log(`   ${s.status}: ${s._count}`);
    });

    console.log('\n🔥 Refresh your browser to see the data!');
    console.log(`🔗 Campaign URL: https://paycile-automation.onrender.com/campaigns/${CAMPAIGN_ID}\n`);

  } catch (err) {
    console.error('❌ Error:', err);
    console.error(err.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);

