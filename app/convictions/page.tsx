import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { ManifestoQuote } from '@/components/manifesto'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.convictions
const manifesto = getMessages().manifesto

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section id="independance">
        <ManifestoQuote />
      </Section>
      <Section className="border-t border-border">
        <Prose paragraphs={t.paragraphs} />
      </Section>
      <Section title={t.valuesTitle} className="border-t border-border">
        <CardGrid items={manifesto.values} />
      </Section>
      <ContactCta />
    </>
  )
}
