// Advanced Paycile Funnel Templates - Complex, Action-Driven B2B Automation
// Run: node scripts/seed_advanced_funnels.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ADVANCED FUNNEL: CFO Multi-Channel with Sophisticated Branching
const advancedCFOFunnel = {
  id: 'tpl_cfo_advanced',
  name: 'CFO Multi-Channel - Advanced (Insurance)',
  status: 'published',
  version: 1,
  nodes: [
    // Day 1 - Initial Outreach
    { key: 'N00', type: 'start', name: 'CFO Target List', posX: 50, posY: 100 },
    { key: 'N01', type: 'stage', name: 'Day 1: Initial Contact', posX: 250, posY: 100 },
    { key: 'N02', type: 'email_send', name: 'Email: Save 96 Days on Close', posX: 450, posY: 100 },
    { key: 'N03', type: 'wait', name: 'Wait 2 Hours', posX: 650, posY: 100 },
    { key: 'N04', type: 'linkedin_connect', name: 'LinkedIn: Connection Request', posX: 850, posY: 100 },
    
    // Day 1 - Activity Check
    { key: 'N05', type: 'wait', name: 'Wait 6 Hours', posX: 1050, posY: 100 },
    { key: 'N06', type: 'decision', name: 'Check Email Activity', posX: 1250, posY: 100 },
    
    // High Engagement Path (Email Opened)
    { key: 'N10', type: 'stage', name: 'High Engagement Flow', posX: 1250, posY: 250 },
    { key: 'N11', type: 'sms_send', name: 'SMS: Quick Q - Close Time?', posX: 1450, posY: 250 },
    { key: 'N12', type: 'wait', name: 'Wait 30 Minutes', posX: 1650, posY: 250 },
    { key: 'N13', type: 'decision', name: 'SMS Response Check', posX: 1850, posY: 250 },
    { key: 'N14', type: 'task', name: 'Hot Lead → BDR Immediate Call', posX: 2050, posY: 200 },
    
    // Medium Engagement Path (Email Not Opened)
    { key: 'N20', type: 'stage', name: 'Day 2: Follow-Up Sequence', posX: 1050, posY: 400 },
    { key: 'N21', type: 'wait', name: 'Wait 18 Hours', posX: 1250, posY: 400 },
    { key: 'N22', type: 'voicemail_drop', name: 'VM: Strategic Financial Oversight', posX: 1450, posY: 400 },
    { key: 'N23', type: 'wait', name: 'Wait 4 Hours', posX: 1650, posY: 400 },
    { key: 'N24', type: 'decision', name: 'LinkedIn Accepted?', posX: 1850, posY: 400 },
    { key: 'N25', type: 'linkedin_message', name: 'LinkedIn: Share CFO Case Study', posX: 2050, posY: 350 },
    
    // Day 3 - Continued Engagement Check
    { key: 'N30', type: 'stage', name: 'Day 3: Engagement Analysis', posX: 650, posY: 550 },
    { key: 'N31', type: 'wait', name: 'Wait 24 Hours', posX: 850, posY: 550 },
    { key: 'N32', type: 'decision', name: 'Any Engagement?', posX: 1050, posY: 550 },
    { key: 'N33', type: 'email_send', name: 'Email: ROI Calculator + Savings', posX: 1250, posY: 550 },
    { key: 'N34', type: 'wait', name: 'Wait 2 Days', posX: 1450, posY: 550 },
    { key: 'N35', type: 'decision', name: 'Link Clicked?', posX: 1650, posY: 550 },
    
    // Link Clicked - Hot Lead
    { key: 'N40', type: 'task', name: 'Link Clicked → Priority BDR', posX: 1650, posY: 700 },
    { key: 'N41', type: 'email_send', name: 'Email: Custom ROI Analysis Ready', posX: 1850, posY: 700 },
    
    // No Click - Continue Nurture
    { key: 'N50', type: 'stage', name: 'Day 7: Final Push', posX: 1450, posY: 850 },
    { key: 'N51', type: 'sms_send', name: 'SMS: Real-Time Cash Dashboard Demo', posX: 1650, posY: 850 },
    { key: 'N52', type: 'wait', name: 'Wait 2 Days', posX: 1850, posY: 850 },
    { key: 'N53', type: 'decision', name: 'Final Engagement Check', posX: 2050, posY: 850 },
    
    // Engaged - Schedule Demo
    { key: 'N60', type: 'email_send', name: 'Email: Book Your Demo', posX: 2250, posY: 800 },
    { key: 'N61', type: 'goal', name: 'Demo Booked - Success!', posX: 2450, posY: 800 },
    
    // Not Engaged - Long Nurture
    { key: 'N70', type: 'stage', name: 'Long-Term Nurture', posX: 2050, posY: 1000 },
    { key: 'N71', type: 'wait', name: 'Wait 30 Days', posX: 2250, posY: 1000 },
    { key: 'N72', type: 'email_send', name: 'Email: Industry Benchmark Report', posX: 2450, posY: 1000 },
    { key: 'N73', type: 'wait', name: 'Wait 30 Days', posX: 2650, posY: 1000 },
    { key: 'N74', type: 'email_send', name: 'Email: Re-Engagement Attempt', posX: 2850, posY: 1000 },
    
    // Positive Response Anytime - Fast Track
    { key: 'N80', type: 'task', name: 'Positive Response → Priority Queue', posX: 2250, posY: 200 },
    { key: 'N81', type: 'email_send', name: 'Email: Demo Scheduling Options', posX: 2450, posY: 200 },
    { key: 'N82', type: 'goal', name: 'Demo Booked', posX: 2650, posY: 200 },
    
    // Exit Paths
    { key: 'N90', type: 'decision', name: 'Unsubscribe Check', posX: 850, posY: 700 },
    { key: 'N99', type: 'exit', name: 'Campaign End', posX: 3050, posY: 600 }
  ],
  edges: [
    // Initial Flow
    { fromKey: 'N00', toKey: 'N01' },
    { fromKey: 'N01', toKey: 'N02' },
    { fromKey: 'N02', toKey: 'N03' },
    { fromKey: 'N03', toKey: 'N04' },
    { fromKey: 'N04', toKey: 'N05' },
    { fromKey: 'N05', toKey: 'N06' },
    
    // Email Activity Branching
    { fromKey: 'N06', toKey: 'N10', conditionJson: JSON.stringify({ label: 'Email Opened' }) },
    { fromKey: 'N06', toKey: 'N20', conditionJson: JSON.stringify({ label: 'Not Opened' }) },
    { fromKey: 'N06', toKey: 'N90', conditionJson: JSON.stringify({ label: 'Check Unsubscribe' }) },
    
    // High Engagement Path
    { fromKey: 'N10', toKey: 'N11' },
    { fromKey: 'N11', toKey: 'N12' },
    { fromKey: 'N12', toKey: 'N13' },
    { fromKey: 'N13', toKey: 'N14', conditionJson: JSON.stringify({ label: 'Positive SMS Response' }) },
    { fromKey: 'N13', toKey: 'N30', conditionJson: JSON.stringify({ label: 'No SMS Response' }) },
    { fromKey: 'N14', toKey: 'N80' },
    
    // Medium Engagement Path
    { fromKey: 'N20', toKey: 'N21' },
    { fromKey: 'N21', toKey: 'N22' },
    { fromKey: 'N22', toKey: 'N23' },
    { fromKey: 'N23', toKey: 'N24' },
    { fromKey: 'N24', toKey: 'N25', conditionJson: JSON.stringify({ label: 'LinkedIn Accepted' }) },
    { fromKey: 'N24', toKey: 'N30', conditionJson: JSON.stringify({ label: 'Not Accepted' }) },
    { fromKey: 'N25', toKey: 'N32' },
    
    // Day 3 Engagement Analysis
    { fromKey: 'N30', toKey: 'N31' },
    { fromKey: 'N31', toKey: 'N32' },
    { fromKey: 'N32', toKey: 'N33', conditionJson: JSON.stringify({ label: 'Some Engagement' }) },
    { fromKey: 'N32', toKey: 'N50', conditionJson: JSON.stringify({ label: 'No Engagement' }) },
    { fromKey: 'N33', toKey: 'N34' },
    { fromKey: 'N34', toKey: 'N35' },
    
    // ROI Link Activity
    { fromKey: 'N35', toKey: 'N40', conditionJson: JSON.stringify({ label: 'Link Clicked' }) },
    { fromKey: 'N35', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Not Clicked' }) },
    { fromKey: 'N40', toKey: 'N41' },
    { fromKey: 'N41', toKey: 'N82' },
    
    // Final Push
    { fromKey: 'N50', toKey: 'N51' },
    { fromKey: 'N51', toKey: 'N52' },
    { fromKey: 'N52', toKey: 'N53' },
    { fromKey: 'N53', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Engaged' }) },
    { fromKey: 'N53', toKey: 'N70', conditionJson: JSON.stringify({ label: 'Not Engaged' }) },
    { fromKey: 'N60', toKey: 'N61' },
    
    // Long Nurture
    { fromKey: 'N70', toKey: 'N71' },
    { fromKey: 'N71', toKey: 'N72' },
    { fromKey: 'N72', toKey: 'N73' },
    { fromKey: 'N73', toKey: 'N74' },
    { fromKey: 'N74', toKey: 'N99' },
    
    // Fast Track from Positive Response
    { fromKey: 'N80', toKey: 'N81' },
    { fromKey: 'N81', toKey: 'N82' },
    
    // Unsubscribe Path
    { fromKey: 'N90', toKey: 'N99', conditionJson: JSON.stringify({ label: 'Unsubscribed' }) },
    { fromKey: 'N90', toKey: 'N30', conditionJson: JSON.stringify({ label: 'Still Active' }) },
    
    // Final exits
    { fromKey: 'N61', toKey: 'N99' },
    { fromKey: 'N82', toKey: 'N99' }
  ]
};

// ADVANCED FUNNEL: Controller with Multi-Entity Focus
const advancedControllerFunnel = {
  id: 'tpl_controller_advanced',
  name: 'Controller - Multi-Entity (Advanced)',
  status: 'published',
  version: 1,
  nodes: [
    // Day 1
    { key: 'N00', type: 'start', name: 'Controller List', posX: 50, posY: 100 },
    { key: 'N01', type: 'stage', name: 'Day 1: Initial Outreach', posX: 300, posY: 100 },
    { key: 'N02', type: 'email_send', name: 'Email: 90% Workload Reduction', posX: 550, posY: 100 },
    { key: 'N03', type: 'wait', name: 'Wait 3 Hours', posX: 800, posY: 100 },
    { key: 'N04', type: 'linkedin_connect', name: 'LinkedIn: Connect', posX: 1050, posY: 100 },
    { key: 'N05', type: 'wait', name: 'Wait 21 Hours', posX: 1300, posY: 100 },
    
    // Day 2 - Email Activity Check
    { key: 'N10', type: 'decision', name: 'Email Opened in 24 Hrs?', posX: 1550, posY: 100 },
    { key: 'N11', type: 'stage', name: 'Opened Path - Day 2', posX: 1550, posY: 250 },
    { key: 'N12', type: 'email_send', name: 'Email: Multi-Entity Case Study', posX: 1800, posY: 250 },
    { key: 'N13', type: 'wait', name: 'Wait 4 Hours', posX: 2050, posY: 250 },
    { key: 'N14', type: 'decision', name: 'Link Clicked?', posX: 2300, posY: 250 },
    { key: 'N15', type: 'task', name: 'Case Study Downloaded → BDR Call', posX: 2550, posY: 200 },
    { key: 'N16', type: 'sms_send', name: 'SMS: 77 Hours Saved/Month', posX: 2300, posY: 350 },
    
    // Not Opened Path
    { key: 'N20', type: 'stage', name: 'Not Opened - Day 2', posX: 1300, posY: 450 },
    { key: 'N21', type: 'sms_send', name: 'SMS: Multi-Entity Reconciliation', posX: 1550, posY: 450 },
    { key: 'N22', type: 'wait', name: 'Wait 1 Day', posX: 1800, posY: 450 },
    { key: 'N23', type: 'voicemail_drop', name: 'VM: Period-End Close Solution', posX: 2050, posY: 450 },
    
    // Day 4 - Combined Activity Check
    { key: 'N30', type: 'stage', name: 'Day 4: Activity Scoring', posX: 2300, posY: 550 },
    { key: 'N31', type: 'decision', name: 'Engagement Score', posX: 2550, posY: 550 },
    { key: 'N32', type: 'task', name: 'High Score → BDR Outreach', posX: 2550, posY: 700 },
    { key: 'N33', type: 'email_send', name: 'Medium: Free Assessment Offer', posX: 2800, posY: 550 },
    { key: 'N34', type: 'stage', name: 'Low: Final Attempt', posX: 2300, posY: 750 },
    
    // Day 7 - Final Push
    { key: 'N40', type: 'wait', name: 'Wait 3 Days', posX: 2550, posY: 750 },
    { key: 'N41', type: 'email_send', name: 'Email: Last Chance - Free Demo', posX: 2800, posY: 750 },
    { key: 'N42', type: 'wait', name: 'Wait 2 Days', posX: 3050, posY: 750 },
    { key: 'N43', type: 'decision', name: 'Any Response?', posX: 3300, posY: 750 },
    
    // Response Paths
    { key: 'N50', type: 'task', name: 'Response → BDR Schedule', posX: 3300, posY: 650 },
    { key: 'N51', type: 'goal', name: 'Demo Scheduled', posX: 3550, posY: 650 },
    
    // Long Nurture
    { key: 'N60', type: 'stage', name: 'Long Nurture (90 Days)', posX: 3300, posY: 900 },
    { key: 'N61', type: 'wait', name: 'Wait 90 Days', posX: 3550, posY: 900 },
    { key: 'N62', type: 'email_send', name: 'Email: Re-Engagement', posX: 3800, posY: 900 },
    
    { key: 'N99', type: 'exit', name: 'End', posX: 4000, posY: 750 }
  ],
  edges: [
    { fromKey: 'N00', toKey: 'N01' },
    { fromKey: 'N01', toKey: 'N02' },
    { fromKey: 'N02', toKey: 'N03' },
    { fromKey: 'N03', toKey: 'N04' },
    { fromKey: 'N04', toKey: 'N05' },
    { fromKey: 'N05', toKey: 'N10' },
    
    // Email opened branching
    { fromKey: 'N10', toKey: 'N11', conditionJson: JSON.stringify({ label: 'Email Opened' }) },
    { fromKey: 'N10', toKey: 'N20', conditionJson: JSON.stringify({ label: 'Not Opened' }) },
    
    // High engagement path
    { fromKey: 'N11', toKey: 'N12' },
    { fromKey: 'N12', toKey: 'N13' },
    { fromKey: 'N13', toKey: 'N14' },
    { fromKey: 'N14', toKey: 'N15', conditionJson: JSON.stringify({ label: 'Link Clicked' }) },
    { fromKey: 'N14', toKey: 'N16', conditionJson: JSON.stringify({ label: 'Not Clicked' }) },
    { fromKey: 'N15', toKey: 'N51' },
    { fromKey: 'N16', toKey: 'N30' },
    
    // Not opened path
    { fromKey: 'N20', toKey: 'N21' },
    { fromKey: 'N21', toKey: 'N22' },
    { fromKey: 'N22', toKey: 'N23' },
    { fromKey: 'N23', toKey: 'N30' },
    
    // Day 4 scoring
    { fromKey: 'N30', toKey: 'N31' },
    { fromKey: 'N31', toKey: 'N32' },
    { fromKey: 'N32', toKey: 'N33', conditionJson: JSON.stringify({ label: 'High Score (3+)' }) },
    { fromKey: 'N32', toKey: 'N34', conditionJson: JSON.stringify({ label: 'Medium Score (1-2)' }) },
    { fromKey: 'N32', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Low Score (0)' }) },
    { fromKey: 'N33', toKey: 'N34' },
    { fromKey: 'N34', toKey: 'N40' },
    
    // Final push
    { fromKey: 'N40', toKey: 'N41' },
    { fromKey: 'N41', toKey: 'N42' },
    { fromKey: 'N42', toKey: 'N43' },
    { fromKey: 'N43', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Response' }) },
    { fromKey: 'N43', toKey: 'N60', conditionJson: JSON.stringify({ label: 'No Response' }) },
    { fromKey: 'N50', toKey: 'N51' },
    
    // Nurture sequence
    { fromKey: 'N60', toKey: 'N61' },
    { fromKey: 'N61', toKey: 'N62' },
    { fromKey: 'N62', toKey: 'N99' },
    
    // All paths to exit
    { fromKey: 'N51', toKey: 'N99' },
    { fromKey: 'N82', toKey: 'N99' },
    { fromKey: 'N90', toKey: 'N99', conditionJson: JSON.stringify({ label: 'Unsubscribe' }) }
  ]
};

// ADVANCED FUNNEL: AR/AP with Payment Matching Focus
const advancedARAPFunnel = {
  id: 'tpl_arap_advanced',
  name: 'AR/AP - Unapplied Funds (Advanced)',
  status: 'published',
  version: 1,
  nodes: [
    // Day 1
    { key: 'N00', type: 'start', name: 'AR/AP Specialist List', posX: 50, posY: 100 },
    { key: 'N01', type: 'stage', name: 'Day 1: Problem Awareness', posX: 300, posY: 100 },
    { key: 'N02', type: 'email_send', name: 'Email: Find $250K Unapplied', posX: 550, posY: 100 },
    { key: 'N03', type: 'wait', name: 'Wait 4 Hours', posX: 800, posY: 100 },
    { key: 'N04', type: 'decision', name: 'Email Opened?', posX: 1050, posY: 100 },
    
    // Opened Quickly (Hot Lead)
    { key: 'N10', type: 'sms_send', name: 'SMS: 90% Auto-Matching', posX: 1050, posY: 250 },
    { key: 'N11', type: 'wait', name: 'Wait 2 Hours', posX: 1300, posY: 250 },
    { key: 'N12', type: 'decision', name: 'SMS Response?', posX: 1550, posY: 250 },
    { key: 'N13', type: 'task', name: 'Immediate Interest → BDR Call', posX: 1800, posY: 200 },
    { key: 'N14', type: 'email_send', name: 'Email: Free Analysis Offer', posX: 1550, posY: 350 },
    
    // Not Opened - Continue Sequence
    { key: 'N20', type: 'wait', name: 'Wait 20 Hours', posX: 800, posY: 300 },
    { key: 'N21', type: 'stage', name: 'Day 2: Solution Education', posX: 1050, posY: 400 },
    { key: 'N22', type: 'email_send', name: 'Email: Reduce Write-Offs 62%', posX: 1300, posY: 400 },
    { key: 'N23', type: 'wait', name: 'Wait 1 Day', posX: 1550, posY: 400 },
    { key: 'N24', type: 'voicemail_drop', name: 'VM: Unapplied Funds Recovery', posX: 1800, posY: 400 },
    { key: 'N25', type: 'wait', name: 'Wait 6 Hours', posX: 2050, posY: 400 },
    { key: 'N26', type: 'decision', name: 'Callback or Email?', posX: 2300, posY: 400 },
    
    // Callback received
    { key: 'N30', type: 'task', name: 'Callback → Schedule Analysis', posX: 2550, posY: 350 },
    { key: 'N31', type: 'goal', name: 'Analysis Booked', posX: 2800, posY: 350 },
    
    // No callback - LinkedIn
    { key: 'N40', type: 'stage', name: 'Day 5: Social + Content', posX: 2300, posY: 550 },
    { key: 'N41', type: 'linkedin_connect', name: 'LinkedIn: AR/AP Network', posX: 2550, posY: 550 },
    { key: 'N42', type: 'wait', name: 'Wait 2 Days', posX: 2800, posY: 550 },
    { key: 'N43', type: 'decision', name: 'LinkedIn Accepted?', posX: 3050, posY: 550 },
    { key: 'N44', type: 'linkedin_message', name: 'LinkedIn: Best Practices Guide', posX: 3050, posY: 700 },
    { key: 'N45', type: 'wait', name: 'Wait 1 Day', posX: 3300, posY: 700 },
    { key: 'N46', type: 'decision', name: 'Guide Downloaded?', posX: 3550, posY: 700 },
    
    // Downloaded - High Intent
    { key: 'N50', type: 'email_send', name: 'Email: Custom Unapplied Analysis', posX: 3800, posY: 650 },
    { key: 'N51', type: 'task', name: 'High Intent → BDR Priority', posX: 4050, posY: 650 },
    { key: 'N52', type: 'goal', name: 'Assessment Scheduled', posX: 4300, posY: 650 },
    
    // Not Downloaded - Final Attempt
    { key: 'N60', type: 'stage', name: 'Day 10: Final Push', posX: 3550, posY: 850 },
    { key: 'N61', type: 'email_send', name: 'Email: $X Recovery Potential', posX: 3800, posY: 850 },
    { key: 'N62', type: 'wait', name: 'Wait 3 Days', posX: 4050, posY: 850 },
    { key: 'N63', type: 'decision', name: 'Final Engagement?', posX: 4300, posY: 850 },
    { key: 'N64', type: 'task', name: 'Engaged → BDR Follow-Up', posX: 4300, posY: 1000 },
    
    // No LinkedIn Accept Path
    { key: 'N70', type: 'stage', name: 'No LinkedIn - Email Only', posX: 3050, posY: 450 },
    { key: 'N71', type: 'email_send', name: 'Email: Payment Posting Automation', posX: 3300, posY: 450 },
    { key: 'N72', type: 'wait', name: 'Wait 3 Days', posX: 3550, posY: 450 },
    
    // Long nurture
    { key: 'N80', type: 'stage', name: 'Nurture - 60 Days', posX: 4550, posY: 850 },
    { key: 'N81', type: 'wait', name: 'Wait 60 Days', posX: 4800, posY: 850 },
    { key: 'N82', type: 'email_send', name: 'Email: Re-Engagement', posX: 5050, posY: 850 },
    
    { key: 'N99', type: 'exit', name: 'End', posX: 5300, posY: 750 }
  ],
  edges: [
    { fromKey: 'N00', toKey: 'N01' },
    { fromKey: 'N01', toKey: 'N02' },
    { fromKey: 'N02', toKey: 'N03' },
    { fromKey: 'N03', toKey: 'N04' },
    { fromKey: 'N04', toKey: 'N05' },
    { fromKey: 'N05', toKey: 'N10' },
    
    // Email opened branching
    { fromKey: 'N10', toKey: 'N11', conditionJson: JSON.stringify({ label: 'Email Opened' }) },
    { fromKey: 'N10', toKey: 'N20', conditionJson: JSON.stringify({ label: 'Not Opened' }) },
    
    // Opened path
    { fromKey: 'N11', toKey: 'N12' },
    { fromKey: 'N12', toKey: 'N13' },
    { fromKey: 'N13', toKey: 'N14' },
    { fromKey: 'N14', toKey: 'N15', conditionJson: JSON.stringify({ label: 'Link Clicked' }) },
    { fromKey: 'N14', toKey: 'N16', conditionJson: JSON.stringify({ label: 'Not Clicked' }) },
    { fromKey: 'N15', toKey: 'N51' },
    { fromKey: 'N16', toKey: 'N40' },
    
    // Not opened
    { fromKey: 'N20', toKey: 'N21' },
    { fromKey: 'N21', toKey: 'N22' },
    { fromKey: 'N22', toKey: 'N23' },
    { fromKey: 'N23', toKey: 'N30' },
    
    // Activity scoring
    { fromKey: 'N30', toKey: 'N31' },
    { fromKey: 'N31', toKey: 'N32', conditionJson: JSON.stringify({ label: 'High Score (3+)' }) },
    { fromKey: 'N31', toKey: 'N33', conditionJson: JSON.stringify({ label: 'Medium (1-2)' }) },
    { fromKey: 'N31', toKey: 'N34', conditionJson: JSON.stringify({ label: 'Low (0)' }) },
    { fromKey: 'N32', toKey: 'N52' },
    { fromKey: 'N33', toKey: 'N40' },
    { fromKey: 'N34', toKey: 'N40' },
    
    // LinkedIn branching
    { fromKey: 'N40', toKey: 'N41' },
    { fromKey: 'N41', toKey: 'N42' },
    { fromKey: 'N42', toKey: 'N43' },
    { fromKey: 'N43', toKey: 'N44', conditionJson: JSON.stringify({ label: 'LinkedIn Accepted' }) },
    { fromKey: 'N43', toKey: 'N70', conditionJson: JSON.stringify({ label: 'Not Accepted' }) },
    { fromKey: 'N44', toKey: 'N45' },
    { fromKey: 'N45', toKey: 'N46' },
    { fromKey: 'N46', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Downloaded' }) },
    { fromKey: 'N46', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Not Downloaded' }) },
    { fromKey: 'N50', toKey: 'N51' },
    { fromKey: 'N51', toKey: 'N52' },
    
    // Final push
    { fromKey: 'N60', toKey: 'N61' },
    { fromKey: 'N61', toKey: 'N62' },
    { fromKey: 'N62', toKey: 'N63' },
    { fromKey: 'N63', toKey: 'N64', conditionJson: JSON.stringify({ label: 'Engaged' }) },
    { fromKey: 'N63', toKey: 'N80', conditionJson: JSON.stringify({ label: 'Not Engaged' }) },
    { fromKey: 'N64', toKey: 'N52' },
    
    // No LinkedIn path
    { fromKey: 'N70', toKey: 'N71' },
    { fromKey: 'N71', toKey: 'N72' },
    { fromKey: 'N72', toKey: 'N60' },
    
    // Long nurture
    { fromKey: 'N80', toKey: 'N81' },
    { fromKey: 'N81', toKey: 'N82' },
    { fromKey: 'N82', toKey: 'N99' },
    
    // Exits
    { fromKey: 'N52', toKey: 'N99' }
  ]
};

// ADVANCED FUNNEL: Property Management with Tech Stack Intelligence
const advancedPropMgmtFunnel = {
  id: 'tpl_propmgmt_advanced',
  name: 'Property Mgmt - Yardi Intelligence (Advanced)',
  status: 'published',
  version: 1,
  nodes: [
    // Day 1 - Yardi-Specific Hook
    { key: 'N00', type: 'start', name: 'Yardi Users (BuiltWith)', posX: 50, posY: 100 },
    { key: 'N01', type: 'stage', name: 'Day 1: Yardi Integration Hook', posX: 350, posY: 100 },
    { key: 'N02', type: 'email_send', name: 'Email: Native Yardi Integration', posX: 650, posY: 100 },
    { key: 'N03', type: 'wait', name: 'Wait 2 Hours', posX: 950, posY: 100 },
    { key: 'N04', type: 'linkedin_connect', name: 'LinkedIn: PropMgmt Finance Network', posX: 1250, posY: 100 },
    { key: 'N05', type: 'wait', name: 'Wait 22 Hours', posX: 1550, posY: 100 },
    
    // Day 2 - Activity Check
    { key: 'N10', type: 'decision', name: 'Email + LinkedIn Status?', posX: 1850, posY: 100 },
    
    // Both Opened + Accepted (Super Hot)
    { key: 'N11', type: 'task', name: 'Both Active → Immediate BDR Call', posX: 2150, posY: 50 },
    { key: 'N12', type: 'email_send', name: 'Email: Yardi Demo This Week', posX: 2450, posY: 50 },
    { key: 'N13', type: 'goal', name: 'Demo Booked', posX: 2750, posY: 50 },
    
    // Email Opened Only
    { key: 'N20', type: 'stage', name: 'Email Engaged - Day 2', posX: 1850, posY: 250 },
    { key: 'N21', type: 'sms_send', name: 'SMS: Multi-Property Reconciliation', posX: 2150, posY: 250 },
    { key: 'N22', type: 'wait', name: 'Wait 1 Day', posX: 2450, posY: 250 },
    { key: 'N23', type: 'email_send', name: 'Email: Yardi Tenant Payment Matching', posX: 2750, posY: 250 },
    { key: 'N24', type: 'wait', name: 'Wait 2 Days', posX: 3050, posY: 250 },
    { key: 'N25', type: 'decision', name: 'Link Clicked?', posX: 3350, posY: 250 },
    
    // LinkedIn Accepted Only
    { key: 'N30', type: 'stage', name: 'LinkedIn Path - Day 2', posX: 1850, posY: 450 },
    { key: 'N31', type: 'linkedin_message', name: 'LinkedIn: Yardi Success Story', posX: 2150, posY: 450 },
    { key: 'N32', type: 'wait', name: 'Wait 1 Day', posX: 2450, posY: 450 },
    { key: 'N33', type: 'decision', name: 'Story Viewed?', posX: 2750, posY: 450 },
    { key: 'N34', type: 'email_send', name: 'Email: PropMgmt Case Study', posX: 3050, posY: 450 },
    
    // Neither Opened nor Accepted
    { key: 'N40', type: 'stage', name: 'Low Engagement - Day 3', posX: 1850, posY: 650 },
    { key: 'N41', type: 'voicemail_drop', name: 'VM: Yardi Reconciliation Solution', posX: 2150, posY: 650 },
    { key: 'N42', type: 'wait', name: 'Wait 1 Day', posX: 2450, posY: 650 },
    { key: 'N43', type: 'sms_send', name: 'SMS: Quick Yardi Demo Link', posX: 2750, posY: 650 },
    { key: 'N44', type: 'wait', name: 'Wait 2 Days', posX: 3050, posY: 650 },
    { key: 'N45', type: 'decision', name: 'Any Response?', posX: 3350, posY: 650 },
    
    // Day 7 - Convergence Point
    { key: 'N50', type: 'stage', name: 'Day 7: Final Assessment', posX: 3650, posY: 450 },
    { key: 'N51', type: 'decision', name: 'Overall Engagement Score', posX: 3950, posY: 450 },
    
    // High Score - Push for Demo
    { key: 'N52', type: 'email_send', name: 'Email: Free Yardi Integration Demo', posX: 3950, posY: 300 },
    { key: 'N53', type: 'wait', name: 'Wait 2 Days', posX: 4250, posY: 300 },
    { key: 'N54', type: 'task', name: 'BDR Personal Outreach', posX: 4550, posY: 300 },
    { key: 'N55', type: 'goal', name: 'Demo Scheduled', posX: 4850, posY: 300 },
    
    // Medium Score - Assessment Offer
    { key: 'N60', type: 'email_send', name: 'Email: Complimentary Yardi Assessment', posX: 3950, posY: 600 },
    { key: 'N61', type: 'sms_send', name: 'SMS: No-Obligation Analysis', posX: 4250, posY: 600 },
    
    // Low Score - Nurture
    { key: 'N70', type: 'stage', name: 'Nurture Sequence', posX: 3950, posY: 800 },
    { key: 'N71', type: 'wait', name: 'Wait 45 Days', posX: 4250, posY: 800 },
    { key: 'N72', type: 'email_send', name: 'Email: PropMgmt Industry Report', posX: 4550, posY: 800 },
    { key: 'N73', type: 'wait', name: 'Wait 45 Days', posX: 4850, posY: 800 },
    { key: 'N74', type: 'email_send', name: 'Email: Break-Up / Re-Engage', posX: 5150, posY: 800 },
    
    { key: 'N99', type: 'exit', name: 'End Campaign', posX: 5400, posY: 550 }
  ],
  edges: [
    { fromKey: 'N00', toKey: 'N01' },
    { fromKey: 'N01', toKey: 'N02' },
    { fromKey: 'N02', toKey: 'N03' },
    { fromKey: 'N03', toKey: 'N04' },
    { fromKey: 'N04', toKey: 'N05' },
    { fromKey: 'N05', toKey: 'N10' },
    
    // Multi-path branching
    { fromKey: 'N10', toKey: 'N11', conditionJson: JSON.stringify({ label: 'Both Opened + Accepted' }) },
    { fromKey: 'N10', toKey: 'N20', conditionJson: JSON.stringify({ label: 'Email Only' }) },
    { fromKey: 'N10', toKey: 'N30', conditionJson: JSON.stringify({ label: 'LinkedIn Only' }) },
    { fromKey: 'N10', toKey: 'N40', conditionJson: JSON.stringify({ label: 'Neither' }) },
    
    // Super hot path
    { fromKey: 'N11', toKey: 'N12' },
    { fromKey: 'N12', toKey: 'N13' },
    { fromKey: 'N13', toKey: 'N14', conditionJson: JSON.stringify({ label: 'Immediate Response' }) },
    { fromKey: 'N13', toKey: 'N20', conditionJson: JSON.stringify({ label: 'Delayed' }) },
    
    // Email path
    { fromKey: 'N20', toKey: 'N21' },
    { fromKey: 'N21', toKey: 'N22' },
    { fromKey: 'N22', toKey: 'N23' },
    { fromKey: 'N23', toKey: 'N24' },
    { fromKey: 'N24', toKey: 'N25' },
    { fromKey: 'N25', toKey: 'N54', conditionJson: JSON.stringify({ label: 'Clicked' }) },
    { fromKey: 'N25', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Not Clicked' }) },
    
    // LinkedIn path
    { fromKey: 'N30', toKey: 'N31' },
    { fromKey: 'N31', toKey: 'N32' },
    { fromKey: 'N32', toKey: 'N33' },
    { fromKey: 'N33', toKey: 'N34', conditionJson: JSON.stringify({ label: 'Viewed' }) },
    { fromKey: 'N33', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Not Viewed' }) },
    { fromKey: 'N34', toKey: 'N50' },
    
    // Low engagement
    { fromKey: 'N40', toKey: 'N41' },
    { fromKey: 'N41', toKey: 'N42' },
    { fromKey: 'N42', toKey: 'N43' },
    { fromKey: 'N43', toKey: 'N44' },
    { fromKey: 'N44', toKey: 'N45' },
    { fromKey: 'N45', toKey: 'N46' },
    { fromKey: 'N46', toKey: 'N50', conditionJson: JSON.stringify({ label: 'Downloaded' }) },
    { fromKey: 'N46', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Not Downloaded' }) },
    { fromKey: 'N50', toKey: 'N51' },
    { fromKey: 'N51', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Response' }) },
    { fromKey: 'N51', toKey: 'N70', conditionJson: JSON.stringify({ label: 'No Response' }) },
    
    // No LinkedIn
    { fromKey: 'N70', toKey: 'N71' },
    { fromKey: 'N71', toKey: 'N72' },
    { fromKey: 'N72', toKey: 'N60' },
    
    // Convergence
    { fromKey: 'N51', toKey: 'N52', conditionJson: JSON.stringify({ label: 'High Score' }) },
    { fromKey: 'N51', toKey: 'N60', conditionJson: JSON.stringify({ label: 'Medium Score' }) },
    { fromKey: 'N51', toKey: 'N70', conditionJson: JSON.stringify({ label: 'Low Score' }) },
    
    // High score demo push
    { fromKey: 'N52', toKey: 'N53' },
    { fromKey: 'N53', toKey: 'N54' },
    { fromKey: 'N54', toKey: 'N55' },
    
    // Medium assessment
    { fromKey: 'N60', toKey: 'N61' },
    { fromKey: 'N61', toKey: 'N50' },
    
    // Nurture
    { fromKey: 'N70', toKey: 'N71' },
    { fromKey: 'N71', toKey: 'N72' },
    { fromKey: 'N72', toKey: 'N73' },
    { fromKey: 'N73', toKey: 'N74' },
    { fromKey: 'N74', toKey: 'N99' },
    
    // Exits
    { fromKey: 'N13', toKey: 'N99' },
    { fromKey: 'N55', toKey: 'N99' }
  ]
};

const advancedFunnels = [advancedCFOFunnel, advancedControllerFunnel, advancedARAPFunnel, advancedPropMgmtFunnel];

async function seed() {
  console.log('\n🚀 Seeding ADVANCED Paycile Funnel Templates...\n');
  console.log('These are complex, action-driven, highly detailed funnels!\n');

  try {
    // Delete existing simple templates (nodes/edges first due to foreign keys)
    const oldTemplateIds = ['tpl_cfo_insurance', 'tpl_controller_multi', 'tpl_arap_funds', 'tpl_propmgmt_yardi'];
    for (const id of oldTemplateIds) {
      await prisma.node.deleteMany({ where: { templateId: id } });
      await prisma.edge.deleteMany({ where: { templateId: id } });
      await prisma.template.delete({ where: { id } }).catch(() => {});
    }
    console.log('🗑️  Removed simple templates\n');

    // Create advanced templates
    let count = 0;
    for (const tpl of advancedFunnels) {
      try {
        // Delete existing
        await prisma.node.deleteMany({ where: { templateId: tpl.id } });
        await prisma.edge.deleteMany({ where: { templateId: tpl.id } });
        await prisma.template.delete({ where: { id: tpl.id } }).catch(() => {});

        // Create template
        const template = await prisma.template.create({
          data: {
            id: tpl.id,
            name: tpl.name,
            status: tpl.status,
            version: tpl.version
          }
        });

        // Create nodes
        for (const node of tpl.nodes) {
          await prisma.node.create({
            data: {
              templateId: template.id,
              key: node.key,
              type: node.type,
              name: node.name,
              posX: node.posX,
              posY: node.posY,
              configJson: node.configJson || null
            }
          });
        }

        // Create edges
        for (const edge of tpl.edges) {
          await prisma.edge.create({
            data: {
              templateId: template.id,
              fromKey: edge.fromKey,
              toKey: edge.toKey,
              conditionJson: edge.conditionJson || null
            }
          });
        }

        console.log(`✅ ${tpl.name}`);
        console.log(`   📊 ${tpl.nodes.length} nodes, ${tpl.edges.length} edges`);
        console.log(`   🎯 Multiple decision points, complex branching\n`);
        count++;
      } catch (err) {
        console.log(`❌ ${tpl.name}: ${err.message}\n`);
      }
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 Advanced funnel templates created!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`✅ Created: ${count} advanced templates\n`);
    console.log('🎨 Features:');
    console.log('   • Nodes spread out (better visualization)');
    console.log('   • Activity checking at multiple points');
    console.log('   • Dynamic flow based on engagement');
    console.log('   • Multi-path branching logic');
    console.log('   • Engagement scoring');
    console.log('   • Fast-track for hot leads');
    console.log('   • Long-term nurture for cold');
    console.log('   • BDR handoff triggers');
    console.log('\n✅ Refresh browser to see complex funnels!\n');

    await prisma.$disconnect();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seed().catch(console.error);

