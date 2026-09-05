import { COMMITMENT_FIGURES } from '@/lib/commitments'
import { COMPANY } from '@/lib/company'
import { format, getMessages, LOCALE_LABELS, locales, type Locale } from '@/lib/i18n'
import { PAGES, type CataloguePageId, type PublicPageId } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'
import type { MarkdownDocument, Section } from '@/lib/markdown/render'

/**
 * Each page as a document, in the vocabulary of lib/markdown/render.
 *
 * A builder mirrors the section list of the matching view, and nothing
 * else: the copy itself is read from the catalogue the view reads. That is
 * the whole point — a rewritten paragraph reaches the markdown without
 * anyone touching this file, and only a restructured page needs an edit
 * here. test/markdown.test.ts asserts every page has a builder and that
 * its title and intro match the catalogue, so a page cannot go missing.
 */

/** Where to go next, at the foot of every document. */
function links(id: PublicPageId, locale: Locale) {
  const t = getMessages(locale).markdown
  const others = locales.filter((code) => code !== locale)

  return [
    ...others.map((code) => ({
      label: format(t.otherLanguage, { language: LOCALE_LABELS[code].full }),
      href: absoluteUrl(PAGES[id][code]),
    })),
    ...(id === 'home' ? [] : [{ label: t.home, href: absoluteUrl(PAGES.home[locale]) }]),
    { label: t.allPages, href: absoluteUrl('/sitemap.xml') },
  ]
}

/** The home page: hero, what we do, commitments, projects, manifesto. */
function home(locale: Locale): MarkdownDocument {
  const t = getMessages(locale)

  const stats = t.commitments.stats.map(
    (stat, i) => `**${COMMITMENT_FIGURES[i]}${stat.suffix}** ${stat.label}`,
  )

  return {
    title: t.hero.headline.map((line) => line.text).join(' '),
    description: t.metadata.description,
    path: PAGES.home[locale],
    locale,
    intro: t.hero.intro,
    sections: [
      {
        title: t.axes.title,
        sections: [
          {
            title: t.axes.conseil.title,
            intro: t.axes.conseil.body,
            blocks: [{ kind: 'cards', items: t.axes.conseil.items }],
          },
          {
            title: t.axes.audit.title,
            intro: t.axes.audit.body,
            blocks: [{ kind: 'cards', items: t.axes.audit.items }],
          },
        ],
      },
      {
        title: t.commitments.title,
        intro: t.commitments.intro,
        blocks: [{ kind: 'bullets', items: stats }],
      },
      {
        title: t.projects.title,
        intro: t.projects.intro,
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: `${t.projects.tensel.wordmark} (${t.projects.tensel.status}), ${t.projects.tensel.link}`,
                desc: t.projects.tensel.desc,
              },
              {
                title: `${t.projects.forge.title} (${t.projects.forge.status})`,
                desc: t.projects.forge.desc,
              },
            ],
          },
          { kind: 'prose', paragraphs: [t.projects.note] },
        ],
      },
      {
        blocks: [{ kind: 'quote', lines: t.manifesto.quote.map((line) => line.text) }],
      },
      {
        title: t.contact.title,
        intro: t.contact.intro,
        blocks: [
          { kind: 'prose', paragraphs: [t.contact.responseTime] },
          {
            kind: 'entries',
            entries: [
              { label: t.contact.write, value: t.contact.email },
              {
                label: t.pages.contact.metaTitle,
                value: absoluteUrl(PAGES.contact[locale]),
              },
            ],
          },
        ],
      },
    ],
    links: links('home', locale),
    linksTitle: t.markdown.seeAlso,
  }
}

