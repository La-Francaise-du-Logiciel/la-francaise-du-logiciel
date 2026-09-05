import { pourquoiNousLancons } from '@/content/articles/pourquoi-nous-lancons'
import type { Article } from '@/lib/articles'
import { locales, type Locale } from '@/lib/locale'

/**
 * Every article the site publishes, newest first. A new article is a
 * module in this directory plus a line here; the routes, the sitemap, the
 * feed, llms.txt and the markdown variants all derive from this list.
 */
export const ARTICLES: readonly Article[] = [pourquoiNousLancons].toSorted((a, b) =>
  b.published.localeCompare(a.published),
)

export function articlesFor(locale: Locale): readonly Article[] {
  return ARTICLES.filter((article) => article.locale === locale)
}

export function articleBySlug(locale: Locale, slug: string): Article | null {
  return articlesFor(locale).find((article) => article.slug === slug) ?? null
}

/** The locales with something to read, which are the index pages worth serving. */
export function articleLocales(): Locale[] {
  return locales.filter((locale) => articlesFor(locale).length > 0)
}
