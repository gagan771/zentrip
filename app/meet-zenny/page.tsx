import type { Metadata } from 'next'
import {
  Languages,
  MapPinned,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Route,
  Volume2,
  Ear,
  Zap,
  Plane,
  Car,
  ShoppingBag,
  Camera,
  CalendarClock,
  Compass,
  CalendarRange,
  GitCompare,
  BookOpen,
  Users,
  Mountain,
} from 'lucide-react'

import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { WaitlistForm } from '@/components/site/waitlist-form'
import { ZennyVoiceWidget } from '@/components/zenny/voice-widget'
import { PartnerBadge } from '@/components/zenny/partner-badge'
import './meet-zenny.css'

export const metadata: Metadata = {
  title: 'Meet Zenny — zentrip.social',
  description:
    "Zenny is zentrip's AI travel companion for India: a live voice conversation, grounded in reviewed local knowledge, always one call away. Talk to her right now.",
  keywords: [
    'AI travel companion India',
    'voice AI travel assistant',
    'India trip planning app',
    'Zenny zentrip',
    'one app for flights hotels cabs India',
    'Sarvam voice agent',
  ],
  openGraph: {
    title: 'Meet Zenny — the one-call travel companion for India',
    description:
      "Flights, hotels, cabs, groceries, translation, safety — one voice ties it all together. Grounded in reviewed local knowledge, in 11 Indian languages. Talk to her right now.",
    url: 'https://www.zentrip.social/meet-zenny',
    siteName: 'zentrip.social',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Zenny — the one-call travel companion for India',
    description:
      "You don't need to know which app is for what. Open Zenny — she'll guide you and get exactly what you need.",
  },
}

const FEATURES = [
  {
    icon: MapPinned,
    tone: 'sky' as const,
    title: 'Grounded in real places',
    copy:
      "Monuments, seasons, food districts, typical routes — sourced and reviewed, not invented on the fly. If Zenny isn't sure, she says so instead of guessing.",
    bullets: ['Delhi, Agra & Jaipur knowledge base', 'Cited, reviewed sources', 'No hallucinated facts'],
  },
  {
    icon: Languages,
    tone: 'indigo' as const,
    title: 'Speaks your language',
    copy:
      'Hindi, Tamil, Telugu, Bengali, Malayalam, Marathi, Gujarati, Kannada, Punjabi, Odia, and English — natural voice, not a phrasebook.',
    bullets: ['11 Indian languages', 'Natural, spoken replies', 'Switches mid-conversation'],
  },
  {
    icon: ShieldCheck,
    tone: 'cyan' as const,
    title: 'Help when it matters',
    copy:
      'The 112 emergency line, UPI and cash guidance, common scam patterns — built into the conversation, not buried in a help article.',
    bullets: ['112 emergency line, always on hand', 'UPI & cash explainers', 'Scam-pattern awareness'],
  },
]

const APP_SCOPE = [
  {
    icon: Plane,
    title: 'Flights, trains & hotels',
    copy: 'Search it, and Zenny lines up trusted booking partners so you check out in one tap.',
    partners: ['MakeMyTrip', 'IRCTC', 'IndiGo', 'Booking.com', 'Airbnb'],
  },
  {
    icon: Car,
    title: 'Cabs & local rides',
    copy: 'Real fare comparisons across providers before you book a single ride.',
    partners: ['Uber', 'Ola', 'Rapido', 'Namma Yatri'],
  },
  {
    icon: ShoppingBag,
    title: 'Groceries & daily needs',
    copy: 'Say what you need — she hands it to the right app already knowing your address.',
    partners: ['Blinkit', 'Zepto', 'Swiggy Instamart', 'Flipkart Minutes'],
  },
  { icon: Camera, title: 'Live translation', copy: 'Point your camera or your voice at a menu, a sign, or a conversation.' },
  { icon: CalendarClock, title: 'A trip timeline that remembers', copy: 'Every leg of the journey in one place, so you never repeat yourself.' },
  { icon: Compass, title: 'Explore & discover', copy: 'Monuments, trails, and hidden spots — vetted for travellers, not influencers.' },
]

