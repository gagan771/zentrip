const PRODUCTION_API_BASE = 'https://api.zentrip.social'
const configuredApiBase = (process.env.NEXT_PUBLIC_ZENTRIP_API_URL || PRODUCTION_API_BASE).replace(/\/$/, '')

function isLocalApi(url: string) {
  return /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/i.test(url)
}

// Local development sets NEXT_PUBLIC_ZENTRIP_API_URL to 127.0.0.1 in .env.local.
// Do not let a mistakenly copied localhost setting make a deployed browser call
// the visitor's own computer.
const API_BASE =
  typeof window !== 'undefined' && !isLocalApi(window.location.origin) && isLocalApi(configuredApiBase)
    ? PRODUCTION_API_BASE
    : configuredApiBase

export type DemoSession = {
  wsUrl: string
  ticket: string
  sampleRate: number
  maxSeconds: number
}

export async function createDemoSession(): Promise<DemoSession> {
  const response = await fetch(`${API_BASE}/v1/public/zenny/demo/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Zenny is popular right now — try the live demo again in a little while.")
    }
    let detail = ''
    try {
      detail = (await response.json())?.detail || ''
    } catch {
      // Non-JSON error body — fall through to the generic message.
    }
    throw new Error(detail || "Couldn't reach Zenny's demo line. Try again shortly.")
  }
  return response.json()
}

export function demoSocketUrl(session: DemoSession): string {
  if (session.wsUrl.startsWith('ws://') || session.wsUrl.startsWith('wss://')) return session.wsUrl
  const root = API_BASE.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:')
  return `${root}${session.wsUrl}`
}
