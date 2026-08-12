/**
 * Locale primitives, kept free of any catalogue import so the route map and
 * the middleware can use them without pulling the message files into the
 * edge bundle.
 */

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

/**
 * The locale served without a URL prefix. French pages keep the paths they
 * were indexed under (`/conseil`), English pages live under `/en`.
 */
export const rootLocale: Locale = 'fr'

/**
 * Where language negotiation lands when the visitor asks for something we
 * do not speak. A German browser gets English, not French.
 */
export const fallbackLocale: Locale = 'en'

/** Remembers a switch made from the navbar, so the choice survives a visit. */
export const LOCALE_COOKIE = 'locale'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/**
 * Locale tags for Intl formatting, kept separate from our locale keys so
 * a key like 'en' can map to 'en-GB' without renaming anything.
 */
const INTL_TAGS: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
}

/** What the language switcher shows for each locale. */
export const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  fr: { short: 'FR', full: 'Français' },
  en: { short: 'EN', full: 'English' },
}

export function getIntlTag(locale: Locale): string {
  return INTL_TAGS[locale]
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** The locale a pathname is written in, inferred from its prefix. */
export function localeOf(pathname: string): Locale {
  const segment = pathname.split('/')[1] ?? ''
  return isLocale(segment) && segment !== rootLocale ? segment : rootLocale
}

/**
 * The address the visitor sees, given a pathname that may still carry the
 * internal `/fr` prefix the proxy's rewrite adds.
 *
 * Server rendering sees the rewritten path while the browser shows the
 * unprefixed one, so anything comparing or transforming the current path
 * has to normalise it first or the two disagree.
 */
export function publicPath(pathname: string): string {
  const prefix = `/${rootLocale}`
  if (pathname === prefix) return '/'
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  return pathname
}

/**
 * Picks a locale from an `Accept-Language` header, honouring q-values.
 *
 * Returns `null` when the header is absent, which is how we tell a real
 * browser from a crawler or a bare `curl`: with no signal we leave the
 * visitor on the URL they asked for rather than guessing, so the canonical
 * French pages stay crawlable.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale | null {
  if (!acceptLanguage) return null

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const quality = params.find((p) => p.trim().startsWith('q='))
      const q = quality ? Number.parseFloat(quality.split('=')[1]) : 1
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    if (tag === '*') return fallbackLocale
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }

  /* The header was sent but names only languages we do not have. */
  return ranked.length > 0 ? fallbackLocale : null
}
