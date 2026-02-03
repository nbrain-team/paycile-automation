/**
 * HubSpot CRM Integration Module
 * 
 * Bidirectional data sync between Paycile and HubSpot:
 * 1. Push qualified leads from Paycile to HubSpot (contacts, deals, engagement data)
 * 2. Pull deal status updates from HubSpot back to Paycile
 * 3. Create custom properties for Paycile tracking data
 * 
 * Created: January 2026
 */

require('dotenv').config();
const axios = require('axios');

// HubSpot API Configuration
const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '243314049';

// Axios instance with auth
const hubspotAPI = axios.create({
    baseURL: HUBSPOT_API_BASE,
    headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

/**
 * Test HubSpot API Connection
 */
async function testConnection() {
    try {
        const response = await hubspotAPI.get('/crm/v3/objects/contacts?limit=1');
        console.log('✅ HubSpot API connection successful');
        console.log(`   Portal ID: ${HUBSPOT_PORTAL_ID}`);
        console.log(`   Contacts accessible: Yes`);
        return true;
    } catch (error) {
        console.error('❌ HubSpot API connection failed:', error.response?.data || error.message);
        return false;
    }
}

/**
 * Create Custom Properties in HubSpot for Paycile Data
 * NOTE: Requires crm.schemas.contacts.write scope
 */
async function createCustomProperties() {
    console.log('\n⚠️  NOTE: This function requires crm.schemas.*.write scopes');
    console.log('   If you see permission errors, add these scopes in HubSpot:\n');
    console.log('   - crm.schemas.contacts.write');
    console.log('   - crm.schemas.companies.write');
    console.log('   - crm.schemas.deals.write\n');
    
    const properties = [
        {
            name: 'paycile_lead_score',
            label: 'Paycile Lead Score',
            type: 'number',
            fieldType: 'number',
            groupName: 'contactinformation',
            description: 'Engagement score from Paycile automation platform'
        },
        {
            name: 'paycile_persona',
            label: 'Paycile Persona',
            type: 'enumeration',
            fieldType: 'select',
            groupName: 'contactinformation',
            description: 'Target persona from Paycile campaign',
            options: [
                { label: 'CFO / Financial Executive', value: 'cfo' },
                { label: 'Finance Manager / Controller', value: 'controller' },
                { label: 'AR/AP Specialist', value: 'arap' },
                { label: 'Treasury / Cash Manager', value: 'treasury' },
                { label: 'Accountant / GL Specialist', value: 'accountant' },
                { label: 'Property Management', value: 'property_mgmt' },
                { label: 'Auditor / Compliance Officer', value: 'auditor' },
                { label: 'Small Business Owner / CEO', value: 'smb_owner' }
            ]
        },
        {
            name: 'paycile_campaign_name',
            label: 'Paycile Campaign',
            type: 'string',
            fieldType: 'text',
            groupName: 'contactinformation',
            description: 'Source campaign from Paycile'
        },
        {
            name: 'paycile_last_engagement',
            label: 'Paycile Last Engagement',
            type: 'datetime',
            fieldType: 'date',
            groupName: 'contactinformation',
            description: 'Last interaction date in Paycile'
        },
        {
            name: 'paycile_total_touches',
            label: 'Paycile Total Touches',
            type: 'number',
            fieldType: 'number',
            groupName: 'contactinformation',
            description: 'Number of touchpoints from Paycile campaigns'
        },
        {
            name: 'paycile_channel_preference',
            label: 'Paycile Channel Preference',
            type: 'enumeration',
            fieldType: 'select',
            groupName: 'contactinformation',
            description: 'Preferred communication channel based on engagement',
            options: [
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'SMS', value: 'sms' },
                { label: 'LinkedIn', value: 'linkedin' }
            ]
        },
        {
            name: 'paycile_status',
            label: 'Paycile Status',
            type: 'enumeration',
            fieldType: 'select',
            groupName: 'contactinformation',
            description: 'Current status in Paycile automation',
            options: [
                { label: 'New', value: 'new' },
                { label: 'Email Sent', value: 'email_sent' },
                { label: 'Email Opened', value: 'email_opened' },
                { label: 'Email Clicked', value: 'email_clicked' },
                { label: 'Replied', value: 'replied' },
                { label: 'Interested', value: 'interested' },
                { label: 'Needs BDR', value: 'needs_bdr' },
                { label: 'Demo Booked', value: 'demo_booked' },
                { label: 'Not Interested', value: 'not_interested' },
                { label: 'Bad Fit', value: 'bad_fit' }
            ]
        }
    ];

    console.log('\n📋 Creating custom properties in HubSpot...\n');

    for (const property of properties) {
        try {
            await hubspotAPI.post('/crm/v3/properties/contacts', property);
            console.log(`✅ Created property: ${property.label}`);
        } catch (error) {
            if (error.response?.status === 409) {
                console.log(`⚠️  Property already exists: ${property.label}`);
            } else {
                console.error(`❌ Failed to create property ${property.label}:`, error.response?.data?.message || error.message);
            }
        }
    }

    console.log('\n✅ Custom properties setup complete\n');
}

/**
 * Push Contact to HubSpot (Create or Update)
 * 
 * @param {Object} contact - Paycile contact data
 * @returns {Object} HubSpot contact response
 */
async function pushContactToHubSpot(contact) {
    try {
        // Base properties that work with standard HubSpot fields
        const properties = {
            email: contact.email,
            firstname: contact.first_name || contact.firstName,
            lastname: contact.last_name || contact.lastName,
            company: contact.company,
            phone: contact.phone,
            jobtitle: contact.job_title || contact.jobTitle,
            lifecyclestage: contact.status === 'demo_booked' ? 'opportunity' : 
                           contact.status === 'needs_bdr' ? 'marketingqualifiedlead' :
                           contact.status === 'interested' ? 'lead' : 'subscriber'
        };

        // Add custom Paycile properties if they exist (will be ignored if properties don't exist yet)
        const customProperties = {
            paycile_lead_score: contact.lead_score || 0,
            paycile_persona: contact.persona,
            paycile_campaign_name: contact.campaign_name || contact.campaignName,
            paycile_last_engagement: contact.last_engagement_date ? new Date(contact.last_engagement_date).getTime() : Date.now(),
            paycile_total_touches: contact.total_touches || 0,
            paycile_channel_preference: contact.channel_preference || 'email',
            paycile_status: contact.status || 'new'
        };

        // Merge custom properties (HubSpot will ignore unknown properties)
        Object.assign(properties, customProperties);

        // Try to find existing contact by email
        let hubspotContactId = null;
        try {
            const searchResponse = await hubspotAPI.post('/crm/v3/objects/contacts/search', {
                filterGroups: [{
                    filters: [{
                        propertyName: 'email',
                        operator: 'EQ',
                        value: contact.email
                    }]
                }]
            });

            if (searchResponse.data.results.length > 0) {
                hubspotContactId = searchResponse.data.results[0].id;
            }
        } catch (searchError) {
            console.log('Contact not found, will create new');
        }

        // Update or create contact
        if (hubspotContactId) {
            // Update existing contact
            const response = await hubspotAPI.patch(`/crm/v3/objects/contacts/${hubspotContactId}`, {
                properties
            });
            console.log(`✅ Updated HubSpot contact: ${contact.email} (ID: ${hubspotContactId})`);
            return { action: 'updated', contact: response.data };
        } else {
            // Create new contact
            const response = await hubspotAPI.post('/crm/v3/objects/contacts', {
                properties
            });
            console.log(`✅ Created HubSpot contact: ${contact.email} (ID: ${response.data.id})`);
            return { action: 'created', contact: response.data };
        }
    } catch (error) {
        console.error(`❌ Failed to push contact to HubSpot:`, error.response?.data || error.message);
        throw error;
    }
}

/**
 * Create Deal in HubSpot for Qualified Lead
 * 
 * @param {Object} contact - Paycile contact data
 * @param {String} hubspotContactId - HubSpot contact ID
 * @returns {Object} HubSpot deal response
 */
async function createDealForContact(contact, hubspotContactId) {
    try {
        // Get default pipeline
        const pipelinesResponse = await hubspotAPI.get('/crm/v3/pipelines/deals');
        const defaultPipeline = pipelinesResponse.data.results[0];
        const firstStage = defaultPipeline.stages[0];

        const dealProperties = {
            dealname: `${contact.company || contact.email} - Paycile Lead`,
            dealstage: firstStage.id,
            pipeline: defaultPipeline.id,
            amount: '0',
            closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime(), // 30 days from now
            hubspot_owner_id: contact.owner_id || undefined
        };

        // Create deal
        const dealResponse = await hubspotAPI.post('/crm/v3/objects/deals', {
            properties: dealProperties
        });

        // Associate deal with contact
        await hubspotAPI.put(
            `/crm/v3/objects/deals/${dealResponse.data.id}/associations/contacts/${hubspotContactId}/deal_to_contact`
        );

        console.log(`✅ Created deal for ${contact.email}: ${dealResponse.data.id}`);
        return dealResponse.data;
    } catch (error) {
        console.error(`❌ Failed to create deal:`, error.response?.data || error.message);
        throw error;
    }
}

/**
 * Log Engagement Activity to HubSpot Timeline
 * 
 * @param {String} hubspotContactId - HubSpot contact ID
 * @param {Object} activity - Activity data from Paycile
 */
async function logEngagementActivity(hubspotContactId, activity) {
    try {
        // Note: Timeline events require a custom event type to be created in HubSpot first
        // For now, we'll use notes as engagement records
        
        const noteBody = `
            <strong>Paycile Engagement: ${activity.type}</strong><br>
            Campaign: ${activity.campaign_name}<br>
            Channel: ${activity.channel}<br>
            Date: ${new Date(activity.timestamp).toLocaleString()}<br>
            ${activity.details ? `Details: ${activity.details}` : ''}
        `;

        await hubspotAPI.post('/crm/v3/objects/notes', {
            properties: {
                hs_timestamp: new Date(activity.timestamp).getTime(),
                hs_note_body: noteBody
            },
            associations: [{
                to: { id: hubspotContactId },
                types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] // Note to Contact
            }]
        });

        console.log(`✅ Logged engagement activity for contact ${hubspotContactId}`);
    } catch (error) {
        console.error(`❌ Failed to log engagement:`, error.response?.data || error.message);
    }
}

