import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Code, Cpu, Globe, Layers, Network, ShieldCheck } from 'lucide-react'
import { GlowCard } from '@/components/glow-card'
import { HoverArrow } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'

const CONSEIL_ITEMS = [
  { icon: Code, title: 'Sites & produits web', desc: 'Des interfaces rapides, soignées et pensées pour convertir.' },
  { icon: Layers, title: 'SaaS sur mesure', desc: 'Des plateformes métier taillées pour vos processus réels.' },
  { icon: Cpu, title: 'Automatisation & IA', desc: 'Des agents et flux qui absorbent les tâches répétitives.' },
]

const SOUV_ITEMS = [
  { icon: ShieldCheck, title: 'Données protégées', desc: 'Hébergement en France, conformité RGPD par défaut.' },
  { icon: Network, title: 'Infrastructure ouverte', desc: 'Des briques interopérables, sans verrou propriétaire.' },
  { icon: Globe, title: 'Indépendance', desc: 'Aucune dépendance imposée aux puissances extra-européennes.' },
]

export function Axes() {
  return (
    <section id="axes" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Deux axes / une trajectoire
          </p>
        </Reveal>
        <Reveal variant="mask-rise" delay={90}>
          <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Nous créons de la valeur, et nous la protégeons.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AxisCard
          id="conseil"
          accent="var(--blue)"
          title="Le logiciel qui travaille pour vous"
          body="Nous accompagnons les entreprises pour concevoir des logiciels (sites, SaaS, automatisation IA) qui font gagner du temps et créent une valeur mesurable. Au sens large, tout ce qui transforme une contrainte en avantage."
          image="/images/consulting.png"
          imageAlt="Espace de travail d'un développeur, écran affichant du code dans une ambiance sombre"
          items={CONSEIL_ITEMS}
          delay={0}
        />
        <AxisCard
          id="souverainete"
          accent="var(--red)"
          title="L'infrastructure qui vous rend libre"
          body="Nous bâtissons des produits et des infrastructures au service de la souveraineté numérique française et européenne, pour ne dépendre d'aucune puissance étrangère, qu'elle soit américaine, chinoise ou autre."
          image="/images/sovereignty.png"
          imageAlt="Salle serveur d'un centre de données éclairée de bleu et de rouge"
          items={SOUV_ITEMS}
          delay={120}
        />
      </div>
    </section>
  )
}

interface AxisCardProps {
  id: string
  accent: string
  title: string
  body: string
  image: string
  imageAlt: string
  items: { icon: typeof Code; title: string; desc: string }[]
  delay: number
}

function AxisCard({ id, accent, title, body, image, imageAlt, items, delay }: AxisCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <GlowCard accent={accent} className="group h-full">
        <article id={id} className="flex h-full scroll-mt-24 flex-col">
          <div className="relative h-52 shrink-0 overflow-hidden sm:h-60">
            <Image
              src={image || '/placeholder.svg'}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
          </div>

          <div className="flex flex-1 flex-col p-7 sm:p-8">
            <div className="mb-4 h-px w-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
            <h3 className="text-balance font-serif text-2xl leading-tight tracking-tight sm:text-[1.7rem]">
              {title}
            </h3>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{body}</p>

            <ul className="mt-7 flex flex-col gap-4 border-t border-border pt-7">
              {items.map((item, i) => (
                <li
                  key={item.title}
                  className="chip flex items-start gap-3.5"
                  style={{ '--chip-delay': `${260 + i * 90}ms` } as CSSProperties}
                >
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border"
                    style={{ color: accent }}
                  >
                    <item.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group/link arrow-hover mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground"
            >
              <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
                {id === 'conseil' ? 'Parler de votre projet' : 'Rejoindre le mouvement'}
              </span>
              <HoverArrow />
            </a>
          </div>
        </article>
      </GlowCard>
    </Reveal>
  )
}
