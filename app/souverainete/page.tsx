import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.souverainete

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <Section title={t.problem.title}>
        <Prose paragraphs={t.problem.paragraphs} />
      </Section>
      <Section title={t.practice.title} className="border-t border-border">
        <CardGrid items={t.practice.items} columns={4} />
      </Section>
      <Section
        title={t.consulting.title}
        intro={t.consulting.intro}
        className="border-t border-border"
      >
        <CardGrid items={t.consulting.items} />
      </Section>
      <Section
        title={t.building.title}
        intro={t.building.intro}
        className="border-t border-border"
      >
        <CardGrid items={t.building.items} columns={2} />
        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t.building.note}
          </p>
        </Reveal>
      </Section>
      <ContactCta />
    </>
  )
}
