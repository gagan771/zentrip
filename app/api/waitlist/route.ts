import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Get Telegram Bot credentials from environment variables
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      console.error('Telegram credentials not configured');
      return NextResponse.json({ 
        error: 'Notification service not configured' 
      }, { status: 500 });
    }

    // Prepare the message with detailed information
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Get additional info from request
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'Unknown';
    const referer = request.headers.get('referer') || 'Direct';

    // Format message for Telegram
    const message = `
🎉 *New Waitlist Signup!*

📧 *Email:* \`${email.toLowerCase().trim()}\`
📅 *Date:* ${timestamp}
🌐 *IP Address:* ${ip}
🖥️ *User Agent:* ${userAgent}
🔗 *Referrer:* ${referer}

---
Total signups: Check your database!
    `.trim();

    // Send message to Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ 
        error: 'Failed to send notification' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Successfully joined the waitlist!',
      email: email.toLowerCase().trim() 
    });

  } catch (error: any) {
    console.error('Error processing waitlist:', error);
    
    return NextResponse.json({ 
      error: 'Failed to join waitlist. Please try again.' 
    }, { status: 500 });
  }
}