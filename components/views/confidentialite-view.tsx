import { PageHeader } from '@/components/page-header'
import { Prose, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

export function ConfidentialiteView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.confidentialite

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
