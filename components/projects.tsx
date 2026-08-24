import { Lock } from 'lucide-react'
import Link from 'next/link'
import { HoverArrow } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS, path } from '@/lib/routes'

/** The one product of ours that is already online. */
const TENSEL_URL = 'https://tensel.eu'

/**
 * The Tensel mark: the lowercase `t` of its wordmark drawn as one glyph.
 * Copied from the Tensel brand source rather than served as a file, so it
 * inherits `currentColor` and costs no request. The viewBox is the glyph's
 * own bounding box, which puts its bottom edge on the baseline.
 */
function TenselMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 522 692"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M140 0H258V189H140Z M0 299H131.7C139.2 296.3 173.6 286.6 203.8 263.6C222.2 233 226.8 225.4 231 216H0Z M258 222.4C236 266.1 193.4 303 146.5 319.6L140 322.3V403.4C140 489.8 139.3 497.8 144.1 519.7C152.7 559.6 174.8 599.3 204.6 628.1C236.8 659.2 272.2 677.9 317.9 687.8L334.5 692H495V608H446.3C419.4 608 393.2 607.5 387.9 607C317.7 600.2 270.3 556.1 259.8 488C258.8 481.5 258 458.7 258 389.5V299H522V216H261Z" />
    </svg>
  )
}

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
        {/* Published: full contrast, its own brand, and a way in. */}
        <Reveal as="article" className="flex h-full flex-col bg-background p-7 sm:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.tensel.status}
          </span>
          {/* The Tensel lockup: mark then word, both sized in em off the
              heading, and sitting on a shared baseline. Sans and lower case,
              because it is a logo rather than one of our own headings. */}
          <h3 className="mt-6 flex items-baseline gap-[0.34em] text-2xl font-bold tracking-[-0.03em]">
            <TenselMark className="h-[0.78em] w-auto shrink-0" />
            {t.tensel.wordmark}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.tensel.desc}
          </p>
          <a
            href={TENSEL_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t.tensel.linkLabel}
            className="group/link arrow-hover mt-6 inline-flex w-fit items-center gap-1.5 pt-1 text-sm font-medium text-foreground"
          >
            <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
              {t.tensel.link}
            </span>
            <HoverArrow />
          </a>
        </Reveal>

        {/* Not open yet: recessed panel, dashed badge, no link to follow. */}
        <Reveal as="article" delay={100} className="flex h-full flex-col bg-muted p-7 sm:p-8">
          <span className="inline-flex w-fit rounded-full border border-dashed border-input px-3 py-1 text-xs font-medium text-muted-foreground">
            {t.forge.status}
          </span>
          <h3 className="mt-6 font-serif text-2xl tracking-tight text-muted-foreground">
            {t.forge.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.forge.desc}
          </p>
          <p className="mt-6 inline-flex w-fit items-center gap-1.5 pt-1 text-sm text-muted-foreground/70">
            <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t.forge.unavailable}
          </p>
        </Reveal>
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
