import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleList } from '@/components/article-list'
import { ContactCta } from '@/components/contact-cta'
import { JsonLd } from '@/components/json-ld'
import { PageHeader } from '@/components/page-header'
import { articleLocales, articlesFor } from '@/content/articles'
import { getMessages, isLocale } from '@/lib/i18n'
import { articlesIndexMetadata } from '@/lib/metadata'
import { articlesIndexGraph } from '@/lib/schema'

/**
 * The article index. Only the locales with something to read get one, so
 * `/en/articles` stays a 404 until the first English article exists —
 * announcing an empty section would be worse than announcing nothing.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return articleLocales().map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/articles'>): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? articlesIndexMetadata(locale) : {}
}

export default async function ArticlesPage({ params }: PageProps<'/[locale]/articles'>) {
  const { locale } = await params
  if (!isLocale(locale) || articlesFor(locale).length === 0) notFound()

  const t = getMessages(locale).articles

  return (
    <>
      <JsonLd graph={articlesIndexGraph(locale)} />
      <PageHeader title={t.title} intro={t.intro} />
      <ArticleList locale={locale} />
      <ContactCta locale={locale} />
    </>
  )
}
