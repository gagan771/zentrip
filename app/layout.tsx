import { Analytics } from '@vercel/analytics/next'
import { Space_Grotesk } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const brandFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-brand' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zentrip.social'),
  title: 'zentrip.social — Your journey starts here',
  description: 'A new way to discover the places, people, and stories that make travel unforgettable. Launching soon.',
  generator: 'zentrip.social',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.zentrip.social',
    siteName: 'zentrip.social',
    title: 'zentrip.social — Your journey starts here',
    description: 'A new way to discover the places, people, and stories that make travel unforgettable.',
    images: [
      {
        url: '/icon.svg',
        width: 180,
        height: 180,
        alt: 'zentrip.social logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'zentrip.social — Your journey starts here',
    description: 'A new way to discover the places, people, and stories that make travel unforgettable.',
    images: ['/icon.svg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${brandFont.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

