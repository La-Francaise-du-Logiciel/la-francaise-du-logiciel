import { describe, expect, it } from 'vitest'
import { GET as feedRoute } from '@/app/feed.xml/route'
import sitemap from '@/app/sitemap'
import { ARTICLES, articleLocales, articlesFor } from '@/content/articles'
import { articlePath, articlesIndexPath, authorOf, lastModifiedOf } from '@/lib/articles'
import { COMPANY } from '@/lib/company'
import { rootLocale } from '@/lib/i18n'
import { articleDocument, articlesIndexDocument, renderDocument } from '@/lib/markdown'
import { absoluteUrl } from '@/lib/site'

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/

describe('the article registry', () => {
  it('has something to publish', () => {
    expect(ARTICLES.length).toBeGreaterThan(0)
  })

  it.each(ARTICLES)('describes $slug completely', (article) => {
    expect(article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    expect(article.title.length).toBeGreaterThan(0)
    /* The description triples as meta description, index summary and feed
       summary, so it has to be a real sentence and fit a search snippet. */
    expect(article.description.length).toBeGreaterThanOrEqual(50)
    expect(article.description.length).toBeLessThanOrEqual(180)
    expect(article.published).toMatch(ISO_DAY)
    if (article.updated) {
      expect(article.updated).toMatch(ISO_DAY)
      expect(article.updated >= article.published).toBe(true)
    }
    expect(article.sections.length).toBeGreaterThan(0)
  })

  it('keeps slugs unique within a locale', () => {
    for (const locale of articleLocales()) {
      const slugs = articlesFor(locale).map((article) => article.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    }
  })

  it('lists newest first', () => {
    const dates = ARTICLES.map((article) => article.published)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('signs with the founder unless the article says otherwise', () => {
    for (const article of ARTICLES) {
      expect(authorOf(article)).toBe(article.author ?? COMPANY.founder)
    }
  })
})

describe('the article markdown', () => {
  const rendered = (document: ReturnType<typeof articleDocument>) =>
    renderDocument(document, absoluteUrl(document.path))

  it.each(ARTICLES)('dates $slug in the front matter', (article) => {
    const body = rendered(articleDocument(article))
    expect(body).toContain(`date: "${article.published}"`)
    expect(body.split('\n')[1]).toBe(`title: "${article.title.replace(/"/g, '\\"')}"`)
  })

  it.each(ARTICLES)('never skips a heading level in $slug', (article) => {
    const levels = rendered(articleDocument(article))
      .split('\n')
      .flatMap((line) => {
        const match = /^(#{1,6}) /.exec(line)
        return match ? [match[1].length] : []
      })

    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1)
    })
  })

  it('lists every article of the locale on the index document', () => {
    for (const locale of articleLocales()) {
      const body = rendered(articlesIndexDocument(locale))
      for (const article of articlesFor(locale)) {
        expect(body).toContain(absoluteUrl(articlePath(article)))
      }
    }
  })
})

describe('the feed', () => {
  it('carries every article of the root locale', async () => {
    const xml = await feedRoute().text()

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml.match(/<item>/g)).toHaveLength(articlesFor(rootLocale).length)
    for (const article of articlesFor(rootLocale)) {
      expect(xml).toContain(`<link>${absoluteUrl(articlePath(article))}</link>`)
    }
    /* Raw & or < in a title would corrupt the XML silently. */
    expect(xml).not.toMatch(/&(?!amp;|lt;|gt;)/)
  })
})

describe('the sitemap', () => {
  const entries = sitemap()

  it('lists every article under its own date, not the build date', () => {
    for (const article of ARTICLES) {
      const entry = entries.find((candidate) => candidate.url === absoluteUrl(articlePath(article)))
      expect(entry).toBeDefined()
      expect(entry?.lastModified).toEqual(new Date(`${lastModifiedOf(article)}T00:00:00Z`))
    }
  })

  it('lists an index for every locale with articles', () => {
    for (const locale of articleLocales()) {
      const url = absoluteUrl(articlesIndexPath(locale))
      expect(entries.some((candidate) => candidate.url === url)).toBe(true)
    }
  })
})
