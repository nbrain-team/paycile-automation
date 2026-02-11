/**
 * Apollo.io API Integration
 * Docs: https://apolloio.github.io/apollo-api-docs/
 */

const APOLLO_API_BASE = 'https://api.apollo.io/api/v1';

function doFetch(url: string, init?: any) {
  const f: any = (globalThis as any).fetch;
  if (!f) {
    throw new Error('Global fetch not available in runtime');
  }
  return f(url, init);
}

export interface ApolloPersonSearchParams {
  q_keywords?: string;
  person_titles?: string[];
  person_seniorities?: string[];
  organization_num_employees_ranges?: string[];
  organization_locations?: string[];
  page?: number;
  per_page?: number;
}

export interface ApolloOrganizationSearchParams {
  q_organization_keyword_tags?: string[];
  organization_num_employees_ranges?: string[];
  organization_locations?: string[];
  industry_tag_ids?: string[];
  page?: number;
  per_page?: number;
}

export interface ApolloPersonResult {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  title: string;
  email?: string;
  organization?: {
    id: string;
    name: string;
    website_url?: string;
    industry?: string;
  };
  linkedin_url?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface ApolloOrganizationResult {
  id: string;
  name: string;
  website_url?: string;
  blog_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  primary_phone?: {
    number: string;
  };
  industry?: string;
  keywords?: string[];
  estimated_num_employees?: number;
  retail_location_count?: number;
  city?: string;
  state?: string;
  country?: string;
}

/**
 * Search for people using Apollo API
 */
export async function searchPeople(params: ApolloPersonSearchParams): Promise<{
  people: ApolloPersonResult[];
  pagination: { page: number; per_page: number; total_entries: number; total_pages: number };
}> {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    throw new Error('APOLLO_API_KEY not configured');
  }

  const body: any = {
    page: params.page || 1,
    per_page: params.per_page || 25,
  };

  if (params.q_keywords) body.q_keywords = params.q_keywords;
  if (params.person_titles && params.person_titles.length > 0) {
    body.person_titles = params.person_titles;
  }
  if (params.person_seniorities && params.person_seniorities.length > 0) {
    body.person_seniorities = params.person_seniorities;
  }
  if (params.organization_num_employees_ranges && params.organization_num_employees_ranges.length > 0) {
    body.organization_num_employees_ranges = params.organization_num_employees_ranges;
  }
  if (params.organization_locations && params.organization_locations.length > 0) {
    body.organization_locations = params.organization_locations;
  }

  const res = await doFetch(`${APOLLO_API_BASE}/mixed_people/api_search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Apollo API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  // Log response keys for debugging
  console.log('[Apollo People Search] Response keys:', Object.keys(data));
  console.log('[Apollo People Search] People count:', (data.people || []).length);
  console.log('[Apollo People Search] Pagination:', JSON.stringify(data.pagination || null));
  if (data.people && data.people[0]) {
    console.log('[Apollo People Search] Sample person keys:', Object.keys(data.people[0]));
  }

  // The api_search endpoint may return people without a combined "name" field.
  // Normalize each person record to ensure name, title, organization are populated.
  const people = (data.people || []).map((p: any) => ({
    ...p,
    name: p.name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Unknown',
    title: p.title || '',
    email: p.email || p.email_address || '',
    organization: p.organization || (p.organization_name ? { name: p.organization_name, id: p.organization_id || '' } : undefined),
  }));

  // Pagination may be missing or structured differently in the new endpoint.
  // Try multiple fallback paths for pagination data.
  const pagination = data.pagination || {
    page: data.page || params.page || 1,
    per_page: data.per_page || params.per_page || 25,
    total_entries: data.total_entries || data.num_fetch_result || people.length,
    total_pages: data.total_pages || (data.total_entries ? Math.ceil(data.total_entries / (params.per_page || 25)) : (people.length > 0 ? 1 : 0)),
  };

  return { people, pagination };
}

/**
 * Search for organizations using Apollo API
 */
export async function searchOrganizations(params: ApolloOrganizationSearchParams): Promise<{
  organizations: ApolloOrganizationResult[];
  pagination: { page: number; per_page: number; total_entries: number; total_pages: number };
}> {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    throw new Error('APOLLO_API_KEY not configured');
  }

  const body: any = {
    page: params.page || 1,
    per_page: params.per_page || 25,
  };

  if (params.q_organization_keyword_tags && params.q_organization_keyword_tags.length > 0) {
    body.q_organization_keyword_tags = params.q_organization_keyword_tags;
  }
  if (params.organization_num_employees_ranges && params.organization_num_employees_ranges.length > 0) {
    body.organization_num_employees_ranges = params.organization_num_employees_ranges;
  }
  if (params.organization_locations && params.organization_locations.length > 0) {
    body.organization_locations = params.organization_locations;
  }
  if (params.industry_tag_ids && params.industry_tag_ids.length > 0) {
    body.industry_tag_ids = params.industry_tag_ids;
  }

  const res = await doFetch(`${APOLLO_API_BASE}/mixed_companies/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Apollo API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return {
    organizations: data.organizations || [],
    pagination: data.pagination || { page: 1, per_page: 25, total_entries: 0, total_pages: 0 },
  };
}






