import { serializeGraph, type JsonLdNode } from '@/lib/schema'

/**
 * A schema.org graph, as a script tag.
 *
 * `dangerouslySetInnerHTML` is how JSON-LD has to be written: React escapes
 * the text content of a child, which would leave `&quot;` in place of every
 * quote and no parser would read it. serializeGraph does the one escape
 * that actually matters here.
 */
export function JsonLd({ graph }: { graph: JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeGraph(graph) }}
    />
  )
}
