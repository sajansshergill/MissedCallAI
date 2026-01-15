#!/bin/bash

# MissedCallAI - Package for Submission Script
# This script creates a clean ZIP file for Agent Rise Marketplace submission

echo "📦 Packaging MissedCallAI for Submission..."
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Output filename
OUTPUT_FILE="MissedCallAI-Submission.zip"

# Remove old ZIP if it exists
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Removing old ZIP file..."
    rm "$OUTPUT_FILE"
fi

# Create ZIP excluding sensitive files
echo "📦 Creating ZIP file..."
zip -r "$OUTPUT_FILE" . \
    -x "*.git*" \
    -x "*node_modules*" \
    -x "*config.js" \
    -x "*service-account.json" \
    -x "*.env*" \
    -x "*.DS_Store" \
    -x "*__pycache__*" \
    -x "*.log" \
    -x "*.swp" \
    -x "*.swo" \
    -x "*~" \
    -x "$OUTPUT_FILE" \
    > /dev/null 2>&1

# Check if ZIP was created successfully
if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "✅ ZIP file created successfully!"
    echo "   File: $OUTPUT_FILE"
    echo "   Size: $FILE_SIZE"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Verify contents: unzip -l $OUTPUT_FILE"
    echo "   2. Test extraction: unzip $OUTPUT_FILE -d test-extraction"
    echo "   3. Review PACKAGE_FOR_SUBMISSION.md for submission details"
    echo ""
    echo "🚀 Ready to submit!"
else
    echo "❌ Error: Failed to create ZIP file"
    exit 1
fi
