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
| OPENAI_API_KEY | AI personalization + campaign builder |
| HUBSPOT_ACCESS_TOKEN | HubSpot CRM sync |
| HUBSPOT_PORTAL_ID | HubSpot portal (243314049) |
| CALENDLY_PAT | Calendly API (webhook subscription, scheduling events) |
| MICROSOFT_CLIENT_ID / TENANT_ID / CLIENT_SECRET | Microsoft Graph email sending |
| JWT_SECRET | Auth token signing |

## Analytics Architecture

### Email Tracking
- **Open tracking**: 1x1 pixel embedded in every outgoing email (GET /api/t/o/:emailQueueId)
- **Click tracking**: All links wrapped in redirect URL (GET /api/t/c/:emailQueueId?url=...)
- **Exclusions**: Unsubscribe links and mailto: links are not tracked

### Calendly Integration
- **Webhook**: POST /api/webhooks/calendly receives invitee.created / invitee.canceled events
- **Registration**: POST /api/admin/calendly/subscribe (run once to register webhook with Calendly)
- **Contact matching**: Invitee email matched to Contact records; status updated to "Demo Booked"

### Campaign Analytics API
- **Endpoint**: GET /api/campaigns/:id/analytics
- **Returns**: Email metrics (sent/delivered/failed/opened/clicked), Calendly bookings, per-node breakdown, per-contact engagement table, 30-day timeline

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
