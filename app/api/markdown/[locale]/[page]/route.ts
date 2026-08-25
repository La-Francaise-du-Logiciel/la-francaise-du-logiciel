import { isLocale, rootLocale, type Locale } from '@/lib/i18n'
import { documentFor, notFoundDocument, renderDocument } from '@/lib/markdown'
import { isPublicPage, publicPaths, type PageId } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

/**
 * The markdown form of a page.
 *
 * Nothing links here. The proxy rewrites to it when a client asks for
 * text/markdown ahead of text/html, and `.md` addresses rewrite here too,
 * so the page keeps its own address either way.
 *
 * The page and locale are path segments rather than query parameters
 * because a middleware rewrite does not carry a query through to the
 * handler: `request.nextUrl` still describes the address the client asked
 * for. The path survives, and as a bonus every document prerenders.
 *
 * It is a route handler rather than a page so that it owns its response
 * headers. Next writes over the Vary of a rewritten page response, and Vary
 * is the whole point of negotiating on Accept.
 */

/* The proxy rewrites an unknown path to `_missing` here, so that its 404
   is markdown too. Anything that is not a public page id lands the same
   way, so there is nothing to keep in step beyond that. */

export function generateStaticParams() {
  return publicPaths().map(({ id, locale }) => ({ locale, page: id }))
}

function markdown(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      /* The same page answers in two media types, so a shared cache has to
         key on Accept or it hands an agent the HTML a browser warmed. */
      vary: 'Accept, Accept-Encoding',
      'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; page: string }> },
): Promise<Response> {
  const { locale: requested, page } = await params
  const locale: Locale = isLocale(requested) ? requested : rootLocale

  const id = page as PageId
  if (!isPublicPage(id)) {
    return markdown(renderDocument(notFoundDocument(locale), absoluteUrl('/')), 404)
  }

  const document = documentFor(id, locale)
  return markdown(renderDocument(document, absoluteUrl(document.path)), 200)
}
