#!/bin/bash

# Quick test script for MissedCallAI webhook

echo "🧪 Testing MissedCallAI Webhook..."
echo ""

# Check if config.js exists
if [ ! -f "config.js" ]; then
    echo "❌ config.js not found!"
    echo "   Run: cp config.example.js config.js"
    echo "   Then edit config.js with your API keys"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if server is running
echo "🔍 Checking if webhook is running..."
if curl -s http://localhost:3000/webhook > /dev/null 2>&1; then
    echo "✅ Webhook is responding!"
    echo ""
    echo "Response preview:"
    curl -s http://localhost:3000/webhook | head -10
    echo ""
    echo "✅ Test passed! Your webhook is working."
else
    echo "⚠️  Webhook not responding on localhost:3000"
    echo ""
    echo "To start the webhook:"
    echo "  1. Make sure config.js is filled with your API keys"
    echo "  2. Run: node webhook.js"
    echo "  3. Then test again with: ./test-webhook.sh"
    echo ""
    echo "Or test the config file:"
    node -e "try { const c = require('./config'); console.log('✅ Config loads successfully'); console.log('   Twilio Account SID:', c.twilio.accountSid ? 'Set ✓' : 'Missing ✗'); console.log('   OpenAI API Key:', c.openai.apiKey ? 'Set ✓' : 'Missing ✗'); } catch(e) { console.log('❌ Config error:', e.message); }"
fi
