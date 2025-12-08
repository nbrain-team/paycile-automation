/**
 * Apollo.io API Integration
 * Docs: https://apolloio.github.io/apollo-api-docs/
 */

const APOLLO_API_BASE = 'https://api.apollo.io/v1';

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
    api_key: apiKey,
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

  const res = await doFetch(`${APOLLO_API_BASE}/mixed_people/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Apollo API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return {
    people: data.people || [],
    pagination: data.pagination || { page: 1, per_page: 25, total_entries: 0, total_pages: 0 },
  };
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
    api_key: apiKey,
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






