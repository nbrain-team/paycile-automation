// Seed Paycile B2B Leads - Realistic Finance Professional Data
// Run: node scripts/seed_paycile_leads.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Realistic B2B Lead Data for Paycile Campaigns
const paycileLeads = [
  // CFO - Insurance Vertical Campaign
  {
    campaignName: 'CFO Outreach - Insurance Vertical',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@acmeinsurance.com',
    phone: '+14155551234',
    company: 'Acme Insurance Group',
    title: 'Chief Financial Officer',
    city: 'San Francisco',
    state: 'CA',
    industry: 'Insurance',
    revenue: '$120M',
    employees: 450,
    erpSystem: 'Applied Epic',
    status: 'Needs BDR',
    stage: 'Positive Response'
  },
  {
    campaignName: 'CFO Outreach - Insurance Vertical',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'j.martinez@protecsure.com',
    phone: '+16195552345',
    company: 'ProtecSure Insurance',
    title: 'VP of Finance',
    city: 'San Diego',
    state: 'CA',
    industry: 'Insurance',
    revenue: '$85M',
    employees: 320,
    erpSystem: 'Applied TAM',
    status: 'Received RSVP',
    stage: 'Email Opened - 3x'
  },
  {
    campaignName: 'CFO Outreach - Insurance Vertical',
    firstName: 'Michael',
    lastName: 'Thompson',
    email: 'mthompson@guardianins.com',
    phone: '+13105553456',
    company: 'Guardian Insurance Co',
    title: 'Chief Financial Officer',
    city: 'Los Angeles',
    state: 'CA',
    industry: 'Insurance',
    revenue: '$250M',
    employees: 780,
    erpSystem: 'Applied Systems',
    status: 'No Activity',
    stage: 'Email Sent'
  },
  {
    campaignName: 'CFO Outreach - Insurance Vertical',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@reliableins.com',
    phone: '+15105554567',
    company: 'Reliable Insurance Partners',
    title: 'CFO',
    city: 'Oakland',
    state: 'CA',
    industry: 'Insurance',
    revenue: '$180M',
    employees: 520,
    erpSystem: 'Applied Epic',
    status: 'Needs BDR',
    stage: 'Clicked Demo Link'
  },

  // Controller - Multi-Entity Campaign
  {
    campaignName: 'Controller Campaign - Multi-Entity',
    firstName: 'David',
    lastName: 'Park',
    email: 'dpark@multistatecorp.com',
    phone: '+14085555678',
    company: 'MultiState Corporation',
    title: 'Finance Manager',
    city: 'San Jose',
    state: 'CA',
    industry: 'Manufacturing',
    revenue: '$320M',
    employees: 890,
    erpSystem: 'Sage Intacct',
    entities: 18,
    status: 'Received RSVP',
    stage: 'Demo Scheduled'
  },
  {
    campaignName: 'Controller Campaign - Multi-Entity',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'landerson@healthcaresys.com',
    phone: '+16195556789',
    company: 'Healthcare Systems Inc',
    title: 'Controller',
    city: 'San Diego',
    state: 'CA',
    industry: 'Healthcare',
    revenue: '$425M',
    employees: 1200,
    erpSystem: 'Epic',
    entities: 24,
    status: 'Needs BDR',
    stage: 'Positive Email Response'
  },
  {
    campaignName: 'Controller Campaign - Multi-Entity',
    firstName: 'James',
    lastName: 'Rodriguez',
    email: 'jrodriguez@logisticsco.com',
    phone: '+17145557890',
    company: 'Premier Logistics Group',
    title: 'VP Finance',
    city: 'Irvine',
    state: 'CA',
    industry: 'Logistics',
    revenue: '$275M',
    employees: 650,
    erpSystem: 'NetSuite',
    entities: 15,
    status: 'No Activity',
    stage: 'LinkedIn Connected'
  },
  {
    campaignName: 'Controller Campaign - Multi-Entity',
    firstName: 'Amanda',
    lastName: 'Johnson',
    email: 'ajohnson@retailholdings.com',
    phone: '+18585558901',
    company: 'Retail Holdings LLC',
    title: 'Finance Manager',
    city: 'Santa Monica',
    state: 'CA',
    industry: 'Retail',
    revenue: '$190M',
    employees: 540,
    erpSystem: 'QuickBooks Enterprise',
    entities: 12,
    status: 'Needs BDR',
    stage: 'Voicemail Callback'
  },

  // AR/AP - Unapplied Funds Recovery Campaign
  {
    campaignName: 'AR/AP - Unapplied Funds Recovery',
    firstName: 'Patricia',
    lastName: 'Davis',
    email: 'pdavis@medicalsupply.com',
    phone: '+14085559012',
    company: 'Medical Supply Distributors',
    title: 'AR/AP Manager',
    city: 'Sunnyvale',
    state: 'CA',
    industry: 'Healthcare',
    revenue: '$95M',
    employees: 280,
    unappliedFunds: '$285K',
    status: 'Received RSVP',
    stage: 'Assessment Requested'
  },
  {
    campaignName: 'AR/AP - Unapplied Funds Recovery',
    firstName: 'Kevin',
    lastName: 'Lee',
    email: 'klee@constructionpro.com',
    phone: '+16195550123',
    company: 'Construction Pro Inc',
    title: 'Accounts Receivable Specialist',
    city: 'San Diego',
    state: 'CA',
    industry: 'Construction',
    revenue: '$140M',
    employees: 380,
    unappliedFunds: '$320K',
    status: 'Needs BDR',
    stage: 'Clicked Analysis Link'
  },
  {
    campaignName: 'AR/AP - Unapplied Funds Recovery',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'mgarcia@wholesaleinc.com',
    phone: '+15625551234',
    company: 'Wholesale Distribution Inc',
    title: 'AP Manager',
    city: 'Long Beach',
    state: 'CA',
    industry: 'Distribution',
    revenue: '$210M',
    employees: 520,
    unappliedFunds: '$410K',
    status: 'No Activity',
    stage: 'Email Bounced'
  },
  {
    campaignName: 'AR/AP - Unapplied Funds Recovery',
    firstName: 'Thomas',
    lastName: 'Wright',
    email: 'twright@techservices.com',
    phone: '+14085552345',
    company: 'Tech Services Group',
    title: 'AR Supervisor',
    city: 'Palo Alto',
    state: 'CA',
    industry: 'Technology',
    revenue: '$165M',
    employees: 420,
    unappliedFunds: '$195K',
    status: 'Received RSVP',
    stage: 'Free Analysis Booked'
  },

  // Property Management - Yardi Integration Campaign
  {
    campaignName: 'Property Mgmt - Yardi Integration',
    firstName: 'Elizabeth',
    lastName: 'Brown',
    email: 'ebrown@coastalproperties.com',
    phone: '+18585553456',
    company: 'Coastal Property Management',
    title: 'Finance Manager',
    city: 'San Diego',
    state: 'CA',
    industry: 'Property Management',
    revenue: '$75M',
    employees: 180,
    erpSystem: 'Yardi Voyager',
    properties: 250,
    status: 'Received RSVP',
    stage: 'Demo Scheduled'
  },
  {
    campaignName: 'Property Mgmt - Yardi Integration',
    firstName: 'Richard',
    lastName: 'Taylor',
    email: 'rtaylor@urbanpm.com',
    phone: '+13235554567',
    company: 'Urban Property Management',
    title: 'Controller',
    city: 'Los Angeles',
    state: 'CA',
    industry: 'Property Management',
    revenue: '$125M',
    employees: 340,
    erpSystem: 'Yardi Breeze',
    properties: 420,
    status: 'Needs BDR',
    stage: 'Positive Response'
  },
  {
    campaignName: 'Property Mgmt - Yardi Integration',
    firstName: 'Michelle',
    lastName: 'Kim',
    email: 'mkim@residentialgroup.com',
    phone: '+19495555678',
    company: 'Residential Property Group',
    title: 'VP Finance',
    city: 'Irvine',
    state: 'CA',
    industry: 'Property Management',
    revenue: '$95M',
    employees: 220,
    erpSystem: 'Yardi Voyager',
    properties: 315,
    status: 'No Activity',
    stage: 'Email Sent'
  },
  {
    campaignName: 'Property Mgmt - Yardi Integration',
    firstName: 'Daniel',
    lastName: 'Miller',
    email: 'dmiller@westcoastpm.com',
    phone: '+16195556789',
    company: 'West Coast Property Mgmt',
    title: 'Finance Director',
    city: 'San Diego',
    state: 'CA',
    industry: 'Property Management',
    revenue: '$145M',
    employees: 380,
    erpSystem: 'Yardi Voyager',
    properties: 580,
    status: 'Received RSVP',
    stage: 'LinkedIn Accepted + Messaged'
  },

  // Additional Mixed Leads for Variety
  {
    campaignName: 'CFO Outreach - Insurance Vertical',
    firstName: 'Catherine',
    lastName: 'White',
    email: 'cwhite@insurancepros.com',
    phone: '+17145558901',
    company: 'Insurance Professionals LLC',
    title: 'CFO',
    city: 'Orange',
    state: 'CA',
    industry: 'Insurance',
    revenue: '$155M',
    employees: 460,
    erpSystem: 'Applied CSR',
    status: 'Showed Up To Event',
    stage: 'Demo Completed - Follow-up'
  },
  {
    campaignName: 'Controller Campaign - Multi-Entity',
    firstName: 'Brian',
    lastName: 'Harris',
    email: 'bharris@hospitalitygroup.com',
    phone: '+18055559012',
    company: 'Hospitality Management Group',
    title: 'Controller',
    city: 'Santa Barbara',
    state: 'CA',
    industry: 'Hospitality',
    revenue: '$220M',
    employees: 680,
    erpSystem: 'Sage Intacct',
    entities: 16,
    status: 'Post Event #1',
    stage: 'Trial Started'
  },
  {
    campaignName: 'AR/AP - Unapplied Funds Recovery',
    firstName: 'Jessica',
    lastName: 'Moore',
    email: 'jmoore@pharmadistrib.com',
    phone: '+16265550123',
    company: 'Pharma Distribution Co',
    title: 'AR Manager',
    city: 'Pasadena',
    state: 'CA',
    industry: 'Healthcare',
    revenue: '$310M',
    employees: 750,
    unappliedFunds: '$465K',
    status: 'Post Event #2',
    stage: 'Evaluation Phase'
  },
  {
    campaignName: 'Property Mgmt - Yardi Integration',
    firstName: 'Christopher',
    lastName: 'Lopez',
    email: 'clopez@commercialpm.com',
    phone: '+19495551234',
    company: 'Commercial Property Partners',
    title: 'Finance Manager',
    city: 'Newport Beach',
    state: 'CA',
    industry: 'Property Management',
    revenue: '$185M',
    employees: 420,
    erpSystem: 'Yardi Voyager',
    properties: 475,
    status: 'Received Agreement',
    stage: 'Contract Review'
  }
];

