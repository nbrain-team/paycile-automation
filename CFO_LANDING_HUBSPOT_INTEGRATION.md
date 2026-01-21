# CFO Landing Page - HubSpot Form Integration

## Overview
Added a lead capture form to the CFO Insurance landing page that automatically pushes submissions to HubSpot CRM with full contact and engagement data.

## Changes Made

### 1. Landing Page Form (`CFOInsuranceLanding.tsx`)

**Added Features:**
- ✅ Professional lead capture form with validation
- ✅ React state management for form data
- ✅ Real-time form submission with loading states
- ✅ Success/error message handling
- ✅ Mobile-responsive design
- ✅ Privacy notice and compliance text

**Form Fields:**
- First Name * (required)
- Last Name * (required)
- Business Email * (required)
- Company Name * (required)
- Job Title * (required)
- Company Size (dropdown: 1-50, 51-200, 201-500, 501-1000, 1000+)
- Phone Number (optional)
- Message/Challenges (textarea - optional)

**User Experience:**
1. User fills out form on landing page
2. Form validates required fields
3. Shows "Submitting..." state during API call
4. On success: Shows green success message with confirmation
5. On error: Shows red error message with fallback contact info
6. Form resets after successful submission

### 2. Backend API Endpoint (`/api/leads/submit`)

**Functionality:**
- ✅ Receives form data from landing page
- ✅ Validates required fields
- ✅ Searches for existing HubSpot contact by email
- ✅ Creates new contact OR updates existing contact
- ✅ Adds custom Paycile properties (persona, campaign, status, score)
- ✅ Creates note in HubSpot with lead's message
- ✅ Sends notification email to sales team
- ✅ Returns success/error response

**HubSpot Properties Set:**
- Standard: email, firstname, lastname, company, phone, jobtitle, lifecyclestage
- Custom: paycile_persona, paycile_campaign_name, paycile_status, paycile_lead_score, company_size

**Sales Notification:**
- Sent via Microsoft Graph API to jim@paycile.com
- Includes all lead details
- Direct link to HubSpot contact record

### 3. Updated Hero Section

Changed primary CTA from "Book Your Executive Demo" to "Get Free ROI Assessment" linking to the new form section.

## Landing Page URL

https://paycile-automation.onrender.com/landing/cfo-insurance

## Form Submission Flow

```
User fills form
    ↓
POST /api/leads/submit
    ↓
Validate fields
    ↓
Search HubSpot for existing contact
    ↓
Create/Update HubSpot contact
    ↓
Add note with message
    ↓
Send sales notification email
    ↓
Return success to user
```

## HubSpot Integration Details

### Contact Creation
- **Endpoint**: `POST https://api.hubapi.com/crm/v3/objects/contacts`
- **Auth**: Bearer token from `HUBSPOT_ACCESS_TOKEN` env variable
- **Lifecycle Stage**: Automatically set to "lead"

### Contact Update
- **Endpoint**: `PATCH https://api.hubapi.com/crm/v3/objects/contacts/{id}`
- **Search First**: Finds existing contact by email before updating

### Note Creation
- **Endpoint**: `POST https://api.hubapi.com/crm/v3/objects/notes`
- **Association**: Automatically linked to contact record
- **Content**: Includes lead source and message from form

## Environment Variables Required

```bash
HUBSPOT_ACCESS_TOKEN=your_private_app_token
HUBSPOT_PORTAL_ID=243314049
SALES_NOTIFICATION_EMAIL=jim@paycile.com
```

## Testing

### Test Form Submission
1. Visit: https://paycile-automation.onrender.com/landing/cfo-insurance
2. Scroll to "Get Your Free ROI Assessment" section
3. Fill out form with test data
4. Submit and verify:
   - Success message appears
   - Contact appears in HubSpot
   - Sales notification email received
   - Note with message appears in HubSpot contact timeline

### Test API Directly
```bash
curl -X POST https://paycile-automation-backend.onrender.com/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@testcompany.com",
    "company": "Test Insurance Co",
    "jobTitle": "CFO",
    "phone": "+1234567890",
    "companySize": "201-500",
    "message": "Interested in automating our reconciliation process",
    "source": "CFO Insurance Landing Page",
    "persona": "cfo",
    "campaign_name": "CFO Insurance - Website Lead",
    "status": "new",
    "lead_score": 50
  }'
```

## Files Modified

```
✅ adtv-event-automation/apps/web/src/pages/CFOInsuranceLanding.tsx
   - Added React state management
   - Added form HTML and validation
   - Added form styles (mobile responsive)
   - Updated hero CTA

✅ adtv-event-automation/apps/server/src/index.ts
   - Added POST /api/leads/submit endpoint
   - HubSpot contact create/update logic
   - Note creation in HubSpot
   - Sales notification email
```

## Benefits

### For Marketing
- ✅ Automatic lead capture without manual entry
- ✅ All leads flow directly into HubSpot CRM
- ✅ Complete engagement history tracked
- ✅ Lead scoring from first touch
- ✅ Instant sales notifications

### For Sales
- ✅ Leads appear in HubSpot immediately
- ✅ All context preserved (company size, challenges, etc.)
- ✅ Email notifications with direct HubSpot links
- ✅ No manual data entry required
- ✅ Can respond within minutes

### For Prospects
- ✅ Simple, professional form experience
- ✅ Clear value proposition (Free ROI Assessment)
- ✅ Immediate confirmation message
- ✅ Privacy assurance included
- ✅ Mobile-friendly design

## Next Steps

1. **Deploy to Production**
   - Push changes to GitHub
   - Wait for Render auto-deploy
   - Verify form works in production

2. **Test End-to-End**
   - Submit test lead
   - Verify HubSpot contact creation
   - Check sales notification email
   - Confirm note appears in timeline

3. **Optional Enhancements**
   - Add Google Analytics tracking for form submissions
   - A/B test different form headlines
   - Add reCAPTCHA for spam prevention
   - Integrate with Calendly for instant booking

## Monitoring

### Check Form Submissions
- **Server Logs**: Look for "📝 Received lead submission" messages
- **HubSpot**: Check Contacts for new leads with source "CFO Insurance Landing Page"
- **Email**: Sales notifications to jim@paycile.com

### Debug Issues
```bash
# Check server logs on Render
# Look for these log messages:
# ✅ Created HubSpot contact: email@example.com (ID: 12345)
# ✅ Added note to HubSpot contact 12345
# ✅ Sent notification email to sales team
```

## Security & Privacy

- ✅ HTTPS only (enforced by Render)
- ✅ Input validation on server
- ✅ Email validation (HTML5 + server-side)
- ✅ Privacy notice on form
- ✅ HubSpot API token secured in environment variables
- ✅ No sensitive data logged

## Support

For issues or questions:
- Check Render logs for API errors
- Verify `HUBSPOT_ACCESS_TOKEN` is set correctly
- Ensure HubSpot Private App has required scopes:
  - `crm.objects.contacts.write`
  - `crm.objects.contacts.read`
  - `crm.objects.notes.write`
