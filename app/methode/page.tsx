import type { Metadata } from 'next'
import { Approach } from '@/components/approach'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.methode

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Approach title={t.stepsTitle} />
      <Section title={t.refusals.title} className="border-t border-border">
        <CardGrid items={t.refusals.items} />
      </Section>
      <ContactCta />
    </>
  )
}
