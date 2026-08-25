import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/**
 * Nothing here is private, so nothing is disallowed. The file exists to
 * carry the sitemap reference, and to answer the crawlers that treat a
 * missing robots.txt as a reason to slow down.
 *
 * `/fr` is the internal form of every French URL and the proxy 308s it
 * away, so it is kept out of the crawl rather than left to be discovered
 * and redirected.
 */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/fr',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
