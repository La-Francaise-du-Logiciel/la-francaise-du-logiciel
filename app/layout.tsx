import type { Metadata, Viewport } from 'next'
import { Geist, Instrument_Serif } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { defaultLocale, getMessages } from '@/lib/i18n'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: getMessages().metadata.title,
  description: getMessages().metadata.description,
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    shortcut: '/icon.svg',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f5f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${geist.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
