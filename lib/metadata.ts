import type { Metadata, Viewport } from 'next'
import { getMessages, type Locale } from '@/lib/i18n'
import { alternateLanguages, PAGES, type PageId } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'

/** The pages that carry their own title and description in the catalogues. */
type CataloguePageId = Exclude<PageId, 'home' | 'souverainete'>

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

  return {
    title: page.metaTitle + t.metadata.titleSuffix,
    description: page.metaDescription,
    alternates: {
      canonical: PAGES[id][locale],
      languages: alternateLanguages(id),
    },
  }
}

/** The home page takes its title from the catalogue root, unsuffixed. */
export function homeMetadata(locale: Locale): Metadata {
  const t = getMessages(locale)

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: PAGES.home[locale],
      languages: alternateLanguages('home'),
    },
  }
}
