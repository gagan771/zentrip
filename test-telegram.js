#!/usr/bin/env node

/**
 * Telegram Bot Test Script
 * 
 * This script tests your Telegram bot configuration
 * Run: node test-telegram.js
 */

require('dotenv').config({ path: '.env' });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log('🤖 Testing Telegram Bot Configuration...\n');

// Check if credentials exist
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('❌ Error: Missing credentials in .env file\n');
  console.log('Please add these to your .env file:');
  console.log('TELEGRAM_BOT_TOKEN=your-bot-token');
  console.log('TELEGRAM_CHAT_ID=your-chat-id\n');
  process.exit(1);
}

console.log('✅ Bot Token found:', TELEGRAM_BOT_TOKEN.substring(0, 20) + '...');
console.log('✅ Chat ID found:', TELEGRAM_CHAT_ID);
console.log('\n📤 Sending test message...\n');

const testMessage = `
🧪 *Test Message from Zentrip*

This is a test notification to verify your Telegram bot is working correctly!

✅ Bot Token: Configured
✅ Chat ID: Configured
✅ Connection: Successful

Time: ${new Date().toLocaleString()}

If you received this message, your waitlist notifications are ready! 🎉
`.trim();

const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

fetch(telegramApiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: testMessage,
    parse_mode: 'Markdown',
  }),
})
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      console.log('✅ SUCCESS! Test message sent to Telegram!\n');
      console.log('Check your Telegram app to see the message.\n');
      console.log('Your waitlist notifications are working! 🎉\n');
    } else {
      console.error('❌ ERROR:', data.description || 'Unknown error');
      console.log('\nCommon issues:');
      console.log('1. Make sure you started a chat with your bot (send /start)');
      console.log('2. Verify your Bot Token is correct');
      console.log('3. Verify your Chat ID is correct\n');
    }
  })
  .catch(error => {
    console.error('❌ NETWORK ERROR:', error.message);
    console.log('\nCould not connect to Telegram API.');
    console.log('Check your internet connection.\n');
  });
