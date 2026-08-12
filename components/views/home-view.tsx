import { Axes } from '@/components/axes'
import { Commitments } from '@/components/commitments'
import { ContactCta } from '@/components/contact-cta'
import { Hero } from '@/components/hero'
import { ManifestoTeaser } from '@/components/manifesto'
import { Projects } from '@/components/projects'
import type { Locale } from '@/lib/i18n'

/**
 * Page bodies live here rather than under app/, because each one is
 * rendered by two routes: the unprefixed French route and its /en
 * counterpart. The route files hold only metadata and the locale.
 */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Axes locale={locale} />
      <Commitments locale={locale} />
      <Projects locale={locale} />
      <ManifestoTeaser locale={locale} />
      <ContactCta locale={locale} />
    </>
  )
}
