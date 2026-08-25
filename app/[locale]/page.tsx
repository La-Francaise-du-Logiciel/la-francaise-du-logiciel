import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { HomeView } from '@/components/views/home-view'
import { isLocale, locales } from '@/lib/i18n'
import { homeMetadata } from '@/lib/metadata'
import { homePageSchema } from '@/lib/schema'

/* Only the known locales exist; anything else 404s at the routing layer. */
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? homeMetadata(locale) : {}
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <JsonLd graph={[homePageSchema(locale)]} />
      <HomeView locale={locale} />
    </>
  )
}
