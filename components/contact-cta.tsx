import { Mail } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { PointerField } from '@/components/pointer-field'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

export function ContactCta() {
  const t = getMessages().contact

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-card/30">
      {/* A soft tricolor light rising from below, drifting with the cursor */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom bloom-blue -bottom-64 left-[4%] h-[34rem] w-[34rem]" />
        <div className="bloom bloom-red -bottom-72 right-[2%] h-[38rem] w-[38rem] [--bloom-shift:-18px]" />
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 text-xs text-muted-foreground">
                {t.kicker}
              </p>
            </Reveal>
            <Reveal variant="mask-rise" delay={90}>
              <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                {t.title}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t.intro}
              </p>
            </Reveal>
          </div>

          <Reveal delay={260} className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[18rem]">
            <a
              href={`mailto:${t.email}`}
              className="arrow-hover sheen inline-flex items-center justify-between gap-4 rounded-md bg-foreground px-6 py-4 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
            >
              <span className="inline-flex items-center gap-2.5">
                <Mail className="h-4 w-4" />
                {t.write}
              </span>
              <HoverArrow />
            </a>
            <a
              href="#top"
              className="arrow-hover inline-flex items-center justify-between gap-4 rounded-md border border-border px-6 py-4 text-sm font-medium text-foreground transition-colors duration-300 ease-out hover:border-foreground/40 hover:bg-card"
            >
              {t.book}
              <HoverArrow />
            </a>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t.responseTime}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
