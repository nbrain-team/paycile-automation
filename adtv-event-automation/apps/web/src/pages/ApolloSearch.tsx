import { useEffect, useState } from 'react';
import { useStore } from '@store/useStore';
import { apiApollo, apiCampaigns } from '@lib/api';

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

  // Selection + Import state
  const [selectedPeopleIds, setSelectedPeopleIds] = useState<Set<string>>(new Set());
  const [selectedOrgIds, setSelectedOrgIds] = useState<Set<string>>(new Set());
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);

  // Fetch campaigns on mount
  useEffect(() => {
    apiCampaigns.list().then((list: any[]) => {
      setCampaigns(list || []);
      if (list && list.length > 0) {
        setSelectedCampaignId(list[0].id);
      }
    }).catch(() => setCampaigns([]));
  }, []);

  const handlePeopleSearch = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: 25 };
      if (peopleKeywords.trim()) params.q_keywords = peopleKeywords.trim();
      if (peopleTitles.trim()) {
        params.person_titles = peopleTitles
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
      }
      if (peopleSeniorities.length > 0) params.person_seniorities = peopleSeniorities;
      if (peopleEmployeeRanges.length > 0) params.organization_num_employees_ranges = peopleEmployeeRanges;
      if (peopleLocations.trim()) {
        params.organization_locations = peopleLocations
          .split(',')
          .map((l: string) => l.trim())
          .filter(Boolean);
      }

      const response: any = await apiApollo.searchPeople(params);
      if (response.success && response.data) {
        setPeopleResults(response.data.people || []);
        setPeoplePagination(response.data.pagination || null);
        setSelectedPeopleIds(new Set());
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
          .map((k: string) => k.trim())
          .filter(Boolean);
      }
      if (orgEmployeeRanges.length > 0) params.organization_num_employees_ranges = orgEmployeeRanges;
      if (orgLocations.trim()) {
        params.organization_locations = orgLocations
          .split(',')
          .map((l: string) => l.trim())
          .filter(Boolean);
      }

      const response: any = await apiApollo.searchOrganizations(params);
      if (response.success && response.data) {
        setOrgResults(response.data.organizations || []);
        setOrgPagination(response.data.pagination || null);
        setSelectedOrgIds(new Set());
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

  // ----- Selection helpers -----
  const togglePersonSelect = (id: string) => {
    setSelectedPeopleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllPeople = () => {
    if (selectedPeopleIds.size === peopleResults.length) {
      setSelectedPeopleIds(new Set());
    } else {
      setSelectedPeopleIds(new Set(peopleResults.map((p) => p.id)));
    }
  };

  const toggleOrgSelect = (id: string) => {
    setSelectedOrgIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllOrgs = () => {
    if (selectedOrgIds.size === orgResults.length) {
      setSelectedOrgIds(new Set());
    } else {
      setSelectedOrgIds(new Set(orgResults.map((o) => o.id)));
    }
  };

  // ----- Import logic -----
  const getSelectedPeople = () => peopleResults.filter((p) => selectedPeopleIds.has(p.id));
  const getSelectedOrgs = () => orgResults.filter((o) => selectedOrgIds.has(o.id));

  const openImportModal = () => {
    const count = tab === 'People' ? selectedPeopleIds.size : selectedOrgIds.size;
    if (count === 0) {
      addToast({ title: 'No selection', description: 'Select at least one prospect to import.', variant: 'error' });
      return;
    }
    if (campaigns.length === 0) {
      addToast({ title: 'No campaigns', description: 'Create a campaign first before importing prospects.', variant: 'error' });
      return;
    }
    setShowImportModal(true);
  };

  const handleImport = async () => {
    if (!selectedCampaignId) {
      addToast({ title: 'Select a campaign', description: 'Choose a campaign to import contacts into.', variant: 'error' });
      return;
    }

    setImporting(true);
    try {
      let contacts: any[] = [];

      if (tab === 'People') {
        contacts = getSelectedPeople().map((person) => ({
          name: person.name || `${person.first_name || ''} ${person.last_name || ''}`.trim() || 'Unknown',
          company: person.organization?.name || '',
          email: person.email || '',
          phone: person.phone_number || person.sanitized_phone || '',
          city: person.city || '',
          state: person.state || '',
          url: person.linkedin_url || person.organization?.website_url || '',
          status: 'No Activity',
          raw: {
            source: 'apollo',
            apollo_id: person.id,
            title: person.title || '',
            seniority: person.seniority || '',
            headline: person.headline || '',
            organization_id: person.organization?.id || '',
            organization_name: person.organization?.name || '',
            organization_industry: person.organization?.industry || '',
            linkedin_url: person.linkedin_url || '',
            email_status: person.email_status || '',
            photo_url: person.photo_url || '',
          },
        }));
      } else {
        // Organizations – create one contact row per org (as a company-level lead)
        contacts = getSelectedOrgs().map((org) => ({
          name: org.name || 'Unknown Org',
          company: org.name || '',
          email: '',
          phone: org.primary_phone?.number || '',
          city: org.city || '',
          state: org.state || '',
          url: org.website_url || org.linkedin_url || '',
          status: 'No Activity',
          raw: {
            source: 'apollo',
            apollo_id: org.id,
            type: 'organization',
            industry: org.industry || '',
            estimated_employees: org.estimated_num_employees || 0,
            keywords: org.keywords || [],
            website_url: org.website_url || '',
            linkedin_url: org.linkedin_url || '',
            twitter_url: org.twitter_url || '',
            facebook_url: org.facebook_url || '',
          },
        }));
      }

      if (contacts.length === 0) {
        addToast({ title: 'Nothing to import', description: 'No contacts mapped.', variant: 'error' });
        return;
      }

      const result = await apiCampaigns.contactsBulk(selectedCampaignId, contacts);
      const importedCount = result?.count || contacts.length;
      const campaignName = campaigns.find((c) => c.id === selectedCampaignId)?.name || 'campaign';

      addToast({
        title: 'Import successful',
        description: `${importedCount} contact${importedCount !== 1 ? 's' : ''} imported to "${campaignName}"`,
        variant: 'success',
      });

      // Clear selection and close modal
      if (tab === 'People') setSelectedPeopleIds(new Set());
      else setSelectedOrgIds(new Set());
      setShowImportModal(false);
    } catch (err: any) {
      console.error('Import error:', err);
      addToast({
        title: 'Import failed',
        description: String(err?.message || 'Could not import contacts'),
        variant: 'error',
      });
    } finally {
      setImporting(false);
    }
  };

  const currentSelectionCount = tab === 'People' ? selectedPeopleIds.size : selectedOrgIds.size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Apollo Search</h1>
          <p className="text-sm text-gray-600">Search for prospects and import them into your campaigns</p>
        </div>
        {currentSelectionCount > 0 && (
          <button
            className="btn-primary btn-md"
            onClick={openImportModal}
          >
            Import {currentSelectionCount} Selected to Campaign
          </button>
        )}
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

      {/* ═══════ PEOPLE TAB ═══════ */}
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
                    setSelectedPeopleIds(new Set());
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
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPeopleIds.size === peopleResults.length && peopleResults.length > 0}
                      onChange={toggleAllPeople}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Select All</span>
                  </label>
                  <h2 className="text-lg font-semibold">
                    Results ({peoplePagination?.total_entries || 0} total)
                  </h2>
                  {selectedPeopleIds.size > 0 && (
                    <span className="text-sm text-blue-600 font-medium">
                      {selectedPeopleIds.size} selected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {selectedPeopleIds.size > 0 && (
                    <button
                      className="btn-primary btn-sm"
                      onClick={openImportModal}
                    >
                      Import {selectedPeopleIds.size} to Campaign
                    </button>
                  )}
                  {peoplePagination && (
                    <div className="text-sm text-gray-600">
                      Page {peoplePagination.page} of {peoplePagination.total_pages}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {peopleResults.map((person) => (
                  <div
                    key={person.id}
                    className={`border rounded-lg p-4 hover:shadow-soft-xl transition cursor-pointer ${
                      selectedPeopleIds.has(person.id) ? 'border-blue-400 bg-blue-50/50' : ''
                    }`}
                    onClick={() => togglePersonSelect(person.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPeopleIds.has(person.id)}
                        onChange={() => togglePersonSelect(person.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
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
                          <div className="flex items-center gap-2 ml-2">
                            {person.linkedin_url && (
                              <a
                                href={person.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline btn-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
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

      {/* ═══════ ORGANIZATIONS TAB ═══════ */}
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
                    setSelectedOrgIds(new Set());
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
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOrgIds.size === orgResults.length && orgResults.length > 0}
                      onChange={toggleAllOrgs}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Select All</span>
                  </label>
                  <h2 className="text-lg font-semibold">
                    Results ({orgPagination?.total_entries || 0} total)
                  </h2>
                  {selectedOrgIds.size > 0 && (
                    <span className="text-sm text-blue-600 font-medium">
                      {selectedOrgIds.size} selected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {selectedOrgIds.size > 0 && (
                    <button
                      className="btn-primary btn-sm"
                      onClick={openImportModal}
                    >
                      Import {selectedOrgIds.size} to Campaign
                    </button>
                  )}
                  {orgPagination && (
                    <div className="text-sm text-gray-600">
                      Page {orgPagination.page} of {orgPagination.total_pages}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {orgResults.map((org) => (
                  <div
                    key={org.id}
                    className={`border rounded-lg p-4 hover:shadow-soft-xl transition cursor-pointer ${
                      selectedOrgIds.has(org.id) ? 'border-blue-400 bg-blue-50/50' : ''
                    }`}
                    onClick={() => toggleOrgSelect(org.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOrgIds.has(org.id)}
                        onChange={() => toggleOrgSelect(org.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
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
                          <div className="flex items-center gap-2 ml-2">
                            {org.website_url && (
                              <a
                                href={org.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline btn-xs"
                                onClick={(e) => e.stopPropagation()}
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
                                onClick={(e) => e.stopPropagation()}
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
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

      {/* ═══════ IMPORT MODAL ═══════ */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !importing && setShowImportModal(false)}>
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold">Import Prospects to Campaign</h3>
              <p className="text-sm text-gray-600 mt-1">
                {tab === 'People'
                  ? `${selectedPeopleIds.size} people selected for import`
                  : `${selectedOrgIds.size} organizations selected for import`}
              </p>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="label mb-2 block">Select Campaign</label>
                <select
                  className="input w-full"
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.status ? `(${c.status})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview of selected contacts */}
              <div>
                <label className="label mb-2 block">Preview</label>
                <div className="max-h-48 overflow-y-auto border rounded-lg divide-y">
                  {tab === 'People' &&
                    getSelectedPeople().map((p) => (
                      <div key={p.id} className="px-3 py-2 text-sm flex items-center justify-between">
                        <div>
                          <span className="font-medium">{p.name}</span>
                          {p.title && <span className="text-gray-500 ml-2">{p.title}</span>}
                        </div>
                        <span className="text-xs text-gray-400">{p.email || 'No email'}</span>
                      </div>
                    ))}
                  {tab === 'Organizations' &&
                    getSelectedOrgs().map((o) => (
                      <div key={o.id} className="px-3 py-2 text-sm flex items-center justify-between">
                        <div>
                          <span className="font-medium">{o.name}</span>
                          {o.industry && <span className="text-gray-500 ml-2">{o.industry}</span>}
                        </div>
                        <span className="text-xs text-gray-400">
                          {o.estimated_num_employees ? `${o.estimated_num_employees.toLocaleString()} employees` : ''}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
              <button
                className="btn-outline btn-md"
                onClick={() => setShowImportModal(false)}
                disabled={importing}
              >
                Cancel
              </button>
              <button
                className="btn-primary btn-md"
                onClick={handleImport}
                disabled={importing || !selectedCampaignId}
              >
                {importing ? 'Importing...' : `Import ${currentSelectionCount} Contact${currentSelectionCount !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
