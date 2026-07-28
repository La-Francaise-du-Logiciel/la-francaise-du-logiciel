import { Fragment, type CSSProperties } from 'react'
import Link from 'next/link'
import { HoverArrow } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

const ACCENT_COLORS = { blue: 'var(--blue)', red: 'var(--red)' } as const

/** The quote itself, word-staggered, with its key phrases igniting late. */
export function ManifestoQuote() {
  const t = getMessages().manifesto
  let wordIndex = 0
  let accentIndex = 0

  return (
    <Reveal variant="group">
      <blockquote className="max-w-4xl">
        <p className="text-balance font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
          {t.quote.map((seg, si) => {
            const words = seg.text.split(' ').map((word, wi) => (
              <Fragment key={wi}>
                <span className="mw" style={{ '--wd': `${wordIndex++ * 22}ms` } as CSSProperties}>
                  {word}
                </span>{' '}
              </Fragment>
            ))
            if (!('accent' in seg)) return <Fragment key={si}>{words}</Fragment>
            /* Each highlighted phrase ignites a beat after the last */
            const igniteDelay = `${1.05 + accentIndex++ * 0.35}s`
            return (
              <span
                key={si}
                className="ignite"
                style={
                  {
                    '--ignite-color': ACCENT_COLORS[seg.accent],
                    '--ignite-d': igniteDelay,
                  } as CSSProperties
                }
              >
                {words}
              </span>
            )
          })}
        </p>
      </blockquote>
    </Reveal>
  )
}

/** On the home page: the quote, then a way through to the full manifesto. */
export function ManifestoTeaser() {
  const t = getMessages().manifesto

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ManifestoQuote />
      <Reveal delay={200}>
        <Link
          href="/manifeste"
          className="group/link arrow-hover mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
            {t.readMore}
          </span>
          <HoverArrow />
        </Link>
      </Reveal>
    </section>
  )
}
