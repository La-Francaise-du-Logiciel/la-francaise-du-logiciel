import type { ReactNode } from 'react'
import { AnimatedBackground } from '@/components/animated-background'
import { CountUp } from '@/components/count-up'
import { HoverArrow } from '@/components/hover-arrow'
import { PointerField } from '@/components/pointer-field'
import { HeroField } from '@/components/hero-field'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Hero() {
  const t = getMessages().hero

  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <AnimatedBackground />

      {/* The tricolore as ambient light, drifting gently against the cursor */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom bloom-blue -left-40 -top-48 h-[36rem] w-[36rem]" />
        <div className="bloom bloom-red -right-48 top-8 h-[40rem] w-[40rem] [--bloom-shift:-18px]" />
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-20 sm:px-8 sm:pt-20">
        <h1 className="max-w-4xl text-balance font-serif text-4xl leading-[1.0] tracking-tight sm:text-6xl lg:text-[3.9rem]">
          {t.headline.map((line, i) => (
            <span
              key={line.text}
              className={cn('block animate-rise', 'accent' in line && 'italic text-[var(--blue)]')}
              style={{ animationDelay: `${0.05 + i * 0.13}s` }}
            >
              {line.text}
            </span>
          ))}
        </h1>

        <p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground animate-rise"
          style={{ animationDelay: '0.6s' }}
        >
          {t.intro}
        </p>

        <div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-rise"
          style={{ animationDelay: '0.72s' }}
        >
          <a
            href="#contact"
            className="arrow-hover sheen inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            {t.ctaPrimary}
            <HoverArrow />
          </a>
          <a
            href="#conseil"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 ease-out hover:border-foreground/40 hover:bg-card"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Centerpiece: the interference field of the two axes */}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/40">
          <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
            {/* The field fills the whole cell and is its own hover surface */}
            <div
              data-flow-surface
              className="relative min-h-[280px] border-b border-border md:border-b-0 md:border-r"
            >
              <HeroField />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
              <div className="grid grid-cols-3 gap-6">
                <Stat label={t.stats[0].label}>
                  <CountUp to={2} />
                </Stat>
                <Stat label={t.stats[1].label}>
                  <CountUp to={100} suffix="%" />
                </Stat>
                {/* Dependency counting down to zero: that is the point */}
                <Stat label={t.stats[2].label}>
                  <CountUp to={0} from={100} />
                </Stat>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-serif text-4xl leading-none text-foreground">{children}</span>
      <span className="text-xs leading-snug text-muted-foreground">{label}</span>
    </div>
  )
}
