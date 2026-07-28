import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { getMessages } from '@/lib/i18n'

const t = getMessages().pages.contact
const contact = getMessages().contact

export const metadata: Metadata = {
  title: t.metaTitle + getMessages().metadata.titleSuffix,
  description: t.metaDescription,
}

export default function Page() {
  return (
    <>
      <PageHeader title={contact.title} intro={contact.intro} />
      <Section title={t.helpTitle}>
        <ul className="max-w-xl">
          {t.helpItems.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={i * 80}
              className="flex gap-4 border-b border-border py-4 last:border-0"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
              <span className="text-pretty leading-relaxed text-muted-foreground">{item}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={360}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.helpNote}
          </p>
        </Reveal>
      </Section>
      <ContactCta />
    </>
  )
}
