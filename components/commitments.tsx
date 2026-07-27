import type { CSSProperties } from 'react'
import { CountUp } from '@/components/count-up'
import { EuropeNetwork } from '@/components/europe-network'
import { PointerField } from '@/components/pointer-field'
import { Reveal } from '@/components/reveal'

const STATS: { to: number; from?: number; suffix?: string; label: string }[] = [
  {
    to: 40,
    suffix: ' %',
    label: 'de temps en moins sur les tâches répétitives que nous automatisons',
  },
  {
    to: 100,
    suffix: ' %',
    label: 'du code livré, documenté et réversible : il vous appartient',
  },
  {
    to: 0,
    from: 100,
    label: 'dépendance imposée à des acteurs extra-européens',
  },
  {
    to: 100,
    suffix: ' %',
    label: 'des données hébergées en France ou en Europe',
  },
]

export function Commitments() {
  return (
    <section id="engagements" className="relative overflow-hidden border-t border-border">
      {/* The tricolore glowing softly beneath the continent */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom bloom-blue -bottom-72 left-[10%] h-[38rem] w-[38rem]" />
        <div className="bloom bloom-red -bottom-80 right-[6%] h-[40rem] w-[40rem] [--bloom-shift:-16px]" />
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Valeur &amp; souveraineté
              </p>
            </Reveal>
            <Reveal variant="mask-rise" delay={90}>
              <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                La valeur chez vous, les données en Europe.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Du temps rendu à vos équipes, des outils qui vous appartiennent, une infrastructure
              que vous pouvez auditer. La performance n&apos;exige pas de céder le contrôle.
            </p>
          </Reveal>
        </div>

        <Reveal variant="group" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{ '--step-delay': `${i * 140}ms` } as CSSProperties}>
              <span className="step-line block h-px w-full bg-border" />
              <div className="step-body mt-6">
                <span className="font-serif text-4xl leading-none sm:text-5xl">
                  <CountUp to={stat.to} from={stat.from} suffix={stat.suffix} duration={1600} />
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="relative mt-14 h-[360px] sm:h-[520px]">
          <EuropeNetwork />
        </div>
        <Reveal delay={120} className="mt-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            La donnée circule — elle ne quitte jamais l&apos;Europe
          </p>
        </Reveal>
      </div>
    </section>
  )
}
