// Import Apollo Contacts to Property Management/Yardi Campaign
// Usage: node scripts/import_apollo_yardi_contacts.js

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n🎯 Importing Apollo Contacts to Property Management Campaign...\n');
  
  try {
    // Find or create the Property Management/Yardi campaign
    let campaign = await prisma.campaign.findFirst({
      where: {
        OR: [
          { name: { contains: 'Property Management', mode: 'insensitive' } },
          { name: { contains: 'Yardi', mode: 'insensitive' } }
        ]
      }
    });
    
    if (!campaign) {
      // Create new campaign using the Yardi funnel template
      const template = await prisma.template.findFirst({
        where: { name: { contains: 'Yardi', mode: 'insensitive' } }
      });
      
      campaign = await prisma.campaign.create({
        data: {
          name: 'Property Management - Yardi Integration Outreach',
          ownerName: 'Paycile Sales Team',
          ownerEmail: 'sales@paycile.com',
          eventType: 'b2b_outreach',
          eventDate: new Date().toISOString(),
          city: 'National',
          state: 'USA',
          status: 'draft',
          templateId: template?.id || null
        }
      });
      console.log(`✅ Created new campaign: ${campaign.name} (ID: ${campaign.id})`);
    } else {
      console.log(`✅ Found existing campaign: ${campaign.name} (ID: ${campaign.id})`);
    }
    
    // Read the Apollo CSV
    const csvPath = path.resolve(__dirname, '../../../apollo-contacts-export (27).csv');
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found: ${csvPath}`);
    }
    
    const csvText = fs.readFileSync(csvPath, 'utf8');
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    if (parsed.errors && parsed.errors.length > 0) {
      console.warn('⚠️  CSV parse warnings:', parsed.errors.length);
    }
    
    const rows = parsed.data.filter(r => r['First Name'] || r['Email']);
    
    console.log(`📄 Found ${rows.length} contacts in CSV\n`);
    
    // Map Apollo fields to contact structure
    const contacts = rows.map((row) => {
      const firstName = (row['First Name'] || '').trim();
      const lastName = (row['Last Name'] || '').trim();
      const name = `${firstName} ${lastName}`.trim() || 'Contact';
      const company = (row['Company Name'] || '').trim();
      const email = (row['Email'] || '').trim();
      const phone = (row['Work Direct Phone'] || row['Mobile Phone'] || row['Corporate Phone'] || '').trim();
      const title = (row['Title'] || '').trim();
      const city = (row['City'] || row['Company City'] || '').trim();
      const state = (row['State'] || row['Company State'] || '').trim();
      const country = (row['Country'] || '').trim();
      const linkedinUrl = (row['Person Linkedin Url'] || '').trim();
      const companyLinkedin = (row['Company Linkedin Url'] || '').trim();
      const website = (row['Website'] || '').trim();
      
      return {
        name,
        company,
        email,
        phone,
        city,
        state,
        url: website || linkedinUrl,
        status: 'No Activity',
        stageKey: null,
        rawJson: JSON.stringify({
          firstName,
          lastName,
          title,
          company,
          email,
          phone,
          city,
          state,
          country,
          linkedinUrl,
          companyLinkedin,
          website,
          apolloContactId: row['Apollo Contact Id'],
          apolloAccountId: row['Apollo Account Id'],
          technologies: row['Technologies'],
          employees: row['# Employees'],
          industry: row['Industry']
        })
      };
    });
    
    // Filter out contacts without email or phone
    const validContacts = contacts.filter(c => c.email || c.phone);
    
    console.log(`✅ ${validContacts.length} valid contacts (have email or phone)\n`);
    
    // Bulk insert in chunks
    const chunkSize = 100;
    let imported = 0;
    
    for (let i = 0; i < validContacts.length; i += chunkSize) {
      const chunk = validContacts.slice(i, i + chunkSize);
      
      for (const contact of chunk) {
        try {
          const created = await prisma.contact.create({
            data: {
              campaignId: campaign.id,
              name: contact.name,
              company: contact.company,
              email: contact.email,
              phone: contact.phone,
              city: contact.city,
              state: contact.state,
              url: contact.url,
              status: contact.status,
              stageKey: contact.stageKey,
              rawJson: contact.rawJson
            }
          });
          
          // Create conversation for each contact
          const channel = contact.phone ? 'sms' : 'email';
          await prisma.conversation.create({
            data: {
              contactId: created.id,
              channel
            }
          });
          
          imported++;
        } catch (err) {
          console.error(`   ❌ Failed to import: ${contact.name} (${contact.email})`);
        }
      }
      
      console.log(`   Imported ${Math.min((i + chunkSize), validContacts.length)}/${validContacts.length} contacts...`);
    }
    
    console.log(`\n✅ Successfully imported ${imported} contacts to campaign: ${campaign.name}`);
    console.log(`\n📊 Summary:`);
    console.log(`   Campaign ID: ${campaign.id}`);
    console.log(`   Campaign Name: ${campaign.name}`);
    console.log(`   Total Contacts: ${imported}`);
    console.log(`   Template: Property Management Yardi Integration\n`);
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));







