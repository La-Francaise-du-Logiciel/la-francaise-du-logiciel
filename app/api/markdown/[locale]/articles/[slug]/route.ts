import { ARTICLES, articleBySlug } from '@/content/articles'
import { isLocale, rootLocale, type Locale } from '@/lib/i18n'
import { articleDocument, notFoundDocument, renderDocument } from '@/lib/markdown'
import { absoluteUrl } from '@/lib/site'

/**
 * The markdown form of one article. The proxy rewrites `/articles/<slug>`
 * here on an Accept: text/markdown or a `.md` address; a slug the registry
 * does not know gets the markdown 404, which lists the site.
 */

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ locale: article.locale, slug: article.slug }))
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
  { params }: { params: Promise<{ locale: string; slug: string }> },
): Promise<Response> {
  const { locale: requested, slug } = await params
  const locale: Locale = isLocale(requested) ? requested : rootLocale

  const article = articleBySlug(locale, slug)
  if (!article) {
    return markdown(renderDocument(notFoundDocument(locale), absoluteUrl('/')), 404)
  }

  const document = articleDocument(article)
  return markdown(renderDocument(document, absoluteUrl(document.path)), 200)
}
