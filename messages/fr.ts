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
      'Nous développons des sites, des logiciels métier et des automatisations, et nous les déployons sur une infrastructure européenne. Nous construisons aussi les plateformes qui manquent encore pour se passer des géants américains.',
    /** Appended to every page title except the home page. */
    titleSuffix: ' · La Française du Logiciel',
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
      { key: 'conseil', label: 'Conseil', href: '/conseil' },
      { key: 'souverainete', label: 'Souveraineté', href: '/souverainete' },
      { key: 'methode', label: 'Méthode', href: '/methode' },
      { key: 'manifeste', label: 'Manifeste', href: '/manifeste' },
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
      'Sites, applications métier, automatisations : nous construisons les outils qui font gagner du temps à vos équipes, et nous les déployons sur une infrastructure européenne. Vos données restent soumises au droit européen, pas au CLOUD Act.',
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
      link: 'Voir le détail',
      href: '/conseil',
      items: [
        {
          title: 'Sites et applications web',
          desc: 'Espace client, back-office, outil interne. Rapides à charger, simples à faire évoluer.',
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
      body: 'Par défaut, nous choisissons des prestataires soumis au droit européen : hébergement, mesure d’audience, envoi d’e-mails, sauvegardes. Et là où l’équivalent européen n’existe pas encore, nous le construisons nous-mêmes.',
      imageAlt: 'Salle serveur d’un centre de données éclairée de bleu et de rouge',
      link: 'Voir le détail',
      href: '/souverainete',
      items: [
        {
          title: 'Fournisseurs européens',
          desc: 'Hébergement, mesure d’audience, envoi d’e-mails : uniquement des prestataires soumis au droit européen.',
        },
        {
          title: 'Plateforme de déploiement',
          desc: 'Une alternative européenne à Vercel. En construction.',
        },
        {
          title: 'Hébergement de code',
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
    readMore: 'Lire le manifeste',
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
    title: 'Dites-nous ce qui vous amène.',
    intro:
      'Un projet précis, une idée encore floue, ou une question sur l’hébergement de vos données. Le premier échange ne vous engage à rien.',
    email: 'contact@lafrancaisedulogiciel.fr',
    write: 'Nous écrire',
    responseTime: 'Réponse sous 24 heures ouvrées',
  },

  pages: {
    conseil: {
      metaTitle: 'Développement sur mesure',
      metaDescription:
        'Sites, applications métier et automatisations construits sur mesure, livrés avec le code, la documentation et les accès, hébergés en Europe.',
      title: 'Nous construisons l’outil qui manque à votre équipe.',
      intro:
        'Un logiciel utile est un logiciel que vos équipes ouvrent tous les matins sans y penser. C’est le seul critère qui nous intéresse.',
      build: {
        title: 'Ce que nous construisons',
        items: [
          {
            title: 'Sites et applications web',
            desc: 'Site public, espace client, back-office, outil interne. Nous nous occupons aussi des performances et du référencement : un site lent vous coûte des clients avant même qu’ils vous lisent.',
          },
          {
            title: 'Logiciels métier',
            desc: 'L’outil qui remplace le tableur partagé, les relances par e-mail et les doubles saisies. Il suit vos règles de gestion, pas celles d’un éditeur qui vend le même produit à tout le monde.',
          },
          {
            title: 'Automatisation et intelligence artificielle',
            desc: 'Des scripts, des intégrations entre vos outils existants, parfois un modèle de langage. Nous vous dirons aussi quand l’IA n’apporte rien à votre problème, ce qui arrive souvent.',
          },
        ],
      },
      how: {
        title: 'Comment un projet démarre',
        items: [
          {
            title: 'Un premier échange',
            desc: 'Une heure au téléphone ou chez vous, pour comprendre ce que vous faites et ce qui vous coince. Gratuit, et sans engagement.',
          },
          {
            title: 'Une proposition écrite',
            desc: 'Périmètre, délai, prix. Si le projet nous semble trop gros pour commencer d’un coup, nous vous proposons de le découper.',
          },
          {
            title: 'Des livraisons régulières',
            desc: 'Vous testez une version utilisable très tôt, puis toutes les deux semaines. Ce qui ne sert pas est abandonné en cours de route.',
          },
        ],
      },
      deliver: {
        title: 'Ce que vous récupérez',
        intro: 'À la fin d’un projet, tout est chez vous. Ce n’est pas une option payante.',
        items: [
          { title: 'Le code source', desc: 'Dans votre dépôt, à votre nom, avec l’historique complet.' },
          {
            title: 'La documentation',
            desc: 'Installation, exploitation, décisions techniques et leurs raisons.',
          },
          {
            title: 'Les accès',
            desc: 'Hébergement, base de données, noms de domaine : les comptes sont les vôtres.',
          },
          {
            title: 'Une passation',
            desc: 'Si vous reprenez la main en interne, nous formons la personne qui prend la suite.',
          },
        ],
      },
    },

    souverainete: {
      metaTitle: 'Souveraineté numérique',
      metaDescription:
        'Nous hébergeons vos projets chez des prestataires soumis au droit européen, et nous construisons les plateformes qui manquent encore en Europe.',
      title: 'Vos données n’ont pas à quitter l’Europe.',
      intro:
        'Nous choisissons des prestataires soumis au droit européen pour tout ce que nous déployons, et nous construisons ceux qui manquent encore.',
      problem: {
        title: 'Pourquoi cela compte',
        paragraphs: [
          'Une entreprise américaine reste soumise au CLOUD Act où que se trouvent ses serveurs, y compris dans un centre de données situé en France. Une administration peut lui demander vos données sans passer devant un juge français, et lui interdire de vous prévenir.',
          'Pendant longtemps, cette question restait théorique face à des outils américains nettement meilleurs. L’écart technique s’est réduit, les alternatives européennes sont devenues utilisables, et l’instabilité politique a rendu le risque plus concret. À partir de là, continuer par habitude n’est plus un choix neutre.',
        ],
      },
      practice: {
        title: 'Ce que nous appliquons à vos projets',
        items: [
          {
            title: 'Hébergement européen',
            desc: 'En France quand c’est possible, chez un fournisseur européen sinon. Le contrat et le droit applicable sont européens.',
          },
          {
            title: 'Mesure d’audience sans transfert',
            desc: 'Des statistiques utiles, sans cookie de suivi et sans envoyer vos visiteurs à un régisseur publicitaire.',
          },
          {
            title: 'Même règle partout',
            desc: 'E-mails transactionnels, stockage de fichiers, sauvegardes, service de paiement : chaque brique passe le même filtre.',
          },
          {
            title: 'Aucune exception silencieuse',
            desc: 'S’il n’existe aucune option européenne acceptable, nous vous le disons et nous décidons ensemble. Jamais par défaut.',
          },
        ],
      },
      building: {
        title: 'Ce que nous construisons',
        intro:
          'Certaines briques n’ont pas encore d’équivalent européen sérieux. Plutôt que d’attendre, nous les développons.',
        items: [
          {
            title: 'Plateforme de déploiement',
            desc: 'Déployer une application aussi simplement qu’avec les outils américains, sur une infrastructure européenne. En construction.',
          },
          {
            title: 'Hébergement de code',
            desc: 'Dépôts, revue de code, intégration continue. Prévu après la plateforme de déploiement.',
          },
        ],
        note: 'Ces deux produits ne sont pas encore disponibles. Si le sujet vous concerne, écrivez-nous : nous cherchons des premiers utilisateurs pour les éprouver en conditions réelles.',
      },
    },

    methode: {
      metaTitle: 'Notre méthode',
      metaDescription:
        'Quatre étapes, des livraisons toutes les deux semaines, et un projet que vous pouvez reprendre à tout moment.',
      title: 'Comment nous travaillons.',
      intro:
        'Quatre étapes, quelques semaines par projet. Vous voyez le produit avancer en continu et vous gardez la main du début à la fin.',
      stepsTitle: 'Les quatre étapes',
      refusals: {
        title: 'Ce que nous ne faisons pas',
        items: [
          {
            title: 'Un forfait sur un périmètre inconnu',
            desc: 'Annoncer un prix ferme sur un besoin que personne n’a encore exploré, c’est se tromper ou se protéger. Nous cadrons d’abord, nous chiffrons ensuite.',
          },
          {
            title: 'Du code que vous ne pourriez pas reprendre',
            desc: 'Pas de framework maison, pas de dépendance à une personne. Une autre équipe doit pouvoir prendre la suite en lisant le dépôt.',
          },
          {
            title: 'Un hébergement que nous contrôlons',
            desc: 'Les comptes sont ouverts à votre nom dès le premier jour. Nous partir ne doit jamais couper votre service.',
          },
        ],
      },
    },

    manifeste: {
      metaTitle: 'Manifeste',
      metaDescription:
        'Pourquoi nous pensons que la dépendance aux fournisseurs américains est devenue un risque, et ce que nous en faisons.',
      title: 'Manifeste',
      intro: 'Ce en quoi nous croyons, et ce que cela change concrètement dans nos projets.',
      valuesTitle: 'Ce que cela change, concrètement',
      paragraphs: [
        'Nous ne pensons pas que les outils américains soient mauvais. La plupart sont excellents, et nous les avons utilisés pendant des années. Le problème n’est pas leur qualité, c’est la position dans laquelle ils placent celui qui en dépend : un changement de tarif, de conditions ou de politique, et vous n’avez aucun recours.',
        'Une entreprise qui ne maîtrise ni son code, ni son hébergement, ni ses données ne possède pas vraiment son outil de travail. Elle le loue, à des conditions qu’elle ne négocie pas.',
        'Notre métier consiste à rendre cette dépendance choisie plutôt que subie. Parfois cela veut dire migrer, souvent cela veut dire simplement ne pas commencer du mauvais côté.',
      ],
    },

    contact: {
      metaTitle: 'Contact',
      metaDescription:
        'Écrivez-nous pour parler de votre projet, de votre infrastructure, ou simplement poser une question. Réponse sous 24 heures ouvrées.',
      helpTitle: 'Ce qu’il est utile de nous dire',
      helpItems: [
        'Ce que fait votre entreprise, en une phrase.',
        'Le problème que vous voulez régler, ou la tâche qui vous prend trop de temps.',
        'Si vous avez déjà un outil en place, et lequel.',
        'Votre échéance, si vous en avez une.',
      ],
      helpNote:
        'Rien de tout cela n’est obligatoire. Un message de trois lignes suffit pour commencer.',
    },
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
          { label: 'Développement sur mesure', href: '/conseil' },
          { label: 'Souveraineté numérique', href: '/souverainete' },
          { label: 'Méthode', href: '/methode' },
        ],
      },
      {
        key: 'entreprise',
        title: 'L’entreprise',
        links: [
          { label: 'Manifeste', href: '/manifeste' },
          { label: 'Engagements', href: '/#engagements' },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        links: [
          { label: 'Nous écrire', href: 'mailto:contact@lafrancaisedulogiciel.fr' },
          { label: 'Démarrer un projet', href: '/contact' },
        ],
      },
    ],
    /** {year} is replaced at render time. */
    copyright: '© {year} La Française du Logiciel. Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
} as const
