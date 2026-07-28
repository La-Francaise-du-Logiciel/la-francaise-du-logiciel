import { fr } from '@/messages/fr'

export const locales = ['fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

/**
 * Locale tags for Intl formatting, kept separate from our locale keys so
 * a key like 'en' can map to 'en-GB' without renaming anything.
 */
const INTL_TAGS: Record<Locale, string> = {
  fr: 'fr-FR',
}

const CATALOGUES = { fr } satisfies Record<Locale, unknown>

/** Shape every catalogue must satisfy; new locales are typed against it. */
export type Messages = typeof fr

/**
 * The active catalogue. The site is single-locale today, so this takes
 * the default; add locale routing (or a cookie/header lookup) here and
 * every component picks it up without further changes.
 */
export function getMessages(locale: Locale = defaultLocale): Messages {
  return CATALOGUES[locale]
}

export function getIntlTag(locale: Locale = defaultLocale): string {
  return INTL_TAGS[locale]
}

/** Fills `{name}` placeholders, e.g. the footer's copyright year. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  )
}
