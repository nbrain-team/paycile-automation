// Paycile Marketing Automation - Campaign & Template Seed Data
// Based on nBrain proposal for B2B lead generation across 8 personas

export type Node = {
  id: string;
  type: string;
  name: string;
};

export type Edge = {
  from: string;
  to: string;
  condition?: Record<string, unknown>;
};

export type CampaignGraph = {
  schema_version: number;
  nodes: Node[];
  edges: Edge[];
  start_rules: Record<string, unknown>;
};

// ==========================================
// PERSONA 1: CFO / Financial Executive
// Multi-Channel Outreach Template
// ==========================================
export const cfoMultiChannelGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'CFO Target List (Insurance/PropMgmt)' },
    { id: 'N10', type: 'stage', name: 'Initial Outreach - Day 1' },
    { id: 'N11', type: 'email_send', name: 'Email: Save 96 Days on Period-End Close' },
    { id: 'N12', type: 'wait', name: 'Wait 2 Hours' },
    { id: 'N13', type: 'linkedin_connect', name: 'LinkedIn: Connection Request' },
    
    { id: 'N20', type: 'decision', name: 'Email Response Check' },
    { id: 'N21', type: 'task', name: 'Positive Response → Schedule Demo' },
    { id: 'N22', type: 'stage', name: 'Follow-Up Sequence - Day 3' },
    
    { id: 'N23', type: 'sms_send', name: 'SMS: Real-Time Cash Visibility' },
    { id: 'N24', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N25', type: 'voicemail_drop', name: 'VM: Strategic Financial Oversight' },
    
    { id: 'N30', type: 'decision', name: 'LinkedIn Accepted?' },
    { id: 'N31', type: 'linkedin_message', name: 'LinkedIn: Share Case Study' },
    { id: 'N32', type: 'wait', name: 'Wait 3 Days' },
    
    { id: 'N40', type: 'stage', name: 'Final Touch - Day 7' },
    { id: 'N41', type: 'email_send', name: 'Email: ROI Calculator + Demo Link' },
    { id: 'N42', type: 'wait', name: 'Wait 2 Days' },
    { id: 'N43', type: 'decision', name: 'Engagement Check' },
    
    { id: 'N50', type: 'task', name: 'High Engagement → BDR Handoff' },
    { id: 'N51', type: 'stage', name: 'Nurture Sequence' },
    { id: 'N52', type: 'wait', name: 'Wait 14 Days' },
    { id: 'N53', type: 'email_send', name: 'Email: Industry Benchmark Report' },
    
    { id: 'N60', type: 'goal', name: 'Demo Booked' },
    { id: 'N99', type: 'exit', name: 'End Campaign' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    { from: 'N13', to: 'N20', condition: { after: 'P2D' } },
    
    { from: 'N20', to: 'N21', condition: { label: 'Positive Response' } },
    { from: 'N20', to: 'N22', condition: { label: 'No Response' } },
    { from: 'N20', to: 'N99', condition: { label: 'Unsubscribe' } },
    
    { from: 'N22', to: 'N23' },
    { from: 'N23', to: 'N24' },
    { from: 'N24', to: 'N25' },
    { from: 'N25', to: 'N30', condition: { after: 'P1D' } },
    
    { from: 'N30', to: 'N31', condition: { label: 'Connection Accepted' } },
    { from: 'N30', to: 'N32', condition: { label: 'No Accept' } },
    { from: 'N31', to: 'N32' },
    { from: 'N32', to: 'N40' },
    
    { from: 'N40', to: 'N41' },
    { from: 'N41', to: 'N42' },
    { from: 'N42', to: 'N43' },
    
    { from: 'N43', to: 'N50', condition: { label: 'High Engagement' } },
    { from: 'N43', to: 'N51', condition: { label: 'Low Engagement' } },
    
    { from: 'N51', to: 'N52' },
    { from: 'N52', to: 'N53' },
    { from: 'N53', to: 'N99', condition: { after: 'P7D' } },
    
    { from: 'N21', to: 'N60' },
    { from: 'N50', to: 'N60' }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'cfo_insurance_propmgmt' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '18:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1, linkedin_per_day: 3 }
  }
};

