import type { CSSProperties } from 'react'
import { CountUp } from '@/components/count-up'
import { HexNetwork } from '@/components/hex-network'
import { PointerField } from '@/components/pointer-field'
import { Reveal } from '@/components/reveal'

const STATS: { to: number; from?: number; decimals?: number; suffix?: string; label: string }[] = [
  {
    to: 99.99,
    decimals: 2,
    suffix: ' %',
    label: 'de disponibilité visée sur les services que nous opérons',
  },
  { to: 100, suffix: ' %', label: 'des données hébergées en France ou en Europe' },
  { to: 0, from: 100, label: 'verrou propriétaire dans nos livrables' },
  { to: 48, suffix: ' h', label: 'au maximum avant notre première réponse' },
]

export function Commitments() {
  return (
    <section id="engagements" className="relative overflow-hidden border-t border-border">
      {/* The tricolore glowing softly beneath the hexagon */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom bloom-blue -bottom-72 left-[10%] h-[38rem] w-[38rem]" />
        <div className="bloom bloom-red -bottom-80 right-[6%] h-[40rem] w-[40rem] [--bloom-shift:-16px]" />
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Engagements
              </p>
            </Reveal>
            <Reveal variant="mask-rise" delay={90}>
              <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Des garanties mesurables, pas des promesses.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Ces chiffres tiennent parce que l&apos;infrastructure est simple, ouverte et
              auditable, et qu&apos;ils sont inscrits dans nos contrats.
            </p>
          </Reveal>
        </div>

        <Reveal variant="group" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{ '--step-delay': `${i * 140}ms` } as CSSProperties}>
              <span className="step-line block h-px w-full bg-border" />
              <div className="step-body mt-6">
                <span className="font-serif text-4xl leading-none sm:text-5xl">
                  <CountUp
                    to={stat.to}
                    from={stat.from}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={1600}
                  />
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="relative mt-14 h-[320px] sm:h-[420px]">
          <HexNetwork />
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
