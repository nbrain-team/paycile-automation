// Seed Paycile Funnel Templates and Content Templates
// Run: node scripts/seed_paycile_templates.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Paycile Funnel Template Definitions
const paycileFunnelTemplates = [
  {
    id: 'tpl_cfo_insurance',
    name: 'CFO Outreach - Insurance Vertical',
    status: 'published',
    version: 1,
    nodes: [
      { key: 'N00', type: 'start', name: 'CFO Target List (Insurance/PropMgmt)', posX: 100, posY: 100 },
      { key: 'N10', type: 'stage', name: 'Initial Outreach - Day 1', posX: 300, posY: 100 },
      { key: 'N11', type: 'email_send', name: 'Email: Save 96 Days on Period-End Close', posX: 500, posY: 80, configJson: JSON.stringify({ template_id: 'ct_cfo_email_1' }) },
      { key: 'N12', type: 'wait', name: 'Wait 2 Hours', posX: 700, posY: 80, configJson: JSON.stringify({ duration: 'PT2H' }) },
      { key: 'N13', type: 'linkedin_connect', name: 'LinkedIn: Connection Request', posX: 900, posY: 80 },
      { key: 'N20', type: 'decision', name: 'Email Response Check', posX: 500, posY: 250 },
      { key: 'N21', type: 'task', name: 'Positive Response → Schedule Demo', posX: 300, posY: 350 },
      { key: 'N22', type: 'stage', name: 'Follow-Up Sequence - Day 3', posX: 700, posY: 350 },
      { key: 'N23', type: 'sms_send', name: 'SMS: Real-Time Cash Visibility', posX: 900, posY: 350, configJson: JSON.stringify({ template_id: 'ct_cfo_sms_1' }) },
      { key: 'N24', type: 'wait', name: 'Wait 1 Day', posX: 1100, posY: 350 },
      { key: 'N25', type: 'voicemail_drop', name: 'VM: Strategic Financial Oversight', posX: 1300, posY: 350, configJson: JSON.stringify({ template_id: 'ct_cfo_vm_1' }) },
      { key: 'N60', type: 'goal', name: 'Demo Booked', posX: 300, posY: 500 },
      { key: 'N99', type: 'exit', name: 'End Campaign', posX: 500, posY: 600 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N11' },
      { fromKey: 'N11', toKey: 'N12' },
      { fromKey: 'N12', toKey: 'N13' },
      { fromKey: 'N13', toKey: 'N20', conditionJson: JSON.stringify({ after: 'P2D' }) },
      { fromKey: 'N20', toKey: 'N21', conditionJson: JSON.stringify({ label: 'Positive Response' }) },
      { fromKey: 'N20', toKey: 'N22', conditionJson: JSON.stringify({ label: 'No Response' }) },
      { fromKey: 'N22', toKey: 'N23' },
      { fromKey: 'N23', toKey: 'N24' },
      { fromKey: 'N24', toKey: 'N25' },
      { fromKey: 'N21', toKey: 'N60' },
      { fromKey: 'N25', toKey: 'N99', conditionJson: JSON.stringify({ after: 'P7D' }) }
    ]
  },
  {
    id: 'tpl_controller_multi',
    name: 'Controller Campaign - Multi-Entity',
    status: 'published',
    version: 1,
    nodes: [
      { key: 'N00', type: 'start', name: 'Controller Target List', posX: 100, posY: 100 },
      { key: 'N10', type: 'stage', name: 'Initial Contact - Day 1', posX: 300, posY: 100 },
      { key: 'N11', type: 'email_send', name: 'Email: 90% Workload Reduction', posX: 500, posY: 100, configJson: JSON.stringify({ template_id: 'ct_controller_email_1' }) },
      { key: 'N12', type: 'wait', name: 'Wait 3 Hours', posX: 700, posY: 100 },
      { key: 'N13', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 900, posY: 100 },
      { key: 'N20', type: 'sms_send', name: 'SMS: Audit Trail + Compliance', posX: 500, posY: 250, configJson: JSON.stringify({ template_id: 'ct_controller_sms_1' }) },
      { key: 'N30', type: 'voicemail_drop', name: 'VM: Period-End Closing Solution', posX: 700, posY: 250, configJson: JSON.stringify({ template_id: 'ct_controller_vm_1' }) },
      { key: 'N50', type: 'goal', name: 'Demo Scheduled', posX: 500, posY: 400 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 500 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N11' },
      { fromKey: 'N11', toKey: 'N12' },
      { fromKey: 'N12', toKey: 'N13' },
      { fromKey: 'N13', toKey: 'N20', conditionJson: JSON.stringify({ after: 'P1D' }) },
      { fromKey: 'N20', toKey: 'N30', conditionJson: JSON.stringify({ after: 'P2D' }) },
      { fromKey: 'N30', toKey: 'N50', conditionJson: JSON.stringify({ after: 'P2D' }) }
    ]
  },
  {
    id: 'tpl_arap_unapplied',
    name: 'AR/AP - Unapplied Funds Recovery',
    status: 'published',
    version: 1,
    nodes: [
      { key: 'N00', type: 'start', name: 'AR/AP Specialist List', posX: 100, posY: 100 },
      { key: 'N10', type: 'stage', name: 'Problem Awareness - Day 1', posX: 300, posY: 100 },
      { key: 'N11', type: 'email_send', name: 'Email: Find Your $250K in Unapplied Funds', posX: 500, posY: 100, configJson: JSON.stringify({ template_id: 'ct_arap_email_1' }) },
      { key: 'N12', type: 'sms_send', name: 'SMS: 90% Payment Posting Automation', posX: 700, posY: 100, configJson: JSON.stringify({ template_id: 'ct_arap_sms_1' }) },
      { key: 'N20', type: 'voicemail_drop', name: 'VM: Collections + Unapplied Funds', posX: 500, posY: 250, configJson: JSON.stringify({ template_id: 'ct_arap_vm_1' }) },
      { key: 'N50', type: 'goal', name: 'Assessment Booked', posX: 500, posY: 400 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 500 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N11' },
      { fromKey: 'N11', toKey: 'N12', conditionJson: JSON.stringify({ after: 'PT4H' }) },
      { fromKey: 'N12', toKey: 'N20', conditionJson: JSON.stringify({ after: 'P2D' }) },
      { fromKey: 'N20', toKey: 'N50', conditionJson: JSON.stringify({ after: 'P3D' }) }
    ]
  },
  {
    id: 'tpl_propmgmt_yardi',
    name: 'Property Management - Yardi Integration',
    status: 'published',
    version: 1,
    nodes: [
      { key: 'N00', type: 'start', name: 'Property Mgmt Companies (Yardi Users)', posX: 100, posY: 100 },
      { key: 'N10', type: 'stage', name: 'Day 1 - Yardi Hook', posX: 300, posY: 100 },
      { key: 'N11', type: 'email_send', name: 'Email: Native Yardi Integration', posX: 500, posY: 100, configJson: JSON.stringify({ template_id: 'ct_propmgmt_email_1' }) },
      { key: 'N20', type: 'sms_send', name: 'SMS: Multi-Property Reconciliation', posX: 700, posY: 100, configJson: JSON.stringify({ template_id: 'ct_propmgmt_sms_1' }) },
      { key: 'N30', type: 'voicemail_drop', name: 'VM: PropMgmt Case Study', posX: 500, posY: 250, configJson: JSON.stringify({ template_id: 'ct_propmgmt_vm_1' }) },
      { key: 'N50', type: 'goal', name: 'Demo Booked', posX: 500, posY: 400 },
      { key: 'N99', type: 'exit', name: 'End', posX: 700, posY: 500 }
    ],
    edges: [
      { fromKey: 'N00', toKey: 'N10' },
      { fromKey: 'N10', toKey: 'N11' },
      { fromKey: 'N11', toKey: 'N20', conditionJson: JSON.stringify({ after: 'P2D' }) },
      { fromKey: 'N20', toKey: 'N30', conditionJson: JSON.stringify({ after: 'P2D' }) },
      { fromKey: 'N30', toKey: 'N50', conditionJson: JSON.stringify({ after: 'P2D' }) }
    ]
  }
];

// Paycile Content Templates
const paycileContentTemplates = [
  // CFO Email Templates
  {
    id: 'ct_cfo_email_1',
    type: 'email',
    name: 'CFO - Save 96 Days on Period-End Close',
    subject: '{{FirstName}}, saving 96 days annually on period-end close',
    body: 'Hi {{FirstName}},\n\nQuick question: How many days does it take your finance team to close the books each month?\n\nIf you\'re like most CFOs at companies with $50M-$500M in revenue, it\'s probably 10-15 days. That\'s 120-180 days per year where you\'re making strategic decisions with stale data.\n\n**The Real Cost:**\n- Late financial insights delay strategic pivots\n- Board meetings happen before numbers are final\n- Audit exposure from manual reconciliation\n- Can\'t respond quickly to market opportunities\n\n**What\'s Possible:**\nOur platform helps CFOs at {{Industry}} companies reduce period-end close time by up to 96 days annually while gaining real-time cash visibility.\n\n**Results from Similar Companies:**\n✓ 65% faster close times (from 12 days → 4 days)\n✓ Real-time cash position visibility\n✓ Automated audit trails\n✓ ROI in 8-12 months\n\nWould a 15-minute demo be valuable?\n\n[Book Demo] {{CalendlyLink}}\n\nBest,\n{{SenderName}}'
  },
  {
    id: 'ct_cfo_email_2',
    type: 'email',
    name: 'CFO - ROI Calculator',
    subject: '{{Company}} could save ${{EstimatedSavings}} annually',
    body: '{{FirstName}},\n\nBased on {{Company}}\'s size (~{{EmployeeCount}} employees), here\'s what we typically see:\n\n**Current State:**\n- 80-120 hours/month on manual matching\n- 2-week close cycles\n- 3-5% error rate\n- Limited real-time visibility\n\n**After Paycile:**\n- 90% reduction in manual work\n- 4-day close cycles\n- <2% error rate\n- Real-time cash dashboards\n\n**Estimated Annual Savings: ${{EstimatedSavings}}**\n\nWant to see the exact ROI for {{Company}}?\n\n[See Custom ROI Analysis] {{DemoLink}}\n\n{{SenderName}}\n{{Phone}}'
  },
  // CFO SMS Templates
  {
    id: 'ct_cfo_sms_1',
    type: 'sms',
    name: 'CFO - Real-Time Cash Visibility',
    text: '{{FirstName}}, real-time cash visibility vs waiting 2 weeks for close. Which would help {{Company}} more? Demo: {{ShortLink}}'
  },
  {
    id: 'ct_cfo_sms_2',
    type: 'sms',
    name: 'CFO - 96 Days Saved',
    text: 'Quick Q {{FirstName}}: How many days to close books at {{Company}}? Most {{Industry}} CFOs we work with go from 12 days → 4 days. Worth a chat? {{CalendlyLink}}'
  },
  // CFO Voicemail
  {
    id: 'ct_cfo_vm_1',
    type: 'voicemail',
    name: 'CFO - Strategic Financial Oversight',
    ttsScript: 'Hi {{FirstName}}, this is {{SenderName}} from Paycile calling for {{Company}}.\n\nI\'m reaching out to CFOs in the {{Industry}} space about a challenge I hear consistently: it takes too long to close the books, which means you\'re making strategic decisions with data that\'s already two weeks old.\n\nInsurance and property management CFOs we work with have cut their close time by up to 96 days annually while gaining real-time cash visibility.\n\nIf having faster access to accurate financial data would help {{Company}} make better strategic decisions, I\'d love to show you how this works in a quick 15-minute demo.\n\nYou can book time directly at {{SpokenCalendlyURL}} or call me back at {{SpokenPhoneNumber}}.\n\nThanks {{FirstName}}, looking forward to connecting.'
  },
  // Controller Email Templates
  {
    id: 'ct_controller_email_1',
    type: 'email',
    name: 'Controller - 90% Workload Reduction',
    subject: '{{FirstName}} - Your team spends how long on multi-entity reconciliation?',
    body: 'Hi {{FirstName}},

Controllers at {{Industry}} companies tell us they spend 80+ hours per month manually reconciling across multiple entities.

Does this sound familiar?
- Spreadsheet hell across 10-20+ entities
- Parent-sub consolidations eating entire weekends
- Intercompany eliminations taking days
- Audit trails that don't exist or are incomplete

**The Multi-Entity Challenge:**
When you're reconciling {{EstimatedEntities}} entities, even small inefficiencies multiply.

**What We're Seeing:**
Controllers using Paycile reduce reconciliation workload by 90%:
✓ Automated multi-entity matching
✓ Intercompany transaction reconciliation
✓ Parent-sub consolidation automation
✓ Complete audit trail

**Real Example:**
A {{Industry}} controller with 15 entities went from 85 hours/month → 8 hours/month.

Worth a 15-minute conversation?

[Schedule Call] {{CalendlyLink}}

{{SenderName}}'
  },
  // Controller SMS
  {
    id: 'ct_controller_sms_1',
    type: 'sms',
    name: 'Controller - Multi-Entity Automation',
    text: '{{FirstName}}, reconciling {{EstimatedEntities}} entities manually? Controllers using Paycile save 77 hrs/month. See how: {{ShortLink}}'
  },
  // Controller Voicemail
  {
    id: 'ct_controller_vm_1',
    type: 'voicemail',
    name: 'Controller - Period-End Closing',
    ttsScript: 'Hi {{FirstName}}, {{SenderName}} calling from Paycile for {{Company}}.

I'm reaching out to finance managers and controllers about multi-entity reconciliation challenges.

If you're manually reconciling across multiple entities each month, you know how painful period-end close can be - the spreadsheets, the late nights, the weekend work.

Controllers we work with in {{Industry}} have reduced their reconciliation workload by ninety percent through automation, cutting close time from twelve days down to four days.

If saving seventy to eighty hours per month sounds interesting, I'd be happy to show you how this works in fifteen minutes.

Book at {{SpokenCalendlyURL}} or call {{SpokenPhoneNumber}}.

Looking forward to connecting!'
  },
  // AR/AP Email Templates
  {
    id: 'ct_arap_email_1',
    type: 'email',
    name: 'AR/AP - Find $250K in Unapplied Funds',
    subject: '{{Company}} might have ${{EstimatedUnapplied}} in unapplied payments',
    body: 'Hi {{FirstName}},

Here's a question most AR/AP teams can't answer: How much is sitting in your unapplied funds account right now?

At most companies your size, it's $150K-$350K.

**Why This Happens:**
- Payments arrive without remittance details
- Customer reference numbers don't match invoices
- Manual matching errors
- Growing backlog nobody has time to untangle

**The Real Cost:**
- Write-offs when you can't match payments
- Collections on invoices that were actually paid
- DSO inflation
- Month-end chaos

**What's Possible:**
✓ 90% auto-matching (vs. 40-50% manual)
✓ Find and apply "lost" payments automatically
✓ Reduce write-offs by up to 62%
✓ Cut posting time by 75%

Want to see how much unapplied you actually have?

[Schedule 15-Min Discovery] {{CalendlyLink}}

{{SenderName}}
{{Phone}}'
  },
  // AR/AP SMS
  {
    id: 'ct_arap_sms_1',
    type: 'sms',
    name: 'AR/AP - Unapplied Funds Recovery',
    text: '{{FirstName}}, {{Company}} might have ${{EstimatedUnapplied}} in unapplied funds. 90% can be matched automatically. Free analysis: {{ShortLink}}'
  },
  // AR/AP Voicemail
  {
    id: 'ct_arap_vm_1',
    type: 'voicemail',
    name: 'AR/AP - Collections + Unapplied',
    ttsScript: 'Hi {{FirstName}}, this is {{SenderName}} from Paycile.

I'm calling about a problem that costs most AR teams thousands of dollars every month: unapplied funds.

Companies your size typically have between one hundred fifty thousand and three hundred fifty thousand dollars sitting in unapplied payment accounts.

Our payment matching technology helps AR teams automatically match ninety percent of these payments, reducing write-offs by up to sixty-two percent.

If finding and applying those lost payments would help {{Company}}, I'd love to show you how this works.

Book at {{SpokenCalendlyURL}} or call {{SpokenPhoneNumber}}.

Thanks!'
  },
  // Property Management Templates
  {
    id: 'ct_propmgmt_email_1',
    type: 'email',
    name: 'PropMgmt - Native Yardi Integration',
    subject: '{{FirstName}} - Native Yardi reconciliation for {{Company}}',
    body: 'Hi {{FirstName}},

Since {{Company}} uses Yardi {{YardiVersion}}, you'll appreciate this:

**Current Process:**
- Export from Yardi
- Download bank statements
- Match in Excel
- Upload back to Yardi
- Hope nothing broke

**With Native Yardi Integration:**
- Transactions sync automatically
- AI matches 95% instantly
- Review exceptions
- Updates post to Yardi automatically

**Time Difference:**
Manual: 6-8 hours/day
Automated: 45 minutes/day

Works directly in Yardi - no separate login, no exports.

[Schedule Yardi Integration Demo] {{CalendlyLink}}

{{SenderName}}
Property Management Solutions'
  },
  {
    id: 'ct_propmgmt_sms_1',
    type: 'sms',
    name: 'PropMgmt - Multi-Property',
    text: 'Native Yardi integration for multi-property reconciliation. PropMgmt finance teams save 30+ hrs/week. Demo: {{ShortLink}}'
  },
  {
    id: 'ct_propmgmt_vm_1',
    type: 'voicemail',
    name: 'PropMgmt - Yardi Case Study',
    ttsScript: '{{FirstName}}, {{SenderName}} with Paycile here.

Calling about Yardi reconciliation at {{Company}}.

If you're managing multiple properties and doing daily bank rec in Yardi, I have a case study from a property management company similar to yours that might be relevant.

They went from six hours a day on manual reconciliation to about forty-five minutes, all through native Yardi integration.

If automating your Yardi reconciliation sounds interesting, let's connect for twenty minutes.

Book at {{SpokenCalendlyURL}} or call {{SpokenPhoneNumber}}.

Thanks!'
  }
];

async function seed() {
  console.log('🌱 Seeding Paycile templates...\n');

  try {
    // 1. Seed Content Templates
    console.log('📧 Creating content templates...');
    let contentCount = 0;
    for (const tpl of paycileContentTemplates) {
      try {
        const existing = await prisma.contentTemplate.findUnique({ where: { id: tpl.id } });
        if (existing) {
          console.log(`  ⏭️  Content template exists: ${tpl.name}`);
          continue;
        }
        
        await prisma.contentTemplate.create({
          data: {
            id: tpl.id,
            type: tpl.type,
            name: tpl.name,
            subject: tpl.subject || null,
            body: tpl.body || null,
            text: tpl.text || null,
            ttsScript: tpl.ttsScript || null
          }
        });
        console.log(`  ✅ Created: ${tpl.name}`);
        contentCount++;
      } catch (err) {
        console.log(`  ❌ Failed: ${tpl.name} - ${err.message}`);
      }
    }
    console.log(`\n✅ Content templates created: ${contentCount}/${paycileContentTemplates.length}\n`);

    // 2. Seed Funnel Templates
    console.log('🎯 Creating funnel templates...');
    let funnelCount = 0;
    for (const template of paycileFunnelTemplates) {
      try {
        const existing = await prisma.template.findUnique({ where: { id: template.id } });
        if (existing) {
          console.log(`  ⏭️  Funnel template exists: ${template.name}`);
          continue;
        }

        // Create template
        const createdTemplate = await prisma.template.create({
          data: {
            id: template.id,
            name: template.name,
            status: template.status,
            version: template.version
          }
        });

        // Create nodes
        for (const node of template.nodes) {
          await prisma.node.create({
            data: {
              templateId: createdTemplate.id,
              key: node.key,
              type: node.type,
              name: node.name,
              configJson: node.configJson || null,
              posX: node.posX,
              posY: node.posY
            }
          });
        }

        // Create edges
        for (const edge of template.edges) {
          await prisma.edge.create({
            data: {
              templateId: createdTemplate.id,
              fromKey: edge.fromKey,
              toKey: edge.toKey,
              conditionJson: edge.conditionJson || null
            }
          });
        }

        console.log(`  ✅ Created: ${template.name} (${template.nodes.length} nodes, ${template.edges.length} edges)`);
        funnelCount++;
      } catch (err) {
        console.log(`  ❌ Failed: ${template.name} - ${err.message}`);
      }
    }
    console.log(`\n✅ Funnel templates created: ${funnelCount}/${paycileFunnelTemplates.length}\n`);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎉 Paycile template seeding complete!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Content Templates: ${contentCount} created`);
    console.log(`Funnel Templates: ${funnelCount} created`);
    console.log('\n✅ Refresh your browser to see the templates!\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

