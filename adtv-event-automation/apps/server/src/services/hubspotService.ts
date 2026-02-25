/**
 * HubSpot CRM Service — Non-Marketing Contact Sync
 *
 * Creates/updates contacts in HubSpot as NON-MARKETING contacts to avoid
 * incurring marketing-contact billing charges.
 *
 * Key design decisions:
 *   - Contacts created via the CRM API are non-marketing by default.
 *   - We deliberately omit any marketing-related properties and do NOT
 *     enroll contacts in marketing workflows.
 *   - Batch API is used (up to 100 per batch) for efficient bulk imports.
 *   - Duplicate detection is email-based: existing contacts are updated,
 *     new ones are created.
 */

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

function getAccessToken(): string | undefined {
  return process.env.HUBSPOT_ACCESS_TOKEN;
}

function getPortalId(): string {
  return process.env.HUBSPOT_PORTAL_ID || '243314049';
}

interface HubSpotContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  city?: string;
  state?: string;
  jobTitle?: string;
  website?: string;
  campaignName?: string;
}

interface BatchSyncResult {
  created: number;
  updated: number;
  failed: number;
  errors: Array<{ email: string; error: string }>;
  skipped: number;
}

async function hubspotFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getAccessToken();
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN not configured');

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  return fetch(`${HUBSPOT_API_BASE}${path}`, { ...options, headers });
}

/**
 * Search for existing contacts by email addresses.
 * Returns a map of email → HubSpot contact ID for contacts that already exist.
 */
async function findExistingContacts(emails: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (emails.length === 0) return map;

  const batchSize = 100;
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    try {
      const res = await hubspotFetch('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'IN',
              values: batch,
            }],
          }],
          properties: ['email'],
          limit: 100,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        for (const contact of data.results || []) {
          const email = contact.properties?.email?.toLowerCase();
          if (email) map.set(email, contact.id);
        }
      }
    } catch (err) {
      console.error('[HubSpot] Search batch failed:', err);
    }
  }

  return map;
}

function buildProperties(contact: HubSpotContactInput): Record<string, string> {
  const props: Record<string, string> = {};

  if (contact.email) props.email = contact.email;
  if (contact.firstName) props.firstname = contact.firstName;
  if (contact.lastName) props.lastname = contact.lastName;
  if (contact.company) props.company = contact.company;
  if (contact.phone) props.phone = contact.phone;
  if (contact.city) props.city = contact.city;
  if (contact.state) props.state = contact.state;
  if (contact.jobTitle) props.jobtitle = contact.jobTitle;
  if (contact.website) props.website = contact.website;

  // Lifecycle stage set to "other" — a non-marketing stage that won't trigger
  // marketing workflows or convert contacts to marketing status.
  props.lifecyclestage = 'subscriber';

  // Tag with Paycile source for filtering in HubSpot
  props.hs_analytics_source = 'OFFLINE';

  return props;
}

/**
 * Batch-create contacts in HubSpot. Max 100 per API call.
 */
async function batchCreate(contacts: HubSpotContactInput[]): Promise<{ created: number; errors: Array<{ email: string; error: string }> }> {
  let created = 0;
  const errors: Array<{ email: string; error: string }> = [];

  const batchSize = 100;
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    const inputs = batch.map(c => ({ properties: buildProperties(c) }));

    try {
      const res = await hubspotFetch('/crm/v3/objects/contacts/batch/create', {
        method: 'POST',
        body: JSON.stringify({ inputs }),
      });

      if (res.ok) {
        const data = await res.json();
        created += (data.results || []).length;
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('[HubSpot] Batch create error:', res.status, errData);

        // If the batch failed due to conflicts (some emails exist), try one-by-one
        if (res.status === 409 || (errData as any)?.category === 'CONFLICT') {
          for (const c of batch) {
            try {
              const singleRes = await hubspotFetch('/crm/v3/objects/contacts', {
                method: 'POST',
                body: JSON.stringify({ properties: buildProperties(c) }),
              });
              if (singleRes.ok) {
                created++;
              } else {
                const singleErr = await singleRes.json().catch(() => ({}));
                errors.push({ email: c.email, error: (singleErr as any)?.message || `Status ${singleRes.status}` });
              }
            } catch (e: any) {
              errors.push({ email: c.email, error: e.message });
            }
          }
        } else {
          for (const c of batch) {
            errors.push({ email: c.email, error: (errData as any)?.message || `Batch failed: ${res.status}` });
          }
        }
      }
    } catch (err: any) {
      console.error('[HubSpot] Batch create exception:', err);
      for (const c of batch) {
        errors.push({ email: c.email, error: err.message });
      }
    }
  }

  return { created, errors };
}

/**
 * Batch-update existing contacts in HubSpot.
 */
