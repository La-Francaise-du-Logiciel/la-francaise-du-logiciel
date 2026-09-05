import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleBody, ArticleHeader } from '@/components/article'
import { ContactCta } from '@/components/contact-cta'
import { ArrowLink } from '@/components/hover-arrow'
import { JsonLd } from '@/components/json-ld'
import { ARTICLES, articleBySlug } from '@/content/articles'
import { articlesIndexPath } from '@/lib/articles'
import { getMessages, isLocale } from '@/lib/i18n'
import { articleMetadata } from '@/lib/metadata'
import { articleGraph } from '@/lib/schema'

/* Only the articles in the registry exist. An unknown slug matches no
   route at all, which hands it to app/global-not-found — the same
   arrangement as the catalogue pages one segment up. */
export const dynamicParams = false

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ locale: article.locale, slug: article.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/articles/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const article = articleBySlug(locale, slug)
  return article ? articleMetadata(article) : {}
}

export default async function ArticlePage({ params }: PageProps<'/[locale]/articles/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const article = articleBySlug(locale, slug)
  if (!article) notFound()

  const t = getMessages(locale).articles

  return (
    <>
      <JsonLd graph={articleGraph(article)} />
      <article>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
      </article>
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <ArrowLink href={articlesIndexPath(locale)}>{t.all}</ArrowLink>
      </div>
      <ContactCta locale={locale} />
    </>
  )
}
