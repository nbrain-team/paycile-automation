// Test if content templates API is working
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing content templates API endpoint...\n');
    
    const response = await fetch('http://localhost:4000/api/content-templates');
    
    if (!response.ok) {
      console.log('❌ API returned error:', response.status, response.statusText);
      return;
    }
    
    const data = await response.json();
    
    console.log('✅ API is working!');
    console.log('Total templates returned:', data.length);
    console.log('\nCFO-related templates:\n');
    
    const cfoTemplates = data.filter(t => 
      t.id.startsWith('cfo_ins_') || 
      ['demo_confirmation', 'demo_thank_you', 'proposal_follow_up', 'demo_no_show', 'reengagement_30d'].includes(t.id)
    );
    
    cfoTemplates.forEach(t => {
      console.log('✅', t.id);
      console.log('   Name:', t.name);
      console.log('   Type:', t.type);
      console.log('   Has subject:', !!t.subject);
      console.log('   Has body:', !!t.body);
      console.log('   Has tts_script:', !!t.tts_script);
      console.log('');
    });
    
    console.log('Missing templates:');
    const needed = ['demo_confirmation', 'demo_thank_you', 'proposal_follow_up', 'demo_no_show', 'reengagement_30d'];
    needed.forEach(id => {
      const exists = data.find(t => t.id === id);
      if (!exists) {
        console.log('❌', id);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
