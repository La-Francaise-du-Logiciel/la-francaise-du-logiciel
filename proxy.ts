import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, LOCALE_COOKIE, localeOf, negotiateLocale, rootLocale } from '@/lib/locale'
import { alternatePath } from '@/lib/routes'
import { SITE_HOST } from '@/lib/site'

/**
 * Canonical host and locale routing. Four jobs, in order:
 *
 *  1. `www` is attached to the same container as the apex, so send it to
 *     the apex, which is the host every canonical URL names.
 *  2. `/fr/...` is the internal form of a French URL, never a public one:
 *     redirect it to the unprefixed path so each page has one address.
 *  3. Send a visitor who does not read French to the English version of the
 *     page they asked for, once, before they have chosen a language.
 *  4. Serve the unprefixed French URLs from the `/fr` branch of the route
 *     tree, as a rewrite, so the address bar keeps showing `/conseil`.
 *
 * Everything stays prerendered: a rewrite picks a static page, it does not
 * make one dynamic.
 */
export const config = {
  /* The pattern skips anything with a dot in it, which is how static files
     reach the route tree untouched. robots.txt, sitemap.xml and llms.txt
     are then named back in so that job 1 covers them too; the guard at the
     top of the proxy keeps the locale rewrite off them. Next reads this
     array at build time, so the paths have to be written out rather than
     spread from a constant. */
  matcher: ['/((?!api|_next|.*\\..*).*)', '/robots.txt', '/sitemap.xml', '/llms.txt'],
}

const ROOT_PREFIX = `/${rootLocale}`

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const canonical = canonicalHostRedirect(request)
  if (canonical) return canonical

  /* A dot means a file rather than a page. Those are in the matcher only
     for the redirect above; rewriting /robots.txt to /fr/robots.txt would
     404 it. */
  if (pathname.includes('.')) return NextResponse.next()

  if (pathname === ROOT_PREFIX || pathname.startsWith(`${ROOT_PREFIX}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(ROOT_PREFIX.length) || '/'
    return NextResponse.redirect(url, 308)
  }

  /* Prefixed locales are an explicit request; only the unprefixed French
     URLs are open to negotiation. */
  if (localeOf(pathname) !== rootLocale) {
    return NextResponse.next()
  }

  const preferred = isPageLoad(request) ? preferredLocale(request) : null
  if (preferred && preferred !== rootLocale) {
    const target = alternatePath(pathname, preferred)
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = target
      return vary(NextResponse.redirect(url, 307))
    }
  }

  /* Next sets its own Vary on a rewritten response, so there is no point
     adding ours here. Only the redirects above carry it. A shared HTML
     cache in front of this app therefore has to be configured to vary on
     Accept-Language and Cookie itself. */
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? ROOT_PREFIX : `${ROOT_PREFIX}${pathname}`
  return NextResponse.rewrite(url)
}

/**
 * Sends `www` to the apex, which is the host every canonical URL, sitemap
 * entry and JSON-LD node names.
 *
 * It has to happen here rather than in front of the app: Tensel attaches
 * every custom domain to the same container and has no canonical-host
 * setting, and DNS cannot redirect. This proxy is the first place the Host
 * header is visible.
 *
 * Only the exact `www.` form of the canonical host is redirected. The
 * platform hostname, a preview domain and a missing header all pass
 * through, and since the target host is never itself a `www.` name, there
 * is no arrangement of headers that makes this loop.
 */
function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  /* Behind the platform's edge the original host arrives forwarded; the
     Host header is the one that survives a direct request. */
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (host !== `www.${SITE_HOST}`) return null

  const url = request.nextUrl.clone()
  url.protocol = 'https'
  url.host = SITE_HOST
  url.port = ''
  /* 301 rather than the 308 used above: this is the permanent identity of
     the site rather than a route detail, and every crawler understands it.
     Nothing POSTs to a page, and /api is outside the matcher. */
  return NextResponse.redirect(url, 301)
}

/**
 * Whether a person is loading a page, as opposed to the router fetching
 * data behind one.
 *
 * Only the former should be sent to another language. Negotiating a router
 * fetch is what broke the switcher: sitting on `/en`, the router prefetches
 * `/` while the cookie still says English, caches the redirect back to
 * `/en` as the answer, and the click then replays it.
 *
 * `Sec-Fetch-Dest` is the signal because it is a browser header rather than
 * a framework one: Next strips its own `RSC` and `Next-Router-*` headers,
 * and the `_rsc` query parameter, before a proxy ever sees them. Clients
 * that send no Fetch Metadata at all (curl, older crawlers) are treated as
 * page loads, which is what keeps the plain-HTTP behaviour intact.
 */
function isPageLoad(request: NextRequest): boolean {
  const dest = request.headers.get('sec-fetch-dest')
  return dest ? dest === 'document' : !request.headers.has('next-url')
}

/**
 * A language the visitor chose in the navbar wins over their browser's.
 *
 * `negotiateLocale` returns null when no `Accept-Language` header was sent
 * at all, which is how crawlers and bare HTTP clients arrive: those are
 * left on the canonical French URL rather than guessed at.
 */
function preferredLocale(request: NextRequest) {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value
  if (stored && isLocale(stored)) return stored
  return negotiateLocale(request.headers.get('accept-language'))
}

/**
 * A negotiated redirect depends on who is asking, so no cache may reuse it:
 * one shared copy of `/ -> /en` would drag French readers into English. Vary
 * states the inputs; no-store keeps intermediaries that ignore Vary out of it
 * altogether. It costs nothing, the response carries no content.
 */
function vary(response: NextResponse) {
  response.headers.set('Vary', 'Accept-Language, Cookie')
  response.headers.set('Cache-Control', 'no-store')
  return response
}
