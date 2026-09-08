// Browser-only helpers for the live Sarvam Voice Agent demo: capture the mic as
// 16 kHz PCM16 frames, and play back the PCM16 frames Zenny sends over the wire.
// Mirrors the logic in zentrip/services/api's zenny-sarvam-call.html test page.

export type MicHandle = {
  stop: () => void
}

function downsampleTo16k(float32: Float32Array, inRate: number): Float32Array {
  if (inRate === 16000) return float32
  const ratio = inRate / 16000
  const outLength = Math.round(float32.length / ratio)
  const result = new Float32Array(outLength)
  let outIdx = 0
  let inIdx = 0
  while (outIdx < outLength) {
    const nextInIdx = Math.round((outIdx + 1) * ratio)
    let sum = 0
    let count = 0
    for (let i = inIdx; i < nextInIdx && i < float32.length; i++) {
      sum += float32[i]
      count++
    }
    result[outIdx] = count ? sum / count : 0
    outIdx++
    inIdx = nextInIdx
  }
  return result
}

function floatTo16BitPCM(float32: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32.length * 2)
  const view = new DataView(buffer)
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]))
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return buffer
}

export async function startMic(
  onFrame: (pcm: ArrayBuffer, level: number) => void,
): Promise<MicHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } })
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new AudioCtx()
  const source = ctx.createMediaStreamSource(stream)
  const node = ctx.createScriptProcessor(4096, 1, 1)
  node.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0)
    const down = downsampleTo16k(input, ctx.sampleRate)
    let peak = 0
    for (let i = 0; i < down.length; i++) peak = Math.max(peak, Math.abs(down[i]))
    onFrame(floatTo16BitPCM(down), Math.min(1, peak * 3))
  }
  source.connect(node)
  node.connect(ctx.destination)
  return {
    stop: () => {
      node.disconnect()
      node.onaudioprocess = null
      source.disconnect()
      void ctx.close()
      stream.getTracks().forEach((track) => track.stop())
    },
  }
}

export type PlaybackHandle = {
  play: (base64: string, sampleRate: number) => void
  stop: () => void
}

export function createPlayback(): PlaybackHandle {
  let ctx: AudioContext | null = null
  let nextPlayTime = 0
  let sources: AudioBufferSourceNode[] = []

  return {
    play(base64: string, sampleRate: number) {
      if (!ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        ctx = new AudioCtx()
      }
      const raw = atob(base64)
      const bytes = new Uint8Array(raw.length)
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
      const int16 = new Int16Array(bytes.buffer)
      const float32 = new Float32Array(int16.length)
      for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 0x8000
      const buffer = ctx.createBuffer(1, float32.length, sampleRate || 16000)
      buffer.copyToChannel(float32, 0)
      const node = ctx.createBufferSource()
      node.buffer = buffer
      node.connect(ctx.destination)
      const now = ctx.currentTime
      const startAt = nextPlayTime > now ? nextPlayTime : now + 0.05
      node.start(startAt)
      nextPlayTime = startAt + buffer.duration
      sources.push(node)
      node.onended = () => {
        sources = sources.filter((s) => s !== node)
      }
    },
    stop() {
      for (const node of sources) {
        try {
          node.stop()
        } catch {
          // Already stopped.
        }
      }
      sources = []
      nextPlayTime = 0
    },
  }
}
