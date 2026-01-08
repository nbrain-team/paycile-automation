-- Check message counts for CFO Funnel campaign
-- This will help us understand why there are 830 messages

-- Count contacts by status
SELECT status, COUNT(*) as count
FROM "Contact"
WHERE "campaignId" = 'cmk2tcx0q001e1403fls3rwc2'
GROUP BY status
ORDER BY count DESC;

-- Count conversations for CFO contacts
SELECT COUNT(*) as total_conversations
FROM "Conversation"
WHERE "contactId" IN (
  SELECT "id" FROM "Contact" WHERE "campaignId" = 'cmk2tcx0q001e1403fls3rwc2'
);

-- Count messages for CFO contacts
SELECT COUNT(*) as total_messages
FROM "Message"
WHERE "conversationId" IN (
  SELECT "id" FROM "Conversation" WHERE "contactId" IN (
    SELECT "id" FROM "Contact" WHERE "campaignId" = 'cmk2tcx0q001e1403fls3rwc2'
  )
);

-- Count messages per contact (to find duplicates)
SELECT c.name, c.status, COUNT(m.id) as message_count
FROM "Contact" c
LEFT JOIN "Conversation" conv ON conv."contactId" = c.id
LEFT JOIN "Message" m ON m."conversationId" = conv.id
WHERE c."campaignId" = 'cmk2tcx0q001e1403fls3rwc2'
GROUP BY c.id, c.name, c.status
HAVING COUNT(m.id) > 1
ORDER BY message_count DESC
LIMIT 20;



