import { RootShell } from '@/components/root-shell'
import { isLocale, locales, rootLocale } from '@/lib/i18n'
import { rootMetadata, rootViewport } from '@/lib/metadata'

/**
 * The only root layout. `[locale]` is a real segment internally, but the
 * middleware serves the root locale unprefixed, so French visitors never
 * see `/fr` in the address bar.
 */
export const metadata = rootMetadata
export const viewport = rootViewport

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  /* The pages below 404 on an unknown locale. The layout only has to pick a
     language for the chrome around that message, so it falls back rather
     than throwing: a not-found boundary renders inside this layout, and a
     layout that threw could not host it. */
  const { locale } = await params
  const active = isLocale(locale) ? locale : rootLocale

  return <RootShell locale={active}>{children}</RootShell>
}
