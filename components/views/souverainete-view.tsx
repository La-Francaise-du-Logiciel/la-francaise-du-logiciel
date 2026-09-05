import { ContactCta } from '@/components/contact-cta'
import { RowList } from '@/components/editorial'
import { ArrowLink } from '@/components/hover-arrow'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { CardGrid, Prose, Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS, anchorPath } from '@/lib/routes'

export function SouveraineteView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.souverainete

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section>
        <Prose paragraphs={t.definition.paragraphs} lead />
      </Section>
      <Section title={t.practice.title} className="bg-card/30">
        <CardGrid items={t.practice.items} columns={2} />
      </Section>
      <Section title={t.europe.title} className="border-t border-border">
        <Prose paragraphs={t.europe.paragraphs} />
        <Reveal delay={200} className="mt-10">
          <ArrowLink href={anchorPath('home', locale, ANCHORS.projects)}>{t.europe.link}</ArrowLink>
        </Reveal>
      </Section>
      <Section title={t.faq.title} className="bg-card/30">
        <RowList items={t.faq.items} />
      </Section>
      <ContactCta locale={locale} />
    </>
  )
}
