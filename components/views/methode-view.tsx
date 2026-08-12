import { Approach } from '@/components/approach'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

export function MethodeView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.methode

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Approach title={t.stepsTitle} locale={locale} />
      <Section title={t.refusals.title} className="border-t border-border">
        <CardGrid items={t.refusals.items} />
      </Section>
      <ContactCta locale={locale} />
    </>
  )
}
