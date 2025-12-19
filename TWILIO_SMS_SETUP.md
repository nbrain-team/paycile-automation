# Twilio SMS Integration

**Date:** December 19, 2025

---

## ✅ Configuration Complete

**Phone Number:** `+1 (978) 486-7390`
- Type: Local (Littleton, MA)
- Capabilities: SMS, MMS, Voice, Fax
- Webhook: Configured to Paycile backend

**Inbound SMS:**
- Webhook URL: `https://opticwise-backend-uq3o.onrender.com/api/twilio/inbound-sms`
- Method: HTTP POST
- Status: ✅ Configured

---

## 🔧 Required Environment Variables

Add to Render (credentials in Twilio dashboard):

```
TWILIO_ACCOUNT_SID=(from Twilio Account Info)
TWILIO_AUTH_TOKEN=(from Twilio Account Info)
TWILIO_FROM_NUMBER=+19784867390
```

---

## ⚠️ A2P 10DLC Registration Required

Complete registration at:
https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-10dlc-overview

Approval time: Usually 24 hours

---

## 🚀 After Setup

Once credentials added and 10DLC approved:
- Send SMS from campaigns
- Receive SMS replies  
- Two-way conversations
- Automatic inbox logging
