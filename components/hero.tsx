import Link from 'next/link'
import { HeroField } from '@/components/hero-field'
import { HoverArrow } from '@/components/hover-arrow'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Hero() {
  const t = getMessages().hero

  return (
    /* The whole section is the field's hover surface, so the dots answer
       the cursor even where the text sits over them. */
    <section
      id="top"
      data-flow-surface
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-16"
    >
      {/* Holds the field off the transparent header so the nav stays legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-background via-background/90 to-transparent lg:block"
      />

      {/* flex-1 + justify-center keeps the text vertically centred in
          whatever height the viewport leaves it, so the section always
          fills the screen exactly. */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-14 sm:px-8 sm:py-16">
        <h1 className="max-w-[38rem] text-balance font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:max-w-[44rem] lg:text-[3.6rem] xl:max-w-[48rem] xl:text-[4.2rem]">
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
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground animate-rise lg:mt-8 lg:max-w-2xl xl:text-xl"
          style={{ animationDelay: '0.6s' }}
        >
          {t.intro}
        </p>

        <div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-rise lg:mt-10"
          style={{ animationDelay: '0.72s' }}
        >
          <Link
            href="/contact"
            className="cta-flag arrow-hover inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            {t.ctaPrimary}
            <HoverArrow />
          </Link>
          <Link
            href="/conseil"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 ease-out hover:border-foreground/40 hover:bg-card"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Spans the whole hero on wide screens, a bare texture behind the
          text that builds to full strength off the right edge of the page;
          a band beneath the text once there is no room alongside. */}
      <div className="relative h-[220px] w-full shrink-0 sm:h-[260px] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <HeroField />
      </div>
    </section>
  )
}