// ==========================================
// PERSONA 2: Finance Manager / Controller
// ==========================================
export const controllerMultiChannelGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'Controller Target List' },
    { id: 'N10', type: 'stage', name: 'Initial Contact - Day 1' },
    { id: 'N11', type: 'email_send', name: 'Email: 90% Workload Reduction' },
    { id: 'N12', type: 'wait', name: 'Wait 3 Hours' },
    { id: 'N13', type: 'linkedin_connect', name: 'LinkedIn: Connect + Personalized Note' },
    
    { id: 'N20', type: 'stage', name: 'Day 2 - Multi-Entity Focus' },
    { id: 'N21', type: 'decision', name: 'Email Opened?' },
    { id: 'N22', type: 'email_send', name: 'Email: Multi-Entity Reconciliation Case Study' },
    { id: 'N23', type: 'sms_send', name: 'SMS: Audit Trail + Compliance' },
    
    { id: 'N30', type: 'stage', name: 'Day 4 - Voice + Video' },
    { id: 'N31', type: 'voicemail_drop', name: 'VM: Period-End Closing Solution' },
    { id: 'N32', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N33', type: 'linkedin_message', name: 'LinkedIn: Demo Video Link' },
    
    { id: 'N40', type: 'decision', name: 'Engagement Check' },
    { id: 'N41', type: 'task', name: 'Engaged → BDR Outreach' },
    { id: 'N42', type: 'email_send', name: 'Email: Free Reconciliation Assessment' },
    
    { id: 'N50', type: 'goal', name: 'Demo Scheduled' },
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    { from: 'N13', to: 'N20', condition: { after: 'P1D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22', condition: { label: 'Email Opened' } },
    { from: 'N21', to: 'N23', condition: { label: 'Not Opened' } },
    { from: 'N22', to: 'N23', condition: { after: 'PT4H' } },
    { from: 'N23', to: 'N30', condition: { after: 'P2D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32' },
    { from: 'N32', to: 'N33' },
    { from: 'N33', to: 'N40', condition: { after: 'P2D' } },
    
    { from: 'N40', to: 'N41', condition: { label: 'High Engagement' } },
    { from: 'N40', to: 'N42', condition: { label: 'Medium Engagement' } },
    { from: 'N40', to: 'N99', condition: { label: 'No Engagement' } },
    
    { from: 'N41', to: 'N50' },
    { from: 'N42', to: 'N50', condition: { after: 'P3D' } }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'controllers_multi_entity' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '19:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1 }
  }
};

// ==========================================
// PERSONA 3: AR/AP Specialist
// Unapplied Funds Focus Campaign
// ==========================================
export const arApSpecialistGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'AR/AP Specialist List' },
    { id: 'N10', type: 'stage', name: 'Problem Awareness - Day 1' },
    { id: 'N11', type: 'email_send', name: 'Email: Find Your $250K in Unapplied Funds' },
    { id: 'N12', type: 'wait', name: 'Wait 4 Hours' },
    { id: 'N13', type: 'sms_send', name: 'SMS: 90% Payment Posting Automation' },
    
    { id: 'N20', type: 'stage', name: 'Solution Education - Day 3' },
    { id: 'N21', type: 'email_send', name: 'Email: Reduce Write-Offs by 62%' },
    { id: 'N22', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N23', type: 'voicemail_drop', name: 'VM: Collections + Unapplied Funds' },
    
    { id: 'N30', type: 'decision', name: 'Response Check' },
    { id: 'N31', type: 'linkedin_connect', name: 'LinkedIn: Connect' },
    { id: 'N32', type: 'wait', name: 'Wait 2 Days' },
    { id: 'N33', type: 'linkedin_message', name: 'LinkedIn: AR/AP Best Practices Guide' },
    
    { id: 'N40', type: 'stage', name: 'Final Push - Day 7' },
    { id: 'N41', type: 'email_send', name: 'Email: Free Unapplied Funds Analysis' },
    { id: 'N42', type: 'decision', name: 'Click-Through?' },
    
    { id: 'N50', type: 'task', name: 'Schedule Assessment Call' },
    { id: 'N51', type: 'goal', name: 'Assessment Booked' },
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    { from: 'N13', to: 'N20', condition: { after: 'P2D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N23' },
    { from: 'N23', to: 'N30', condition: { after: 'P1D' } },
    
    { from: 'N30', to: 'N50', condition: { label: 'Positive Response' } },
    { from: 'N30', to: 'N31', condition: { label: 'No Response' } },
    { from: 'N31', to: 'N32' },
    { from: 'N32', to: 'N33' },
    { from: 'N33', to: 'N40', condition: { after: 'P2D' } },
    
    { from: 'N40', to: 'N41' },
    { from: 'N41', to: 'N42', condition: { after: 'P1D' } },
    { from: 'N42', to: 'N50', condition: { label: 'Clicked' } },
    { from: 'N42', to: 'N99', condition: { label: 'No Click' } },
    
    { from: 'N50', to: 'N51' }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'ar_ap_specialists' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '18:00', end: '07:30', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1 }
  }
};

