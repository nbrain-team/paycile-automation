# HubSpot Integration Setup Guide

## Current Status: ⚠️ Missing Required Scopes

Your HubSpot Private App "Paycile Marketing Automation" is created but needs additional permissions to function fully.

---

## ✅ What's Working Now

- **API Connection**: Successfully connected to HubSpot Portal 243314049
- **Read Contacts**: Can search and read contact data
- **Read Deals**: Can read deal information
- **Read Owners**: Can read user/owner data

---

## ❌ What's Missing (Required Scopes)

You need to add these scopes to your HubSpot Private App:

### **Critical - Required for Basic Functionality:**

#### **CRM Write Permissions:**
- ✅ `crm.objects.contacts.write` - **Create and update contacts**
- ✅ `crm.objects.companies.write` - **Create and update companies**
- ✅ `crm.objects.deals.write` - **Create and update deals**

#### **Schema Write Permissions (for custom properties):**
- ✅ `crm.schemas.contacts.write` - **Create custom contact properties**
- ✅ `crm.schemas.companies.write` - **Create custom company properties**
- ✅ `crm.schemas.deals.write` - **Create custom deal properties**

### **Optional but Recommended:**
- ✅ `timeline` - Log engagement activities to contact timeline
- ✅ `crm.lists.write` - Create and manage lists for segmentation

---

## 📋 Step-by-Step: Add Missing Scopes

### Step 1: Navigate to Your App
1. Log into **HubSpot**
2. Click **Settings** (⚙️ icon) → **Integrations** → **Private Apps**
3. Find and click **"Paycile Marketing Automation"**

### Step 2: Add Scopes
1. Click the **"Scopes"** tab
2. Scroll down and check these boxes:

**CRM Objects:**
- [x] `crm.objects.contacts.write`
- [x] `crm.objects.companies.write`
- [x] `crm.objects.deals.write`

**CRM Schemas:**
- [x] `crm.schemas.contacts.write`
- [x] `crm.schemas.companies.write`
- [x] `crm.schemas.deals.write`

**Timeline (optional):**
- [x] `timeline`

**Lists (optional):**
- [x] `crm.lists.write`

### Step 3: Save and Get New Token
1. Click **"Update"** or **"Save"**
2. HubSpot will show you a **new access token** (the old one is invalidated)
3. Click **"Show token"**
4. **COPY THE ENTIRE TOKEN** immediately
5. Paste it back to me so I can update the integration

---

## 🚀 What Happens After You Add Scopes

Once you provide the new token with proper scopes, I'll automatically:

### 1. **Update Configuration** (30 seconds)
- Update `.env` file with new token
- Test all API endpoints
- Verify write permissions

### 2. **Create Custom Properties** (2 minutes)
HubSpot will have these new fields for tracking Paycile data:
- `Paycile Lead Score` - Engagement score (0-100)
- `Paycile Persona` - Target persona (CFO, Controller, etc.)
- `Paycile Campaign` - Source campaign name
- `Paycile Last Engagement` - Last interaction date
- `Paycile Total Touches` - Number of touchpoints
- `Paycile Channel Preference` - Preferred channel (Email/Phone/SMS)
- `Paycile Status` - Current automation status

### 3. **Test Full Sync Workflow** (5 minutes)
- Create test contact in HubSpot
- Create test deal
- Log engagement activity
- Verify bidirectional sync

### 4. **Deploy Integration** (10 minutes)
- Connect to your Paycile backend
- Set up webhook triggers
- Configure automatic sync rules

---

## 🔄 How the Integration Will Work

### **Paycile → HubSpot (Automatic Push)**

**Trigger:** When contact reaches qualified status in Paycile:
- `needs_bdr` (Needs BDR follow-up)
- `demo_booked` (Demo scheduled)
- `interested` (Expressed interest)

**Actions:**
1. ✅ Create/update contact in HubSpot
2. ✅ Create deal in appropriate pipeline stage
3. ✅ Log all engagement history (emails, voicemails, SMS)
4. ✅ Set lifecycle stage (Lead → MQL → Opportunity)
5. ✅ Assign to owner (if specified)
6. ✅ Add to relevant lists

**Data Synced:**
- Contact info (name, email, phone, company, title)
- Lead score and persona
- Campaign source
- All touchpoints (12 emails sent, 3 opened, 1 clicked, etc.)
- Channel preferences
- Conversation notes

