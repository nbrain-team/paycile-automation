#!/bin/bash

API_BASE="https://opticwise-backend-uq3o.onrender.com"

echo "🧪 COMPREHENSIVE API TESTING"
echo "============================"
echo ""

# Test 1: Health
echo "1️⃣ Testing /health..."
HEALTH=$(curl -s "$API_BASE/health")
echo "Response: $HEALTH"
echo ""

# Test 2: Templates List
echo "2️⃣ Testing GET /api/templates..."
TEMPLATES=$(curl -s "$API_BASE/api/templates" | jq 'length')
echo "Templates in DB: $TEMPLATES"
echo ""

# Test 3: Create Template (with CORS)
echo "3️⃣ Testing POST /api/templates (with CORS)..."
CREATE_RESULT=$(curl -s -X POST "$API_BASE/api/templates" \
  -H "Origin: https://paycile-automation.onrender.com" \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test Template","graph":{"nodes":[],"edges":[]}}')
TEMPLATE_ID=$(echo "$CREATE_RESULT" | jq -r '.id // empty')
echo "Created template ID: $TEMPLATE_ID"
echo ""

# Test 4: Campaigns List
echo "4️⃣ Testing GET /api/campaigns..."
CAMPAIGNS=$(curl -s "$API_BASE/api/campaigns" | jq 'length')
echo "Campaigns in DB: $CAMPAIGNS"
echo ""

# Test 5: Create Campaign
echo "5️⃣ Testing POST /api/campaigns..."
CREATE_CAMPAIGN=$(curl -s -X POST "$API_BASE/api/campaigns" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Campaign",
    "ownerName":"Test User",
    "ownerEmail":"test@example.com",
    "eventType":"b2b_outreach",
    "eventDate":"2026-03-01",
    "status":"draft"
  }')
CAMPAIGN_ID=$(echo "$CREATE_CAMPAIGN" | jq -r '.id // empty')
echo "Created campaign ID: $CAMPAIGN_ID"
echo ""

# Test 6: Update Campaign
if [ ! -z "$CAMPAIGN_ID" ]; then
  echo "6️⃣ Testing PATCH /api/campaigns/:id..."
  UPDATE_RESULT=$(curl -s -X PATCH "$API_BASE/api/campaigns/$CAMPAIGN_ID" \
    -H "Content-Type: application/json" \
    -d '{"status":"active","name":"Updated Test Campaign"}')
  echo "Updated: $(echo "$UPDATE_RESULT" | jq -r '.name // .error')"
  echo ""
fi

# Test 7: Delete Campaign
if [ ! -z "$CAMPAIGN_ID" ]; then
  echo "7️⃣ Testing DELETE /api/campaigns/:id..."
  DELETE_RESULT=$(curl -s -X DELETE "$API_BASE/api/campaigns/$CAMPAIGN_ID")
  echo "Deleted: $(echo "$DELETE_RESULT" | jq -r '.ok // .error')"
  echo ""
fi

# Test 8: Content Templates
echo "8️⃣ Testing GET /api/content-templates..."
CONTENT=$(curl -s "$API_BASE/api/content-templates" | jq 'length')
echo "Content templates in DB: $CONTENT"
echo ""

# Test 9: CORS Headers Check
echo "9️⃣ Testing CORS headers..."
CORS_HEADER=$(curl -s -I -X OPTIONS "$API_BASE/api/templates" \
  -H "Origin: https://paycile-automation.onrender.com" \
  -H "Access-Control-Request-Method: POST" | grep -i "access-control-allow-origin")
echo "CORS Header: $CORS_HEADER"
echo ""

echo "✅ TESTING COMPLETE"
echo ""
echo "📊 SUMMARY:"
echo "   Templates: $TEMPLATES"
echo "   Campaigns: $CAMPAIGNS"
echo "   Content Templates: $CONTENT"
echo "   CORS: $([ ! -z "$CORS_HEADER" ] && echo '✅ Working' || echo '❌ Not Working')"
echo ""
