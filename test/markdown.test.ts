import { describe, expect, it } from 'vitest'
import { prefersMarkdown } from '@/lib/accept'
import { getMessages, locales } from '@/lib/i18n'
import { documentFor, notFoundDocument, renderDocument } from '@/lib/markdown'
import { CATALOGUE_PAGES, PAGES, PUBLIC_PAGES } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

const BROWSER = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8'

describe('prefersMarkdown', () => {
  it('says yes when markdown is asked for by name', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/html;q=0.5')).toBe(true)
  })

  it('says no to a browser, whose wildcard would otherwise cover markdown', () => {
    expect(prefersMarkdown(BROWSER)).toBe(false)
  })

  it('says no to a bare wildcard, which means no preference at all', () => {
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown('text/*')).toBe(false)
  })

  it('gives a tie to HTML, since that is what the site is', () => {
    expect(prefersMarkdown('text/markdown;q=0.9, text/html;q=0.9')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=1.0, text/html')).toBe(false)
  })

  it('ignores a header it cannot read, rather than guessing', () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
  })
})

describe('every public page has a document', () => {
  const pages = PUBLIC_PAGES.flatMap((id) => locales.map((locale) => ({ id, locale })))

  it.each(pages)('builds $id in $locale', ({ id, locale }) => {
    const document = documentFor(id, locale)

    expect(document.title.length).toBeGreaterThan(0)
    expect(document.description.length).toBeGreaterThan(0)
    expect(document.path).toBe(PAGES[id][locale])
    expect(document.locale).toBe(locale)
    expect(document.sections?.length).toBeGreaterThan(0)
  })

  /* Every catalogue page but contact, whose header comes from elsewhere. */
  const titled = CATALOGUE_PAGES.filter((id) => id !== 'contact').flatMap((id) =>
    locales.map((locale) => ({ id, locale })),
  )

  it.each(titled)('takes the title of $id in $locale from the catalogue', ({ id, locale }) => {
    const page = getMessages(locale).pages[id]
    const document = documentFor(id, locale)

    expect(document.title).toBe(page.title)
    expect(document.description).toBe(page.metaDescription)
  })

  /* ContactView takes its header from the catalogue root, not from the
     page's own entry, and the document has to agree with it. */
  it.each(locales)('takes the contact header from the catalogue root in %s', (locale) => {
    const t = getMessages(locale)
    expect(documentFor('contact', locale).title).toBe(t.contact.title)
  })
})

describe('the rendered markdown', () => {
  const rendered = (id: (typeof PUBLIC_PAGES)[number], locale: (typeof locales)[number]) => {
    const document = documentFor(id, locale)
    return renderDocument(document, absoluteUrl(document.path))
  }

  it('opens with front matter naming the page', () => {
    const body = rendered('audit', 'fr')
    const [, frontMatter] = body.split('---\n')

    expect(body.startsWith('---\n')).toBe(true)
    expect(frontMatter).toContain(`url: "${absoluteUrl('/audit')}"`)
    expect(frontMatter).toContain('language: "fr-FR"')
  })

  it('has exactly one h1, and it is the title', () => {
    const body = rendered('conseil', 'fr')
    const h1 = body.split('\n').filter((line) => line.startsWith('# '))

    expect(h1).toHaveLength(1)
    expect(h1[0]).toBe(`# ${documentFor('conseil', 'fr').title}`)
  })

  it('never skips a heading level', () => {
    for (const id of PUBLIC_PAGES) {
      for (const locale of locales) {
        const levels = rendered(id, locale)
          .split('\n')
          .flatMap((line) => {
            const match = /^(#{1,6}) /.exec(line)
            return match ? [match[1].length] : []
          })

        levels.forEach((level, i) => {
          if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1)
        })
      }
    }
  })

  it('carries the page copy, not a summary of it', () => {
    const t = getMessages('fr').pages.audit
    const body = rendered('audit', 'fr')

    expect(body).toContain(t.perimeter.paragraphs[0])
    expect(body).toContain(t.scope.items[0].title)
    expect(body).toContain(t.scope.items[0].desc)
  })

  it('links out absolutely, since a document is read away from the site', () => {
    for (const link of documentFor('audit', 'en').links ?? []) {
      expect(link.href.startsWith('https://')).toBe(true)
    }
  })

  it('runs the quote back into a sentence rather than keeping display lines', () => {
    const body = rendered('convictions', 'fr')
    const quote = getMessages('fr').manifesto.quote.map((line) => line.text).join(' ')

    expect(body).toContain(`> ${quote}`)
  })
})

describe('the markdown 404', () => {
  it.each(locales)('lists every page in %s', (locale) => {
    const body = renderDocument(notFoundDocument(locale), absoluteUrl('/'))

    for (const id of PUBLIC_PAGES) {
      expect(body).toContain(absoluteUrl(PAGES[id][locale]))
    }
    expect(body).toContain(absoluteUrl('/llms.txt'))
    expect(body).toContain(absoluteUrl('/sitemap.xml'))
  })
})