const APP_AREAS = [
  {
    icon: CalendarRange,
    label: 'Plan',
    items: [
      { name: 'Trip architect', copy: 'Cities, dates, and a budget level — backpacker, comfort, luxury, or mixed — turned into a day-by-day itinerary.' },
      { name: 'Adaptive plans', copy: 'When a day slips, Zenny re-plans around it and asks you to approve the change rather than silently rewriting it.' },
      { name: 'Traveller profile', copy: 'Pace, interests, walking tolerance, wake and sleep times shape what gets suggested.' },
      { name: 'Offline trip pack', copy: 'Download the itinerary, booking refs, stay address, and emergency numbers so today works with no signal.' },
    ],
  },
  {
    icon: GitCompare,
    label: 'Decide',
    items: [
      { name: 'Compare & decide', copy: 'Trains, buses, flights, and cabs side by side with a reliability estimate and a plain-English reason each option was ranked.' },
      { name: 'Stay comparison', copy: 'Hostels to heritage havelis, filtered by the style you actually travel in — social, quiet, remote-work, trek, or solo.' },
      { name: 'Recommendations', copy: 'Not sure where to go at all? Answer a few prompts and get a short, sourced list shaped by your time and energy.' },
    ],
  },
  {
    icon: BookOpen,
    label: 'Discover',
    items: [
      { name: 'Explore', copy: 'A reviewed knowledge base of monuments, food trails, and heritage across the Delhi–Agra–Jaipur corridor, each claim carrying its source.' },
      { name: 'Heritage Lens', copy: 'Point the camera at a monument for a grounded explanation — and pick the depth: 30 seconds, deep history, architecture, academic, for kids, or the detail most people miss.' },
      { name: 'Audio stories', copy: 'Any brief can be read aloud, so you can keep looking at the building instead of your phone.' },
    ],
  },
  {
    icon: Plane,
    label: 'Book & move',
    items: [
      { name: 'Booking hub', copy: 'Search prefilled, then hand off to the provider — IRCTC, MakeMyTrip, RedBus, IndiGo, Booking.com, Airbnb and more.' },
      { name: 'Cabs & last mile', copy: 'Uber, Ola, Rapido, Namma Yatri, or plain directions, with pickup and drop already set.' },
      { name: 'You pay them, not us', copy: 'Checkout always happens on the provider’s own site. Zentrip never takes your payment.' },
    ],
  },
  {
    icon: Languages,
    label: 'Everyday India',
    items: [
      { name: 'Travel translator', copy: 'Two-way voice and camera translation across eleven Indian languages, with pronunciation help.' },
      { name: 'Groceries & essentials', copy: 'Say what you ran out of and it goes to Blinkit, Zepto, Swiggy Instamart, or Flipkart Minutes with your address attached.' },
      { name: 'Payments help', copy: 'UPI, cards, cash, and ATM guidance for the moment a QR code doesn’t work.' },
    ],
  },
  {
    icon: ShieldCheck,
    label: 'Stay safe',
    items: [
      { name: 'Guardian', copy: 'One tap to 112 national emergency, 1363 tourist helpline, or 1091 women’s helpline — no internet or AI in the path.' },
      { name: 'Incident sessions', copy: 'Start a session, check in when you feel safer, share your live location, and resolve it when you’re clear.' },
      { name: 'Trusted contact', copy: 'Send your coordinates and a map link to someone who matters, by SMS or share sheet.' },
      { name: 'Risk intelligence', copy: 'Scam patterns, seasonal hazards, and area-level advisories surfaced before they catch you out.' },
    ],
  },
  {
    icon: Users,
    label: 'Connect',
    items: [
      { name: 'Travel buddy match', copy: 'Matched on corridor timing, pace, and interests. No names and no chat until you both consent.' },
      { name: 'Destination community', copy: 'Local events with a verification status attached, so you know what’s been checked.' },
      { name: 'Ask a local expert', copy: 'Route the questions an app shouldn’t answer alone to a real person.' },
    ],
  },
  {
    icon: Mountain,
    label: 'Go further',
    items: [
      { name: 'Offline trail packs', copy: 'Download day hikes and walk them with no signal.' },
      { name: 'Nearby peaks', copy: 'GPS and the device compass name the summits in front of you, from a catalog rather than a guess. Himalaya-first — it will find nothing on the plains, by design.' },
      { name: 'Explorer missions', copy: 'Small, specific nudges to see a place properly instead of ticking it off.' },
    ],
  },
]

