import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resendFrom = process.env.RESEND_FROM_EMAIL || 'Zentrip <hello@zentrip.social>'
const resendAudienceId = process.env.RESEND_AUDIENCE_ID

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  return new Resend(apiKey)
}

function isDuplicateContactError(error: { message: string; name: string; statusCode: number | null }) {
  return error.statusCode === 409 || error.name.includes('already') || error.message.toLowerCase().includes('already exists')
}

// GET — check how many users signed up
export async function GET() {
  try {
    if (!resendAudienceId) {
      return NextResponse.json({ error: 'Waitlist audience is not configured' }, { status: 500 })
    }

    const { data, error } = await getResendClient().contacts.list({ audienceId: resendAudienceId })

    if (error) {
      console.error('Resend contacts error:', error)
      return NextResponse.json({ error: 'Could not load waitlist' }, { status: 502 })
    }

    const contacts = data?.data ?? []
    return NextResponse.json({
      total: contacts.length,
      emails: contacts.map((contact) => ({ email: contact.email, date: contact.created_at })),
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// POST — sign up a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!resendAudienceId) {
      return NextResponse.json({ error: 'Waitlist audience is not configured' }, { status: 500 })
    }

    const resend = getResendClient()
    const { error: contactError } = await resend.contacts.create({
      audienceId: resendAudienceId,
      email,
    })

    if (contactError) {
      if (isDuplicateContactError(contactError)) {
        return NextResponse.json({ message: 'Already on the list!' }, { status: 200 })
      }

      console.error('Resend contacts error:', contactError)
      return NextResponse.json({ error: 'Could not add you to the waitlist' }, { status: 502 })
    }

    // Send thank-you email via Resend
    const { error: resendError } = await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: 'Welcome to Zentrip — You\'re on the list! 🌍',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#141414;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px;text-align:center;">
              <h1 style="margin:0;color:#f3eee3;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                zentrip<span style="color:#00e5dc;">.</span>social
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:10px 40px 40px;">
              <h2 style="margin:0 0 16px;color:#00e5dc;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;font-style:italic;">
                You're on the list! 🎉
              </h2>
              <p style="margin:0 0 20px;color:#d0c8b7;font-size:15px;line-height:1.7;">
                Thanks for signing up for Zentrip. We're building something special — a new way to discover the places, people, and stories that make travel unforgettable.
              </p>
              <p style="margin:0 0 20px;color:#d0c8b7;font-size:15px;line-height:1.7;">
                You'll be among the first to know when we launch. We'll keep you updated with exclusive previews and early access.
              </p>
              <div style="margin:24px 0;padding:20px;background:#1a1a1a;border-radius:10px;border-left:3px solid #00e5dc;">
                <p style="margin:0;color:#f3eee3;font-size:14px;line-height:1.6;">
                  <strong style="color:#00e5dc;">What's next?</strong><br>
                  We're putting the finishing touches on something amazing. Stay tuned for launch updates, sneak peeks, and your invitation to explore.
                </p>
              </div>
              <p style="margin:0;color:#8a8478;font-size:13px;line-height:1.6;">
                Currently wandering India 📍
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 30px;border-top:1px solid #222;text-align:center;">
              <p style="margin:0;color:#5a5650;font-size:11px;letter-spacing:1px;text-transform:uppercase;">
                © ${new Date().getFullYear()} zentrip.social · All rights reserved
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      return NextResponse.json({ error: 'Could not send confirmation email' }, { status: 502 })
    }

    return NextResponse.json({
      message: 'Welcome aboard!',
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
