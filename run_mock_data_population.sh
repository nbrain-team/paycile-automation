#!/bin/bash

# Script to populate CFO Insurance campaign mock data
# This calls the admin API endpoint once the code is deployed

echo "🚀 Populating CFO Insurance Campaign Mock Data..."
echo ""

# Call the admin endpoint
response=$(curl -s -w "\n%{http_code}" -X POST https://opticwise-backend-uq3o.onrender.com/api/admin/populate-cfo-mock-data)

# Extract HTTP status code (last line)
http_code=$(echo "$response" | tail -n1)

# Extract response body (all but last line)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo ""

if [ "$http_code" = "200" ]; then
    echo "✅ SUCCESS!"
    echo ""
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo "❌ FAILED!"
    echo ""
    echo "$body"
fi

echo ""
echo "🔗 View campaign: https://paycile-automation.onrender.com/campaigns/live_qe1v81z2ye"




