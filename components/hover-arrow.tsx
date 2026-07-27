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
