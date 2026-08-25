import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { SITE_HOST, SITE_URL } from '@/lib/site'
import proxy, { config as proxyConfig } from '@/proxy'

/**
 * robots.txt, sitemap.xml and llms.txt are served from app/ rather than
 * public/, and the proxy has to let them through untouched: rewriting one
 * into the locale tree would 404 it. They sit in the matcher only so the
 * canonical-host redirect reaches them.
 */
describe('the proxy', () => {
  const AGENT_FILES = ['/robots.txt', '/sitemap.xml', '/llms.txt']

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
