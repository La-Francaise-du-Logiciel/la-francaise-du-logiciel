import { Mail } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { PointerField } from '@/components/pointer-field'
import { Reveal } from '@/components/reveal'
import { getMessages } from '@/lib/i18n'

export function ContactCta() {
  const t = getMessages().contact

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-card/30">
      {/* A soft tricolor light rising from below, drifting with the cursor.
          The two are deliberately mismatched: the blue one is tall, low and
          well to the left, the red one wide, higher and short of the edge,
          and they change shape on different clocks so they never mirror. */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom -bottom-[22rem] left-[-8%] h-[46rem] w-[34rem]">
          <div className="bloom__shape bloom-blue [--bloom-morph-duration:24s]" />
        </div>
        <div className="bloom -bottom-56 right-[12%] h-[30rem] w-[44rem] [--bloom-shift:-16px]">
          <div className="bloom__shape bloom-red [--bloom-morph-delay:-9s] [--bloom-morph-duration:33s]" />
        </div>
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal variant="mask-rise">
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
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t.responseTime}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
