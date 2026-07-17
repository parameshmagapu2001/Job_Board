// src/app/layout.tsx

import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'JobBoard – AI Powered Job & Talent Platform',
    template: '%s | JobBoard'
  },

  description:
    'Discover top tech jobs, remote opportunities, startups, and AI-first companies across India.',

  keywords: [
    'jobs',
    'jobs in india',
    'frontend developer jobs',
    'react jobs',
    'nextjs jobs',
    'remote jobs',
    'software jobs',
    'ai jobs',
    'startup jobs',
    'hyderabad jobs'
  ],

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jobboard.in',
    siteName: 'JobBoard',

    title: 'JobBoard – AI Powered Job & Talent Platform',

    description:
      'Discover top tech jobs, remote opportunities, startups, and AI-first companies across India.',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JobBoard'
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'JobBoard – AI Powered Job & Talent Platform',

    description:
      'Discover top tech jobs, remote opportunities, startups, and AI-first companies across India.',

    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true
  },

  metadataBase: new URL('https://jobboard.in'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>

      <body>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  )
}