import { COMPANY } from '@/lib/company'
import { getIntlTag, getMessages, LOCALE_ENGLISH_NAMES, locales, type Locale } from '@/lib/i18n'
import { PAGES, path, type CataloguePageId } from '@/lib/routes'
import { absoluteUrl, SITE_URL } from '@/lib/site'

/**
 * schema.org JSON-LD, built from the same catalogues and route map the
 * pages render from, so the machine-readable copy of the site cannot drift
 * from the visible one.
 *
 * Nodes are addressed by `@id` and refer to each other by it. A page emits
 * two script tags — the shell's organisation and site, then its own page
 * node — and a consumer stitches them back into one graph through those
 * identifiers.
 *
 * Nothing here is invented. Every claim is either on the legal notice page
 * or in the page's own metadata; fields we cannot substantiate, such as a
 * founding date or a social profile, are left out rather than guessed at.
 */

/** A JSON-LD node. Typing schema.org properly is not worth a dependency. */
export type JsonLdNode = Record<string, unknown>

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

/** A reference to another node in the graph, resolved by identifier. */
function ref(id: string): JsonLdNode {
  return { '@id': id }
}

/**
 * Who we are: the registered entity, its address and how to reach it.
 *
 * `Organization` rather than `LocalBusiness`, which would promise opening
 * hours and a counter to walk up to. There is neither.
 */
export function organizationSchema(locale: Locale): JsonLdNode {
  const t = getMessages(locale)

  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: COMPANY.tradingName,
    legalName: COMPANY.legalName,
    description: t.metadata.description,
    url: SITE_URL,
    email: COMPANY.email,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/apple-icon.png'),
      width: 180,
      height: 180,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.city,
      addressCountry: COMPANY.address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: COMPANY.email,
      url: absoluteUrl(path('contact', locale)),
      areaServed: ['FR', 'EU'],
      availableLanguage: locales.map((code) => ({
        '@type': 'Language',
        name: LOCALE_ENGLISH_NAMES[code],
        alternateName: getIntlTag(code),
      })),
    },
    founder: {
      '@type': 'Person',
      name: COMPANY.founder,
    },
    /* The registration numbers, which are what makes the entity checkable
       against the French business register. */
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: COMPANY.siren },
      { '@type': 'PropertyValue', propertyID: 'SIRET', value: COMPANY.siret },
      { '@type': 'PropertyValue', propertyID: 'APE', value: COMPANY.apeCode },
    ],
    knowsLanguage: locales.map(getIntlTag),
  }
}

/** The site itself, in the language being served. */
export function websiteSchema(locale: Locale): JsonLdNode {
  const t = getMessages(locale)

  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: COMPANY.tradingName,
    description: t.metadata.description,
    url: absoluteUrl(PAGES.home[locale]),
    inLanguage: getIntlTag(locale),
    publisher: ref(ORGANIZATION_ID),
  }
}

/** Everything the shell emits, on every page. */
export function siteGraph(locale: Locale): JsonLdNode[] {
  return [organizationSchema(locale), websiteSchema(locale)]
}

/** The home page, whose title and description sit at the catalogue root. */
export function homePageSchema(locale: Locale): JsonLdNode {
  const t = getMessages(locale)
  const url = absoluteUrl(PAGES.home[locale])

  return {
    '@type': 'WebPage',
    '@id': url,
    url,
    name: t.metadata.title,
    description: t.metadata.description,
    inLanguage: getIntlTag(locale),
    isPartOf: ref(WEBSITE_ID),
    about: ref(ORGANIZATION_ID),
  }
}

/**
 * A page and the trail to it. Two levels is the whole depth of the site,
 * so the trail is always home then the page.
 */
export function pageGraph(id: CataloguePageId, locale: Locale): JsonLdNode[] {
  const t = getMessages(locale)
  const page = t.pages[id]
  const url = absoluteUrl(PAGES[id][locale])
  const breadcrumbId = `${url}#breadcrumb`

  return [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      inLanguage: getIntlTag(locale),
      isPartOf: ref(WEBSITE_ID),
      about: ref(ORGANIZATION_ID),
      breadcrumb: ref(breadcrumbId),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t.brand.name,
          item: absoluteUrl(PAGES.home[locale]),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.metaTitle,
          item: url,
        },
      ],
    },
  ]
}

/**
 * The graph as it goes into a script tag.
 *
 * `<` is escaped because the JSON lands inside an HTML element: a `</script`
 * anywhere in the copy would otherwise close the tag early and spill the
 * rest of the graph into the page as markup.
 */
export function serializeGraph(graph: JsonLdNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  )
}
