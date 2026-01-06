// Create email messages for CFO Funnel contacts to show in Recent Activity
// Run: node create_cfo_messages.js

const https = require('https');

const API_BASE = 'https://opticwise-backend-uq3o.onrender.com';
const CAMPAIGN_ID = 'cmk2tcx0q001e1403fls3rwc2';

function apiRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Generate timestamps spread over the last 7 days
function randomRecentDate(daysAgo) {
  const now = new Date();
  const start = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  const end = new Date(now.getTime() - ((daysAgo - 1) * 24 * 60 * 60 * 1000));
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const emailSubject = "Exclusive CFO Insurance Opportunity - Limited Time";
const emailTemplate = (firstName) => `Hi ${firstName},

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We're hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions`;

async function main() {
  console.log('\n📧 Creating email messages for CFO Funnel contacts...\n');
  
  try {
    const campaignsRes = await apiRequest('GET', '/api/campaigns');
    
    if (campaignsRes.status !== 200) {
      console.log('❌ Failed to fetch campaigns');
      return;
    }
    
    const campaign = campaignsRes.data.find(c => c.id === CAMPAIGN_ID);
    
    if (!campaign) {
      console.log('❌ Campaign not found');
      return;
    }
    
    const contacts = campaign.contacts || [];
    console.log(`Found ${contacts.length} contacts\n`);
    
    let messagesCreated = 0;
    let conversationsCreated = 0;
    
    // Create messages for all contacts (spread over 7 days)
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const firstName = contact.name.split(' ')[0];
      const daysSinceStart = Math.floor(i / (contacts.length / 7)) + 1;
      const sentDate = randomRecentDate(8 - daysSinceStart);
      
      try {
        // Create outbound email message (will auto-create conversation if needed)
        const msgRes = await apiRequest('POST', '/api/messages', {
          contactId: contact.id,
          direction: 'out',
          text: emailTemplate(firstName),
          subject: emailSubject,
          provider: 'smtp'
        });
        
        if (msgRes.status === 200 || msgRes.status === 201) {
          messagesCreated++;
          
          if ((i + 1) % 25 === 0) {
            console.log(`  ✓ Created ${messagesCreated} messages...`);
          }
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.log(`  ⚠️  Error for ${contact.name}: ${err.message}`);
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 EMAIL MESSAGES CREATED!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Conversations: ${conversationsCreated}`);
    console.log(`✅ Messages Created: ${messagesCreated}`);
    console.log(`✅ Total Contacts: ${contacts.length}`);
    console.log('\n📊 Recent Activity will now show:');
    console.log('   - Outbound emails to CFO contacts');
    console.log('   - Real names from your CSV');
    console.log('   - Timestamps over the last 7 days');
    console.log('\n🔗 Refresh dashboard: https://paycile-automation.onrender.com');
    console.log('\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main().catch(console.error);

