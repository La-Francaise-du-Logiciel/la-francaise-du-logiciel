import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Geometric monogram for La Française du Logiciel.
 * Two stacked bars, blue over red, evoke both the tricolore and the
 * company's two axes: conseil (build) and souveraineté (foundation).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('h-8 w-8', className)}
      role="img"
      aria-label={getMessages().brand.name}
    >
      <rect x="2" y="2" width="28" height="28" rx="5" className="fill-none stroke-border" strokeWidth="1.5" />
      <rect x="8" y="9" width="16" height="4" rx="1" className="fill-[var(--blue)]" />
      <rect x="8" y="15" width="10" height="4" rx="1" className="fill-foreground/80" />
      <rect x="8" y="21" width="16" height="4" rx="1" className="fill-[var(--red)]" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  const { wordmark } = getMessages().brand
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[17px] tracking-tight text-foreground">{wordmark.top}</span>
        <span className="text-[10px] leading-none text-muted-foreground">
          {wordmark.bottom}
        </span>
      </span>
    </span>
  )
}
