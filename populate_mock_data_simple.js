// Simple Mock Data Population Script
// This version can be run directly with: node populate_mock_data_simple.js
// Make sure to set DATABASE_URL environment variable

const fs = require('fs');
const path = require('path');

// Parse CSV manually (no dependencies needed)
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

// Generate SQL INSERT statements
function generateSQL() {
  const csvPath = path.join(__dirname, 'sent-emails.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const contacts = parseCSV(csvContent);
  
  const CAMPAIGN_ID = 'live_qe1v81z2ye';
  const sqlStatements = [];
  
  // Status distribution
  const statuses = [
    { status: 'Email Sent', weight: 50 },
    { status: 'Email Opened', weight: 25 },
    { status: 'Link Clicked', weight: 10 },
    { status: 'Needs BDR', weight: 8 },
    { status: 'Received RSVP', weight: 5 },
    { status: 'No Activity', weight: 2 }
  ];
  
  function getRandomStatus(index) {
    const totalWeight = statuses.reduce((sum, s) => sum + s.weight, 0);
    const seed = (index * 37) % totalWeight; // Deterministic "random"
    let cumulative = 0;
    for (const s of statuses) {
      cumulative += s.weight;
      if (seed < cumulative) return s.status;
    }
    return 'Email Sent';
  }
  
  function randomDate(daysAgo, index) {
    const now = new Date();
    const offsetMs = (daysAgo * 24 * 60 * 60 * 1000) - (index * 3600000 % (24 * 60 * 60 * 1000));
    return new Date(now.getTime() - offsetMs).toISOString();
  }
  
  const cities = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Austin'];
  const states = ['NY', 'CA', 'IL', 'MA', 'TX'];
  
  console.log('-- SQL Script to Populate CFO Insurance Campaign Mock Data');
  console.log('-- Campaign ID: ' + CAMPAIGN_ID);
  console.log('-- Generated: ' + new Date().toISOString());
  console.log('');
  console.log('BEGIN;');
  console.log('');
  
  contacts.forEach((contact, index) => {
    const firstName = contact['First Name'] || '';
    const lastName = contact['Last Name'] || '';
    const email = contact['Email'] || '';
    const phone = contact['Corporate Phone'] || '';
    
    if (!email || !firstName) return;
    
    const fullName = `${firstName} ${lastName}`.trim();
    const status = getRandomStatus(index);
    const daysSinceStart = Math.floor(index / (contacts.length / 7)) + 1;
    const sentDate = randomDate(8 - daysSinceStart, index);
    const company = `${lastName} Enterprises`;
    const city = cities[index % cities.length];
    const state = states[index % states.length];
    
    const contactId = `contact_cfo_${index}_${Date.now()}`;
    const conversationId = `conv_cfo_${index}_${Date.now()}`;
    const messageId = `msg_cfo_${index}_${Date.now()}`;
    
    // Escape single quotes for SQL
    const escapedName = fullName.replace(/'/g, "''");
    const escapedEmail = email.replace(/'/g, "''");
    const escapedCompany = company.replace(/'/g, "''");
    const escapedCity = city.replace(/'/g, "''");
    
    // Insert Contact
    sqlStatements.push(`
-- Contact ${index + 1}: ${escapedName}
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('${contactId}', '${CAMPAIGN_ID}', '${escapedName}', '${escapedEmail}', ${phone ? `'${phone}'` : 'NULL'}, '${escapedCompany}', '${escapedCity}', '${state}', '${status}', 'N1', '${sentDate}')
ON CONFLICT ("id") DO NOTHING;
`);
    
    // Insert Conversation
    sqlStatements.push(`
INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('${conversationId}', '${contactId}', 'email')
ON CONFLICT ("id") DO NOTHING;
`);
    
    // Insert Outbound Message
    const emailSubject = 'Exclusive CFO Insurance Opportunity - Limited Time';
    const emailBody = `Hi ${firstName},

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We're hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions`;
    
    const escapedSubject = emailSubject.replace(/'/g, "''");
    const escapedBody = emailBody.replace(/'/g, "''");
    
    sqlStatements.push(`
INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('${messageId}', '${conversationId}', 'out', '${escapedBody}', '${escapedSubject}', 'smtp', 'msg_${Date.now()}_${index}', '${sentDate}')
ON CONFLICT ("id") DO NOTHING;
`);
    
    // Add inbound response for some contacts
    if ((status === 'Needs BDR' || status === 'Received RSVP') && index % 3 === 0) {
      const responseDate = new Date(new Date(sentDate).getTime() + (Math.random() * 2 * 24 * 60 * 60 * 1000)).toISOString();
      const inboundMessageId = `msg_in_cfo_${index}_${Date.now()}`;
      const response = "Thanks for reaching out. I'd be interested in learning more. When can we schedule a call?";
      const escapedResponse = response.replace(/'/g, "''");
      
      sqlStatements.push(`
INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('${inboundMessageId}', '${conversationId}', 'in', '${escapedResponse}', 'Re: ${escapedSubject}', 'smtp', 'msg_in_${Date.now()}_${index}', '${responseDate}')
ON CONFLICT ("id") DO NOTHING;
`);
    }
  });
  
  // Update campaign totals
  sqlStatements.push(`
-- Update Campaign Totals
UPDATE "Campaign"
SET "totalContacts" = ${contacts.length},
    "enrichedContacts" = ${contacts.length},
    "emailsGenerated" = ${contacts.length},
    "status" = 'active',
    "updatedAt" = NOW()
WHERE "id" = '${CAMPAIGN_ID}';
`);
  
  console.log(sqlStatements.join('\n'));
  console.log('');
  console.log('COMMIT;');
  console.log('');
  console.log(`-- Total contacts: ${contacts.length}`);
  console.log(`-- Total SQL statements: ${sqlStatements.length}`);
}

try {
  generateSQL();
} catch (error) {
  console.error('Error generating SQL:', error);
  process.exit(1);
}




