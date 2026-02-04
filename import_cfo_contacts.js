#!/usr/bin/env node
/**
 * Import CFO Contacts from Apollo CSV Export
 */

const fs = require('fs');

const API_BASE = process.env.API_BASE || 'https://opticwise-backend-uq3o.onrender.com';
const CSV_FILE = '/Users/dannydemichele/Downloads/cfo-apollo-contacts-export (27).csv';

async function importContacts() {
  try {
    console.log('📂 Reading CSV file...\n');
    
    const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    const contacts = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      // Simple CSV parsing (handles quoted fields)
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim().replace(/^'/, '').replace(/'$/, ''));
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim().replace(/^'/, '').replace(/'$/, ''));
      
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      
      const firstName = row['First Name'] || '';
      const lastName = row['Last Name'] || '';
      const name = `${firstName} ${lastName}`.trim();
      const email = row['Email'] || '';
      const phone = row['Corporate Phone'] || row['Phone'] || '';
      
      if (name && (email || phone)) {
        contacts.push({
          name,
          company: row['Company'] || row['Organization'] || '',
          email,
          phone,
          city: row['City'] || '',
          state: row['State'] || '',
          url: row['Website'] || row['LinkedIn'] || '',
          status: 'No Activity',
          stageId: null,
          raw: null
        });
      }
    }
    
    console.log(`📊 Parsed ${contacts.length} valid contacts\n`);
    
    // Create campaign
    console.log('📝 Creating campaign: CFO Contacts...\n');
    
    const campaignResponse = await fetch(`${API_BASE}/api/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'CFO Contacts',
        ownerName: 'Paycile Team',
        ownerEmail: 'jim@paycile.com',
        eventType: 'b2b_outreach',
        eventDate: '2026-02-05',
        status: 'archived' // Mark as archived so it's hidden from main campaign list
      })
    });
    
    if (!campaignResponse.ok) {
      const error = await campaignResponse.text();
      throw new Error(`Failed to create campaign: ${error}`);
    }
    
    const campaign = await campaignResponse.json();
    console.log(`✅ Campaign created: ${campaign.id}\n`);
    
    // Import contacts in batches
    console.log(`📋 Importing ${contacts.length} contacts in batches...\n`);
    
    const batchSize = 100;
    let imported = 0;
    
    for (let i = 0; i < contacts.length; i += batchSize) {
      const batch = contacts.slice(i, i + batchSize);
      
      const importResponse = await fetch(`${API_BASE}/api/campaigns/${campaign.id}/contacts/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: batch })
      });
      
      if (!importResponse.ok) {
        const error = await importResponse.text();
        console.error(`❌ Batch ${Math.floor(i/batchSize) + 1} failed: ${error}`);
        continue;
      }
      
      imported += batch.length;
      console.log(`   ✅ Batch ${Math.floor(i/batchSize) + 1}: ${batch.length} contacts`);
    }
    
    console.log(`\n✅ Import Complete!`);
    console.log(`   Campaign: CFO Contacts`);
    console.log(`   Campaign ID: ${campaign.id}`);
    console.log(`   Contacts Imported: ${imported}`);
    console.log(`\n🔗 View at: https://paycile-automation.onrender.com/campaigns/${campaign.id}`);
    console.log(`🔗 Leads page: https://paycile-automation.onrender.com/leads\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importContacts();
