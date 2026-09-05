import { articlesFor } from '@/content/articles'
import { articlePath, articlesIndexPath, authorOf, type Article } from '@/lib/articles'
import { getIntlTag, getMessages, rootLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/site'

/**
 * The RSS feed of the articles, in the root locale — the one the articles
 * are written in today. A second language would get its own feed the day
 * it has articles to fill one.
 *
 * Hand-built, like llms.txt: RSS 2.0 is a small format and a dependency
 * would be larger than the file. The proxy matcher skips dotted paths, so
 * this is served straight from here.
 */
export const dynamic = 'force-static'

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** RSS wants RFC 822 dates; an ISO day becomes midnight UTC that day. */
function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString()
}

function item(article: Article): string {
  const url = absoluteUrl(articlePath(article))

  return [
    '    <item>',
    `      <title>${escape(article.title)}</title>`,
    `      <link>${escape(url)}</link>`,
    `      <guid isPermaLink="true">${escape(url)}</guid>`,
    `      <description>${escape(article.description)}</description>`,
    `      <pubDate>${rfc822(article.published)}</pubDate>`,
    `      <dc:creator>${escape(authorOf(article))}</dc:creator>`,
    '    </item>',
  ].join('\n')
}

function feed(): string {
  const t = getMessages(rootLocale)
  const articles = articlesFor(rootLocale)
  const newest = articles[0]

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escape(`${t.brand.name} · ${t.articles.metaTitle}`)}</title>`,
    `    <link>${escape(absoluteUrl(articlesIndexPath(rootLocale)))}</link>`,
    `    <description>${escape(t.articles.metaDescription)}</description>`,
    `    <language>${getIntlTag(rootLocale).toLowerCase()}</language>`,
    ...(newest ? [`    <lastBuildDate>${rfc822(newest.published)}</lastBuildDate>`] : []),
    `    <atom:link href="${escape(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>`,
    ...articles.map(item),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

export function GET(): Response {
  return new Response(feed(), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
