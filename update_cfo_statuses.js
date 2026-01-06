// Update CFO Funnel contacts to only show "Email Sent" and "Email Opened"
// Run: node update_cfo_statuses.js

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

async function main() {
  console.log('\n🔄 Updating CFO Funnel contact statuses...\n');
  
  try {
    // Get all campaigns to find contacts
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
    
    // Update statuses: 52% Email Sent, 48% Email Opened (to get 153 emails sent out of 295)
    let emailSentCount = 0;
    let emailOpenedCount = 0;
    const targetEmailSent = 153;
    const targetEmailOpened = contacts.length - targetEmailSent;
    
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      let newStatus;
      
      // Distribute statuses to reach target
      if (emailSentCount < targetEmailSent) {
        newStatus = 'Email Sent';
        emailSentCount++;
      } else {
        newStatus = 'Email Opened';
        emailOpenedCount++;
      }
      
      // Update contact status
      try {
        const updateRes = await apiRequest('PATCH', `/api/contacts/${contact.id}`, {
          status: newStatus
        });
        
        if (updateRes.status === 200 || updateRes.status === 204) {
          if ((i + 1) % 25 === 0) {
            console.log(`  ✓ Updated ${i + 1}/${contacts.length} contacts...`);
          }
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
        
      } catch (err) {
        console.log(`  ⚠️  Error updating ${contact.name}: ${err.message}`);
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 STATUS UPDATE COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Email Sent: ${emailSentCount}`);
    console.log(`✅ Email Opened: ${emailOpenedCount}`);
    console.log(`✅ Total: ${contacts.length}`);
    console.log('\n🔗 View campaign: https://paycile-automation.onrender.com/campaigns/' + CAMPAIGN_ID);
    console.log('\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main().catch(console.error);

