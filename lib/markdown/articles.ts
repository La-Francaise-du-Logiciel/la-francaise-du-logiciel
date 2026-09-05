import { articlesFor } from '@/content/articles'
import {
  articlePath,
  articlesIndexPath,
  authorOf,
  formatDate,
  type Article,
} from '@/lib/articles'
import { format, getMessages, type Locale } from '@/lib/i18n'
import type { MarkdownDocument } from '@/lib/markdown/render'
import { PAGES } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

/**
 * The markdown form of the articles, from the same modules the HTML
 * renders. An article's sections already speak the Block vocabulary, so
 * the document is mostly the article itself plus a byline and the trail
 * back to the rest of the site.
 */

function footLinks(locale: Locale, fromIndex: boolean) {
  const t = getMessages(locale)

  return [
    ...(fromIndex ? [] : [{ label: t.articles.all, href: absoluteUrl(articlesIndexPath(locale)) }]),
    { label: t.markdown.home, href: absoluteUrl(PAGES.home[locale]) },
    { label: t.markdown.allPages, href: absoluteUrl('/sitemap.xml') },
  ]
}

export function articleDocument(article: Article): MarkdownDocument {
  const t = getMessages(article.locale)
  const byline = [
    format(t.articles.published, { date: formatDate(article.published, article.locale) }),
    ...(article.updated
      ? [format(t.articles.updated, { date: formatDate(article.updated, article.locale) })]
      : []),
    format(t.articles.by, { name: authorOf(article) }),
  ].join(' · ')

  return {
    title: article.title,
    description: article.description,
    path: articlePath(article),
    locale: article.locale,
    date: article.published,
    updated: article.updated,
    intro: byline,
    sections: article.sections,
    links: footLinks(article.locale, false),
    linksTitle: t.markdown.seeAlso,
  }
}

export function articlesIndexDocument(locale: Locale): MarkdownDocument {
  const t = getMessages(locale)

  return {
    title: t.articles.title,
    description: t.articles.metaDescription,
    path: articlesIndexPath(locale),
    locale,
    intro: t.articles.intro,
    sections: [
      {
        blocks: [
          {
            kind: 'entries',
            entries: articlesFor(locale).map((article) => ({
              label: `${article.title} (${article.published})`,
              value: absoluteUrl(articlePath(article)),
            })),
          },
        ],
      },
    ],
    links: footLinks(locale, true),
    linksTitle: t.markdown.seeAlso,
  }
}
