'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { Wordmark } from '@/components/logo'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const t = getMessages()
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="shrink-0" aria-label={t.brand.homeLabel}>
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t.nav.primaryLabel}>
          {t.nav.items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="underline-slide text-sm text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="arrow-hover inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            {t.nav.cta}
            <HoverArrow />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8" aria-label={t.nav.mobileLabel}>
            {t.nav.items.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base text-foreground last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="arrow-hover mt-4 inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background"
            >
              {t.nav.cta}
              <HoverArrow />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
