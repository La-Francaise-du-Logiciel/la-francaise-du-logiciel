import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { VIEWS } from '@/components/views'
import { isLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'
import { pageGraph } from '@/lib/schema'
import {
  allSlugParams,
  isCataloguePage,
  pageIdBySlug,
  path,
  redirectTargetOf,
} from '@/lib/routes'

/**
 * Every page other than the home page, in every language. The slug is
 * translated per locale, so it is resolved back to a page id through the
 * route map rather than through the folder name.
 */
/* Only the pages in the route map exist. An unknown slug matches no route
   at all, which is what hands it to app/global-not-found: a `notFound()`
   thrown from inside this segment would look for a boundary that a root
   layout under `[locale]` cannot host. */
export const dynamicParams = false

export function generateStaticParams() {
  return allSlugParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const id = pageIdBySlug(locale, slug)
  /* Redirect stubs never reach the renderer, so they get no metadata. */
  return id && isCataloguePage(id) ? pageMetadata(id, locale) : {}
}

export default async function Page({ params }: PageProps<'/[locale]/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const id = pageIdBySlug(locale, slug)
  if (!id) notFound()

  const redirect = redirectTargetOf(id)
  if (redirect) {
    const target = path(redirect.to, locale)
    permanentRedirect(redirect.anchor ? `${target}#${redirect.anchor}` : target)
  }

  if (!isCataloguePage(id)) notFound()

  const View = VIEWS[id]
  return (
    <>
      <JsonLd graph={pageGraph(id, locale)} />
      <View locale={locale} />
    </>
  )
}