/**
 * Get Deal Updates from HubSpot
 * 
 * @param {String} dealId - HubSpot deal ID
 * @returns {Object} Deal data
 */
async function getDealStatus(dealId) {
    try {
        const response = await hubspotAPI.get(`/crm/v3/objects/deals/${dealId}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Failed to get deal status:`, error.response?.data || error.message);
        throw error;
    }
}

/**
 * Full Sync: Push Qualified Lead to HubSpot
 * This is the main function to call when a lead is qualified in Paycile
 * 
 * @param {Object} paycileContact - Contact data from Paycile
 * @param {Array} engagementHistory - Array of engagement activities
 * @returns {Object} Sync result
 */
async function syncQualifiedLeadToHubSpot(paycileContact, engagementHistory = []) {
    try {
        console.log(`\n🔄 Syncing qualified lead to HubSpot: ${paycileContact.email}\n`);

        // 1. Push contact to HubSpot
        const contactResult = await pushContactToHubSpot(paycileContact);
        const hubspotContactId = contactResult.contact.id;

        // 2. Create deal if status is "needs_bdr" or "demo_booked"
        let dealResult = null;
        if (['needs_bdr', 'demo_booked', 'interested'].includes(paycileContact.status)) {
            dealResult = await createDealForContact(paycileContact, hubspotContactId);
        }

        // 3. Log engagement history
        if (engagementHistory.length > 0) {
            console.log(`\n📊 Logging ${engagementHistory.length} engagement activities...\n`);
            for (const activity of engagementHistory) {
                await logEngagementActivity(hubspotContactId, activity);
            }
        }

        console.log(`\n✅ Successfully synced ${paycileContact.email} to HubSpot\n`);

        return {
            success: true,
            hubspot_contact_id: hubspotContactId,
            hubspot_deal_id: dealResult?.id,
            action: contactResult.action
        };
    } catch (error) {
        console.error(`\n❌ Failed to sync lead to HubSpot:`, error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Batch Sync: Push Multiple Contacts to HubSpot
 * 
 * @param {Array} contacts - Array of Paycile contacts
 * @returns {Object} Batch sync results
 */
async function batchSyncContactsToHubSpot(contacts) {
    console.log(`\n🔄 Starting batch sync of ${contacts.length} contacts to HubSpot...\n`);

    const results = {
        success: 0,
        failed: 0,
        errors: []
    };

    for (const contact of contacts) {
        try {
            await pushContactToHubSpot(contact);
            results.success++;
        } catch (error) {
            results.failed++;
            results.errors.push({
                email: contact.email,
                error: error.message
            });
        }
    }

    console.log(`\n✅ Batch sync complete: ${results.success} succeeded, ${results.failed} failed\n`);
    return results;
}

// Export functions
module.exports = {
    testConnection,
    createCustomProperties,
    pushContactToHubSpot,
    createDealForContact,
    logEngagementActivity,
    getDealStatus,
    syncQualifiedLeadToHubSpot,
    batchSyncContactsToHubSpot
};

// CLI Usage
if (require.main === module) {
    const command = process.argv[2];

    switch (command) {
        case 'test':
            testConnection();
            break;
        case 'setup':
            testConnection().then(success => {
                if (success) {
                    createCustomProperties();
                }
            });
            break;
        case 'sync-test':
            // Test sync with sample data
            const sampleContact = {
                email: 'test@example.com',
                first_name: 'John',
                last_name: 'Doe',
                company: 'Test Company',
                phone: '+1234567890',
                job_title: 'CFO',
                persona: 'cfo',
                campaign_name: 'CFO Insurance Campaign',
                lead_score: 85,
                total_touches: 12,
                channel_preference: 'email',
                status: 'needs_bdr'
            };
            syncQualifiedLeadToHubSpot(sampleContact, []);
            break;
        default:
            console.log(`
HubSpot Integration CLI

Usage:
  node hubspot_integration.js test          - Test API connection
  node hubspot_integration.js setup         - Create custom properties in HubSpot
  node hubspot_integration.js sync-test     - Test sync with sample contact

Environment Variables Required:
  HUBSPOT_ACCESS_TOKEN - Your HubSpot Private App access token
  HUBSPOT_PORTAL_ID    - Your HubSpot portal ID (default: 243314049)
            `);
    }
}
