import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Code, Cpu, Database, FileSearch, Layers, Scale, Server, Wrench } from 'lucide-react'
import { GlowCard } from '@/components/glow-card'
import { HoverArrow } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS } from '@/lib/routes'

/* Icons pair with the catalogue's items by position. */
const CONSEIL_ICONS = [Code, Layers, Cpu, Wrench]
const AUDIT_ICONS = [FileSearch, Server, Database, Scale]

export function Axes({ locale }: { locale: Locale }) {
  const t = getMessages(locale).axes

  return (
    <section id={ANCHORS.services} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 max-w-2xl">
        <Reveal variant="mask-rise">
          <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {t.title}
          </h2>
        </Reveal>
      </div>

      {/* Side by side, the two cards share one set of rows: image, heading,
          body, list, link. Each card is a subgrid of it, so every rule lands
          on the same line however long the copy runs in a given language.
          Stacked, they fall back to plain flex where alignment is moot. */}
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-y-0 lg:[grid-template-rows:auto_auto_auto_auto_auto]">
        <AxisCard
          id={ANCHORS.consulting}
          accent="var(--blue)"
          content={t.conseil}
          icons={CONSEIL_ICONS}
          image="/images/consulting.png"
          delay={0}
        />
        <AxisCard
          id={ANCHORS.audit}
          accent="var(--red)"
          content={t.audit}
          icons={AUDIT_ICONS}
          image="/images/wireframe-structure.png"
          delay={120}
        />
      </div>
    </section>
  )
}

interface AxisContent {
  readonly title: string
  readonly body: string
  readonly imageAlt: string
  readonly link: string
  readonly href: string
  readonly items: readonly { readonly title: string; readonly desc: string }[]
}

interface AxisCardProps {
  id: string
  accent: string
  content: AxisContent
  icons: typeof CONSEIL_ICONS
  image: string
  delay: number
}

function AxisCard({ id, accent, content, icons, image, delay }: AxisCardProps) {
  return (
    <Reveal delay={delay} className="h-full lg:grid lg:row-span-5 lg:grid-rows-subgrid">
      <GlowCard
        accent={accent}
        className="group h-full lg:grid lg:row-span-5 lg:grid-rows-subgrid"
        contentClassName="lg:grid lg:row-span-5 lg:grid-rows-subgrid"
      >
        <article
          id={id}
          className="flex h-full scroll-mt-24 flex-col lg:grid lg:row-span-5 lg:grid-rows-subgrid"
        >
          <div className="relative h-52 shrink-0 overflow-hidden sm:h-60">
            <Image
              src={image}
              alt={content.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
          </div>

          <div className="flex flex-1 flex-col p-7 sm:p-8 lg:grid lg:row-span-4 lg:grid-rows-subgrid">
            {/* The rule and the heading share a row, so the body below them
                starts level in both cards. */}
            <div>
              <div className="mb-4 h-px w-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
              <h3 className="text-balance font-serif text-2xl leading-tight tracking-tight sm:text-[1.7rem]">
                {content.title}
              </h3>
            </div>
            <p className="mt-4 grow text-pretty leading-relaxed text-muted-foreground">
              {content.body}
            </p>

            <ul className="mt-7 flex flex-col gap-4 border-t border-border pt-7">
              {content.items.map((item, i) => {
                const Icon = icons[i]
                return (
                  <li
                    key={item.title}
                    className="chip flex items-start gap-3.5"
                    style={{ '--chip-delay': `${260 + i * 90}ms` } as CSSProperties}
                  >
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border"
                      style={{ color: accent }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <Link
              href={content.href}
              className="group/link arrow-hover inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground"
            >
              <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
                {content.link}
              </span>
              <HoverArrow />
            </Link>
          </div>
        </article>
      </GlowCard>
    </Reveal>
  )
}
