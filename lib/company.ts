/**
 * The registered facts about the business, as filed.
 *
 * These are legal identifiers rather than copy: the SIREN is the same
 * number in every language, and the registered office is the same street.
 * Both message catalogues render them in the legal notice and lib/schema
 * publishes them as JSON-LD, so they live here once instead of being
 * retyped in three places where they could drift apart.
 *
 * Anything a translator would touch stays in messages/ — the labels beside
 * these values, and the wording that surrounds the APE code.
 */
export const COMPANY = {
  /** The entity that signs: a sole trader, so a person. */
  legalName: 'Vincent Wendling',
  /** What the business is called everywhere else. */
  tradingName: 'La Française du Logiciel',
  /** Named on every filing, and the director of publication. */
  founder: 'Vincent Wendling',

  siren: '942 561 762',
  siret: '942 561 762 00017',
  /** Édition de logiciels applicatifs. The wording is translated; the code is not. */
  apeCode: '58.29C',

  email: 'contact@francaisedulogiciel.fr',

  address: {
    street: '6 rue des Frères Eberts',
    postalCode: '67100',
    city: 'Strasbourg',
    country: 'France',
    /** ISO 3166-1 alpha-2, which is what schema.org's addressCountry wants. */
    countryCode: 'FR',
    /** How the legal notice prints it, on one line. */
    oneLine: '6 rue des Frères Eberts, 67100 Strasbourg, France',
  },
} as const
