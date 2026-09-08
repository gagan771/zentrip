'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function WaitlistForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get('email') as string
    setSubmitError(false)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error('Unable to join waitlist')
      setIsSubmitted(true)
    } catch {
      setSubmitError(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`zn-waitlist-success zn-waitlist-${variant}`} role="status">
        <span>✓</span> You&apos;re on the list. We&apos;ll be in touch.
      </div>
    )
  }

  return (
    <div className={`zn-waitlist zn-waitlist-${variant}`}>
      <form className="zn-waitlist-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input id="footer-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
        <button type="submit">
          Keep me posted <ArrowUpRight size={16} strokeWidth={1.6} />
        </button>
      </form>
      {submitError && <p className="zn-waitlist-error">We couldn&apos;t add you right now. Please try again.</p>}
    </div>
  )
}
