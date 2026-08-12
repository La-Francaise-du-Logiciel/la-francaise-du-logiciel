import type { CSSProperties } from 'react'
import { CountUp } from '@/components/count-up'
import { EuropeNetwork } from '@/components/europe-network'
import { Reveal } from '@/components/reveal'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS } from '@/lib/routes'

/* Values pair with the catalogue's stats by position. These are promises
   we control, not measurements we cannot yet back up. The unit that goes
   after each one is typography, so it comes from the catalogue. */
const VALUES: readonly { to: number; from?: number }[] = [
  { to: 1 },
  { to: 24 },
  { to: 100 },
  { to: 2 },
]

export function Commitments({ locale }: { locale: Locale }) {
  const t = getMessages(locale).commitments

  return (
    <section id={ANCHORS.commitments} className="relative overflow-hidden border-t border-border">
      <div className="relative mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal variant="mask-rise">
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
                    suffix={stat.suffix}
                    duration={1600}
                    locale={locale}
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
    </section>
  )
}
