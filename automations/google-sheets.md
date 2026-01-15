# Google Sheets Integration Setup

This guide shows you how to set up Google Sheets to automatically track leads from MissedCallAI.

---

## STEP 1: CREATE YOUR GOOGLE SHEET

1. **Go to Google Sheets** (sheets.google.com)
2. **Create a new spreadsheet**
3. **Name it:** "MissedCallAI Leads"
4. **Create headers in Row 1:**
   - `Timestamp`
   - `Name`
   - `Phone`
   - `Service`
   - `Address`
   - `Urgency`
   - `Status`
   - `Notes`

---

## STEP 2: SET UP GOOGLE SHEETS API

### Option A: Simple Method (Using Service Account)

1. **Go to Google Cloud Console** (console.cloud.google.com)
2. **Create a new project** (or use existing)
3. **Enable Google Sheets API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. **Create Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name it "missedcallai-sheets"
   - Click "Create and Continue"
   - Skip role assignment (click "Continue")
   - Click "Done"

5. **Create Key:**
   - Click on your service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Download the file (save as `service-account.json`)

6. **Share Sheet with Service Account:**
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (found in the JSON file, looks like `missedcallai-sheets@your-project.iam.gserviceaccount.com`)
   - Give it "Editor" access
   - Click "Send"

---

## STEP 3: UPDATE YOUR WEBHOOK CODE

Add this to your `webhook.js`:

```javascript
const { google } = require('googleapis');
const fs = require('fs');

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync('./service-account.json'));

// Initialize Google Sheets client
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Save lead to Google Sheets
 */
async function saveToGoogleSheets(leadData) {
  const spreadsheetId = config.googleSheets.spreadsheetId;
  
  const values = [[
    new Date().toISOString(), // Timestamp
    leadData.name || '',
    leadData.phone || '',
    leadData.service || '',
    leadData.address || '',
    leadData.urgency || '',
    'New', // Status
    '' // Notes
  ]];
  
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:H', // Adjust if your sheet name is different
      valueInputOption: 'USER_ENTERED',
      resource: { values }
    });
    
    console.log('Lead saved to Google Sheets:', leadData);
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
}
```

---

## STEP 4: INSTALL GOOGLEAPIS PACKAGE

In your `voice-agent` folder, run:

```bash
npm install googleapis
```

---

## STEP 5: UPDATE CONFIG.JS

Add your spreadsheet ID to `config.js`:

```javascript
googleSheets: {
  spreadsheetId: 'YOUR_SPREADSHEET_ID', // From the Google Sheets URL
}
```

**How to find Spreadsheet ID:**
- Open your Google Sheet
- Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Copy the `SPREADSHEET_ID` part

---

## STEP 6: TEST IT

1. **Make a test call** to your Twilio number
2. **Complete a conversation** with the AI
3. **Check your Google Sheet** - the lead should appear automatically!

---

## ALTERNATIVE: SIMPLE WEBHOOK METHOD

If you don't want to use the Google Sheets API, you can use Zapier or Make.com:

1. **Set up a webhook** that receives lead data
2. **Use Zapier/Make** to add rows to Google Sheets
3. **No coding required!**

### Zapier Method:

1. Create Zap
2. Trigger: Webhook by Zapier - Catch Hook
3. Action: Google Sheets - Create Spreadsheet Row
4. Map fields
5. Get webhook URL
6. Update your `webhook.js` to POST to that URL

---

## FORMATTING YOUR SHEET

### Conditional Formatting:

**Highlight urgent leads:**
1. Select "Urgency" column
2. Format → Conditional formatting
3. If cell contains "emergency" → Red background

**Highlight new leads:**
1. Select "Status" column
2. Format → Conditional formatting
3. If cell contains "New" → Yellow background

---

## AUTOMATIC NOTIFICATIONS

### Email Notifications (Using Google Apps Script):

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Paste this code:**

```javascript
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const row = e.range.getRow();
  
  // Check if it's a new row (row 2 or later)
  if (row > 1) {
    const urgency = sheet.getRange(row, 6).getValue(); // Urgency column
    
    if (urgency === 'emergency') {
      // Send email
      const name = sheet.getRange(row, 2).getValue();
      const phone = sheet.getRange(row, 3).getValue();
      const service = sheet.getRange(row, 4).getValue();
      
      MailApp.sendEmail({
        to: 'your-email@example.com',
        subject: `🚨 Emergency Lead: ${name} - ${service}`,
        body: `New emergency lead:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n\nCall them ASAP!`
      });
    }
  }
}
```

4. **Save and authorize**
5. **Now you'll get emails for emergency leads!**

---

## ADVANCED: DASHBOARD VIEW

Create a second sheet for a dashboard:

**Sheet 2: Dashboard**

```
Total Leads: =COUNTA(Sheet1!B:B)-1
New Leads: =COUNTIF(Sheet1!G:G,"New")
Emergency Leads: =COUNTIF(Sheet1!F:F,"emergency")
This Week: =COUNTIFS(Sheet1!A:A,">="&TODAY()-7)
```

---

## TROUBLESHOOTING

### Leads not appearing:
- Check service account has access to sheet
- Verify spreadsheet ID is correct
- Check webhook logs for errors
- Ensure Google Sheets API is enabled

### Permission errors:
- Make sure service account email has "Editor" access
- Re-share the sheet if needed

### API quota exceeded:
- Google Sheets API: 100 requests per 100 seconds per user
- If you have many leads, add rate limiting

---

## SECURITY BEST PRACTICES

1. **Don't commit service-account.json to Git**
   - Add to `.gitignore`
   - Use environment variables in production

2. **Limit service account permissions**
   - Only give access to the specific sheet
   - Don't give full Google Drive access

3. **Rotate keys regularly**
   - Create new keys every 6-12 months

---

## EXAMPLE: COMPLETE INTEGRATION

**Flow:**
1. Customer calls → AI answers
2. AI collects lead data
3. Webhook saves to Google Sheet
4. Zapier detects new row
5. Adds to CRM
6. Sends notifications
7. You see the lead in real-time

**All automatic!**

---

That's it! Your Google Sheets integration is set up.

Need help? Check the Google Sheets API documentation.

Good luck! 📊
