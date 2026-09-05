import { Fragment } from 'react'
import { Reveal } from '@/components/reveal'
import { RichText } from '@/components/rich-text'
import { CardGrid, DefinitionList } from '@/components/section'
import { authorOf, formatDate, type Article } from '@/lib/articles'
import { format, getMessages } from '@/lib/i18n'
import type { Block, Section } from '@/lib/markdown/render'

/**
 * The article page body. Articles reuse the markdown Section/Block
 * vocabulary, so the same module renders here and in the .md variant; this
 * file is only the HTML half. Unlike the argument pages, the body does not
 * animate paragraph by paragraph — an article is for reading, not landing.
 */

/** Date, byline and standfirst above the title, mirroring PageHeader. */
export function ArticleHeader({ article }: { article: Article }) {
  const t = getMessages(article.locale).articles

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <Reveal variant="mask-rise">
          <p className="text-sm text-muted-foreground">
            <time dateTime={article.published}>
              {format(t.published, { date: formatDate(article.published, article.locale) })}
            </time>
            {article.updated ? (
              <>
                {' · '}
                <time dateTime={article.updated}>
                  {format(t.updated, { date: formatDate(article.updated, article.locale) })}
                </time>
              </>
            ) : null}
            {' · '}
            {format(t.by, { name: authorOf(article) })}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {article.title}
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {article.description}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        {article.sections.map((section, i) => (
          <ArticleSection key={section.title ?? i} section={section} depth={2} />
        ))}
      </div>
    </div>
  )
}

function ArticleSection({ section, depth }: { section: Section; depth: 2 | 3 }) {
  const Heading = depth === 2 ? 'h2' : 'h3'

  return (
    <section className="mt-14 first:mt-0">
      {section.title ? (
        <Heading className="text-balance font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
          {section.title}
        </Heading>
      ) : null}
      {section.intro ? (
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          <RichText text={section.intro} />
        </p>
      ) : null}
      {section.blocks?.map((block, i) => <ArticleBlock key={i} block={block} />)}
      {section.sections?.map((child, i) => (
        <ArticleSection key={child.title ?? i} section={child} depth={3} />
      ))}
    </section>
  )
}

function ArticleBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case 'prose':
      return (
        <Fragment>
          {block.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              <RichText text={paragraph} />
            </p>
          ))}
        </Fragment>
      )
    case 'bullets':
      return (
        <ul className="mt-6 list-disc space-y-3 pl-5 marker:text-muted-foreground/60">
          {block.items.map((item) => (
            <li key={item} className="text-pretty text-lg leading-relaxed text-muted-foreground">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      )
    case 'cards':
      return (
        <div className="mt-8">
          <CardGrid items={block.items} columns={2} />
        </div>
      )
    case 'entries':
      return (
        <div className="mt-8">
          <DefinitionList entries={block.entries} />
        </div>
      )
    case 'quote':
      return (
        <blockquote className="mt-10 max-w-xl border-l-2 border-[var(--blue)] pl-6 font-serif text-2xl leading-snug tracking-tight">
          {block.lines.join(' ')}
        </blockquote>
      )
  }
}
