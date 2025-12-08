// Create Testing Campaign with Testing Funnel
// Run: node scripts/create_testing_campaign.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

// Parse CSV manually
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = (values[idx] || '').replace(/^"|"$/g, '').trim();
    });
    rows.push(row);
  }
  return rows;
}

// Testing Campaign Definition
const testingCampaign = {
  id: 'campaign_testing_001',
  name: 'Testing Campaign',
  ownerName: 'Danny DeMichele',
  ownerEmail: 'danny@nbrain.ai',
  ownerPhone: '+17604940404',
  city: 'San Diego',
  state: 'CA',
  eventType: 'test',
  eventDate: new Date('2025-12-01'),
  launchDate: new Date('2025-11-21'),
  status: 'draft',
  videoLink: '',
  eventLink: '',
  hotelName: '',
  hotelAddress: '',
  calendlyLink: ''
};

// Testing Funnel Nodes
const testingFunnelNodes = [
  { 
    key: 'TEST_001', 
    type: 'start', 
    name: 'Start - Test Contacts', 
    posX: 50, 
    posY: 100 
  },
  { 
    key: 'TEST_002', 
    type: 'email_send', 
    name: 'Email: Test Message', 
    posX: 250, 
    posY: 100,
    configJson: JSON.stringify({
      subject: 'Paycile Automation Test Email',
      body: 'email test send from the paycile automation system, SMS should show up in 5 minutes'
    })
  },
  { 
    key: 'TEST_003', 
    type: 'wait', 
    name: 'Wait 5 Minutes', 
    posX: 450, 
    posY: 100,
    configJson: JSON.stringify({ duration: 'PT5M' }) // ISO 8601: 5 minutes
  },
  { 
    key: 'TEST_004', 
    type: 'sms_send', 
    name: 'SMS: Test Message', 
    posX: 650, 
    posY: 100,
    configJson: JSON.stringify({
      text: 'SMS testing message from the platform, all systems go.'
    })
  },
  { 
    key: 'TEST_005', 
    type: 'goal', 
    name: 'Test Complete', 
    posX: 850, 
    posY: 100 
  }
];

// Testing Funnel Edges (connections between nodes)
const testingFunnelEdges = [
  { fromKey: 'TEST_001', toKey: 'TEST_002' },
  { fromKey: 'TEST_002', toKey: 'TEST_003' },
  { fromKey: 'TEST_003', toKey: 'TEST_004' },
  { fromKey: 'TEST_004', toKey: 'TEST_005' }
];