### **HubSpot → Paycile (Status Updates)**

**Trigger:** When deal stage changes in HubSpot:
- Deal moved to "Closed Won"
- Deal moved to "Closed Lost"
- Deal owner changed

**Actions:**
1. ✅ Update contact status in Paycile
2. ✅ Pause automation campaigns (if closed)
3. ✅ Track conversion metrics
4. ✅ Update analytics dashboard

---

## 📊 Custom Properties Details

Once created, these properties will appear in HubSpot contact records:

### **Paycile Lead Score** (Number)
- Range: 0-100
- Calculated based on engagement:
  - Email opened: +5 points
  - Email clicked: +10 points
  - Replied: +20 points
  - Voicemail received: +8 points
  - SMS response: +15 points

### **Paycile Persona** (Dropdown)
Options:
- CFO / Financial Executive
- Finance Manager / Controller
- AR/AP Specialist
- Treasury / Cash Manager
- Accountant / GL Specialist
- Property Management
- Auditor / Compliance Officer
- Small Business Owner / CEO

### **Paycile Campaign** (Text)
Examples:
- "CFO Insurance Campaign"
- "Controller Multi-Entity Campaign"
- "ARAP Unapplied Funds Campaign"

### **Paycile Status** (Dropdown)
Options:
- New
- Email Sent
- Email Opened
- Email Clicked
- Replied
- Interested
- Needs BDR
- Demo Booked
- Not Interested
- Bad Fit

### **Paycile Channel Preference** (Dropdown)
Based on engagement patterns:
- Email (most responsive to email)
- Phone (answers calls, engages with voicemail)
- SMS (responds to text messages)
- LinkedIn (active on LinkedIn)

---

## 🧪 Testing Plan

After setup, we'll test these scenarios:

### Test 1: Create New Contact
```javascript
{
  email: "john.doe@testcompany.com",
  first_name: "John",
  last_name: "Doe",
  company: "Test Company Inc",
  job_title: "CFO",
  persona: "cfo",
  campaign_name: "CFO Insurance Campaign",
  lead_score: 85,
  status: "needs_bdr"
}
```
**Expected:** Contact created in HubSpot with all Paycile fields populated

### Test 2: Create Deal for Qualified Lead
**Expected:** Deal created, associated with contact, set to "Appointment Scheduled" stage

### Test 3: Log Engagement History
**Expected:** Timeline shows all touchpoints (emails, voicemails, SMS)

### Test 4: Update Existing Contact
**Expected:** Contact updated without creating duplicate

### Test 5: Batch Sync
**Expected:** 10 contacts synced in under 30 seconds

---

## 🔐 Security Notes

- Access token is stored in `.env` file (gitignored)
- Token has minimum required permissions only
- All API calls use HTTPS
- Token can be regenerated anytime in HubSpot
- Integration uses official HubSpot API (no third-party tools)

---

## 📞 Support

If you encounter any issues:

1. **Permission Errors**: Double-check all scopes are enabled
2. **Token Issues**: Regenerate token in HubSpot Private Apps
3. **Sync Failures**: Check logs in `hubspot_integration.js`
4. **Custom Properties Not Showing**: Run `node hubspot_integration.js setup` again

---

## ✅ Quick Checklist

Before you add scopes, make sure:
- [ ] You have admin/super admin access to HubSpot
- [ ] You're in the correct HubSpot portal (243314049)
- [ ] You have 5 minutes to complete the setup
- [ ] You're ready to copy the new access token

After adding scopes:
- [ ] Copy new access token
- [ ] Paste it to me
- [ ] I'll update `.env` file
- [ ] I'll create custom properties
- [ ] I'll test full sync workflow
- [ ] I'll deploy to production

---

## 🎯 Next Steps

**Right Now:**
1. Go to HubSpot → Settings → Integrations → Private Apps
2. Edit "Paycile Marketing Automation"
3. Add all the scopes listed above
4. Copy the new access token
5. Paste it here

**After Token Update:**
- I'll handle everything else automatically
- Integration will be live in ~10 minutes
- You'll see test data in HubSpot
- Full documentation will be generated

---

**Ready when you are! Just paste the new token once you've added the scopes.** 🚀
