#!/usr/bin/env node
/**
 * Cleanup Hardcoded Names and Signatures in Content Templates
 * 
 * This script:
 * 1. Replaces all instances of "Jim" with {{sender.name}}
 * 2. Replaces "Jim Fitzgerald" with {{sender.name}}
 * 3. Replaces "Jim from Paycile" with "{{sender.name}} from Paycile"
 * 4. Replaces signature blocks with {{sender.signature}}
 */

const API_BASE = process.env.API_BASE || 'https://opticwise-backend-uq3o.onrender.com';

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

function cleanupContent(content, type) {
  if (!content) return content;
  
  let cleaned = content;
  
  // Replace "Jim Fitzgerald" first (before replacing just "Jim")
  cleaned = cleaned.replace(/Jim Fitzgerald/g, '{{sender.name}}');
  
  // Replace "Jim from Paycile"
  cleaned = cleaned.replace(/Jim from Paycile/g, '{{sender.name}} from Paycile');
  
  // Replace standalone "Jim" (but not in email addresses or URLs)
  // Match "Jim" when it's:
  // - At start of sentence: "Jim specializes"
  // - After "Hi ": "Hi Jim"
  // - After comma/space: ", Jim"
  // - Before comma/period: "Jim,"
  cleaned = cleaned.replace(/\bJim\b(?![a-zA-Z@.])/g, '{{sender.name}}');
  
  // Replace signature patterns
  // "Best, Jim" or "Best,\nJim"
  cleaned = cleaned.replace(/Best,\s*Jim\b/g, '{{sender.signature}}');
  
  // Replace signature blocks like:
  // "Jim Fitzgerald\nTitle\nPaycile\nP: phone"
  // with just {{sender.signature}}
  if (type === 'email') {
    // Pattern: Name followed by title/company/phone on separate lines
    cleaned = cleaned.replace(/{{sender\.name}}\s*\n\s*[^\n]+\s*\n\s*Paycile\s*\n\s*P:\s*{{sender\.phone}}/g, '{{sender.signature}}');
    cleaned = cleaned.replace(/{{sender\.name}}\s*\n\s*[^\n]+\s*\n\s*P:\s*{{sender\.phone}}/g, '{{sender.signature}}');
    
    // Also handle inline signatures
    cleaned = cleaned.replace(/{{sender\.name}}\s*\n\s*{{sender\.title}}\s*\n\s*Paycile/g, '{{sender.signature}}');
  }
  
  // Replace other common names (add more as needed)
  cleaned = cleaned.replace(/\bStanley\b/g, '{{sender.name}}');
  
  return cleaned;
}

async function cleanupAllTemplates() {
  console.log('🧹 Starting Content Template Cleanup...\n');
  
  try {
    const templates = await getAllContentTemplates();
    console.log(`📋 Processing ${templates.length} templates\n`);
    
    let cleaned = 0;
    let skipped = 0;
    
    for (const template of templates) {
      let needsUpdate = false;
      const updates = {};
      
      // Check and clean email body
      if (template.body) {
        const cleanedBody = cleanupContent(template.body, 'email');
        if (cleanedBody !== template.body) {
          updates.body = cleanedBody;
          needsUpdate = true;
        }
      }
      
      // Check and clean SMS text
      if (template.text) {
        const cleanedText = cleanupContent(template.text, 'sms');
        if (cleanedText !== template.text) {
          updates.text = cleanedText;
          needsUpdate = true;
        }
      }
      
      // Check and clean voicemail script
      if (template.tts_script) {
        const cleanedScript = cleanupContent(template.tts_script, 'voicemail');
        if (cleanedScript !== template.tts_script) {
          updates.tts_script = cleanedScript;
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        console.log(`🔨 Cleaning: ${template.name} (${template.type})`);
        await updateContentTemplate(template.id, updates);
        console.log(`   ✅ Updated\n`);
        cleaned++;
      } else {
        skipped++;
      }
    }
    
    console.log(`\n✨ Cleanup Complete!`);
    console.log(`   Cleaned: ${cleaned}`);
    console.log(`   Already clean: ${skipped}`);
    console.log(`   Total: ${templates.length}\n`);
    
    // Verify cleanup
    console.log('🔍 Verifying cleanup...\n');
    const verifyTemplates = await getAllContentTemplates();
    let stillHasIssues = 0;
    
    for (const t of verifyTemplates) {
      const hasJim = 
        (t.body && t.body.includes('Jim')) ||
        (t.text && t.text.includes('Jim')) ||
        (t.tts_script && t.tts_script.includes('Jim'));
      
      if (hasJim) {
        stillHasIssues++;
        console.log(`⚠️  ${t.name} still contains "Jim"`);
      }
    }
    
    if (stillHasIssues === 0) {
      console.log('✅ All templates verified clean!\n');
    } else {
      console.log(`\n⚠️  ${stillHasIssues} templates still have issues (may need manual review)\n`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanupAllTemplates();
