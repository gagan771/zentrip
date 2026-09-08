// Brand glyphs for partner badges. Only pulls from `simple-icons` (CC0-licensed
// simplified brand marks) for apps it actually covers — most India-specific
// partners (Ola, Rapido, Namma Yatri, MakeMyTrip, IRCTC, Blinkit, Zepto,
// Flipkart Minutes) aren't in that set, so they fall back to a plain monogram
// rather than a scraped/unlicensed copy of their real logo.
import { siUber, siIndigo, siBookingdotcom, siAirbnb, siSwiggy } from 'simple-icons'

export type PartnerIcon =
  | { kind: 'brand'; path: string; hex: string }
  | { kind: 'mono'; letter: string; tone: 'sky' | 'indigo' | 'cyan' }

const BRAND_ICONS: Record<string, { path: string; hex: string }> = {
  Uber: siUber,
  IndiGo: siIndigo,
  'Booking.com': siBookingdotcom,
  Airbnb: siAirbnb,
  'Swiggy Instamart': siSwiggy,
}

const TONES: Array<'sky' | 'indigo' | 'cyan'> = ['sky', 'indigo', 'cyan']

export function getPartnerIcon(name: string, index: number): PartnerIcon {
  const brand = BRAND_ICONS[name]
  if (brand) return { kind: 'brand', path: brand.path, hex: brand.hex }
  return { kind: 'mono', letter: name.charAt(0).toUpperCase(), tone: TONES[index % TONES.length] }
}
