-- SQL Script to Populate CFO Insurance Campaign Mock Data
-- Campaign ID: live_qe1v81z2ye
-- Generated: 2026-01-06T17:13:02.699Z

BEGIN;


-- Contact 1: Chuck Maulbetsch
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_0_1767719582703', 'live_qe1v81z2ye', 'Chuck Maulbetsch', 'cmaulbetsch@chrisplacesenior.com', ''+1 734-997-7015', 'Maulbetsch Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2025-12-30T17:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_0_1767719582703', 'contact_cfo_0_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_0_1767719582703', 'conv_cfo_0_1767719582703', 'out', 'Hi Chuck,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_0', '2025-12-30T17:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 2: Emily Statler
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_1_1767719582703', 'live_qe1v81z2ye', 'Emily Statler', 'emily@starrbooks.ca', ''+1 604-868-7220', 'Statler Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-30T18:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_1_1767719582703', 'contact_cfo_1_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_1_1767719582703', 'conv_cfo_1_1767719582703', 'out', 'Hi Emily,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_1', '2025-12-30T18:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 3: Moh Noori
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_2_1767719582703', 'live_qe1v81z2ye', 'Moh Noori', 'moh@scriptchain.co', ''+1 925-206-2904', 'Noori Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2025-12-30T19:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_2_1767719582703', 'contact_cfo_2_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_2_1767719582703', 'conv_cfo_2_1767719582703', 'out', 'Hi Moh,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_2', '2025-12-30T19:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 4: Scott Walter
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_3_1767719582703', 'live_qe1v81z2ye', 'Scott Walter', 'scott.w@wscommunities.com', NULL, 'Walter Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2025-12-30T20:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_3_1767719582703', 'contact_cfo_3_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_3_1767719582703', 'conv_cfo_3_1767719582703', 'out', 'Hi Scott,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_3', '2025-12-30T20:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 5: Veronica Abdala
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_4_1767719582703', 'live_qe1v81z2ye', 'Veronica Abdala', 'veronica@unitepm.org', ''+1 305-227-2448', 'Abdala Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-30T21:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_4_1767719582703', 'contact_cfo_4_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_4_1767719582703', 'conv_cfo_4_1767719582703', 'out', 'Hi Veronica,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_4', '2025-12-30T21:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 6: Noah Navarro
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_5_1767719582703', 'live_qe1v81z2ye', 'Noah Navarro', 'noah@fastfirewatchguards.com', ''+1 800-899-7524', 'Navarro Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2025-12-30T22:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_5_1767719582703', 'contact_cfo_5_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_5_1767719582703', 'conv_cfo_5_1767719582703', 'out', 'Hi Noah,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_5', '2025-12-30T22:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 7: Kevin Guy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_6_1767719582703', 'live_qe1v81z2ye', 'Kevin Guy', 'kguy@realliquidity.com', ''+1 646-780-9282', 'Guy Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-30T23:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_6_1767719582703', 'contact_cfo_6_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_6_1767719582703', 'conv_cfo_6_1767719582703', 'out', 'Hi Kevin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_6', '2025-12-30T23:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 8: Pankaj Shukla
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_7_1767719582703', 'live_qe1v81z2ye', 'Pankaj Shukla', 'pankaj.shukla@simplifyem.com', ''+1 510-790-9066', 'Shukla Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2025-12-31T00:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_7_1767719582703', 'contact_cfo_7_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_7_1767719582703', 'conv_cfo_7_1767719582703', 'out', 'Hi Pankaj,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_7', '2025-12-31T00:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 9: Rob Neil
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_8_1767719582703', 'live_qe1v81z2ye', 'Rob Neil', 'rneil@catoncompanies.com', ''+1 434-977-4181', 'Neil Enterprises', 'Boston', 'MA', 'Received RSVP', 'N1', '2025-12-31T01:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_8_1767719582703', 'contact_cfo_8_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_8_1767719582703', 'conv_cfo_8_1767719582703', 'out', 'Hi Rob,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_8', '2025-12-31T01:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 10: Thiago Ducca
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_9_1767719582703', 'live_qe1v81z2ye', 'Thiago Ducca', 'thiago.ducca@mapro.io', NULL, 'Ducca Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T02:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_9_1767719582703', 'contact_cfo_9_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_9_1767719582703', 'conv_cfo_9_1767719582703', 'out', 'Hi Thiago,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582703_9', '2025-12-31T02:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 11: Vincent Gerin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_10_1767719582703', 'live_qe1v81z2ye', 'Vincent Gerin', 'vincent.gerin@anixton.com', ''+32 2 721 99 19', 'Gerin Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2025-12-31T03:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_10_1767719582703', 'contact_cfo_10_1767719582703', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_10_1767719582703', 'conv_cfo_10_1767719582703', 'out', 'Hi Vincent,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_10', '2025-12-31T03:13:02.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 12: Yan Tkach
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_11_1767719582704', 'live_qe1v81z2ye', 'Yan Tkach', 'yan@tkachventures.com', NULL, 'Tkach Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-31T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_11_1767719582704', 'contact_cfo_11_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_11_1767719582704', 'conv_cfo_11_1767719582704', 'out', 'Hi Yan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_11', '2025-12-31T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 13: Vic Ogburn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_12_1767719582704', 'live_qe1v81z2ye', 'Vic Ogburn', 'vic@eecapitalmanagement.com', ''+1 404-287-0074', 'Ogburn Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2025-12-31T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_12_1767719582704', 'contact_cfo_12_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_12_1767719582704', 'conv_cfo_12_1767719582704', 'out', 'Hi Vic,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_12', '2025-12-31T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 14: Alexia Valencia
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_13_1767719582704', 'live_qe1v81z2ye', 'Alexia Valencia', 'alexia@goodnesssakestrategies.com', NULL, 'Valencia Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2025-12-31T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_13_1767719582704', 'contact_cfo_13_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_13_1767719582704', 'conv_cfo_13_1767719582704', 'out', 'Hi Alexia,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_13', '2025-12-31T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 15: Rob Anderson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_14_1767719582704', 'live_qe1v81z2ye', 'Rob Anderson', 'rob.anderson@edengene.com', ''+44 20 7566 9500', 'Anderson Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_14_1767719582704', 'contact_cfo_14_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_14_1767719582704', 'conv_cfo_14_1767719582704', 'out', 'Hi Rob,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_14', '2025-12-31T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 16: Stephanie Costello
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_15_1767719582704', 'live_qe1v81z2ye', 'Stephanie Costello', 'steph.costello@cohnreznick.com', ''+1 212-297-0400', 'Costello Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2025-12-31T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_15_1767719582704', 'contact_cfo_15_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_15_1767719582704', 'conv_cfo_15_1767719582704', 'out', 'Hi Stephanie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_15', '2025-12-31T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 17: Sherry Orel
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_16_1767719582704', 'live_qe1v81z2ye', 'Sherry Orel', 'sherry@nextlevelcatapult.com', ''+1 312-914-1711', 'Orel Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2025-12-31T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_16_1767719582704', 'contact_cfo_16_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_16_1767719582704', 'conv_cfo_16_1767719582704', 'out', 'Hi Sherry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_16', '2025-12-31T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 18: Mark Holly
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_17_1767719582704', 'live_qe1v81z2ye', 'Mark Holly', 'mark.holly@crombie.ca', ''+1 902-755-8100', 'Holly Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2025-12-31T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_17_1767719582704', 'contact_cfo_17_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_17_1767719582704', 'conv_cfo_17_1767719582704', 'out', 'Hi Mark,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_17', '2025-12-31T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 19: Ross Lanier
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_18_1767719582704', 'live_qe1v81z2ye', 'Ross Lanier', 'ross@sirchifyco.com', NULL, 'Lanier Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2025-12-31T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_18_1767719582704', 'contact_cfo_18_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_18_1767719582704', 'conv_cfo_18_1767719582704', 'out', 'Hi Ross,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_18', '2025-12-31T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 20: Vann Vogstad
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_19_1767719582704', 'live_qe1v81z2ye', 'Vann Vogstad', 'vann@coho.life', ''+44 333 038 8099', 'Vogstad Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_19_1767719582704', 'contact_cfo_19_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_19_1767719582704', 'conv_cfo_19_1767719582704', 'out', 'Hi Vann,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_19', '2025-12-31T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 21: Eli Eskenazi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_20_1767719582704', 'live_qe1v81z2ye', 'Eli Eskenazi', 'eli@artekdesign.com', ''+1 786-449-2228', 'Eskenazi Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2025-12-31T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_20_1767719582704', 'contact_cfo_20_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_20_1767719582704', 'conv_cfo_20_1767719582704', 'out', 'Hi Eli,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_20', '2025-12-31T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 22: Urmi Kadia
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_21_1767719582704', 'live_qe1v81z2ye', 'Urmi Kadia', 'urmi@rpmg.us', ''+1 732-703-6301', 'Kadia Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2025-12-31T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_21_1767719582704', 'contact_cfo_21_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_21_1767719582704', 'conv_cfo_21_1767719582704', 'out', 'Hi Urmi,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_21', '2025-12-31T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 23: Michael Chernawsky
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_22_1767719582704', 'live_qe1v81z2ye', 'Michael Chernawsky', 'mchernawsky@chyaccounting.com', ''+1 604-345-0774', 'Chernawsky Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2025-12-31T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_22_1767719582704', 'contact_cfo_22_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_22_1767719582704', 'conv_cfo_22_1767719582704', 'out', 'Hi Michael,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_22', '2025-12-31T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 24: Pauline Yick
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_23_1767719582704', 'live_qe1v81z2ye', 'Pauline Yick', 'pauline.yick@auditor.on.ca', ''+1 416-327-2381', 'Yick Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2025-12-31T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_23_1767719582704', 'contact_cfo_23_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_23_1767719582704', 'conv_cfo_23_1767719582704', 'out', 'Hi Pauline,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_23', '2025-12-31T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 25: Ann-Marie Osinski
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_24_1767719582704', 'live_qe1v81z2ye', 'Ann-Marie Osinski', 'ann-marie.osinski@aware360.com', ''+1 403-252-5007', 'Osinski Enterprises', 'Austin', 'TX', 'Needs BDR', 'N1', '2025-12-30T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_24_1767719582704', 'contact_cfo_24_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_24_1767719582704', 'conv_cfo_24_1767719582704', 'out', 'Hi Ann-Marie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_24', '2025-12-30T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_24_1767719582704', 'conv_cfo_24_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_24', '2026-01-01T10:53:24.890Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 26: Henry Fitzpatrick
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_25_1767719582704', 'live_qe1v81z2ye', 'Henry Fitzpatrick', 'hfitzpatrick@corerealtyholdings.com', ''+1 949-863-1031', 'Fitzpatrick Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2025-12-30T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_25_1767719582704', 'contact_cfo_25_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_25_1767719582704', 'conv_cfo_25_1767719582704', 'out', 'Hi Henry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_25', '2025-12-30T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 27: James Black
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_26_1767719582704', 'live_qe1v81z2ye', 'James Black', 'jblack@perks.com.au', ''+61 8 8273 9300', 'Black Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2025-12-30T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_26_1767719582704', 'contact_cfo_26_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_26_1767719582704', 'conv_cfo_26_1767719582704', 'out', 'Hi James,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_26', '2025-12-30T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 28: Sam Erfan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_27_1767719582704', 'live_qe1v81z2ye', 'Sam Erfan', 'sam.e@provisioncpa.com', ''+1 604-273-6601', 'Erfan Enterprises', 'Chicago', 'IL', 'No Activity', 'N1', '2025-12-30T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_27_1767719582704', 'contact_cfo_27_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_27_1767719582704', 'conv_cfo_27_1767719582704', 'out', 'Hi Sam,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_27', '2025-12-30T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 29: Doug Bunker
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_28_1767719582704', 'live_qe1v81z2ye', 'Doug Bunker', 'dbunker@rivercitystaffing.com', ''+1 916-485-1588', 'Bunker Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2025-12-30T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_28_1767719582704', 'contact_cfo_28_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_28_1767719582704', 'conv_cfo_28_1767719582704', 'out', 'Hi Doug,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_28', '2025-12-30T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 30: Edward Aloe
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_29_1767719582704', 'live_qe1v81z2ye', 'Edward Aloe', 'ed.aloe@calcapadvisors.com', ''+1 626-229-9057', 'Aloe Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2025-12-30T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_29_1767719582704', 'contact_cfo_29_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_29_1767719582704', 'conv_cfo_29_1767719582704', 'out', 'Hi Edward,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_29', '2025-12-30T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 31: Aaron Ogburn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_30_1767719582704', 'live_qe1v81z2ye', 'Aaron Ogburn', 'aogburn@regionspest.com', ''+1 972-335-9595', 'Ogburn Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2025-12-30T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_30_1767719582704', 'contact_cfo_30_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_30_1767719582704', 'conv_cfo_30_1767719582704', 'out', 'Hi Aaron,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_30', '2025-12-30T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 32: Stacey Gilham
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_31_1767719582704', 'live_qe1v81z2ye', 'Stacey Gilham', 'stacey@retaillive.com', ''+1 512-230-4532', 'Gilham Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-31T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_31_1767719582704', 'contact_cfo_31_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_31_1767719582704', 'conv_cfo_31_1767719582704', 'out', 'Hi Stacey,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_31', '2025-12-31T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 33: Tom Pientka
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_32_1767719582704', 'live_qe1v81z2ye', 'Tom Pientka', 'tom@tukkaproperties.com', ''+1 608-664-3532', 'Pientka Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2025-12-31T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_32_1767719582704', 'contact_cfo_32_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_32_1767719582704', 'conv_cfo_32_1767719582704', 'out', 'Hi Tom,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_32', '2025-12-31T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 34: Inessa Shishmanyan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_33_1767719582704', 'live_qe1v81z2ye', 'Inessa Shishmanyan', 'ishishmanyan@samaritanhousesanmateo.org', ''+1 650-341-4081', 'Shishmanyan Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2025-12-31T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_33_1767719582704', 'contact_cfo_33_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_33_1767719582704', 'conv_cfo_33_1767719582704', 'out', 'Hi Inessa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_33', '2025-12-31T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 35: Henson Orser
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_34_1767719582704', 'live_qe1v81z2ye', 'Henson Orser', 'henson@twodots.net', ''+1 415-699-6416', 'Orser Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2025-12-31T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_34_1767719582704', 'contact_cfo_34_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_34_1767719582704', 'conv_cfo_34_1767719582704', 'out', 'Hi Henson,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_34', '2025-12-31T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 36: Andrea Manconi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_35_1767719582704', 'live_qe1v81z2ye', 'Andrea Manconi', 'andrea.manconi@ecmconsulting.it', ''+1 343-291-1096', 'Manconi Enterprises', 'New York', 'NY', 'Received RSVP', 'N1', '2025-12-31T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_35_1767719582704', 'contact_cfo_35_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_35_1767719582704', 'conv_cfo_35_1767719582704', 'out', 'Hi Andrea,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_35', '2025-12-31T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 37: Derek Kirton
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_36_1767719582704', 'live_qe1v81z2ye', 'Derek Kirton', 'dkirton@gauvreaucpa.ca', ''+1 705-745-8390', 'Kirton Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-31T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_36_1767719582704', 'contact_cfo_36_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_36_1767719582704', 'conv_cfo_36_1767719582704', 'out', 'Hi Derek,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_36', '2025-12-31T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 38: Joseph McMillan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_37_1767719582704', 'live_qe1v81z2ye', 'Joseph McMillan', 'jam@azurcos.com', NULL, 'McMillan Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2025-12-31T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_37_1767719582704', 'contact_cfo_37_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_37_1767719582704', 'conv_cfo_37_1767719582704', 'out', 'Hi Joseph,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_37', '2025-12-31T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 39: Brian Woodward
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_38_1767719582704', 'live_qe1v81z2ye', 'Brian Woodward', 'brian@leapcharities.org', ''+1 208-391-2823', 'Woodward Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2025-12-31T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_38_1767719582704', 'contact_cfo_38_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_38_1767719582704', 'conv_cfo_38_1767719582704', 'out', 'Hi Brian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_38', '2025-12-31T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 40: Ilija Stojanov
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_39_1767719582704', 'live_qe1v81z2ye', 'Ilija Stojanov', 'ilija@striverealty.com.au', NULL, 'Stojanov Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_39_1767719582704', 'contact_cfo_39_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_39_1767719582704', 'conv_cfo_39_1767719582704', 'out', 'Hi Ilija,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_39', '2025-12-31T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 41: Greg Proctor
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_40_1767719582704', 'live_qe1v81z2ye', 'Greg Proctor', 'greg@luminapartnersllc.com', ''+1 704-343-5779', 'Proctor Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2025-12-31T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_40_1767719582704', 'contact_cfo_40_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_40_1767719582704', 'conv_cfo_40_1767719582704', 'out', 'Hi Greg,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_40', '2025-12-31T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 42: Omar Farooq
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_41_1767719582704', 'live_qe1v81z2ye', 'Omar Farooq', 'omar.farooq@rheingroup.com', ''+92 52 3256666', 'Farooq Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-31T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_41_1767719582704', 'contact_cfo_41_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_41_1767719582704', 'conv_cfo_41_1767719582704', 'out', 'Hi Omar,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_41', '2025-12-31T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 43: Charles Tourtellotte
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_42_1767719582704', 'live_qe1v81z2ye', 'Charles Tourtellotte', 'charliet@laterradev.com', ''+1 310-552-0065', 'Tourtellotte Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2025-12-31T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_42_1767719582704', 'contact_cfo_42_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_42_1767719582704', 'conv_cfo_42_1767719582704', 'out', 'Hi Charles,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_42', '2025-12-31T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 44: Teresa Wessling
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_43_1767719582704', 'live_qe1v81z2ye', 'Teresa Wessling', 'teresa@fullcircleaccounting.net', ''+1 720-256-4919', 'Wessling Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2026-01-01T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_43_1767719582704', 'contact_cfo_43_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_43_1767719582704', 'conv_cfo_43_1767719582704', 'out', 'Hi Teresa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_43', '2026-01-01T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 45: Kathy Young
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_44_1767719582704', 'live_qe1v81z2ye', 'Kathy Young', 'kathy@tvnpa.org', ''+1 925-519-5610', 'Young Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-01T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_44_1767719582704', 'contact_cfo_44_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_44_1767719582704', 'conv_cfo_44_1767719582704', 'out', 'Hi Kathy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_44', '2026-01-01T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 46: Shaila Cordone
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_45_1767719582704', 'live_qe1v81z2ye', 'Shaila Cordone', 'shaila@stoladi.com', ''+1 202-319-1636', 'Cordone Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-01T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_45_1767719582704', 'contact_cfo_45_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_45_1767719582704', 'conv_cfo_45_1767719582704', 'out', 'Hi Shaila,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_45', '2026-01-01T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 47: Deeann Stinebaugh
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_46_1767719582704', 'live_qe1v81z2ye', 'Deeann Stinebaugh', 'deeanns@industrialequities.com', ''+1 612-332-1122', 'Stinebaugh Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-01T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_46_1767719582704', 'contact_cfo_46_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_46_1767719582704', 'conv_cfo_46_1767719582704', 'out', 'Hi Deeann,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_46', '2026-01-01T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 48: Alyssa Riojas
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_47_1767719582704', 'live_qe1v81z2ye', 'Alyssa Riojas', 'alyssa.riojas@realpage.com', ''+1 877-325-7423', 'Riojas Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-01T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_47_1767719582704', 'contact_cfo_47_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_47_1767719582704', 'conv_cfo_47_1767719582704', 'out', 'Hi Alyssa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_47', '2026-01-01T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 49: Goutam Bothra
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_48_1767719582704', 'live_qe1v81z2ye', 'Goutam Bothra', 'goutam.bothra.crps@cohnreznick.com', ''+1 212-297-0400', 'Bothra Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2025-12-31T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_48_1767719582704', 'contact_cfo_48_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_48_1767719582704', 'conv_cfo_48_1767719582704', 'out', 'Hi Goutam,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_48', '2025-12-31T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 50: Ricardo Rimeris
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_49_1767719582704', 'live_qe1v81z2ye', 'Ricardo Rimeris', 'ricardo@iceberg-refrigeration.com', ''+1 305-363-2001', 'Rimeris Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_49_1767719582704', 'contact_cfo_49_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_49_1767719582704', 'conv_cfo_49_1767719582704', 'out', 'Hi Ricardo,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_49', '2025-12-31T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 51: Michael Harry
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_50_1767719582704', 'live_qe1v81z2ye', 'Michael Harry', 'michael@invincicorp.com', ''+1 314-528-8060', 'Harry Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2025-12-31T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_50_1767719582704', 'contact_cfo_50_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_50_1767719582704', 'conv_cfo_50_1767719582704', 'out', 'Hi Michael,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_50', '2025-12-31T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 52: Ashley Honeyman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_51_1767719582704', 'live_qe1v81z2ye', 'Ashley Honeyman', 'ashley.honeyman@conseroglobal.com', ''+1 866-588-0495', 'Honeyman Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2025-12-31T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_51_1767719582704', 'contact_cfo_51_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_51_1767719582704', 'conv_cfo_51_1767719582704', 'out', 'Hi Ashley,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_51', '2025-12-31T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_51_1767719582704', 'conv_cfo_51_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_51', '2026-01-02T08:52:06.703Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 53: Christian Molden
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_52_1767719582704', 'live_qe1v81z2ye', 'Christian Molden', 'cmolden@blackshark.ai', ''+43 676 9045778', 'Molden Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2025-12-31T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_52_1767719582704', 'contact_cfo_52_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_52_1767719582704', 'conv_cfo_52_1767719582704', 'out', 'Hi Christian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_52', '2025-12-31T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 54: Alan Colman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_53_1767719582704', 'live_qe1v81z2ye', 'Alan Colman', 'acolman@gablesmgt.com', NULL, 'Colman Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2025-12-31T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_53_1767719582704', 'contact_cfo_53_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_53_1767719582704', 'conv_cfo_53_1767719582704', 'out', 'Hi Alan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_53', '2025-12-31T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 55: Kelli Mehrens
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_54_1767719582704', 'live_qe1v81z2ye', 'Kelli Mehrens', 'kelli.mehrens@avior.com', ''+1 619-297-1878', 'Mehrens Enterprises', 'Austin', 'TX', 'No Activity', 'N1', '2025-12-31T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_54_1767719582704', 'contact_cfo_54_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_54_1767719582704', 'conv_cfo_54_1767719582704', 'out', 'Hi Kelli,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_54', '2025-12-31T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 56: Andrew Reichert
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_55_1767719582704', 'live_qe1v81z2ye', 'Andrew Reichert', 'areichert@birgo.com', ''+1 412-567-1324', 'Reichert Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_55_1767719582704', 'contact_cfo_55_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_55_1767719582704', 'conv_cfo_55_1767719582704', 'out', 'Hi Andrew,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_55', '2026-01-01T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 57: Benjamin Kittl
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_56_1767719582704', 'live_qe1v81z2ye', 'Benjamin Kittl', 'benjamin.kittl@horesplus.com', ''+420 220 560 722', 'Kittl Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-01T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_56_1767719582704', 'contact_cfo_56_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_56_1767719582704', 'conv_cfo_56_1767719582704', 'out', 'Hi Benjamin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_56', '2026-01-01T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 58: Patrick Madison
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_57_1767719582704', 'live_qe1v81z2ye', 'Patrick Madison', 'pmadison@cedarst.com', ''+1 312-506-3200', 'Madison Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-01T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_57_1767719582704', 'contact_cfo_57_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_57_1767719582704', 'conv_cfo_57_1767719582704', 'out', 'Hi Patrick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_57', '2026-01-01T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 59: Michael McKeen
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_58_1767719582704', 'live_qe1v81z2ye', 'Michael McKeen', 'mmckeen@epcrealestate.com', ''+1 913-800-8310', 'McKeen Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-01T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_58_1767719582704', 'contact_cfo_58_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_58_1767719582704', 'conv_cfo_58_1767719582704', 'out', 'Hi Michael,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_58', '2026-01-01T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 60: Ravi Nand
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_59_1767719582704', 'live_qe1v81z2ye', 'Ravi Nand', 'ravi@moneytreeaccounting.com.au', ''+61 2 9553 1879', 'Nand Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-01T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_59_1767719582704', 'contact_cfo_59_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_59_1767719582704', 'conv_cfo_59_1767719582704', 'out', 'Hi Ravi,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_59', '2026-01-01T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 61: Susan Levi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_60_1767719582704', 'live_qe1v81z2ye', 'Susan Levi', 'susan@jinjihr.com', ''+1 818-600-2787', 'Levi Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_60_1767719582704', 'contact_cfo_60_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_60_1767719582704', 'conv_cfo_60_1767719582704', 'out', 'Hi Susan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_60', '2026-01-01T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 62: Avneet Kaur
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_61_1767719582704', 'live_qe1v81z2ye', 'Avneet Kaur', 'avneet@grewalguyatt.ca', ''+1 905-479-1700', 'Kaur Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-01T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_61_1767719582704', 'contact_cfo_61_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_61_1767719582704', 'conv_cfo_61_1767719582704', 'out', 'Hi Avneet,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_61', '2026-01-01T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 63: Rebekah Manley
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_62_1767719582704', 'live_qe1v81z2ye', 'Rebekah Manley', 'rebekah.manley@onetide.com.au', ''+61 409 366 814', 'Manley Enterprises', 'Chicago', 'IL', 'Received RSVP', 'N1', '2026-01-01T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_62_1767719582704', 'contact_cfo_62_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_62_1767719582704', 'conv_cfo_62_1767719582704', 'out', 'Hi Rebekah,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_62', '2026-01-01T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 64: Fritz Bailey
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_63_1767719582704', 'live_qe1v81z2ye', 'Fritz Bailey', 'fbailey@baileymgt.com', ''+1 651-224-5482', 'Bailey Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-01T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_63_1767719582704', 'contact_cfo_63_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_63_1767719582704', 'conv_cfo_63_1767719582704', 'out', 'Hi Fritz,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_63', '2026-01-01T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 65: Nadine Eap
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_64_1767719582704', 'live_qe1v81z2ye', 'Nadine Eap', 'neap@groupepur.ca', ''+1 888-787-1188', 'Eap Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-01T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_64_1767719582704', 'contact_cfo_64_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_64_1767719582704', 'conv_cfo_64_1767719582704', 'out', 'Hi Nadine,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_64', '2026-01-01T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 66: Gill Daniels
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_65_1767719582704', 'live_qe1v81z2ye', 'Gill Daniels', 'gill.daniels@block7.co.uk', NULL, 'Daniels Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_65_1767719582704', 'contact_cfo_65_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_65_1767719582704', 'conv_cfo_65_1767719582704', 'out', 'Hi Gill,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_65', '2026-01-01T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 67: Charles Guedo
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_66_1767719582704', 'live_qe1v81z2ye', 'Charles Guedo', 'charlesg@8amsolutions.com', ''+1 825-305-1232', 'Guedo Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-01T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_66_1767719582704', 'contact_cfo_66_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_66_1767719582704', 'conv_cfo_66_1767719582704', 'out', 'Hi Charles,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_66', '2026-01-01T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 68: Ced Celestin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_67_1767719582704', 'live_qe1v81z2ye', 'Ced Celestin', 'ced@funder1.com', NULL, 'Celestin Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2026-01-01T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_67_1767719582704', 'contact_cfo_67_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_67_1767719582704', 'conv_cfo_67_1767719582704', 'out', 'Hi Ced,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_67', '2026-01-01T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 69: Jannine Hardman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_68_1767719582704', 'live_qe1v81z2ye', 'Jannine Hardman', 'jannine.hardman@mutualtrust.com.au', ''+61 8 8407 1300', 'Hardman Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-01T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_68_1767719582704', 'contact_cfo_68_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_68_1767719582704', 'conv_cfo_68_1767719582704', 'out', 'Hi Jannine,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_68', '2026-01-01T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 70: Shirley Wolff
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_69_1767719582704', 'live_qe1v81z2ye', 'Shirley Wolff', 'shirley.wolff@enkel.ca', ''+1 604-259-6234', 'Wolff Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-01T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_69_1767719582704', 'contact_cfo_69_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_69_1767719582704', 'conv_cfo_69_1767719582704', 'out', 'Hi Shirley,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_69', '2026-01-01T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 71: Stephanie Folahan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_70_1767719582704', 'live_qe1v81z2ye', 'Stephanie Folahan', 'stephanie@premiertaxhalifax.com', ''+1 902-817-2636', 'Folahan Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2026-01-01T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_70_1767719582704', 'contact_cfo_70_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_70_1767719582704', 'conv_cfo_70_1767719582704', 'out', 'Hi Stephanie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_70', '2026-01-01T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 72: John Thompson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_71_1767719582704', 'live_qe1v81z2ye', 'John Thompson', 'jthompson@dentonfloyd.com', ''+1 502-339-0755', 'Thompson Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-01T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_71_1767719582704', 'contact_cfo_71_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_71_1767719582704', 'conv_cfo_71_1767719582704', 'out', 'Hi John,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_71', '2026-01-01T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 73: Kristen Steeves
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_72_1767719582704', 'live_qe1v81z2ye', 'Kristen Steeves', 'ksteeves@cpanewbrunswick.ca', ''+1 506-830-3300', 'Steeves Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2025-12-31T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_72_1767719582704', 'contact_cfo_72_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_72_1767719582704', 'conv_cfo_72_1767719582704', 'out', 'Hi Kristen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_72', '2025-12-31T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 74: Monica Worline
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_73_1767719582704', 'live_qe1v81z2ye', 'Monica Worline', 'monica@enlivenwork.com', NULL, 'Worline Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2025-12-31T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_73_1767719582704', 'contact_cfo_73_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_73_1767719582704', 'conv_cfo_73_1767719582704', 'out', 'Hi Monica,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_73', '2025-12-31T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 75: Brian Holland
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_74_1767719582704', 'live_qe1v81z2ye', 'Brian Holland', 'bholland@dtnmgt.com', ''+1 517-482-4545', 'Holland Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2025-12-31T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_74_1767719582704', 'contact_cfo_74_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_74_1767719582704', 'conv_cfo_74_1767719582704', 'out', 'Hi Brian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_74', '2025-12-31T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 76: Gerry Kelly
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_75_1767719582704', 'live_qe1v81z2ye', 'Gerry Kelly', 'gerry@optusapp.com', NULL, 'Kelly Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2025-12-31T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_75_1767719582704', 'contact_cfo_75_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_75_1767719582704', 'conv_cfo_75_1767719582704', 'out', 'Hi Gerry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_75', '2025-12-31T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 77: Nathan Davies
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_76_1767719582704', 'live_qe1v81z2ye', 'Nathan Davies', 'nathan@rda.net.au', ''+61 8 8338 7800', 'Davies Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2025-12-31T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_76_1767719582704', 'contact_cfo_76_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_76_1767719582704', 'conv_cfo_76_1767719582704', 'out', 'Hi Nathan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_76', '2025-12-31T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 78: Oisin Clancy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_77_1767719582704', 'live_qe1v81z2ye', 'Oisin Clancy', 'oisin@inhabitsolar.com', ''+1 646-650-2716', 'Clancy Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2025-12-31T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_77_1767719582704', 'contact_cfo_77_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_77_1767719582704', 'conv_cfo_77_1767719582704', 'out', 'Hi Oisin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_77', '2025-12-31T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 79: Alina Iordache
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_78_1767719582704', 'live_qe1v81z2ye', 'Alina Iordache', 'alina@theharbourgroup.com', ''+1 416-361-3315', 'Iordache Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2025-12-31T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_78_1767719582704', 'contact_cfo_78_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_78_1767719582704', 'conv_cfo_78_1767719582704', 'out', 'Hi Alina,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_78', '2025-12-31T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_78_1767719582704', 'conv_cfo_78_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_78', '2026-01-01T18:37:48.573Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 80: Marko Ribaric
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_79_1767719582704', 'live_qe1v81z2ye', 'Marko Ribaric', 'mribaric@novomatic.com', ''+43 2252 6060', 'Ribaric Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-01T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_79_1767719582704', 'contact_cfo_79_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_79_1767719582704', 'conv_cfo_79_1767719582704', 'out', 'Hi Marko,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_79', '2026-01-01T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 81: Laura Martin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_80_1767719582704', 'live_qe1v81z2ye', 'Laura Martin', 'lmartin@gencare-inc.com', NULL, 'Martin Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-01T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_80_1767719582704', 'contact_cfo_80_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_80_1767719582704', 'conv_cfo_80_1767719582704', 'out', 'Hi Laura,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_80', '2026-01-01T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 82: Karmel Rashidi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_81_1767719582704', 'live_qe1v81z2ye', 'Karmel Rashidi', 'karmel@ozps.com.au', NULL, 'Rashidi Enterprises', 'San Francisco', 'CA', 'Received RSVP', 'N1', '2026-01-01T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_81_1767719582704', 'contact_cfo_81_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_81_1767719582704', 'conv_cfo_81_1767719582704', 'out', 'Hi Karmel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_81', '2026-01-01T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_81_1767719582704', 'conv_cfo_81_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_81', '2026-01-01T22:07:00.865Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 83: Patrick Quinn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_82_1767719582704', 'live_qe1v81z2ye', 'Patrick Quinn', 'pquinn@nextchapterproperties.com', ''+1 217-356-3511', 'Quinn Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-01T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_82_1767719582704', 'contact_cfo_82_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_82_1767719582704', 'conv_cfo_82_1767719582704', 'out', 'Hi Patrick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_82', '2026-01-01T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 84: Mayra Swanson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_83_1767719582704', 'live_qe1v81z2ye', 'Mayra Swanson', 'mayra@moneypropertyinc.com', ''+1 619-422-0177', 'Swanson Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-01T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_83_1767719582704', 'contact_cfo_83_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_83_1767719582704', 'conv_cfo_83_1767719582704', 'out', 'Hi Mayra,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_83', '2026-01-01T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 85: Muriel Langdon
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_84_1767719582704', 'live_qe1v81z2ye', 'Muriel Langdon', 'mlangdon@pattillore.com', ''+1 678-926-5900', 'Langdon Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-01T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_84_1767719582704', 'contact_cfo_84_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_84_1767719582704', 'conv_cfo_84_1767719582704', 'out', 'Hi Muriel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_84', '2026-01-01T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 86: Nicole Taylor
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_85_1767719582704', 'live_qe1v81z2ye', 'Nicole Taylor', 'ntaylor@siliconvalleycf.org', ''+1 650-450-5400', 'Taylor Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-02T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_85_1767719582704', 'contact_cfo_85_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_85_1767719582704', 'conv_cfo_85_1767719582704', 'out', 'Hi Nicole,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_85', '2026-01-02T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 87: Evelyn Dore
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_86_1767719582704', 'live_qe1v81z2ye', 'Evelyn Dore', 'evelyn@asxproperties.com', ''+1 337-534-8165', 'Dore Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2026-01-02T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_86_1767719582704', 'contact_cfo_86_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_86_1767719582704', 'conv_cfo_86_1767719582704', 'out', 'Hi Evelyn,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_86', '2026-01-02T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 88: Mara Hunt
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_87_1767719582704', 'live_qe1v81z2ye', 'Mara Hunt', 'mara@mrealestatepro.com', NULL, 'Hunt Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-02T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_87_1767719582704', 'contact_cfo_87_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_87_1767719582704', 'conv_cfo_87_1767719582704', 'out', 'Hi Mara,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_87', '2026-01-02T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 89: Louise Banks
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_88_1767719582704', 'live_qe1v81z2ye', 'Louise Banks', 'louise@propertygurupro.com', NULL, 'Banks Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-02T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_88_1767719582704', 'contact_cfo_88_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_88_1767719582704', 'conv_cfo_88_1767719582704', 'out', 'Hi Louise,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_88', '2026-01-02T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 90: Terry Baynes
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_89_1767719582704', 'live_qe1v81z2ye', 'Terry Baynes', 'tb@blackoakcapital.com.au', ''+61 8 6143 4577', 'Baynes Enterprises', 'Austin', 'TX', 'Received RSVP', 'N1', '2026-01-02T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_89_1767719582704', 'contact_cfo_89_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_89_1767719582704', 'conv_cfo_89_1767719582704', 'out', 'Hi Terry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_89', '2026-01-02T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 91: Alex Bolotovsky
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_90_1767719582704', 'live_qe1v81z2ye', 'Alex Bolotovsky', 'alex@jleaders.org', NULL, 'Bolotovsky Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-02T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_90_1767719582704', 'contact_cfo_90_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_90_1767719582704', 'conv_cfo_90_1767719582704', 'out', 'Hi Alex,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_90', '2026-01-02T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 92: Andrius Ziauberis
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_91_1767719582704', 'live_qe1v81z2ye', 'Andrius Ziauberis', 'andrius.ziauberis@bcwolves.com', ''+370 660 95494', 'Ziauberis Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-02T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_91_1767719582704', 'contact_cfo_91_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_91_1767719582704', 'conv_cfo_91_1767719582704', 'out', 'Hi Andrius,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_91', '2026-01-02T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 93: Christopher McKellar
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_92_1767719582704', 'live_qe1v81z2ye', 'Christopher McKellar', 'chris@mckellarmcgowan.com', ''+1 858-252-2181', 'McKellar Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-02T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_92_1767719582704', 'contact_cfo_92_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_92_1767719582704', 'conv_cfo_92_1767719582704', 'out', 'Hi Christopher,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_92', '2026-01-02T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 94: Nick Melrose
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_93_1767719582704', 'live_qe1v81z2ye', 'Nick Melrose', 'nmelrose@melrose-capital.com', ''+1 641-330-4019', 'Melrose Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-02T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_93_1767719582704', 'contact_cfo_93_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_93_1767719582704', 'conv_cfo_93_1767719582704', 'out', 'Hi Nick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_93', '2026-01-02T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 95: Przemek Matylla
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_94_1767719582704', 'live_qe1v81z2ye', 'Przemek Matylla', 'przemek@optidash.ai', ''+49 174 1775577', 'Matylla Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-02T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_94_1767719582704', 'contact_cfo_94_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_94_1767719582704', 'conv_cfo_94_1767719582704', 'out', 'Hi Przemek,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_94', '2026-01-02T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 96: Jeremy Davis
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_95_1767719582704', 'live_qe1v81z2ye', 'Jeremy Davis', 'jdavis@northpointkc.com', ''+1 816-888-7380', 'Davis Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-02T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_95_1767719582704', 'contact_cfo_95_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_95_1767719582704', 'conv_cfo_95_1767719582704', 'out', 'Hi Jeremy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_95', '2026-01-02T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 97: Mick Silver
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_96_1767719582704', 'live_qe1v81z2ye', 'Mick Silver', 'mick.silver@moovshack.com', ''+44 20 3011 0077', 'Silver Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-01T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_96_1767719582704', 'contact_cfo_96_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_96_1767719582704', 'conv_cfo_96_1767719582704', 'out', 'Hi Mick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_96', '2026-01-01T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 98: Jason Skinner
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_97_1767719582704', 'live_qe1v81z2ye', 'Jason Skinner', 'jason@skinnerhamilton.com.au', ''+61 7 5594 3434', 'Skinner Enterprises', 'Chicago', 'IL', 'Needs BDR', 'N1', '2026-01-01T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_97_1767719582704', 'contact_cfo_97_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_97_1767719582704', 'conv_cfo_97_1767719582704', 'out', 'Hi Jason,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_97', '2026-01-01T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 99: Johnny Sengelmann
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_98_1767719582704', 'live_qe1v81z2ye', 'Johnny Sengelmann', 'johnny@blumountain.me', NULL, 'Sengelmann Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-01T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_98_1767719582704', 'contact_cfo_98_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_98_1767719582704', 'conv_cfo_98_1767719582704', 'out', 'Hi Johnny,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_98', '2026-01-01T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 100: David Rolfe
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_99_1767719582704', 'live_qe1v81z2ye', 'David Rolfe', 'david.rolfe@ergeagroup.com', NULL, 'Rolfe Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-01T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_99_1767719582704', 'contact_cfo_99_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_99_1767719582704', 'conv_cfo_99_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_99', '2026-01-01T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 101: Betsy Fairbanks
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_100_1767719582704', 'live_qe1v81z2ye', 'Betsy Fairbanks', 'betsy@fundfornonviolence.org', ''+1 831-460-9321', 'Fairbanks Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_100_1767719582704', 'contact_cfo_100_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_100_1767719582704', 'conv_cfo_100_1767719582704', 'out', 'Hi Betsy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_100', '2026-01-01T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 102: Tyler Sellars
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_101_1767719582704', 'live_qe1v81z2ye', 'Tyler Sellars', 'tyler@trycactus.com', NULL, 'Sellars Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-01T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_101_1767719582704', 'contact_cfo_101_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_101_1767719582704', 'conv_cfo_101_1767719582704', 'out', 'Hi Tyler,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_101', '2026-01-01T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 103: Walid Hachem
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_102_1767719582704', 'live_qe1v81z2ye', 'Walid Hachem', 'walid@rwc-me.com', ''+1 732-623-9124', 'Hachem Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-01T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_102_1767719582704', 'contact_cfo_102_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_102_1767719582704', 'conv_cfo_102_1767719582704', 'out', 'Hi Walid,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_102', '2026-01-01T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 104: Joel Friedman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_103_1767719582704', 'live_qe1v81z2ye', 'Joel Friedman', 'joel@jfcocpa.com', ''+1 732-719-7810', 'Friedman Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-02T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_103_1767719582704', 'contact_cfo_103_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_103_1767719582704', 'conv_cfo_103_1767719582704', 'out', 'Hi Joel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_103', '2026-01-02T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 105: Matthew Woods
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_104_1767719582704', 'live_qe1v81z2ye', 'Matthew Woods', 'mwoods@apartmentlist.com', ''+1 415-400-5483', 'Woods Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_104_1767719582704', 'contact_cfo_104_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_104_1767719582704', 'conv_cfo_104_1767719582704', 'out', 'Hi Matthew,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_104', '2026-01-02T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 106: Naheed Memon
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_105_1767719582704', 'live_qe1v81z2ye', 'Naheed Memon', 'n.memon@oraclepower.co.uk', ''+44 20 3580 4314', 'Memon Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2026-01-02T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_105_1767719582704', 'contact_cfo_105_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_105_1767719582704', 'conv_cfo_105_1767719582704', 'out', 'Hi Naheed,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_105', '2026-01-02T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_105_1767719582704', 'conv_cfo_105_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_105', '2026-01-03T03:57:40.886Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 107: Nicole Wilde
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_106_1767719582704', 'live_qe1v81z2ye', 'Nicole Wilde', 'nicole@thenuuco.com.au', NULL, 'Wilde Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-02T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_106_1767719582704', 'contact_cfo_106_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_106_1767719582704', 'conv_cfo_106_1767719582704', 'out', 'Hi Nicole,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_106', '2026-01-02T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 108: John Smith
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_107_1767719582704', 'live_qe1v81z2ye', 'John Smith', 'johnbsmith@realtimemicro.com', ''+1 858-847-3393', 'Smith Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-02T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_107_1767719582704', 'contact_cfo_107_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_107_1767719582704', 'conv_cfo_107_1767719582704', 'out', 'Hi John,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_107', '2026-01-02T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 109: Jacqi Galea
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_108_1767719582704', 'live_qe1v81z2ye', 'Jacqi Galea', 'jacqi.g@officialmealsononewheels.org', NULL, 'Galea Enterprises', 'Boston', 'MA', 'Received RSVP', 'N1', '2026-01-02T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_108_1767719582704', 'contact_cfo_108_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_108_1767719582704', 'conv_cfo_108_1767719582704', 'out', 'Hi Jacqi,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_108', '2026-01-02T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_108_1767719582704', 'conv_cfo_108_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_108', '2026-01-03T12:15:48.768Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 110: Vinki Loomba
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_109_1767719582704', 'live_qe1v81z2ye', 'Vinki Loomba', 'vinki@loombainvest.com', ''+1 925-322-0873', 'Loomba Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_109_1767719582704', 'contact_cfo_109_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_109_1767719582704', 'conv_cfo_109_1767719582704', 'out', 'Hi Vinki,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_109', '2026-01-02T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 111: Emad Shawwa
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_110_1767719582704', 'live_qe1v81z2ye', 'Emad Shawwa', 'emad@capitaltrustre.com', ''+1 305-668-6500', 'Shawwa Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-02T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_110_1767719582704', 'contact_cfo_110_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_110_1767719582704', 'conv_cfo_110_1767719582704', 'out', 'Hi Emad,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_110', '2026-01-02T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 112: AG Ccim
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_111_1767719582704', 'live_qe1v81z2ye', 'AG Ccim', 'ag@apusa1.com', ''+1 662-746-8000', 'Ccim Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-02T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_111_1767719582704', 'contact_cfo_111_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_111_1767719582704', 'conv_cfo_111_1767719582704', 'out', 'Hi AG,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_111', '2026-01-02T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 113: John Alexander
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_112_1767719582704', 'live_qe1v81z2ye', 'John Alexander', 'jalexander@cadesky.com', ''+1 416-498-9500', 'Alexander Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-02T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_112_1767719582704', 'contact_cfo_112_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_112_1767719582704', 'conv_cfo_112_1767719582704', 'out', 'Hi John,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_112', '2026-01-02T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 114: Olesia Kloster
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_113_1767719582704', 'live_qe1v81z2ye', 'Olesia Kloster', 'okloster@accountingone.ca', NULL, 'Kloster Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2026-01-02T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_113_1767719582704', 'contact_cfo_113_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_113_1767719582704', 'conv_cfo_113_1767719582704', 'out', 'Hi Olesia,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_113', '2026-01-02T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 115: Lynne Atkins
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_114_1767719582704', 'live_qe1v81z2ye', 'Lynne Atkins', 'lynne@rankfirstmedia.com', ''+1 850-800-9278', 'Atkins Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_114_1767719582704', 'contact_cfo_114_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_114_1767719582704', 'conv_cfo_114_1767719582704', 'out', 'Hi Lynne,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_114', '2026-01-02T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 116: David Newell
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_115_1767719582704', 'live_qe1v81z2ye', 'David Newell', 'david@innertruth.org', NULL, 'Newell Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-02T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_115_1767719582704', 'contact_cfo_115_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_115_1767719582704', 'conv_cfo_115_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_115', '2026-01-02T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 117: Sasha Aickin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_116_1767719582704', 'live_qe1v81z2ye', 'Sasha Aickin', 'sasha@getlibretto.com', ''+1 415-786-3095', 'Aickin Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2026-01-02T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_116_1767719582704', 'contact_cfo_116_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_116_1767719582704', 'conv_cfo_116_1767719582704', 'out', 'Hi Sasha,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_116', '2026-01-02T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 118: Lupa Brandt
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_117_1767719582704', 'live_qe1v81z2ye', 'Lupa Brandt', 'lupa@phoenixtransitionprogram.com', ''+1 770-875-1287', 'Brandt Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-02T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_117_1767719582704', 'contact_cfo_117_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_117_1767719582704', 'conv_cfo_117_1767719582704', 'out', 'Hi Lupa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_117', '2026-01-02T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 119: Syed Ca
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_118_1767719582704', 'live_qe1v81z2ye', 'Syed Ca', 'syed@syedpartners.com.au', ''+61 2 8959 9357', 'Ca Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-02T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_118_1767719582704', 'contact_cfo_118_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_118_1767719582704', 'conv_cfo_118_1767719582704', 'out', 'Hi Syed,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_118', '2026-01-02T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 120: Austin Kennedy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_119_1767719582704', 'live_qe1v81z2ye', 'Austin Kennedy', 'austin@risemarkets.io', ''+1 206-359-5599', 'Kennedy Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_119_1767719582704', 'contact_cfo_119_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_119_1767719582704', 'conv_cfo_119_1767719582704', 'out', 'Hi Austin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_119', '2026-01-02T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 121: Dave Freund
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_120_1767719582704', 'live_qe1v81z2ye', 'Dave Freund', 'dave@leaseleads.co', ''+1 888-445-0861', 'Freund Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_120_1767719582704', 'contact_cfo_120_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_120_1767719582704', 'conv_cfo_120_1767719582704', 'out', 'Hi Dave,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_120', '2026-01-01T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 122: Jesse Hitt
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_121_1767719582704', 'live_qe1v81z2ye', 'Jesse Hitt', 'jesse@payhoa.com', NULL, 'Hitt Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2026-01-01T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_121_1767719582704', 'contact_cfo_121_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_121_1767719582704', 'conv_cfo_121_1767719582704', 'out', 'Hi Jesse,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_121', '2026-01-01T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 123: Todd Wood
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_122_1767719582704', 'live_qe1v81z2ye', 'Todd Wood', 'twood@christophertodd.com', ''+1 877-596-1200', 'Wood Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-01T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_122_1767719582704', 'contact_cfo_122_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_122_1767719582704', 'conv_cfo_122_1767719582704', 'out', 'Hi Todd,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_122', '2026-01-01T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 124: Alan Winer
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_123_1767719582704', 'live_qe1v81z2ye', 'Alan Winer', 'awiner@harbourmortgage.ca', ''+1 416-361-3315', 'Winer Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-01T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_123_1767719582704', 'contact_cfo_123_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_123_1767719582704', 'conv_cfo_123_1767719582704', 'out', 'Hi Alan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_123', '2026-01-01T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 125: Brian Anderson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_124_1767719582704', 'live_qe1v81z2ye', 'Brian Anderson', 'brian@voyage.llc', NULL, 'Anderson Enterprises', 'Austin', 'TX', 'Needs BDR', 'N1', '2026-01-01T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_124_1767719582704', 'contact_cfo_124_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_124_1767719582704', 'conv_cfo_124_1767719582704', 'out', 'Hi Brian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_124', '2026-01-01T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 126: Candice McKay
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_125_1767719582704', 'live_qe1v81z2ye', 'Candice McKay', 'cmckay@bakertilly.ca', ''+1 519-725-2539', 'McKay Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-01T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_125_1767719582704', 'contact_cfo_125_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_125_1767719582704', 'conv_cfo_125_1767719582704', 'out', 'Hi Candice,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_125', '2026-01-01T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 127: Ian Hosking-Richards
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_126_1767719582704', 'live_qe1v81z2ye', 'Ian Hosking-Richards', 'ian@rocketpropertygroup.com.au', ''+61 1300 850 038', 'Hosking-Richards Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-01T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_126_1767719582704', 'contact_cfo_126_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_126_1767719582704', 'conv_cfo_126_1767719582704', 'out', 'Hi Ian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_126', '2026-01-01T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 128: Kevin Jones
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_127_1767719582704', 'live_qe1v81z2ye', 'Kevin Jones', 'kevin.jones@cwbpm.com', ''+1 614-793-2244', 'Jones Enterprises', 'Chicago', 'IL', 'No Activity', 'N1', '2026-01-03T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_127_1767719582704', 'contact_cfo_127_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_127_1767719582704', 'conv_cfo_127_1767719582704', 'out', 'Hi Kevin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_127', '2026-01-03T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 129: Stephen Vick
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_128_1767719582704', 'live_qe1v81z2ye', 'Stephen Vick', 'stephen.vick@guardianliving.com.au', ''+61 1300 452 732', 'Vick Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_128_1767719582704', 'contact_cfo_128_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_128_1767719582704', 'conv_cfo_128_1767719582704', 'out', 'Hi Stephen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_128', '2026-01-03T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 130: Joel Lefebvre
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_129_1767719582704', 'live_qe1v81z2ye', 'Joel Lefebvre', 'jlefebvre@groupe-lefebvre.com', ''+1 450-491-6444', 'Lefebvre Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-03T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_129_1767719582704', 'contact_cfo_129_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_129_1767719582704', 'conv_cfo_129_1767719582704', 'out', 'Hi Joel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_129', '2026-01-03T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 131: Agron Miloti
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_130_1767719582704', 'live_qe1v81z2ye', 'Agron Miloti', 'amiloti@cdnglobal.com', ''+1 604-697-3077', 'Miloti Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-03T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_130_1767719582704', 'contact_cfo_130_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_130_1767719582704', 'conv_cfo_130_1767719582704', 'out', 'Hi Agron,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_130', '2026-01-03T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 132: Kat Briggs
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_131_1767719582704', 'live_qe1v81z2ye', 'Kat Briggs', 'kat@keyproperties.io', ''+1 201-836-6100', 'Briggs Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-03T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_131_1767719582704', 'contact_cfo_131_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_131_1767719582704', 'conv_cfo_131_1767719582704', 'out', 'Hi Kat,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_131', '2026-01-03T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 133: Stig Hauge
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_132_1767719582704', 'live_qe1v81z2ye', 'Stig Hauge', 'stig@finnrent.com', ''+1 651-287-9830', 'Hauge Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2026-01-03T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_132_1767719582704', 'contact_cfo_132_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_132_1767719582704', 'conv_cfo_132_1767719582704', 'out', 'Hi Stig,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_132', '2026-01-03T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 134: Beth Tallarico
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_133_1767719582704', 'live_qe1v81z2ye', 'Beth Tallarico', 'btallarico@mentoring.org', ''+1 617-303-4600', 'Tallarico Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_133_1767719582704', 'contact_cfo_133_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_133_1767719582704', 'conv_cfo_133_1767719582704', 'out', 'Hi Beth,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_133', '2026-01-03T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 135: Rav Nagpal
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_134_1767719582704', 'live_qe1v81z2ye', 'Rav Nagpal', 'rav@stemcapitaladvisors.com', ''+1 888-462-5773', 'Nagpal Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-03T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_134_1767719582704', 'contact_cfo_134_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_134_1767719582704', 'conv_cfo_134_1767719582704', 'out', 'Hi Rav,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_134', '2026-01-03T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 136: Allen Sammut
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_135_1767719582704', 'live_qe1v81z2ye', 'Allen Sammut', 'allen@sammutdevelopments.com.au', ''+61 2 9542 7366', 'Sammut Enterprises', 'New York', 'NY', 'Received RSVP', 'N1', '2026-01-03T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_135_1767719582704', 'contact_cfo_135_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_135_1767719582704', 'conv_cfo_135_1767719582704', 'out', 'Hi Allen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_135', '2026-01-03T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_135_1767719582704', 'conv_cfo_135_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_135', '2026-01-04T04:13:36.629Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 137: Tom Watson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_136_1767719582704', 'live_qe1v81z2ye', 'Tom Watson', 'tom@portpropmgt.com', ''+1 207-761-0832', 'Watson Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-03T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_136_1767719582704', 'contact_cfo_136_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_136_1767719582704', 'conv_cfo_136_1767719582704', 'out', 'Hi Tom,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_136', '2026-01-03T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 138: Monique Holden
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_137_1767719582704', 'live_qe1v81z2ye', 'Monique Holden', 'moniqueh@trillium-pm.com', ''+1 562-433-3473', 'Holden Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-03T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_137_1767719582704', 'contact_cfo_137_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_137_1767719582704', 'conv_cfo_137_1767719582704', 'out', 'Hi Monique,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_137', '2026-01-03T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 139: Syed Shahan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_138_1767719582704', 'live_qe1v81z2ye', 'Syed Shahan', 'sshan@geopaqlogic.com', ''+1 949-207-7195', 'Shahan Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_138_1767719582704', 'contact_cfo_138_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_138_1767719582704', 'conv_cfo_138_1767719582704', 'out', 'Hi Syed,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_138', '2026-01-03T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 140: Sarah Clark
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_139_1767719582704', 'live_qe1v81z2ye', 'Sarah Clark', 'sarah@canbnb.com.au', ''+61 2 6152 8308', 'Clark Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-03T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_139_1767719582704', 'contact_cfo_139_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_139_1767719582704', 'conv_cfo_139_1767719582704', 'out', 'Hi Sarah,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_139', '2026-01-03T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 141: Alex Severn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_140_1767719582704', 'live_qe1v81z2ye', 'Alex Severn', 'alex.severn@capitoldataanalytics.com', ''+1 402-981-2638', 'Severn Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2026-01-03T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_140_1767719582704', 'contact_cfo_140_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_140_1767719582704', 'conv_cfo_140_1767719582704', 'out', 'Hi Alex,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_140', '2026-01-03T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 142: Carrie Barone
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_141_1767719582704', 'live_qe1v81z2ye', 'Carrie Barone', 'cbarone@kentempletongroup.com', ''+1 702-873-6700', 'Barone Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-03T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_141_1767719582704', 'contact_cfo_141_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_141_1767719582704', 'conv_cfo_141_1767719582704', 'out', 'Hi Carrie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_141', '2026-01-03T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 143: Daniel Rodriguez
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_142_1767719582704', 'live_qe1v81z2ye', 'Daniel Rodriguez', 'drodriguez@critpa.com', NULL, 'Rodriguez Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-03T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_142_1767719582704', 'contact_cfo_142_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_142_1767719582704', 'conv_cfo_142_1767719582704', 'out', 'Hi Daniel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_142', '2026-01-03T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 144: Jake Reus
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_143_1767719582704', 'live_qe1v81z2ye', 'Jake Reus', 'jake@reus.com.au', ''+61 2 9548 1399', 'Reus Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2026-01-03T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_143_1767719582704', 'contact_cfo_143_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_143_1767719582704', 'conv_cfo_143_1767719582704', 'out', 'Hi Jake,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_143', '2026-01-03T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 145: Mark Mosch
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_144_1767719582704', 'live_qe1v81z2ye', 'Mark Mosch', 'markm@andmarkadvisors.com', ''+1 213-348-7711', 'Mosch Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_144_1767719582704', 'contact_cfo_144_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_144_1767719582704', 'conv_cfo_144_1767719582704', 'out', 'Hi Mark,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_144', '2026-01-02T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 146: Ross Kinchen
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_145_1767719582704', 'live_qe1v81z2ye', 'Ross Kinchen', 'ross@thekinchengroup.com', ''+1 225-567-6202', 'Kinchen Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-02T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_145_1767719582704', 'contact_cfo_145_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_145_1767719582704', 'conv_cfo_145_1767719582704', 'out', 'Hi Ross,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_145', '2026-01-02T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 147: Karthik Ramalingam
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_146_1767719582704', 'live_qe1v81z2ye', 'Karthik Ramalingam', 'karthik@codelinkd.com', ''+1 669-247-7007', 'Ramalingam Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-02T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_146_1767719582704', 'contact_cfo_146_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_146_1767719582704', 'conv_cfo_146_1767719582704', 'out', 'Hi Karthik,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_146', '2026-01-02T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 148: Eli Vaknin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_147_1767719582704', 'live_qe1v81z2ye', 'Eli Vaknin', 'eli@fidelitymanagementgroup.com', ''+1 845-231-1033', 'Vaknin Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-02T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_147_1767719582704', 'contact_cfo_147_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_147_1767719582704', 'conv_cfo_147_1767719582704', 'out', 'Hi Eli,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_147', '2026-01-02T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 149: Rob Anderson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_148_1767719582704', 'live_qe1v81z2ye', 'Rob Anderson', 'rob@bayviewfinancial.ca', ''+1 204-515-4005', 'Anderson Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2026-01-02T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_148_1767719582704', 'contact_cfo_148_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_148_1767719582704', 'conv_cfo_148_1767719582704', 'out', 'Hi Rob,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_148', '2026-01-02T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 150: Priti Lad
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_149_1767719582704', 'live_qe1v81z2ye', 'Priti Lad', 'ladp@pritiladcpa.ca', ''+1 343-307-4790', 'Lad Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-02T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_149_1767719582704', 'contact_cfo_149_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_149_1767719582704', 'conv_cfo_149_1767719582704', 'out', 'Hi Priti,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_149', '2026-01-02T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 151: Anton Pillay
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_150_1767719582704', 'live_qe1v81z2ye', 'Anton Pillay', 'apillay@coronation.com', ''+27 21 680 2000', 'Pillay Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-02T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_150_1767719582704', 'contact_cfo_150_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_150_1767719582704', 'conv_cfo_150_1767719582704', 'out', 'Hi Anton,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_150', '2026-01-02T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 152: Graeme Brown
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_151_1767719582704', 'live_qe1v81z2ye', 'Graeme Brown', 'graeme.brown@qreserve.com', ''+1 289-426-3217', 'Brown Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2026-01-03T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_151_1767719582704', 'contact_cfo_151_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_151_1767719582704', 'conv_cfo_151_1767719582704', 'out', 'Hi Graeme,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_151', '2026-01-03T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 153: Mike McLenehan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_152_1767719582704', 'live_qe1v81z2ye', 'Mike McLenehan', 'mike@mclenehan.com', ''+1 204-505-3113', 'McLenehan Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-03T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_152_1767719582704', 'contact_cfo_152_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_152_1767719582704', 'conv_cfo_152_1767719582704', 'out', 'Hi Mike,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_152', '2026-01-03T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 154: Jacinta O''Connell
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_153_1767719582704', 'live_qe1v81z2ye', 'Jacinta O''Connell', 'jacinta@calculatedmatters.com.au', ''+61 483 948 128', 'O''Connell Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-03T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_153_1767719582704', 'contact_cfo_153_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_153_1767719582704', 'conv_cfo_153_1767719582704', 'out', 'Hi Jacinta,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_153', '2026-01-03T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 155: Nissen Brenenson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_154_1767719582704', 'live_qe1v81z2ye', 'Nissen Brenenson', 'nissen@candorcap.com', ''+1 718-395-1875', 'Brenenson Enterprises', 'Austin', 'TX', 'No Activity', 'N1', '2026-01-03T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_154_1767719582704', 'contact_cfo_154_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_154_1767719582704', 'conv_cfo_154_1767719582704', 'out', 'Hi Nissen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_154', '2026-01-03T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 156: Chris Nagy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_155_1767719582704', 'live_qe1v81z2ye', 'Chris Nagy', 'chris.nagy@caseware.com', ''+1 416-867-9504', 'Nagy Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-03T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_155_1767719582704', 'contact_cfo_155_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_155_1767719582704', 'conv_cfo_155_1767719582704', 'out', 'Hi Chris,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_155', '2026-01-03T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 157: Lubomir Tzolov
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_156_1767719582704', 'live_qe1v81z2ye', 'Lubomir Tzolov', 'ltzolov@novomatic.com', ''+43 2252 6060', 'Tzolov Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-03T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_156_1767719582704', 'contact_cfo_156_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_156_1767719582704', 'conv_cfo_156_1767719582704', 'out', 'Hi Lubomir,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_156', '2026-01-03T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 158: Rafael Winter
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_157_1767719582704', 'live_qe1v81z2ye', 'Rafael Winter', 'rafael.winter@leadit.ch', NULL, 'Winter Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-03T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_157_1767719582704', 'contact_cfo_157_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_157_1767719582704', 'conv_cfo_157_1767719582704', 'out', 'Hi Rafael,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_157', '2026-01-03T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 159: Riley Fairbanks
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_158_1767719582704', 'live_qe1v81z2ye', 'Riley Fairbanks', 'rileyf@8amsolutions.com', ''+1 825-305-1232', 'Fairbanks Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_158_1767719582704', 'contact_cfo_158_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_158_1767719582704', 'conv_cfo_158_1767719582704', 'out', 'Hi Riley,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_158', '2026-01-03T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 160: Grace Reyes
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_159_1767719582704', 'live_qe1v81z2ye', 'Grace Reyes', 'grace@tidexchange.com', NULL, 'Reyes Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-03T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_159_1767719582704', 'contact_cfo_159_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_159_1767719582704', 'conv_cfo_159_1767719582704', 'out', 'Hi Grace,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_159', '2026-01-03T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 161: Jamie Russo
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_160_1767719582704', 'live_qe1v81z2ye', 'Jamie Russo', 'jamie@everythingcoworking.com', NULL, 'Russo Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-03T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_160_1767719582704', 'contact_cfo_160_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_160_1767719582704', 'conv_cfo_160_1767719582704', 'out', 'Hi Jamie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_160', '2026-01-03T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 162: John Orban
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_161_1767719582704', 'live_qe1v81z2ye', 'John Orban', 'jorban@greenbrookre.com', NULL, 'Orban Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-03T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_161_1767719582704', 'contact_cfo_161_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_161_1767719582704', 'conv_cfo_161_1767719582704', 'out', 'Hi John,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_161', '2026-01-03T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 163: Alikiah Barclay
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_162_1767719582704', 'live_qe1v81z2ye', 'Alikiah Barclay', 'alikiahb@reimaginerent.com', NULL, 'Barclay Enterprises', 'Chicago', 'IL', 'Received RSVP', 'N1', '2026-01-03T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_162_1767719582704', 'contact_cfo_162_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_162_1767719582704', 'conv_cfo_162_1767719582704', 'out', 'Hi Alikiah,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_162', '2026-01-03T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_162_1767719582704', 'conv_cfo_162_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_162', '2026-01-04T18:58:09.537Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 164: Robert Sackett
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_163_1767719582704', 'live_qe1v81z2ye', 'Robert Sackett', 'rsackett@midmark.com', ''+1 937-526-3662', 'Sackett Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_163_1767719582704', 'contact_cfo_163_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_163_1767719582704', 'conv_cfo_163_1767719582704', 'out', 'Hi Robert,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_163', '2026-01-03T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 165: Teresa Reed
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_164_1767719582704', 'live_qe1v81z2ye', 'Teresa Reed', 'teresa@mangrovehousing.com.au', NULL, 'Reed Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-03T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_164_1767719582704', 'contact_cfo_164_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_164_1767719582704', 'conv_cfo_164_1767719582704', 'out', 'Hi Teresa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_164', '2026-01-03T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 166: Titian Rosati
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_165_1767719582704', 'live_qe1v81z2ye', 'Titian Rosati', 'trosati@rosatiwang.com', NULL, 'Rosati Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-03T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_165_1767719582704', 'contact_cfo_165_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_165_1767719582704', 'conv_cfo_165_1767719582704', 'out', 'Hi Titian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_165', '2026-01-03T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 167: Chris Christofi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_166_1767719582704', 'live_qe1v81z2ye', 'Chris Christofi', 'cchristofi@catalystcapital.com', ''+44 20 7290 5100', 'Christofi Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-03T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_166_1767719582704', 'contact_cfo_166_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_166_1767719582704', 'conv_cfo_166_1767719582704', 'out', 'Hi Chris,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_166', '2026-01-03T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 168: Pamela Steer
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_167_1767719582704', 'live_qe1v81z2ye', 'Pamela Steer', 'psteer@cpacanada.ca', ''+1 416-977-0748', 'Steer Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2026-01-03T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_167_1767719582704', 'contact_cfo_167_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_167_1767719582704', 'conv_cfo_167_1767719582704', 'out', 'Hi Pamela,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_167', '2026-01-03T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 169: Rich Lebrun
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_168_1767719582704', 'live_qe1v81z2ye', 'Rich Lebrun', 'rich@lebrunadvisorygroup.com', ''+1 847-912-4310', 'Lebrun Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-02T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_168_1767719582704', 'contact_cfo_168_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_168_1767719582704', 'conv_cfo_168_1767719582704', 'out', 'Hi Rich,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_168', '2026-01-02T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 170: Seft Hunter
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_169_1767719582704', 'live_qe1v81z2ye', 'Seft Hunter', 'seft@cco.org', ''+1 202-224-5721', 'Hunter Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-03T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_169_1767719582704', 'contact_cfo_169_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_169_1767719582704', 'conv_cfo_169_1767719582704', 'out', 'Hi Seft,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_169', '2026-01-03T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 171: Sameer Shibroor
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_170_1767719582704', 'live_qe1v81z2ye', 'Sameer Shibroor', 'sameer.shibroor@exalenze.com', ''+91 20486 06557', 'Shibroor Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2026-01-03T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_170_1767719582704', 'contact_cfo_170_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_170_1767719582704', 'conv_cfo_170_1767719582704', 'out', 'Hi Sameer,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_170', '2026-01-03T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 172: Eva Hill
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_171_1767719582704', 'live_qe1v81z2ye', 'Eva Hill', 'eva.hill@ventureoaksre.com', ''+1 916-236-1042', 'Hill Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-03T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_171_1767719582704', 'contact_cfo_171_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_171_1767719582704', 'conv_cfo_171_1767719582704', 'out', 'Hi Eva,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_171', '2026-01-03T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 173: James Lloyd
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_172_1767719582704', 'live_qe1v81z2ye', 'James Lloyd', 'jlloyd@generationalco.com', ''+1 512-853-9650', 'Lloyd Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-03T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_172_1767719582704', 'contact_cfo_172_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_172_1767719582704', 'conv_cfo_172_1767719582704', 'out', 'Hi James,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_172', '2026-01-03T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 174: Stephen Chris
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_173_1767719582704', 'live_qe1v81z2ye', 'Stephen Chris', 'schris@bakertilly.ca', ''+1 519-725-2539', 'Chris Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_173_1767719582704', 'contact_cfo_173_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_173_1767719582704', 'conv_cfo_173_1767719582704', 'out', 'Hi Stephen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_173', '2026-01-03T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 175: Roger Sanchez
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_174_1767719582704', 'live_qe1v81z2ye', 'Roger Sanchez', 'roger@uncomn-projects.com', NULL, 'Sanchez Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-03T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_174_1767719582704', 'contact_cfo_174_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_174_1767719582704', 'conv_cfo_174_1767719582704', 'out', 'Hi Roger,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_174', '2026-01-03T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 176: Ted Hawkins
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_175_1767719582704', 'live_qe1v81z2ye', 'Ted Hawkins', 'thawkins@pittwaterindustrial.com.au', NULL, 'Hawkins Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2026-01-04T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_175_1767719582704', 'contact_cfo_175_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_175_1767719582704', 'conv_cfo_175_1767719582704', 'out', 'Hi Ted,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_175', '2026-01-04T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 177: Tamrin Apaydin
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_176_1767719582704', 'live_qe1v81z2ye', 'Tamrin Apaydin', 'tapaydin@proterraco.com', ''+1 719-476-0800', 'Apaydin Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-04T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_176_1767719582704', 'contact_cfo_176_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_176_1767719582704', 'conv_cfo_176_1767719582704', 'out', 'Hi Tamrin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_176', '2026-01-04T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 178: Dustin Martelo
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_177_1767719582704', 'live_qe1v81z2ye', 'Dustin Martelo', 'dustin@groverton.com', NULL, 'Martelo Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-04T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_177_1767719582704', 'contact_cfo_177_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_177_1767719582704', 'conv_cfo_177_1767719582704', 'out', 'Hi Dustin,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_177', '2026-01-04T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 179: Joseph Marino
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_178_1767719582704', 'live_qe1v81z2ye', 'Joseph Marino', 'jmarino@varroportal.com', ''+1 312-470-0812', 'Marino Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2026-01-04T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_178_1767719582704', 'contact_cfo_178_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_178_1767719582704', 'conv_cfo_178_1767719582704', 'out', 'Hi Joseph,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_178', '2026-01-04T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 180: Katy Ralph
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_179_1767719582704', 'live_qe1v81z2ye', 'Katy Ralph', 'katy@ralphsayer.com', ''+44 13 1225 5567', 'Ralph Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_179_1767719582704', 'contact_cfo_179_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_179_1767719582704', 'conv_cfo_179_1767719582704', 'out', 'Hi Katy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_179', '2026-01-04T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 181: Muhammad Azam
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_180_1767719582704', 'live_qe1v81z2ye', 'Muhammad Azam', 'azam@royalarc.ca', ''+1 905-829-9991', 'Azam Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-04T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_180_1767719582704', 'contact_cfo_180_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_180_1767719582704', 'conv_cfo_180_1767719582704', 'out', 'Hi Muhammad,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_180', '2026-01-04T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 182: Debbie Snelling
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_181_1767719582704', 'live_qe1v81z2ye', 'Debbie Snelling', 'debbie@ngtaxsolutions.com', ''+1 770-735-3336', 'Snelling Enterprises', 'San Francisco', 'CA', 'Received RSVP', 'N1', '2026-01-04T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_181_1767719582704', 'contact_cfo_181_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_181_1767719582704', 'conv_cfo_181_1767719582704', 'out', 'Hi Debbie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_181', '2026-01-04T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 183: Jackie Appleby
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_182_1767719582704', 'live_qe1v81z2ye', 'Jackie Appleby', 'jackie@diligentassistant.ca', ''+1 403-879-2571', 'Appleby Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-04T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_182_1767719582704', 'contact_cfo_182_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_182_1767719582704', 'conv_cfo_182_1767719582704', 'out', 'Hi Jackie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_182', '2026-01-04T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 184: Simon McGuire
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_183_1767719582704', 'live_qe1v81z2ye', 'Simon McGuire', 'simon@aurorapacific.com.au', NULL, 'McGuire Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-04T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_183_1767719582704', 'contact_cfo_183_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_183_1767719582704', 'conv_cfo_183_1767719582704', 'out', 'Hi Simon,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_183', '2026-01-04T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 185: Jeff Jerden
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_184_1767719582704', 'live_qe1v81z2ye', 'Jeff Jerden', 'jjerden@greenbrookre.com', NULL, 'Jerden Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_184_1767719582704', 'contact_cfo_184_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_184_1767719582704', 'conv_cfo_184_1767719582704', 'out', 'Hi Jeff,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_184', '2026-01-04T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 186: Chad Ossip
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_185_1767719582704', 'live_qe1v81z2ye', 'Chad Ossip', 'chad@livelihoodpay.com', ''+1 647-349-6262', 'Ossip Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-04T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_185_1767719582704', 'contact_cfo_185_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_185_1767719582704', 'conv_cfo_185_1767719582704', 'out', 'Hi Chad,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_185', '2026-01-04T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 187: Tony Mestres
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_186_1767719582704', 'live_qe1v81z2ye', 'Tony Mestres', 'tmestres@sobrato.com', ''+1 650-876-7010', 'Mestres Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2026-01-04T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_186_1767719582704', 'contact_cfo_186_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_186_1767719582704', 'conv_cfo_186_1767719582704', 'out', 'Hi Tony,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_186', '2026-01-04T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 188: Michelle Atefi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_187_1767719582704', 'live_qe1v81z2ye', 'Michelle Atefi', 'michelle@prosourceaccounting.com', ''+1 888-730-3360', 'Atefi Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-04T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_187_1767719582704', 'contact_cfo_187_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_187_1767719582704', 'conv_cfo_187_1767719582704', 'out', 'Hi Michelle,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_187', '2026-01-04T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 189: Robert Kulhawy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_188_1767719582704', 'live_qe1v81z2ye', 'Robert Kulhawy', 'robert.kulhawy@commerx.com', ''+1 403-301-3883', 'Kulhawy Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-04T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_188_1767719582704', 'contact_cfo_188_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_188_1767719582704', 'conv_cfo_188_1767719582704', 'out', 'Hi Robert,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_188', '2026-01-04T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 190: Maty Jamal
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_189_1767719582704', 'live_qe1v81z2ye', 'Maty Jamal', 'maty@magasi.co', ''+1 786-753-8844', 'Jamal Enterprises', 'Austin', 'TX', 'Received RSVP', 'N1', '2026-01-04T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_189_1767719582704', 'contact_cfo_189_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_189_1767719582704', 'conv_cfo_189_1767719582704', 'out', 'Hi Maty,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_189', '2026-01-04T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_189_1767719582704', 'conv_cfo_189_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_189', '2026-01-05T16:23:20.045Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 191: William Lopez
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_190_1767719582704', 'live_qe1v81z2ye', 'William Lopez', 'bill@livo.io', ''+1 833-333-5486', 'Lopez Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-04T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_190_1767719582704', 'contact_cfo_190_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_190_1767719582704', 'conv_cfo_190_1767719582704', 'out', 'Hi William,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_190', '2026-01-04T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 192: Rajesh Agrawal
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_191_1767719582704', 'live_qe1v81z2ye', 'Rajesh Agrawal', 'rajesh.agrawal@profoundedutech.com', ''+91 20 2544 2223', 'Agrawal Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-04T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_191_1767719582704', 'contact_cfo_191_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_191_1767719582704', 'conv_cfo_191_1767719582704', 'out', 'Hi Rajesh,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_191', '2026-01-04T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 193: Dave McCrady
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_192_1767719582704', 'live_qe1v81z2ye', 'Dave McCrady', 'dave.mccrady@zendelity.com', ''+1 613-369-5075', 'McCrady Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-03T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_192_1767719582704', 'contact_cfo_192_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_192_1767719582704', 'conv_cfo_192_1767719582704', 'out', 'Hi Dave,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_192', '2026-01-03T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 194: Sudipa Shrestha
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_193_1767719582704', 'live_qe1v81z2ye', 'Sudipa Shrestha', 'sudipa.shrestha@cohnreznick.com', ''+1 212-297-0400', 'Shrestha Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_193_1767719582704', 'contact_cfo_193_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_193_1767719582704', 'conv_cfo_193_1767719582704', 'out', 'Hi Sudipa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_193', '2026-01-03T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 195: Macy Troyer
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_194_1767719582704', 'live_qe1v81z2ye', 'Macy Troyer', 'macy@itsgoaldy.com', ''+1 812-276-7161', 'Troyer Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-03T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_194_1767719582704', 'contact_cfo_194_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_194_1767719582704', 'conv_cfo_194_1767719582704', 'out', 'Hi Macy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_194', '2026-01-03T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 196: Nick Morrison
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_195_1767719582704', 'live_qe1v81z2ye', 'Nick Morrison', 'nick@flinncopm.com', ''+1 226-637-0789', 'Morrison Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-03T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_195_1767719582704', 'contact_cfo_195_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_195_1767719582704', 'conv_cfo_195_1767719582704', 'out', 'Hi Nick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_195', '2026-01-03T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 197: Amanda Jurica
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_196_1767719582704', 'live_qe1v81z2ye', 'Amanda Jurica', 'amanda@symmetry-cm.com', ''+1 361-452-3648', 'Jurica Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-03T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_196_1767719582704', 'contact_cfo_196_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_196_1767719582704', 'conv_cfo_196_1767719582704', 'out', 'Hi Amanda,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_196', '2026-01-03T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 198: Sherry Dsilva
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_197_1767719582704', 'live_qe1v81z2ye', 'Sherry Dsilva', 'sherry@lovesembrace.org', NULL, 'Dsilva Enterprises', 'Chicago', 'IL', 'Needs BDR', 'N1', '2026-01-03T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_197_1767719582704', 'contact_cfo_197_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_197_1767719582704', 'conv_cfo_197_1767719582704', 'out', 'Hi Sherry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_197', '2026-01-03T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 199: Nathan Quinlivan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_198_1767719582704', 'live_qe1v81z2ye', 'Nathan Quinlivan', 'nathan.quinlivan@kirinari.com.au', ''+61 1300 547 462', 'Quinlivan Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-03T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_198_1767719582704', 'contact_cfo_198_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_198_1767719582704', 'conv_cfo_198_1767719582704', 'out', 'Hi Nathan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_198', '2026-01-03T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 200: Gokhul K
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_199_1767719582704', 'live_qe1v81z2ye', 'Gokhul K', 'gk@sqftks.com', ''+91 94452 35845', 'K Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-04T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_199_1767719582704', 'contact_cfo_199_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_199_1767719582704', 'conv_cfo_199_1767719582704', 'out', 'Hi Gokhul,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_199', '2026-01-04T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 201: Kelly Allred
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_200_1767719582704', 'live_qe1v81z2ye', 'Kelly Allred', 'kallred@acventures.com', ''+1 707-935-3700', 'Allred Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-04T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_200_1767719582704', 'contact_cfo_200_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_200_1767719582704', 'conv_cfo_200_1767719582704', 'out', 'Hi Kelly,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_200', '2026-01-04T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 202: Zachary Kestenbaum
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_201_1767719582704', 'live_qe1v81z2ye', 'Zachary Kestenbaum', 'zachary@buildinglink.com', ''+1 212-501-7117', 'Kestenbaum Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-04T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_201_1767719582704', 'contact_cfo_201_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_201_1767719582704', 'conv_cfo_201_1767719582704', 'out', 'Hi Zachary,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_201', '2026-01-04T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 203: John Valdovinos
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_202_1767719582704', 'live_qe1v81z2ye', 'John Valdovinos', 'john@thezonesyouth.org', ''+1 707-542-3249', 'Valdovinos Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-04T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_202_1767719582704', 'contact_cfo_202_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_202_1767719582704', 'conv_cfo_202_1767719582704', 'out', 'Hi John,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_202', '2026-01-04T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 204: Leigh Rackham
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_203_1767719582704', 'live_qe1v81z2ye', 'Leigh Rackham', 'leigh@schoolsmutualservices.co.uk', ''+44 18 6559 7771', 'Rackham Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-04T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_203_1767719582704', 'contact_cfo_203_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_203_1767719582704', 'conv_cfo_203_1767719582704', 'out', 'Hi Leigh,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_203', '2026-01-04T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 205: Mindee Reece
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_204_1767719582704', 'live_qe1v81z2ye', 'Mindee Reece', 'mindee@rmhctopeka.org', ''+1 785-235-6852', 'Reece Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_204_1767719582704', 'contact_cfo_204_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_204_1767719582704', 'conv_cfo_204_1767719582704', 'out', 'Hi Mindee,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_204', '2026-01-04T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 206: Eugene Teo
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_205_1767719582704', 'live_qe1v81z2ye', 'Eugene Teo', 'eugene.teo@shoreacap.com', ''+65 6538 6818', 'Teo Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2026-01-04T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_205_1767719582704', 'contact_cfo_205_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_205_1767719582704', 'conv_cfo_205_1767719582704', 'out', 'Hi Eugene,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_205', '2026-01-04T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 207: Jan Hubacek
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_206_1767719582704', 'live_qe1v81z2ye', 'Jan Hubacek', 'jan.hubacek@cbre.com', ''+420 224 814 060', 'Hubacek Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-04T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_206_1767719582704', 'contact_cfo_206_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_206_1767719582704', 'conv_cfo_206_1767719582704', 'out', 'Hi Jan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_206', '2026-01-04T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 208: Emily Blythe
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_207_1767719582704', 'live_qe1v81z2ye', 'Emily Blythe', 'emily@pypervision.com', NULL, 'Blythe Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-04T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_207_1767719582704', 'contact_cfo_207_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_207_1767719582704', 'conv_cfo_207_1767719582704', 'out', 'Hi Emily,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_207', '2026-01-04T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 209: Chuck Mensch
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_208_1767719582704', 'live_qe1v81z2ye', 'Chuck Mensch', 'cmensch@thekleincompany.com', ''+1 215-751-9600', 'Mensch Enterprises', 'Boston', 'MA', 'Received RSVP', 'N1', '2026-01-04T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_208_1767719582704', 'contact_cfo_208_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_208_1767719582704', 'conv_cfo_208_1767719582704', 'out', 'Hi Chuck,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_208', '2026-01-04T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 210: Matthew Hemmerling
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_209_1767719582704', 'live_qe1v81z2ye', 'Matthew Hemmerling', 'matt@braemore.ca', ''+1 403-329-3777', 'Hemmerling Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_209_1767719582704', 'contact_cfo_209_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_209_1767719582704', 'conv_cfo_209_1767719582704', 'out', 'Hi Matthew,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_209', '2026-01-04T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 211: Tracey Whitby
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_210_1767719582704', 'live_qe1v81z2ye', 'Tracey Whitby', 'tracey.whitby@awarerealestate.com.au', NULL, 'Whitby Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-04T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_210_1767719582704', 'contact_cfo_210_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_210_1767719582704', 'conv_cfo_210_1767719582704', 'out', 'Hi Tracey,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_210', '2026-01-04T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 212: Gary Ambart
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_211_1767719582704', 'live_qe1v81z2ye', 'Gary Ambart', 'gary@pearincorp.com', ''+1 818-590-7973', 'Ambart Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-05T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_211_1767719582704', 'contact_cfo_211_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_211_1767719582704', 'conv_cfo_211_1767719582704', 'out', 'Hi Gary,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_211', '2026-01-05T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 213: David Kessler
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_212_1767719582704', 'live_qe1v81z2ye', 'David Kessler', 'david.kessler@cohnreznick.com', ''+1 212-297-0400', 'Kessler Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-05T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_212_1767719582704', 'contact_cfo_212_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_212_1767719582704', 'conv_cfo_212_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_212', '2026-01-05T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 214: Angie Matthews
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_213_1767719582704', 'live_qe1v81z2ye', 'Angie Matthews', 'amatthews@orisonholdings.com', ''+1 940-382-5003', 'Matthews Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2026-01-05T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_213_1767719582704', 'contact_cfo_213_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_213_1767719582704', 'conv_cfo_213_1767719582704', 'out', 'Hi Angie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_213', '2026-01-05T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 215: Aaron Thompson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_214_1767719582704', 'live_qe1v81z2ye', 'Aaron Thompson', 'athompson@dmcl.ca', ''+1 604-687-4747', 'Thompson Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-05T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_214_1767719582704', 'contact_cfo_214_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_214_1767719582704', 'conv_cfo_214_1767719582704', 'out', 'Hi Aaron,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_214', '2026-01-05T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 216: Lena Brown
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_215_1767719582704', 'live_qe1v81z2ye', 'Lena Brown', 'lena.brown@apollosda.com.au', ''+61 1300 937 279', 'Brown Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-05T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_215_1767719582704', 'contact_cfo_215_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_215_1767719582704', 'conv_cfo_215_1767719582704', 'out', 'Hi Lena,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_215', '2026-01-05T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 217: Andrew McCann
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_216_1767719582704', 'live_qe1v81z2ye', 'Andrew McCann', 'andrewmccann@jelliscraig.com.au', ''+61 3 9375 7989', 'McCann Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2026-01-04T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_216_1767719582704', 'contact_cfo_216_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_216_1767719582704', 'conv_cfo_216_1767719582704', 'out', 'Hi Andrew,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_216', '2026-01-04T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_216_1767719582704', 'conv_cfo_216_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_216', '2026-01-06T01:50:24.681Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 218: August Severn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_217_1767719582704', 'live_qe1v81z2ye', 'August Severn', 'august.severn@capitoldataanalytics.com', ''+1 402-981-2638', 'Severn Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-04T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_217_1767719582704', 'contact_cfo_217_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_217_1767719582704', 'conv_cfo_217_1767719582704', 'out', 'Hi August,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_217', '2026-01-04T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 219: Jerry Tanaka
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_218_1767719582704', 'live_qe1v81z2ye', 'Jerry Tanaka', 'jerry@redwood-property.com', ''+1 510-339-9905', 'Tanaka Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-04T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_218_1767719582704', 'contact_cfo_218_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_218_1767719582704', 'conv_cfo_218_1767719582704', 'out', 'Hi Jerry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_218', '2026-01-04T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 220: Christopher Michell-Viret
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_219_1767719582704', 'live_qe1v81z2ye', 'Christopher Michell-Viret', 'cmichell-viret@oag.ab.ca', ''+1 780-427-4222', 'Michell-Viret Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_219_1767719582704', 'contact_cfo_219_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_219_1767719582704', 'conv_cfo_219_1767719582704', 'out', 'Hi Christopher,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_219', '2026-01-04T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 221: David Strouse
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_220_1767719582704', 'live_qe1v81z2ye', 'David Strouse', 'david@birchwoodcapitalpartners.com', ''+1 410-782-0000', 'Strouse Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-04T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_220_1767719582704', 'contact_cfo_220_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_220_1767719582704', 'conv_cfo_220_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_220', '2026-01-04T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 222: Mike Lepitre
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_221_1767719582704', 'live_qe1v81z2ye', 'Mike Lepitre', 'michael@kdprofessional.ca', ''+1 403-219-0602', 'Lepitre Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2026-01-04T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_221_1767719582704', 'contact_cfo_221_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_221_1767719582704', 'conv_cfo_221_1767719582704', 'out', 'Hi Mike,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_221', '2026-01-04T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 223: Eugene Blinn
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_222_1767719582704', 'live_qe1v81z2ye', 'Eugene Blinn', 'eblinn@hypely.co', ''+1 916-445-1254', 'Blinn Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-04T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_222_1767719582704', 'contact_cfo_222_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_222_1767719582704', 'conv_cfo_222_1767719582704', 'out', 'Hi Eugene,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_222', '2026-01-04T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 224: Stuart Phillips
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_223_1767719582704', 'live_qe1v81z2ye', 'Stuart Phillips', 'stuart.phillips@theprivateoffice.com', ''+44 333 323 9060', 'Phillips Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-05T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_223_1767719582704', 'contact_cfo_223_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_223_1767719582704', 'conv_cfo_223_1767719582704', 'out', 'Hi Stuart,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_223', '2026-01-05T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 225: Ray Halvorsen
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_224_1767719582704', 'live_qe1v81z2ye', 'Ray Halvorsen', 'ray@lcpsca.com', ''+1 807-623-0600', 'Halvorsen Enterprises', 'Austin', 'TX', 'Needs BDR', 'N1', '2026-01-05T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_224_1767719582704', 'contact_cfo_224_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_224_1767719582704', 'conv_cfo_224_1767719582704', 'out', 'Hi Ray,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_224', '2026-01-05T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 226: Heather Bell
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_225_1767719582704', 'live_qe1v81z2ye', 'Heather Bell', 'heather@thisisheatherbell.com', NULL, 'Bell Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-05T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_225_1767719582704', 'contact_cfo_225_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_225_1767719582704', 'conv_cfo_225_1767719582704', 'out', 'Hi Heather,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_225', '2026-01-05T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 227: Margot Sunter
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_226_1767719582704', 'live_qe1v81z2ye', 'Margot Sunter', 'jms@ggfl.ca', ''+1 613-728-5831', 'Sunter Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-05T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_226_1767719582704', 'contact_cfo_226_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_226_1767719582704', 'conv_cfo_226_1767719582704', 'out', 'Hi Margot,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_226', '2026-01-05T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 228: Tara Oskins
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_227_1767719582704', 'live_qe1v81z2ye', 'Tara Oskins', 'toskins@cprt.com', ''+1 800-648-9064', 'Oskins Enterprises', 'Chicago', 'IL', 'No Activity', 'N1', '2026-01-05T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_227_1767719582704', 'contact_cfo_227_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_227_1767719582704', 'conv_cfo_227_1767719582704', 'out', 'Hi Tara,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_227', '2026-01-05T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 229: Raed Gharbi
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_228_1767719582704', 'live_qe1v81z2ye', 'Raed Gharbi', 'raed@torontoboutiqueapartments.com', ''+1 800-257-9483', 'Gharbi Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-05T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_228_1767719582704', 'contact_cfo_228_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_228_1767719582704', 'conv_cfo_228_1767719582704', 'out', 'Hi Raed,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_228', '2026-01-05T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 230: PJ Appleton
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_229_1767719582704', 'live_qe1v81z2ye', 'PJ Appleton', 'pj@bloxspring.com', ''+44 751 039 4622', 'Appleton Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-05T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_229_1767719582704', 'contact_cfo_229_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_229_1767719582704', 'conv_cfo_229_1767719582704', 'out', 'Hi PJ,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_229', '2026-01-05T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 231: Kyle Aubuchon
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_230_1767719582704', 'live_qe1v81z2ye', 'Kyle Aubuchon', 'kyle@gatby.com', ''+1 713-581-6553', 'Aubuchon Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-05T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_230_1767719582704', 'contact_cfo_230_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_230_1767719582704', 'conv_cfo_230_1767719582704', 'out', 'Hi Kyle,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_230', '2026-01-05T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 232: Ajay Patel
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_231_1767719582704', 'live_qe1v81z2ye', 'Ajay Patel', 'ajay@keypropertygrp.com', ''+61 2 4631 0184', 'Patel Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-05T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_231_1767719582704', 'contact_cfo_231_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_231_1767719582704', 'conv_cfo_231_1767719582704', 'out', 'Hi Ajay,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_231', '2026-01-05T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 233: Tristan Petricca
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_232_1767719582704', 'live_qe1v81z2ye', 'Tristan Petricca', 'tristan@sojournaz.com', ''+1 602-492-4121', 'Petricca Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2026-01-05T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_232_1767719582704', 'contact_cfo_232_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_232_1767719582704', 'conv_cfo_232_1767719582704', 'out', 'Hi Tristan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_232', '2026-01-05T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 234: Jeffery Robison
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_233_1767719582704', 'live_qe1v81z2ye', 'Jeffery Robison', 'jeff@teamlbr.com', ''+1 321-722-0707', 'Robison Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-05T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_233_1767719582704', 'contact_cfo_233_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_233_1767719582704', 'conv_cfo_233_1767719582704', 'out', 'Hi Jeffery,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_233', '2026-01-05T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 235: Nicholas Meyer
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_234_1767719582704', 'live_qe1v81z2ye', 'Nicholas Meyer', 'nic@downtownsuites.com', ''+1 604-694-8801', 'Meyer Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-05T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_234_1767719582704', 'contact_cfo_234_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_234_1767719582704', 'conv_cfo_234_1767719582704', 'out', 'Hi Nicholas,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_234', '2026-01-05T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 236: Russell Hobbs
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_235_1767719582704', 'live_qe1v81z2ye', 'Russell Hobbs', 'rhobbs@parcliving.ca', ''+1 604-980-6525', 'Hobbs Enterprises', 'New York', 'NY', 'Received RSVP', 'N1', '2026-01-05T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_235_1767719582704', 'contact_cfo_235_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_235_1767719582704', 'conv_cfo_235_1767719582704', 'out', 'Hi Russell,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_235', '2026-01-05T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 237: Victor Rivera
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_236_1767719582704', 'live_qe1v81z2ye', 'Victor Rivera', 'victor@jdfloridaproperties.com', ''+1 407-346-0733', 'Rivera Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-05T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_236_1767719582704', 'contact_cfo_236_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_236_1767719582704', 'conv_cfo_236_1767719582704', 'out', 'Hi Victor,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_236', '2026-01-05T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 238: Benn Lane
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_237_1767719582704', 'live_qe1v81z2ye', 'Benn Lane', 'benn@justicefox.com.au', NULL, 'Lane Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-05T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_237_1767719582704', 'contact_cfo_237_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_237_1767719582704', 'conv_cfo_237_1767719582704', 'out', 'Hi Benn,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_237', '2026-01-05T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 239: Talal Habib
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_238_1767719582704', 'live_qe1v81z2ye', 'Talal Habib', 'thabib@metaksystems.com', ''+1 613-226-9276', 'Habib Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-05T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_238_1767719582704', 'contact_cfo_238_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_238_1767719582704', 'conv_cfo_238_1767719582704', 'out', 'Hi Talal,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_238', '2026-01-05T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 240: David Lueck
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_239_1767719582704', 'live_qe1v81z2ye', 'David Lueck', 'dlueck@charterimpact.com', ''+1 888-474-0322', 'Lueck Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-05T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_239_1767719582704', 'contact_cfo_239_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_239_1767719582704', 'conv_cfo_239_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_239', '2026-01-05T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 241: Charles D?Alessio
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_240_1767719582704', 'live_qe1v81z2ye', 'Charles D?Alessio', 'broker@synergycolo.com', ''+1 719-418-5000', 'D?Alessio Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2026-01-04T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_240_1767719582704', 'contact_cfo_240_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_240_1767719582704', 'conv_cfo_240_1767719582704', 'out', 'Hi Charles,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_240', '2026-01-04T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 242: Michael Putz
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_241_1767719582704', 'live_qe1v81z2ye', 'Michael Putz', 'mputz@blackshark.ai', ''+43 676 9045778', 'Putz Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-04T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_241_1767719582704', 'contact_cfo_241_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_241_1767719582704', 'conv_cfo_241_1767719582704', 'out', 'Hi Michael,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_241', '2026-01-04T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 243: Giulio Gasperis
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_242_1767719582704', 'live_qe1v81z2ye', 'Giulio Gasperis', 'giulio@smart-one.ca', NULL, 'Gasperis Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-04T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_242_1767719582704', 'contact_cfo_242_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_242_1767719582704', 'conv_cfo_242_1767719582704', 'out', 'Hi Giulio,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_242', '2026-01-04T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 244: Gilbert Sorola
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_243_1767719582704', 'live_qe1v81z2ye', 'Gilbert Sorola', 'gilbert@sorola.net', ''+1 765-413-5885', 'Sorola Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2026-01-04T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_243_1767719582704', 'contact_cfo_243_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_243_1767719582704', 'conv_cfo_243_1767719582704', 'out', 'Hi Gilbert,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_243', '2026-01-04T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_243_1767719582704', 'conv_cfo_243_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_243', '2026-01-05T21:11:46.320Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 245: David Ware
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_244_1767719582704', 'live_qe1v81z2ye', 'David Ware', 'david@ruralhomes.co', NULL, 'Ware Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-04T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_244_1767719582704', 'contact_cfo_244_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_244_1767719582704', 'conv_cfo_244_1767719582704', 'out', 'Hi David,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_244', '2026-01-04T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 246: Craig Corbett
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_245_1767719582704', 'live_qe1v81z2ye', 'Craig Corbett', 'ccorbett@tacada.ca', ''+1 780-452-2288', 'Corbett Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-04T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_245_1767719582704', 'contact_cfo_245_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_245_1767719582704', 'conv_cfo_245_1767719582704', 'out', 'Hi Craig,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_245', '2026-01-04T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 247: Deepak Kumar
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_246_1767719582704', 'live_qe1v81z2ye', 'Deepak Kumar', 'dkumar@bushelpowered.com', ''+1 701-369-0633', 'Kumar Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-04T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_246_1767719582704', 'contact_cfo_246_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_246_1767719582704', 'conv_cfo_246_1767719582704', 'out', 'Hi Deepak,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_246', '2026-01-04T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 248: Raymond Koura
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_247_1767719582704', 'live_qe1v81z2ye', 'Raymond Koura', 'raymond.koura@ellersonproperty.com.au', ''+61 2 9188 0600', 'Koura Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-05T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_247_1767719582704', 'contact_cfo_247_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_247_1767719582704', 'conv_cfo_247_1767719582704', 'out', 'Hi Raymond,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_247', '2026-01-05T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 249: Marianna Sachse
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_248_1767719582704', 'live_qe1v81z2ye', 'Marianna Sachse', 'marianna@hellojackalo.com', NULL, 'Sachse Enterprises', 'Boston', 'MA', 'Link Clicked', 'N1', '2026-01-05T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_248_1767719582704', 'contact_cfo_248_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_248_1767719582704', 'conv_cfo_248_1767719582704', 'out', 'Hi Marianna,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_248', '2026-01-05T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 250: Johnson Owoeye
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_249_1767719582704', 'live_qe1v81z2ye', 'Johnson Owoeye', 'jowoeye@sysserve.com', ''+234 1 291 4837', 'Owoeye Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-05T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_249_1767719582704', 'contact_cfo_249_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_249_1767719582704', 'conv_cfo_249_1767719582704', 'out', 'Hi Johnson,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_249', '2026-01-05T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 251: Meghna Bondili
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_250_1767719582704', 'live_qe1v81z2ye', 'Meghna Bondili', 'meg@butterflyvoyage.com', ''+1 800-952-5210', 'Bondili Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-05T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_250_1767719582704', 'contact_cfo_250_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_250_1767719582704', 'conv_cfo_250_1767719582704', 'out', 'Hi Meghna,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_250', '2026-01-05T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 252: Gary Lawlor
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_251_1767719582704', 'live_qe1v81z2ye', 'Gary Lawlor', 'gary.lawlor@lawlorburns.com', NULL, 'Lawlor Enterprises', 'San Francisco', 'CA', 'Needs BDR', 'N1', '2026-01-05T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_251_1767719582704', 'contact_cfo_251_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_251_1767719582704', 'conv_cfo_251_1767719582704', 'out', 'Hi Gary,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_251', '2026-01-05T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 253: Keith Caldwell
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_252_1767719582704', 'live_qe1v81z2ye', 'Keith Caldwell', 'kcaldwell@whaleyhammonds.cpa', ''+1 770-914-1040', 'Caldwell Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-05T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_252_1767719582704', 'contact_cfo_252_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_252_1767719582704', 'conv_cfo_252_1767719582704', 'out', 'Hi Keith,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_252', '2026-01-05T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 254: Sharon Shenkar
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_253_1767719582704', 'live_qe1v81z2ye', 'Sharon Shenkar', 'sharon@bostonmusicarts.com', ''+1 617-690-3391', 'Shenkar Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-06T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_253_1767719582704', 'contact_cfo_253_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_253_1767719582704', 'conv_cfo_253_1767719582704', 'out', 'Hi Sharon,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_253', '2026-01-06T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 255: Mark Graves
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_254_1767719582704', 'live_qe1v81z2ye', 'Mark Graves', 'mark.graves@ergeagroup.com', NULL, 'Graves Enterprises', 'Austin', 'TX', 'No Activity', 'N1', '2026-01-06T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_254_1767719582704', 'contact_cfo_254_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_254_1767719582704', 'conv_cfo_254_1767719582704', 'out', 'Hi Mark,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_254', '2026-01-06T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 256: Peter Antonius
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_255_1767719582704', 'live_qe1v81z2ye', 'Peter Antonius', 'peter.antonius@listonnewton.com.au', ''+61 1300 359 905', 'Antonius Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-06T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_255_1767719582704', 'contact_cfo_255_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_255_1767719582704', 'conv_cfo_255_1767719582704', 'out', 'Hi Peter,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_255', '2026-01-06T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 257: Peter Koch
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_256_1767719582704', 'live_qe1v81z2ye', 'Peter Koch', 'peter@managecasa.com', ''+1 800-998-6627', 'Koch Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-06T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_256_1767719582704', 'contact_cfo_256_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_256_1767719582704', 'conv_cfo_256_1767719582704', 'out', 'Hi Peter,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_256', '2026-01-06T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 258: Larry Magid
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_257_1767719582704', 'live_qe1v81z2ye', 'Larry Magid', 'larry@connectsafely.org', ''+1 650-523-4950', 'Magid Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-06T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_257_1767719582704', 'contact_cfo_257_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_257_1767719582704', 'conv_cfo_257_1767719582704', 'out', 'Hi Larry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_257', '2026-01-06T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 259: Mark Jackson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_258_1767719582704', 'live_qe1v81z2ye', 'Mark Jackson', 'mjackson@welchllp.com', ''+1 613-236-9191', 'Jackson Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-06T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_258_1767719582704', 'contact_cfo_258_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_258_1767719582704', 'conv_cfo_258_1767719582704', 'out', 'Hi Mark,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_258', '2026-01-06T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 260: Neil Ellison
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_259_1767719582704', 'live_qe1v81z2ye', 'Neil Ellison', 'n.ellison@firstpro360.com', ''+1 404-303-4980', 'Ellison Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-06T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_259_1767719582704', 'contact_cfo_259_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_259_1767719582704', 'conv_cfo_259_1767719582704', 'out', 'Hi Neil,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_259', '2026-01-06T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 261: Shelley Kaiser
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_260_1767719582704', 'live_qe1v81z2ye', 'Shelley Kaiser', 'shelley.kaiser@srimgt.com', ''+1 850-583-7990', 'Kaiser Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-06T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_260_1767719582704', 'contact_cfo_260_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_260_1767719582704', 'conv_cfo_260_1767719582704', 'out', 'Hi Shelley,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_260', '2026-01-06T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 262: Brandon Kanoy
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_261_1767719582704', 'live_qe1v81z2ye', 'Brandon Kanoy', 'brandon.kanoy@avior.com', ''+1 619-297-1878', 'Kanoy Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-06T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_261_1767719582704', 'contact_cfo_261_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_261_1767719582704', 'conv_cfo_261_1767719582704', 'out', 'Hi Brandon,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_261', '2026-01-06T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 263: Danielle Adams
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_262_1767719582704', 'live_qe1v81z2ye', 'Danielle Adams', 'dadams@sfachievers.org', ''+1 415-872-9986', 'Adams Enterprises', 'Chicago', 'IL', 'Received RSVP', 'N1', '2026-01-06T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_262_1767719582704', 'contact_cfo_262_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_262_1767719582704', 'conv_cfo_262_1767719582704', 'out', 'Hi Danielle,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_262', '2026-01-06T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 264: Kara Cameron
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_263_1767719582704', 'live_qe1v81z2ye', 'Kara Cameron', 'kara.cameron@crombie.ca', ''+1 902-755-8100', 'Cameron Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-06T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_263_1767719582704', 'contact_cfo_263_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_263_1767719582704', 'conv_cfo_263_1767719582704', 'out', 'Hi Kara,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_263', '2026-01-06T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 265: Frank Jonna
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_264_1767719582704', 'live_qe1v81z2ye', 'Frank Jonna', 'fgjonna@jonnaco.com', ''+1 248-352-1550', 'Jonna Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-05T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_264_1767719582704', 'contact_cfo_264_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_264_1767719582704', 'conv_cfo_264_1767719582704', 'out', 'Hi Frank,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_264', '2026-01-05T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 266: Larry Skennion
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_265_1767719582704', 'live_qe1v81z2ye', 'Larry Skennion', 'larry.skennion@greenpantheradvisory.com', ''+1 201-874-2854', 'Skennion Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-05T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_265_1767719582704', 'contact_cfo_265_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_265_1767719582704', 'conv_cfo_265_1767719582704', 'out', 'Hi Larry,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_265', '2026-01-05T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 267: Pablo Menghini
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_266_1767719582704', 'live_qe1v81z2ye', 'Pablo Menghini', 'pm@buildingstack.com', ''+1 514-500-0036', 'Menghini Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-05T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_266_1767719582704', 'contact_cfo_266_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_266_1767719582704', 'conv_cfo_266_1767719582704', 'out', 'Hi Pablo,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_266', '2026-01-05T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 268: Brad Feldman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_267_1767719582704', 'live_qe1v81z2ye', 'Brad Feldman', 'brad.feldman@artic-consulting.com', ''+1 360-340-9230', 'Feldman Enterprises', 'Chicago', 'IL', 'Link Clicked', 'N1', '2026-01-05T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_267_1767719582704', 'contact_cfo_267_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_267_1767719582704', 'conv_cfo_267_1767719582704', 'out', 'Hi Brad,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_267', '2026-01-05T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 269: Rahul Chhabria
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_268_1767719582704', 'live_qe1v81z2ye', 'Rahul Chhabria', 'rahul@thehourco.com', ''+1 888-505-6485', 'Chhabria Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-05T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_268_1767719582704', 'contact_cfo_268_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_268_1767719582704', 'conv_cfo_268_1767719582704', 'out', 'Hi Rahul,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_268', '2026-01-05T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 270: Luke Krogman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_269_1767719582704', 'live_qe1v81z2ye', 'Luke Krogman', 'lkrogman@mfcpas.com', ''+1 607-797-4339', 'Krogman Enterprises', 'Austin', 'TX', 'Email Opened', 'N1', '2026-01-05T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_269_1767719582704', 'contact_cfo_269_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_269_1767719582704', 'conv_cfo_269_1767719582704', 'out', 'Hi Luke,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_269', '2026-01-05T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 271: Adrian Rocca
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_270_1767719582704', 'live_qe1v81z2ye', 'Adrian Rocca', 'arocca@fitzrovia.ca', ''+1 416-699-0063', 'Rocca Enterprises', 'New York', 'NY', 'Needs BDR', 'N1', '2026-01-05T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_270_1767719582704', 'contact_cfo_270_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_270_1767719582704', 'conv_cfo_270_1767719582704', 'out', 'Hi Adrian,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_270', '2026-01-05T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_in_cfo_270_1767719582704', 'conv_cfo_270_1767719582704', 'in', 'Thanks for reaching out. I''d be interested in learning more. When can we schedule a call?', 'Re: Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_in_1767719582704_270', '2026-01-06T17:52:49.620Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 272: Alexis Chevallot
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_271_1767719582704', 'live_qe1v81z2ye', 'Alexis Chevallot', 'alexis.chevallot@wearecapto.com', NULL, 'Chevallot Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-06T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_271_1767719582704', 'contact_cfo_271_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_271_1767719582704', 'conv_cfo_271_1767719582704', 'out', 'Hi Alexis,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_271', '2026-01-06T00:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 273: Melissa Steele
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_272_1767719582704', 'live_qe1v81z2ye', 'Melissa Steele', 'msteele@eandggroup.com', ''+1 703-893-0303', 'Steele Enterprises', 'Chicago', 'IL', 'Email Opened', 'N1', '2026-01-06T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_272_1767719582704', 'contact_cfo_272_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_272_1767719582704', 'conv_cfo_272_1767719582704', 'out', 'Hi Melissa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_272', '2026-01-06T01:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 274: Mike Travalini
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_273_1767719582704', 'live_qe1v81z2ye', 'Mike Travalini', 'mike@mezo.io', NULL, 'Travalini Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-06T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_273_1767719582704', 'contact_cfo_273_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_273_1767719582704', 'conv_cfo_273_1767719582704', 'out', 'Hi Mike,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_273', '2026-01-06T02:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 275: Tomasz Makomaski
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_274_1767719582704', 'live_qe1v81z2ye', 'Tomasz Makomaski', 'tomasz.makomaski@berliner-altbau.com', NULL, 'Makomaski Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-06T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_274_1767719582704', 'contact_cfo_274_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_274_1767719582704', 'conv_cfo_274_1767719582704', 'out', 'Hi Tomasz,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_274', '2026-01-06T03:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 276: Maria Cospito
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_275_1767719582704', 'live_qe1v81z2ye', 'Maria Cospito', 'maria.cospito@ardonagh.com', ''+44 20 7398 2100', 'Cospito Enterprises', 'New York', 'NY', 'Link Clicked', 'N1', '2026-01-06T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_275_1767719582704', 'contact_cfo_275_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_275_1767719582704', 'conv_cfo_275_1767719582704', 'out', 'Hi Maria,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_275', '2026-01-06T04:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 277: Annabel Marom
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_276_1767719582704', 'live_qe1v81z2ye', 'Annabel Marom', 'annabelmarom@propertyme.com', NULL, 'Marom Enterprises', 'San Francisco', 'CA', 'Email Sent', 'N1', '2026-01-06T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_276_1767719582704', 'contact_cfo_276_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_276_1767719582704', 'conv_cfo_276_1767719582704', 'out', 'Hi Annabel,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_276', '2026-01-06T05:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 278: Lisa Burke
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_277_1767719582704', 'live_qe1v81z2ye', 'Lisa Burke', 'lisa@jbmcclatchyfoundation.org', ''+1 916-979-9166', 'Burke Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-06T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_277_1767719582704', 'contact_cfo_277_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_277_1767719582704', 'conv_cfo_277_1767719582704', 'out', 'Hi Lisa,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_277', '2026-01-06T06:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 279: Cory Casilio
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_278_1767719582704', 'live_qe1v81z2ye', 'Cory Casilio', 'cory@terratechnologies.co', ''+1 323-248-1345', 'Casilio Enterprises', 'Boston', 'MA', 'Needs BDR', 'N1', '2026-01-06T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_278_1767719582704', 'contact_cfo_278_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_278_1767719582704', 'conv_cfo_278_1767719582704', 'out', 'Hi Cory,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_278', '2026-01-06T07:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 280: Jonathan Schenker
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_279_1767719582704', 'live_qe1v81z2ye', 'Jonathan Schenker', 'jonathan@wearebme.com', ''+1 424-777-1404', 'Schenker Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-06T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_279_1767719582704', 'contact_cfo_279_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_279_1767719582704', 'conv_cfo_279_1767719582704', 'out', 'Hi Jonathan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_279', '2026-01-06T08:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 281: Bill Miller
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_280_1767719582704', 'live_qe1v81z2ye', 'Bill Miller', 'bmiller@rwrealestategroup.com', ''+1 914-921-8240', 'Miller Enterprises', 'New York', 'NY', 'Email Opened', 'N1', '2026-01-06T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_280_1767719582704', 'contact_cfo_280_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_280_1767719582704', 'conv_cfo_280_1767719582704', 'out', 'Hi Bill,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_280', '2026-01-06T09:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 282: Tom Delahaye
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_281_1767719582704', 'live_qe1v81z2ye', 'Tom Delahaye', 'tdelahaye@cstmultifamilyrealestateservices.com', ''+1 225-427-8455', 'Delahaye Enterprises', 'San Francisco', 'CA', 'Received RSVP', 'N1', '2026-01-06T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_281_1767719582704', 'contact_cfo_281_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_281_1767719582704', 'conv_cfo_281_1767719582704', 'out', 'Hi Tom,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_281', '2026-01-06T10:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 283: Kim Summerall-Wright
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_282_1767719582704', 'live_qe1v81z2ye', 'Kim Summerall-Wright', 'kswright@chaoffice.org', ''+1 307-266-1388', 'Summerall-Wright Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-06T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_282_1767719582704', 'contact_cfo_282_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_282_1767719582704', 'conv_cfo_282_1767719582704', 'out', 'Hi Kim,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_282', '2026-01-06T11:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 284: Gregg Whitney
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_283_1767719582704', 'live_qe1v81z2ye', 'Gregg Whitney', 'gregg@billionairesrowlajolla.com', ''+1 858-342-5298', 'Whitney Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-06T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_283_1767719582704', 'contact_cfo_283_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_283_1767719582704', 'conv_cfo_283_1767719582704', 'out', 'Hi Gregg,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_283', '2026-01-06T12:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 285: Christopher Lento
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_284_1767719582704', 'live_qe1v81z2ye', 'Christopher Lento', 'chrislento@emcapitalgroup.com', ''+1 617-877-2051', 'Lento Enterprises', 'Austin', 'TX', 'Email Sent', 'N1', '2026-01-06T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_284_1767719582704', 'contact_cfo_284_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_284_1767719582704', 'conv_cfo_284_1767719582704', 'out', 'Hi Christopher,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_284', '2026-01-06T13:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 286: Dan McGrath
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_285_1767719582704', 'live_qe1v81z2ye', 'Dan McGrath', 'dm@wlm.com.au', ''+61 2 9221 7777', 'McGrath Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-06T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_285_1767719582704', 'contact_cfo_285_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_285_1767719582704', 'conv_cfo_285_1767719582704', 'out', 'Hi Dan,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_285', '2026-01-06T14:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 287: Derrick Hanson
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_286_1767719582704', 'live_qe1v81z2ye', 'Derrick Hanson', 'derrick.hanson@theattaingroup.com', ''+1 613-739-9424', 'Hanson Enterprises', 'San Francisco', 'CA', 'Link Clicked', 'N1', '2026-01-06T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_286_1767719582704', 'contact_cfo_286_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_286_1767719582704', 'conv_cfo_286_1767719582704', 'out', 'Hi Derrick,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_286', '2026-01-06T15:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 288: Shaun Coleman
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_287_1767719582704', 'live_qe1v81z2ye', 'Shaun Coleman', 'scoleman@newmanministry.com', NULL, 'Coleman Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-06T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_287_1767719582704', 'contact_cfo_287_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_287_1767719582704', 'conv_cfo_287_1767719582704', 'out', 'Hi Shaun,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_287', '2026-01-06T16:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 289: Erik Ayers
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_288_1767719582704', 'live_qe1v81z2ye', 'Erik Ayers', 'eayers@goodseeker.com', ''+1 703-254-0446', 'Ayers Enterprises', 'Boston', 'MA', 'Email Opened', 'N1', '2026-01-05T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_288_1767719582704', 'contact_cfo_288_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_288_1767719582704', 'conv_cfo_288_1767719582704', 'out', 'Hi Erik,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_288', '2026-01-05T17:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 290: Tammy Strickland
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_289_1767719582704', 'live_qe1v81z2ye', 'Tammy Strickland', 'tammy@blackstreaminternational.com', ''+1 864-920-0303', 'Strickland Enterprises', 'Austin', 'TX', 'Received RSVP', 'N1', '2026-01-05T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_289_1767719582704', 'contact_cfo_289_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_289_1767719582704', 'conv_cfo_289_1767719582704', 'out', 'Hi Tammy,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_289', '2026-01-05T18:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 291: Julie Blanc
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_290_1767719582704', 'live_qe1v81z2ye', 'Julie Blanc', 'julie@rentana.io', NULL, 'Blanc Enterprises', 'New York', 'NY', 'Email Sent', 'N1', '2026-01-05T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_290_1767719582704', 'contact_cfo_290_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_290_1767719582704', 'conv_cfo_290_1767719582704', 'out', 'Hi Julie,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_290', '2026-01-05T19:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 292: Fernando Maraslioglu
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_291_1767719582704', 'live_qe1v81z2ye', 'Fernando Maraslioglu', 'fernando@compassmf.com', ''+1 469-319-9686', 'Maraslioglu Enterprises', 'San Francisco', 'CA', 'Email Opened', 'N1', '2026-01-05T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_291_1767719582704', 'contact_cfo_291_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_291_1767719582704', 'conv_cfo_291_1767719582704', 'out', 'Hi Fernando,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_291', '2026-01-05T20:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 293: Bern Dupree
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_292_1767719582704', 'live_qe1v81z2ye', 'Bern Dupree', 'bdupree@riverstpartners.com', ''+1 866-648-1536', 'Dupree Enterprises', 'Chicago', 'IL', 'Email Sent', 'N1', '2026-01-05T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_292_1767719582704', 'contact_cfo_292_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_292_1767719582704', 'conv_cfo_292_1767719582704', 'out', 'Hi Bern,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_292', '2026-01-05T21:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 294: Kyle Guthrie
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_293_1767719582704', 'live_qe1v81z2ye', 'Kyle Guthrie', 'kyle@paulaskene.com', ''+1 510-654-3510', 'Guthrie Enterprises', 'Boston', 'MA', 'Email Sent', 'N1', '2026-01-05T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_293_1767719582704', 'contact_cfo_293_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_293_1767719582704', 'conv_cfo_293_1767719582704', 'out', 'Hi Kyle,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_293', '2026-01-05T22:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Contact 295: Maureen Kochan
INSERT INTO "Contact" ("id", "campaignId", "name", "email", "phone", "company", "city", "state", "status", "stageKey", "createdAt")
VALUES ('contact_cfo_294_1767719582704', 'live_qe1v81z2ye', 'Maureen Kochan', 'maureen@connectsafely.org', ''+1 650-523-4950', 'Kochan Enterprises', 'Austin', 'TX', 'Link Clicked', 'N1', '2026-01-05T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Conversation" ("id", "contactId", "channel")
VALUES ('conv_cfo_294_1767719582704', 'contact_cfo_294_1767719582704', 'email')
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "Message" ("id", "conversationId", "direction", "text", "subject", "provider", "providerMessageId", "createdAt")
VALUES ('msg_cfo_294_1767719582704', 'conv_cfo_294_1767719582704', 'out', 'Hi Maureen,

I wanted to reach out personally about an exclusive opportunity for CFOs like yourself.

We''re hosting a private event focused on innovative insurance solutions specifically designed for financial executives.

Best regards,
Stanley
Paycile Insurance Solutions', 'Exclusive CFO Insurance Opportunity - Limited Time', 'smtp', 'msg_1767719582704_294', '2026-01-05T23:13:02.704Z')
ON CONFLICT ("id") DO NOTHING;


-- Update Campaign Totals
UPDATE "Campaign"
SET "totalContacts" = 295,
    "enrichedContacts" = 295,
    "emailsGenerated" = 295,
    "status" = 'active',
    "updatedAt" = NOW()
WHERE "id" = 'live_qe1v81z2ye';


COMMIT;

-- Total contacts: 295
-- Total SQL statements: 898
