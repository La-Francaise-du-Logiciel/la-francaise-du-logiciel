import { locales, rootLocale, type Locale } from '@/lib/locale'

/**
 * Every path on the site, in every locale, as the visitor sees it. This is
 * the single source of truth: catalogues, components, the language switcher
 * and the middleware all resolve links through here.
 *
 * French keeps the unprefixed paths it was indexed under; every other
 * locale sits under its own prefix with translated slugs. Adding a language
 * is a column here plus a catalogue in messages/ — there are no per-locale
 * route files to duplicate.
 */
export const PAGES = {
  home: { fr: '/', en: '/en' },
  conseil: { fr: '/conseil', en: '/en/consulting' },
  audit: { fr: '/audit', en: '/en/audit' },
  methode: { fr: '/methode', en: '/en/method' },
  convictions: { fr: '/convictions', en: '/en/principles' },
  contact: { fr: '/contact', en: '/en/contact' },
  mentionsLegales: { fr: '/mentions-legales', en: '/en/legal-notice' },
  confidentialite: { fr: '/confidentialite', en: '/en/privacy' },
  /* Legacy path from an earlier structure, still linked to from outside. */
  souverainete: { fr: '/souverainete', en: '/en/sovereignty' },
} as const satisfies Record<string, Record<Locale, string>>

export type PageId = keyof typeof PAGES

/**
 * Pages whose copy lives under `pages` in the catalogues. The home page
 * takes its metadata from the catalogue root, and the entries in REDIRECTS
 * render nothing at all, so neither belongs here.
 */
export const CATALOGUE_PAGES = [
  'conseil',
  'audit',
  'methode',
  'convictions',
  'contact',
  'mentionsLegales',
  'confidentialite',
] as const satisfies readonly PageId[]

export type CataloguePageId = (typeof CATALOGUE_PAGES)[number]

export function isCataloguePage(id: PageId): id is CataloguePageId {
  return (CATALOGUE_PAGES as readonly PageId[]).includes(id)
}

/** Paths kept alive only to forward somewhere else. */
export const REDIRECTS = {
  souverainete: { to: 'convictions', anchor: 'independence' },
} as const satisfies Partial<Record<PageId, { to: PageId; anchor?: string }>>

export function redirectTargetOf(id: PageId): { to: PageId; anchor?: string } | null {
  return id in REDIRECTS ? REDIRECTS[id as keyof typeof REDIRECTS] : null
}

/**
 * Fragment targets. These are technical identifiers rather than copy, so
 * they stay identical across locales and a shared component can hardcode
 * the one it owns.
 */
export const ANCHORS = {
  top: 'top',
  services: 'services',
  consulting: 'consulting',
  audit: 'audit',
  commitments: 'commitments',
  projects: 'projects',
  approach: 'approach',
  contact: 'contact',
  independence: 'independence',
} as const

export function path(id: PageId, locale: Locale): string {
  return PAGES[id][locale]
}

/** `/#projects` in French, `/en#projects` in English. */
export function anchorPath(id: PageId, locale: Locale, anchor: string): string {
  return `${path(id, locale)}#${anchor}`
}

/** Trailing slashes are not part of the identity of a path. */
function normalise(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

/**
 * The last segment of a public path, which is what the `[slug]` route
 * matches. The home page has no slug of its own.
 */
export function slugOf(id: PageId, locale: Locale): string | null {
  if (id === 'home') return null
  const segments = PAGES[id][locale].split('/').filter(Boolean)
  return segments[segments.length - 1] ?? null
}

export function pageIdBySlug(locale: Locale, slug: string): PageId | null {
  for (const id of Object.keys(PAGES) as PageId[]) {
    if (slugOf(id, locale) === slug) return id
  }
  return null
}

/** Every `[locale]/[slug]` pair the site prerenders. */
export function allSlugParams(): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) =>
    (Object.keys(PAGES) as PageId[]).flatMap((id) => {
      const slug = slugOf(id, locale)
      return slug ? [{ locale, slug }] : []
    }),
  )
}

export function pageIdOf(pathname: string): PageId | null {
  const target = normalise(pathname)
  for (const [id, paths] of Object.entries(PAGES) as [PageId, Record<Locale, string>][]) {
    if (locales.some((locale) => paths[locale] === target)) return id
  }
  return null
}

/**
 * The same page in another language. Returns `null` for paths we do not
 * know — the middleware and the switcher both prefer doing nothing over
 * dumping the visitor on the home page.
 */
export function alternatePath(pathname: string, target: Locale): string | null {
  const id = pageIdOf(pathname)
  return id ? PAGES[id][target] : null
}

/** hreflang map for a page, with x-default pointing at the root locale. */
export function alternateLanguages(id: PageId): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, PAGES[id][locale]])),
    'x-default': PAGES[id][rootLocale],
  }
}
