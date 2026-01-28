#!/bin/bash

# Update CSV Signatures Script
# Replaces hardcoded signatures in funnel CSV files with merge tags

echo "🔍 Updating signatures in CSV files..."
echo ""

# Backup originals
for file in *-Funnel-90-Nodes.csv; do
  if [ -f "$file" ]; then
    cp "$file" "${file}.backup"
    echo "📦 Backed up: $file"
  fi
done

echo ""
echo "✏️  Replacing signatures..."

# Replace Jim Fitzgerald signatures in email bodies
sed -i '' 's/Best regards,\\nJim Fitzgerald\\nCFO Solutions - Paycile\\njim@paycile\.com/{{sender.signature}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Best regards,\\nJim Fitzgerald/{{sender.signature}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Sincerely,\\nJim Fitzgerald/{{sender.signature}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Thanks,\\nJim Fitzgerald/{{sender.signature}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Regards,\\nJim Fitzgerald/{{sender.signature}}/g' *-Funnel-90-Nodes.csv

# Replace Jim Fitzgerald in voicemail scripts
sed -i '' 's/Jim Fitzgerald with Paycile/{{sender.name}} with Paycile/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Jim Fitzgerald from Paycile/{{sender.name}} from Paycile/g' *-Funnel-90-Nodes.csv
sed -i '' 's/this is Jim Fitzgerald/this is {{sender.name}}/g' *-Funnel-90-Nodes.csv

# Replace phone numbers
sed -i '' 's/555-0123/{{sender.phone}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/call me at [0-9-]*/call me at {{sender.phone}}/g' *-Funnel-90-Nodes.csv

# Replace Stanley signatures
sed -i '' 's/Best regards,\\nStanley/{{sender.signature}}/g' *-Funnel-90-Nodes.csv
sed -i '' 's/Thanks,\\nStanley/{{sender.signature}}/g' *-Funnel-90-Nodes.csv

echo ""
echo "✅ Updated CSV files:"
for file in *-Funnel-90-Nodes.csv; do
  if [ -f "$file" ]; then
    echo "   - $file"
  fi
done

echo ""
echo "📝 Backup files created with .backup extension"
echo "💡 Review changes with: diff <file>.backup <file>"
echo ""
echo "✨ Complete!"
