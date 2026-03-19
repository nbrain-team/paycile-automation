import https from 'https';

const CALENDLY_API = 'api.calendly.com';
const PAT = () => process.env.CALENDLY_PAT || '';

function calendlyRequest(method: string, path: string, body?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: CALENDLY_API,
      port: 443,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${PAT()}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Calendly API ${res.statusCode}: ${JSON.stringify(parsed)}`));
          } else {
            resolve(parsed);
          }
        } catch {
          reject(new Error(`Calendly API parse error: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

export async function getCurrentUser(): Promise<{ uri: string; name: string; email: string }> {
  const res = await calendlyRequest('GET', '/users/me');
  return {
    uri: res.resource?.uri || '',
    name: res.resource?.name || '',
    email: res.resource?.email || '',
  };
}

export async function getOrganization(): Promise<string> {
  const user = await getCurrentUser();
  const res = await calendlyRequest('GET', '/users/me');
  return res.resource?.current_organization || '';
}

export async function subscribeWebhook(callbackUrl: string): Promise<any> {
  const orgUri = await getOrganization();
  if (!orgUri) throw new Error('Could not determine Calendly organization URI');

  const res = await calendlyRequest('POST', '/webhook_subscriptions', {
    url: callbackUrl,
    events: ['invitee.created', 'invitee.canceled'],
    organization: orgUri,
    scope: 'organization',
  });
  return res.resource;
}

export async function listWebhookSubscriptions(): Promise<any[]> {
  const orgUri = await getOrganization();
  if (!orgUri) return [];
  const res = await calendlyRequest('GET', `/webhook_subscriptions?organization=${encodeURIComponent(orgUri)}&scope=organization`);
  return res.collection || [];
}

export async function deleteWebhookSubscription(webhookUri: string): Promise<void> {
  const uuid = webhookUri.split('/').pop();
  if (uuid) {
    await calendlyRequest('DELETE', `/webhook_subscriptions/${uuid}`);
  }
}

export function isCalendlyConfigured(): boolean {
  return !!PAT();
}
