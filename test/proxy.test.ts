import { NextRequest, type NextResponse } from 'next/server'
import { describe, expect, it } from 'vitest'
import { SITE_HOST, SITE_URL } from '@/lib/site'
import proxy, { config as proxyConfig } from '@/proxy'

const AGENT_FILES = ['/robots.txt', '/sitemap.xml', '/llms.txt']

/**
 * robots.txt, sitemap.xml and llms.txt are served from app/ rather than
 * public/, and the proxy has to let them through untouched: rewriting one
 * into the locale tree would 404 it. They sit in the matcher only so the
 * canonical-host redirect reaches them.
 */
describe('the proxy', () => {

  function get(path: string, host: string) {
    return proxy(
      new NextRequest(new URL(path, `https://${host}`), {
        headers: { host, 'sec-fetch-dest': 'document' },
      }),
    )
  }

  it.each(AGENT_FILES)('is asked to handle %s', (path) => {
    const matched = proxyConfig.matcher.some((pattern) =>
      new RegExp(`^${pattern}$`).test(path),
    )
    expect(matched).toBe(true)
  })

  it.each(AGENT_FILES)('serves %s without rewriting it into the locale tree', (path) => {
    const response = get(path, SITE_HOST)
    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-rewrite')).toBeNull()
  })

  it.each([...AGENT_FILES, '/', '/audit', '/en/consulting'])(
    'sends www to the canonical host for %s',
    (path) => {
      const response = get(path, `www.${SITE_HOST}`)
      expect(response.status).toBe(301)
      /* A Location header keeps the root's slash, which absoluteUrl drops
         because a canonical URL reads better without it. Same resource. */
      expect(response.headers.get('location')).toBe(`${SITE_URL}${path}`)
    },
  )

  it('keeps the query string when it sends www to the apex', () => {
    const response = get('/contact?utm_source=agent', `www.${SITE_HOST}`)
    expect(response.headers.get('location')).toBe(`${SITE_URL}/contact?utm_source=agent`)
  })

  /* The redirect targets a host that is never itself a www name, so no
     header can make it fire twice. */
  it.each([SITE_HOST, 'la-francaise-du-logiciel.tensel.cloud', 'localhost:3000'])(
    'leaves %s alone',
    (host) => {
      expect(get('/audit', host).status).not.toBe(301)
    },
  )
})

/**
 * Negotiation. The point of each case is which representation a client
 * gets, so they assert the rewrite target rather than the body: the route
 * handler's own tests cover what it renders.
 */
describe('markdown negotiation', () => {
  const MARKDOWN = 'text/markdown'
  const BROWSER = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

  function get(path: string, accept: string) {
    const url = new URL(path, `https://${SITE_HOST}`)
    return proxy(
      new NextRequest(url, {
        headers: { host: SITE_HOST, 'sec-fetch-dest': 'document', accept },
      }),
    )
  }

  const rewriteOf = (response: NextResponse | null | undefined) =>
    response?.headers.get('x-middleware-rewrite')

  it.each([
    ['/', 'fr', 'home'],
    ['/audit', 'fr', 'audit'],
    ['/en/consulting', 'en', 'conseil'],
    ['/mentions-legales', 'fr', 'mentionsLegales'],
  ])('serves %s as markdown when asked', (path, locale, page) => {
    expect(rewriteOf(get(path, MARKDOWN))).toContain(`/api/markdown/${locale}/${page}`)
  })

  it.each(['/', '/audit', '/en/consulting'])('leaves %s as HTML for a browser', (path) => {
    expect(rewriteOf(get(path, BROWSER)) ?? '').not.toContain('/api/markdown')
  })

  it.each([
    ['/audit.md', 'fr', 'audit'],
    ['/index.md', 'fr', 'home'],
    ['/.md', 'fr', 'home'],
    ['/en/consulting.md', 'en', 'conseil'],
  ])('answers %s from the markdown route', (path, locale, page) => {
    expect(rewriteOf(get(path, BROWSER))).toContain(`/api/markdown/${locale}/${page}`)
  })

  it('sends an unknown .md address to the markdown 404', () => {
    expect(rewriteOf(get('/nope.md', BROWSER))).toContain('/api/markdown/fr/_missing')
  })

  it('sends an unknown path to the markdown 404 when markdown was asked for', () => {
    expect(rewriteOf(get('/nope', MARKDOWN))).toContain('/api/markdown/fr/_missing')
    expect(rewriteOf(get('/en/nope', MARKDOWN))).toContain('/api/markdown/en/_missing')
  })

  /* Forwarding a stub is more use to an agent than telling it the address
     does not exist. The proxy only has to keep its hands off it: the
     redirect itself is the page's, further down. */
  it('leaves a redirect stub to the HTML routing rather than calling it missing', () => {
    const rewrite = rewriteOf(get('/souverainete', MARKDOWN)) ?? ''

    expect(rewrite).not.toContain('/api/markdown')
    expect(rewrite).toContain('/fr/souverainete')
  })

  it('leaves the agent files alone even when markdown is asked for', () => {
    for (const path of AGENT_FILES) {
      expect(rewriteOf(get(path, MARKDOWN)) ?? '').not.toContain('/api/markdown')
    }
  })
})
