// Create 3 Newbury Partners Demo Campaigns
// Run: node scripts/create_newbury_campaigns.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newburyCampaigns = [
  {
    id: 'camp_newbury_dealsheet_demo',
    name: 'DealSheet - Healthcare CFO Outreach',
    ownerName: 'Katie - Newbury Partners',
    ownerEmail: 'katie@newburypartners.com',
    ownerPhone: '(617) 555-0123',
    city: 'Boston',
    state: 'MA',
    eventType: 'b2b_outreach',
    eventDate: new Date('2025-12-01T00:00:00Z'),
    launchDate: new Date('2025-11-18T00:00:00Z'),
    status: 'ready_to_send',
    templateId: 'newbury_dealsheet',
    totalContacts: 247,
    enrichedContacts: 247,
    emailsGenerated: 247,
  },
  {
    id: 'camp_newbury_kanban_demo',
    name: 'Kanban - VP Sales Pipeline Demo',
    ownerName: 'Katie - Newbury Partners',
    ownerEmail: 'katie@newburypartners.com',
    ownerPhone: '(617) 555-0123',
    city: 'Austin',
    state: 'TX',
    eventType: 'b2b_outreach',
    eventDate: new Date('2025-12-01T00:00:00Z'),
    launchDate: new Date('2025-11-18T00:00:00Z'),
    status: 'ready_to_send',
    templateId: 'newbury_kanban',
    totalContacts: 189,
    enrichedContacts: 189,
    emailsGenerated: 189,
  },
  {
    id: 'camp_newbury_commissions_demo',
    name: 'Commissions - Finance Automation',
    ownerName: 'Katie - Newbury Partners',
    ownerEmail: 'katie@newburypartners.com',
    ownerPhone: '(617) 555-0123',
    city: 'Chicago',
    state: 'IL',
    eventType: 'b2b_outreach',
    eventDate: new Date('2025-12-01T00:00:00Z'),
    launchDate: new Date('2025-11-18T00:00:00Z'),
    status: 'ready_to_send',
    templateId: 'newbury_commissions',
    totalContacts: 156,
    enrichedContacts: 156,
    emailsGenerated: 156,
  },
];

// Sample contacts for each campaign
const sampleContacts = [
  // DealSheet contacts (Healthcare CFOs)
  {
    campaignId: 'camp_newbury_dealsheet_demo',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@healthstaff.com',
    phone: '+16175551001',
    company: 'HealthStaff Solutions',
    title: 'Chief Financial Officer',
    industry: 'Healthcare Staffing',
    firmRevenue: '$45M',
    city: 'Boston',
    state: 'MA',
  },
  {
    campaignId: 'camp_newbury_dealsheet_demo',
    name: 'David Chen',
    email: 'david.chen@medhire.com',
    phone: '+16175551002',
    company: 'MedHire Group',
    title: 'VP of Finance',
    industry: 'Healthcare Staffing',
    firmRevenue: '$62M',
    city: 'Philadelphia',
    state: 'PA',
  },
  {
    campaignId: 'camp_newbury_dealsheet_demo',
    name: 'Jennifer Walsh',
    email: 'jennifer.walsh@nursepro.com',
    phone: '+16175551003',
    company: 'NursePro Staffing',
    title: 'Controller',
    industry: 'Healthcare Staffing',
    firmRevenue: '$38M',
    city: 'Atlanta',
    state: 'GA',
  },
  
  // Kanban contacts (VP Sales / Recruitment Directors)
  {
    campaignId: 'camp_newbury_kanban_demo',
    name: 'Mike Thompson',
    email: 'mike.thompson@techrecruit.com',
    phone: '+15125552001',
    company: 'TechRecruit Partners',
    title: 'VP of Sales',
    industry: 'IT Staffing',
    firmRevenue: '$30M',
    city: 'Austin',
    state: 'TX',
  },
  {
    campaignId: 'camp_newbury_kanban_demo',
    name: 'Amanda Rodriguez',
    email: 'amanda.r@talentfirst.com',
    phone: '+15125552002',
    company: 'TalentFirst Recruiting',
    title: 'Director of Recruiting',
    industry: 'General Staffing',
    firmRevenue: '$28M',
    city: 'Dallas',
    state: 'TX',
  },
  {
    campaignId: 'camp_newbury_kanban_demo',
    name: 'Robert Kim',
    email: 'robert.kim@staffpro.com',
    phone: '+15125552003',
    company: 'StaffPro Solutions',
    title: 'Chief Operating Officer',
    industry: 'Light Industrial Staffing',
    firmRevenue: '$52M',
    city: 'Houston',
    state: 'TX',
  },
  
  // Commissions contacts (CFOs / Finance Directors)
  {
    campaignId: 'camp_newbury_commissions_demo',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@executivesearch.com',
    phone: '+13125553001',
    company: 'Executive Search Partners',
    title: 'Chief Financial Officer',
    industry: 'Executive Search',
    firmRevenue: '$50M',
    city: 'Chicago',
    state: 'IL',
  },
  {
    campaignId: 'camp_newbury_commissions_demo',
    name: 'James Foster',
    email: 'james.foster@industrialstaffing.com',
    phone: '+13125553002',
    company: 'Industrial Staffing Corp',
    title: 'Finance Director',
    industry: 'Industrial Staffing',
    firmRevenue: '$72M',
    city: 'Chicago',
    state: 'IL',
  },
  {
    campaignId: 'camp_newbury_commissions_demo',
    name: 'Patricia Nguyen',
    email: 'patricia.nguyen@nurseplacements.com',
    phone: '+13125553003',
    company: 'Nurse Placements Inc',
    title: 'VP of Finance & Operations',
    industry: 'Healthcare Staffing',
    firmRevenue: '$41M',
    city: 'Chicago',
    state: 'IL',
  },
];

async function seed() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🎯 CREATING NEWBURY DEMO CAMPAIGNS');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Create campaigns
    console.log('Creating campaigns...\n');
    for (const camp of newburyCampaigns) {
      try {
        await prisma.campaign.upsert({
          where: { id: camp.id },
          create: camp,
          update: camp
        });
        console.log(`  ✅ ${camp.name}`);
      } catch (err) {
        console.log(`  ❌ ${camp.name}: ${err.message}`);
      }
    }
    
    // Create contacts
    console.log('\nCreating sample contacts...\n');
    for (const contact of sampleContacts) {
      try {
        const existingContact = await prisma.contact.findFirst({
          where: { 
            email: contact.email,
            campaignId: contact.campaignId 
          }
        });
        
        if (!existingContact) {
          await prisma.contact.create({
            data: {
              campaignId: contact.campaignId,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              company: contact.company,
              city: contact.city,
              state: contact.state,
              status: 'new',
              rawJson: JSON.stringify({
                title: contact.title,
                industry: contact.industry,
                firmRevenue: contact.firmRevenue,
              }),
            }
          });
          console.log(`  ✅ ${contact.name} (${contact.company})`);
        } else {
          console.log(`  ⏭️  ${contact.name} already exists`);
        }
      } catch (err) {
        console.log(`  ❌ ${contact.name}: ${err.message}`);
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 NEWBURY CAMPAIGNS READY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ 3 Campaigns Created`);
    console.log(`✅ ${sampleContacts.length} Sample Contacts Added`);
    console.log('\n🔥 Refresh browser to see campaigns in inbox!\n');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch(console.error);

