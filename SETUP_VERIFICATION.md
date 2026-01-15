# ✅ Setup Verification Checklist

Use this checklist to verify your MissedCallAI setup is working correctly before going live or submitting.

---

## Pre-Setup Verification

### ✅ Files Present

- [ ] `voice-agent/webhook.js` exists
- [ ] `voice-agent/prompt.txt` exists
- [ ] `voice-agent/config.example.js` exists
- [ ] `voice-agent/package.json` exists
- [ ] `website/index.html` exists
- [ ] All documentation files present

### ✅ Configuration

- [ ] Created `config.js` from `config.example.js`
- [ ] Twilio Account SID added
- [ ] Twilio Auth Token added
- [ ] Twilio Phone Number added
- [ ] OpenAI API Key added
- [ ] Calendly Event Link added
- [ ] Google Sheets ID added (if using)

---

## Step-by-Step Verification

### Step 1: Dependencies Installation

```bash
cd voice-agent
npm install
```

**Verify:**
- [ ] No errors during installation
- [ ] `node_modules/` folder created
- [ ] All packages installed (twilio, openai, express, axios)

---

### Step 2: Configuration Check

**Verify config.js:**

```javascript
// Check these values are filled (not placeholders):
- config.twilio.accountSid !== 'YOUR_TWILIO_ACCOUNT_SID'
- config.twilio.authToken !== 'YOUR_TWILIO_AUTH_TOKEN'
- config.twilio.phoneNumber !== '+1234567890'
- config.openai.apiKey !== 'sk-YOUR_OPENAI_API_KEY'
- config.calendly.eventLink !== 'https://calendly.com/yourname/demo'
```

**Test:**
```bash
node -e "const config = require('./config'); console.log('Config loaded:', !!config.twilio.accountSid);"
```

- [ ] Config loads without errors
- [ ] All values are real (not placeholders)

---

### Step 3: Local Testing

**Start server locally:**

```bash
cd voice-agent
node webhook.js
```

**Verify:**
- [ ] Server starts without errors
- [ ] Port 3000 (or specified port) is listening
- [ ] No error messages in console

**Test webhook endpoint:**

```bash
curl http://localhost:3000/webhook
```

- [ ] Returns TwiML response (XML)
- [ ] No errors in server logs

---

### Step 4: Deployment Verification

**Deploy to your chosen platform:**

- [ ] Deployment successful
- [ ] Webhook URL accessible (not localhost)
- [ ] Can access webhook URL in browser
- [ ] No errors in deployment logs

**Test deployed webhook:**

```bash
curl https://your-webhook-url.com/webhook
```

- [ ] Returns TwiML response
- [ ] URL is HTTPS (required by Twilio)

---

### Step 5: Twilio Integration

**Configure Twilio webhook:**

- [ ] Logged into Twilio Console
- [ ] Selected your phone number
- [ ] Set webhook URL: `https://your-webhook-url.com/webhook`
- [ ] Method set to POST
- [ ] Saved configuration

**Verify in Twilio:**
- [ ] Webhook URL is correct
- [ ] Phone number is active
- [ ] Account has credits

---

### Step 6: Test Call

**Make a test call:**

1. Call your Twilio phone number
2. Listen for AI greeting

**Verify:**
- [ ] Call connects
- [ ] AI answers (not voicemail)
- [ ] AI speaks clearly
- [ ] Can have a conversation
- [ ] AI asks qualification questions

**Test full flow:**
- [ ] Provide name
- [ ] Provide service needed
- [ ] Provide address
- [ ] AI confirms details
- [ ] AI offers to book

---

### Step 7: SMS Verification

**After test call:**

- [ ] Received SMS with booking link
- [ ] SMS sent to caller (if you called from another number)
- [ ] Owner notification SMS received (if configured)
- [ ] SMS contains correct information

---

### Step 8: Google Sheets Integration

**Check Google Sheet:**

- [ ] Lead appears in sheet
- [ ] All fields populated (Name, Phone, Service, Address, Urgency)
- [ ] Timestamp is correct
- [ ] Status is "New"

