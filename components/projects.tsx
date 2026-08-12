import Link from 'next/link'
import { HoverArrow } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS, path } from '@/lib/routes'

export function Projects({ locale }: { locale: Locale }) {
  const t = getMessages(locale).projects

  return (
    <Section
      id={ANCHORS.projects}
      title={t.title}
      intro={t.intro}
      className="border-t border-border"
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {t.items.map((item, index) => (
          <Reveal
            as="article"
            key={item.title}
            delay={index * 100}
            className="bg-background p-7 sm:p-8"
          >
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {item.status}
            </span>
            <h3 className="mt-6 font-serif text-2xl tracking-tight">{item.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={180} className="mt-8 flex max-w-2xl flex-col items-start gap-5">
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{t.note}</p>
        <Link
          href={path('contact', locale)}
          className="group/link arrow-hover inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
            {t.cta}
          </span>
          <HoverArrow />
        </Link>
      </Reveal>
    </Section>
  )
}
