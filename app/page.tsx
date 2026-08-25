'use client'

import { FormEvent, useState, useRef, useCallback, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

const zentripMark = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-23%20163331-14EzIqG1sI1mNUGXpNDJcZZosYe5P3.png'

const journeyVideo = '/videos/main-video.mp4'

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const handleVideoEnded = useCallback(() => {
    setShowOverlay(true)

    timerRef.current = setTimeout(() => {
      setShowOverlay(false)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
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
      <video
        ref={videoRef}
        className="journey-video"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        onEnded={handleVideoEnded}
      >
        <source src={journeyVideo} type="video/mp4" />
      </video>
      <div className="journey-scrim" aria-hidden="true" />
      <div className="journey-grain" aria-hidden="true" />

      {/* ── Black overlay with logo + email form ── */}
      <div className={`pause-overlay ${showOverlay ? 'visible' : ''}`}>
        <div className="pause-content">
          <a className="brand brand--center" href="#top" aria-label="zentrip.social home">
            <img className="brand-mark brand-mark--lg" src={zentripMark} alt="Zentrip Z mark" />
            <span className="brand-name brand-name--lg">zentrip<span className="brand-dot">.</span>social</span>
          </a>

          <p className="pause-tagline">Your journey starts here.</p>
          <p className="pause-copy">A new way to discover the places, people, and stories that make travel unforgettable.</p>

          {isSubmitted ? (
            <div className="success-message success-message--center" role="status">
              <span>✓</span> You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form className="interest-form interest-form--center" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="pause-email">Email address</label>
              <input id="pause-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
              <button type="submit">Keep me posted <ArrowUpRight size={16} strokeWidth={1.6} /></button>
            </form>
          )}
          <p className="form-note">Launching soon · Join the first departure</p>
        </div>
      </div>

      {/* ── Normal page content (visible while video plays) ── */}
      <header className="journey-header">
        <a className="brand" href="#top" aria-label="zentrip.social home">
          <img className="brand-mark" src={zentripMark} alt="Zentrip Z mark" />
          <span className="brand-name">zentrip<span className="brand-dot">.</span>social</span>
        </a>
        <span className="sound-status">Sound on</span>
      </header>

      <section className="journey-hero" id="top" aria-labelledby="launch-title">
        <p className="eyebrow"><span /> An invitation to wander</p>
        <h1 id="launch-title">Your journey<br /><em>starts here.</em></h1>
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
    </main>
  )
}
