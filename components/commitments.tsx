import type { CSSProperties } from 'react'
import { CountUp } from '@/components/count-up'
import { EuropeNetwork } from '@/components/europe-network'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

/* Values pair with the catalogue's stats by position. */
const VALUES = [
  { to: 40, suffix: ' %' },
  { to: 100, suffix: ' %' },
  { to: 0, from: 100 },
  { to: 100, suffix: ' %' },
]

export function Commitments() {
  const t = getMessages().commitments

  return (
    <section id="engagements" className="relative overflow-hidden border-t border-border">
      <div className="relative mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {t.kicker}
              </p>
            </Reveal>
            <Reveal variant="mask-rise" delay={90}>
              <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                {t.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">{t.intro}</p>
          </Reveal>
        </div>

        <Reveal variant="group" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {t.stats.map((stat, i) => (
            <div key={stat.key} style={{ '--step-delay': `${i * 140}ms` } as CSSProperties}>
              <span className="step-line block h-px w-full bg-border" />
              <div className="step-body mt-6">
                <span className="font-serif text-4xl leading-none sm:text-5xl">
                  <CountUp
                    to={VALUES[i].to}
                    from={VALUES[i].from}
                    suffix={VALUES[i].suffix}
                    duration={1600}
                  />
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Full-bleed continent, fading softly into the paper on every side */}
      <div className="relative mt-10 h-[400px] w-full [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] sm:h-[680px]">
        <div className="h-full w-full [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
          <EuropeNetwork />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <Reveal delay={120} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {t.caption}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
