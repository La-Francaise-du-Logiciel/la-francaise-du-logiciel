'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Wordmark } from '@/components/logo'
import { getMessages, publicPath, type Locale } from '@/lib/i18n'
import { path } from '@/lib/routes'
import { cn } from '@/lib/utils'

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getMessages(locale)
  const pathname = publicPath(usePathname())
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href={path('home', locale)} className="shrink-0" aria-label={t.brand.homeLabel}>
          <Wordmark locale={locale} />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label={t.nav.primaryLabel}>
          {t.nav.items.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'underline-slide text-base transition-colors duration-300 ease-out hover:text-foreground',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={path('contact', locale)}
            className="arrow-hover inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-base font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            {t.nav.cta}
            <HoverArrow />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8" aria-label={t.nav.mobileLabel}>
            {t.nav.items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-lg text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={path('contact', locale)}
              onClick={() => setOpen(false)}
              className="arrow-hover mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-base font-medium text-background"
            >
              {t.nav.cta}
              <HoverArrow />
            </Link>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm text-muted-foreground">{t.nav.language.label}</span>
              <LanguageSwitcher locale={locale} variant="full" onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
