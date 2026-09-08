'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic, PhoneOff, Loader2 } from 'lucide-react'

import { createDemoSession, demoSocketUrl } from '@/lib/zenny-demo'
import { createPlayback, startMic, type MicHandle, type PlaybackHandle } from '@/lib/pcm-audio'

type Phase = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended' | 'error'

type DemoMessage = {
  type?: string
  phase?: string
  text?: string
  message?: string
}

const PHASE_LABEL: Record<Phase, string> = {
  idle: 'Press to talk to Zenny',
  connecting: 'Connecting…',
  listening: "Listening — ask her anything",
  speaking: 'Zenny is speaking',
  ended: 'Demo ended',
  error: 'Something went wrong',
}

export function ZennyVoiceWidget() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [level, setLevel] = useState(0)

  const socketRef = useRef<WebSocket | null>(null)
  const micRef = useRef<MicHandle | null>(null)
  const playbackRef = useRef<PlaybackHandle | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef = useRef<Phase>('idle')
  phaseRef.current = phase

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (socketRef.current) {
      try {
        socketRef.current.close()
      } catch {
        // Already closed.
      }
      socketRef.current = null
    }
    if (micRef.current) {
      micRef.current.stop()
      micRef.current = null
    }
    if (playbackRef.current) {
      playbackRef.current.stop()
      playbackRef.current = null
    }
  }, [])

  useEffect(() => () => cleanup(), [cleanup])

  const endCall = useCallback(
    (nextPhase: Phase, message?: string) => {
      try {
        socketRef.current?.send(JSON.stringify({ type: 'hangup' }))
      } catch {
        // Socket already gone.
      }
      cleanup()
      setPhase(nextPhase)
      setLevel(0)
      if (message) setError(message)
    },
    [cleanup],
  )

  const startCall = useCallback(async () => {
    setError('')
    setCaption('')
    setPhase('connecting')
    try {
      const session = await createDemoSession()
      setSecondsLeft(session.maxSeconds)
      const socket = new WebSocket(demoSocketUrl(session))
      socket.binaryType = 'arraybuffer'
      socketRef.current = socket
      playbackRef.current = createPlayback()

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Zenny took too long to answer.')), 12000)
        socket.onopen = () => {
          clearTimeout(timeout)
          resolve()
        }
        socket.onerror = () => {
          clearTimeout(timeout)
          reject(new Error("Couldn't reach Zenny's demo line."))
        }
      })

      socket.onmessage = (event) => {
        if (typeof event.data !== 'string') return
        let message: DemoMessage
        try {
          message = JSON.parse(event.data)
        } catch {
          return
        }
        if (message.type === 'audio') {
          const withData = message as DemoMessage & { data?: string; sampleRate?: number }
          if (withData.data) playbackRef.current?.play(withData.data, withData.sampleRate || 16000)
        } else if (message.type === 'status' && message.phase === 'speaking') {
          setPhase('speaking')
        } else if (message.type === 'status' && message.phase === 'listening') {
          setPhase('listening')
        } else if (message.type === 'partial' && message.text) {
          setCaption(message.text)
        } else if (message.type === 'speak' && message.text) {
          setCaption(message.text)
        } else if (message.type === 'interrupt') {
          playbackRef.current?.stop()
          setPhase('listening')
        } else if (message.type === 'error') {
          endCall('ended', message.message || 'Demo call ended.')
        }
      }
      socket.onclose = () => {
        if (phaseRef.current !== 'ended' && phaseRef.current !== 'error') {
          endCall('ended')
        }
      }

      micRef.current = await startMic((pcm, nextLevel) => {
        setLevel(nextLevel)
        if (socket.readyState === WebSocket.OPEN) {
          try {
            socket.send(pcm)
          } catch {
            // Drop a frame rather than killing the call.
          }
        }
      })

      setPhase('listening')
      timerRef.current = setInterval(() => {
        setSecondsLeft((value) => {
          if (value === null) return value
          if (value <= 1) {
            endCall('ended', "That's the end of the demo — join the waitlist for the full experience.")
            return 0
          }
          return value - 1
        })
      }, 1000)
    } catch (caught) {
      cleanup()
      setPhase('error')
      setError(caught instanceof Error ? caught.message : 'Could not start the microphone.')
    }
  }, [cleanup, endCall])

  const isLive = phase === 'listening' || phase === 'speaking' || phase === 'connecting'

  return (
    <div className="zn-widget">
      <div className={`zn-orb-wrap ${phase}`}>
        <div className="zn-orb-ring" style={{ transform: `scale(${1 + level * 0.35})` }} />
        <button
          type="button"
          className="zn-orb"
          onClick={() => (isLive ? endCall('ended') : startCall())}
          aria-label={isLive ? 'End call with Zenny' : 'Talk to Zenny'}
        >
          {phase === 'connecting' ? (
            <Loader2 size={28} className="zn-spin" />
          ) : isLive ? (
            <PhoneOff size={26} />
          ) : (
            <Mic size={28} />
          )}
        </button>
      </div>

      <p className="zn-widget-phase">{error && phase !== 'listening' && phase !== 'speaking' ? error : PHASE_LABEL[phase]}</p>

      {caption && isLive ? <p className="zn-widget-caption">&ldquo;{caption}&rdquo;</p> : null}

      {isLive && secondsLeft !== null ? (
        <p className="zn-widget-timer">{secondsLeft}s left in this demo</p>
      ) : (
        <p className="zn-widget-note">
          A 90-second live demo call — real voice, real answers, no sign-up. Allow the mic when your browser asks.
        </p>
      )}
    </div>
  )
}
