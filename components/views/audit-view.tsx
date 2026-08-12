import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

export function AuditView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.audit

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section title={t.scope.title}>
        <CardGrid items={t.scope.items} columns={2} />
      </Section>
      <Section title={t.perimeter.title} className="border-t border-border">
        <Prose paragraphs={t.perimeter.paragraphs} />
      </Section>
      <Section
        title={t.deliver.title}
        intro={t.deliver.intro}
        className="border-t border-border"
      >
        <CardGrid items={t.deliver.items} columns={2} />
      </Section>
      <Section title={t.process.title} className="border-t border-border">
        <CardGrid items={t.process.items} />
      </Section>
      <Section title={t.decision.title} className="border-t border-border">
        <Prose paragraphs={t.decision.paragraphs} />
      </Section>
      <ContactCta locale={locale} />
    </>
  )
}
