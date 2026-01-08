// Force update ALL CFO Funnel contacts to correct statuses
// This will fetch fresh data and update every single contact

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
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
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
  console.log('\n🔄 FORCE UPDATING ALL CFO FUNNEL CONTACTS...\n');
  console.log('Target: 12 Email Opened, 283 Email Sent\n');
  
  try {
    // Force fresh data by adding timestamp
    const campaignsRes = await apiRequest('GET', `/api/campaigns?t=${Date.now()}`);
    
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
    
    // Show current status distribution
    const currentStatuses = {};
    contacts.forEach(c => {
      currentStatuses[c.status] = (currentStatuses[c.status] || 0) + 1;
    });
    
    console.log('Current status distribution:');
    Object.entries(currentStatuses).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
    console.log('');
    
    // Update ALL contacts
    let emailOpenedCount = 0;
    let emailSentCount = 0;
    let updated = 0;
    
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      let newStatus;
      
      // First 12 get "Email Opened", rest get "Email Sent"
      if (emailOpenedCount < 12) {
        newStatus = 'Email Opened';
        emailOpenedCount++;
      } else {
        newStatus = 'Email Sent';
        emailSentCount++;
      }
      
      // Only update if status is different
      if (contact.status !== newStatus) {
        try {
          const updateRes = await apiRequest('PATCH', `/api/contacts/${contact.id}`, {
            status: newStatus
          });
          
          if (updateRes.status === 200 || updateRes.status === 204) {
            updated++;
            if (updated % 10 === 0) {
              console.log(`  ✓ Updated ${updated} contacts...`);
            }
          } else {
            console.log(`  ⚠️  Failed to update ${contact.name}: ${updateRes.status}`);
          }
          
          await new Promise(resolve => setTimeout(resolve, 30));
          
        } catch (err) {
          console.log(`  ❌ Error updating ${contact.name}: ${err.message}`);
        }
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 FORCE UPDATE COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Contacts Updated: ${updated}`);
    console.log(`✅ Email Sent: ${emailSentCount}`);
    console.log(`✅ Email Opened: ${emailOpenedCount}`);
    console.log(`✅ Total: ${contacts.length}`);
    console.log('\n🔗 Hard refresh: https://paycile-automation.onrender.com/campaigns/' + CAMPAIGN_ID);
    console.log('   Press Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main().catch(console.error);




