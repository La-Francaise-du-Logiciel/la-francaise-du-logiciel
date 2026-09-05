import type { Metadata, Viewport } from 'next'
import {
  ARTICLES_BASE,
  articlePath,
  articlesIndexPath,
  authorOf,
  lastModifiedOf,
  type Article,
} from '@/lib/articles'
import { getIntlTag, getMessages, locales, type Locale } from '@/lib/i18n'
import { alternateLanguages, PAGES, type CataloguePageId, type PublicPageId } from '@/lib/routes'
import { absoluteUrl, SITE_URL } from '@/lib/site'

/**
 * The card a link to the site unfurls into: the brand banner on its own
 * background. One image serves both languages, because it carries the
 * company's name and that is a proper noun.
 */
const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  type: 'image/png',
}

/** Open Graph writes a locale as fr_FR; Intl writes the same tag fr-FR. */
function openGraphLocale(locale: Locale): string {
  return getIntlTag(locale).replace('-', '_')
}

/**
 * Everything a page shares with the card that represents it, plus the
 * markdown address of the same page so a client can find it without
 * negotiating on Accept.
 */
function sharedMetadata(
  id: PublicPageId,
  locale: Locale,
  title: string,
  description: string,
): Metadata {
  const t = getMessages(locale)
  const canonical = PAGES[id][locale]

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(id),
      types: {
        /* `/audit.md` renders the same page as markdown. */
        'text/markdown': markdownPath(canonical),
      },
    },
    openGraph: {
      type: 'website',
      url: absoluteUrl(canonical),
      siteName: t.brand.name,
      title,
      description,
      locale: openGraphLocale(locale),
      alternateLocale: locales.filter((code) => code !== locale).map(openGraphLocale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

/** The home page is `/index.md`, since `/.md` reads as a hidden file. */
function markdownPath(canonical: string): string {
  const base = canonical === '/' ? '/index' : canonical
  return `${base}.md`
}

/** Shared by both root layouts: everything that does not vary per page. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    shortcut: '/icon.svg',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
}

export const rootViewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f5f0',
}

/**
 * Title, description and the hreflang set for a page. Every page declares
 * both languages so search engines pair the two versions rather than
 * treating them as duplicates.
 */
export function pageMetadata(id: CataloguePageId, locale: Locale): Metadata {
  const t = getMessages(locale)
  const page = t.pages[id]

  return sharedMetadata(id, locale, page.metaTitle + t.metadata.titleSuffix, page.metaDescription)
}

/** The home page takes its title from the catalogue root, unsuffixed. */
export function homeMetadata(locale: Locale): Metadata {
  const t = getMessages(locale)

  return sharedMetadata('home', locale, t.metadata.title, t.metadata.description)
}

/** The RSS feed, announced wherever the articles are. */
const FEED_PATH = '/feed.xml'

/**
 * The article index. Not a catalogue page, so it does not go through
 * sharedMetadata: it has no hreflang set — only the locales with articles
 * have an index — and it announces the feed.
 */
export function articlesIndexMetadata(locale: Locale): Metadata {
  const t = getMessages(locale)
  const title = t.articles.metaTitle + t.metadata.titleSuffix
  const description = t.articles.metaDescription
  const canonical = articlesIndexPath(locale)

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        'text/markdown': `${canonical}.md`,
        'application/rss+xml': FEED_PATH,
      },
    },
    openGraph: {
      type: 'website',
      url: absoluteUrl(canonical),
      siteName: t.brand.name,
      title,
      description,
      locale: openGraphLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

/**
 * One article. hreflang appears only once a translation exists in the
 * article's own `alternates`; a page that exists in one language should
 * not claim otherwise.
 */
export function articleMetadata(article: Article): Metadata {
  const t = getMessages(article.locale)
  const title = article.title + t.metadata.titleSuffix
  const canonical = articlePath(article)

  const alternates = Object.entries(article.alternates ?? {}).map(
    ([code, slug]) => [code, `${ARTICLES_BASE[code as Locale]}/${slug}`] as const,
  )

  return {
    title,
    description: article.description,
    authors: [{ name: authorOf(article) }],
    alternates: {
      canonical,
      ...(alternates.length ? { languages: Object.fromEntries(alternates) } : {}),
      types: {
        'text/markdown': `${canonical}.md`,
        'application/rss+xml': FEED_PATH,
      },
    },
    openGraph: {
      type: 'article',
      url: absoluteUrl(canonical),
      siteName: t.brand.name,
      title,
      description: article.description,
      locale: openGraphLocale(article.locale),
      publishedTime: article.published,
      modifiedTime: lastModifiedOf(article),
      authors: [authorOf(article)],
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: article.description,
      images: [OG_IMAGE.url],
    },
  }
}
