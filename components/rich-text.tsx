import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * The inline subset article prose may carry: `[label](href)` links and
 * `**bold**`. The strings are already valid markdown, so the markdown
 * rendering passes them through verbatim; this component is the HTML side
 * of the same convention. Anything else in the string stays literal.
 */
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

const LINK_CLASS =
  'text-foreground underline decoration-border underline-offset-4 transition-colors duration-300 ease-out hover:decoration-foreground'

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(INLINE)) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    const [whole, label, href, bold] = match

    if (bold !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-medium text-foreground">
          {bold}
        </strong>,
      )
    } else if (label !== undefined && href !== undefined) {
      nodes.push(
        href.startsWith('/') ? (
          <Link key={match.index} href={href} className={LINK_CLASS}>
            {label}
          </Link>
        ) : (
          <a key={match.index} href={href} className={LINK_CLASS}>
            {label}
          </a>
        ),
      )
    }
    cursor = match.index + whole.length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return <>{nodes}</>
}
