import { articleLocales, articlesFor } from '@/content/articles'
import { isLocale, rootLocale, type Locale } from '@/lib/i18n'
import { articlesIndexDocument, notFoundDocument, renderDocument } from '@/lib/markdown'
import { absoluteUrl } from '@/lib/site'

/**
 * The markdown form of the article index. Same arrangement as the page
 * documents one segment up: the proxy rewrites here, the static `articles`
 * segment wins over the `[page]` sibling, and a locale with nothing to
 * read gets the markdown 404 rather than an empty list.
 */

export function generateStaticParams() {
  return articleLocales().map((locale) => ({ locale }))
}

function markdown(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      vary: 'Accept, Accept-Encoding',
      'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
): Promise<Response> {
  const { locale: requested } = await params
  const locale: Locale = isLocale(requested) ? requested : rootLocale

  if (articlesFor(locale).length === 0) {
    return markdown(renderDocument(notFoundDocument(locale), absoluteUrl('/')), 404)
  }

  const document = articlesIndexDocument(locale)
  return markdown(renderDocument(document, absoluteUrl(document.path)), 200)
}
