import type { MetadataRoute } from 'next'
import { alternateLanguages, publicPaths, type PublicPageId } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

/**
 * The sitemap, generated at build time from the route map.
 *
 * Both languages are listed as their own entries, each carrying the full
 * hreflang set, which is what tells a crawler the two are translations
 * rather than duplicates. The REDIRECTS stubs are excluded by publicPaths.
 *
 * The proxy matcher skips any path containing a dot, so `/sitemap.xml` is
 * served straight from here without passing through the locale rewrite.
 */
export const dynamic = 'force-static'

/** Home is the entry point; the legal pages are not what anyone came for. */
const PRIORITY: Partial<Record<PublicPageId, number>> = {
  home: 1,
  mentionsLegales: 0.3,
  confidentialite: 0.3,
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Build time, which is the last moment the content could have changed:
     the whole site is prerendered, so a deploy is the only way a page
     moves. */
  const lastModified = new Date()

  return publicPaths().map(({ id, path }) => ({
    url: absoluteUrl(path),
    lastModified,
    priority: PRIORITY[id] ?? 0.7,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(alternateLanguages(id)).map(([tag, target]) => [tag, absoluteUrl(target)]),
      ),
    },
  }))
}
