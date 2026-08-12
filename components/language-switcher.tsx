'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  format,
  getMessages,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_LABELS,
  locales,
  publicPath,
  type Locale,
} from '@/lib/i18n'
import { alternatePath, path } from '@/lib/routes'
import { cn } from '@/lib/utils'

/**
 * Records a language the visitor picked themselves. This is the only cookie
 * the site sets, it is never written automatically, and the middleware reads
 * it so a choice survives the next visit to an unprefixed French URL.
 */
function remember(locale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`
}

interface LanguageSwitcherProps {
  locale: Locale
  /** `full` spells the languages out, for the roomier mobile menu. */
  variant?: 'compact' | 'full'
  onNavigate?: () => void
  className?: string
}

export function LanguageSwitcher({
  locale,
  variant = 'compact',
  onNavigate,
  className,
}: LanguageSwitcherProps) {
  const pathname = publicPath(usePathname())
  const t = getMessages(locale).nav.language

  return (
    <div
      role="group"
      aria-label={t.label}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md border border-border p-0.5',
        className,
      )}
    >
      {locales.map((target) => {
        const active = target === locale
        /* Stay on the same page in the other language; fall back to its home
           page for any route the map does not know. */
        const href = active ? pathname : (alternatePath(pathname, target) ?? path('home', target))

        /* Swaps the content in place rather than reloading the document.
           This is only safe because proxy.ts leaves prefetches unnegotiated:
           otherwise the router would cache a redirect back to the current
           language and the switch would do nothing. */
        return (
          <Link
            key={target}
            href={href}
            hrefLang={target}
            lang={target}
            aria-current={active ? 'true' : undefined}
            aria-label={format(t.switchTo, { language: LOCALE_LABELS[target].full })}
            onClick={() => {
              remember(target)
              onNavigate?.()
            }}
            className={cn(
              'rounded-[5px] transition-colors duration-300 ease-out',
              variant === 'compact' ? 'px-2 py-1 text-xs font-medium' : 'px-3 py-1.5 text-sm',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {variant === 'compact' ? LOCALE_LABELS[target].short : LOCALE_LABELS[target].full}
          </Link>
        )
      })}
    </div>
  )
}
