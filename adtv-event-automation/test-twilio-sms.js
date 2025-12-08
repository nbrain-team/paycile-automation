// Quick test script to verify Twilio SMS credentials
const twilio = require('twilio');

// Load credentials from env file
const TWILIO_ACCOUNT_SID = 'ACc9d72a11329b934d1326253a49dfc1e4';
const TWILIO_AUTH_TOKEN = '4ca1169b7204166498ed33bbe399a798';
const TWILIO_FROM_NUMBER = '+16193047376';

async function testTwilioSMS() {
  console.log('🔍 Testing Twilio SMS credentials...\n');
  
  try {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    // Verify credentials by fetching account info
    const account = await client.api.accounts(TWILIO_ACCOUNT_SID).fetch();
    console.log('✅ Twilio credentials verified!');
    console.log(`   Account SID: ${account.sid}`);
    console.log(`   Account Status: ${account.status}`);
    console.log(`   Friendly Name: ${account.friendlyName || 'N/A'}\n`);
    
    // Check if the phone number is valid
    try {
      const phoneNumber = await client.incomingPhoneNumbers
        .list({ phoneNumber: TWILIO_FROM_NUMBER, limit: 1 });
      
      if (phoneNumber.length > 0) {
        console.log('✅ Phone number verified!');
        console.log(`   From Number: ${TWILIO_FROM_NUMBER}`);
        console.log(`   Capabilities: SMS=${phoneNumber[0].capabilities.sms}, Voice=${phoneNumber[0].capabilities.voice}\n`);
      } else {
        console.log('⚠️  Warning: Phone number not found in account');
        console.log(`   From Number: ${TWILIO_FROM_NUMBER}\n`);
      }
    } catch (numErr) {
      console.log('⚠️  Could not verify phone number (may still work)');
      console.log(`   From Number: ${TWILIO_FROM_NUMBER}\n`);
    }
    
    console.log('🎉 Twilio is ready to send SMS!\n');
    console.log('Next steps:');
    console.log('1. Update SMS_PROVIDER=twilio in Render environment');
    console.log('2. Redeploy the service');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing Twilio:');
    console.error(`   ${error.message}\n`);
    
    if (error.code === 20003) {
      console.error('   Authentication failed - check Account SID and Auth Token');
    }
    
    return false;
  }
}

testTwilioSMS().then(success => {
  process.exit(success ? 0 : 1);
});




