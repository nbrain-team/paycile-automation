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
 * Refresh a user's Microsoft OAuth access token using their refresh token.
 * Returns the new access token or null if refresh fails.
 */
export async function refreshUserMicrosoftToken(refreshToken: string): Promise<{ access_token: string; refresh_token?: string; expires_in: number } | null> {
  try {
    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
    const tenantId = process.env.MICROSOFT_TENANT_ID || 'common';

    if (!clientId || !clientSecret) return null;

    const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'openid profile email offline_access Mail.Send User.Read',
      }).toString(),
    });

    if (!res.ok) {
      console.error('[Graph] Token refresh failed:', await res.text().catch(() => ''));
      return null;
    }

    return await res.json();
  } catch (err: any) {
    console.error('[Graph] Token refresh error:', err.message);
    return null;
  }
}

/**
 * Send email using a specific user's delegated Microsoft token.
 * Uses the /me/sendMail endpoint which sends as the authenticated user.
 */
export async function sendGraphEmailAsUser(
  userAccessToken: string,
  input: GraphEmailInput
): Promise<GraphEmailResult> {
  try {
    const emailPayload = JSON.stringify({
      message: {
        subject: input.subject,
        body: { contentType: 'HTML', content: input.body },
        toRecipients: [{ emailAddress: { address: input.to } }],
      },
      saveToSentItems: true,
    });

    // Use /me/sendMail with the user's delegated token (sends as the user)
    const res = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: emailPayload,
    });

    if (res.status === 202 || res.status === 200) {
      return { sent: true, messageId: `graph-user-${Date.now()}` };
    } else {
      const errText = await res.text().catch(() => '');
      console.error('[Graph] User sendMail failed:', res.status, errText);
      return { sent: false, error: `Graph API error: ${res.status}` };
    }
  } catch (error: any) {
    console.error('[Graph] User email error:', error.message);
    return { sent: false, error: error.message };
  }
}

/**
 * Check if Graph API is configured (server-level credentials)
 */
export function isGraphConfigured(): boolean {
  return !!(
    process.env.MICROSOFT_CLIENT_ID &&
    process.env.MICROSOFT_TENANT_ID &&
    process.env.MICROSOFT_CLIENT_SECRET
  );
}








