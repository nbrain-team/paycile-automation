# Paycile Automation Platform Buildout

## Web Services

| Service | Type | URL | Render ID |
|---------|------|-----|-----------|
| Backend API | Web Service | https://opticwise-backend-uq3o.onrender.com | srv-d4eco5rgk3sc73blqmug |
| Frontend | Static Site | https://paycile-automation.onrender.com | srv-d4ecouur433s738kuiqg |

## Database

| DB | Host | ID |
|----|------|----|
| paycile-automation-db | dpg-d4eca47gi27c73ck9pvg-a.oregon-postgres.render.com | dpg-d4eca47gi27c73ck9pvg-a |

## Key Environment Variables (Backend)

| Key | Purpose |
|-----|---------|
| DATABASE_URL | PostgreSQL connection string |
| BASE_URL | **Critical** — Backend public URL used for tracking pixels and click redirects. Must be `https://opticwise-backend-uq3o.onrender.com`. If missing, code falls back to this value, but should always be set explicitly. |
| OPENAI_API_KEY | AI personalization + campaign builder |
| HUBSPOT_ACCESS_TOKEN | HubSpot CRM sync (contact create/update only — NOT used for email sending) |
| HUBSPOT_PORTAL_ID | HubSpot portal (243314049) |
| CALENDLY_PAT | Calendly API (webhook subscription, scheduling events) |
| MICROSOFT_CLIENT_ID / TENANT_ID / CLIENT_SECRET | Microsoft Graph email sending |
| JWT_SECRET | Auth token signing |

## Email Sending Architecture

### How Emails Are Sent (NOT via HubSpot)

Campaign emails are sent through the platform's own email queue engine. **HubSpot is NOT involved in email sending or delivery tracking.** The send priority order is:

1. **Microsoft Graph (Delegated)** — If the sender user has linked their Microsoft account via OAuth, emails are sent using their personal `/me/sendMail` endpoint with their refresh token.
2. **Microsoft Graph (Application)** — If delegated tokens are unavailable but Graph API is configured (MICROSOFT_CLIENT_ID / TENANT_ID / CLIENT_SECRET), emails are sent via the app-level `/v1.0/users/{from}/sendMail` endpoint.
3. **SMTP (Rotation)** — If Graph is not configured, falls back to SMTP using the SmtpConfig rotation pool (round-robin across configured SMTP accounts).
4. **SMTP (Legacy)** — If no rotation configs exist, uses the user's personal SMTP settings or environment variable SMTP credentials.

### What HubSpot Actually Does

HubSpot is used **only** for CRM contact management:
- **Contact sync**: Contacts imported into campaigns are pushed to HubSpot as non-marketing contacts via batch CRM API
- **Landing page leads**: Form submissions create/update HubSpot contacts with PLG campaign tags
- **Reply tracking**: Inbound email replies create HubSpot notes on the contact record
- HubSpot does NOT send emails, track opens, track clicks, or handle bounces

### Email Queue Statuses

| Status | Meaning |
|--------|---------|
| `pending` | Queued and waiting for scheduled send time |
| `processing` | Currently being sent |
| `sent` | Successfully accepted by mail server (Graph or SMTP) |
| `failed` | Send attempt failed (bad config, unsubscribed, etc.) |
| `bounced` | Sent but returned as undeliverable (marked manually or via API) |

### Bounce Management

- **POST /api/campaigns/:id/bounces** — Mark emails as bounced by providing an array of email addresses
- **GET /api/campaigns/:id/bounces** — List all bounced emails for a campaign
- The platform does not currently receive automatic bounce notifications from mail servers; bounces must be reported via the API

## Analytics Architecture

### Email Tracking
- **Open tracking**: 1x1 pixel embedded in every outgoing email (GET /api/t/o/:emailQueueId)
- **Click tracking**: All links wrapped in redirect URL (GET /api/t/c/:emailQueueId?url=...)
- **Tracking pixel URL**: Built from `BASE_URL` env var — must point to the live backend domain or all open/click tracking silently fails
- **Exclusions**: Unsubscribe links and mailto: links are not tracked

### Calendly Integration
- **Webhook**: POST /api/webhooks/calendly receives invitee.created / invitee.canceled events
- **Registration**: POST /api/admin/calendly/subscribe (run once to register webhook with Calendly)
- **Contact matching**: Invitee email matched to Contact records; status updated to "Demo Booked"

### Campaign Analytics API
- **Endpoint**: GET /api/campaigns/:id/analytics
- **Returns**: Email metrics (sent/delivered/bounced/failed/opened/clicked), Calendly bookings, per-node breakdown, per-contact engagement table, 30-day timeline
- **Sent** = emails accepted by mail server; **Delivered** = sent minus bounced; **Failed** = send attempts that errored

### Funnel Advancement
- **Endpoint**: POST /api/campaigns/:id/advance
- **Behavior**: Walks the funnel graph from start node, finds next unsent email node per contact, queues it with wait-node delays respected
- **Deduplication**: EmailQueue keyed on contactId + nodeKey prevents duplicate sends

## User Profiles

| User | Email | Phone | Calendly |
|------|-------|-------|----------|
| Derek Stewart | derek@paycile.com | 610-207-4324 | https://calendly.com/derek-paycile/30min |
| Admin | admin@paycile.com | - | - |

## Email Merge Tags

### Contact
`{{contact.first_name}}`, `{{contact.last_name}}`, `{{contact.email}}`, `{{contact.phone}}`

### Sender
`{{sender.name}}`, `{{sender.email}}`, `{{sender.phone}}`, `{{sender.calendly_link}}`

### Signatures
`{{sender.signature_minimal}}` - Name + phone (first-touch)
`{{sender.signature_full}}` - Branded Paycile signature with logo, links
`{{sender.signature}}` - Alias for signature_full
