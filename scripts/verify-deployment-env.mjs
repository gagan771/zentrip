/**
 * Stops a Vercel deployment that has accidentally received a Sarvam secret.
 * Resend remains a runtime requirement for the waitlist route, but missing
 * credentials must not prevent an unrelated frontend fix from deploying.
 *
 * Local builds are deliberately unaffected: developers can work on the UI
 * without Resend credentials.
 */
if (process.env.VERCEL === '1') {
  const missing = ['RESEND_API_KEY', 'RESEND_AUDIENCE_ID'].filter((name) => !process.env[name]?.trim())
  const forbidden = ['SARVAM_API_KEY', 'SARVAM_API_KEYS'].filter((name) => process.env[name]?.trim())

  if (missing.length) {
    console.warn(`Vercel environment warning — missing: ${missing.join(', ')}. The waitlist route will be unavailable.`)
  }

  if (forbidden.length) {
    console.error(`Vercel environment configuration error — remove from this Vercel project: ${forbidden.join(', ')}.`)
    console.error('Sarvam keys belong exclusively to the Zentrip API deployment.')
    process.exit(1)
  }
}