**If using service account:**
- [ ] Service account JSON file exists
- [ ] Service account has access to sheet
- [ ] API is enabled in Google Cloud Console

---

### Step 9: Website Verification

**Check website:**

- [ ] Website loads correctly
- [ ] All sections visible
- [ ] Mobile responsive
- [ ] Calendly link/embed works
- [ ] CTA buttons work
- [ ] No broken links

**Test on different devices:**
- [ ] Desktop
- [ ] Mobile
- [ ] Tablet

---

### Step 10: End-to-End Test

**Complete flow test:**

1. [ ] Call Twilio number
2. [ ] AI answers and qualifies
3. [ ] Lead saved to Google Sheets
4. [ ] SMS sent to caller
5. [ ] Owner notified
6. [ ] Can book via Calendly link
7. [ ] All data accurate

---

## Common Issues & Fixes

### ❌ "Cannot find module 'config'"

**Fix:**
- Make sure `config.js` exists (not just `config.example.js`)
- Run from `voice-agent/` directory
- Check file name is exactly `config.js`

---

### ❌ "Twilio webhook returns 404"

**Fix:**
- Verify webhook URL is correct in Twilio
- Check webhook is deployed and accessible
- Test URL in browser (should return XML)
- Verify route is `/webhook` (not `/webhook/`)

---

### ❌ "AI doesn't answer calls"

**Fix:**
- Check Twilio webhook is set correctly
- Verify webhook URL is HTTPS (not HTTP)
- Check server logs for errors
- Verify OpenAI API key is valid
- Check Twilio account has credits

---

### ❌ "Leads not saving to Google Sheets"

**Fix:**
- Verify spreadsheet ID is correct
- Check service account has access
- Verify Google Sheets API is enabled
- Check webhook logs for errors
- Test Google Sheets API connection

---

### ❌ "SMS not sending"

**Fix:**
- Verify Twilio phone number is SMS-enabled
- Check Twilio account balance
- Verify phone number format (+1234567890)
- Check webhook logs for errors

---

## Performance Verification

### Response Times

- [ ] AI responds within 2-3 seconds
- [ ] Webhook responds quickly (< 1 second)
- [ ] Google Sheets saves within 5 seconds
- [ ] SMS sends within 10 seconds

### Reliability

- [ ] Handles multiple calls simultaneously
- [ ] No crashes during long conversations
- [ ] Gracefully handles errors
- [ ] Recovers from API failures

---

## Security Verification

### ✅ Security Checklist

- [ ] No API keys in code (all in config.js)
- [ ] `config.js` in `.gitignore`
- [ ] Webhook uses HTTPS
- [ ] No sensitive data in logs
- [ ] Service account has minimal permissions

---

## Final Verification

Before going live or submitting:

- [ ] All tests pass
- [ ] No errors in logs
- [ ] Documentation is complete
- [ ] Website is live
- [ ] Demo video recorded (optional)
- [ ] Sales materials ready

---

## Quick Test Script

Run this to verify basic setup:

```bash
#!/bin/bash
echo "Testing MissedCallAI Setup..."

# Check files
echo "✓ Checking files..."
[ -f "voice-agent/webhook.js" ] && echo "  ✓ webhook.js exists" || echo "  ✗ webhook.js missing"
[ -f "voice-agent/config.js" ] && echo "  ✓ config.js exists" || echo "  ✗ config.js missing (create from config.example.js)"

# Check config
echo "✓ Checking config..."
node -e "try { const c = require('./voice-agent/config'); console.log('  ✓ Config loads'); } catch(e) { console.log('  ✗ Config error:', e.message); }"

# Check dependencies
echo "✓ Checking dependencies..."
[ -d "voice-agent/node_modules" ] && echo "  ✓ Dependencies installed" || echo "  ✗ Run: npm install"

echo "Setup verification complete!"
```

Save as `verify-setup.sh` and run: `chmod +x verify-setup.sh && ./verify-setup.sh`

---

**✅ If all checks pass, you're ready to go live!**

Good luck! 🚀
