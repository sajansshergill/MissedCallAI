/**
 * MissedCallAI - Twilio Webhook Handler
 * 
 * This webhook handles incoming calls, processes them with OpenAI,
 * and manages the conversation flow including booking and SMS.
 */

const twilio = require('twilio');
const OpenAI = require('openai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load config with better error handling
let config;
try {
  config = require('./config');
} catch (error) {
  console.error('❌ ERROR: config.js not found!');
  console.error('   Please create config.js from config.example.js');
  console.error('   Run: cp config.example.js config.js');
  console.error('   Then edit config.js with your API keys');
  process.exit(1);
}

// Validate config
function validateConfig() {
  const errors = [];
  
  if (!config.twilio || !config.twilio.accountSid || config.twilio.accountSid.includes('YOUR_')) {
    errors.push('Twilio Account SID is missing or not configured');
  }
  if (!config.twilio || !config.twilio.authToken || config.twilio.authToken.includes('YOUR_')) {
    errors.push('Twilio Auth Token is missing or not configured');
  }
  if (!config.twilio || !config.twilio.phoneNumber || config.twilio.phoneNumber === '+1234567890') {
    errors.push('Twilio Phone Number is missing or not configured');
  }
  if (!config.openai || !config.openai.apiKey || config.openai.apiKey.includes('YOUR_')) {
    errors.push('OpenAI API Key is missing or not configured');
  }
  if (!config.calendly || !config.calendly.eventLink || config.calendly.eventLink.includes('yourname')) {
    errors.push('Calendly Event Link is missing or not configured');
  }
  
  if (errors.length > 0) {
    console.error('❌ Configuration Errors:');
    errors.forEach(err => console.error('   -', err));
    console.error('');
    console.error('Please edit config.js and add your API keys.');
    console.error('See START_HERE.md for setup instructions.');
    return false;
  }
  
  return true;
}

// Only validate if running as main script (not when required as module)
if (require.main === module) {
  if (!validateConfig()) {
    process.exit(1);
  }
}

// Initialize clients (with error handling)
let twilioClient;
let openai;

try {
  twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
  openai = new OpenAI({ apiKey: config.openai.apiKey });
} catch (error) {
  console.error('❌ Error initializing clients:', error.message);
  if (require.main === module) {
    process.exit(1);
  }
}

// Conversation state storage (in production, use Redis or database)
const conversations = new Map();

/**
 * Main webhook handler for Twilio
 */
async function handleIncomingCall(req, res) {
  const callSid = req.body.CallSid;
  const from = req.body.From;
  const to = req.body.To;
  
  // Initialize conversation
  if (!conversations.has(callSid)) {
    conversations.set(callSid, {
      callSid,
      callerPhone: from,
      businessPhone: to,
      messages: [],
      leadData: {
        name: '',
        phone: from,
        service: '',
        address: '',
        urgency: '',
        status: 'new'
      }
    });
  }
  
  const conversation = conversations.get(callSid);
  
  // TwiML response for call handling
  const twiml = new twilio.twiml.VoiceResponse();
  
  // Use <Gather> to collect speech input
  const gather = twiml.gather({
    input: 'speech',
    action: '/webhook/process',
    method: 'POST',
    speechTimeout: 'auto',
    language: 'en-US',
    enhanced: true
  });
  
  // Initial greeting
  if (conversation.messages.length === 0) {
    gather.say('Hello! Thank you for calling. I\'m an AI assistant here to help you. How can I assist you today?');
  } else {
    gather.say('I\'m listening. Please continue.');
  }
  
  // If no input, redirect to process
  twiml.redirect('/webhook/process');
  
  res.type('text/xml');
  res.send(twiml.toString());
}

/**
 * Process speech input with OpenAI
 */
async function processSpeech(req, res) {
  const callSid = req.body.CallSid;
  const speechResult = req.body.SpeechResult || '';
  const from = req.body.From;
  
  const conversation = conversations.get(callSid);
  if (!conversation) {
    return res.status(400).send('Conversation not found');
  }
  
  // Add user message to conversation
  conversation.messages.push({ role: 'user', content: speechResult });
  
  // Get AI prompt
  const systemPrompt = getSystemPrompt(conversation.leadData);
  
  // Call OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    const aiResponse = completion.choices[0].message.content;
    conversation.messages.push({ role: 'assistant', content: aiResponse });
    
    // Extract structured data from conversation
    extractLeadData(conversation, aiResponse);
    
    // Check if booking is complete
    const bookingComplete = checkBookingComplete(conversation.leadData);
    
    const twiml = new twilio.twiml.VoiceResponse();
    
    if (bookingComplete) {
      // Book appointment and send confirmation
      const bookingLink = await createBooking(conversation.leadData);
      
      twiml.say(`Perfect! I've got all the information I need. ${aiResponse}`);
      twiml.say(`I'm sending you a text message with a link to book your appointment. Is there anything else I can help you with?`);
      
      // Send SMS with booking link
      await sendSMS(conversation.callerPhone, 
        `Hi ${conversation.leadData.name || 'there'}, thanks for calling! Book your appointment here: ${bookingLink}`);
      
      // Save to Google Sheets
      await saveToGoogleSheets(conversation.leadData);
      
      // Notify business owner
      await notifyOwner(conversation.leadData);
      
      twiml.say('Thank you for calling. Have a great day!');
      twiml.hangup();
    } else {
      // Continue conversation
      const gather = twiml.gather({
        input: 'speech',
        action: '/webhook/process',
        method: 'POST',
        speechTimeout: 'auto',
        language: 'en-US',
        enhanced: true
      });
      
      gather.say(aiResponse);
      twiml.redirect('/webhook/process');
    }
    
    res.type('text/xml');
    res.send(twiml.toString());
    
  } catch (error) {
    console.error('OpenAI Error:', error);
    
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('I apologize, but I\'m having trouble processing that. Could you please repeat?');
    twiml.redirect('/webhook/process');
    
    res.type('text/xml');
    res.send(twiml.toString());
  }
}

