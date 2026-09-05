import Link from 'next/link'
import { ArrowLink } from '@/components/hover-arrow'
import { Reveal } from '@/components/reveal'
import { articlesFor } from '@/content/articles'
import { articlePath, formatDate } from '@/lib/articles'
import { format, getMessages, type Locale } from '@/lib/i18n'

/** The index: every article in the locale, newest first, as ruled rows. */
export function ArticleList({ locale }: { locale: Locale }) {
  const t = getMessages(locale).articles

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        {articlesFor(locale).map((article, i) => (
          <Reveal
            key={article.slug}
            delay={i * 80}
            as="article"
            className="border-b border-border py-10 first:pt-0 last:border-0"
          >
            <p className="text-sm text-muted-foreground">
              <time dateTime={article.published}>
                {format(t.published, { date: formatDate(article.published, locale) })}
              </time>
            </p>
            <h2 className="mt-3 text-balance font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
              <Link
                href={articlePath(article)}
                className="transition-colors duration-300 ease-out hover:text-muted-foreground"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {article.description}
            </p>
            <div className="mt-5">
              <ArrowLink href={articlePath(article)}>{t.read}</ArrowLink>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
