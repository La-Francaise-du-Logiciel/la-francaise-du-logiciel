import { Fragment, type CSSProperties } from 'react'
import { Reveal } from '@/components/reveal'

/* The quote reveals word by word; once the text settles, the two key
   phrases ignite in blue and red — the emphasis becomes an event. */
const QUOTE: { text: string; accent?: 'blue' | 'red'; igniteDelay?: string }[] = [
  { text: 'Nous croyons qu’un pays qui' },
  { text: 'maîtrise ses logiciels', accent: 'blue', igniteDelay: '1.05s' },
  { text: 'maîtrise son avenir. Que la performance et l’indépendance ne s’opposent pas,' },
  { text: 'elles se renforcent.', accent: 'red', igniteDelay: '1.4s' },
]

const VALUES = [
  {
    title: 'Utile avant tout',
    desc: "Chaque ligne de code doit résoudre un problème réel et libérer du temps. La technologie n'est jamais une fin en soi.",
  },
  {
    title: 'Souverain par conception',
    desc: 'Nous privilégions les standards ouverts, les données en Europe et les architectures que nos clients peuvent reprendre.',
  },
  {
    title: 'Durable et lisible',
    desc: 'Un logiciel bien construit se comprend, se maintient et se transmet. Nous fuyons la complexité inutile.',
  },
]

export function Manifesto() {
  let wordIndex = 0

  return (
    <section id="manifeste" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Manifeste
        </p>
      </Reveal>

      <Reveal variant="group">
        <blockquote className="max-w-4xl">
          <p className="text-balance font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            {QUOTE.map((seg, si) => {
              const words = seg.text.split(' ').map((word, wi) => (
                <Fragment key={wi}>
                  <span className="mw" style={{ '--wd': `${wordIndex++ * 22}ms` } as CSSProperties}>
                    {word}
                  </span>{' '}
                </Fragment>
              ))
              if (!seg.accent) return <Fragment key={si}>{words}</Fragment>
              return (
                <span
                  key={si}
                  className="ignite"
                  style={
                    {
                      '--ignite-color': seg.accent === 'blue' ? 'var(--blue)' : 'var(--red)',
                      '--ignite-d': seg.igniteDelay,
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
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 90} className="bg-background p-8">
            <h3 className="font-serif text-xl tracking-tight">{v.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