// ==========================================
// PERSONA 4: Treasury / Cash Manager
// Liquidity & Multi-Bank Focus
// ==========================================
export const treasuryCashManagerGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'Treasury Manager List' },
    { id: 'N10', type: 'stage', name: 'Cash Visibility Hook - Day 1' },
    { id: 'N11', type: 'email_send', name: 'Email: 50% Faster Cash Visibility' },
    { id: 'N12', type: 'linkedin_connect', name: 'LinkedIn: Connect with Treasury Peers' },
    
    { id: 'N20', type: 'stage', name: 'Multi-Bank Solution - Day 2' },
    { id: 'N21', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N22', type: 'email_send', name: 'Email: Multi-Bank Reconciliation Automation' },
    { id: 'N23', type: 'sms_send', name: 'SMS: Liquidity Forecasting + Fraud Detection' },
    
    { id: 'N30', type: 'stage', name: 'Proof Points - Day 5' },
    { id: 'N31', type: 'voicemail_drop', name: 'VM: Real-Time Cash Position' },
    { id: 'N32', type: 'wait', name: 'Wait 2 Days' },
    { id: 'N33', type: 'linkedin_message', name: 'LinkedIn: Treasury Case Study (Healthcare)' },
    
    { id: 'N40', type: 'decision', name: 'Engagement Level' },
    { id: 'N41', type: 'task', name: 'Hot Lead → Executive Demo' },
    { id: 'N42', type: 'email_send', name: 'Email: Cash Flow Dashboard Preview' },
    
    { id: 'N50', type: 'goal', name: 'Demo Scheduled' },
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12', condition: { after: 'PT2H' } },
    { from: 'N12', to: 'N20', condition: { after: 'P1D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N23', condition: { after: 'PT6H' } },
    { from: 'N23', to: 'N30', condition: { after: 'P3D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32' },
    { from: 'N32', to: 'N33' },
    { from: 'N33', to: 'N40', condition: { after: 'P1D' } },
    
    { from: 'N40', to: 'N41', condition: { label: 'High Interest' } },
    { from: 'N40', to: 'N42', condition: { label: 'Moderate Interest' } },
    { from: 'N40', to: 'N99', condition: { label: 'Low Interest' } },
    
    { from: 'N41', to: 'N50' },
    { from: 'N42', to: 'N50', condition: { after: 'P2D' } }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'treasury_cash_managers' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '18:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1 }
  }
};

// ==========================================
// PERSONA 5: Accountant / GL Specialist
// Daily Operations Focus
// ==========================================
export const accountantGLGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'GL Specialist List' },
    { id: 'N10', type: 'stage', name: 'Pain Point - Day 1' },
    { id: 'N11', type: 'email_send', name: 'Email: Escape the Spreadsheet Hell' },
    { id: 'N12', type: 'wait', name: 'Wait 3 Hours' },
    { id: 'N13', type: 'sms_send', name: 'SMS: 95% Auto-Matching Accuracy' },
    
    { id: 'N20', type: 'stage', name: 'Solution Demo - Day 3' },
    { id: 'N21', type: 'email_send', name: 'Email: ERP Integration + Sub-Ledger Balancing' },
    { id: 'N22', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N23', type: 'linkedin_connect', name: 'LinkedIn: Connect' },
    
    { id: 'N30', type: 'stage', name: 'Video + Voice - Day 5' },
    { id: 'N31', type: 'voicemail_drop', name: 'VM: <2% Error Rate Guarantee' },
    { id: 'N32', type: 'linkedin_message', name: 'LinkedIn: Video - How GL Teams Save 80 Hrs/Month' },
    
    { id: 'N40', type: 'decision', name: 'Video Watched?' },
    { id: 'N41', type: 'task', name: 'High Engagement → Schedule Demo' },
    { id: 'N42', type: 'email_send', name: 'Email: Free Accuracy Assessment' },
    
    { id: 'N50', type: 'goal', name: 'Demo Booked' },
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    { from: 'N13', to: 'N20', condition: { after: 'P2D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N23' },
    { from: 'N23', to: 'N30', condition: { after: 'P2D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32', condition: { after: 'PT4H' } },
    { from: 'N32', to: 'N40', condition: { after: 'P1D' } },
    
    { from: 'N40', to: 'N41', condition: { label: 'Video Watched' } },
    { from: 'N40', to: 'N42', condition: { label: 'Not Watched' } },
    { from: 'N40', to: 'N99', condition: { label: 'No Engagement' } },
    
    { from: 'N41', to: 'N50' },
    { from: 'N42', to: 'N50', condition: { after: 'P3D' } }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'accountants_gl_specialists' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '19:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1 }
  }
};

// ==========================================
// INDUSTRY-SPECIFIC CAMPAIGN: Insurance
// Targeting CFOs + Controllers in Insurance
// ==========================================
export const insuranceVerticalGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'Insurance Companies ($50M-$500M)' },
    { id: 'N10', type: 'stage', name: 'Day 1 - Industry-Specific Outreach' },
    { id: 'N11', type: 'email_send', name: 'Email: Insurance CFO - Applied Systems Integration' },
    { id: 'N12', type: 'linkedin_connect', name: 'LinkedIn: Insurance Finance Leaders' },
    
    { id: 'N20', type: 'stage', name: 'Day 2 - Pain Point Focus' },
    { id: 'N21', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N22', type: 'email_send', name: 'Email: Premium Reconciliation Challenges' },
    { id: 'N23', type: 'sms_send', name: 'SMS: Claims + Payment Matching' },
    
    { id: 'N30', type: 'stage', name: 'Day 4 - Social Proof' },
    { id: 'N31', type: 'voicemail_drop', name: 'VM: Insurance Case Study Results' },
    { id: 'N32', type: 'linkedin_message', name: 'LinkedIn: Connect with Insurance Peers' },
    
    { id: 'N40', type: 'stage', name: 'Day 7 - Call to Action' },
    { id: 'N41', type: 'email_send', name: 'Email: Free Insurance Reconciliation Assessment' },
    { id: 'N42', type: 'wait', name: 'Wait 2 Days' },
    { id: 'N43', type: 'decision', name: 'Engagement Check' },
    
    { id: 'N50', type: 'task', name: 'High Engagement → BDR Call' },
    { id: 'N51', type: 'sms_send', name: 'SMS: Last Chance - Demo Link' },
    
    { id: 'N60', type: 'goal', name: 'Demo Scheduled' },
    { id: 'N70', type: 'stage', name: 'Nurture - 30 Days' },
    { id: 'N71', type: 'wait', name: 'Wait 30 Days' },
    { id: 'N72', type: 'email_send', name: 'Email: Industry Benchmark Report' },
    
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12', condition: { after: 'PT2H' } },
    { from: 'N12', to: 'N20', condition: { after: 'P1D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N23', condition: { after: 'PT4H' } },
    { from: 'N23', to: 'N30', condition: { after: 'P2D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32', condition: { after: 'PT3H' } },
    { from: 'N32', to: 'N40', condition: { after: 'P3D' } },
    
    { from: 'N40', to: 'N41' },
    { from: 'N41', to: 'N42' },
    { from: 'N42', to: 'N43' },
    
    { from: 'N43', to: 'N50', condition: { label: 'High Engagement' } },
    { from: 'N43', to: 'N51', condition: { label: 'Medium Engagement' } },
    { from: 'N43', to: 'N70', condition: { label: 'Low Engagement' } },
    
    { from: 'N50', to: 'N60' },
    { from: 'N51', to: 'N60', condition: { after: 'P2D' } },
    { from: 'N51', to: 'N70', condition: { after: 'P2D' } },
    
    { from: 'N70', to: 'N71' },
    { from: 'N71', to: 'N72' },
    { from: 'N72', to: 'N99', condition: { after: 'P7D' } }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'insurance_50m_500m' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '18:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1, linkedin_per_day: 2 }
  }
};

// ==========================================
// INDUSTRY-SPECIFIC CAMPAIGN: Property Management
// Yardi Integration Focus
// ==========================================
export const propertyManagementGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'Property Management Companies (Yardi Users)' },
    { id: 'N10', type: 'stage', name: 'Day 1 - Yardi Native Integration Hook' },
    { id: 'N11', type: 'email_send', name: 'Email: Native Yardi Integration' },
    { id: 'N12', type: 'wait', name: 'Wait 2 Hours' },
    { id: 'N13', type: 'linkedin_connect', name: 'LinkedIn: PropMgmt Finance Network' },
    
    { id: 'N20', type: 'stage', name: 'Day 3 - Multi-Property Challenge' },
    { id: 'N21', type: 'sms_send', name: 'SMS: Multi-Property Reconciliation' },
    { id: 'N22', type: 'wait', name: 'Wait 1 Day' },
    { id: 'N23', type: 'email_send', name: 'Email: Tenant Payment Matching' },
    
    { id: 'N30', type: 'stage', name: 'Day 5 - Proof + Social' },
    { id: 'N31', type: 'voicemail_drop', name: 'VM: PropMgmt Case Study' },
    { id: 'N32', type: 'linkedin_message', name: 'LinkedIn: Yardi User Success Story' },
    
    { id: 'N40', type: 'decision', name: 'Interest Level' },
    { id: 'N41', type: 'email_send', name: 'Email: Free Yardi Integration Demo' },
    { id: 'N42', type: 'task', name: 'Hot Lead → Schedule Integration Demo' },
    
    { id: 'N50', type: 'goal', name: 'Demo Booked' },
    { id: 'N99', type: 'exit', name: 'End' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    { from: 'N13', to: 'N20', condition: { after: 'P2D' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N23' },
    { from: 'N23', to: 'N30', condition: { after: 'P2D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32', condition: { after: 'PT4H' } },
    { from: 'N32', to: 'N40', condition: { after: 'P1D' } },
    
    { from: 'N40', to: 'N42', condition: { label: 'High Interest' } },
    { from: 'N40', to: 'N41', condition: { label: 'Moderate Interest' } },
    { from: 'N40', to: 'N99', condition: { label: 'No Interest' } },
    
    { from: 'N41', to: 'N50', condition: { after: 'P3D' } },
    { from: 'N42', to: 'N50' }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'propmgmt_yardi_users' }],
    reentry_policy: 'single_entry',
    quiet_hours: { start: '19:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 2, sms_per_day: 1, voicemail_per_day: 1 }
  }
};

// ==========================================
// RE-ENGAGEMENT CAMPAIGN
// For Prospects Who Went Cold
// ==========================================
export const reEngagementGraph: CampaignGraph = {
  schema_version: 1,
  nodes: [
    { id: 'N00', type: 'start', name: 'Cold Prospects (90+ Days)' },
    { id: 'N10', type: 'stage', name: 'Re-Introduction' },
    { id: 'N11', type: 'email_send', name: 'Email: What\'s Changed Since We Last Spoke' },
    { id: 'N12', type: 'wait', name: 'Wait 3 Days' },
    { id: 'N13', type: 'decision', name: 'Email Opened?' },
    
    { id: 'N20', type: 'linkedin_message', name: 'LinkedIn: New Features Update' },
    { id: 'N21', type: 'wait', name: 'Wait 5 Days' },
    { id: 'N22', type: 'email_send', name: 'Email: Industry Report + New ROI Data' },
    
    { id: 'N30', type: 'stage', name: 'Last Attempt' },
    { id: 'N31', type: 'wait', name: 'Wait 7 Days' },
    { id: 'N32', type: 'email_send', name: 'Email: Break-Up Email (Permission to Close)' },
    { id: 'N33', type: 'decision', name: 'Response?' },
    
    { id: 'N40', type: 'task', name: 'Re-Engaged → BDR Handoff' },
    { id: 'N41', type: 'goal', name: 'Re-Engagement Success' },
    
    { id: 'N99', type: 'exit', name: 'Mark as Unresponsive' }
  ],
  edges: [
    { from: 'N00', to: 'N10' },
    { from: 'N10', to: 'N11' },
    { from: 'N11', to: 'N12' },
    { from: 'N12', to: 'N13' },
    
    { from: 'N13', to: 'N20', condition: { label: 'Opened' } },
    { from: 'N13', to: 'N22', condition: { label: 'Not Opened' } },
    
    { from: 'N20', to: 'N21' },
    { from: 'N21', to: 'N22' },
    { from: 'N22', to: 'N30', condition: { after: 'P7D' } },
    
    { from: 'N30', to: 'N31' },
    { from: 'N31', to: 'N32' },
    { from: 'N32', to: 'N33', condition: { after: 'P5D' } },
    
    { from: 'N33', to: 'N40', condition: { label: 'Positive Response' } },
    { from: 'N33', to: 'N99', condition: { label: 'No Response' } },
    
    { from: 'N40', to: 'N41' }
  ],
  start_rules: {
    enroll: [{ type: 'segment', segment_id: 'cold_prospects_90_days' }],
    reentry_policy: 'allow_reentry_after_90_days',
    quiet_hours: { start: '18:00', end: '08:00', contact_timezone: true },
    caps: { email_per_day: 1, linkedin_per_day: 1 }
  }
};

// ==========================================
// SEED CAMPAIGN DEFINITIONS
// ==========================================
export type SeedCampaign = {
  id: string;
  name: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  graph: CampaignGraph;
  description?: string;
  targetPersona?: string;
  targetIndustry?: string;
};

export const paycileSeedCampaigns: SeedCampaign[] = [
  {
    id: 'cmp_paycile_cfo_insurance',
    name: 'CFO Outreach - Insurance Vertical',
    status: 'draft',
    version: 1,
    graph: insuranceVerticalGraph,
    description: 'Multi-channel campaign targeting CFOs in insurance companies ($50M-$500M revenue) with Applied Systems integration messaging',
    targetPersona: 'CFO / Financial Executive',
    targetIndustry: 'Insurance'
  },
  {
    id: 'cmp_paycile_cfo_multi',
    name: 'CFO Multi-Channel Template',
    status: 'draft',
    version: 1,
    graph: cfoMultiChannelGraph,
    description: 'Comprehensive 7-day multi-channel outreach for CFOs focusing on strategic oversight and real-time visibility',
    targetPersona: 'CFO / Financial Executive',
    targetIndustry: 'Multi-Industry'
  },
  {
    id: 'cmp_paycile_controller',
    name: 'Finance Manager / Controller Campaign',
    status: 'draft',
    version: 1,
    graph: controllerMultiChannelGraph,
    description: 'Period-end closing and multi-entity reconciliation focus for Controllers',
    targetPersona: 'Finance Manager / Controller',
    targetIndustry: 'Multi-Industry'
  },
  {
    id: 'cmp_paycile_arap',
    name: 'AR/AP Specialist - Unapplied Funds',
    status: 'draft',
    version: 1,
    graph: arApSpecialistGraph,
    description: 'Campaign highlighting unapplied funds recovery and payment posting automation',
    targetPersona: 'AR/AP Specialist',
    targetIndustry: 'Multi-Industry'
  },
  {
    id: 'cmp_paycile_treasury',
    name: 'Treasury / Cash Manager Outreach',
    status: 'draft',
    version: 1,
    graph: treasuryCashManagerGraph,
    description: 'Multi-bank reconciliation and liquidity forecasting for Treasury professionals',
    targetPersona: 'Treasury / Cash Manager',
    targetIndustry: 'Multi-Industry'
  },
  {
    id: 'cmp_paycile_accountant',
    name: 'Accountant / GL Specialist Campaign',
    status: 'draft',
    version: 1,
    graph: accountantGLGraph,
    description: 'Daily operations focus with ERP integration and accuracy guarantees',
    targetPersona: 'Accountant / GL Specialist',
    targetIndustry: 'Multi-Industry'
  },
  {
    id: 'cmp_paycile_propmgmt_yardi',
    name: 'Property Management - Yardi Integration',
    status: 'draft',
    version: 1,
    graph: propertyManagementGraph,
    description: 'Native Yardi integration campaign for property management companies',
    targetPersona: 'Finance Manager / Controller',
    targetIndustry: 'Property Management'
  },
  {
    id: 'cmp_paycile_reengagement',
    name: 'Re-Engagement Campaign (Cold Prospects)',
    status: 'draft',
    version: 1,
    graph: reEngagementGraph,
    description: 'Win-back campaign for prospects who went cold after 90+ days',
    targetPersona: 'All Personas',
    targetIndustry: 'All Industries'
  }
];

export const seedCampaigns = paycileSeedCampaigns;

