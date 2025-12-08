import { useState } from 'react';
import { useStore } from '@store/useStore';
import { apiApollo } from '@lib/api';

const tabs = ['People', 'Organizations'] as const;

// Apollo seniority levels
const SENIORITY_LEVELS = [
  'owner',
  'founder',
  'c_suite',
  'vp',
  'director',
  'manager',
  'senior',
  'entry',
  'intern',
];

// Common employee ranges
const EMPLOYEE_RANGES = [
  '1,10',
  '11,50',
  '51,200',
  '201,500',
  '501,1000',
  '1001,5000',
  '5001,10000',
  '10001,',
];

const EMPLOYEE_RANGE_LABELS: Record<string, string> = {
  '1,10': '1-10',
  '11,50': '11-50',
  '51,200': '51-200',
  '201,500': '201-500',
  '501,1000': '501-1,000',
  '1001,5000': '1,001-5,000',
  '5001,10000': '5,001-10,000',
  '10001,': '10,001+',
};

export function ApolloSearch() {
  const { addToast } = useStore() as any;
  const [tab, setTab] = useState<(typeof tabs)[number]>('People');
  const [loading, setLoading] = useState(false);

  // People search state
  const [peopleKeywords, setPeopleKeywords] = useState('');
  const [peopleTitles, setPeopleTitles] = useState('');
  const [peopleSeniorities, setPeopleSeniorities] = useState<string[]>([]);
  const [peopleEmployeeRanges, setPeopleEmployeeRanges] = useState<string[]>([]);
  const [peopleLocations, setPeopleLocations] = useState('');
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [peoplePagination, setPeoplePagination] = useState<any>(null);

  // Organizations search state
  const [orgKeywords, setOrgKeywords] = useState('');
  const [orgEmployeeRanges, setOrgEmployeeRanges] = useState<string[]>([]);
  const [orgLocations, setOrgLocations] = useState('');
  const [orgResults, setOrgResults] = useState<any[]>([]);
  const [orgPagination, setOrgPagination] = useState<any>(null);

  const handlePeopleSearch = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: 25 };
      if (peopleKeywords.trim()) params.q_keywords = peopleKeywords.trim();
      if (peopleTitles.trim()) {
        params.person_titles = peopleTitles
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
      if (peopleSeniorities.length > 0) params.person_seniorities = peopleSeniorities;
      if (peopleEmployeeRanges.length > 0) params.organization_num_employees_ranges = peopleEmployeeRanges;
      if (peopleLocations.trim()) {
        params.organization_locations = peopleLocations
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean);
      }

      const response: any = await apiApollo.searchPeople(params);
      if (response.success && response.data) {
        setPeopleResults(response.data.people || []);
        setPeoplePagination(response.data.pagination || null);
        addToast({
          title: 'Search completed',
          description: `Found ${response.data.pagination?.total_entries || 0} people`,
          variant: 'success',
        });
      } else {
        throw new Error('Invalid response');
      }
    } catch (err: any) {
      addToast({
        title: 'Search failed',
        description: String(err?.message || 'error'),
        variant: 'error',
      });
      setPeopleResults([]);
      setPeoplePagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationsSearch = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: 25 };
      if (orgKeywords.trim()) {
        params.q_organization_keyword_tags = orgKeywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean);
      }
      if (orgEmployeeRanges.length > 0) params.organization_num_employees_ranges = orgEmployeeRanges;
      if (orgLocations.trim()) {
        params.organization_locations = orgLocations
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean);
      }

      const response: any = await apiApollo.searchOrganizations(params);
      if (response.success && response.data) {
        setOrgResults(response.data.organizations || []);
        setOrgPagination(response.data.pagination || null);
        addToast({
          title: 'Search completed',
          description: `Found ${response.data.pagination?.total_entries || 0} organizations`,
          variant: 'success',
        });
      } else {
        throw new Error('Invalid response');
      }
    } catch (err: any) {
      addToast({
        title: 'Search failed',
        description: String(err?.message || 'error'),
        variant: 'error',
      });
      setOrgResults([]);
      setOrgPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeniority = (level: string) => {
    setPeopleSeniorities((prev) =>
      prev.includes(level) ? prev.filter((s) => s !== level) : [...prev, level]
    );
  };

  const togglePeopleEmployeeRange = (range: string) => {
    setPeopleEmployeeRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleOrgEmployeeRange = (range: string) => {
    setOrgEmployeeRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Apollo Search</h1>
          <p className="text-sm text-gray-600">Search for people and organizations using Apollo.io</p>
        </div>
      </div>

      <div className="subtabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`subtab ${tab === t ? 'subtab-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'People' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">People Search Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Keywords</label>
                <input
                  className="input"
                  placeholder="e.g., software engineer, marketing"
                  value={peopleKeywords}
                  onChange={(e) => setPeopleKeywords(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">General search terms</p>
              </div>

              <div>
                <label className="label">Job Titles (comma-separated)</label>
                <input
                  className="input"
                  placeholder="e.g., CEO, CTO, VP of Sales"
                  value={peopleTitles}
                  onChange={(e) => setPeopleTitles(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Specific job titles to search for</p>
              </div>

              <div>
                <label className="label">Seniority Levels</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SENIORITY_LEVELS.map((level) => (
                    <button
                      key={level}
                      className={`subtab ${peopleSeniorities.includes(level) ? 'subtab-active' : ''}`}
                      onClick={() => toggleSeniority(level)}
                    >
                      {level.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Company Size (Employees)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {EMPLOYEE_RANGES.map((range) => (
                    <button
                      key={range}
                      className={`subtab ${peopleEmployeeRanges.includes(range) ? 'subtab-active' : ''}`}
                      onClick={() => togglePeopleEmployeeRange(range)}
                    >
                      {EMPLOYEE_RANGE_LABELS[range]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Locations (comma-separated)</label>
                <input
                  className="input"
                  placeholder="e.g., San Francisco CA, New York NY"
                  value={peopleLocations}
                  onChange={(e) => setPeopleLocations(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">City and state combinations</p>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  className="btn-outline btn-md"
                  onClick={() => {
                    setPeopleKeywords('');
                    setPeopleTitles('');
                    setPeopleSeniorities([]);
                    setPeopleEmployeeRanges([]);
                    setPeopleLocations('');
                    setPeopleResults([]);
                    setPeoplePagination(null);
                  }}
                >
                  Clear
                </button>
                <button
                  className="btn-primary btn-md"
                  onClick={() => handlePeopleSearch(1)}
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search People'}
                </button>
              </div>
            </div>
          </div>

          {peopleResults.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Results ({peoplePagination?.total_entries || 0} total)
                </h2>
                {peoplePagination && (
                  <div className="text-sm text-gray-600">
                    Page {peoplePagination.page} of {peoplePagination.total_pages}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {peopleResults.map((person) => (
                  <div key={person.id} className="border rounded-lg p-4 hover:shadow-soft-xl transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{person.name}</h3>
                        {person.title && <p className="text-sm text-gray-700">{person.title}</p>}
                        {person.organization && (
                          <p className="text-sm text-gray-600 mt-1">
                            {person.organization.name}
                            {person.organization.industry && ` · ${person.organization.industry}`}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          {person.email && <span>{person.email}</span>}
                          {person.city && person.state && (
                            <span>
                              {person.city}, {person.state}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {person.linkedin_url && (
                          <a
                            href={person.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline btn-xs"
                          >
                            LinkedIn
                          </a>
                        )}
                        <button
                          className="btn-primary btn-xs"
                          onClick={() => {
                            addToast({
                              title: 'Person selected',
                              description: person.name,
                              variant: 'info',
                            });
                          }}
                        >
                          Add to Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {peoplePagination && peoplePagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => handlePeopleSearch(peoplePagination.page - 1)}
                    disabled={peoplePagination.page === 1 || loading}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {peoplePagination.page} of {peoplePagination.total_pages}
                  </span>
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => handlePeopleSearch(peoplePagination.page + 1)}
                    disabled={peoplePagination.page >= peoplePagination.total_pages || loading}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'Organizations' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Organization Search Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Keywords (comma-separated)</label>
                <input
                  className="input"
                  placeholder="e.g., saas, fintech, healthcare"
                  value={orgKeywords}
                  onChange={(e) => setOrgKeywords(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Industry keywords or company tags</p>
              </div>

              <div>
                <label className="label">Company Size (Employees)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {EMPLOYEE_RANGES.map((range) => (
                    <button
                      key={range}
                      className={`subtab ${orgEmployeeRanges.includes(range) ? 'subtab-active' : ''}`}
                      onClick={() => toggleOrgEmployeeRange(range)}
                    >
                      {EMPLOYEE_RANGE_LABELS[range]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Locations (comma-separated)</label>
                <input
                  className="input"
                  placeholder="e.g., San Francisco CA, Austin TX"
                  value={orgLocations}
                  onChange={(e) => setOrgLocations(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">City and state combinations</p>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  className="btn-outline btn-md"
                  onClick={() => {
                    setOrgKeywords('');
                    setOrgEmployeeRanges([]);
                    setOrgLocations('');
                    setOrgResults([]);
                    setOrgPagination(null);
                  }}
                >
                  Clear
                </button>
                <button
                  className="btn-primary btn-md"
                  onClick={() => handleOrganizationsSearch(1)}
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Organizations'}
                </button>
              </div>
            </div>
          </div>

          {orgResults.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Results ({orgPagination?.total_entries || 0} total)
                </h2>
                {orgPagination && (
                  <div className="text-sm text-gray-600">
                    Page {orgPagination.page} of {orgPagination.total_pages}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {orgResults.map((org) => (
                  <div key={org.id} className="border rounded-lg p-4 hover:shadow-soft-xl transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{org.name}</h3>
                        {org.industry && <p className="text-sm text-gray-700">{org.industry}</p>}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          {org.estimated_num_employees && (
                            <span>{org.estimated_num_employees.toLocaleString()} employees</span>
                          )}
                          {org.city && org.state && (
                            <span>
                              {org.city}, {org.state}
                            </span>
                          )}
                        </div>
                        {org.keywords && org.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {org.keywords.slice(0, 5).map((kw: string, idx: number) => (
                              <span key={idx} className="badge-secondary text-xs">
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {org.website_url && (
                          <a
                            href={org.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline btn-xs"
                          >
                            Website
                          </a>
                        )}
                        {org.linkedin_url && (
                          <a
                            href={org.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline btn-xs"
                          >
                            LinkedIn
                          </a>
                        )}
                        <button
                          className="btn-primary btn-xs"
                          onClick={() => {
                            addToast({
                              title: 'Organization selected',
                              description: org.name,
                              variant: 'info',
                            });
                          }}
                        >
                          Add to Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {orgPagination && orgPagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => handleOrganizationsSearch(orgPagination.page - 1)}
                    disabled={orgPagination.page === 1 || loading}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {orgPagination.page} of {orgPagination.total_pages}
                  </span>
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => handleOrganizationsSearch(orgPagination.page + 1)}
                    disabled={orgPagination.page >= orgPagination.total_pages || loading}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}






