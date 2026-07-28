import { AnimatedBackground } from '@/components/animated-background'
import { HeroField } from '@/components/hero-field'
import { HoverArrow } from '@/components/hover-arrow'
import { PointerField } from '@/components/pointer-field'
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

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24">
        <h1 className="max-w-[38rem] text-balance font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]">
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

      {/* Beside the headline on wide screens, running off the right edge of
          the page; a band beneath the text once there is no room alongside. */}
      <div
        data-flow-surface
        className="relative h-[220px] w-full sm:h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[38%] xl:w-[44%]"
      >
        <HeroField />
      </div>
    </section>
  )
}
