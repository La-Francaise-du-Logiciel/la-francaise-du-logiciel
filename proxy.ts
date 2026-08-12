import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, LOCALE_COOKIE, localeOf, negotiateLocale, rootLocale } from '@/lib/locale'
import { alternatePath } from '@/lib/routes'

/**
 * Locale routing. Three jobs, in order:
 *
 *  1. `/fr/...` is the internal form of a French URL, never a public one:
 *     redirect it to the unprefixed path so each page has one address.
 *  2. Send a visitor who does not read French to the English version of the
 *     page they asked for, once, before they have chosen a language.
 *  3. Serve the unprefixed French URLs from the `/fr` branch of the route
 *     tree, as a rewrite, so the address bar keeps showing `/conseil`.
 *
 * Everything stays prerendered: a rewrite picks a static page, it does not
 * make one dynamic.
 */
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

const ROOT_PREFIX = `/${rootLocale}`

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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

  const preferred = preferredLocale(request)
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

/** A negotiated redirect depends on who is asking; caches must not share it. */
function vary(response: NextResponse) {
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}
