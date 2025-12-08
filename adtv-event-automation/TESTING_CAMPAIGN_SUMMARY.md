# 🧪 Testing Campaign - Setup Complete

## ✅ Campaign Created Successfully

**Campaign Name:** Testing Campaign  
**Campaign ID:** `campaign_testing_001`  
**Status:** `draft` (ready but not triggered)  
**Database:** Paycile Automation Production DB

---

## 📊 Campaign Details

| Field | Value |
|-------|-------|
| Owner Name | Danny DeMichele |
| Owner Email | danny@nbrain.ai |
| Owner Phone | +17604940404 |
| Event Type | test |
| Event Date | December 1, 2025 |
| Launch Date | November 21, 2025 |
| Total Contacts | **7 test contacts** |
| Status | **DRAFT** (not triggered) |

---

## 🔄 Testing Funnel Flow

The funnel "Testing Funnel" has been created with the following nodes:

### Node 1: Start
- **Type:** `start`
- **Name:** "Start - Test Contacts"
- **Action:** Entry point for all test contacts

### Node 2: Email Send (Instant)
- **Type:** `email_send`
- **Name:** "Email: Test Message"
- **Subject:** "Paycile Automation Test Email"
- **Body:** "email test send from the paycile automation system, SMS should show up in 5 minutes"
- **Timing:** Sends immediately

### Node 3: Wait
- **Type:** `wait`
- **Name:** "Wait 5 Minutes"
- **Duration:** 5 minutes (ISO 8601: PT5M)
- **Action:** Delays before next node

### Node 4: SMS Send
- **Type:** `sms_send`
- **Name:** "SMS: Test Message"
- **Message:** "SMS testing message from the platform, all systems go."
- **Timing:** Sends after 5-minute wait
- **Provider:** Twilio (newly configured)

### Node 5: Goal
- **Type:** `goal`
- **Name:** "Test Complete"
- **Action:** Marks completion

---

## 👥 Test Contacts Loaded (7 Total)

| Name | Email | Phone |
|------|-------|-------|
| Danny DeMichele | danny@nbrain.ai | +17604940404 |
| Cary Johnson | cary@nbrain.ai | +18584010480 |
| Jim Fitzgerald | Jim@paycile.com | +18044055151 |
| Steve Leighty | Steve@paycile.com | +18043498785 |
| Paul Huntley | Paul@paycile.com | +15155567460 |
| Grant Salk | Grant@paycile.com | +13202938568 |
| Gelo Anglo | Gelo@paycile.com | +639776931235 |

---

## 🔧 Technical Details

### Funnel Node Keys:
- `TEST_001`: Start node
- `TEST_002`: Email send node
- `TEST_003`: Wait 5 minutes node
- `TEST_004`: SMS send node
- `TEST_005`: Goal node

### Edges (Flow Connections):
1. TEST_001 → TEST_002 (Start to Email)
2. TEST_002 → TEST_003 (Email to Wait)
3. TEST_003 → TEST_004 (Wait to SMS)
4. TEST_004 → TEST_005 (SMS to Goal)

---

## ⚠️ Important Notes

### Campaign Status: DRAFT
- Campaign is created but **NOT TRIGGERED**
- No emails or SMS will be sent until you manually trigger it
- This is intentional - waiting for SMTP password configuration

### SMTP Configuration Status
- **SMS Provider:** ✅ Twilio configured and ready
  - All credentials configured in Render environment
  - Phone Number: Configured
- **Email Provider:** ⏳ Waiting for SMTP app password
  - Current SMTP: smtp.office365.com
  - User: stanley@paycile.com
  - Password: **NEEDS UPDATE**

---

## 🚀 How to Trigger the Campaign

### Option 1: Via Web UI
1. Navigate to Campaigns page in your platform
2. Find "Testing Campaign"
3. Click "Launch" or "Execute"

### Option 2: Via API
```bash
# Execute both email and SMS nodes
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/campaigns/campaign_testing_001/execute
```

### Option 3: Via Render Shell
```bash
# SSH into Render
ssh srv-d4eco5rgk3sc73blqmug@ssh.oregon.render.com

# Execute email node only
curl -X POST http://localhost:4000/api/campaigns/campaign_testing_001/execute-email

# Execute SMS node only (after 5 minutes)
curl -X POST http://localhost:4000/api/campaigns/campaign_testing_001/execute-sms
```

---

## 🧪 Testing Timeline

When you trigger the campaign:

| Time | Action | Recipient(s) |
|------|--------|--------------|
| T+0 min | Email sent | All 7 contacts |
| T+5 min | SMS sent | All 7 contacts |
| T+5 min | Campaign complete | - |

---

## 📋 Pre-Flight Checklist

Before triggering:

- [x] Campaign created
- [x] Funnel nodes created (5 nodes)
- [x] Funnel edges connected
- [x] Test contacts uploaded (7 contacts)
- [x] SMS Provider switched to Twilio
- [x] Twilio credentials updated
- [ ] **SMTP password configured** ⚠️
- [ ] Deployment complete
- [ ] Campaign triggered

---

## 🔍 Verification Commands

### Check Campaign in Database:
```sql
SELECT * FROM "Campaign" WHERE id = 'campaign_testing_001';
```

### Check Contacts:
```sql
SELECT name, email, phone, status 
FROM "Contact" 
WHERE "campaignId" = 'campaign_testing_001';
```

### Check Funnel Nodes:
```sql
SELECT key, type, name, "configJson" 
FROM "CampaignNode" 
WHERE "campaignId" = 'campaign_testing_001' 
ORDER BY "posX";
```

### Check Funnel Edges:
```sql
SELECT "fromKey", "toKey" 
FROM "CampaignEdge" 
WHERE "campaignId" = 'campaign_testing_001';
```

---

## 📊 Expected Results

### Successful Test Indicators:
1. ✅ All 7 contacts receive email within 1 minute
2. ✅ All 7 contacts receive SMS exactly 5 minutes later
3. ✅ No errors in Render logs
4. ✅ Messages logged in database
5. ✅ Campaign status updates to "completed"

### Check Render Logs:
https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug/logs

---

## 🎯 Next Steps

1. **Configure SMTP Password** (user action required)
2. **Wait for Render Deployment** (currently deploying with new Twilio settings)
3. **Verify Deployment Complete** (check Events tab)
4. **Test Campaign Trigger** (when ready)
5. **Monitor Results** (check logs and message delivery)

---

## 🔐 Security Note

All test contacts are Paycile/nBrain team members. No external/customer data is included in this test campaign.


