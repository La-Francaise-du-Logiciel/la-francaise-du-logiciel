import { Reveal } from '@/components/reveal'

/** Title and standfirst at the top of every page other than the home page. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <Reveal variant="mask-rise">
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={150}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
