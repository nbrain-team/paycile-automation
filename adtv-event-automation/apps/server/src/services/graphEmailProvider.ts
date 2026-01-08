/**
 * Microsoft Graph API Email Provider
 * Sends emails using Microsoft Graph API with OAuth 2.0
 */

import https from 'https';

export interface GraphEmailInput {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface GraphEmailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get OAuth access token for Microsoft Graph API
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && Date.now() < tokenExpiry - 300000) {
    return cachedToken;
  }

  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

  if (!clientId || !tenantId || !clientSecret) {
    throw new Error('Missing Microsoft Graph API credentials in environment variables');
  }

  const tokenData = new URLSearchParams({
    client_id: clientId,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  }).toString();

  const options = {
    hostname: 'login.microsoftonline.com',
    port: 443,
    path: `/${tenantId}/oauth2/v2.0/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': tokenData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const tokenResponse: TokenResponse = JSON.parse(data);
          cachedToken = tokenResponse.access_token;
          tokenExpiry = Date.now() + (tokenResponse.expires_in * 1000);
          resolve(tokenResponse.access_token);
        } else {
          reject(new Error(`Token request failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(tokenData);
    req.end();
  });
}

/**
 * Send email via Microsoft Graph API
 */
export async function sendGraphEmail(input: GraphEmailInput): Promise<GraphEmailResult> {
  try {
    const accessToken = await getAccessToken();
    const fromAddress = input.from || process.env.EMAIL_FROM || 'stanley@paycile.com';

    const emailPayload = JSON.stringify({
      message: {
        subject: input.subject,
        body: {
          contentType: 'HTML',
          content: input.body
        },
        toRecipients: [
          {
            emailAddress: {
              address: input.to
            }
          }
        ]
      },
      saveToSentItems: true
    });

    const options = {
      hostname: 'graph.microsoft.com',
      port: 443,
      path: `/v1.0/users/${fromAddress}/sendMail`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(emailPayload)
      }
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 202 || res.statusCode === 200) {
            // Graph API returns 202 Accepted for successful email send
            resolve({
              sent: true,
              messageId: `graph-${Date.now()}`
            });
          } else {
            console.error('Graph API send failed:', res.statusCode, data);
            resolve({
              sent: false,
              error: `Graph API error: ${res.statusCode}`
            });
          }
        });
      });

      req.on('error', (err) => {
        console.error('Graph API request error:', err);
        resolve({
          sent: false,
          error: err.message
        });
      });

      req.write(emailPayload);
      req.end();
    });

  } catch (error: any) {
    console.error('Graph email error:', error);
    return {
      sent: false,
      error: error.message
    };
  }
}

/**
 * Check if Graph API is configured
 */
export function isGraphConfigured(): boolean {
  return !!(
    process.env.MICROSOFT_CLIENT_ID &&
    process.env.MICROSOFT_TENANT_ID &&
    process.env.MICROSOFT_CLIENT_SECRET
  );
}




