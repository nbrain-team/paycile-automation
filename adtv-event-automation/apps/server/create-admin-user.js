#!/usr/bin/env node
/**
 * Create admin user account
 * Username: admin@paycile.com (using email as username)
 * Password: Password#123
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  console.log('=================================');
  console.log('Creating Admin User Account');
  console.log('=================================\n');

  const email = 'admin@paycile.com';
  const password = 'Password#123';
  const name = 'Admin';
  const role = 'admin';

  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      console.log('❌ User already exists!');
      console.log(`   Email: ${existing.email}`);
      console.log(`   Name: ${existing.name}`);
      console.log(`   Role: ${existing.role}`);
      console.log(`   Created: ${existing.createdAt}\n`);
      
      // Update password anyway
      console.log('Updating password to: Password#123');
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: existing.id },
        data: { 
          passwordHash,
          role: 'admin', // Make sure it's admin
          name: 'Admin' // Update name
        }
      });
      console.log('✅ Password updated successfully!\n');
    } else {
      // Create new user
      console.log('Creating new admin user...');
      const passwordHash = await bcrypt.hash(password, 10);
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          role,
          passwordHash
        }
      });

      console.log('✅ Admin user created successfully!\n');
      console.log('User Details:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.createdAt}\n`);
    }

    console.log('=================================');
    console.log('✅ SUCCESS');
    console.log('=================================');
    console.log('\nLogin Credentials:');
    console.log('   Email: admin@paycile.com');
    console.log('   Password: Password#123');
    console.log('\nLogin URL:');
    console.log('   https://paycile-automation.onrender.com');
    console.log('\nAPI Login Endpoint:');
    console.log('   POST https://opticwise-backend-uq3o.onrender.com/api/auth/login');
    console.log('   Body: { "email": "admin@paycile.com", "password": "Password#123" }');
    console.log('');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();

