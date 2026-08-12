import type { ReactNode } from 'react'
import { Geist, Instrument_Serif } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { Locale } from '@/lib/i18n'
import '@/app/globals.css'

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

/**
 * The document itself. Each locale has its own root layout under app/, so
 * `lang` is correct per language and both trees still prerender; this is
 * the chrome they share.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={locale}
      className={`${geist.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteHeader locale={locale} />
        <main>{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
