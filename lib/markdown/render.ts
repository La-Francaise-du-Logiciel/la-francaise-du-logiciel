import { getIntlTag, type Locale } from '@/lib/i18n'

/**
 * A page, described in the same vocabulary the views are built from:
 * a header, then sections that hold prose, cards, definition entries or a
 * quote. lib/markdown/documents maps each page onto this shape, and this
 * file is the only thing that knows what markdown looks like.
 *
 * Sections nest, and the heading level follows the depth, so a document
 * mirrors the heading structure of the HTML rather than inventing its own.
 */

export type Block =
  | { kind: 'prose'; paragraphs: readonly string[] }
  /** CardGrid in the views, which renders each item's title as a heading. */
  | { kind: 'cards'; items: readonly { title: string; desc: string }[] }
  /** DefinitionList in the views: a label and its value. */
  | { kind: 'entries'; entries: readonly { label: string; value: string }[] }
  | { kind: 'bullets'; items: readonly string[] }
  /** The manifesto, whose lines are display breaks rather than sentences. */
  | { kind: 'quote'; lines: readonly string[] }

export type Section = {
  title?: string
  intro?: string
  blocks?: readonly Block[]
  sections?: readonly Section[]
}

export type MarkdownDocument = {
  title: string
  description: string
  /** The public path this document is the markdown form of. */
  path: string
  locale: Locale
  /** ISO dates, for the documents that live in time — the articles. */
  date?: string
  updated?: string
  intro?: string
  sections?: readonly Section[]
  /** The foot of the page: the other language, and where to go next. */
  links?: readonly { label: string; href: string }[]
  /** Heading for that list, in the document's own language. */
  linksTitle?: string
}

/** Markdown treats these as syntax at the start of a line. */
function escapeLeading(text: string): string {
  return text.replace(/^([#>\-+*]|\d+\.)/, '\\$1')
}

function heading(depth: number, text: string): string {
  /* Six is as deep as markdown goes; nothing here nests that far, but
     clamping beats emitting a run of hashes that renders as text. */
  return `${'#'.repeat(Math.min(depth, 6))} ${text}`
}

function renderBlock(block: Block, depth: number): string[] {
  switch (block.kind) {
    case 'prose':
      return block.paragraphs.map(escapeLeading)
    case 'cards':
      return block.items.flatMap((item) => [heading(depth, item.title), escapeLeading(item.desc)])
    case 'entries':
      return [block.entries.map((entry) => `- **${entry.label}**: ${entry.value}`).join('\n')]
    case 'bullets':
      return [block.items.map((item) => `- ${item}`).join('\n')]
    case 'quote':
      /* The catalogue breaks the quote into the lines the page sets it on.
         Those are typography, not sentences, so they run back together. */
      return [`> ${block.lines.join(' ')}`]
  }
}

function renderSection(section: Section, depth: number): string[] {
  return [
    ...(section.title ? [heading(depth, section.title)] : []),
    ...(section.intro ? [escapeLeading(section.intro)] : []),
    ...(section.blocks ?? []).flatMap((block) => renderBlock(block, depth + 1)),
    ...(section.sections ?? []).flatMap((child) => renderSection(child, depth + 1)),
  ]
}

/**
 * YAML front matter, so a client can read the identity of the page without
 * parsing the prose. Values are double-quoted because titles carry colons
 * and apostrophes.
 */
function frontMatter(document: MarkdownDocument, url: string): string {
  const quote = (value: string) => `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

  return [
    '---',
    `title: ${quote(document.title)}`,
    `description: ${quote(document.description)}`,
    `url: ${quote(url)}`,
    `language: ${quote(getIntlTag(document.locale))}`,
    ...(document.date ? [`date: ${quote(document.date)}`] : []),
    ...(document.updated ? [`updated: ${quote(document.updated)}`] : []),
    '---',
  ].join('\n')
}

/**
 * The document as the bytes we serve. Blocks are separated by a blank line
 * throughout, which is the one rule markdown genuinely depends on.
 */
export function renderDocument(document: MarkdownDocument, url: string): string {
  const body = [
    frontMatter(document, url),
    heading(1, document.title),
    ...(document.intro ? [escapeLeading(document.intro)] : []),
    ...(document.sections ?? []).flatMap((section) => renderSection(section, 2)),
    ...(document.links?.length
      ? [
          ...(document.linksTitle ? [heading(2, document.linksTitle)] : []),
          document.links.map((link) => `- [${link.label}](${link.href})`).join('\n'),
        ]
      : []),
  ]

  return `${body.join('\n\n')}\n`
}
