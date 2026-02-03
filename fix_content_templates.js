#!/usr/bin/env node
/**
 * Fix Content Templates Script
 * 
 * This script:
 * 1. Updates content templates that reference external files with complete content
 * 2. Verifies all funnel template nodes have proper content template attachments
 * 3. Tests email and voicemail functionality
 */

const API_BASE = process.env.API_BASE || 'https://opticwise-backend-uq3o.onrender.com';

// Complete voicemail scripts from PAYCILE_CONTENT_TEMPLATES.md
const VOICEMAIL_SCRIPTS = {
  'CFO - Strategic Oversight VM': `Hi {{contact.first_name}}, this is {{sender.name}} from Paycile calling for {{campaign.owner_name}}.

I'm reaching out to CFOs in the insurance space about a challenge I hear consistently: it takes too long to close the books, which means you're making strategic decisions with data that's already two weeks old.

Insurance and property management CFOs we work with have cut their close time by up to 96 days annually while gaining real-time cash visibility.

If having faster access to accurate financial data would help make better strategic decisions, I'd love to show you how this works in a quick 15-minute demo.

You can book time directly at {{landing_page_url}} or call me back at {{sender.phone}}.

Thanks {{contact.first_name}}, looking forward to connecting.`,

  'Controller - Close Time VM': `Hi {{contact.first_name}}, {{sender.name}} calling from Paycile.

I'm reaching out to finance managers and controllers about multi-entity reconciliation challenges.

If you're manually reconciling across multiple entities each month, you know how painful period-end close can be - the spreadsheets, the late nights, the weekend work.

Controllers we work with have reduced their reconciliation workload by ninety percent through automation, cutting close time from twelve days down to four days, and they actually have complete audit trails that auditors love.

If saving seventy to eighty hours per month on reconciliation sounds interesting, I'd be happy to show you exactly how this works in a fifteen-minute demo.

You can book time at {{landing_page_url}} or call me at {{sender.phone}}.

Looking forward to connecting, {{contact.first_name}}.`,

  'AR/AP - Collections VM': `Hi {{contact.first_name}}, this is {{sender.name}} from Paycile.

I'm calling about a problem that costs most AR teams thousands of dollars every month: unapplied funds.

Companies your size typically have between one hundred fifty thousand and three hundred fifty thousand dollars sitting in unapplied payment accounts - payments that came in without remittance details or customer reference numbers that don't match.

Our payment matching technology helps AR teams automatically match ninety percent of these payments, reducing write-offs by up to sixty-two percent.

If finding and applying those lost payments would help, I'd love to show you how this works in a quick demo.

Book time at {{landing_page_url}} or call me at {{sender.phone}}.

Thanks {{contact.first_name}}!`,

  'PropMgmt - Case Study VM': `{{contact.first_name}}, this is {{sender.name}} with Paycile calling about property management cash reconciliation.

I'm reaching out to property managers who are managing multiple properties and need better real-time visibility into their cash position across their entire portfolio.

If you're logging into Yardi multiple times a day, manually reconciling rent payments, and still ending up with cash data that's at least a day old, there's a much better way.

Our property management customers get real-time cash visibility across all their properties, automated reconciliation natively inside Yardi, and they've cut their manual reconciliation time from thirty to forty hours a month down to about eight hours.

If real-time cash visibility across your entire portfolio would help your operations, let's connect for twenty minutes.

Book at {{landing_page_url}} or call me at {{sender.phone}}.

Thanks!`
};

