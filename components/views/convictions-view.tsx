import { ContactCta } from '@/components/contact-cta'
import { ManifestoQuote } from '@/components/manifesto'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS } from '@/lib/routes'

export function ConvictionsView({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const t = messages.pages.convictions

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section id={ANCHORS.independence}>
        <ManifestoQuote locale={locale} />
      </Section>
      <Section className="border-t border-border">
        <Prose paragraphs={t.paragraphs} lead />
      </Section>
      <Section title={t.valuesTitle} className="bg-card/30">
        <CardGrid items={messages.manifesto.values} />
      </Section>
      <ContactCta locale={locale} />
    </>
  )
}
