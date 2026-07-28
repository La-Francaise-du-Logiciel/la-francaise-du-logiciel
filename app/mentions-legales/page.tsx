import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { DefinitionList, Prose, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.mentionsLegales

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
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
