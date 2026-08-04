import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.conseil

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section title={t.build.title}>
        <CardGrid items={t.build.items} columns={2} />
      </Section>
      <Section title={t.how.title} className="border-t border-border">
        <CardGrid items={t.how.items} columns={2} />
      </Section>
      <Section title={t.deliver.title} intro={t.deliver.intro} className="border-t border-border">
        <CardGrid items={t.deliver.items} columns={4} />
      </Section>
      <ContactCta />
    </>
  )
}
