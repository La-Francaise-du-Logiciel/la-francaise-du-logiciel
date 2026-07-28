import { Fragment, type CSSProperties } from 'react'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

const ACCENT_COLORS = { blue: 'var(--blue)', red: 'var(--red)' } as const

export function Manifesto() {
  const t = getMessages().manifesto
  let wordIndex = 0
  let accentIndex = 0

  return (
    <section id="manifeste" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-12">
        <p className="text-sm text-muted-foreground">
          {t.kicker}
        </p>
      </Reveal>

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

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {t.values.map((v, i) => (
          <Reveal key={v.title} delay={i * 90} className="bg-background p-8">
            <h3 className="font-serif text-xl tracking-tight">{v.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
