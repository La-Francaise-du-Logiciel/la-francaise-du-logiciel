import type { MetadataRoute } from 'next'
import { ARTICLES, articleLocales, articlesFor } from '@/content/articles'
import { articlePath, articlesIndexPath, lastModifiedOf } from '@/lib/articles'
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

/** An ISO day as the Date the sitemap type wants, pinned to midnight UTC. */
function day(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Build time, which is the last moment the content could have changed:
     the whole site is prerendered, so a deploy is the only way a page
     moves. */
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = publicPaths().map(({ id, path }) => ({
    url: absoluteUrl(path),
    lastModified,
    priority: PRIORITY[id] ?? 0.7,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(alternateLanguages(id)).map(([tag, target]) => [tag, absoluteUrl(target)]),
      ),
    },
  }))

  /* The articles carry their own dates, so their lastModified means it. */
  const indexes: MetadataRoute.Sitemap = articleLocales().map((locale) => ({
    url: absoluteUrl(articlesIndexPath(locale)),
    lastModified: day(lastModifiedOf(articlesFor(locale)[0])),
    priority: 0.7,
  }))

  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: absoluteUrl(articlePath(article)),
    lastModified: day(lastModifiedOf(article)),
    priority: 0.6,
  }))

  return [...pages, ...indexes, ...articles]
}