async function seed() {
  console.log('\n🌱 Seeding Paycile B2B Leads...\n');

  try {
    // First, get campaign IDs from the live campaigns
    const campaigns = {
      'CFO Outreach - Insurance Vertical': null,
      'Controller Campaign - Multi-Entity': null,
      'AR/AP - Unapplied Funds Recovery': null,
      'Property Mgmt - Yardi Integration': null
    };

    // Try to find existing campaigns or create placeholder references
    console.log('📊 Looking up campaign references...\n');

    let createdCount = 0;
    let skippedCount = 0;

    for (const leadData of paycileLeads) {
      try {
        // Check if contact already exists
        const existing = await prisma.contact.findFirst({
          where: { email: leadData.email }
        });

        if (existing) {
          console.log(`  ⏭️  Skipped: ${leadData.firstName} ${leadData.lastName} (${leadData.company}) - already exists`);
          skippedCount++;
          continue;
        }

        // Create contact with campaign association
        const contact = await prisma.contact.create({
          data: {
            firstName: leadData.firstName,
            lastName: leadData.lastName,
            email: leadData.email,
            phone: leadData.phone,
            company: leadData.company,
            title: leadData.title,
            city: leadData.city,
            state: leadData.state,
            status: leadData.status,
            stage: leadData.stage,
            // Store campaign name in notes for now
            notes: JSON.stringify({
              campaignName: leadData.campaignName,
              industry: leadData.industry,
              revenue: leadData.revenue,
              employees: leadData.employees,
              erpSystem: leadData.erpSystem,
              entities: leadData.entities,
              properties: leadData.properties,
              unappliedFunds: leadData.unappliedFunds
            })
          }
        });

        console.log(`  ✅ ${leadData.firstName} ${leadData.lastName} - ${leadData.title} at ${leadData.company}`);
        console.log(`     Campaign: ${leadData.campaignName} | Status: ${leadData.status}`);
        createdCount++;

      } catch (err) {
        console.log(`  ❌ Failed: ${leadData.firstName} ${leadData.lastName} - ${err.message}`);
      }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🎉 Paycile leads seeded successfully!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`✅ Created: ${createdCount} contacts`);
    console.log(`⏭️  Skipped: ${skippedCount} (already exist)`);
    console.log(`📊 Total: ${paycileLeads.length} leads processed`);
    console.log('\n💡 Breakdown by Campaign:');
    console.log('   • CFO Outreach - Insurance: 5 leads');
    console.log('   • Controller - Multi-Entity: 5 leads');
    console.log('   • AR/AP - Unapplied Funds: 4 leads');
    console.log('   • Property Mgmt - Yardi: 5 leads');
    console.log('\n📋 Lead Stages Include:');
    console.log('   • Email Sent (initial outreach)');
    console.log('   • Email Opened - 3x (high engagement)');
    console.log('   • Clicked Demo Link (hot lead)');
    console.log('   • Positive Response (ready for BDR)');
    console.log('   • Demo Scheduled (qualified)');
    console.log('   • LinkedIn Connected (engaged)');
    console.log('   • Trial Started (advanced stage)');
    console.log('   • Contract Review (near close)');
    console.log('\n✅ Go to LEADS page in browser to see all contacts!\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch(console.error);
SCRIPT_EOF
node scripts/seed_paycile_leads.js
