# Vercel environment setup

The main web project has two separate integrations:

| Location | Variables |
| --- | --- |
| **Vercel: this web project** | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_ZENTRIP_API_URL` |
| **Zentrip API deployment only** | `SARVAM_API_KEY` / `SARVAM_API_KEYS` and the `SARVAM_VOICE_*` values |

Never add a Sarvam key to the Vercel web project, and never prefix a secret with `NEXT_PUBLIC_`. The browser talks to the API through `NEXT_PUBLIC_ZENTRIP_API_URL`; the API uses Sarvam privately.

## Configure production

From this directory, first link the intended Vercel project interactively if it is not already linked:

```powershell
npx vercel link
```

Then add the values through Vercel's interactive CLI prompts (or the project settings), selecting **Production** for each:

```powershell
npx vercel env add RESEND_API_KEY production
npx vercel env add RESEND_AUDIENCE_ID production
npx vercel env add RESEND_FROM_EMAIL production
npx vercel env add NEXT_PUBLIC_ZENTRIP_API_URL production
```

Do not put a value after those commands: the CLI prompts for it so the secret is not recorded in shell history. The deployment warns when a required Resend value is absent, and fails before building if a Sarvam key has been added to this web project.
