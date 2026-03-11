import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Grand Azure Resort | Luxury Beachfront Hotel',
  description: 'Experience luxury at Grand Azure Resort. World-class amenities, stunning ocean views, and impeccable service await you at our premier beachfront property.',
  keywords: ['luxury hotel', 'beachfront resort', 'Miami Beach', 'vacation', 'spa', 'ocean view'],
  openGraph: {
    title: 'Grand Azure Resort | Luxury Beachfront Hotel',
    description: 'Experience luxury at Grand Azure Resort with stunning ocean views and world-class amenities.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Grand Azure Resort',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Azure Resort | Luxury Beachfront Hotel',
    description: 'Experience luxury at Grand Azure Resort with stunning ocean views and world-class amenities.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
