import { headers } from 'next/headers'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { RootShell } from '@/components/root-shell'
import { Section } from '@/components/section'
import { getMessages, isLocale, LOCALE_HEADER, rootLocale, type Locale } from '@/lib/i18n'
import { rootMetadata } from '@/lib/metadata'
import { CATALOGUE_PAGES, PAGES } from '@/lib/routes'

/**
 * The 404, in the language of the URL that missed.
 *
 * It renders the whole document rather than a fragment: an ordinary
 * not-found boundary would have to render inside a root layout, and this
 * site's root layout sits under `[locale]`, which Next cannot resolve for a
 * path that matched no route. So the shell is built here instead, from the
 * same component every page uses.
 *
 * The locale arrives on a request header the proxy sets, since no route
 * segment matched and there are no params to read it from.
 *
 * It lists every page rather than apologising, so a wrong guess at an
 * address is one click from the right one. An agent asking for markdown
 * gets the same list from the markdown route's own 404.
 */
export const metadata = rootMetadata

async function requestedLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER)
  return value && isLocale(value) ? value : rootLocale
}

export default async function GlobalNotFound() {
  const locale = await requestedLocale()
  const t = getMessages(locale)

  const pages = [
    { href: PAGES.home[locale], label: t.markdown.home },
    ...CATALOGUE_PAGES.map((id) => ({ href: PAGES[id][locale], label: t.pages[id].metaTitle })),
  ]

  return (
    <RootShell locale={locale}>
      <PageHeader title={t.markdown.notFoundTitle} intro={t.markdown.notFoundIntro} />
      <Section title={t.markdown.allPages}>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {pages.map((page) => (
            <li key={page.href} className="border-b border-border py-3.5">
              <Link
                href={page.href}
                className="text-sm font-medium text-foreground transition-colors duration-300 ease-out hover:text-[var(--blue)]"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </RootShell>
  )
}
