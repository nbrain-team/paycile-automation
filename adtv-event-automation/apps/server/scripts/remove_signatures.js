/**
 * Remove Signatures from Content Templates
 * 
 * This script removes hardcoded signatures from email templates and replaces them
 * with the {{sender.signature}} merge tag for dynamic sender-based signatures.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Signature patterns to detect and remove
const signaturePatterns = [
  // Email signatures with name
  {
    pattern: /\n\nBest regards,\s*\n\s*Jim Fitzgerald\s*\n\s*CFO Solutions - Paycile\s*\n\s*jim@paycile\.com/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  {
    pattern: /\n\nBest regards,\s*\n\s*Jim Fitzgerald/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  {
    pattern: /\n\nSincerely,\s*\n\s*Jim Fitzgerald/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  {
    pattern: /\n\nThanks,\s*\n\s*Jim Fitzgerald/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  {
    pattern: /\n\nRegards,\s*\n\s*Jim Fitzgerald/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  // Voicemail signatures
  {
    pattern: /Jim Fitzgerald with Paycile/gi,
    replacement: '{{sender.name}} with Paycile'
  },
  {
    pattern: /Jim Fitzgerald from Paycile/gi,
    replacement: '{{sender.name}} from Paycile'
  },
  {
    pattern: /this is Jim Fitzgerald/gi,
    replacement: 'this is {{sender.name}}'
  },
  // Generic name in voicemails
  {
    pattern: /call me at 555-0123/gi,
    replacement: 'call me at {{sender.phone}}'
  },
  {
    pattern: /call me back at 555-0123/gi,
    replacement: 'call me back at {{sender.phone}}'
  },
  // Stanley references
  {
    pattern: /\n\nBest regards,\s*\n\s*Stanley/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  {
    pattern: /\n\nThanks,\s*\n\s*Stanley/gi,
    replacement: '\n\n{{sender.signature}}'
  },
  // Generic signature at end of email (name followed by title/company)
  {
    pattern: /\n\n(Best regards|Sincerely|Thanks|Regards),\s*\n\s*[A-Z][a-z]+ [A-Z][a-z]+\s*\n\s*[^\n]+\s*\n\s*[^\n]+@[^\n]+/gi,
    replacement: '\n\n{{sender.signature}}'
  }
];

async function removeSignatures() {
  console.log('🔍 Scanning content templates for signatures...\n');
  
  const templates = await prisma.contentTemplate.findMany();
  console.log(`Found ${templates.length} content templates\n`);
  
  let updatedCount = 0;
  
  for (const template of templates) {
    let updated = false;
    let newSubject = template.subject;
    let newBody = template.body;
    let newText = template.text;
    let newTtsScript = template.ttsScript;
    
    // Check and update each field
    if (template.subject) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newSubject;
        newSubject = newSubject.replace(pattern, replacement);
        if (newSubject !== before) updated = true;
      }
    }
    
    if (template.body) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newBody;
        newBody = newBody.replace(pattern, replacement);
        if (newBody !== before) updated = true;
      }
    }
    
    if (template.text) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newText;
        newText = newText.replace(pattern, replacement);
        if (newText !== before) updated = true;
      }
    }
    
    if (template.ttsScript) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newTtsScript;
        newTtsScript = newTtsScript.replace(pattern, replacement);
        if (newTtsScript !== before) updated = true;
      }
    }
    
    if (updated) {
      console.log(`✏️  Updating: ${template.type.toUpperCase()} - ${template.name}`);
      console.log(`   ID: ${template.id}`);
      
      await prisma.contentTemplate.update({
        where: { id: template.id },
        data: {
          subject: newSubject,
          body: newBody,
          text: newText,
          ttsScript: newTtsScript
        }
      });
      
      updatedCount++;
      console.log(`   ✅ Updated\n`);
    }
  }
  
  console.log(`\n✨ Complete! Updated ${updatedCount} of ${templates.length} templates`);
  console.log('\n📝 Summary:');
  console.log(`   - Replaced hardcoded names with {{sender.name}}`);
  console.log(`   - Replaced email signatures with {{sender.signature}}`);
  console.log(`   - Replaced phone numbers with {{sender.phone}}`);
  console.log('\n💡 Next steps:');
  console.log(`   - Ensure sender information is configured for each user`);
  console.log(`   - Test email sends to verify merge tags are replaced correctly`);
  
  await prisma.$disconnect();
}

removeSignatures().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
