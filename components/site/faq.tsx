'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What exactly is Zenny?',
    a: "A voice companion for travelling in India. You talk, she answers out loud — about monuments, routes, seasons, payments, safety — and she can reach the rest of the Zentrip app on your behalf.",
  },
  {
    q: 'Do I need to install anything to try her?',
    a: 'No. The demo on this page is a real call that runs in your browser. Allow the microphone and start talking — no account, no download.',
  },
  {
    q: 'Which languages does she speak?',
    a: 'Eleven: Hindi, Tamil, Telugu, Bengali, Malayalam, Marathi, Gujarati, Kannada, Punjabi, Odia, and English. You can switch mid-conversation.',
  },
  {
    q: 'Where do her answers come from?',
    a: "A reviewed knowledge base built for India travel, with a source attached to each claim. When she isn't confident, she says so rather than inventing an answer — and for anything time-sensitive she'll tell you to confirm before you rely on it.",
  },
  {
    q: 'Does Zentrip book things and take my money?',
    a: "No. We prefill the search and hand you to the provider's own site — IRCTC, MakeMyTrip, RedBus, IndiGo, Booking.com, Uber, and others. Checkout and payment always happen there, never with us.",
  },
  {
    q: 'Can I interrupt her?',
    a: 'Yes. It is a full duplex call, so she hears you the moment you start speaking and stops talking — the same as interrupting a person.',
  },
  {
    q: 'Does any of it work without signal?',
    a: "The parts that matter most. Your current day's itinerary, booking references, stay address, emergency numbers, and downloaded trail packs are stored on the device and render with no network.",
  },
  {
    q: 'Which places are covered today?',
    a: 'The Delhi–Agra–Jaipur corridor is deepest, since that is where the reviewed knowledge base is most complete. Booking, cabs, groceries, and translation work far more broadly.',
  },
  {
    q: 'What happens in an emergency?',
    a: "Guardian puts 112 national emergency, 1363 tourist helpline, and 1091 women's helpline one tap away, with no internet or AI in that path. You can also start an incident session, share live location, and text a trusted contact.",
  },
  {
    q: 'When can I get the app?',
    a: "It's launching soon. Join the waitlist and you'll be among the first in — the live demo above is the same voice agent that ships in the app.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="zn-faq">
      {FAQS.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.q} className={`zn-faq-item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="zn-faq-q"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown size={18} strokeWidth={2} className="zn-faq-chevron" />
            </button>
            {isOpen ? <p className="zn-faq-a">{item.a}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