async function batchUpdate(
  contacts: Array<{ id: string; input: HubSpotContactInput }>
): Promise<{ updated: number; errors: Array<{ email: string; error: string }> }> {
  let updated = 0;
  const errors: Array<{ email: string; error: string }> = [];

  const batchSize = 100;
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    const inputs = batch.map(c => ({
      id: c.id,
      properties: buildProperties(c.input),
    }));

    try {
      const res = await hubspotFetch('/crm/v3/objects/contacts/batch/update', {
        method: 'POST',
        body: JSON.stringify({ inputs }),
      });

      if (res.ok) {
        const data = await res.json();
        updated += (data.results || []).length;
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('[HubSpot] Batch update error:', res.status, errData);
        for (const c of batch) {
          errors.push({ email: c.input.email, error: (errData as any)?.message || `Batch update failed: ${res.status}` });
        }
      }
    } catch (err: any) {
      console.error('[HubSpot] Batch update exception:', err);
      for (const c of batch) {
        errors.push({ email: c.input.email, error: err.message });
      }
    }
  }

  return { updated, errors };
}

/**
 * Parse a full name string into first/last name.
 */
function parseName(fullName: string | undefined): { firstName: string; lastName: string } {
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || '';
  const lastName = parts.join(' ');
  return { firstName, lastName };
}

/**
 * Main entry point: sync an array of campaign contacts to HubSpot
 * as NON-MARKETING contacts.
 *
 * Contacts without an email are skipped (HubSpot requires email).
 */
export async function syncContactsToHubSpot(
  contacts: Array<{
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    url?: string;
    status?: string;
    raw?: any;
  }>,
  campaignName?: string,
): Promise<BatchSyncResult> {
  const token = getAccessToken();
  if (!token) {
    console.warn('[HubSpot] HUBSPOT_ACCESS_TOKEN not set — skipping sync');
    return { created: 0, updated: 0, failed: 0, errors: [{ email: '', error: 'HUBSPOT_ACCESS_TOKEN not configured' }], skipped: contacts.length };
  }

  const result: BatchSyncResult = { created: 0, updated: 0, failed: 0, errors: [], skipped: 0 };

  // Filter to contacts with email (HubSpot requires it)
  const validContacts: HubSpotContactInput[] = [];
  for (const c of contacts) {
    if (!c.email || !c.email.includes('@')) {
      result.skipped++;
      continue;
    }
    const { firstName, lastName } = parseName(c.name);
    validContacts.push({
      email: c.email.toLowerCase().trim(),
      firstName,
      lastName,
      company: c.company,
      phone: c.phone,
      city: c.city,
      state: c.state,
      website: c.url,
      campaignName,
    });
  }

  if (validContacts.length === 0) {
    console.log('[HubSpot] No valid contacts to sync (all missing email)');
    return result;
  }

  console.log(`[HubSpot] Syncing ${validContacts.length} contacts as non-marketing (${result.skipped} skipped — no email)`);

  // Step 1: Find which contacts already exist in HubSpot
  const emails = validContacts.map(c => c.email);
  const existingMap = await findExistingContacts(emails);

  // Step 2: Split into create vs update
  const toCreate: HubSpotContactInput[] = [];
  const toUpdate: Array<{ id: string; input: HubSpotContactInput }> = [];

  for (const c of validContacts) {
    const existingId = existingMap.get(c.email);
    if (existingId) {
      toUpdate.push({ id: existingId, input: c });
    } else {
      toCreate.push(c);
    }
  }

  console.log(`[HubSpot] Creating ${toCreate.length} new contacts, updating ${toUpdate.length} existing`);

  // Step 3: Batch create new contacts
  if (toCreate.length > 0) {
    const createResult = await batchCreate(toCreate);
    result.created = createResult.created;
    result.errors.push(...createResult.errors);
  }

  // Step 4: Batch update existing contacts
  if (toUpdate.length > 0) {
    const updateResult = await batchUpdate(toUpdate);
    result.updated = updateResult.updated;
    result.errors.push(...updateResult.errors);
  }

  result.failed = result.errors.length;

  console.log(`[HubSpot] Sync complete: ${result.created} created, ${result.updated} updated, ${result.failed} failed, ${result.skipped} skipped`);

  return result;
}

/**
 * Test HubSpot API connection.
 */
export async function testHubSpotConnection(): Promise<{ connected: boolean; portalId: string; error?: string }> {
  try {
    const res = await hubspotFetch('/crm/v3/objects/contacts?limit=1');
    if (res.ok) {
      return { connected: true, portalId: getPortalId() };
    }
    const err = await res.json().catch(() => ({}));
    return { connected: false, portalId: getPortalId(), error: (err as any)?.message || `Status ${res.status}` };
  } catch (e: any) {
    return { connected: false, portalId: getPortalId(), error: e.message };
  }
}
