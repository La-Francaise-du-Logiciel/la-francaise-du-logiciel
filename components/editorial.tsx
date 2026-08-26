import type { CSSProperties, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

/**
 * The editorial layout of the argument pages (audit, conseil, méthode,
 * convictions): each section sets its title in a left rail that stays put
 * while its content scrolls on the right, so the reader always knows which
 * part of the argument they are in. The rail carries a small serif numeral
 * in the page's accent colour — the same numbering vocabulary as the
 * four steps of the method — which turns a long page into a numbered
 * table of contents as it goes by.
 */

interface RailSectionProps {
  /** Two digits, '01'…; drawn in the accent colour at the top of the rail. */
  num: string
  accent: string
  title: string
  intro?: string
  /** Tinted sections alternate with plain ones to pace the scroll. */
  tint?: boolean
  id?: string
  children: ReactNode
}

export function RailSection({ num, accent, title, intro, tint, id, children }: RailSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24', tint && 'bg-card/30')}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="mask-rise">
            <p className="flex items-center gap-3" aria-hidden="true">
              <span className="font-serif text-[15px] leading-none" style={{ color: accent }}>
                {num}
              </span>
              <span className="h-px w-10 bg-border" />
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {title}
            </h2>
          </Reveal>
          {intro ? (
            <Reveal delay={120}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>
        <div className="mt-10 lg:mt-0">{children}</div>
      </div>
    </section>
  )
}

/**
 * An ordered sequence, numbered in the accent colour. The same classes as
 * the method's four steps drive the draw-across reveal, so sequences
 * animate the same way everywhere.
 */
export function StepList({
  items,
  accent,
}: {
  items: readonly { readonly num?: string; readonly title: string; readonly desc: string }[]
  accent: string
}) {
  return (
    <Reveal
      as="ol"
      variant="group"
      className={cn(
        'grid gap-px overflow-hidden rounded-xl border border-border bg-border',
        items.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3',
      )}
    >
      {items.map((step, i) => (
        <li
          key={step.title}
          className="step flex min-h-[13rem] flex-col gap-7 bg-background p-7 transition-colors duration-300 ease-out hover:bg-card"
          style={{ '--step-delay': `${i * 180}ms`, '--step-accent': accent } as CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span className="step-num font-serif text-[15px] leading-none" style={{ color: accent }}>
              {step.num ?? String(i + 1).padStart(2, '0')}
            </span>
            <span className="step-line h-px flex-1 bg-border" />
          </div>
          <div className="step-body">
            <h3 className="font-serif text-xl tracking-tight sm:text-2xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        </li>
      ))}
    </Reveal>
  )
}

/**
 * An inventory as ruled rows rather than boxes: what matters is that the
 * list is complete, not that the entries compete for attention.
 */
export function RowList({
  items,
}: {
  items: readonly { readonly title: string; readonly desc: string }[]
}) {
  return (
    <div>
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={i * 80}
          className="grid gap-2 border-b border-border py-6 first:pt-0 last:border-0 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
        >
          <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
          <p className="text-pretty leading-relaxed text-muted-foreground">{item.desc}</p>
        </Reveal>
      ))}
    </div>
  )
}

/**
 * The refusals: each one marked with a cross in the site's red, the one
 * place that colour means exactly what it says.
 */
export function RefusalList({
  items,
}: {
  items: readonly { readonly title: string; readonly desc: string }[]
}) {
  return (
    <div>
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={i * 80}
          className="grid gap-2 border-b border-border py-6 first:pt-0 last:border-0 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10"
        >
          <div className="flex items-start gap-3">
            <X
              className="mt-1 h-4 w-4 shrink-0 text-[var(--red)]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
          </div>
          <p className="text-pretty leading-relaxed text-muted-foreground">{item.desc}</p>
        </Reveal>
      ))}
    </div>
  )
}

/** The one sentence of a section that has to survive the scroll. */
export function PullQuote({ text, accent }: { text: string; accent: string }) {
  return (
    <Reveal delay={200} className="mt-10">
      <p
        className="max-w-xl border-l-2 pl-6 font-serif text-2xl leading-snug tracking-tight sm:text-3xl"
        style={{ borderColor: accent }}
      >
        {text}
      </p>
    </Reveal>
  )
}