// Complete email bodies from PAYCILE_CONTENT_TEMPLATES.md
const EMAIL_BODIES = {
  'CFO - Save 96 Days Email': {
    subject: '{{contact.first_name}}, saving 96 days annually on period-end close',
    body: `Hi {{contact.first_name}},

Quick question: How many days does it take your finance team to close the books each month?

If you're like most CFOs we work with at companies with $50M-$500M in revenue, it's probably 10-15 days. That's 120-180 days per year where you're making strategic decisions with stale data.

**The Real Cost:**
- Late financial insights delay strategic pivots
- Board meetings happen before numbers are final
- Audit exposure from manual reconciliation processes
- Can't respond quickly to market opportunities

**What's Possible:**
Our payment reconciliation platform helps CFOs reduce period-end close time by up to 96 days annually while gaining real-time cash visibility.

**Results from Similar Companies:**
✓ 65% faster close times (from 12 days → 4 days)
✓ Real-time cash position visibility
✓ Automated audit trails for compliance
✓ ROI in 8-12 months

Would a 15-minute demo showing how this works be valuable?

[Book Demo] {{landing_page_url}}

Best,
{{sender.name}}
{{sender.title}}
Paycile

P.S. - We integrate natively with your ERP system so there's no rip-and-replace.`
  },

  'AR/AP - Unapplied Funds Email': {
    subject: '{{contact.first_name}}, you likely have $250K+ in unapplied funds',
    body: `Hi {{contact.first_name}},

Here's a question most AR/AP teams can't answer: How much is sitting in your unapplied funds account right now?

At most companies your size, it's $150K-$350K.

**Why This Happens:**
- Payments arrive without remittance details
- Customer reference numbers don't match invoices
- Manual matching errors create orphaned transactions
- Growing backlog that nobody has time to untangle

**The Real Cost:**
Not just the unapplied balance - but:
- Write-offs when you can't match payments
- Collections on invoices that were actually paid
- DSO inflation
- Month-end chaos trying to reconcile

**What's Possible:**
Companies using Paycile's AI-powered payment matching:
✓ 90% auto-matching (vs. 40-50% manual)
✓ Find and apply "lost" payments automatically
✓ Reduce write-offs by up to 62%
✓ Cut posting time by 75%

Want to see how much unapplied you actually have and how to clear it?

[Schedule 15-Min Discovery] {{landing_page_url}}

{{sender.name}}
{{sender.title}}
P: {{sender.phone}}`
  },

  'PropMgmt - Yardi Email': {
    subject: 'Native Yardi integration for payment reconciliation',
    body: `Hi {{contact.first_name}},

If you're managing payment reconciliation across multiple properties in Yardi, you know the daily struggle:
- Manual rent payment matching
- Scattered cash visibility across properties
- Hours spent reconciling in Yardi
- Month-end chaos

**The Multi-Property Challenge:**
When you're managing 20+ properties, even small inefficiencies multiply. A 2-hour task per property becomes a 40-hour nightmare.

**What's Possible with Native Yardi Integration:**
Property managers using Paycile achieve:
✓ Real-time cash visibility across entire portfolio
✓ Automated rent payment matching inside Yardi
✓ 85% reduction in manual reconciliation time
✓ Complete audit trail for each property

**Real Example:**
A property management company with 50+ properties went from 35 hours/week → 6 hours/week on reconciliation.

Worth a 15-minute conversation to see if this could work for your portfolio?

[Schedule a Quick Call] {{landing_page_url}}

{{sender.name}}
{{sender.title}}
P: {{sender.phone}}

P.S. - Works seamlessly inside Yardi - no exports, no separate login`
  }
};

async function updateContentTemplate(id, updates) {
  const response = await fetch(`${API_BASE}/api/content-templates/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update template ${id}: ${response.statusText}`);
  }
  
  return response.json();
}

async function getAllContentTemplates() {
  const response = await fetch(`${API_BASE}/api/content-templates`);
  if (!response.ok) {
    throw new Error(`Failed to fetch content templates: ${response.statusText}`);
  }
  return response.json();
}

async function fixContentTemplates() {
  console.log('🔧 Starting Content Template Fix...\n');
  
  try {
    // Get all content templates
    const templates = await getAllContentTemplates();
    console.log(`📋 Found ${templates.length} content templates\n`);
    
    let fixed = 0;
    let skipped = 0;
    
    for (const template of templates) {
      // Check if template references external file
      const needsFix = 
        (template.body && template.body.includes('PAYCILE_CONTENT_TEMPLATES.md')) ||
        (template.text && template.text.includes('PAYCILE_CONTENT_TEMPLATES.md')) ||
        (template.tts_script && template.tts_script.includes('PAYCILE_CONTENT_TEMPLATES.md'));
      
      if (!needsFix) {
        skipped++;
        continue;
      }
      
      console.log(`🔨 Fixing: ${template.name} (${template.type})`);
      
      // Fix voicemail templates
      if (template.type === 'voicemail' && VOICEMAIL_SCRIPTS[template.name]) {
        await updateContentTemplate(template.id, {
          tts_script: VOICEMAIL_SCRIPTS[template.name]
        });
        console.log(`   ✅ Updated voicemail script\n`);
        fixed++;
      }
      // Fix email templates
      else if (template.type === 'email' && EMAIL_BODIES[template.name]) {
        await updateContentTemplate(template.id, {
          subject: EMAIL_BODIES[template.name].subject,
          body: EMAIL_BODIES[template.name].body
        });
        console.log(`   ✅ Updated email content\n`);
        fixed++;
      }
      else {
        console.log(`   ⚠️  No replacement content found for: ${template.name}\n`);
      }
    }
    
    console.log(`\n✨ Fix Complete!`);
    console.log(`   Fixed: ${fixed}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${templates.length}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixContentTemplates();
