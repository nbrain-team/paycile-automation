/**
 * Test Script for AI Personalization
 * Run: npx ts-node src/test-ai-personalization.ts
 */

import { personalizeContent, testAIConnection } from './ai-personalizer';

async function runTests() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('TESTING AI 1-TO-1 PERSONALIZATION');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test 1: API Connection
  console.log('Test 1: OpenAI API Connection...');
  const connected = await testAIConnection();
  if (!connected) {
    console.log('Cannot proceed without API connection\n');
    return;
  }
  console.log('');

  // Test 2: Personalize email for a CFO contact
  console.log('Test 2: Personalizing email for CFO...');
  const personalized = await personalizeContent(
    {
      first_name: 'Sarah',
      last_name: 'Martinez',
      company: 'HealthStaff Solutions',
      title: 'Chief Financial Officer',
      industry: 'Healthcare Staffing',
      city: 'Boston',
      state: 'MA',
      revenue: '$45M',
    },
    {
      type: 'email',
      subject: 'Your Bullhorn is hiding $84K/month',
      body: `Hi Sarah,

I wanted to reach out about how leading healthcare staffing firms are recovering missed margins using automated financial tools.

One of our clients — a $30M firm — found $84K in missed monthly margin just by making their rate calculations fully visible.

They didn't need more people. They needed to see what was leaking.

Our platform manages multiple rates to ensure no dollars are left on the table. Accuracy, compliance, and margin protection.

15 minutes. I'll show you how it works. You decide if it's worth it.

Best regards`
    },
    { name: 'Q1 CFO Outreach', ownerName: 'Katie', eventType: 'b2b_outreach' }
  );

  console.log('Personalized Email Generated:');
  console.log(`\nSubject: ${personalized.subject}`);
  console.log(`\nBody:\n${personalized.body}`);
  console.log(`\nRationale: ${personalized.rationale}\n`);

  console.log('═══════════════════════════════════════════════════════════');
  console.log('ALL AI PERSONALIZATION TESTS COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════\n');
}

runTests().catch(console.error);