/** The section list of each page, mirroring its view. */
const SECTIONS: Record<CataloguePageId, (locale: Locale) => readonly Section[]> = {
  conseil: (locale) => {
    const t = getMessages(locale).pages.conseil
    return [
      { title: t.build.title, blocks: [{ kind: 'cards', items: t.build.items }] },
      { title: t.how.title, blocks: [{ kind: 'cards', items: t.how.items }] },
      {
        title: t.deliver.title,
        intro: t.deliver.intro,
        blocks: [{ kind: 'cards', items: t.deliver.items }],
      },
    ]
  },

  audit: (locale) => {
    const t = getMessages(locale).pages.audit
    return [
      { title: t.scope.title, blocks: [{ kind: 'cards', items: t.scope.items }] },
      {
        title: t.perimeter.title,
        blocks: [{ kind: 'prose', paragraphs: t.perimeter.paragraphs }],
      },
      {
        title: t.deliver.title,
        intro: t.deliver.intro,
        blocks: [{ kind: 'cards', items: t.deliver.items }],
      },
      { title: t.process.title, blocks: [{ kind: 'cards', items: t.process.items }] },
      {
        title: t.decision.title,
        blocks: [
          { kind: 'prose', paragraphs: t.decision.paragraphs },
          { kind: 'quote', lines: [t.decision.pull] },
        ],
      },
    ]
  },

  methode: (locale) => {
    const messages = getMessages(locale)
    const t = messages.pages.methode
    return [
      { title: t.stepsTitle, blocks: [{ kind: 'cards', items: messages.approach.steps }] },
      { title: t.refusals.title, blocks: [{ kind: 'cards', items: t.refusals.items }] },
    ]
  },

  convictions: (locale) => {
    const messages = getMessages(locale)
    const t = messages.pages.convictions
    return [
      { blocks: [{ kind: 'quote', lines: messages.manifesto.quote.map((line) => line.text) }] },
      { blocks: [{ kind: 'prose', paragraphs: t.paragraphs }] },
      { title: t.valuesTitle, blocks: [{ kind: 'cards', items: messages.manifesto.values }] },
    ]
  },

  souverainete: (locale) => {
    const t = getMessages(locale).pages.souverainete
    return [
      { blocks: [{ kind: 'prose', paragraphs: t.definition.paragraphs }] },
      { title: t.practice.title, blocks: [{ kind: 'cards', items: t.practice.items }] },
      { title: t.europe.title, blocks: [{ kind: 'prose', paragraphs: t.europe.paragraphs }] },
      { title: t.faq.title, blocks: [{ kind: 'cards', items: t.faq.items }] },
    ]
  },

  contact: (locale) => {
    const messages = getMessages(locale)
    const t = messages.pages.contact
    return [
      {
        title: t.helpTitle,
        blocks: [
          { kind: 'bullets', items: t.helpItems },
          { kind: 'prose', paragraphs: [t.helpNote, messages.contact.responseTime] },
          {
            kind: 'entries',
            entries: [{ label: messages.contact.write, value: messages.contact.email }],
          },
        ],
      },
    ]
  },

  mentionsLegales: (locale) => {
    const t = getMessages(locale).pages.mentionsLegales
    return [
      { title: t.publisher.title, blocks: [{ kind: 'entries', entries: t.publisher.entries }] },
      { title: t.host.title, blocks: [{ kind: 'entries', entries: t.host.entries }] },
      { title: t.ip.title, blocks: [{ kind: 'prose', paragraphs: t.ip.paragraphs }] },
    ]
  },

  confidentialite: (locale) => {
    const t = getMessages(locale).pages.confidentialite
    return t.sections.map((section) => ({
      title: section.title,
      blocks: [{ kind: 'prose' as const, paragraphs: section.paragraphs }],
    }))
  },
}

/**
 * The contact page takes its header from the catalogue root rather than
 * from its own entry, exactly as ContactView does.
 */
function header(id: CataloguePageId, locale: Locale): { title: string; intro?: string } {
  const messages = getMessages(locale)
  if (id === 'contact') {
    return { title: messages.contact.title, intro: messages.contact.intro }
  }
  const page = messages.pages[id]
  return { title: page.title, intro: 'intro' in page ? page.intro : undefined }
}

export function documentFor(id: PublicPageId, locale: Locale): MarkdownDocument {
  if (id === 'home') return home(locale)

  const page = getMessages(locale).pages[id]

  return {
    ...header(id, locale),
    description: page.metaDescription,
    path: PAGES[id][locale],
    locale,
    sections: SECTIONS[id](locale),
    links: links(id, locale),
    linksTitle: getMessages(locale).markdown.seeAlso,
  }
}

/**
 * What an agent gets on a path that does not exist: the message, then every
 * page of the site, so a wrong guess at a URL is one hop from the right one
 * rather than a dead end.
 */
export function notFoundDocument(locale: Locale): MarkdownDocument {
  const t = getMessages(locale)

  return {
    title: t.markdown.notFoundTitle,
    description: t.markdown.notFoundIntro,
    path: PAGES.home[locale],
    locale,
    intro: t.markdown.notFoundIntro,
    sections: [
      {
        title: t.markdown.allPages,
        blocks: [
          {
            kind: 'entries',
            entries: [
              { label: t.markdown.home, value: absoluteUrl(PAGES.home[locale]) },
              ...(Object.keys(SECTIONS) as CataloguePageId[]).map((id) => ({
                label: t.pages[id].metaTitle,
                value: absoluteUrl(PAGES[id][locale]),
              })),
            ],
          },
        ],
      },
      {
        blocks: [
          {
            kind: 'entries',
            entries: [
              { label: 'Sitemap', value: absoluteUrl('/sitemap.xml') },
              { label: 'Agent instructions', value: absoluteUrl('/llms.txt') },
              { label: 'Contact', value: COMPANY.email },
            ],
          },
        ],
      },
    ],
  }
}
