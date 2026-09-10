'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'

const zentripMark =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-23%20163331-14EzIqG1sI1mNUGXpNDJcZZosYe5P3.png'

const LINKS = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#everything', label: 'One call' },
  { href: '#inside', label: 'Inside the app' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [floating, setFloating] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setFloating(y > 24)
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY + 4) {
        setHidden(true)
        setOpen(false)
      } else if (y < lastY - 4) {
        setHidden(false)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`zn-header ${floating ? 'is-floating' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="zn-header-inner">
        <a className="zn-brand" href="/" aria-label="zentrip.social home">
          <img className="zn-brand-mark" src={zentripMark} alt="Zentrip Z mark" />
          <span className="zn-brand-name">
            zentrip<span className="zn-brand-dot">.</span>social
          </span>
        </a>

        <nav className="zn-nav" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="zn-header-cta">
          <a className="zn-btn zn-btn-ghost" href="/#top">
            Join waitlist
          </a>
          <a className="zn-btn zn-btn-primary zn-btn-glow" href="#try-zenny">
            <span className="zn-live-dot" />
            <AnimatedGradientText colorFrom="#00e5dc" colorTo="#e8fffc" speed={1.4} className="zn-gradient-label">
              Talk to Zenny
            </AnimatedGradientText>
          </a>
        </div>

        <button
          type="button"
          className="zn-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="zn-mobile-menu">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="/#top" onClick={() => setOpen(false)}>
            Join waitlist
          </a>
          <a className="zn-btn zn-btn-primary" href="#try-zenny" onClick={() => setOpen(false)}>
            Talk to Zenny
          </a>
        </div>
      ) : null}
    </header>
  )
}
