import type { CSSProperties } from 'react'
import { Reveal } from '@/components/reveal'

const STEPS = [
  {
    num: '01',
    title: 'Comprendre',
    desc: "Nous partons de votre métier, pas d'une solution toute faite. Cadrage précis des enjeux, des flux et de la valeur attendue.",
  },
  {
    num: '02',
    title: 'Concevoir',
    desc: 'Architecture claire, choix technologiques durables et ouverts. Chaque brique est pensée pour rester la vôtre.',
  },
  {
    num: '03',
    title: 'Construire',
    desc: 'Développement itératif, livraisons régulières et lisibles. Vous voyez le produit prendre forme, sans effet tunnel.',
  },
  {
    num: '04',
    title: 'Maîtriser',
    desc: "Déploiement sur une infrastructure souveraine, documentation et transfert. L'autonomie plutôt que la dépendance.",
  },
]

export function Approach() {
  return (
    <section id="approche" className="relative border-y border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Notre approche
              </p>
            </Reveal>
            <Reveal variant="mask-rise" delay={90}>
              <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Une méthode d&apos;ingénieur, une exigence d&apos;artisan.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              La même rigueur, que l&apos;on construise votre logiciel métier ou une brique
              d&apos;infrastructure d&apos;intérêt collectif.
            </p>
          </Reveal>
        </div>

        {/* One reveal group: the line draws across the four steps in sequence */}
        <Reveal
          as="ol"
          variant="group"
          className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="step flex min-h-[15rem] flex-col justify-between bg-background p-7 transition-colors duration-300 ease-out hover:bg-card"
              style={{ '--step-delay': `${i * 180}ms` } as CSSProperties}
            >
              <div className="flex items-center gap-3">
                <span className="step-num font-mono text-sm text-[var(--blue)]">{step.num}</span>
                <span className="step-line h-px flex-1 bg-border" />
              </div>
              <div className="step-body">
                <h3 className="font-serif text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
