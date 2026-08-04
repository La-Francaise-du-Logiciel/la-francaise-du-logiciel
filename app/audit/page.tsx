import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.audit

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
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
      <ContactCta />
    </>
  )
}
