import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Line + chevron arrow. At rest only the chevron shows; when an ancestor
 * with the .arrow-hover class (or a .glow-card) is hovered, the line fades
 * in and the chevron slides right, driven by the inherited --hover variable.
 */
export function HoverArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-3 w-3 shrink-0', className)}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="harrow-line" d="M1.25 6h7.5" />
      <path className="harrow-tip" d="M4.75 2.5 8.25 6l-3.5 3.5" />
    </svg>
  )
}

/** The way through to a related page: a label that underlines on hover,
 * closed by the arrow. Spacing belongs to the caller. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/link arrow-hover inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
    >
      <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover/link:border-foreground">
        {children}
      </span>
      <HoverArrow />
    </Link>
  )
}
