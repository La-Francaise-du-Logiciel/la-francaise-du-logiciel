import { ContactForm } from '@/components/contact-form'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

export function ContactView({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const t = messages.pages.contact
  const contact = messages.contact

  return (
    <>
      <PageHeader title={contact.title} intro={contact.intro} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-24">
          <Reveal>
            <ContactForm locale={locale} />
          </Reveal>

          <aside>
            <Reveal>
              <h2 className="font-serif text-xl tracking-tight">{t.helpTitle}</h2>
            </Reveal>
            <ul className="mt-4">
              {t.helpItems.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={80 + i * 80}
                  className="flex gap-3.5 border-b border-border py-3.5 last:border-0"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={420}>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.helpNote}</p>
            </Reveal>
            <Reveal delay={480}>
              <p className="mt-8 border-t border-border pt-6 text-sm font-medium text-foreground">
                {contact.responseTime}
              </p>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  )
}