const STEPS = [
  {
    icon: PhoneCall,
    title: 'Press play',
    copy: 'One tap starts a real, live call — no app download, no account, no waiting on hold.',
  },
  {
    icon: Ear,
    title: 'Ask anything, naturally',
    copy: 'Interrupt her mid-sentence, change topics, speak in the language you’re most comfortable in.',
  },
  {
    icon: Volume2,
    title: 'Get a grounded answer, out loud',
    copy: 'Zenny answers in voice immediately — and can hand off to a real action: dial a number, open a link, save an item.',
  },
]

export default function MeetZennyPage() {
  return (
    <>
      <SiteHeader />
      <main className="zn-page">
        <section className="zn-hero">
          <div className="zn-hero-glow" aria-hidden="true" />
          <div className="zn-hero-inner">
            <p className="zn-eyebrow">
              <span /> India&apos;s AI travel companion
            </p>
            <h1>
              Talk to India
              <br />
              <em>like a local knows it.</em>
            </h1>
            <p className="zn-hero-copy">
              Zenny is a live voice companion for travellers in India — grounded in reviewed local
              knowledge, fluent in eleven languages, and one call away whenever you need her.
            </p>
            <div className="zn-hero-cta">
              <a className="zn-btn zn-btn-primary zn-btn-lg" href="#try-zenny">
                <Sparkles size={18} strokeWidth={1.8} /> Talk to Zenny now
              </a>
              <a className="zn-btn zn-btn-ghost zn-btn-lg" href="/#top">
                Join the waitlist
              </a>
            </div>
            <p className="zn-hero-note">Free live demo · No sign-up · 90 seconds, real voice</p>
          </div>
        </section>

        <section className="zn-stats" aria-label="What Zenny brings to every conversation">
          <div className="zn-stats-inner">
            <div className="zn-stat">
              <span className="zn-stat-num">11</span>
              <span className="zn-stat-label">Indian languages spoken</span>
            </div>
            <div className="zn-stat">
              <span className="zn-stat-num">2-way</span>
              <span className="zn-stat-label">Live duplex voice — interrupt anytime</span>
            </div>
            <div className="zn-stat">
              <span className="zn-stat-num">112</span>
              <span className="zn-stat-label">Emergency line, always in the conversation</span>
            </div>
            <div className="zn-stat">
              <span className="zn-stat-num">0</span>
              <span className="zn-stat-label">Invented facts — grounded or admitted</span>
            </div>
          </div>
        </section>

        <section className="zn-section zn-scope" id="everything">
          <div className="zn-section-head">
            <p className="zn-kicker">The zentrip app</p>
            <h2>One call. Every part of your trip.</h2>
            <p className="zn-scope-sub">
              Zenny is the voice on top of the whole app — flights and hotels, cabs, groceries,
              translation, and everything in between.
            </p>
            <p className="zn-scope-tagline">
              You don&apos;t need to know which app is for what. <em>Open Zenny — she&apos;ll guide you and get exactly what you need.</em>
            </p>
          </div>
          <div className="zn-scope-grid">
            {APP_SCOPE.map((item) => (
              <div key={item.title} className="zn-scope-item">
                <div className="zn-scope-icon">
                  <item.icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  {item.partners ? (
                    <div className="zn-scope-partners">
                      {item.partners.map((partner, partnerIndex) => (
                        <PartnerBadge key={partner} name={partner} index={partnerIndex} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <p className="zn-scope-note">Ask Zenny for any of it — she&apos;s the one number that knows your whole trip.</p>
        </section>

        <section className="zn-section" id="how-it-works">
          <div className="zn-section-head">
            <p className="zn-kicker">How it works</p>
            <h2>Three steps. No script.</h2>
          </div>
          <div className="zn-steps">
            {STEPS.map((step, index) => (
              <div key={step.title} className="zn-step">
                <div className="zn-step-icon">
                  <step.icon size={22} strokeWidth={1.8} />
                </div>
                <span className="zn-step-num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="zn-section" id="features">
          <div className="zn-section-head">
            <p className="zn-kicker">What Zenny does</p>
            <h2>Built for real travel, not scripted demos.</h2>
          </div>
          <div className="zn-feature-grid">
            {FEATURES.map((feature) => (
              <div key={feature.title} className={`zn-feature-card zn-tone-${feature.tone}`}>
                <div className="zn-feature-icon">
                  <feature.icon size={24} strokeWidth={1.8} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="zn-section" id="inside">
          <div className="zn-section-head">
            <p className="zn-kicker">Inside the app</p>
            <h2>Everything Zentrip actually does.</h2>
            <p className="zn-scope-sub">
              Eight areas, one companion who can reach all of them. Where something is still a
              preview, we say so rather than dressing it up.
            </p>
          </div>
          <div className="zn-areas">
            {APP_AREAS.map((area) => (
              <div key={area.label} className="zn-area">
                <div className="zn-area-head">
                  <div className="zn-area-icon">
                    <area.icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3>{area.label}</h3>
                </div>
                <dl className="zn-area-list">
                  {area.items.map((item) => (
                    <div key={item.name} className="zn-area-item">
                      <dt>{item.name}</dt>
                      <dd>{item.copy}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="zn-section zn-split">
          <div className="zn-split-copy">
            <p className="zn-kicker">Always grounded</p>
            <h2>Zenny doesn&apos;t improvise your trip.</h2>
            <ul className="zn-checklist">
              <li>
                <Zap size={16} strokeWidth={2} /> Answers come from reviewed, cited India travel
                knowledge — not a general-purpose chatbot guessing about a monument&apos;s opening hours.
              </li>
              <li>
                <Zap size={16} strokeWidth={2} /> Remembers your active trip — cities, dates, and
                today&apos;s stops — so she doesn&apos;t ask you to repeat yourself.
              </li>
              <li>
                <Zap size={16} strokeWidth={2} /> When something needs a real action, she hands off:
                dial a verified number, open an official page, save a grocery list.
              </li>
              <li>
                <Zap size={16} strokeWidth={2} /> Full duplex voice — she hears you the instant you
                start talking, even mid-sentence.
              </li>
            </ul>
          </div>
          <div className="zn-split-visual" aria-hidden="true">
            <div className="zn-mock-card">
              <div className="zn-mock-tabs">
                <span className="zn-mock-tab active">Live Voice</span>
                <span className="zn-mock-tab">Trip Memory</span>
                <span className="zn-mock-tab">Safety</span>
              </div>
              <div className="zn-mock-body">
                <div className="zn-mock-bubble zn-mock-bubble-user">Is the Taj Mahal open on Fridays?</div>
                <div className="zn-mock-bubble zn-mock-bubble-zenny">
                  It's closed to visitors on Fridays for prayers — open the other six days, sunrise to
                  sunset. Want the quietest time to go?
                </div>
                <div className="zn-mock-bubble zn-mock-bubble-user">Yes, and how do I pay for entry?</div>
                <div className="zn-mock-bubble zn-mock-bubble-zenny">UPI and cash both work at the counter — I'll walk you through it.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="zn-demo" id="try-zenny">
          <div className="zn-demo-inner">
            <p className="zn-kicker zn-kicker-light">Press play</p>
            <h2>Talk to Zenny. Right now.</h2>
            <p className="zn-demo-copy">
              This is the real thing — a live call with Zenny's voice agent, not a recording. Ask her
              about a monument, a language, or what to do if you lose your phone in Delhi.
            </p>
            <ZennyVoiceWidget />
            <p className="zn-demo-powered">
              Voice powered by{' '}
              <a href="https://www.sarvam.ai" target="_blank" rel="noreferrer">
                Sarvam AI
              </a>
              , tuned for Indian languages and accents.
            </p>
          </div>
        </section>

        <section className="zn-section zn-values">
          <div className="zn-section-head">
            <p className="zn-kicker">Why we built her</p>
            <h2>Travel in India rewards a local. Not everyone has one.</h2>
          </div>
          <p className="zn-values-copy">
            The best trips we&apos;ve had here came from someone who just knew — which gate to use, which
            hour to avoid, which line to skip. Zenny is our attempt to put that person on the phone for
            anyone, in their own language, for free. She&apos;s not finished. She&apos;s honest about what
            she doesn&apos;t know yet, and she gets better with every reviewed fact we add.
          </p>
        </section>

        <section className="zn-cta">
          <div className="zn-cta-inner">
            <Route size={28} strokeWidth={1.6} />
            <h2>Ready to never plan alone again?</h2>
            <p>Join the waitlist for early access, or talk to Zenny above while you decide.</p>
            <WaitlistForm variant="dark" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
