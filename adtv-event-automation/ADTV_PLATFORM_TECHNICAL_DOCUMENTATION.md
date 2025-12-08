# ADTV Event Automation Platform
## Complete Technical Documentation & Architecture Guide

**Version:** 1.0  
**Last Updated:** October 21, 2025  
**Platform Status:** Production  
**Deployment:** Render.com

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Platform Overview](#platform-overview)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Third-Party Integrations](#third-party-integrations)
8. [Security & Authentication](#security--authentication)
9. [Environment Configuration](#environment-configuration)
10. [Deployment Infrastructure](#deployment-infrastructure)
11. [Core Features & Workflows](#core-features--workflows)
12. [Data Models](#data-models)
13. [Frontend Architecture](#frontend-architecture)
14. [Backend Architecture](#backend-architecture)
15. [Automation Engine](#automation-engine)
16. [Communication Channels](#communication-channels)
17. [Analytics & Reporting](#analytics--reporting)
18. [File Storage & Media](#file-storage--media)
19. [Development Workflow](#development-workflow)
20. [Monitoring & Logging](#monitoring--logging)

---

## Executive Summary

The ADTV Event Automation Platform is a comprehensive event marketing automation system designed to streamline real estate event campaigns through intelligent multi-channel communication workflows. The platform manages the complete event lifecycle from contact acquisition to post-event follow-up, featuring automated SMS, email, and voicemail campaigns with AI-powered response generation.

### Key Capabilities
- **Visual Workflow Builder**: Drag-and-drop campaign automation designer
- **Multi-Channel Communication**: Email, SMS, and voicemail drops
- **AI-Powered Responses**: Gemini AI integration for intelligent message generation
- **Real-Time Analytics**: Comprehensive campaign performance tracking
- **Contact Management**: Advanced lead tracking with automation check-in/check-out
- **Template Versioning**: Campaign templates with version control and CSV export/import

---

## Platform Overview

### Purpose
Automate and optimize real estate event marketing campaigns through intelligent, multi-channel communication sequences.

### Target Users
- **Campaign Managers**: Create and manage event campaigns
- **Business Development Representatives (BDRs)**: Handle manual communication and lead follow-up
- **Administrators**: System configuration and user management
- **Analysts**: Campaign performance monitoring and optimization

### Primary Use Cases
1. **Event Campaign Creation**: Configure events (virtual/in-person) with dates, locations, and details
2. **Contact Acquisition**: Import and enrich contact databases
3. **Automated Outreach**: Multi-touch communication campaigns (SMS, Email, Voicemail)
4. **Response Management**: AI-assisted reply generation and automation pause/resume
5. **RSVP Tracking**: Monitor event registrations and attendance
6. **Post-Event Follow-up**: Automated nurture sequences
7. **Analytics & Reporting**: Campaign performance insights

---

## Technology Stack

### Frontend Technologies

#### Core Framework
- **React 18.2.0**
  - Functional components with Hooks
  - Modern JavaScript (ES6+)
  - TypeScript for type safety

#### Build Tools & Development
- **Vite 5.4.1**: Lightning-fast build tool and dev server
- **TypeScript 5.5.4**: Static type checking
- **PostCSS 8.4.41**: CSS processing
- **Autoprefixer 10.4.19**: CSS vendor prefixing

#### UI & Styling
- **Tailwind CSS 3.4.10**: Utility-first CSS framework
- **Custom Design System**: Consistent component library
- **Responsive Design**: Mobile-first approach

#### State Management
- **Zustand 4.5.2**: Lightweight state management
  - Global campaign state
  - User session management
  - Content templates cache

#### Routing
- **React Router DOM 6.26.2**: Client-side routing
  - Protected routes
  - Dynamic route parameters
  - Navigation guards

#### Data Visualization
- **Chart.js 4.5.0**: Core charting library
- **React-ChartJS-2 5.3.0**: React wrapper for Chart.js
  - Line charts (time-series data)
  - Bar charts (comparative metrics)
  - Doughnut charts (status distribution)
  - Custom gauge charts (performance metrics)

#### Flow Builder
- **ReactFlow 11.11.4**: Visual workflow editor
  - Drag-and-drop node creation
  - Edge connection management
  - Custom node types
- **Dagre 0.8.5**: Graph layout algorithm for automatic positioning

#### Utilities
- **DayJS 1.11.11**: Date manipulation and formatting
- **Papaparse 5.5.3**: CSV parsing and generation
- **clsx 2.1.1**: Conditional CSS class composition
- **html2canvas 1.4.1**: Screenshot generation
- **jsPDF 3.0.2**: PDF export functionality

### Backend Technologies

#### Runtime & Framework
- **Node.js**: JavaScript runtime (v20+)
- **Express 4.19.2**: Web application framework
  - RESTful API routing
  - Middleware pipeline
  - Static file serving

#### Language & Type Safety
- **TypeScript 5.6.3**: Typed JavaScript
- **ts-node 10.9.2**: TypeScript execution
- **ts-node-dev 2.0.0**: Development server with hot reload

#### Database & ORM
- **PostgreSQL**: Primary relational database
- **Prisma 5.17.0**: Next-generation ORM
  - Type-safe database client
  - Migration management
  - Schema validation
  - Query optimization

#### Authentication & Security
- **bcryptjs 2.4.3**: Password hashing (10 salt rounds)
- **jsonwebtoken 9.0.2**: JWT token generation and validation
- **JWT_SECRET**: Environment-based secret key
- **CORS 2.8.5**: Cross-origin resource sharing

#### Validation
- **Zod 3.23.8**: TypeScript-first schema validation
  - Request body validation
  - Response type validation
  - Environment variable validation

#### Email Services
- **Nodemailer 7.0.6**: SMTP email delivery
- **Google APIs 131.0.0**: Gmail integration via OAuth2
  - OAuth2 authentication
  - Gmail API for email syncing
  - Thread tracking

#### SMS & Voice
- **Twilio 4.22.0**: SMS and voice communication
  - Programmable SMS
  - Inbound webhook handling
  - Message status tracking

#### File Processing
- **Papaparse 5.4.1**: CSV parsing for bulk imports
- **dotenv 17.2.2**: Environment variable management

#### Package Management
- **pnpm 10.12.4**: Fast, disk space efficient package manager

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │   Mobile     │  │   Tablet     │      │
│  │   (React)    │  │   (React)    │  │   (React)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             │ HTTPS/TLS
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     CDN Layer (Render)                        │
│                            │                                 │
│  ┌─────────────────────────┼──────────────────────────────┐ │
│  │         Static Assets (React SPA)                       │ │
│  │  - JavaScript bundles   - CSS stylesheets              │ │
│  │  - Images & media       - Font files                   │ │
│  └─────────────────────────┼──────────────────────────────┘ │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                  Application Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Express.js API Server (Node.js)              │   │
│  │  ┌────────────┐ ┌─────────────┐ ┌─────────────┐    │   │
│  │  │   Routes   │ │ Middleware  │ │ Controllers │    │   │
│  │  └────────────┘ └─────────────┘ └─────────────┘    │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │         Business Logic Layer                │    │   │
│  │  │  - Campaign Management                      │    │   │
│  │  │  - Contact Processing                       │    │   │
│  │  │  - Template Engine                          │    │   │
│  │  │  - Automation Executor                      │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     Data Layer                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Prisma ORM                              │   │
│  │  - Type-safe queries   - Migration management        │   │
│  │  - Connection pooling  - Transaction support         │   │
│  └────────────────┬─────────────────────────────────────┘   │
│                   │                                          │
│  ┌────────────────┴─────────────────────────────────────┐   │
│  │         PostgreSQL Database (Render)                 │   │
│  │  - 14 Core Tables    - JSON storage                  │   │
│  │  - Automated backups - Point-in-time recovery        │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│              External Services Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Twilio     │  │  Google      │  │   Gemini AI  │      │
│  │   SMS/Voice  │  │  Gmail/OAuth │  │   Responses  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  ElevenLabs  │  │ Slybroadcast │  │    Bonzo     │      │
│  │  Text-to-    │  │  Voicemail   │  │     SMS      │      │
│  │  Speech      │  │    Drops     │  │   Provider   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

### Request Flow

#### 1. User Action Flow
```
User clicks "Send Campaign" 
  → Frontend validates form
  → POST /api/campaigns/{id}/execute
  → Express route handler
  → Zod validation
  → Prisma database query
  → Load campaign nodes & contacts
  → Execute automation sequence
  → Send via Twilio/SMTP
  → Log to conversation table
  → Return success response
  → Update UI state
```

#### 2. Inbound Message Flow
```
Contact replies to SMS
  → Twilio webhook POST /api/twilio/inbound-sms
  → Parse phone number
  → Lookup contact in database
  → Create/update conversation
  → Auto-checkout from automation
  → Update contact status to "Needs BDR"
  → Store message
  → Return TwiML response
```

#### 3. AI Response Generation Flow
```
BDR clicks "Generate Response With AI"
  → POST /api/ai/generate-response
  → Fetch contact & campaign context
  → Retrieve conversation history
  → Build Gemini prompt with context
  → Call Gemini API
  → Parse AI response
  → Return suggested reply
  → User reviews/edits
  → User sends manually
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐
│   Template      │
│─────────────────│
│ id (PK)         │
│ name            │
│ status          │
│ version         │
│ createdAt       │
│ updatedAt       │
└────┬────────────┘
     │
     │ 1:N
     │
     ├──────────────────┬──────────────────┐
     │                  │                  │
┌────▼──────┐    ┌──────▼──────┐   ┌──────▼───────────┐
│   Node    │    │    Edge     │   │ TemplateVersion  │
│───────────│    │─────────────│   │──────────────────│
│ id (PK)   │    │ id (PK)     │   │ id (PK)          │
│ key       │    │ fromKey     │   │ versionName      │
│ type      │    │ toKey       │   │ description      │
│ name      │    │ condition   │   │ nodesJson        │
│ config    │    │             │   │ edgesJson        │
│ posX/Y    │    │             │   │ campaignId (FK)  │
└───────────┘    └─────────────┘   └──────────────────┘

┌─────────────────────────────────────────┐
│            Campaign                     │
│─────────────────────────────────────────│
│ id (PK)                                 │
│ name, ownerName, ownerEmail, ownerPhone│
│ city, state, eventType, eventDate      │
│ videoLink, eventLink, calendlyLink     │
│ hotelName, hotelAddress                │
│ status, templateId (FK), senderUserId  │
│ totalContacts, enrichedContacts        │
│ createdAt, updatedAt                   │
└────┬────────────────────────────────────┘
     │
     │ 1:N
     ├────────────────────┬─────────────────┐
     │                    │                 │
┌────▼──────────┐  ┌──────▼──────┐  ┌──────▼──────────┐
│ CampaignNode  │  │CampaignEdge │  │    Contact      │
│───────────────│  │─────────────│  │─────────────────│
│ id (PK)       │  │ id (PK)     │  │ id (PK)         │
│ key           │  │ fromKey     │  │ name, email     │
│ type, name    │  │ toKey       │  │ phone, company  │
│ configJson    │  │ condition   │  │ status, city    │
│ posX/Y        │  │             │  │ stageKey        │
└───────────────┘  └─────────────┘  │ automationOut   │
                                    │ pausedNodeKey   │
                                    │ createdAt       │
                                    └────┬────────────┘
                                         │
                                         │ 1:N
                                         │
                                    ┌────▼────────────┐
                                    │  Conversation   │
                                    │─────────────────│
                                    │ id (PK)         │
                                    │ contactId (FK)  │
                                    │ channel         │
                                    └────┬────────────┘
                                         │
                                         │ 1:N
                                         │
                                    ┌────▼────────────┐
                                    │    Message      │
                                    │─────────────────│
                                    │ id (PK)         │
                                    │ direction       │
                                    │ text, subject   │
                                    │ provider        │
                                    │ createdAt       │
                                    └─────────────────┘

┌──────────────────────────────┐
│           User               │
│──────────────────────────────│
│ id (PK)                      │
│ name, email (UNIQUE)         │
│ role (bdr | admin)           │
│ passwordHash                 │
│ phone, smsFromNumber         │
│ smtpHost, smtpPort           │
│ smtpUser, smtpPass           │
│ googleAccessToken            │
│ googleRefreshToken           │
│ createdAt, updatedAt         │
└──────────────────────────────┘

┌──────────────────────────────┐
│      ContentTemplate         │
│──────────────────────────────│
│ id (PK)                      │
│ type (email|sms|voicemail)   │
│ name                         │
│ subject, body, text          │
│ ttsScript                    │
│ createdAt, updatedAt         │
└──────────────────────────────┘
```

### Core Tables

#### **Template**
Master campaign flow templates
- `id`: CUID primary key
- `name`: Template display name
- `status`: draft | published | archived
- `version`: Integer version number
- Relationships: nodes[], edges[], campaigns[], versions[]

#### **TemplateVersion**
Campaign-specific template variations
- `baseTemplateId`: Reference to parent template
- `campaignId`: Associated campaign (optional)
- `versionName`: Display name for version
- `nodesJson`: Serialized node modifications
- `edgesJson`: Serialized edge modifications
- Purpose: Track campaign customizations without modifying base template

#### **Node**
Automation workflow steps
- `key`: Unique node identifier (e.g., "N10")
- `type`: email_send | sms_send | voicemail_drop | decision | wait | task | web_request | stage | esign | goal | exit | linked_post | linked_message | retargeting_db
- `name`: Display name
- `configJson`: Serialized configuration (templates, timing, conditions)
- `posX`, `posY`: Visual position in flow editor

#### **Edge**
Connections between nodes
- `fromKey`: Source node
- `toKey`: Target node
- `conditionJson`: Timing and logic rules (after, at_local, on_event)

#### **Campaign**
Event campaign instances
- Event details: name, type (virtual | in_person), dates, location
- Owner: name, email, phone (BDR assignment)
- Links: video, event registration, Calendly
- Status progression: draft → enriching → ready → live
- Metrics: totalContacts, enrichedContacts, emailsGenerated
- Relations: contacts[], nodes[], edges[]

#### **Contact**
Campaign prospects/leads
- Personal: name, email, phone, company, city, state
- Status tracking: No Activity → Needs BDR → RSVP → Attended → Signed
- `stageKey`: Current position in automation flow
- **Automation Control**:
  - `automationCheckedOut`: Boolean - paused from automation
  - `automationPausedNodeKey`: Node where automation paused
  - `automationCheckedOutAt`: Timestamp of checkout
- `rawJson`: Original scrape/import data

#### **Conversation**
Multi-channel communication threads
- `contactId`: Associated contact
- `channel`: sms | email
- Relations: messages[]

#### **Message**
Individual communications
- `direction`: in | out
- `text`: Message content
- `subject`: Email subject line
- `provider`: twilio | smtp | gmail | slybroadcast | bonzo
- `providerMessageId`: External tracking ID
- `providerThreadId`: Thread grouping
- `createdAt`: Message timestamp

#### **User**
System users (BDRs, admins)
- Authentication: email (unique), passwordHash
- `role`: bdr | admin
- Communication settings: phone, smsFromNumber, vmCallerId
- SMTP config: host, port, user, pass, secure
- Google OAuth: accessToken, refreshToken, tokenExpiry, scope
- Relations: campaigns[] (as sender)

#### **ContentTemplate**
Reusable message templates
- `type`: email | sms | voicemail
- `name`: Template identifier
- Email: subject, body
- SMS: text
- Voicemail: ttsScript
- Supports merge tags: {{contact.first_name}}, {{campaign.event_date}}

### Indexes & Performance

```sql
-- Template versioning lookups
CREATE INDEX ON TemplateVersion(baseTemplateId);
CREATE INDEX ON TemplateVersion(campaignId);

-- User authentication
CREATE UNIQUE INDEX ON User(email);

-- Contact queries by campaign
CREATE INDEX ON Contact(campaignId);
CREATE INDEX ON Contact(status);
CREATE INDEX ON Contact(automationCheckedOut);

-- Message history
CREATE INDEX ON Message(conversationId);
CREATE INDEX ON Message(direction);
CREATE INDEX ON Message(createdAt DESC);

-- Conversation lookups
CREATE INDEX ON Conversation(contactId);
CREATE INDEX ON Conversation(channel);
```

---

## API Documentation

### Base URL
- **Production**: `https://adtv-events-server.onrender.com`
- **Local Development**: `http://localhost:4000`

### Authentication

#### JWT Token-Based Auth
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "bdr"
  }
}
```

#### Authenticated Requests
```http
Authorization: Bearer <jwt_token>
```

### Core API Endpoints

#### **Templates**

**List Templates**
```http
GET /api/templates
Response: Array<Template>
```

**Get Template**
```http
GET /api/templates/:id
Response: Template with nodes[] and edges[]
```

**Create Template**
```http
POST /api/templates
Content-Type: application/json

{
  "name": "Virtual Event Flow",
  "graph": {
    "nodes": [
      {
        "id": "n1",
        "type": "email_send",
        "name": "Initial Invite",
        "config": { "template_id": "ct_invite_email" }
      }
    ],
    "edges": []
  }
}
```

**Update Template Graph**
```http
PUT /api/templates/:id/graph
{
  "nodes": [...],
  "edges": [...]
}
```

**Export Template to CSV**
```http
GET /api/templates/:id/export/csv?versionId=<optional>
Response: CSV file download
```

**Import Template from CSV**
```http
POST /api/templates/:id/import/csv
{
  "csvData": "NodeID,NodeType,NodeName,...",
  "createVersion": false,
  "versionName": "Optional Version Name"
}
```

#### **Template Versions**

**List Versions**
```http
GET /api/templates/:id/versions
Response: Array<{
  id, versionName, description, createdBy, createdAt,
  campaign, nodesCount, edgesCount
}>
```

**Create Version**
```http
POST /api/templates/:id/versions
{
  "versionName": "Boston Event Custom",
  "description": "Modified for Boston roadshow",
  "campaignId": "optional",
  "nodes": [...],
  "edges": [...]
}
```

**Update Version**
```http
PATCH /api/templates/:templateId/versions/:versionId
{
  "versionName": "Updated Name",
  "nodes": [...],
  "edges": [...]
}
```

**Delete Version**
```http
DELETE /api/templates/:templateId/versions/:versionId
```

#### **Campaigns**

**List Campaigns**
```http
GET /api/campaigns
Response: Array<Campaign>
```

**Create Campaign**
```http
POST /api/campaigns
{
  "name": "Boston Roadshow 9/9/2025",
  "ownerName": "Kalena Conley",
  "ownerEmail": "kalena@adtv.com",
  "ownerPhone": "+1234567890",
  "eventType": "in_person",
  "eventDate": "2025-09-09",
  "city": "Boston",
  "state": "MA",
  "templateId": "optional"
}
```

**Update Campaign**
```http
PATCH /api/campaigns/:id
{
  "name": "Updated Name",
  "status": "published",
  "importGraph": true  // Import from template
}
```

**Get Campaign Graph**
```http
GET /api/campaigns/:id/graph
Response: { nodes[], edges[] }
```

**Get Campaign Statistics**
```http
GET /api/campaigns/:id/stats
Response: {
  totals: { contacts, messages, inbound, outbound },
  statusCounts: { "No Activity": 150, "Needs BDR": 23, ... },
  funnel: { rsvpConfirmed, attended, esignSent, signed },
  messagesByDay: [{ date, in, out }],
  recentMessages: [...]
}
```

**Execute Campaign**
```http
POST /api/campaigns/:id/execute
{
  "nodeKey": "optional - specific node"
}
Response: {
  ok: true,
  smsSent: 150,
  emailSent: 150,
  vmQueued: 0
}
```

#### **Contacts**

**List Campaign Contacts**
```http
GET /api/campaigns/:id/contacts
Response: Array<Contact>
```

**Create Contact**
```http
POST /api/campaigns/:id/contacts
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+15551234567",
  "company": "Acme Corp",
  "status": "No Activity"
}
```

**Bulk Import Contacts**
```http
POST /api/campaigns/:id/contacts/bulk
{
  "contacts": [
    { name, email, phone, company, city, state, ... },
    ...
  ]
}
```

**Update Contact**
```http
PATCH /api/contacts/:id
{
  "name": "Updated Name",
  "status": "Received RSVP",
  "stageKey": "n5"
}
```

**Check Out Contact (Pause Automation)**
```http
POST /api/contacts/:id/checkout
{
  "nodeKey": "n3"  // Optional - where to pause
}
Response: { ok: true, contact: {...} }
```

**Check In Contact (Resume Automation)**
```http
POST /api/contacts/:id/checkin
{
  "resumeFromPausedNode": true,
  "stageKey": "optional override"
}
Response: { ok: true, contact: {...} }
```

#### **Messaging**

**Send SMS**
```http
POST /api/sms/send
{
  "to": "+15551234567",
  "text": "Your message here",
  "contactId": "optional"
}
Response: {
  ok: true,
  sent: true,
  sid: "SM...",
  provider: "twilio"
}
```

**Send Email**
```http
POST /api/email/send
{
  "to": "recipient@example.com",
  "subject": "Subject line",
  "body": "Email content",
  "userId": "optional",
  "contactId": "optional"
}
```

**Send Voicemail Drop**
```http
POST /api/voicemail/drop
{
  "to": "+15551234567",
  "audioUrl": "https://...",
  "ttsScript": "Hello {{contact.first_name}}...",
  "callerId": "+15559876543",
  "contactId": "optional"
}
```

#### **Inbox & Conversations**

**List Conversations**
```http
GET /api/conversations
Response: Array<{
  id, contactId, channel, contact,
  messages: [{ id, direction, text, createdAt }]
}>
```

**Send Message**
```http
POST /api/messages
{
  "contactId": "clx...",
  "text": "Message content",
  "direction": "out"
}
```

#### **AI Response Generation**

**Generate AI Response**
```http
POST /api/ai/generate-response
Content-Type: application/json

{
  "contactId": "clx123...",
  "conversationHistory": [
    {
      "direction": "in",
      "text": "What time is the event?",
      "time": "2025-10-21T10:00:00Z"
    },
    {
      "direction": "out",
      "text": "The event starts at 6 PM.",
      "time": "2025-10-21T10:05:00Z"
    }
  ]
}

Response: {
  ok: true,
  response: "Great question! The event is on September 9th at 6 PM at the Boston Marriott. Would you like me to send you the event details?"
}
```

**Features**:
- Context-aware (campaign details, contact info, conversation history)
- Professional tone optimized for real estate events
- Includes call-to-action suggestions
- User can review/edit before sending

#### **Content Templates**

**List Content Templates**
```http
GET /api/content-templates
Response: Array<{
  id, type, name, subject, body, text, tts_script
}>
```

**Create Content Template**
```http
POST /api/content-templates
{
  "type": "email",
  "name": "Initial Invite",
  "subject": "You're Invited: {{campaign.name}}",
  "body": "Hi {{contact.first_name}},..."
}
```

**Delete Content Template**
```http
DELETE /api/content-templates/:id
```

#### **Analytics**

**Dashboard Statistics**
```http
GET /api/stats
Response: {
  enrolled, messaged, respondedPos, respondedQuestion,
  respondedNeg, rsvpConfirmed, attended, esignSent,
  signed, podioCreated, campaigns,
  recentActivity: [...],
  messagesByDay: [{ date, in, out }]
}
```

#### **Webhooks**

**Twilio Inbound SMS**
```http
POST /api/twilio/inbound-sms
Content-Type: application/x-www-form-urlencoded

From=+15551234567&
To=+15559876543&
Body=Message+text+here

Behavior:
- Finds contact by phone number (last 10 digits)
- Creates/updates conversation
- Stores inbound message
- Auto-checks out contact from automation
- Sets status to "Needs BDR"
- Returns empty TwiML response
```

**Bonzo Inbound SMS**
```http
POST /api/bonzo/inbound-sms
Content-Type: application/json
x-bonzo-token: <webhook_token>

{
  "from": "+15551234567",
  "text": "Message content"
}
```

#### **Google OAuth**

**Initiate OAuth Flow**
```http
GET /api/auth/google/initiate?userId=<user_id>
Response: { url: "https://accounts.google.com/..." }
```

**OAuth Callback**
```http
GET /api/auth/google/callback?code=<auth_code>&state={userId:"..."}
Response: { ok: true, googleEmail: "user@gmail.com" }
```

**Sync Gmail**
```http
POST /api/gmail/sync
{
  "userId": "clx...",
  "days": 30
}
Response: { ok: true, imported: 15 }
```

### Error Responses

```json
{
  "error": "Error message description"
}
```

**Status Codes**:
- `200`: Success
- `400`: Bad request / validation error
- `401`: Unauthorized
- `404`: Not found
- `500`: Server error

---

## Third-Party Integrations

### 1. Twilio (SMS & Voice)

**Purpose**: Primary SMS delivery and inbound handling

**Configuration**:
- `TWILIO_ACCOUNT_SID`: Account identifier
- `TWILIO_AUTH_TOKEN`: Authentication token
- `TWILIO_PHONE_NUMBER`: Sending number

**Features**:
- Programmable SMS sending
- Inbound SMS webhooks
- Message status tracking
- MMS support (future)

**API Usage**:
```javascript
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
const message = await client.messages.create({
  to: '+15551234567',
  from: TWILIO_PHONE_NUMBER,
  body: 'Message text'
});
```

**Webhook Setup**:
- Inbound SMS URL: `POST /api/twilio/inbound-sms`
- Format: `application/x-www-form-urlencoded`

### 2. Bonzo SMS (Alternative Provider)

**Purpose**: Secondary SMS provider with prospect management

**Configuration**:
- `BONZO_API_URL`: API endpoint
- `BONZO_API_KEY`: Authentication key
- `BONZO_WEBHOOK_TOKEN`: Webhook validation

**Features**:
- SMS sending
- Prospect creation
- Opt-in management
- Webhook for inbound messages

**API Usage**:
```javascript
// Create prospect
POST https://bonzo.dev/api/prospects
{
  firstName, lastName, email, phone,
  companyId, externalId
}

// Opt in for SMS
POST https://bonzo.dev/api/prospects/{id}/opt-in
{ channel: "sms" }
```

### 3. ElevenLabs (Text-to-Speech)

**Purpose**: High-quality AI voice generation for voicemail

**Configuration**:
- `ELEVENLABS_API_KEY`: API authentication
- `ELEVENLABS_VOICE_ID`: Voice model selection

**Features**:
- Natural-sounding AI voices
- MP3 audio generation
- Multiple language support

**API Usage**:
```javascript
POST https://api.elevenlabs.io/v1/text-to-speech/{voiceId}
Headers: { xi-api-key: API_KEY }
Body: { text: "Script here", voice_settings: {...} }

Response: Audio MP3 buffer
```

### 4. Slybroadcast (Voicemail Drops)

**Purpose**: Direct-to-voicemail delivery without ringing

**Configuration**:
- `SLYBROADCAST_EMAIL`: Account email
- `SLYBROADCAST_PASSWORD`: Account password
- `SLYBROADCAST_CALLER_ID`: Display caller ID

**Features**:
- Direct voicemail injection
- No phone ringing
- Mobile network compatibility

**API Usage**:
```javascript
POST https://www.mobile-sphere.com/gateway/vmb.php
Form data: {
  c_uid: email,
  c_password: password,
  c_phone: destination,
  c_url: audioUrl,
  c_callerID: callerID
}
```

### 5. Google APIs (Gmail & OAuth)

**Purpose**: Email synchronization and OAuth authentication

**Configuration**:
- `GOOGLE_CLIENT_ID`: OAuth client ID
- `GOOGLE_CLIENT_SECRET`: OAuth secret
- `GOOGLE_REDIRECT_URI`: OAuth callback URL

**Scopes**:
- `gmail.readonly`: Read email messages
- `userinfo.email`: User email access
- `openid`: OpenID Connect

**Features**:
- Gmail message sync
- OAuth2 authentication
- Thread tracking
- Label management

**OAuth Flow**:
1. User clicks "Connect Gmail"
2. Redirect to Google consent screen
3. User approves permissions
4. Callback with authorization code
5. Exchange code for tokens
6. Store refresh token
7. Access Gmail API

### 6. Gemini AI (Google)

**Purpose**: Intelligent response generation

**Configuration**:
- `GEMINI_API_KEY`: API authentication

**Model**: `gemini-pro`

**Features**:
- Context-aware responses
- Conversation history analysis
- Campaign detail integration
- Professional tone optimization

**API Usage**:
```javascript
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}

{
  contents: [{
    parts: [{ text: "Prompt with context..." }]
  }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200
  }
}
```

**Prompt Engineering**:
- Contact details (name, status)
- Campaign info (event type, date, location)
- Full conversation history
- Guidelines for tone and CTA

### 7. SMTP Email (Nodemailer)

**Purpose**: Custom email delivery via SMTP

**Configuration** (User-specific):
- `SMTP_HOST`: Mail server
- `SMTP_PORT`: Port (465/587)
- `SMTP_USER`: Email address
- `SMTP_PASS`: Password/app password
- `SMTP_SECURE`: TLS flag

**Features**:
- Custom domain emails
- Per-user SMTP settings
- Gmail app passwords
- Thread tracking

---

## Security & Authentication

### Authentication Strategy

#### JWT-Based Authentication
- **Algorithm**: HMAC SHA-256 (HS256)
- **Secret**: Environment variable `JWT_SECRET`
- **Expiration**: 7 days
- **Payload**: `{ id, email, role }`

**Token Generation**:
```javascript
const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  JWT_SECRET,
  { expiresIn: '7d' }
);
```

**Token Validation**:
```javascript
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
```

#### Password Security
- **Hashing**: bcryptjs
- **Salt Rounds**: 10
- **Storage**: Only password hash stored (never plaintext)

**Password Hashing**:
```javascript
const passwordHash = await bcrypt.hash(password, 10);
```

**Password Verification**:
```javascript
const valid = await bcrypt.compare(password, user.passwordHash);
```

### Authorization Levels

#### Roles
1. **BDR (Business Development Representative)**
   - View campaigns
   - Manage assigned contacts
   - Send messages
   - View analytics

2. **Admin**
   - All BDR permissions
   - Create/edit campaigns
   - Manage templates
   - User management
   - System configuration

### API Security

#### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

#### Request Validation
- **Library**: Zod
- **Validation Points**: All API endpoints
- **Strategy**: Schema validation before processing

**Example**:
```javascript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const validated = schema.parse(req.body);
```

#### Input Sanitization
- SQL injection: Prevented via Prisma ORM (parameterized queries)
- XSS: React auto-escapes output
- CSRF: Not applicable (stateless JWT auth)

### Data Protection

#### Sensitive Data Encryption
- **Passwords**: bcrypt hashing
- **API Keys**: Environment variables (not committed)
- **OAuth Tokens**: Encrypted at rest in database

#### PII Handling
- Contact data: Encrypted in transit (HTTPS)
- Phone numbers: Normalized format (+1XXXXXXXXXX)
- Email addresses: Validated format
- GDPR compliance: Data export/delete capabilities

#### Database Security
- **Provider**: Render PostgreSQL
- **Encryption**: At-rest and in-transit
- **Backups**: Automated daily
- **Access**: IP whitelist + credentials

### Third-Party API Security

#### Token Storage
- Environment variables for global keys
- Database storage for user-specific tokens (Gmail refresh tokens)
- Encrypted SMTP credentials

#### Webhook Validation
- **Twilio**: X-Twilio-Signature validation (optional)
- **Bonzo**: Custom token in header/query/body

**Bonzo Webhook Validation**:
```javascript
const token = process.env.BONZO_WEBHOOK_TOKEN;
const provided = req.headers['x-bonzo-token'] || 
                 req.query.token || 
                 req.body.token;

if (provided !== token) {
  return res.status(401).json({ error: 'Invalid token' });
}
```

### Environment Security

#### Secret Management
- `.env` file (development): Gitignored
- Render environment variables (production)
- Never hardcode secrets

#### Required Secrets
```bash
# Core
DATABASE_URL=postgresql://...
JWT_SECRET=<random-string>

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Google
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=...
GEMINI_API_KEY=...

# Optional integrations
BONZO_API_KEY=...
ELEVENLABS_API_KEY=...
SLYBROADCAST_EMAIL=...
SLYBROADCAST_PASSWORD=...
```

### Security Best Practices

1. **No Credentials in Code**: All secrets in environment
2. **HTTPS Only**: TLS encryption for all traffic
3. **Rate Limiting**: Implement on critical endpoints (future)
4. **Input Validation**: Zod schemas on all inputs
5. **Error Messages**: Generic errors to prevent information leakage
6. **Logging**: Sanitize logs (no passwords/tokens)
7. **Dependencies**: Regular updates for security patches

---

## Environment Configuration

### Required Environment Variables

#### **Backend (.env)**

```bash
# ===========================
# DATABASE
# ===========================
DATABASE_URL="postgresql://user:pass@host:5432/dbname?schema=public"

# ===========================
# APPLICATION
# ===========================
PORT=4000
PUBLIC_BASE_URL="https://adtv-events-server.onrender.com"
NODE_ENV=production

# ===========================
# AUTHENTICATION
# ===========================
JWT_SECRET="your-secure-random-string-min-32-chars"

# ===========================
# TWILIO (SMS)
# ===========================
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+15551234567"

# ===========================
# BONZO (Alternative SMS)
# ===========================
BONZO_API_URL="https://bonzo.dev/api"
BONZO_API_KEY="..."
BONZO_COMPANY_ID="..."
BONZO_WEBHOOK_TOKEN="..."

# ===========================
# GOOGLE (OAuth & Gmail)
# ===========================
GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."
GOOGLE_REDIRECT_URI="https://adtv-events-server.onrender.com/api/auth/google/callback"

# ===========================
# GOOGLE GEMINI AI
# ===========================
GEMINI_API_KEY="AIza..."

# ===========================
# ELEVENLABS (Text-to-Speech)
# ===========================
ELEVENLABS_API_KEY="..."
ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"  # Rachel

# ===========================
# SLYBROADCAST (Voicemail)
# ===========================
SLYBROADCAST_EMAIL="account@example.com"
SLYBROADCAST_PASSWORD="..."
SLYBROADCAST_CALLER_ID="+15551234567"

# ===========================
# DROPCOWBOY (Alternative VM)
# ===========================
DROPCOWBOY_API_KEY="..."
DROPCOWBOY_CALLER_ID="+15551234567"

# ===========================
# SMTP (Email - Optional)
# ===========================
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="sender@example.com"
SMTP_PASS="app-specific-password"
SMTP_SECURE=true

# ===========================
# SMS PROVIDER SELECTION
# ===========================
SMS_PROVIDER="twilio"  # or "bonzo"
```

#### **Frontend (.env)**

```bash
# API Endpoint
VITE_API_URL="https://adtv-events-server.onrender.com"

# Optional: Analytics
VITE_GA_TRACKING_ID="G-..."
```

### Configuration Files

#### **Prisma Configuration**

**File**: `apps/server/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### **TypeScript Configuration**

**Backend** (`apps/server/tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Frontend** (`apps/web/tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@lib/*": ["./src/lib/*"],
      "@store/*": ["./src/store/*"],
      "@seed/*": ["./src/seed/*"],
      "@shared/*": ["./src/shared/*"]
    },
    "strict": true,
    "skipLibCheck": true
  }
}
```

#### **Vite Configuration**

**File**: `apps/web/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@store': path.resolve(__dirname, './src/store'),
      '@seed': path.resolve(__dirname, './src/seed'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

---

## Deployment Infrastructure

### Hosting: Render.com

#### **Web Service (Backend)**

**Configuration**:
- **Name**: adtv-events-server
- **Environment**: Node
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`
- **Instance Type**: Starter (512 MB RAM, 0.5 CPU)
- **Region**: Oregon (US West)
- **Auto-Deploy**: Enabled (main branch)

**Health Check**:
- **Path**: `/health`
- **Response**: `{ "ok": true }`

**Build Process**:
```bash
1. pnpm install           # Install dependencies
2. pnpm prisma:generate   # Generate Prisma client
3. pnpm prisma:deploy     # Run database migrations
4. tsc -p tsconfig.json   # Compile TypeScript
```

**Environment Variables**: See Environment Configuration section

#### **Static Site (Frontend)**

**Configuration**:
- **Name**: adtv-events-web
- **Environment**: Static Site
- **Build Command**: `cd apps/web && pnpm install && pnpm build`
- **Publish Directory**: `apps/web/dist`
- **Instance Type**: Free tier
- **Auto-Deploy**: Enabled (main branch)

**Build Process**:
```bash
1. pnpm install        # Install dependencies
2. tsc -b              # Type check
3. vite build          # Build production bundle
```

**Static Configuration** (`static.json`):
```json
{
  "root": "dist",
  "clean_urls": false,
  "routes": {
    "/**": "index.html"
  },
  "headers": {
    "/**": {
      "Cache-Control": "public, max-age=3600"
    },
    "/assets/**": {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  }
}
```

#### **Database: PostgreSQL**

**Configuration**:
- **Name**: adtv-db
- **Provider**: Render PostgreSQL
- **Plan**: Starter ($7/month)
- **Version**: PostgreSQL 14
- **Storage**: 1 GB
- **Region**: Oregon
- **Backups**: Automated daily
- **Point-in-Time Recovery**: 7 days

**Connection**:
- Internal URL (from Render services)
- External URL (from outside Render)
- Connection pooling: Enabled

### CI/CD Pipeline

#### **Git Workflow**

```
main branch
  │
  ├──> Push to GitHub
  │
  ├──> Render webhook triggered
  │
  ├──> Backend build starts
  │    ├──> Install dependencies
  │    ├──> Generate Prisma client
  │    ├──> Run migrations
  │    ├──> Compile TypeScript
  │    └──> Deploy to production
  │
  └──> Frontend build starts
       ├──> Install dependencies
       ├──> Type check
       ├──> Build Vite bundle
       └──> Deploy to CDN
```

#### **Deployment Checklist**

1. **Pre-Deployment**:
   - Run linters locally: `pnpm lint`
   - Type check: `tsc --noEmit`
   - Test locally
   - Commit changes
   - Push to main

2. **During Deployment**:
   - Monitor Render build logs
   - Check for migration errors
   - Verify environment variables

3. **Post-Deployment**:
   - Test health endpoint
   - Verify database connection
   - Test critical user flows
   - Monitor error logs

### Monitoring & Observability

#### **Render Dashboard**
- CPU usage
- Memory usage
- Request volume
- Response times
- Error rates

#### **Logs**
- **Backend**: Structured JSON logs
- **Frontend**: Browser console + Sentry (future)
- **Database**: Query logs (slow queries)

**Log Retention**:
- Render: 7 days
- Long-term: Export to external service (future)

#### **Alerts** (Configured in Render)
- Service down
- High error rate
- Database connection issues
- High memory usage

---

## Core Features & Workflows

### 1. Campaign Creation & Management

**Workflow**:
```
1. User clicks "New Campaign"
2. Fill campaign form:
   - Name, owner, event type
   - Date(s), location details
   - Links (video, Calendly, event)
3. Select template (optional)
4. Click "Create Campaign"
5. System creates campaign
6. Clones template nodes/edges if selected
7. Redirects to campaign detail page
```

**Features**:
- **Event Types**: Virtual or In-Person
- **Multiple Event Slots**: Up to 2 for in-person, 3 for virtual
- **Hotel Information**: For in-person events
- **Calendly Integration**: Per-slot for virtual, single for in-person
- **Location Scraping**: Target cities for contact acquisition

### 2. Contact Management

**Import Methods**:
1. **CSV Upload**: Bulk import with mapping
2. **Manual Entry**: Single contact creation
3. **API Import**: From external systems

**Contact Enrichment**:
- Phone number validation
- Email verification
- Company/title enrichment (future integration)

**Segmentation**:
- **By Status**: No Activity, Needs BDR, RSVP, Attended, etc.
- **By Campaign**: Filter to specific events
- **By Geography**: City/state filtering
- **By Engagement**: Message interaction

**Automation Status**:
- **In Automation**: Active in workflow
- **Checked Out**: Paused for manual handling
- **Paused Node**: Where automation stopped

### 3. Template & Workflow Builder

**Visual Flow Editor**:
- **Drag-and-Drop**: Node placement and connections
- **Auto-Layout**: Dagre algorithm for clean positioning
- **Manual Positioning**: Drag nodes to custom positions
- **Zoom & Pan**: Navigate large flows

**Node Types**:
1. **email_send**: Send email communication
2. **sms_send**: Send SMS message
3. **voicemail_drop**: Leave voicemail without ringing
4. **decision**: Branch based on conditions
5. **wait**: Time delay
6. **task**: Manual task assignment
7. **web_request**: API call (webhook)
8. **stage**: Workflow stage marker
9. **esign**: E-signature request
10. **goal**: Success metric
11. **exit**: End workflow
12. **linked_post**: Social media integration (future)
13. **linked_message**: LinkedIn messaging (future)
14. **retargeting_db**: Retargeting list export (future)

**Node Configuration**:
- **Content Source**: Template or custom
- **Timing**: Immediate, delay, or scheduled time
- **Conditions**: Logic for branching
- **Merge Tags**: Dynamic personalization

**Edge Configuration**:
- **Timing**: `after` (PT10M, P1D, etc.)
- **Scheduled**: `at_local` (08:00)
- **Event-Based**: `on` (replied, clicked, etc.)
- **Conditions**: Complex logic

**Template Versioning**:
- **Base Template**: Master workflow
- **Versions**: Campaign-specific variations
- **Version History**: Track changes over time
- **CSV Export/Import**: Bulk editing

### 4. Multi-Channel Communication

#### **Email**
**Capabilities**:
- SMTP delivery (user-configured or global)
- Gmail integration via OAuth
- HTML and plain text
- Template-based or custom content
- Merge tag personalization
- Thread tracking

**Merge Tags**:
```
Contact: {{contact.first_name}}, {{contact.last_name}}, 
         {{contact.email}}, {{contact.phone}}, {{contact.company}}

Campaign: {{campaign.name}}, {{campaign.event_date}}, 
          {{campaign.city}}, {{campaign.owner_name}},
          {{campaign.video_link}}, {{campaign.calendly_link}}
```

#### **SMS**
**Capabilities**:
- Twilio or Bonzo delivery
- 160-character limit awareness
- Unicode support
- Merge tag personalization
- Delivery confirmation
- Inbound webhook handling

**Auto-Checkout on Reply**:
```
Contact replies → Webhook receives message →
Check out from automation → Status: "Needs BDR" →
BDR manually handles → Check in to resume
```

#### **Voicemail**
**Capabilities**:
- ElevenLabs text-to-speech generation
- Slybroadcast direct-to-voicemail delivery
- Natural AI voices
- Script personalization
- No phone ringing
- Cost-effective outreach

**Process**:
```
1. Node triggers voicemail
2. Generate TTS from script (ElevenLabs)
3. Store MP3 in memory
4. Generate public URL
5. Submit to Slybroadcast
6. Direct voicemail injection
```

### 5. Inbox & Response Management

**Conversation View**:
- **Unified Inbox**: All channels in one place
- **Filters**: By channel (SMS/Email), campaign
- **Threading**: Messages grouped by contact
- **Status Indicators**: Automation in/out

**Check-Out/Check-In System**:
```
Automatic Check-Out:
  Contact replies → Auto checkout → Status: "Needs BDR"

Manual Check-In:
  BDR finishes → Click "Check In" → Resume from paused node
```

**AI Response Generation**:
```
1. BDR clicks "Generate Response With AI"
2. System loads:
   - Contact details
   - Campaign information
   - Conversation history (last 20 messages)
3. Send to Gemini AI with prompt
4. AI generates contextual response
5. BDR reviews and edits
6. BDR sends manually
```

**Features**:
- Professional tone
- Context-aware suggestions
- Event-specific information
- Clear call-to-action
- Editable before sending

### 6. Analytics & Reporting

**Dashboard Metrics**:
- Total enrolled contacts
- Messages sent
- Response rates (positive, questions, negative)
- RSVP confirmations
- Event attendance
- E-signatures sent/signed

**Campaign-Specific Analytics**:
- **Contact Funnel**: No Activity → RSVP → Attended → Signed
- **Status Distribution**: Pie chart breakdown
- **Message Timeline**: 30-day trend (inbound/outbound)
- **Performance Metrics**: Conversion rates by stage

**Gauge Charts**:
- **Reach**: Total contacts
- **Impressions**: Total messages
- **Engagement**: Inbound responses
- **Frequency**: Messages per contact

**Export Capabilities**:
- CSV export of contacts
- PDF export of flow diagrams
- Analytics reports

### 7. Template Versioning

**Purpose**: Track campaign customizations without modifying base template

**Workflow**:
```
1. Start with base template
2. Customize for specific campaign
3. Click "Save as Version"
4. Name version (e.g., "Boston Event Custom")
5. Version stored with campaign reference
6. Continue editing or revert to base
```

**Version Management**:
- **List Versions**: View all variations
- **Load Version**: Apply to current campaign
- **Export Version**: CSV download
- **Delete Version**: Remove variation

### 8. User & Permission Management

**User Roles**:

**BDR (Business Development Representative)**:
- View assigned campaigns
- Manage contacts
- Send messages
- View analytics
- Cannot create campaigns or templates

**Admin**:
- All BDR permissions
- Create/edit campaigns
- Manage templates
- User management
- System configuration

**User Settings**:
- Personal SMTP configuration
- SMS from number
- Voicemail caller ID
- Gmail OAuth connection

---

## Data Models

### Campaign Lifecycle States

```
draft → enriching → ready_for_personalization → 
generating_emails → ready_to_send → live → completed
```

**State Descriptions**:
- **draft**: Initial creation, not yet populated
- **enriching**: Contact data being enhanced
- **ready_for_personalization**: Ready for message customization
- **generating_emails**: Mass email generation in progress
- **ready_to_send**: All content ready, awaiting launch
- **live**: Campaign actively running
- **completed**: Campaign finished

### Contact Status Progression

```
No Activity → Needs BDR → Received RSVP → 
Showed Up To Event → Post Event #1/2/3 → 
Received Agreement → Signed Agreement
```

**Special Statuses**:
- **No Activity**: Fresh contact, no interaction
- **Needs BDR**: Inbound reply received, requires manual handling
- **Received RSVP**: Confirmed event attendance
- **Showed Up To Event**: Physically attended
- **Post Event #1/2/3**: Follow-up sequence stages
- **Received Agreement**: E-signature document sent
- **Signed Agreement**: Contract executed

### Message Providers

- **twilio**: Twilio SMS
- **bonzo**: Bonzo SMS
- **smtp**: SMTP email
- **gmail**: Gmail via API
- **slybroadcast**: Voicemail drop

---

## Frontend Architecture

### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── CreateCampaignModal.tsx
│   ├── CreateLiveCampaignModal.tsx
│   ├── CreateFunnelTemplateModal.tsx
│   └── FunnelTableView.tsx
│
├── pages/               # Route components
│   ├── Dashboard.tsx
│   ├── Campaigns.tsx
│   ├── CampaignsLive.tsx
│   ├── CampaignDetail.tsx
│   ├── CampaignBuilder.tsx
│   ├── Templates.tsx
│   ├── TemplatesFunnel.tsx
│   ├── TemplateBuilder.tsx
│   ├── Inbox.tsx
│   ├── Leads.tsx
│   ├── AnalyticsMaster.tsx
│   ├── MediaLibrary.tsx
│   ├── Calendar.tsx
│   ├── Realtors.tsx
│   └── Settings.tsx
│
├── shared/              # Layout components
│   ├── AppLayout.tsx
│   └── Toasts.tsx
│
├── store/               # State management
│   └── useStore.ts
│
├── lib/                 # Utilities
│   └── api.ts
│
├── seed/                # Sample data
│   └── campaignSeed.ts
│
├── styles.css           # Global styles
└── main.tsx            # Application entry
```

### State Management (Zustand)

**Store Structure**:
```typescript
{
  // Campaign templates
  campaigns: CampaignMeta[],
  setCampaigns: (campaigns) => void,
  upsertCampaign: (campaign) => void,
  
  // Live campaigns
  liveCampaigns: LiveCampaign[],
  addLiveCampaign: (campaign) => void,
  updateLiveCampaign: (id, data) => void,
  
  // Content templates
  contentTemplates: ContentTemplate[],
  upsertContentTemplate: (template) => void,
  
  // UI state
  addToast: (toast) => void,
}
```

### Routing

**Routes**:
```
/ → Dashboard
/campaigns → Campaigns list
/campaigns/:id → Campaign detail
/campaigns/:id/builder → Visual builder
/templates → Templates list
/templates/funnel → Funnel templates
/templates/:id → Template builder
/inbox → Unified inbox
/leads → Contact management
/analytics → Analytics dashboard
/media → Media library
/calendar → Events calendar
/realtors → Team management
/settings → User settings
```

### API Client

**Base Configuration**:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Authentication
const token = localStorage.getItem('auth_token');
headers['Authorization'] = `Bearer ${token}`;
```

**API Modules**:
- `apiTemplates`: Template CRUD
- `apiContentTemplates`: Content template management
- `apiCampaigns`: Campaign operations
- `apiContacts`: Contact management
- `apiInbox`: Conversation handling
- `apiEmail`: Email sending
- `apiSms`: SMS sending
- `apiVoicemail`: Voicemail drops
- `apiAuth`: Authentication
- `apiGoogle`: Google OAuth
- `apiAI`: AI response generation

---

## Backend Architecture

### Directory Structure

```
src/
├── index.ts                # Main server file
└── services/
    ├── bonzoApi.ts         # Bonzo SMS integration
    ├── elevenLabs.ts       # Text-to-speech
    ├── mediaStore.ts       # In-memory media storage
    ├── smsProvider.ts      # SMS provider abstraction
    └── voicemailProvider.ts # Voicemail delivery
```

### Middleware Stack

```
Express App
  ├── cors()                    # CORS handling
  ├── express.json()            # JSON body parsing
  ├── express.urlencoded()      # Form data parsing
  ├── authMiddleware()          # JWT validation
  └── Routes
```

### Service Layer

#### **SMS Provider (`smsProvider.ts`)**
```typescript
async function sendSms({
  to: string,
  text: string,
  fromNumber?: string
}): Promise<{
  sent: boolean,
  sid?: string,
  provider: string
}>
```

**Logic**:
- Check `SMS_PROVIDER` environment variable
- Route to Twilio or Bonzo
- Return unified response format

#### **Bonzo API (`bonzoApi.ts`)**
```typescript
async function createProspect({
  firstName, lastName, email, phone, externalId
}): Promise<BonzoProspect>

async function optInProspect(
  prospectId: string,
  channel: 'sms' | 'email'
): Promise<boolean>
```

#### **ElevenLabs (`elevenLabs.ts`)**
```typescript
async function generateTtsMp3({
  script: string,
  voiceId?: string
}): Promise<{
  ok: boolean,
  audioUrl?: string,  // data URL or HTTP URL
  raw?: any
}>
```

#### **Media Store (`mediaStore.ts`)**
In-memory storage for temporary voicemail files:
```typescript
const store: Map<string, Buffer> = new Map();

function storeVoicemailMp3(buffer: Buffer): string
function getVoicemailMp3(id: string): Buffer | null
```

**Endpoint**: `GET /media/vm/:id.mp3`

**Purpose**: Temporary hosting for Slybroadcast audio URLs

#### **Voicemail Provider (`voicemailProvider.ts`)**
```typescript
async function sendVoicemailDrop({
  to: string,
  audioUrl?: string,
  callerId?: string,
  scheduleAt?: string,
  campaignId?: string
}): Promise<{
  queued: boolean,
  provider: string,
  id?: string,
  raw?: any
}>
```

**Providers**:
- DropCowboy (if `DROPCOWBOY_API_KEY` set)
- Slybroadcast (fallback)

---

## Automation Engine

### Execution Model

**Trigger Types**:
1. **Manual**: User clicks "Execute Campaign"
2. **Scheduled**: Time-based triggers (future)
3. **Event-Based**: Contact actions (future)

**Current Implementation** (Manual):
```typescript
POST /api/campaigns/:id/execute
{
  nodeKey?: string  // Optional: execute specific node
}

Process:
1. Load campaign nodes and edges
2. Filter by nodeKey if provided
3. Load all campaign contacts
4. For each contact:
   a. Resolve template or custom content
   b. Apply merge tags
   c. Send via appropriate channel
   d. Log to conversation
5. Return counts (smsSent, emailSent, vmQueued)
```

### Merge Tag Processing

**Function**: `renderMergeTags(input: string, context: object)`

**Context Structure**:
```typescript
{
  contact: {
    name, first_name, last_name,
    email, phone, company,
    city, state, status
  },
  campaign: {
    name, owner_name, owner_email, owner_phone,
    event_type, event_date, launch_date,
    city, state, video_link, event_link,
    hotel_name, hotel_address, calendly_link
  }
}
```

**Syntax**: `{{object.property}}`

**Examples**:
```
Input: "Hi {{contact.first_name}}, join us in {{campaign.city}}!"
Output: "Hi John, join us in Boston!"
```

### Content Resolution

#### **Email**
```typescript
1. Check node config for template_id
2. If template_id:
   a. Load from ContentTemplate table
   b. Use template subject & body
3. Else:
   a. Use custom content.subject & content.body
4. Apply merge tags
5. Send via SMTP or Gmail
```

#### **SMS**
```typescript
1. Check node config for template_id
2. If template_id:
   a. Load from ContentTemplate table
   b. Use template text
3. Else:
   a. Use custom content.text
4. Apply merge tags
5. Send via Twilio or Bonzo
6. Log to conversation
```

#### **Voicemail**
```typescript
1. Check node config for template_id
2. If template_id:
   a. Load from ContentTemplate table
   b. Use template tts_script
3. Else:
   a. Use custom tts.custom_script
4. Apply merge tags
5. Generate TTS audio (ElevenLabs)
6. Store MP3 temporarily
7. Generate public URL
8. Submit to voicemail provider
9. Return queued status
```

### Automation Check-Out System

**Purpose**: Pause automation when manual intervention needed

**Automatic Check-Out**:
```
Trigger: Contact replies to SMS/Email
Actions:
1. Set automationCheckedOut = true
2. Set automationPausedNodeKey = current stageKey
3. Set automationCheckedOutAt = now()
4. Update status = "Needs BDR"
```

**Manual Check-In**:
```
Trigger: BDR clicks "Check In to Automation"
Actions:
1. Set automationCheckedOut = false
2. Optionally resume from automationPausedNodeKey
3. Contact re-enters automation flow
```

**Use Cases**:
- Complex questions requiring human response
- Objection handling
- Qualification conversations
- Relationship building

---

## Communication Channels

### Email Delivery

**Providers**:
1. **SMTP (Nodemailer)**: Custom domain emails
2. **Gmail API**: OAuth-connected Gmail

**Send Flow (SMTP)**:
```typescript
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS }
});

await transporter.sendMail({
  from: SMTP_USER,
  to: contact.email,
  subject: mergedSubject,
  text: mergedBody
});
```

**Conversation Logging**:
```
1. Create or find conversation (channel: 'email')
2. Store message with direction: 'out'
3. Track provider and messageId
```

### SMS Delivery

**Providers**:
1. **Twilio** (Primary)
2. **Bonzo** (Alternative)

**Provider Selection**:
```typescript
const provider = process.env.SMS_PROVIDER || 'twilio';
```

**Send Flow (Twilio)**:
```typescript
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
const message = await client.messages.create({
  to: normalizedPhone,  // E.164 format
  from: TWILIO_PHONE_NUMBER,
  body: mergedText
});

return { sent: true, sid: message.sid, provider: 'twilio' };
```

**Phone Normalization**:
```
Input: "555-123-4567"
Output: "+15551234567" (E.164)

Process:
1. Strip non-digits
2. If 10 digits → prepend +1
3. If 11 digits starting with 1 → prepend +
```

**Inbound Handling**:
```
Twilio Webhook → POST /api/twilio/inbound-sms
  ↓
Parse From, To, Body
  ↓
Lookup contact by phone (last 10 digits)
  ↓
Create/update conversation
  ↓
Store inbound message
  ↓
Auto-checkout from automation
  ↓
Update status to "Needs BDR"
  ↓
Return empty TwiML: <Response></Response>
```

### Voicemail Delivery

**Process**:
```
1. Generate TTS Audio (ElevenLabs)
   - POST to ElevenLabs API
   - Receive MP3 buffer
   - Store in memory

2. Create Public URL
   - Generate unique ID
   - Store buffer: mediaStore.set(id, buffer)
   - URL: {PUBLIC_BASE_URL}/media/vm/{id}.mp3

3. Submit to Provider (Slybroadcast)
   - POST with form data
   - c_phone: destination
   - c_url: audio URL
   - c_callerID: caller ID
   - c_uid, c_password: auth

4. Provider Delivers
   - Directly to voicemail
   - No phone ringing
   - Natural voicemail notification
```

**TTS Generation**:
```typescript
const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
  {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: mergedScript,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  }
);

const audioBuffer = await response.arrayBuffer();
```

**Supported Voices**:
- Rachel (default): Natural American female
- Custom voices via ELEVENLABS_VOICE_ID

---

## Analytics & Reporting

### Dashboard Metrics

**Global Stats** (`GET /api/stats`):
```typescript
{
  enrolled: number,           // Total contacts
  messaged: number,           // Total messages sent
  respondedPos: number,       // Positive responses
  respondedQuestion: number,  // Questions asked
  respondedNeg: number,       // Negative responses (opt-outs)
  rsvpConfirmed: number,      // Event RSVPs
  attended: number,           // Actual attendance
  esignSent: number,          // Agreements sent
  signed: number,             // Agreements signed
  podioCreated: number,       // CRM records created
  campaigns: number,          // Active campaigns
  recentActivity: Message[],  // Last 5 activities
  messagesByDay: Array<{      // 30-day trend
    date: string,
    in: number,
    out: number
  }>
}
```

**Campaign Stats** (`GET /api/campaigns/:id/stats`):
```typescript
{
  totals: {
    contacts: number,
    messages: number,
    inbound: number,
    outbound: number
  },
  statusCounts: {
    "No Activity": number,
    "Needs BDR": number,
    "Received RSVP": number,
    // ... other statuses
  },
  funnel: {
    rsvpConfirmed: number,
    attended: number,
    esignSent: number,
    signed: number
  },
  messagesByDay: Array<{
    date: string,
    in: number,
    out: number
  }>,
  recentMessages: Message[]
}
```

### Chart Visualizations

#### **Line Chart** (Messages by Day)
- X-axis: Dates (last 30 days)
- Y-axis: Message count
- Series: Inbound (green), Outbound (blue)
- Responsive, legend at bottom

#### **Doughnut Chart** (Status Distribution)
- Segments: Contact statuses
- Colors: Auto-assigned from palette
- Tooltips: Show count per status
- Legend: Compact, below chart

#### **Gauge Charts** (Performance Metrics)
- Half-circle doughnut
- Three segments: Low (red), Med (yellow), High (green)
- Needle indicator (custom plugin)
- Center label with value

**Metrics**:
1. **Reach**: Total contacts (max: 40,000)
2. **Impressions**: Total messages (max: 40,000)
3. **Engagement**: Inbound responses (max: 15,000)
4. **Frequency**: Messages per contact (max: 12)

### Export Options

#### **CSV Export** (Contacts)
```typescript
// From Leads page
function exportContacts() {
  const csv = Papa.unparse(contacts, {
    columns: ['name', 'email', 'phone', 'company', 
              'status', 'city', 'state']
  });
  downloadFile(csv, 'contacts.csv');
}
```

#### **CSV Export** (Templates)
```http
GET /api/templates/:id/export/csv?versionId=optional

Format:
NodeID,NodeType,NodeName,ConfigJSON,PosX,PosY,
EdgeFrom,EdgeTo,EdgeConditionJSON

Example:
"n1","email_send","Initial Invite","{\"template_id\":\"...\"}",
100,200,"n1","n2","{\"after\":\"PT10M\"}"
```

#### **PDF Export** (Flow Diagrams)
```typescript
// From Template Builder
async function exportPDF() {
  const canvas = await html2canvas(flowCanvasElement);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });
  
  pdf.addImage(imgData, 'PNG', x, y, width, height);
  pdf.save('flow_diagram.pdf');
}
```

---

## File Storage & Media

### In-Memory Storage

**Voicemail MP3s** (`mediaStore.ts`):
```typescript
const store = new Map<string, Buffer>();

// Store MP3
const id = crypto.randomBytes(16).toString('hex');
store.set(id, audioBuffer);

// Retrieve MP3
GET /media/vm/:id.mp3
→ Returns MP3 with Content-Type: audio/mpeg
```

**Limitations**:
- **Ephemeral**: Lost on server restart
- **Memory**: Limited by server RAM
- **Purpose**: Temporary URLs for Slybroadcast

**Future Enhancement**:
- S3/CloudFlare R2 for persistent storage
- CDN for global distribution

### CSV Import/Export

**Template CSV Format**:
```
NodeID,NodeType,NodeName,ConfigJSON,PosX,PosY,EdgeFrom,EdgeTo,EdgeConditionJSON
"n1","email_send","Welcome Email","{...}",100,100,"n1","n2","{\"after\":\"PT1H\"}"
```

**Contact CSV Format**:
```
Name,Email,Phone,Company,City,State,Status
"John Smith","john@example.com","+15551234567","Acme Corp","Boston","MA","No Activity"
```

**Processing**:
- **Library**: Papaparse
- **Validation**: Row-by-row checks
- **Error Handling**: Skip invalid rows, report errors
- **Bulk Insert**: Prisma transactions for performance

---

## Development Workflow

### Local Development Setup

#### **Prerequisites**
```bash
# Required
- Node.js 20+
- pnpm 10+
- PostgreSQL 14+

# Optional
- Docker (for local database)
```

#### **Installation**
```bash
# 1. Clone repository
git clone https://github.com/yourusername/adtv-event-automation.git
cd adtv-event-automation

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your credentials

# 4. Setup database
cd apps/server
pnpm prisma:generate
pnpm prisma:deploy

# 5. Start development servers
# Terminal 1 - Backend
cd apps/server
pnpm dev

# Terminal 2 - Frontend
cd apps/web
pnpm dev
```

#### **Access**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

### Code Standards

#### **TypeScript**
- Strict mode enabled
- No implicit any
- Explicit return types on public functions
- Interface over type for objects

#### **Naming Conventions**
- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase (e.g., `CampaignBuilder.tsx`)
- **Functions**: camelCase (e.g., `sendEmail()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Interfaces**: PascalCase with "I" prefix (optional)

#### **Code Organization**
- **One component per file**
- **Related components in same directory**
- **Shared utilities in `/lib`**
- **Type definitions colocated or in types file**

#### **Comments**
```typescript
// Good: Explain WHY, not WHAT
// Retry logic for temporary network failures
const retryCount = 3;

// Bad: Redundant
// Set retry count to 3
const retryCount = 3;
```

### Git Workflow

#### **Branch Strategy**
```
main          ← Production (auto-deploy)
  ↓
feature/*     ← Feature development
bugfix/*      ← Bug fixes
hotfix/*      ← Critical production fixes
```

#### **Commit Messages**
```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

Examples:
feat(inbox): Add AI response generation
fix(analytics): Resolve gauge chart crash
docs(readme): Update deployment instructions
```

#### **Pull Request Process**
1. Create feature branch
2. Make changes
3. Test locally
4. Commit with descriptive message
5. Push to GitHub
6. Create PR (if using PR workflow)
7. Review and merge to main
8. Automatic deployment via Render

### Testing Strategy

#### **Current State**
- Manual testing
- Production monitoring

#### **Future Implementation**
```typescript
// Unit tests (Jest + React Testing Library)
describe('CampaignBuilder', () => {
  it('should create nodes', () => {
    // Test implementation
  });
});

// Integration tests (Supertest)
describe('POST /api/campaigns', () => {
  it('should create campaign', async () => {
    const response = await request(app)
      .post('/api/campaigns')
      .send(campaignData);
    expect(response.status).toBe(200);
  });
});

// E2E tests (Playwright)
test('complete campaign flow', async ({ page }) => {
  await page.goto('/campaigns/new');
  await page.fill('[name="name"]', 'Test Campaign');
  // ... more steps
});
```

---

## Monitoring & Logging

### Application Logging

#### **Backend Logging**
```typescript
// Success logs
console.log('[AI] Generate response request received for contactId:', id);
console.log('✓ AI endpoint registered at POST /api/ai/generate-response');

// Error logs
console.error('[AI] Gemini API error:', errorText);
console.error('[execute] ElevenLabs TTS failed', result.raw);
console.warn('[execute] Voicemail drop failed', { to, audioUrl, raw });
```

**Best Practices**:
- Prefix with component/feature: `[AI]`, `[execute]`, `[SMS]`
- Include relevant context (IDs, URLs, status)
- Use appropriate level (log, warn, error)
- Never log secrets or PII in detail

#### **Frontend Logging**
- Console errors for debugging
- Future: Sentry integration for error tracking

### Performance Monitoring

#### **Render Metrics**
- Request duration (p50, p95, p99)
- Error rate (4xx, 5xx)
- Memory usage
- CPU utilization

#### **Database Monitoring**
- Query performance
- Connection pool usage
- Slow query log

#### **Alerts**
- Service downtime
- High error rate (>5%)
- High memory usage (>80%)
- Database connection failures

### Health Checks

**Backend Health Endpoint**:
```typescript
app.get('/health', (req, res) => {
  res.json({ ok: true });
});
```

**Render Configuration**:
- Path: `/health`
- Interval: 30 seconds
- Timeout: 5 seconds
- Failure threshold: 3 attempts

### Error Tracking (Future)

**Sentry Integration**:
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

**Captured Events**:
- Unhandled exceptions
- API errors
- Component render errors
- User actions (breadcrumbs)

---

## Conclusion

The ADTV Event Automation Platform is a robust, production-ready system built with modern web technologies and best practices. It provides comprehensive event marketing automation with multi-channel communication, AI-powered assistance, and detailed analytics.

### Key Strengths
1. **Scalable Architecture**: Modular design supports growth
2. **Type Safety**: TypeScript throughout for reliability
3. **Visual Workflow Builder**: Intuitive campaign creation
4. **Multi-Channel**: Email, SMS, voicemail in one platform
5. **AI Integration**: Gemini-powered intelligent responses
6. **Real-Time Analytics**: Comprehensive performance tracking
7. **Automation Control**: Smart check-in/check-out system

### Future Enhancements
1. **Testing**: Unit, integration, and E2E test suites
2. **Performance**: Caching, CDN, database optimization
3. **Features**: Scheduled sends, A/B testing, advanced segmentation
4. **Integrations**: CRM sync, social media, additional SMS providers
5. **Monitoring**: Enhanced logging, error tracking, alerting
6. **Storage**: Persistent file storage (S3/R2)

### Support & Maintenance
- **Version**: 1.0
- **Status**: Production
- **Updates**: Continuous deployment via GitHub → Render
- **Documentation**: This file (keep updated with changes)

---

**Document Generated**: October 21, 2025  
**Platform Version**: 1.0  
**Last Updated**: October 21, 2025