async function createTestingCampaign() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🧪 CREATING TESTING CAMPAIGN & FUNNEL');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // 1. Create or update the campaign
    console.log('1️⃣  Creating campaign: "Testing Campaign"...');
    const campaign = await prisma.campaign.upsert({
      where: { id: testingCampaign.id },
      create: testingCampaign,
      update: testingCampaign
    });
    console.log(`   ✅ Campaign created: ${campaign.id}\n`);
    
    // 2. Delete existing nodes/edges if any
    await prisma.campaignEdge.deleteMany({ where: { campaignId: campaign.id } });
    await prisma.campaignNode.deleteMany({ where: { campaignId: campaign.id } });
    console.log('   🗑️  Cleared existing funnel nodes/edges\n');
    
    // 3. Create funnel nodes
    console.log('2️⃣  Creating Testing Funnel nodes...');
    for (const node of testingFunnelNodes) {
      await prisma.campaignNode.create({
        data: {
          campaignId: campaign.id,
          key: node.key,
          type: node.type,
          name: node.name,
          posX: node.posX,
          posY: node.posY,
          configJson: node.configJson || null
        }
      });
      console.log(`   ✅ ${node.name} (${node.type})`);
    }
    console.log('');
    
    // 4. Create funnel edges
    console.log('3️⃣  Creating funnel connections (edges)...');
    for (const edge of testingFunnelEdges) {
      await prisma.campaignEdge.create({
        data: {
          campaignId: campaign.id,
          fromKey: edge.fromKey,
          toKey: edge.toKey
        }
      });
      console.log(`   ✅ ${edge.fromKey} → ${edge.toKey}`);
    }
    console.log('');
    
    // 5. Load test contacts from CSV
    console.log('4️⃣  Loading test contacts from CSV...');
    const csvPath = path.join(__dirname, '../../../Paycile Testing Sheet - Sheet1.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.log(`   ⚠️  CSV file not found at: ${csvPath}`);
      console.log('   📝 Using test contacts data instead...\n');
      
      // Fallback contacts if CSV not found
      const testContacts = [
        { name: 'Danny DeMichele', email: 'danny@nbrain.ai', phone: '+17604940404' },
        { name: 'Cary Johnson', email: 'cary@nbrain.ai', phone: '+18584010480' },
        { name: 'Jim Fitzgerald', email: 'Jim@paycile.com', phone: '+18044055151' },
        { name: 'Steve Leighty', email: 'Steve@paycile.com', phone: '+18043498785' },
        { name: 'Paul Huntley', email: 'Paul@paycile.com', phone: '+15155567460' },
        { name: 'Grant Salk', email: 'Grant@paycile.com', phone: '+13202938568' },
        { name: 'Gelo Anglo', email: 'Gelo@paycile.com', phone: '+639776931235' }
      ];
      
      // Delete existing contacts for this campaign
      await prisma.contact.deleteMany({ where: { campaignId: campaign.id } });
      
      for (const contact of testContacts) {
        await prisma.contact.create({
          data: {
            campaignId: campaign.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            status: 'active'
          }
        });
        console.log(`   ✅ ${contact.name} (${contact.email})`);
      }
    } else {
      const csvText = fs.readFileSync(csvPath, 'utf-8');
      const rows = parseCSV(csvText);
      
      // Delete existing contacts for this campaign
      await prisma.contact.deleteMany({ where: { campaignId: campaign.id } });
      
      for (const row of rows) {
        const name = row['Name'] || '';
        const email = row['Email'] || '';
        const phone = row['Cell Phone'] || '';
        
        if (name && (email || phone)) {
          // Normalize phone number
          let normalizedPhone = phone.replace(/\D/g, '');
          if (normalizedPhone.length === 10) {
            normalizedPhone = `+1${normalizedPhone}`;
          } else if (normalizedPhone.length === 11 && normalizedPhone.startsWith('1')) {
            normalizedPhone = `+${normalizedPhone}`;
          } else if (normalizedPhone.length > 11) {
            normalizedPhone = `+${normalizedPhone}`;
          }
          
          await prisma.contact.create({
            data: {
              campaignId: campaign.id,
              name: name,
              email: email,
              phone: normalizedPhone || null,
              status: 'active'
            }
          });
          console.log(`   ✅ ${name} (${email || normalizedPhone})`);
        }
      }
    }
    
    // 6. Update contact count
    const contactCount = await prisma.contact.count({ where: { campaignId: campaign.id } });
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { totalContacts: contactCount }
    });
    
    console.log(`\n   📊 Total Contacts: ${contactCount}\n`);
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ TESTING CAMPAIGN CREATED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('📋 Campaign Details:');
    console.log(`   Name: ${campaign.name}`);
    console.log(`   ID: ${campaign.id}`);
    console.log(`   Status: ${campaign.status} (ready but not triggered)`);
    console.log(`   Contacts: ${contactCount} test contacts loaded`);
    console.log('');
    console.log('🔄 Funnel Flow:');
    console.log('   1. Email: "email test send from the paycile automation system..."');
    console.log('   2. Wait: 5 minutes');
    console.log('   3. SMS: "SMS testing message from the platform, all systems go."');
    console.log('');
    console.log('⏸️  Campaign is in DRAFT mode - ready to trigger when you are!');
    console.log('═══════════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Error creating testing campaign:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestingCampaign();

