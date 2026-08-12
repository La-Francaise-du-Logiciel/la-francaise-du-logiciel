import { PageHeader } from '@/components/page-header'
import { DefinitionList, Prose, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

export function MentionsLegalesView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.mentionsLegales

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section title={t.publisher.title}>
        <DefinitionList entries={t.publisher.entries} />
      </Section>
      <Section title={t.host.title} className="border-t border-border">
        <DefinitionList entries={t.host.entries} />
      </Section>
      <Section title={t.ip.title} className="border-t border-border">
        <Prose paragraphs={t.ip.paragraphs} />
      </Section>
    </>
  )
}
