import Image from 'next/image'
import type { ReactNode } from 'react'
import { AnimatedBackground } from '@/components/animated-background'
import { CountUp } from '@/components/count-up'
import { HoverArrow } from '@/components/hover-arrow'
import { PointerField } from '@/components/pointer-field'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <AnimatedBackground />

      {/* The tricolore as ambient light, drifting gently against the cursor */}
      <PointerField className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bloom bloom-blue -left-40 -top-48 h-[36rem] w-[36rem]" />
        <div className="bloom bloom-red -right-48 top-8 h-[40rem] w-[40rem] [--bloom-shift:-18px]" />
      </PointerField>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
        <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          <span className="block animate-rise" style={{ animationDelay: '0.05s' }}>
            Le logiciel qui vous
          </span>
          <span className="block animate-rise" style={{ animationDelay: '0.18s' }}>
            fait gagner du temps,
          </span>
          <span
            className="block animate-rise italic text-[var(--blue)]"
            style={{ animationDelay: '0.31s' }}
          >
            l&apos;infrastructure qui vous
          </span>
          <span
            className="block animate-rise italic text-[var(--blue)]"
            style={{ animationDelay: '0.44s' }}
          >
            rend indépendant.
          </span>
        </h1>

        <p
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground animate-rise"
          style={{ animationDelay: '0.6s' }}
        >
          La Française du Logiciel conçoit des logiciels métier sur mesure et bâtit
          l&apos;infrastructure de la souveraineté numérique française et européenne. Deux métiers,
          une même conviction&nbsp;: la technologie doit servir ceux qui l&apos;emploient.
        </p>

        <div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center animate-rise"
          style={{ animationDelay: '0.72s' }}
        >
          <a
            href="#contact"
            className="arrow-hover sheen inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            Démarrer un projet
            <HoverArrow />
          </a>
          <a
            href="#conseil"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 ease-out hover:border-foreground/40 hover:bg-card"
          >
            Découvrir nos deux axes
          </a>
        </div>
      </div>

      {/* Wireframe centerpiece + ticker */}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/40">
          <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-[280px] overflow-hidden border-b border-border md:border-b-0 md:border-r">
              <Image
                src="/images/wireframe-structure.png"
                alt="Structure modulaire abstraite représentant une infrastructure numérique"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_70%,var(--card)_100%)]" />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
              <div className="grid grid-cols-3 gap-6">
                <Stat label="axes complémentaires">
                  <CountUp to={2} />
                </Stat>
                <Stat label="données en Europe">
                  <CountUp to={100} suffix="%" />
                </Stat>
                {/* Dependency counting down to zero: that is the point */}
                <Stat label="dépendance imposée">
                  <CountUp to={0} from={100} />
                </Stat>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nous construisons des outils qui créent de la valeur, sur des fondations que vous
                maîtrisez de bout en bout, du code à l&apos;hébergement.
              </p>
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
