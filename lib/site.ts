/**
 * The site's own address, in one place.
 *
 * The apex is the canonical host and `www` 301s to it. Which of the two
 * wins is mostly taste, but the apex is the one already wired to the app,
 * so it is the one that keeps working if the redirect is ever lost.
 *
 * A canonical, a sitemap entry and a JSON-LD `url` all have to name the
 * host that answers directly: pointing any of them at a redirect spends a
 * hop on every crawl. Override per environment with NEXT_PUBLIC_SITE_URL,
 * no trailing slash.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://francaisedulogiciel.fr'

/** The canonical host on its own, which is what a Host header carries. */
export const SITE_HOST = new URL(SITE_URL).host

/**
 * A path from lib/routes as an absolute URL. Metadata can stay relative and
 * let `metadataBase` resolve it, but sitemaps, robots.txt and JSON-LD all
 * require absolute URLs, so they go through here.
 */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}
