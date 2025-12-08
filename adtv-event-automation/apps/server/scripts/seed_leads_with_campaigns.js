const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('\n🌱 Seeding Paycile Campaigns and Leads...\n');

  try {
    // 1. Create/Get Campaigns
    console.log('📊 Creating campaigns...');
    
    const campaignData = [
      {
        id: 'camp_cfo_insurance_001',
        name: 'CFO Outreach - Insurance Vertical',
        ownerName: 'Paycile Team',
        ownerEmail: 'team@paycile.com',
        eventType: 'b2b_outreach',
        eventDate: new Date('2025-11-15'),
        launchDate: new Date('2025-11-15'),
        status: 'active',
        templateId: 'tpl_cfo_insurance'
      },
      {
        id: 'camp_controller_multi_001',
        name: 'Controller Campaign - Multi-Entity',
        ownerName: 'Paycile Team',
        ownerEmail: 'team@paycile.com',
        eventType: 'b2b_outreach',
        eventDate: new Date('2025-11-18'),
        launchDate: new Date('2025-11-18'),
        status: 'active',
        templateId: 'tpl_controller_multi'
      },
      {
        id: 'camp_arap_funds_001',
        name: 'AR/AP - Unapplied Funds Recovery',
        ownerName: 'Paycile Team',
        ownerEmail: 'team@paycile.com',
        eventType: 'b2b_outreach',
        eventDate: new Date('2025-11-20'),
        launchDate: new Date('2025-11-20'),
        status: 'active',
        templateId: 'tpl_arap_funds'
      },
      {
        id: 'camp_propmgmt_yardi_001',
        name: 'Property Mgmt - Yardi Integration',
        ownerName: 'Paycile Team',
        ownerEmail: 'team@paycile.com',
        eventType: 'b2b_outreach',
        eventDate: new Date('2025-11-22'),
        launchDate: new Date('2025-11-22'),
        status: 'active',
        templateId: 'tpl_propmgmt_yardi'
      }
    ];

    const campaigns = {};
    for (const campData of campaignData) {
      const campaign = await prisma.campaign.upsert({
        where: { id: campData.id },
        create: campData,
        update: { name: campData.name, status: campData.status }
      });
      campaigns[campData.name] = campaign.id;
      console.log(`  ✅ ${campData.name}`);
    }

    // 2. Create Contacts
    console.log('\n👥 Creating B2B leads...\n');

    const leads = [
      // CFO - Insurance
      { campaign: campaigns['CFO Outreach - Insurance Vertical'], name: 'Robert Chen', company: 'Acme Insurance Group', email: 'robert.chen@acmeinsurance.com', phone: '+14155551234', city: 'San Francisco', state: 'CA', status: 'Needs BDR', stageKey: 'positive_response' },
      { campaign: campaigns['CFO Outreach - Insurance Vertical'], name: 'Jennifer Martinez', company: 'ProtecSure Insurance', email: 'j.martinez@protecsure.com', phone: '+16195552345', city: 'San Diego', state: 'CA', status: 'Received RSVP', stageKey: 'email_opened' },
      { campaign: campaigns['CFO Outreach - Insurance Vertical'], name: 'Michael Thompson', company: 'Guardian Insurance Co', email: 'mthompson@guardianins.com', phone: '+13105553456', city: 'Los Angeles', state: 'CA', status: 'No Activity', stageKey: 'email_sent' },
      { campaign: campaigns['CFO Outreach - Insurance Vertical'], name: 'Sarah Williams', company: 'Reliable Insurance Partners', email: 'sarah.w@reliableins.com', phone: '+15105554567', city: 'Oakland', state: 'CA', status: 'Needs BDR', stageKey: 'demo_link_clicked' },
      { campaign: campaigns['CFO Outreach - Insurance Vertical'], name: 'Catherine White', company: 'Insurance Professionals LLC', email: 'cwhite@insurancepros.com', phone: '+17145558901', city: 'Orange', state: 'CA', status: 'Showed Up To Event', stageKey: 'demo_completed' },
      
      // Controller - Multi-Entity
      { campaign: campaigns['Controller Campaign - Multi-Entity'], name: 'David Park', company: 'MultiState Corporation', email: 'dpark@multistatecorp.com', phone: '+14085555678', city: 'San Jose', state: 'CA', status: 'Received RSVP', stageKey: 'demo_scheduled' },
      { campaign: campaigns['Controller Campaign - Multi-Entity'], name: 'Lisa Anderson', company: 'Healthcare Systems Inc', email: 'landerson@healthcaresys.com', phone: '+16195556789', city: 'San Diego', state: 'CA', status: 'Needs BDR', stageKey: 'positive_email' },
      { campaign: campaigns['Controller Campaign - Multi-Entity'], name: 'James Rodriguez', company: 'Premier Logistics Group', email: 'jrodriguez@logisticsco.com', phone: '+17145557890', city: 'Irvine', state: 'CA', status: 'No Activity', stageKey: 'linkedin_connected' },
      { campaign: campaigns['Controller Campaign - Multi-Entity'], name: 'Amanda Johnson', company: 'Retail Holdings LLC', email: 'ajohnson@retailholdings.com', phone: '+18585558901', city: 'Santa Monica', state: 'CA', status: 'Needs BDR', stageKey: 'voicemail_callback' },
      { campaign: campaigns['Controller Campaign - Multi-Entity'], name: 'Brian Harris', company: 'Hospitality Management Group', email: 'bharris@hospitalitygroup.com', phone: '+18055559012', city: 'Santa Barbara', state: 'CA', status: 'Post Event #1', stageKey: 'trial_started' },
      
      // AR/AP - Unapplied Funds
      { campaign: campaigns['AR/AP - Unapplied Funds Recovery'], name: 'Patricia Davis', company: 'Medical Supply Distributors', email: 'pdavis@medicalsupply.com', phone: '+14085559012', city: 'Sunnyvale', state: 'CA', status: 'Received RSVP', stageKey: 'assessment_requested' },
      { campaign: campaigns['AR/AP - Unapplied Funds Recovery'], name: 'Kevin Lee', company: 'Construction Pro Inc', email: 'klee@constructionpro.com', phone: '+16195550123', city: 'San Diego', state: 'CA', status: 'Needs BDR', stageKey: 'analysis_link_clicked' },
      { campaign: campaigns['AR/AP - Unapplied Funds Recovery'], name: 'Maria Garcia', company: 'Wholesale Distribution Inc', email: 'mgarcia@wholesaleinc.com', phone: '+15625551234', city: 'Long Beach', state: 'CA', status: 'No Activity', stageKey: 'email_bounced' },
      { campaign: campaigns['AR/AP - Unapplied Funds Recovery'], name: 'Thomas Wright', company: 'Tech Services Group', email: 'twright@techservices.com', phone: '+14085552345', city: 'Palo Alto', state: 'CA', status: 'Received RSVP', stageKey: 'analysis_booked' },
      { campaign: campaigns['AR/AP - Unapplied Funds Recovery'], name: 'Jessica Moore', company: 'Pharma Distribution Co', email: 'jmoore@pharmadistrib.com', phone: '+16265550123', city: 'Pasadena', state: 'CA', status: 'Post Event #2', stageKey: 'evaluation_phase' },
      
      // Property Management - Yardi
      { campaign: campaigns['Property Mgmt - Yardi Integration'], name: 'Elizabeth Brown', company: 'Coastal Property Management', email: 'ebrown@coastalproperties.com', phone: '+18585553456', city: 'San Diego', state: 'CA', status: 'Received RSVP', stageKey: 'demo_scheduled' },
      { campaign: campaigns['Property Mgmt - Yardi Integration'], name: 'Richard Taylor', company: 'Urban Property Management', email: 'rtaylor@urbanpm.com', phone: '+13235554567', city: 'Los Angeles', state: 'CA', status: 'Needs BDR', stageKey: 'positive_response' },
      { campaign: campaigns['Property Mgmt - Yardi Integration'], name: 'Michelle Kim', company: 'Residential Property Group', email: 'mkim@residentialgroup.com', phone: '+19495555678', city: 'Irvine', state: 'CA', status: 'No Activity', stageKey: 'email_sent' },
      { campaign: campaigns['Property Mgmt - Yardi Integration'], name: 'Daniel Miller', company: 'West Coast Property Mgmt', email: 'dmiller@westcoastpm.com', phone: '+16195556789', city: 'San Diego', state: 'CA', status: 'Received RSVP', stageKey: 'linkedin_messaged' },
      { campaign: campaigns['Property Mgmt - Yardi Integration'], name: 'Christopher Lopez', company: 'Commercial Property Partners', email: 'clopez@commercialpm.com', phone: '+19495551234', city: 'Newport Beach', state: 'CA', status: 'Received Agreement', stageKey: 'contract_review' }
    ];

    let created = 0;
    for (const lead of leads) {
      try {
        await prisma.contact.create({
          data: {
            campaignId: lead.campaign,
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.phone,
            city: lead.city,
            state: lead.state,
            status: lead.status,
            stageKey: lead.stageKey
          }
        });
        console.log(`  ✅ ${lead.name} (${lead.company}) - ${lead.status}`);
        created++;
      } catch (err) {
        if (err.code === 'P2002') {
          console.log(`  ⏭️  ${lead.name} - already exists`);
        } else {
          console.log(`  ❌ ${lead.name}: ${err.message}`);
        }
      }
    }

    // Update campaign contact counts
    for (const [campName, campId] of Object.entries(campaigns)) {
      const count = await prisma.contact.count({ where: { campaignId: campId } });
      await prisma.campaign.update({
        where: { id: campId },
        data: { totalContacts: count }
      });
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🎉 Leads seeded successfully!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`✅ Created: ${created} contacts`);
    console.log('\n📊 By Campaign:');
    for (const [name, id] of Object.entries(campaigns)) {
      const count = await prisma.contact.count({ where: { campaignId: id } });
      console.log(`   • ${name}: ${count} leads`);
    }
    console.log('\n✅ Refresh browser and go to LEADS page!\n');

    await prisma.$disconnect();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seed().catch(console.error);
