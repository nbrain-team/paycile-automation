/**
 * Test Script for AI Personalization
 * Run: npx ts-node src/test-ai-personalization.ts
 */

import { personalizeContent, testAIConnection, generateDynamicFollowUp } from './ai-personalizer';

async function runTests() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🤖 TESTING AI 1-TO-1 PERSONALIZATION');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test 1: API Connection
  console.log('Test 1: OpenAI API Connection...');
  const connected = await testAIConnection();
  if (!connected) {
    console.log('❌ Cannot proceed without API connection\n');
    return;
  }
  console.log('');

  // Test 2: Personalize DealSheet Email for Healthcare CFO
  console.log('Test 2: Personalizing DealSheet email for Healthcare CFO...');
  const dealsheetPersonalized = await personalizeContent({
    contact: {
      first_name: 'Sarah',
      last_name: 'Martinez',
      company: 'HealthStaff Solutions',
      title: 'Chief Financial Officer',
      industry: 'Healthcare Staffing',
      firm_revenue: '$45M',
      city: 'Boston',
      state: 'MA'
    },
    templateContent: {
      type: 'email',
      subject: 'Your Bullhorn is hiding $84K/month',
      body: `Hi {{contact.first_name}},

I live for helping healthcare staffing leaders reclaim missed margins (it's become such a fun passion).

One of our clients — a $30M firm — found $84K in missed monthly margin just by making their rate calculations fully visible.

They didn't need more people. They needed to see what was leaking.

Our automated margin calculator manages multiple rates (including GSA system integration) to ensure no dollars are left on the table.

Accuracy, compliance, and margin protection — while triggering manager approvals if any recruiter goes outside thresholds.

15 minutes. I'll show you the $84K. You decide if it's worth it.

-Katie

P.S. Full transparency: If you're at SIA in Vegas, I'd love to buy you a drink and show you how it works in action.`
    },
    personalizationGoal: 'Emphasize ROI and margin recovery specific to a $45M healthcare staffing firm. CFO-focused language around financial controls and compliance.'
  });

  console.log('✅ Personalized Email Generated:');
  console.log(`\nSubject: ${dealsheetPersonalized.subject}`);
  console.log(`\nBody:\n${dealsheetPersonalized.body}`);
  console.log(`\nRationale: ${dealsheetPersonalized.personaliz_rationale}\n`);

  // Test 3: Personalize Kanban SMS for VP of Sales
  console.log('Test 3: Personalizing Kanban SMS for VP of Sales...');
  const kanbanPersonalized = await personalizeContent({
    contact: {
      first_name: 'Mike',
      last_name: 'Thompson',
      company: 'TechRecruit Partners',
      title: 'VP of Sales',
      industry: 'IT Staffing',
      firm_revenue: '$30M',
      city: 'Austin',
      state: 'TX'
    },
    templateContent: {
      type: 'sms',
      text: '{{contact.first_name}} - Are your recruiters drowning in Bullhorn tabs? We built a one-screen pipeline view that sits on top of Bullhorn. $30M firm found $84K/mo with it. 15-min demo? -Katie'
    },
    personalizationGoal: 'Focus on sales efficiency and pipeline visibility for a VP of Sales who cares about deals not falling through cracks.'
  });

  console.log('✅ Personalized SMS Generated:');
  console.log(`\n${kanbanPersonalized.text}`);
  console.log(`\nRationale: ${kanbanPersonalized.personaliz_rationale}\n`);

  // Test 4: Dynamic Follow-up based on engagement
  console.log('Test 4: Generating dynamic follow-up based on engagement...');
  const followUp = await generateDynamicFollowUp(
    {
      first_name: 'Sarah',
      last_name: 'Martinez',
      company: 'HealthStaff Solutions',
      title: 'CFO'
    },
    {
      email_opened: true,
      link_clicked: true,
      page_visited: 'pricing-calculator',
      time_on_site: 45
    }
  );

  console.log('✅ Dynamic Follow-up Generated:');
  console.log(`\nSubject: ${followUp.subject}`);
  console.log(`\nBody:\n${followUp.body}`);
  console.log(`\nRationale: ${followUp.personaliz_rationale}\n`);

  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 ALL AI PERSONALIZATION TESTS COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ OpenAI API connected');
  console.log('✅ Email personalization working');
  console.log('✅ SMS personalization working');
  console.log('✅ Dynamic follow-up generation working');
  console.log('\n🔥 Ready to use in Newbury funnels!\n');
}

runTests().catch(console.error);

