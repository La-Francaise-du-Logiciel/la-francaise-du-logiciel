import { ANCHORS, anchorPath, path } from '@/lib/routes'

/**
 * English message catalogue. Checked against the shape of messages/fr.ts in
 * lib/i18n.ts, but written as English rather than transposed from the French:
 * the two say the same thing, sentence for sentence they do not.
 *
 * The company name is a proper noun and stays in French throughout, wordmark
 * included, as do the French legal identifiers in the legal notice. British
 * spelling, and English typography everywhere else: no no-break space before
 * `:` `;` `!` `?`, and the percent sign tight against its number.
 */
export const en = {
  metadata: {
    title: 'La Française du Logiciel · Custom software, web applications and audits',
    description:
      'Custom software, web applications, automation and audits of the systems you already run. We hand over the code and the documentation, and can look after the technical side for as long as you need.',
    /** Appended to every page title except the home page. */
    titleSuffix: ' · La Française du Logiciel',
  },

  brand: {
    name: 'La Française du Logiciel',
    homeLabel: 'Home, La Française du Logiciel',
    /* The wordmark sets the name on two lines; a proper noun, so it is
       repeated verbatim rather than translated. */
    wordmark: { top: 'La Française', bottom: 'du Logiciel' },
  },

  nav: {
    primaryLabel: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    cta: 'Talk to us',
    language: {
      /** Names the FR/EN control for screen readers. */
      label: 'Language',
      /** {language} is replaced by the target language's own name. */
      switchTo: 'Switch to {language}',
    },
    items: [
      { key: 'conseil', label: 'Consulting', href: path('conseil', 'en') },
      { key: 'audit', label: 'Audit', href: path('audit', 'en') },
      { key: 'methode', label: 'Method', href: path('methode', 'en') },
      { key: 'convictions', label: 'Principles', href: path('convictions', 'en') },
    ],
  },

  hero: {
    /* `accent` italicises the line and sets it in blue. */
    headline: [
      { text: 'We build the', accent: false },
      { text: 'software that', accent: false },
      { text: ' moves your', accent: false },
      { text: 'business forward.', accent: true },
    ],
    intro:
      'Custom software, web applications, automation and audits of the systems you already run. We hand over the code and the documentation. If you want us to, we will also administer the technical accounts, handle maintenance and look after your environment for the long term.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'What we do',
  },

  axes: {
    title: 'What we do.',
    conseil: {
      title: 'Custom development',
      body: 'We start from how your team actually works, not from a specification written in the abstract. The aim is to replace the spreadsheets, the copy-pasting and the endless email threads with a tool that simply does the job. You leave with the code, the documentation, and the ability to take the whole thing over yourself.',
      imageAlt: 'A developer’s desk, screen showing code in a dimly lit room',
      link: 'Read more',
      href: path('conseil', 'en'),
      items: [
        {
          title: 'Websites and web apps',
          desc: 'Customer portals, back offices, internal tools. Fast to load, easy to build on.',
        },
        {
          title: 'Business software',
          desc: 'A tool that fits the way you work, instead of the other way round.',
        },
        {
          title: 'Automation and AI',
          desc: 'Scripts and models for the repetitive work, where they earn their place.',
        },
        {
          title: 'Inherited systems',
          desc: 'A legacy tool, a supplier who moved on: we take it on, steady it, then build on it.',
        },
      ],
    },
    audit: {
      title: 'Audits and inherited systems',
      body: 'We look at the real state of the code, the environment around it and the data before recommending anything at all. You come away knowing what is about to break, what is costing you to maintain, and what is worth keeping.',
      imageAlt: 'An abstract software structure built from blue and red blocks',
      link: 'Read more',
      href: path('audit', 'en'),
      items: [
        {
          title: 'Code and architecture',
          desc: 'Quality, security, dependencies, tests, and whether a new team could pick it up.',
        },
        {
          title: 'Deployment and data',
          desc: 'Deployment, backups, access, data flows, and the places things are fragile.',
        },
        {
          title: 'The cost of putting it right',
          desc: 'Priced by priority, so the decision rests on more than a hunch.',
        },
        {
          title: 'Keep it or rebuild it',
          desc: 'Both routes costed side by side, with the risks and the timelines.',
        },
      ],
    },
  },

  approach: {
    title: 'How we work.',
    intro:
      'Four stages, a few weeks per project. You watch the product take shape week by week, and you stay in control from start to finish.',
    steps: [
      {
        num: '01',
        title: 'Understand',
        desc: 'We spend time inside your business before writing a line of code. Every so often we talk you out of half of what you had in mind.',
      },
      {
        num: '02',
        title: 'Design',
        desc: 'Boring technical choices, written down, built on open standards. Nothing another team could not pick up after us.',
      },
      {
        num: '03',
        title: 'Ship',
        desc: 'Something you can genuinely use within weeks, then short iterations. No six-month black box.',
      },
      {
        num: '04',
        title: 'Hand over',
        desc: 'The code and the documentation are yours. If you would rather carry on without us, we sign over full control of the technical accounts and run the handover.',
      },
    ],
  },

  manifesto: {
    /* `accent` marks the phrases that ignite once the sentence settles. */
    quote: [
      {
        text: 'For twenty years, going with an American supplier was the sensible call: better, cheaper, better integrated.',
      },
      { text: 'That is no longer true everywhere,', accent: 'blue' },
      { text: 'while the legal risk' },
      { text: 'has only grown.', accent: 'red' },
    ],
    values: [
      {
        title: 'Useful first',
        desc: 'We would rather build a simple tool your team uses than a thorough one they avoid. Even if that means talking you out of features along the way.',
      },
      {
        title: 'European by preference',
        desc: 'Where the service is genuinely comparable, we choose European suppliers. We explain the choice, and we fit it to your situation.',
      },
      {
        title: 'Reversible',
        desc: 'You have to be able to walk away. The code, the data and the documentation are yours, and we sign over the technical accounts whenever you ask.',
      },
    ],
    readMore: 'Why we do this',
  },

  commitments: {
    title: 'What we commit to.',
    intro:
      'We are just starting out, so there are no client logos to parade and no figures to sell you. Instead, here is what you can hold us to from the first project onwards.',
    /* The figures live in the component; only the unit is typography, and
       English sets the percent sign tight against the number. */
    stats: [
      { key: 'contact', suffix: '', label: 'point of contact, from the first conversation to delivery' },
      { key: 'response', suffix: '', label: 'working hours to a first reply' },
      { key: 'ownership', suffix: '%', label: 'of the code and documentation handed over, nothing held back' },
      { key: 'founders', suffix: '', label: 'founders, hands-on in every project' },
    ],
  },

  projects: {
    title: 'Our own projects.',
    intro:
      'Alongside client work, we build the products that make technological independence simpler. One is live, the other is still being built.',
    tensel: {
      status: 'Live',
      /* A proper noun, and the lockup sets it in lower case, so it reads the
         same in every language. */
      wordmark: 'tensel',
      desc: 'Application hosting in Europe. Connect a GitHub repository, push, and the rest is handled. Builds, HTTPS, domains, logs and rollback included, on infrastructure run from Paris.',
      link: 'tensel.eu',
      linkLabel: 'Open tensel.eu in a new tab',
    },
    forge: {
      status: 'Exploring',
      title: 'Code hosting',
      desc: 'Repositories, code review and continuous integration, in a European alternative to GitHub built for small teams.',
      unavailable: 'Not open yet',
    },
    note: 'Tensel is live and you can try it today. Code hosting is not accessible yet, and we will build it out alongside its first users.',
    cta: 'Talk to us about these',
  },

  contact: {
    title: 'Tell us what brings you here.',
    intro:
      'A specific project, an idea that is still vague, or something you already run and want an outside opinion on. The first conversation commits you to nothing, and you will be talking to one of the two founders.',
    email: 'contact@francaisedulogiciel.fr',
    write: 'Write to us',
    responseTime: 'We reply within 24 working hours',
  },

  pages: {
    conseil: {
      metaTitle: 'Custom software development',
      metaDescription:
        'Custom software, web applications and automation built to fit, delivered with the code, the documentation and a full handover where you need one.',
      title: 'We build the tool your team is missing.',
      intro:
        'Useful software is software your team opens every morning without thinking about it. That is the only test we are interested in.',
      build: {
        title: 'What we build',
        items: [
          {
            title: 'Websites and web applications',
            desc: 'Public site, customer portal, back office, internal tool. We look after performance and search visibility too, because a slow site loses customers before they have read a word.',
          },
          {
            title: 'Business software',
            desc: 'The tool that replaces the shared spreadsheet, the chasing emails and the double data entry. It follows your rules, not those of a vendor selling the same product to everyone.',
          },
          {
            title: 'Automation and artificial intelligence',
            desc: 'Scripts, integrations between the tools you already have, sometimes a language model. We will also tell you when AI adds nothing to your problem, which happens often.',
          },
          {
            title: 'Inherited systems',
            desc: 'A tool built by a supplier who stopped answering, software nobody dares touch: we take the code on, steady it, then build on it.',
          },
        ],
      },
      how: {
        title: 'How a project starts',
        items: [
          {
            title: 'A first conversation',
            desc: 'An hour on the phone or at your offices, to understand what you do and where you are stuck. Free, and with no strings attached.',
          },
          {
            title: 'A written proposal',
            desc: 'Scope, timeline, firm price. Plus the list of what we have deliberately left out of the first version: projects fail when nobody dares cut the scope.',
          },
          {
            title: 'Audit',
            desc: 'The real state of the code, the infrastructure and the data. What is about to break, what is expensive to maintain, what can stay as it is. You get a report you can actually read, an estimate for putting things right, and a costed comparison between keeping and rebuilding.',
          },
          {
            title: 'Regular releases',
            desc: 'You test something usable very early, then every two weeks. Whatever nobody uses gets dropped along the way.',
          },
        ],
      },
      deliver: {
        title: 'What you take away',
        intro: 'At the end of a project, everything sits with you. It is not a paid extra.',
        items: [
          { title: 'The source code', desc: 'In your repository, in your name, with the full history.' },
          {
            title: 'The documentation',
            desc: 'Installation, day-to-day operation, and the technical decisions with the reasoning behind them.',
          },
          {
            title: 'Control of the accounts',
            desc: 'We can administer the technical accounts while we are working together. Whenever you ask, we sign over full control, with admin rights and the means to recover them.',
          },
          {
            title: 'A proper handover',
            desc: 'If you bring the work in-house, we train whoever picks it up.',
          },
        ],
      },
    },

    audit: {
      metaTitle: 'Application audits and inherited systems',
      metaDescription:
        'An audit of the code, the deployment and the data: risks, maintenance costs, a plan for putting things right, and a costed comparison between keeping and rebuilding.',
      title: 'Before you keep it or rebuild it, you need to know what is actually there.',
      intro:
        'We examine your application and the technical environment around it without assuming the answer. The point is not to find fault, it is to give you the technical and financial grounds to decide what happens next.',
      scope: {
        title: 'What we look at',
        items: [
          {
            title: 'The code',
            desc: 'Architecture, readability, dependencies, tests, security, and whether a new team could take it on without starting over.',
          },
          {
            title: 'The technical environment',
            desc: 'Deployments, backups, monitoring, environments and the access that keeps the application running. Above all, whatever could take the service down.',
          },
          {
            title: 'The data',
            desc: 'Structure, quality, duplicates, access rights, flows and the migrations to plan for. A rebuild that works usually starts by working out what has to survive.',
          },
          {
            title: 'The hidden costs',
            desc: 'Licences, infrastructure bills, manual work, and the hours people spend working around the tool. The real cost is not all in the code.',
          },
        ],
      },
      perimeter: {
        title: 'A clear scope before we start',
        paragraphs: [
          'We audit the application and what keeps it running: its code, its architecture, its deployment, its database and its data flows. We do not dress that up as a full audit of your information systems.',
          'If the diagnosis needs to cover offensive security, networks, complex infrastructure or regulatory compliance, we bring in the specialists first and propose a scope and a price after that.',
        ],
      },
      deliver: {
        title: 'What you take away',
        intro:
          'Not a document for developers only. Something management, the business teams and the technical team can read together and decide from.',
        items: [
          {
            title: 'A report you can read',
            desc: 'Findings in plain language, backed by evidence and sorted by how much risk they carry.',
          },
          {
            title: 'A plan of action',
            desc: 'What to secure now, what to put right next, and what can reasonably wait.',
          },
          {
            title: 'A costed estimate',
            desc: 'What putting things right would cost and how long it would take, with the assumptions stated and anything left out of scope.',
          },
          {
            title: 'A reasoned choice',
            desc: 'Keeping it or rebuilding it, compared on cost, time, risk and how long each would last.',
          },
        ],
      },
      process: {
        title: 'How an audit runs',
        items: [
          {
            title: 'Scoping',
            desc: 'We talk to the people who use the tool, the people who maintain it and the people who pay for it, so we understand the context as well as the symptoms.',
          },
          {
            title: 'Analysis',
            desc: 'We work through the code, the data, the documentation and production with the right access. Every finding that matters gets verified.',
          },
          {
            title: 'Findings',
            desc: 'We present the conclusions, answer questions and hand over the documents. You can use them with us or with anyone else.',
          },
        ],
      },
      decision: {
        title: 'An audit is not an excuse to rebuild everything',
        paragraphs: [
          'An imperfect codebase can still be sound, worth keeping and perfectly possible to take on. We separate the flaws that are merely irritating from the risks that genuinely threaten the business.',
          'If what you have can be steadied, we set out a path to take it on in stages. If starting again costs less or carries less risk over the medium term, we say so, using the same figures. The conclusion has to hold even if you hand the work to someone else.',
        ],
      },
    },

    methode: {
      metaTitle: 'Our method',
      metaDescription:
        'Four stages, a release every two weeks, and a project you can take over at any point.',
      title: 'How we work.',
      intro:
        'Four stages, a few weeks per project. You watch the product take shape week by week, and you stay in control from start to finish.',
      stepsTitle: 'The four stages',
      refusals: {
        title: 'What we will not do',
        items: [
          {
            title: 'A fixed price on an unknown scope',
            desc: 'Quoting firmly for work nobody has explored yet means either guessing wrong or padding the number. We scope first, then we price.',
          },
          {
            title: 'Code you could not take over',
            desc: 'No in-house framework, no dependency on one individual. Another team has to be able to carry on just by reading the repository.',
          },
          {
            title: 'A dependency you cannot leave',
            desc: 'We can administer the technical accounts while we are working together. If you take the work back in-house, we sign over full control with the documentation you need, and nothing goes down in the process.',
          },
        ],
      },
    },

    convictions: {
      metaTitle: 'Principles',
      metaDescription:
        'Why we build software that is useful, reversible and founded on dependencies you choose rather than inherit.',
      title: 'Dependency you choose, not dependency you inherit.',
      intro: 'What we think, and what it changes in practice on our projects.',
      valuesTitle: 'What that changes, in practice',
      paragraphs: [
        'We do not think American tools are bad. Most of them are excellent, and we used them for years. The problem is not their quality, it is the position you are in once you depend on them. A change of price, of terms or of policy, and you have no recourse.',
        'A company that controls neither its code, nor its data, nor its ability to recover the accounts its software runs on does not really own its tools. It rents them, on terms it never negotiated.',
        'Our job is to make that dependency something you choose rather than something you inherit: open standards, documented exports, account control that can be signed over, and a choice of suppliers we can justify. We prefer a European option where it does the job, without turning that into a promise detached from your situation.',
        'That is what we mean by digital sovereignty: being able to choose your dependencies, and to leave them. It is not a hosting package. It is a design constraint on everything we write, and the direction we are headed in.',
      ],
    },

    contact: {
      metaTitle: 'Contact',
      metaDescription:
        'Write to us about a project, about software you already run, or just to ask a question. We reply within 24 working hours.',
      helpTitle: 'What helps us to know',
      helpItems: [
        'What your company does, in a sentence.',
        'The problem you want solved, or the task eating your time.',
        'Whether you already have a tool in place, and which one.',
        'Your deadline, if there is one.',
      ],
      helpNote: 'None of it is required. Three lines are plenty to start with.',
      form: {
        nameLabel: 'Your name, or your company',
        namePlaceholder: 'Optional',
        emailLabel: 'Your email address',
        emailPlaceholder: 'So that we can reply',
        messageLabel: 'Your message',
        messagePlaceholder: 'What you do, where you are stuck, what you want to build.',
        submit: 'Send message',
        sending: 'Sending…',
        success: 'Message sent. We will reply within 24 working hours.',
        error: 'That did not send. Write to us directly at the address below.',
        hint: 'We use your message to reply to you, and for nothing else.',
        directLabel: 'Or write to us directly',
        copy: 'Copy',
        copied: 'Copied',
      },
    },

    mentionsLegales: {
      metaTitle: 'Legal notice',
      metaDescription:
        'Publisher, host and intellectual property for the La Française du Logiciel website.',
      title: 'Legal notice',
      intro:
        'The information required by article 6 of the French Act of 21 June 2004 on confidence in the digital economy.',
      publisher: {
        title: 'Site publisher',
        /* Registered identifiers and addresses are legal facts and stay as
           filed; only the labels are translated. */
        entries: [
          { label: 'Publisher', value: 'Vincent Wendling, sole trader (entrepreneur individuel)' },
          { label: 'Trading name', value: 'La Française du Logiciel' },
          { label: 'Registered office', value: '6 rue des Frères Eberts, 67100 Strasbourg, France' },
          { label: 'SIREN', value: '942 561 762' },
          { label: 'SIRET (registered office)', value: '942 561 762 00017' },
          { label: 'APE code', value: '58.29C — Publishing of application software' },
          { label: 'Registration', value: 'French national business register (RNE)' },
          { label: 'Director of publication', value: 'Vincent Wendling' },
          { label: 'Contact', value: 'contact@francaisedulogiciel.fr' },
        ],
      },
      host: {
        title: 'Host',
        entries: [
          { label: 'Host', value: 'Scaleway, société par actions simplifiée' },
          { label: 'Share capital', value: '€142,050' },
          { label: 'Registered office', value: '8 rue de la Ville-l’Évêque, 75008 Paris, France' },
          { label: 'Trade register', value: 'Paris 433 115 904' },
          { label: 'Website', value: 'scaleway.com' },
        ],
      },
      ip: {
        title: 'Intellectual property',
        paragraphs: [
          'The text, the visual identity and the code of this site belong to Vincent Wendling unless stated otherwise. They may not be reproduced on another medium without written permission beforehand.',
          'Software we develop for our clients is not covered by that clause: those rights pass to the client on the terms set out in the contract.',
        ],
      },
    },

    confidentialite: {
      metaTitle: 'Privacy',
      metaDescription:
        'This site does not measure its audience and loads nothing from third parties. What we do with anything you send us.',
      title: 'This site collects nothing about you.',
      intro:
        'The shortest page on the site, and we would like to keep it that way. Here is exactly what happens when you read it.',
      sections: [
        {
          title: 'No tracking, no analytics',
          paragraphs: [
            'This site does not measure its audience and loads nothing from a third-party server. The fonts are served from our own domain rather than from an outside service.',
            'The only cookie here records the language you pick from the menu yourself. It holds “fr” or “en”, stays on your device, and does nothing beyond showing you the site in the right language. Until you change language, no cookie is set at all.',
            'Check it for yourself: open your browser’s network tab and look at the list of domains contacted. There is one.',
          ],
        },
        {
          title: 'What reaches us if you write',
          paragraphs: [
            'If you write to us, through the form or by email, we receive your address, your message and whatever you chose to put in it. We use that to reply and, where it goes further, to put a proposal together. None of it is sold, passed on, or used for cold outreach.',
            'We keep those exchanges for as long as we are working together, then for three years from the last contact. Accounting records tied to a project follow the statutory retention periods.',
          ],
        },
        {
          title: 'Where that data sits',
          paragraphs: [
            'The site is hosted by Scaleway, in France, and messages from the form reach us through its email relay, also in France. Our mailboxes are in Europe, with a provider under European law. Nothing is transferred outside the European Union.',
          ],
        },
        {
          title: 'Your rights',
          paragraphs: [
            'You can ask to see, correct or delete the data we hold about you, and object to us processing it. An email to contact@francaisedulogiciel.fr is enough, and we answer within a month.',
            'If our answer does not satisfy you, you can take the matter to the French data protection authority, the Commission nationale de l’informatique et des libertés (CNIL), at 3 place de Fontenoy, 75007 Paris.',
          ],
        },
      ],
    },
  },

  footer: {
    tagline:
      'Custom software, web applications, automation and audits of the systems you already run. Based in France.',
    madeIn: 'Made in France',
    columns: [
      {
        key: 'offre',
        title: 'What we do',
        links: [
          { label: 'Custom development', href: path('conseil', 'en') },
          { label: 'Audits and inherited systems', href: path('audit', 'en') },
          { label: 'Method', href: path('methode', 'en') },
        ],
      },
      {
        key: 'entreprise',
        title: 'The company',
        links: [
          { label: 'Principles', href: path('convictions', 'en') },
          { label: 'Our own projects', href: anchorPath('home', 'en', ANCHORS.projects) },
          { label: 'Commitments', href: anchorPath('home', 'en', ANCHORS.commitments) },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        links: [
          { label: 'Write to us', href: 'mailto:contact@francaisedulogiciel.fr' },
          { label: 'Start a project', href: path('contact', 'en') },
        ],
      },
    ],
    /** {year} is replaced at render time. */
    copyright: '© {year} La Française du Logiciel. All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Privacy',
  },
} as const
