import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Prose, Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.confidentialite

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      {t.sections.map((section, i) => (
        <Section
          key={section.title}
          title={section.title}
          className={i > 0 ? 'border-t border-border' : undefined}
        >
          <Prose paragraphs={section.paragraphs} />
        </Section>
      ))}
    </>
  )
}
