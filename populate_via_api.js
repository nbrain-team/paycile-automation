// Populate CFO Insurance Mock Data via API calls
// This bypasses the need for deployment by using existing API endpoints

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://opticwise-backend-uq3o.onrender.com';
const CAMPAIGN_ID = 'cmk2tcx0q001e1403fls3rwc2'; // CFO Funnel campaign

// Parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split('\t');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index] ? values[index].trim() : '';
    });
    data.push(row);
  }
  
  return data;
}

// Make API request
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

// Get random status
function getRandomStatus(index) {
  const statuses = [
    { status: 'Email Sent', weight: 50 },
    { status: 'Email Opened', weight: 25 },
    { status: 'Link Clicked', weight: 10 },
    { status: 'Needs BDR', weight: 8 },
    { status: 'Received RSVP', weight: 5 },
    { status: 'No Activity', weight: 2 }
  ];
  
  const totalWeight = statuses.reduce((sum, s) => sum + s.weight, 0);
  const seed = (index * 37) % totalWeight;
  let cumulative = 0;
  
  for (const s of statuses) {
    cumulative += s.weight;
    if (seed < cumulative) return s.status;
  }
  
  return 'Email Sent';
}

async function main() {
  console.log('\n🚀 Populating CFO Insurance Campaign Mock Data via API...\n');
  
  try {
    console.log('✅ Using Campaign ID:', CAMPAIGN_ID);
    
    // Read CSV
    const csvPath = path.join(__dirname, 'sent-emails.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const contacts = parseCSV(csvContent);
    
    console.log(`\n📧 Processing ${contacts.length} contacts...\n`);
    
    const cities = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Austin'];
    const states = ['NY', 'CA', 'IL', 'MA', 'TX'];
    
    let created = 0;
    let errors = 0;
    
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const firstName = contact['First Name'] || '';
      const lastName = contact['Last Name'] || '';
      const email = contact['Email'] || '';
      const phone = contact['Corporate Phone'] || '';
      
      if (!email || !firstName) continue;
      
      const fullName = `${firstName} ${lastName}`.trim();
      const status = getRandomStatus(i);
      const company = `${lastName} Enterprises`;
      const city = cities[i % cities.length];
      const state = states[i % states.length];
      
      try {
        const contactData = {
          campaignId: CAMPAIGN_ID,
          name: fullName,
          email: email,
          phone: phone || undefined,
          company: company,
          city: city,
          state: state,
          status: status
        };
        
        const result = await apiRequest('POST', '/api/contacts', contactData);
        
        if (result.status === 200 || result.status === 201) {
          created++;
          if ((i + 1) % 25 === 0) {
            console.log(`  ✓ Created ${created} contacts...`);
          }
        } else {
          errors++;
        }
        
        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        errors++;
        console.log(`  ⚠️  Error creating ${email}:`, err.message);
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 MOCK DATA POPULATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Contacts Created: ${created}`);
    console.log(`⚠️  Errors: ${errors}`);
    console.log('\n🔗 View campaign: https://paycile-automation.onrender.com/campaigns/' + CAMPAIGN_ID);
    console.log('\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main().catch(console.error);

