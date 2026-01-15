/**
 * MissedCallAI Configuration
 * 
 * Copy this file to config.js and fill in your API keys
 */

module.exports = {
  twilio: {
    accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
    authToken: 'YOUR_TWILIO_AUTH_TOKEN',
    phoneNumber: '+1234567890' // Your Twilio phone number
  },
  openai: {
    apiKey: 'sk-YOUR_OPENAI_API_KEY'
  },
  calendly: {
    eventLink: 'https://calendly.com/yourname/demo' // Your Calendly event link
  },
  googleSheets: {
    spreadsheetId: 'YOUR_GOOGLE_SHEET_ID', // From Google Sheets URL
    // Service account credentials - see automations/google-sheets.md
  },
  ownerPhone: '+1234567890' // Your phone number for lead notifications (optional)
};
