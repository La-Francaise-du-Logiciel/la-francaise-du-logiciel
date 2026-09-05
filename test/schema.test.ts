import { describe, expect, it } from 'vitest'
import { ARTICLES } from '@/content/articles'
import { authorOf, lastModifiedOf } from '@/lib/articles'
import { COMPANY } from '@/lib/company'
import { getMessages, locales } from '@/lib/i18n'
import { CATALOGUE_PAGES, PAGES } from '@/lib/routes'
import {
  articleGraph,
  articlesIndexGraph,
  organizationSchema,
  pageGraph,
  serializeGraph,
  siteGraph,
} from '@/lib/schema'
import { absoluteUrl } from '@/lib/site'

describe('the organisation node', () => {
  it.each(locales)('carries an address and a contact point in %s', (locale) => {
    const org = organizationSchema(locale) as Record<string, Record<string, unknown>>

    expect(org.address['@type']).toBe('PostalAddress')
    expect(org.address.streetAddress).toBe(COMPANY.address.street)
    expect(org.address.addressCountry).toBe('FR')

    expect(org.contactPoint['@type']).toBe('ContactPoint')
    expect(org.contactPoint.email).toBe(COMPANY.email)
    expect(org.contactPoint.contactType).toBe('sales')
  })

  it('publishes the registration numbers as filed', () => {
    const identifiers = organizationSchema('fr').identifier as { value: string }[]
    expect(identifiers.map((entry) => entry.value)).toContain(COMPANY.siren)
  })

  it('says the same thing the legal notice does', () => {
    const entries = getMessages('fr').pages.mentionsLegales.publisher.entries
    const values = entries.map((entry) => entry.value)

    expect(values).toContain(COMPANY.siren)
    expect(values).toContain(COMPANY.address.oneLine)
    expect(values).toContain(COMPANY.email)
  })
})

describe('the page graph', () => {
  const pages = CATALOGUE_PAGES.flatMap((id) => locales.map((locale) => ({ id, locale })))

  it.each(pages)('describes $id in $locale from its own catalogue entry', ({ id, locale }) => {
    const [page, breadcrumb] = pageGraph(id, locale) as Record<string, unknown>[]
    const catalogue = getMessages(locale).pages[id]
    const url = absoluteUrl(PAGES[id][locale])

    expect(page['@id']).toBe(url)
    expect(page.name).toBe(catalogue.metaTitle)
    expect(page.description).toBe(catalogue.metaDescription)

    const trail = breadcrumb.itemListElement as { position: number; item: string }[]
    expect(trail.map((step) => step.position)).toEqual([1, 2])
    expect(trail[0].item).toBe(absoluteUrl(PAGES.home[locale]))
    expect(trail[1].item).toBe(url)
  })

  const services = (['conseil', 'audit'] as const).flatMap((id) =>
    locales.map((locale) => ({ id, locale })),
  )

  it.each(services)('offers $id as a service of the organisation in $locale', ({ id, locale }) => {
    const nodes = pageGraph(id, locale) as Record<string, unknown>[]
    const service = nodes.find((node) => node['@type'] === 'Service')
    const organizationId = organizationSchema(locale)['@id']

    expect(service).toBeDefined()
    expect(service?.name).toBe(getMessages(locale).pages[id].metaTitle)
    expect(service?.provider).toEqual({ '@id': organizationId })
    expect((nodes[0].mainEntity as Record<string, unknown>)['@id']).toBe(service?.['@id'])
  })

  it.each(locales)('answers the sovereignty questions in %s', (locale) => {
    const faq = (pageGraph('souverainete', locale) as Record<string, unknown>[]).find(
      (node) => node['@type'] === 'FAQPage',
    )
    const catalogue = getMessages(locale).pages.souverainete.faq.items
    const questions = faq?.mainEntity as { name: string; acceptedAnswer: { text: string } }[]

    expect(questions.map((question) => question.name)).toEqual(catalogue.map((item) => item.title))
    expect(questions.length).toBeGreaterThanOrEqual(4)
    for (const question of questions) {
      expect(question.acceptedAnswer.text.length).toBeGreaterThan(0)
    }
  })
})

describe('the article graph', () => {
  it.each(ARTICLES)('describes $slug from the article itself', (article) => {
    const [posting, breadcrumb] = articleGraph(article) as Record<string, unknown>[]

    expect(posting['@type']).toBe('BlogPosting')
    expect(posting.headline).toBe(article.title)
    expect(posting.datePublished).toBe(article.published)
    expect(posting.dateModified).toBe(lastModifiedOf(article))
    expect((posting.author as Record<string, unknown>).name).toBe(authorOf(article))

    const trail = breadcrumb.itemListElement as { position: number }[]
    expect(trail.map((step) => step.position)).toEqual([1, 2, 3])
  })

  it('lists the locale’s articles on the index node', () => {
    const [index] = articlesIndexGraph('fr') as Record<string, unknown>[]
    const list = (index.mainEntity as { itemListElement: unknown[] }).itemListElement

    expect(index['@type']).toBe('CollectionPage')
    expect(list.length).toBeGreaterThan(0)
  })
})

describe('serializeGraph', () => {
  it('resolves every reference to a node the page actually emits', () => {
    const graph = [
      ...siteGraph('fr'),
      ...pageGraph('audit', 'fr'),
      ...ARTICLES.flatMap((article) => articleGraph(article)),
    ]
    const ids = new Set(graph.map((node) => node['@id'] as string))
    const referenced = JSON.stringify(graph).matchAll(/\{"@id":"([^"]+)"\}/g)

    for (const [, id] of referenced) {
      expect(ids).toContain(id)
    }
  })

  it('escapes the angle bracket that would close the script tag early', () => {
    const escaped = serializeGraph([{ '@type': 'WebPage', name: '</script><img>' }])

    expect(escaped).not.toContain('</script')
    expect(JSON.parse(escaped)['@graph'][0].name).toBe('</script><img>')
  })

  it('is valid JSON-LD with a context', () => {
    const parsed = JSON.parse(serializeGraph(siteGraph('en')))

    expect(parsed['@context']).toBe('https://schema.org')
    expect(parsed['@graph']).toHaveLength(2)
  })
})
