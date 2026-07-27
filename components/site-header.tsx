'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { Wordmark } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Conseil', href: '#conseil' },
  { label: 'Souveraineté', href: '#souverainete' },
  { label: 'Notre approche', href: '#approche' },
  { label: 'Manifeste', href: '#manifeste' },
]

export function SiteHeader() {
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
        <a href="#top" className="shrink-0" aria-label="Accueil, La Française du Logiciel">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="underline-slide text-sm text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-[2px]" aria-hidden="true">
              <span className="inline-block h-2.5 w-[3px] rounded-[1px] bg-[var(--blue)]" />
              <span className="inline-block h-2.5 w-[3px] rounded-[1px] bg-foreground/80" />
              <span className="inline-block h-2.5 w-[3px] rounded-[1px] bg-[var(--red)]" />
            </span>
            FR
          </span>
          <a
            href="#contact"
            className="arrow-hover inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            Nous parler
            <HoverArrow />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8" aria-label="Navigation mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
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
              Nous parler
              <HoverArrow />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