/**
 * Get system prompt for AI agent
 */
function getSystemPrompt(leadData) {
  try {
    let prompt = fs.readFileSync(path.join(__dirname, 'prompt.txt'), 'utf8');
    
    // Replace placeholders
    prompt = prompt.replace('{{CALENDLY_LINK}}', config.calendly.eventLink);
    
    return prompt;
  } catch (error) {
    // Fallback prompt
    return `You are a friendly AI receptionist for a local service business. 
    Your job is to:
    1. Greet callers warmly
    2. Ask for their name, phone number, service needed, address, and urgency
    3. Be conversational and natural
    4. Once you have all information, confirm the details and offer to book an appointment
    5. Keep responses under 2 sentences
    
    Current conversation data collected: ${JSON.stringify(leadData)}`;
  }
}

/**
 * Extract structured data from conversation
 */
function extractLeadData(conversation, aiResponse) {
  const messages = conversation.messages.join(' ');
  
  // Simple extraction (in production, use more sophisticated NLP)
  const nameMatch = messages.match(/(?:name is|I'm|I am|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch) conversation.leadData.name = nameMatch[1];
  
  const serviceMatch = messages.match(/(?:need|want|looking for|service).*?(plumb|hvac|electric|septic|tow|clean)/i);
  if (serviceMatch) conversation.leadData.service = serviceMatch[1];
  
  const addressMatch = messages.match(/(?:address|location|at)\s+([0-9]+\s+[A-Za-z0-9\s,]+)/i);
  if (addressMatch) conversation.leadData.address = addressMatch[1];
  
  const urgencyMatch = messages.match(/(urgent|emergency|asap|soon|today)/i);
  if (urgencyMatch) conversation.leadData.urgency = urgencyMatch[1];
}

/**
 * Check if booking is complete
 */
function checkBookingComplete(leadData) {
  return leadData.name && 
         leadData.service && 
         leadData.address && 
         (leadData.phone || leadData.phone.length > 0);
}

/**
 * Create booking (returns Calendly link)
 */
async function createBooking(leadData) {
  // For now, return Calendly link
  // In production, you could create actual calendar events via Calendly API
  return config.calendly.eventLink;
}

/**
 * Send SMS via Twilio
 */
async function sendSMS(to, message) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: config.twilio.phoneNumber,
      to: to
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error('SMS Error:', error);
  }
}

/**
 * Save lead to Google Sheets
 */
async function saveToGoogleSheets(leadData) {
  // See automations/google-sheets.md for full implementation
  // This is a placeholder - implement using Google Sheets API
  console.log('Saving to Google Sheets:', leadData);
  
  // Example implementation would use googleapis library
  // const { google } = require('googleapis');
  // ... implementation here
}

/**
 * Notify business owner
 */
async function notifyOwner(leadData) {
  // Send SMS to business owner about new lead
  const ownerPhone = process.env.OWNER_PHONE || config.ownerPhone;
  if (ownerPhone) {
    await sendSMS(ownerPhone, 
      `New Lead: ${leadData.name} - ${leadData.service} - ${leadData.phone}`);
  }
}

// Express.js setup (if using Express)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleIncomingCall,
    processSpeech
  };
}

// For serverless/standalone deployment
if (require.main === module) {
  const express = require('express');
  const app = express();
  
  app.use(express.urlencoded({ extended: true }));
  
  app.post('/webhook', handleIncomingCall);
  app.post('/webhook/process', processSpeech);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`MissedCallAI webhook running on port ${PORT}`);
  });
}
