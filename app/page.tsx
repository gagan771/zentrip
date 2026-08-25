'use client'

import { FormEvent, useState, useRef, useCallback, useEffect } from 'react'
import { ArrowUpRight, Volume2 } from 'lucide-react'

const zentripMark = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-23%20163331-14EzIqG1sI1mNUGXpNDJcZZosYe5P3.png'

const journeyVideo = '/videos/main-video.mp4'

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  // Click "Explore" → unmute, play video, hide splash
  function handleExplore() {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
    setStarted(true)
  }

  // Video ended → wait 5s → replay
  const handleVideoEnded = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      }
    }, 5000)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <main className="journey-page">
      {/* Video preloads silently behind splash */}
      <video
        ref={videoRef}
        className="journey-video"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={handleVideoEnded}
      >
        <source src={journeyVideo} type="video/mp4" />
      </video>
      <div className="journey-scrim" aria-hidden="true" />
      <div className="journey-grain" aria-hidden="true" />

      {/* ── Splash intro screen ── */}
      <div className={`splash-screen ${started ? 'hide' : ''}`}>
        <div className="splash-content">
          <a className="brand brand--splash" href="#top" aria-label="zentrip.social home">
            <img className="brand-mark brand-mark--splash" src={zentripMark} alt="Zentrip Z mark" />
            <span className="brand-name brand-name--splash">zentrip<span className="brand-dot">.</span>social</span>
          </a>

          <h2 className="splash-title">Your journey starts here.</h2>
          <p className="splash-copy">A new way to discover the places, people, and stories that make travel unforgettable.</p>

          <button className="explore-btn" onClick={handleExplore}>
            <Volume2 size={18} strokeWidth={1.8} />
            <span>Explore</span>
          </button>
        </div>
      </div>

      {/* ── Main page content (revealed after Explore) ── */}
      <div className={`page-content ${started ? 'visible' : ''}`}>
        <header className="journey-header">
          <a className="brand" href="#top" aria-label="zentrip.social home">
            <img className="brand-mark" src={zentripMark} alt="Zentrip Z mark" />
            <span className="brand-name">zentrip<span className="brand-dot">.</span>social</span>
          </a>
          <span className="sound-status">Sound on</span>
        </header>

        <section className="journey-hero" id="top" aria-labelledby="launch-title">
          <p className="eyebrow"><span /> An invitation to wander</p>
          <h1 id="launch-title">One place solution<br /><em>for all travel problems.</em></h1>
          <p className="hero-copy">A new way to discover the places, people, and stories that make travel unforgettable.</p>
          {isSubmitted ? (
            <div className="success-message" role="status">
              <span>✓</span> You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form className="interest-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
              <button type="submit">Keep me posted <ArrowUpRight size={16} strokeWidth={1.6} /></button>
            </form>
          )}
          <p className="form-note">Launching soon · Join the first departure</p>
        </section>

        <footer className="journey-footer">
          <span className="location-note"><i /> Currently wandering India</span>
        </footer>
      </div>
    </main>
  )
}
