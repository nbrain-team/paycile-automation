// Support both runtime config (window.ENV) and build-time env vars
const getApiUrl = () => {
  return (window as any).ENV?.VITE_API_URL || 
         (import.meta as any).env?.VITE_API_URL || 
         'http://localhost:4000';
};

const API_URL = getApiUrl();

async function getJson(path: string) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function sendJson(method: string, path: string, body?: any) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} failed`);
  return res.json();
}

// Templates
export const apiTemplates = {
  list: () => getJson('/api/templates'),
  get: (id: string) => getJson(`/api/templates/${id}`),
  create: (name: string, graph: { nodes: any[]; edges: any[] }) => sendJson('POST', '/api/templates', { name, graph }),
  saveGraph: (id: string, graph: { nodes: any[]; edges: any[] }) => sendJson('PUT', `/api/templates/${id}/graph`, graph),
  delete: (id: string) => sendJson('DELETE', `/api/templates/${id}`),
  // Template versions
  listVersions: (templateId: string) => getJson(`/api/templates/${templateId}/versions`),
  getVersion: (templateId: string, versionId: string) => getJson(`/api/templates/${templateId}/versions/${versionId}`),
  createVersion: (templateId: string, data: { versionName: string; description?: string; campaignId?: string; nodes: any[]; edges: any[]; createdBy?: string }) =>
    sendJson('POST', `/api/templates/${templateId}/versions`, data),
  updateVersion: (templateId: string, versionId: string, data: { versionName?: string; description?: string; nodes?: any[]; edges?: any[] }) =>
    sendJson('PATCH', `/api/templates/${templateId}/versions/${versionId}`, data),
  deleteVersion: (templateId: string, versionId: string) => sendJson('DELETE', `/api/templates/${templateId}/versions/${versionId}`),
  exportCsv: (templateId: string, versionId?: string) => `${API_URL}/api/templates/${templateId}/export/csv${versionId ? `?versionId=${versionId}` : ''}`,
  importCsv: (templateId: string, csvData: string, createVersion: boolean, versionName?: string, campaignId?: string) =>
    sendJson('POST', `/api/templates/${templateId}/import/csv`, { csvData, createVersion, versionName, campaignId }),
};

export const apiContentTemplates = {
  list: () => getJson('/api/content-templates') as Promise<Array<{ id: string; type: 'email'|'sms'|'voicemail'; name: string; subject?: string; body?: string; text?: string; tts_script?: string }>>,
  create: (tpl: { type: 'email'|'sms'|'voicemail'; name: string; subject?: string; body?: string; text?: string; tts_script?: string }) => sendJson('POST', '/api/content-templates', tpl),
  update: (id: string, tpl: { type?: 'email'|'sms'|'voicemail'; name?: string; subject?: string; body?: string; text?: string; tts_script?: string }) => sendJson('PATCH', `/api/content-templates/${id}`, tpl),
  delete: (id: string) => sendJson('DELETE', `/api/content-templates/${id}`),
};

// Campaigns
export const apiCampaigns = {
  list: () => getJson('/api/campaigns'),
  create: (payload: any) => sendJson('POST', '/api/campaigns', payload),
  patch: (id: string, payload: any) => sendJson('PATCH', `/api/campaigns/${id}`, payload),
  contacts: (id: string) => getJson(`/api/campaigns/${id}/contacts`),
  contactsBulk: (id: string, contacts: any[]) => sendJson('POST', `/api/campaigns/${id}/contacts/bulk`, { contacts }),
  contactAdd: (id: string, contact: any) => sendJson('POST', `/api/campaigns/${id}/contacts`, contact),
  graph: (id: string) => getJson(`/api/campaigns/${id}/graph`),
  stats: (id: string) => getJson(`/api/campaigns/${id}/stats`),
};

export const apiContacts = {
  update: (id: string, payload: any) => sendJson('PATCH', `/api/contacts/${id}`, payload),
  checkout: (id: string, nodeKey?: string) => sendJson('POST', `/api/contacts/${id}/checkout`, { nodeKey }),
  checkin: (id: string, resumeFromPausedNode?: boolean, stageKey?: string) => sendJson('POST', `/api/contacts/${id}/checkin`, { resumeFromPausedNode, stageKey }),
};

// Inbox
export const apiInbox = {
  conversations: () => getJson('/api/conversations'),
  sendMessage: (opts: { conversationId?: string; contactId?: string; text: string; direction: 'in'|'out' }) => sendJson('POST', '/api/messages', opts),
};

export const apiEmail = {
  send: (payload: { to: string; subject: string; body: string; userId?: string; contactId?: string }) => sendJson('POST', '/api/email/send', payload),
};

export const apiSms = {
  send: (payload: { to?: string; text: string; contactId?: string }) => sendJson('POST', '/api/sms/send', payload),
};

export const apiVoicemail = {
  drop: (payload: { to?: string; contactId?: string; audioUrl?: string; ttsScript?: string; callerId?: string; scheduleAt?: string; campaignId?: string }) =>
    sendJson('POST', '/api/voicemail/drop', payload),
};

// Auth
export const apiAuth = {
  login: (email: string, password: string) => sendJson('POST', '/api/auth/login', { email, password }),
  me: () => getJson('/api/auth/me'),
};

// Google OAuth
export const apiGoogle = {
  initiate: (userId: string) => getJson(`/api/auth/google/initiate?userId=${encodeURIComponent(userId)}`) as Promise<{ url: string }>,
  sync: (userId: string, days?: number) => sendJson('POST', '/api/gmail/sync', { userId, days }),
};

// AI - Newbury Partners Voice
export const apiAI = {
  generateResponse: (contactId: string, conversationHistory?: Array<{ direction: 'in' | 'out'; text: string; time: string }>) =>
    sendJson('POST', '/api/ai/generate-response', { contactId, conversationHistory }) as Promise<{ ok: boolean; response: string }>,
  
  // New Newbury-trained inbox response generator
  generateInboxResponse: (incomingMessage: any, contactInfo?: any, campaignContext?: any, bdrNotes?: string) =>
    sendJson('POST', '/api/ai/inbox/generate-response', { 
      messageId: incomingMessage.id,
      incomingMessage, 
      contactInfo, 
      campaignContext, 
      bdrNotes 
    }) as Promise<{ success: boolean; response: { subject?: string; body: string; rationale: string; confidence: string; suggestedNextSteps?: string[] } }>,
};

// Apollo.io Integration
export const apiApollo = {
  searchPeople: (params: {
    q_keywords?: string;
    person_titles?: string[];
    person_seniorities?: string[];
    organization_num_employees_ranges?: string[];
    organization_locations?: string[];
    page?: number;
    per_page?: number;
  }) => sendJson('POST', '/api/apollo/people/search', params),
  
  searchOrganizations: (params: {
    q_organization_keyword_tags?: string[];
    organization_num_employees_ranges?: string[];
    organization_locations?: string[];
    industry_tag_ids?: string[];
    page?: number;
    per_page?: number;
  }) => sendJson('POST', '/api/apollo/organizations/search', params),
};

// AI Email Personalization
export const apiPersonalization = {
  /** Trigger AI personalization generation for all contacts × email nodes */
  generate: (campaignId: string) => sendJson('POST', `/api/campaigns/${campaignId}/personalize`),
  /** Poll generation progress */
  status: (campaignId: string) => getJson(`/api/campaigns/${campaignId}/personalize/status`) as Promise<{ total: number; completed: number; failed: number; running: boolean }>,
  /** Get all personalized emails for review */
  list: (campaignId: string) => getJson(`/api/campaigns/${campaignId}/personalized-emails`),
  /** Update a single personalized email (approve, reject, edit) */
  update: (id: string, payload: { status?: string; editedSubject?: string; editedBody?: string }) => sendJson('PATCH', `/api/personalized-emails/${id}`, payload),
  /** Bulk approve all pending personalized emails */
  bulkApprove: (campaignId: string) => sendJson('PATCH', `/api/campaigns/${campaignId}/personalized-emails/bulk-approve`),
};

// Sender Emails (for campaign creation)
export const apiSenderEmails = {
  list: () => getJson('/api/sender-emails') as Promise<Array<{ email: string; name: string; source: string }>>,
};

export { API_URL, getApiUrl };


