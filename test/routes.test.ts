import { describe, expect, it } from 'vitest'
import { locales } from '@/lib/locale'
import { PAGES, PUBLIC_PAGES, REDIRECTS, publicPaths } from '@/lib/routes'
import { absoluteUrl, SITE_URL } from '@/lib/site'

describe('publicPaths', () => {
  const paths = publicPaths()

  it('covers every public page in every locale', () => {
    expect(paths).toHaveLength(PUBLIC_PAGES.length * locales.length)
  })

  it('leaves out the redirect stubs', () => {
    const ids = new Set(paths.map((entry) => entry.id))
    for (const stub of Object.keys(REDIRECTS)) {
      expect(ids.has(stub as never)).toBe(false)
    }
  })

  it('leads with the home page', () => {
    expect(paths[0]?.id).toBe('home')
  })

  it('resolves each entry to the path the route map holds', () => {
    for (const { id, locale, path } of paths) {
      expect(path).toBe(PAGES[id][locale])
    }
  })

  it('produces a unique URL per entry', () => {
    const urls = paths.map((entry) => absoluteUrl(entry.path))
    expect(new Set(urls).size).toBe(urls.length)
  })
})

describe('absoluteUrl', () => {
  it('does not leave a trailing slash on the home page', () => {
    expect(absoluteUrl('/')).toBe(SITE_URL)
  })

  it('joins a path to the canonical host', () => {
    expect(absoluteUrl('/audit')).toBe(`${SITE_URL}/audit`)
  })
})
