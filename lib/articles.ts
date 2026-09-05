import { COMPANY } from '@/lib/company'
import { getIntlTag, type Locale } from '@/lib/locale'
import type { Section } from '@/lib/markdown/render'

/**
 * Articles as a system: the type an article module satisfies, the base
 * path of the section in each language, and the helpers that turn an
 * article into an address or a byline.
 *
 * The content itself lives in content/articles/, one module per article,
 * deliberately outside the message catalogues: a catalogue key must exist
 * in every language, while an article exists only in the language it was
 * written in. Adding a language here is a column in ARTICLES_BASE plus
 * articles written in it — nothing structural.
 *
 * This module stays free of catalogue imports so the proxy can read
 * ARTICLES_BASE without dragging the site's copy into the middleware.
 */

export const ARTICLES_BASE = {
  fr: '/articles',
  en: '/en/articles',
} as const satisfies Record<Locale, string>

export type Article = {
  /** The last path segment, kebab-case, stable once published. */
  slug: string
  /** The language the article is written in. Translation is optional. */
  locale: Locale
  title: string
  /** Meta description, index summary and feed summary, all at once. */
  description: string
  /** ISO date, `2026-09-05`. Doubles as the sitemap's lastModified. */
  published: string
  /** Set when a revision is worth signalling; replaces published in lastModified. */
  updated?: string
  /** Defaults to the founder. */
  author?: string
  /** The body, in the same section vocabulary as the markdown documents. */
  sections: readonly Section[]
  /** The slug of this article in other languages, once a translation exists. */
  alternates?: Partial<Record<Locale, string>>
}

export function authorOf(article: Article): string {
  return article.author ?? COMPANY.founder
}

export function articlesIndexPath(locale: Locale): string {
  return ARTICLES_BASE[locale]
}

export function articlePath(article: Article): string {
  return `${ARTICLES_BASE[article.locale]}/${article.slug}`
}

export function lastModifiedOf(article: Article): string {
  return article.updated ?? article.published
}

/** `2026-09-05` as `5 septembre 2026`, in the article's own language. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(getIntlTag(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}
