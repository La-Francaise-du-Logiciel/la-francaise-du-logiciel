import type { ReactNode } from 'react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  title?: string
  intro?: string
  children: ReactNode
  id?: string
  className?: string
}

export function Section({ title, intro, children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24', className)}>
      {title ? (
        <Reveal variant="mask-rise">
          <h2 className="max-w-2xl text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
        </Reveal>
      ) : null}
      {intro ? (
        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">{intro}</p>
        </Reveal>
      ) : null}
      <div className={cn(title || intro ? 'mt-12' : '')}>{children}</div>
    </section>
  )
}

type Item = { readonly title: string; readonly desc: string }

/** The bordered grid used for item lists across the sub-pages. */
export function CardGrid({
  items,
  columns = 3,
}: {
  items: readonly Item[]
  columns?: 2 | 3 | 4
}) {
  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-xl border border-border bg-border',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
      )}
    >
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 80} className="bg-background p-7 sm:p-8">
          <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
        </Reveal>
      ))}
    </div>
  )
}

/** Body copy for the pages that argue rather than list. */
export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="max-w-2xl">
      {paragraphs.map((p, i) => (
        /* The spacing lives on the wrapper: each paragraph is the only
           child of its own Reveal, so a sibling selector never matches. */
        <Reveal key={p.slice(0, 24)} delay={i * 90} className={i > 0 ? 'mt-6' : undefined}>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

type Entry = { readonly label: string; readonly value: string }

/** Label/value pairs for the legal notice. */
export function DefinitionList({ entries }: { entries: readonly Entry[] }) {
  return (
    <dl className="max-w-2xl">
      {entries.map((entry, i) => (
        /* HTML allows a div to group each dt/dd pair, which is what the
           reveal wrapper renders. */
        <Reveal
          key={entry.label}
          delay={i * 50}
          className="flex flex-col gap-1 border-b border-border py-4 last:border-0 sm:flex-row sm:gap-8"
        >
          <dt className="w-full text-sm text-muted-foreground sm:w-64 sm:shrink-0">{entry.label}</dt>
          <dd className="text-pretty leading-relaxed">{entry.value}</dd>
        </Reveal>
      ))}
    </dl>
  )
}
