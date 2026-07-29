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
      'Nous développons des sites, des logiciels métier et des automatisations, et, par défaut, nous les déployons sur une infrastructure européenne. Nous construisons aussi les plateformes qui manquent encore pour se passer des géants américains.',
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
      { key: 'convictions', label: 'Convictions', href: '/convictions' },
    ],
  },

  hero: {
    headline: [
      { text: 'Nous développons' },
      { text: 'vos logiciels métier,' },
      { text: 'et nous les hébergeons' },
      { text: 'en Europe, par défaut.', accent: true },
    ],
    intro:
      'Sites, applications métier, automatisations : nous construisons les outils qui font gagner du temps à vos équipes. Nous recommandons un hébergement sous droit européen, hors de portée du CLOUD Act. Le dernier mot vous revient.',
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
        {
          title: 'Reprise d’existant',
          desc: 'Un outil hérité, un prestataire parti : nous reprenons, stabilisons, faisons évoluer.',
        },
      ],
    },
    souverainete: {
      title: 'Sortir de la dépendance américaine',
      body: 'Par défaut, nous déployons chez des prestataires soumis au droit européen, et c’est ce que nous vous recommandons. Mais c’est votre choix : si votre contexte penche pour un fournisseur américain, nous travaillons avec. Et si vous voulez en sortir, nous vous aidons à migrer.',
      imageAlt: 'Salle serveur d’un centre de données éclairée de bleu et de rouge',
      link: 'Voir le détail',
      href: '/souverainete',
      items: [
        {
          title: 'Européen par défaut',
          desc: 'Hébergement, mesure d’audience, envoi d’e-mails : des prestataires soumis au droit européen, sauf décision contraire de votre part.',
        },
        {
          title: 'Conseil et migration',
          desc: 'Un état des lieux de vos dépendances, puis la migration de vos données et de vos outils, à votre rythme.',
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
        title: 'Utile avant tout',
        desc: 'Nous préférons un outil simple que vos équipes utilisent à un outil complet qu’elles évitent. Quitte à vous déconseiller des fonctionnalités en cours de route.',
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
    readMore: 'Pourquoi nous faisons ça',
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
            desc: 'Site public, espace client, back-office, outil interne. Nous nous occupons aussi des performances et du référencement : un site lent vous coûte des clients avant même qu’ils ne vous lisent.',
          },
          {
            title: 'Logiciels métier',
            desc: 'L’outil qui remplace le tableur partagé, les relances par e-mail et les doubles saisies. Il suit vos règles de gestion, pas celles d’un éditeur qui vend le même produit à tout le monde.',
          },
          {
            title: 'Automatisation et intelligence artificielle',
            desc: 'Des scripts, des intégrations entre vos outils existants, parfois un modèle de langage. Nous vous dirons aussi quand l’IA n’apporte rien à votre problème, ce qui arrive souvent.',
          },
          {
            title: 'Reprise d’existant',
            desc: 'Un outil développé par un prestataire qui ne répond plus, un logiciel que personne n’ose toucher : nous reprenons le code, nous le stabilisons, puis nous le faisons évoluer.',
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
        'Européen par défaut, jamais imposé : nous déployons chez des prestataires soumis au droit européen, nous vous aidons à y migrer, et nous construisons les plateformes qui manquent encore.',
      title: 'Vos données n’ont pas à quitter l’Europe.',
      intro:
        'Par défaut, nous déployons chez des prestataires soumis au droit européen, et nous vous aidons à y migrer l’existant. C’est une recommandation forte, pas une condition pour travailler ensemble.',
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
            desc: 'E-mails transactionnels, stockage de fichiers, sauvegardes, service de paiement : chaque service passe le même filtre.',
          },
          {
            title: 'Une préférence, jamais une condition',
            desc: 'Un groupe international, une contrainte de coût, un outil déjà en place : si votre situation penche pour un fournisseur américain ou autre, nous travaillons avec, en vous disant ce que cela implique.',
          },
        ],
      },
      consulting: {
        title: 'Vous accompagner vers plus de souveraineté',
        intro:
          'Si vos données et vos outils sont déjà chez des fournisseurs américains, rien n’oblige à tout refaire d’un coup. Nous intervenons aussi en conseil, pour organiser la transition.',
        items: [
          {
            title: 'État des lieux',
            desc: 'L’inventaire de vos dépendances : hébergement, logiciels, flux de données, et ce que chacune implique juridiquement et contractuellement.',
          },
          {
            title: 'Plan de migration',
            desc: 'Ce qui vaut la peine d’être migré, dans quel ordre, à quel coût. Parfois, la bonne réponse est de ne pas tout bouger.',
          },
          {
            title: 'Mise en œuvre',
            desc: 'La migration de vos données, de vos logiciels et de vos processus, sans interrompre votre activité.',
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
        note: 'Ces deux produits ne sont pas encore disponibles. Si le sujet vous concerne, écrivez-nous : nous cherchons nos premiers utilisateurs pour les éprouver en conditions réelles.',
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
            desc: 'Les comptes sont ouverts à votre nom dès le premier jour. Notre départ ne doit jamais interrompre votre service.',
          },
        ],
      },
    },

    convictions: {
      metaTitle: 'Convictions',
      metaDescription:
        'Pourquoi nous pensons que la dépendance aux fournisseurs américains est devenue un risque, et ce que nous en faisons.',
      title: 'Pourquoi nous refusons de dépendre d’un fournisseur américain.',
      intro: 'Ce que nous pensons, et ce que cela change concrètement dans nos projets.',
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

    mentionsLegales: {
      metaTitle: 'Mentions légales',
      metaDescription:
        'Éditeur, hébergeur et propriété intellectuelle du site de La Française du Logiciel.',
      title: 'Mentions légales',
      intro: 'Les informations exigées par l’article 6 de la loi pour la confiance dans l’économie numérique.',
      publisher: {
        title: 'Éditeur du site',
        entries: [
          { label: 'Éditeur', value: 'Vincent Wendling, entrepreneur individuel (EI)' },
          { label: 'Nom commercial', value: 'La Française du Logiciel' },
          { label: 'Siège', value: '6 rue des Frères Eberts, 67100 Strasbourg, France' },
          { label: 'SIREN', value: '942 561 762' },
          { label: 'SIRET (siège)', value: '942 561 762 00017' },
          { label: 'Code APE', value: '58.29C — Édition de logiciels applicatifs' },
          { label: 'Immatriculation', value: 'Registre national des entreprises (RNE)' },
          { label: 'Directeur de la publication', value: 'Vincent Wendling' },
          { label: 'Contact', value: 'contact@lafrancaisedulogiciel.fr' },
        ],
      },
      host: {
        title: 'Hébergeur',
        entries: [
          { label: 'Hébergeur', value: 'Scaleway, société par actions simplifiée' },
          { label: 'Capital social', value: '142 050 €' },
          { label: 'Siège', value: '8 rue de la Ville-l’Évêque, 75008 Paris, France' },
          { label: 'RCS', value: 'Paris 433 115 904' },
          { label: 'Site', value: 'scaleway.com' },
        ],
      },
      ip: {
        title: 'Propriété intellectuelle',
        paragraphs: [
          'Les textes, la charte graphique et le code de ce site sont la propriété de Vincent Wendling, sauf mention contraire. Leur reproduction sur un autre support, sans autorisation écrite préalable, n’est pas autorisée.',
          'Les logiciels que nous développons pour nos clients ne relèvent pas de cette clause : leurs droits sont cédés au client dans les conditions prévues au contrat.',
        ],
      },
    },

    confidentialite: {
      metaTitle: 'Confidentialité',
      metaDescription:
        'Ce site ne dépose aucun cookie, ne mesure pas son audience et ne charge aucun service tiers. Ce que nous faisons des données que vous nous envoyez.',
      title: 'Ce site ne collecte rien sur vous.',
      intro:
        'La page la plus courte du site, et nous aimerions qu’elle le reste. Voici précisément ce qui se passe quand vous la consultez.',
      sections: [
        {
          title: 'Aucun suivi, aucun cookie',
          paragraphs: [
            'Ce site ne dépose aucun cookie, ne mesure pas son audience et ne charge aucune ressource depuis un serveur tiers. Les polices de caractères sont servies depuis notre propre domaine plutôt que depuis un service extérieur.',
            'Vous pouvez le vérifier : ouvrez l’onglet réseau de votre navigateur et regardez la liste des domaines contactés. Il n’y en a qu’un.',
          ],
        },
        {
          title: 'Ce que nous recevons si vous nous écrivez',
          paragraphs: [
            'Si vous nous envoyez un e-mail, nous recevons votre adresse, votre message et ce que vous avez choisi d’y mettre. Nous nous en servons pour vous répondre et, le cas échéant, pour préparer une proposition. Rien de tout cela n’est revendu, cédé ou utilisé pour de la prospection.',
            'Nous conservons ces échanges le temps de la relation commerciale, puis trois ans à compter du dernier contact. Les documents comptables liés à un projet suivent les durées légales.',
          ],
        },
        {
          title: 'Où sont hébergées ces données',
          paragraphs: [
            'Le site est hébergé par Scaleway, en France. Nos e-mails sont hébergés en Europe, chez un prestataire soumis au droit européen. Aucune donnée n’est transférée hors de l’Union européenne.',
          ],
        },
        {
          title: 'Vos droits',
          paragraphs: [
            'Vous pouvez demander l’accès, la rectification ou l’effacement des données vous concernant, ainsi que vous opposer à leur traitement. Une demande à contact@lafrancaisedulogiciel.fr suffit, et nous y répondons sous un mois.',
            'Si notre réponse ne vous convient pas, vous pouvez saisir la Commission nationale de l’informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris.',
          ],
        },
      ],
    },
  },

  footer: {
    tagline:
      'Nous développons des logiciels métier et, par défaut, nous les déployons sur des infrastructures européennes. Basés en France.',
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
          { label: 'Convictions', href: '/convictions' },
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
