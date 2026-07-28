/**
 * French message catalogue. Every user-visible string on the site lives
 * here, including alt text, aria labels and metadata, so a new locale
 * is a sibling file plus an entry in lib/i18n.ts.
 *
 * ` ` is the narrow no-break space French typography puts before
 * `:` `;` `!` `?`; ` ` is the regular no-break space.
 */
export const fr = {
  metadata: {
    title: 'La Française du Logiciel · Logiciels métier, infrastructure européenne',
    description:
      'Nous développons des sites, des logiciels métier et des automatisations, et nous les déployons chez des fournisseurs européens. Nous construisons aussi les plateformes qui manquent encore pour se passer des géants américains.',
  },

  brand: {
    name: 'La Française du Logiciel',
    homeLabel: 'Accueil, La Française du Logiciel',
    /* The wordmark sets the name on two lines; a proper noun, so a new
       locale almost certainly repeats it verbatim. */
    wordmark: { top: 'La Française', bottom: 'du Logiciel' },
  },

  nav: {
    primaryLabel: 'Navigation principale',
    mobileLabel: 'Navigation mobile',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    cta: 'Nous parler',
    items: [
      { key: 'conseil', label: 'Conseil', href: '#conseil' },
      { key: 'souverainete', label: 'Souveraineté', href: '#souverainete' },
      { key: 'approche', label: 'Méthode', href: '#approche' },
      { key: 'manifeste', label: 'Manifeste', href: '#manifeste' },
    ],
  },

  hero: {
    headline: [
      { text: 'Nous développons' },
      { text: 'vos logiciels métier,' },
      { text: 'et nous les hébergeons' },
      { text: 'en Europe. Pas ailleurs.', accent: true },
    ],
    intro:
      'Sites, applications métier, automatisations : nous construisons les outils qui font gagner du temps à vos équipes, et nous les déployons chez des fournisseurs européens. Scaleway plutôt qu’AWS. Plausible plutôt que Google Analytics.',
    ctaPrimary: 'Démarrer un projet',
    ctaSecondary: 'Ce que nous faisons',
  },

  axes: {
    title: 'Ce que nous faisons.',
    conseil: {
      title: 'Développement sur mesure',
      body: 'Nous partons de votre fonctionnement réel, pas d’un cahier des charges théorique. L’objectif est de remplacer les tableurs, les copier-coller et les allers-retours par e-mail par un outil qui fait le travail à leur place. Vous repartez avec le code, la documentation et les accès.',
      imageAlt:
        'Espace de travail d’un développeur, écran affichant du code dans une ambiance sombre',
      link: 'Parler de votre projet',
      items: [
        {
          title: 'Sites et applications web',
          desc: 'Vitrine, espace client, back-office. Rapides à charger, simples à faire évoluer.',
        },
        {
          title: 'Logiciels métier',
          desc: 'Un outil qui suit votre façon de travailler, plutôt que l’inverse.',
        },
        {
          title: 'Automatisation et IA',
          desc: 'Des scripts et des modèles sur les tâches répétitives, quand c’est justifié.',
        },
      ],
    },
    souverainete: {
      title: 'Sortir de la dépendance américaine',
      body: 'Par défaut, nous choisissons des fournisseurs européens : Scaleway pour l’hébergement, Plausible pour la mesure d’audience. Vos données restent soumises au droit européen, pas au CLOUD Act. Et là où l’équivalent européen n’existe pas encore, nous le construisons nous-mêmes.',
      imageAlt: 'Salle serveur d’un centre de données éclairée de bleu et de rouge',
      link: 'Suivre le projet',
      items: [
        {
          title: 'Fournisseurs européens',
          desc: 'Scaleway, Plausible et quelques autres, choisis pour que rien ne sorte de l’Union.',
        },
        {
          title: 'Plateforme de déploiement',
          desc: 'Une alternative européenne à Vercel. En construction.',
        },
        {
          title: 'Forge logicielle',
          desc: 'Une alternative à GitHub. Prévue ensuite.',
        },
      ],
    },
  },

  approach: {
    title: 'Comment nous travaillons.',
    intro:
      'Quatre étapes, quelques semaines par projet. Vous voyez le produit avancer en continu et vous gardez la main du début à la fin.',
    steps: [
      {
        num: '01',
        title: 'Comprendre',
        desc: 'Nous passons du temps dans votre métier avant d’écrire la moindre ligne. Il arrive que nous vous déconseillions la moitié de ce que vous aviez imaginé.',
      },
      {
        num: '02',
        title: 'Concevoir',
        desc: 'Des choix techniques ennuyeux, documentés, sur des standards ouverts. Rien qu’une autre équipe ne puisse reprendre après nous.',
      },
      {
        num: '03',
        title: 'Livrer',
        desc: 'Une première version utilisable en quelques semaines, puis des itérations courtes. Pas de tunnel de six mois.',
      },
      {
        num: '04',
        title: 'Vous passer la main',
        desc: 'Le code, la documentation et les accès vous appartiennent. Si vous voulez continuer sans nous, rien ne vous en empêche.',
      },
    ],
  },

  manifesto: {
    /* `accent` marks the phrases that ignite once the sentence settles. */
    quote: [
      {
        text: 'Pendant vingt ans, choisir un fournisseur américain était le choix raisonnable : meilleur, moins cher, mieux intégré.',
      },
      { text: 'Ce n’est plus vrai partout,', accent: 'blue' },
      { text: 'et le risque juridique, lui,' },
      { text: 'n’a fait que grandir.', accent: 'red' },
    ],
    values: [
      {
        title: 'Nous disons non',
        desc: 'Une partie de notre travail consiste à vous déconseiller des fonctionnalités. C’est souvent là que nous vous faisons gagner le plus.',
      },
      {
        title: 'Européen par défaut',
        desc: 'Sortir de l’Europe doit être une décision justifiée et discutée avec vous, jamais un réglage par défaut.',
      },
      {
        title: 'Réversible',
        desc: 'Vous devez pouvoir partir. Le code, les données et l’infrastructure sont à vous, sans négociation.',
      },
    ],
  },

  commitments: {
    title: 'Nos engagements.',
    intro:
      'Nous démarrons : pas encore de logos clients à aligner ni de chiffres à vous vendre. À la place, voici ce sur quoi vous pouvez nous tenir dès le premier projet.',
    stats: [
      { key: 'contact', label: 'interlocuteur, du premier échange jusqu’à la livraison' },
      { key: 'response', label: 'heures ouvrées pour une première réponse' },
      { key: 'ownership', label: 'du code et de la documentation livrés, sans rétention' },
      { key: 'europe', label: 'fournisseur hors d’Europe sans votre accord' },
    ],
    caption: 'Vos données restent ici.',
  },

  contact: {
    title: 'Parlons-en.',
    intro:
      'Dites-nous ce que vous voulez construire, ou ce qui vous coince aujourd’hui. Le premier échange ne vous engage à rien.',
    email: 'contact@lafrancaisedulogiciel.fr',
    write: 'Nous écrire',
    responseTime: 'Réponse sous 48 heures ouvrées',
  },

  footer: {
    tagline:
      'Nous développons des logiciels métier et nous les déployons sur des infrastructures européennes. Basés en France.',
    madeIn: 'Fait en France',
    columns: [
      {
        key: 'offre',
        title: 'Ce que nous faisons',
        links: [
          { label: 'Développement sur mesure', href: '#conseil' },
          { label: 'Infrastructure européenne', href: '#souverainete' },
          { label: 'Méthode', href: '#approche' },
        ],
      },
      {
        key: 'entreprise',
        title: 'L’entreprise',
        links: [
          { label: 'Manifeste', href: '#manifeste' },
          { label: 'Engagements', href: '#engagements' },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        links: [
          { label: 'Nous écrire', href: 'mailto:contact@lafrancaisedulogiciel.fr' },
          { label: 'Démarrer un projet', href: '#contact' },
        ],
      },
    ],
    /** {year} is replaced at render time. */
    copyright: '© {year} La Française du Logiciel. Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
} as const
