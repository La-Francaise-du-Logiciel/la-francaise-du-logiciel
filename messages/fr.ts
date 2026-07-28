/**
 * French message catalogue. Every user-visible string on the site lives
 * here, including alt text, aria labels and metadata, so a new locale
 * is a sibling file plus an entry in lib/i18n.ts.
 *
 * ` ` is the narrow no-break space French typography puts before
 * `:` `;` `!` `?`; ` ` is the regular no-break space.
 */
export const fr = {
  metadata: {
    title: 'La Française du Logiciel · Conseil et souveraineté numérique',
    description:
      'La Française du Logiciel conçoit des logiciels métier qui font gagner du temps aux entreprises, et bâtit l’infrastructure de la souveraineté numérique française et européenne.',
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
      { key: 'approche', label: 'Notre approche', href: '#approche' },
      { key: 'manifeste', label: 'Manifeste', href: '#manifeste' },
    ],
  },

  hero: {
    headline: [
      { text: 'Le logiciel qui vous' },
      { text: 'fait gagner du temps,' },
      { text: 'l’infrastructure qui vous', accent: true },
      { text: 'rend indépendant.', accent: true },
    ],
    intro:
      'La Française du Logiciel conçoit des logiciels métier sur mesure et bâtit l’infrastructure de la souveraineté numérique française et européenne. Deux métiers, une même conviction : la technologie doit servir ceux qui l’emploient.',
    ctaPrimary: 'Démarrer un projet',
    ctaSecondary: 'Découvrir nos deux axes',
  },

  axes: {
    title: 'Nous créons de la valeur, et nous la protégeons.',
    conseil: {
      title: 'Le logiciel qui travaille pour vous',
      body: 'Nous accompagnons les entreprises pour concevoir des logiciels (sites, SaaS, automatisation IA) qui font gagner du temps et créent une valeur mesurable. Au sens large, tout ce qui transforme une contrainte en avantage.',
      imageAlt:
        'Espace de travail d’un développeur, écran affichant du code dans une ambiance sombre',
      link: 'Parler de votre projet',
      items: [
        {
          title: 'Sites & produits web',
          desc: 'Des interfaces rapides, soignées et pensées pour convertir.',
        },
        {
          title: 'SaaS sur mesure',
          desc: 'Des plateformes métier taillées pour vos processus réels.',
        },
        {
          title: 'Automatisation & IA',
          desc: 'Des agents et flux qui absorbent les tâches répétitives.',
        },
      ],
    },
    souverainete: {
      title: 'L’infrastructure qui vous rend libre',
      body: 'Nous bâtissons des produits et des infrastructures au service de la souveraineté numérique française et européenne, pour ne dépendre d’aucune puissance étrangère, qu’elle soit américaine, chinoise ou autre.',
      imageAlt: 'Salle serveur d’un centre de données éclairée de bleu et de rouge',
      link: 'Rejoindre le mouvement',
      items: [
        {
          title: 'Données protégées',
          desc: 'Hébergement en France, conformité RGPD par défaut.',
        },
        {
          title: 'Infrastructure ouverte',
          desc: 'Des briques interopérables, sans verrou propriétaire.',
        },
        {
          title: 'Indépendance',
          desc: 'Aucune dépendance imposée aux puissances extra-européennes.',
        },
      ],
    },
  },

  approach: {
    title: 'Une méthode d’ingénieur, une exigence d’artisan.',
    intro:
      'La même rigueur, que l’on construise votre logiciel métier ou une brique d’infrastructure d’intérêt collectif.',
    steps: [
      {
        num: '01',
        title: 'Comprendre',
        desc: 'Nous partons de votre métier, pas d’une solution toute faite. Cadrage précis des enjeux, des flux et de la valeur attendue.',
      },
      {
        num: '02',
        title: 'Concevoir',
        desc: 'Architecture claire, choix technologiques durables et ouverts. Chaque brique est pensée pour rester la vôtre.',
      },
      {
        num: '03',
        title: 'Construire',
        desc: 'Développement itératif, livraisons régulières et lisibles. Vous voyez le produit prendre forme, sans effet tunnel.',
      },
      {
        num: '04',
        title: 'Maîtriser',
        desc: 'Déploiement sur une infrastructure souveraine, documentation et transfert. L’autonomie plutôt que la dépendance.',
      },
    ],
  },

  manifesto: {
    /* `accent` marks the phrases that ignite once the sentence settles. */
    quote: [
      { text: 'Nous croyons qu’un pays qui' },
      { text: 'maîtrise ses logiciels', accent: 'blue' },
      { text: 'maîtrise son avenir. Que la performance et l’indépendance ne s’opposent pas,' },
      { text: 'elles se renforcent.', accent: 'red' },
    ],
    values: [
      {
        title: 'Utile avant tout',
        desc: 'Chaque ligne de code doit résoudre un problème réel et libérer du temps. La technologie n’est jamais une fin en soi.',
      },
      {
        title: 'Souverain par conception',
        desc: 'Nous privilégions les standards ouverts, les données en Europe et les architectures que nos clients peuvent reprendre.',
      },
      {
        title: 'Durable et lisible',
        desc: 'Un logiciel bien construit se comprend, se maintient et se transmet. Nous fuyons la complexité inutile.',
      },
    ],
  },

  commitments: {
    title: 'La valeur chez vous, les données en Europe.',
    intro:
      'Du temps rendu à vos équipes, des outils qui vous appartiennent, une infrastructure que vous pouvez auditer. La performance n’exige pas de céder le contrôle.',
    stats: [
      { key: 'time', label: 'de temps en moins sur les tâches répétitives que nous automatisons' },
      { key: 'ownership', label: 'du code livré, documenté et réversible : il vous appartient' },
      { key: 'independence', label: 'dépendance imposée à des acteurs extra-européens' },
      { key: 'hosting', label: 'des données hébergées en France ou en Europe' },
    ],
    caption: 'Vos données vivent ici, et nulle part ailleurs',
  },

  contact: {
    title: 'Un projet à construire, une souveraineté à défendre.',
    intro:
      'Parlons de votre logiciel métier, de votre infrastructure, ou des deux. Premier échange sans engagement.',
    email: 'contact@lafrancaisedulogiciel.fr',
    write: 'Nous écrire',
    book: 'Prendre rendez-vous',
    responseTime: 'Réponse sous 48h ouvrées',
  },

  footer: {
    tagline:
      'Conseil logiciel et souveraineté numérique. Conçu et hébergé en France, au service de l’indépendance européenne.',
    madeIn: 'Fait en France',
    columns: [
      {
        key: 'conseil',
        title: 'Conseil',
        links: ['Sites & produits web', 'SaaS sur mesure', 'Automatisation & IA', 'Audit technique'],
      },
      {
        key: 'souverainete',
        title: 'Souveraineté',
        links: ['Infrastructure', 'Hébergement en France', 'Standards ouverts', 'Conformité RGPD'],
      },
      {
        key: 'entreprise',
        title: 'Entreprise',
        links: ['Notre approche', 'Manifeste', 'Carrières', 'Contact'],
      },
    ],
    /** {year} is replaced at render time. */
    copyright: '© {year} La Française du Logiciel. Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
} as const
