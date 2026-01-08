#!/bin/bash
# Test DropCowboy voicemail delivery via Render Shell
#
# Usage: Run this in Render Shell after deployment completes

echo "==========================================="
echo "Testing DropCowboy Voicemail Integration"
echo "==========================================="
echo ""

curl -X POST http://localhost:4000/api/voicemail/drop \
  -H "Content-Type: application/json" \
  -d '{
    "to": "7604940404",
    "ttsScript": "Hello Danny, this is the test from eleven labs to your voicemail box",
    "callerId": "9784867390"
  }'

echo ""
echo ""
echo "Check response above for:"
echo "  - ok: true (success)"
echo "  - provider: dropcowboy (using DropCowboy)"
echo "  - queued: true (voicemail queued)"
echo ""





