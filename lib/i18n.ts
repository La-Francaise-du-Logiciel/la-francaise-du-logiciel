import { en } from '@/messages/en'
import { fr } from '@/messages/fr'
import type { Locale } from '@/lib/locale'

export {
  fallbackLocale,
  getIntlTag,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_HEADER,
  LOCALE_ENGLISH_NAMES,
  LOCALE_LABELS,
  locales,
  localeOf,
  negotiateLocale,
  publicPath,
  rootLocale,
} from '@/lib/locale'
export type { Locale } from '@/lib/locale'

/**
 * Widens the literal types the catalogues pick up from `as const`, so a
 * translation is checked on shape rather than on the exact French wording.
 * Arrays stay arrays; only the leaves lose their literal type.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> }

/** Shape every catalogue must satisfy; new locales are typed against it. */
export type Messages = Widen<typeof fr>

/* Annotating the record is what type-checks each translation against the
   French catalogue: a missing or misspelled key fails the build here. */
const CATALOGUES: Record<Locale, Messages> = { fr, en }

/**
 * The catalogue for a locale. The locale is always explicit: pages read it
 * from their route group and pass it down, so no component can silently
 * render the wrong language.
 */
export function getMessages(locale: Locale): Messages {
  return CATALOGUES[locale]
}

/** Fills `{name}` placeholders, e.g. the footer's copyright year. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  )
}
