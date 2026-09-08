const API_BASE = (process.env.NEXT_PUBLIC_ZENTRIP_API_URL || 'http://127.0.0.1:8001').replace(/\/$/, '')

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
