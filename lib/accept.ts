/**
 * Content negotiation on the `Accept` header, kept beside lib/locale so the
 * proxy can use it without pulling anything heavier into the edge bundle.
 */

/** One media range from an Accept header, with its quality. */
type Range = { type: string; q: number }

function parseAccept(header: string): Range[] {
  return header
    .split(',')
    .map((part) => {
      const [type, ...params] = part.trim().split(';')
      const quality = params.find((p) => p.trim().startsWith('q='))
      const q = quality ? Number.parseFloat(quality.split('=')[1]) : 1
      return { type: type.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter((range) => range.type && range.q > 0)
}

/** The best quality the header gives a media type, counting wildcards. */
function qualityOf(ranges: Range[], type: string): number {
  const [group] = type.split('/')
  const candidates = [type, `${group}/*`, '*/*']
  return Math.max(0, ...ranges.filter((r) => candidates.includes(r.type)).map((r) => r.q))
}

/**
 * Whether the client would rather have markdown than HTML.
 *
 * A browser sends `text/html,...,*\/*;q=0.8`, which gives markdown 0.8
 * through the wildcard and HTML 1, so it keeps getting HTML. An agent
 * asking for `text/markdown` names it explicitly and wins. A tie goes to
 * HTML, since that is what the site is.
 *
 * The wildcard alone is never enough: `curl` sends `*\/*` and means "I do
 * not mind", not "please give me markdown".
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false

  const ranges = parseAccept(accept)
  const markdown = ranges.find((range) => range.type === 'text/markdown')
  if (!markdown) return false

  return markdown.q > qualityOf(ranges, 'text/html')
}
