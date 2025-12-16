#!/usr/bin/env node
/**
 * Test script for stanley@paycile.com email configuration
 * Run this via Render Shell to test SMTP connection
 */

const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('=================================');
  console.log('Stanley@Paycile.com Email Test');
  console.log('=================================\n');

  // Get configuration from environment
  const config = {
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || false,
    user: process.env.SMTP_USER || 'stanley@paycile.com',
    pass: process.env.SMTP_PASS || '',
  };

  console.log('Configuration:');
  console.log(`  Host: ${config.host}`);
  console.log(`  Port: ${config.port}`);
  console.log(`  Secure: ${config.secure}`);
  console.log(`  User: ${config.user}`);
  console.log(`  Pass: ${config.pass ? '***' + config.pass.slice(-4) : 'NOT SET'}\n`);

  if (!config.pass) {
    console.error('❌ ERROR: SMTP_PASS not set in environment variables');
    console.log('\nPlease set SMTP_PASS to your Microsoft App Password');
    console.log('Get it from: https://mysignins.microsoft.com/security-info');
    process.exit(1);
  }

  try {
    // Create transporter
    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Send test email
    console.log('Sending test email...');
    const testRecipient = process.argv[2] || 'stanley@paycile.com';
    
    const info = await transporter.sendMail({
      from: config.user,
      to: testRecipient,
      subject: 'Paycile Email Test - ' + new Date().toLocaleString(),
      text: 'This is a test email from stanley@paycile.com via the Paycile Automation platform.\n\nIf you receive this, email sending is working correctly!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>✅ Email Test Successful</h2>
          <p>This is a test email from <strong>stanley@paycile.com</strong> via the Paycile Automation platform.</p>
          <p>If you receive this, email sending is working correctly!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Sent: ${new Date().toLocaleString()}<br>
            From: ${config.user}<br>
            Server: ${config.host}:${config.port}
          </p>
        </div>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  To: ${testRecipient}\n`);

    console.log('=================================');
    console.log('✅ ALL TESTS PASSED');
    console.log('=================================');
    console.log('Email sending is configured correctly!');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 SOLUTION: Your password/app password is incorrect.');
      console.log('   Generate a new App Password at:');
      console.log('   https://mysignins.microsoft.com/security-info');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 SOLUTION: Cannot connect to SMTP server.');
      console.log('   Check your SMTP_HOST and SMTP_PORT settings.');
    } else if (error.message.includes('self signed certificate')) {
      console.log('\n🔧 SOLUTION: SSL certificate issue.');
      console.log('   This script already handles this, but connection failed.');
    }
    
    process.exit(1);
  }
}

// Run the test
testEmail().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});


