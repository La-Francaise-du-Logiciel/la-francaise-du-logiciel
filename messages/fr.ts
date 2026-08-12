import { ANCHORS, anchorPath, path } from '@/lib/routes'

/**
 * French message catalogue. Every user-visible string on the site lives
 * here, including alt text, aria labels and metadata, so a new locale
 * is a sibling file plus an entry in lib/i18n.ts.
 *
 * Links resolve through lib/routes so a slug is renamed in one place.
 *
 * ` ` is the narrow no-break space French typography puts before
 * `:` `;` `!` `?`; ` ` is the regular no-break space.
 */
export const fr = {
  metadata: {
    title: 'La Française du Logiciel · Logiciels métier, applications web et audit',
    description:
      'Logiciels métier, applications web, automatisations et audit de l’existant. Nous livrons le code et la documentation, et pouvons assurer le suivi technique dans la durée.',
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
    language: {
      /** Names the FR/EN control for screen readers. */
      label: 'Langue',
      /** {language} is replaced by the target language's own name. */
      switchTo: 'Afficher le site en {language}',
    },
    items: [
      { key: 'conseil', label: 'Conseil', href: path('conseil', 'fr') },
      { key: 'audit', label: 'Audit', href: path('audit', 'fr') },
      { key: 'methode', label: 'Méthode', href: path('methode', 'fr') },
      { key: 'convictions', label: 'Convictions', href: path('convictions', 'fr') },
    ],
  },

  hero: {
    /* `accent` italicises the line and sets it in blue. */
    headline: [
      { text: 'Nous développons', accent: false },
      { text: 'les logiciels qui', accent: false },
      { text: 'font avancer', accent: false },
      { text: 'votre activité.', accent: true },
    ],
    intro:
      'Logiciels métier, applications web, automatisations et audit de l’existant. Nous livrons le code et la documentation. Si vous le souhaitez, nous assurons aussi dans la durée l’administration des comptes techniques, la maintenance et le suivi de votre environnement.',
    ctaPrimary: 'Démarrer un projet',
    ctaSecondary: 'Ce que nous faisons',
  },

  axes: {
    title: 'Ce que nous faisons.',
    conseil: {
      title: 'Développement sur mesure',
      body: 'Nous partons de votre fonctionnement réel, pas d’un cahier des charges théorique. L’objectif est de remplacer les tableurs, les copier-coller et les allers-retours par e-mail par un outil qui fait le travail à leur place. Vous repartez avec le code, la documentation et la possibilité de reprendre entièrement la main.',
      imageAlt:
        'Espace de travail d’un développeur, écran affichant du code dans une ambiance sombre',
      link: 'Voir le détail',
      href: path('conseil', 'fr'),
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
    audit: {
      title: 'Audit et reprise d’existant',
      body: 'Nous regardons l’état réel du code, de son environnement technique et des données avant de recommander quoi que ce soit. Vous savez ce qui menace de casser, ce qui coûte cher à maintenir et ce qui mérite d’être conservé.',
      imageAlt: 'Structure logicielle abstraite composée de blocs bleus et rouges',
      link: 'Voir le détail',
      href: path('audit', 'fr'),
      items: [
        {
          title: 'Code et architecture',
          desc: 'Qualité, sécurité, dépendances, tests et capacité d’une nouvelle équipe à reprendre.',
        },
        {
          title: 'Déploiement et données',
          desc: 'Déploiement, sauvegardes, accès, flux de données et points de fragilité.',
        },
        {
          title: 'Coût de remise à niveau',
          desc: 'Un chiffrage par priorité, pour décider avec autre chose qu’une impression.',
        },
        {
          title: 'Reprendre ou refaire',
          desc: 'Une comparaison chiffrée des deux chemins, avec leurs risques et leurs délais.',
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
        desc: 'Le code et la documentation vous sont livrés. Si vous voulez continuer sans nous, nous vous transférons le contrôle complet des comptes techniques et organisons la passation.',
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
        title: 'Européen par préférence',
        desc: 'À niveau de service comparable, nous préférons les fournisseurs européens. Le choix reste expliqué et adapté à votre contexte.',
      },
      {
        title: 'Réversible',
        desc: 'Vous devez pouvoir partir. Le code, les données et la documentation vous sont livrés, et le contrôle des comptes techniques vous est transféré sur demande.',
      },
    ],
    readMore: 'Pourquoi nous faisons ça',
  },

  commitments: {
    title: 'Nos engagements.',
    intro:
      'Nous démarrons : pas encore de logos clients à aligner ni de chiffres à vous vendre. À la place, voici ce sur quoi vous pouvez nous tenir dès le premier projet.',
    /* The figures live in the component; only the unit is typography, and
       French sets a no-break space before the percent sign. */
    stats: [
      { key: 'contact', suffix: '', label: 'interlocuteur, du premier échange jusqu’à la livraison' },
      { key: 'response', suffix: '', label: 'heures ouvrées pour une première réponse' },
      { key: 'ownership', suffix: ' %', label: 'du code et de la documentation livrés, sans rétention' },
      { key: 'founders', suffix: '', label: 'fondateurs directement impliqués dans chaque projet' },
    ],
  },

  projects: {
    title: 'Nos projets.',
    intro:
      'À côté de nos missions clients, nous travaillons sur les produits qui pourront rendre l’indépendance technologique plus simple demain. Ils ne font pas encore partie de nos prestations.',
    items: [
      {
        title: 'Plateforme de déploiement',
        status: 'En construction',
        desc: 'Déployer une application aussi simplement qu’avec les grands acteurs américains, en s’appuyant sur des fournisseurs européens.',
      },
      {
        title: 'Forge logicielle',
        status: 'À l’étude',
        desc: 'Dépôts, revue de code et intégration continue dans un outil européen pensé pour les petites équipes.',
      },
    ],
    note: 'Ces produits ne sont pas encore disponibles. Nous partageons leur état réel et les ferons évoluer au contact de leurs premiers utilisateurs.',
    cta: 'Échanger sur ces projets',
  },

  contact: {
    title: 'Dites-nous ce qui vous amène.',
    intro:
      'Un projet précis, une idée encore floue, ou un existant sur lequel vous voulez un avis extérieur. Le premier échange ne vous engage à rien, et vous parlerez directement à l’un des deux fondateurs.',
    email: 'contact@francaisedulogiciel.fr',
    write: 'Nous écrire',
    responseTime: 'Réponse sous 24 heures ouvrées',
  },

  pages: {
    conseil: {
      metaTitle: 'Développement sur mesure',
      metaDescription:
        'Logiciels métier, applications web et automatisations construits sur mesure, livrés avec le code, la documentation et une passation complète si nécessaire.',
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
            desc: 'Périmètre, délai, prix ferme. Et la liste de ce que nous avons décidé de laisser de côté pour la première version : un projet qui échoue est presque toujours un projet dont personne n’a osé réduire le périmètre.',
          },
          {
            title: 'Audit',
            desc: 'L’état réel du code, de l’infrastructure et des données. Ce qui menace de casser, ce qui coûte cher à maintenir, ce qui peut être conservé. Vous repartez avec un rapport lisible, une estimation du coût de remise à niveau, et une comparaison chiffrée entre reprendre et refaire.',
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
            title: 'La maîtrise des accès',
            desc: 'Nous pouvons administrer les comptes techniques pendant la mission. À votre demande, nous vous en transférons le contrôle complet, avec les droits d’administration et les moyens de récupération.',
          },
          {
            title: 'Une passation',
            desc: 'Si vous reprenez la main en interne, nous formons la personne qui prend la suite.',
          },
        ],
      },
    },

    audit: {
      metaTitle: 'Audit applicatif et reprise d’existant',
      metaDescription:
        'Audit applicatif du code, du déploiement et des données : risques, coûts de maintenance, plan de remise à niveau et comparaison entre reprendre et refaire.',
      title: 'Avant de reprendre ou de refaire, il faut savoir ce qui existe vraiment.',
      intro:
        'Nous examinons votre application et son environnement technique sans présumer de la conclusion. Le but n’est pas de trouver des fautes : c’est de vous donner les éléments techniques et financiers pour décider de la suite.',
      scope: {
        title: 'Ce que nous examinons',
        items: [
          {
            title: 'Le code',
            desc: 'Architecture, lisibilité, dépendances, tests, sécurité et capacité d’une nouvelle équipe à reprendre le projet sans repartir de zéro.',
          },
          {
            title: 'L’environnement technique',
            desc: 'Déploiements, sauvegardes, supervision, environnements et accès qui font fonctionner l’application. Nous vérifions surtout ce qui peut interrompre le service.',
          },
          {
            title: 'Les données',
            desc: 'Structure, qualité, doublons, droits d’accès, flux et migrations à prévoir. Une refonte réussie commence souvent par comprendre ce qui doit survivre.',
          },
          {
            title: 'Les coûts cachés',
            desc: 'Licences, factures d’infrastructure, opérations manuelles et temps passé à contourner l’outil. Le coût réel ne se lit pas seulement dans le code.',
          },
        ],
      },
      perimeter: {
        title: 'Un périmètre clair avant de commencer',
        paragraphs: [
          'Nous auditons l’application et ce qui la fait fonctionner : son code, son architecture, son déploiement, sa base de données et ses flux. Nous ne présentons pas cet examen comme un audit complet de votre système d’information.',
          'Si le diagnostic doit couvrir la sécurité offensive, les réseaux, une infrastructure complexe ou la conformité réglementaire, nous réunissons les spécialistes nécessaires avant de vous proposer un périmètre et un prix.',
        ],
      },
      deliver: {
        title: 'Ce que vous récupérez',
        intro:
          'Pas un document réservé aux développeurs : une base de décision que la direction, les équipes métier et l’équipe technique peuvent lire ensemble.',
        items: [
          {
            title: 'Un rapport lisible',
            desc: 'Les constats sont expliqués en langage clair, illustrés par des faits et classés par niveau de risque.',
          },
          {
            title: 'Un plan d’action',
            desc: 'Ce qu’il faut sécuriser maintenant, remettre à niveau ensuite, et ce qui peut raisonnablement attendre.',
          },
          {
            title: 'Une estimation chiffrée',
            desc: 'Le coût et le délai de la remise à niveau, avec les hypothèses et les éléments laissés hors périmètre.',
          },
          {
            title: 'Un choix argumenté',
            desc: 'Reprendre ou refaire, comparés sur le coût, le délai, le risque et la durée de vie attendue.',
          },
        ],
      },
      process: {
        title: 'Comment se déroule un audit',
        items: [
          {
            title: 'Cadrage',
            desc: 'Nous échangeons avec les personnes qui utilisent, maintiennent et financent l’outil pour comprendre les symptômes autant que le contexte.',
          },
          {
            title: 'Analyse',
            desc: 'Nous parcourons le code, les données, la documentation et la production avec des accès adaptés. Chaque constat important est vérifié.',
          },
          {
            title: 'Restitution',
            desc: 'Nous présentons les conclusions, répondons aux questions et vous remettons les documents. Vous pouvez les utiliser avec nous ou avec une autre équipe.',
          },
        ],
      },
      decision: {
        title: 'Un audit n’est pas un prétexte pour tout refaire',
        paragraphs: [
          'Une base de code imparfaite peut encore être saine, rentable à conserver et tout à fait reprenable. Nous distinguons les défauts gênants des risques qui menacent réellement l’activité.',
          'Si l’existant peut être stabilisé, nous proposons un chemin pour le reprendre par étapes. Si repartir coûte moins cher ou présente moins de risques à moyen terme, nous l’expliquons avec les mêmes chiffres. La conclusion doit rester valable même si vous confiez la suite à quelqu’un d’autre.',
        ],
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
            title: 'Une dépendance impossible à quitter',
            desc: 'Nous pouvons administrer les comptes techniques pendant la mission. Si vous reprenez la main, nous vous en transférons le contrôle complet avec la documentation nécessaire, sans interruption de service.',
          },
        ],
      },
    },

    convictions: {
      metaTitle: 'Convictions',
      metaDescription:
        'Pourquoi nous concevons des logiciels utiles, réversibles et fondés sur des dépendances choisies plutôt que subies.',
      title: 'Rendre la dépendance choisie, plutôt que subie.',
      intro: 'Ce que nous pensons, et ce que cela change concrètement dans nos projets.',
      valuesTitle: 'Ce que cela change, concrètement',
      paragraphs: [
        'Nous ne pensons pas que les outils américains soient mauvais. La plupart sont excellents, et nous les avons utilisés pendant des années. Le problème n’est pas leur qualité, c’est la position dans laquelle ils placent celui qui en dépend : un changement de tarif, de conditions ou de politique, et vous n’avez aucun recours.',
        'Une entreprise qui ne maîtrise ni son code, ni ses données, ni sa capacité à récupérer les comptes qui font fonctionner son logiciel ne possède pas vraiment son outil de travail. Elle le loue, à des conditions qu’elle ne négocie pas.',
        'Notre métier consiste à rendre cette dépendance choisie plutôt que subie : standards ouverts, exports documentés, contrôle des comptes transférable et choix de fournisseurs expliqué. Nous préférons une solution européenne quand elle répond au besoin, sans en faire une promesse déconnectée de votre contexte.',
        'C’est ce que nous entendons par souveraineté numérique : la capacité de choisir ses dépendances et d’en sortir. Ce n’est pas une prestation d’hébergement, mais un critère de conception pour chaque logiciel et notre cap de long terme.',
      ],
    },

    contact: {
      metaTitle: 'Contact',
      metaDescription:
        'Écrivez-nous pour parler de votre projet, d’un logiciel existant ou simplement poser une question. Réponse sous 24 heures ouvrées.',
      helpTitle: 'Ce qu’il est utile de nous dire',
      helpItems: [
        'Ce que fait votre entreprise, en une phrase.',
        'Le problème que vous voulez régler, ou la tâche qui vous prend trop de temps.',
        'Si vous avez déjà un outil en place, et lequel.',
        'Votre échéance, si vous en avez une.',
      ],
      helpNote:
        'Rien de tout cela n’est obligatoire. Un message de trois lignes suffit pour commencer.',
      form: {
        nameLabel: 'Votre nom ou votre entreprise',
        namePlaceholder: 'Facultatif',
        emailLabel: 'Votre adresse e-mail',
        emailPlaceholder: 'Pour pouvoir vous répondre',
        messageLabel: 'Votre message',
        messagePlaceholder: 'Ce que vous faites, ce qui vous coince, ce que vous voulez construire.',
        submit: 'Envoyer le message',
        sending: 'Envoi en cours…',
        success: 'Message envoyé. Nous vous répondons sous 24 heures ouvrées.',
        error: 'L’envoi a échoué. Écrivez-nous directement à l’adresse ci-dessous.',
        hint: 'Votre message est utilisé uniquement pour vous répondre.',
        directLabel: 'Ou écrivez-nous directement',
        copy: 'Copier',
        copied: 'Copiée',
      },
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
          { label: 'Contact', value: 'contact@francaisedulogiciel.fr' },
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
        'Ce site ne mesure pas son audience et ne charge aucun service tiers. Ce que nous faisons des données que vous nous envoyez.',
      title: 'Ce site ne collecte rien sur vous.',
      intro:
        'La page la plus courte du site, et nous aimerions qu’elle le reste. Voici précisément ce qui se passe quand vous la consultez.',
      sections: [
        {
          title: 'Aucun suivi, aucune mesure d’audience',
          paragraphs: [
            'Ce site ne mesure pas son audience et ne charge aucune ressource depuis un serveur tiers. Les polices de caractères sont servies depuis notre propre domaine plutôt que depuis un service extérieur.',
            'Le seul cookie de ce site enregistre la langue que vous choisissez vous-même dans le menu. Il ne contient que « fr » ou « en », reste sur votre appareil, et ne sert à rien d’autre qu’à vous réafficher le site dans la bonne langue. Tant que vous ne changez pas de langue, aucun cookie n’est déposé.',
            'Vous pouvez le vérifier : ouvrez l’onglet réseau de votre navigateur et regardez la liste des domaines contactés. Il n’y en a qu’un.',
          ],
        },
        {
          title: 'Ce que nous recevons si vous nous écrivez',
          paragraphs: [
            'Si vous nous écrivez, par le formulaire du site ou par e-mail, nous recevons votre adresse, votre message et ce que vous avez choisi d’y mettre. Nous nous en servons pour vous répondre et, le cas échéant, pour préparer une proposition. Rien de tout cela n’est revendu, cédé ou utilisé pour de la prospection.',
            'Nous conservons ces échanges le temps de la relation commerciale, puis trois ans à compter du dernier contact. Les documents comptables liés à un projet suivent les durées légales.',
          ],
        },
        {
          title: 'Où sont hébergées ces données',
          paragraphs: [
            'Le site est hébergé par Scaleway, en France, et les messages du formulaire nous parviennent par son relais e-mail, en France également. Nos e-mails sont hébergés en Europe, chez un prestataire soumis au droit européen. Aucune donnée n’est transférée hors de l’Union européenne.',
          ],
        },
        {
          title: 'Vos droits',
          paragraphs: [
            'Vous pouvez demander l’accès, la rectification ou l’effacement des données vous concernant, ainsi que vous opposer à leur traitement. Une demande à contact@francaisedulogiciel.fr suffit, et nous y répondons sous un mois.',
            'Si notre réponse ne vous convient pas, vous pouvez saisir la Commission nationale de l’informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris.',
          ],
        },
      ],
    },
  },

  footer: {
    tagline:
      'Logiciels métier, applications web, automatisations et audit de l’existant. Basés en France.',
    madeIn: 'Fait en France',
    columns: [
      {
        key: 'offre',
        title: 'Ce que nous faisons',
        links: [
          { label: 'Développement sur mesure', href: path('conseil', 'fr') },
          { label: 'Audit de l’existant', href: path('audit', 'fr') },
          { label: 'Méthode', href: path('methode', 'fr') },
        ],
      },
      {
        key: 'entreprise',
        title: 'L’entreprise',
        links: [
          { label: 'Convictions', href: path('convictions', 'fr') },
          { label: 'Nos projets', href: anchorPath('home', 'fr', ANCHORS.projects) },
          { label: 'Engagements', href: anchorPath('home', 'fr', ANCHORS.commitments) },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        links: [
          { label: 'Nous écrire', href: 'mailto:contact@francaisedulogiciel.fr' },
          { label: 'Démarrer un projet', href: path('contact', 'fr') },
        ],
      },
    ],
    /** {year} is replaced at render time. */
    copyright: '© {year} La Française du Logiciel. Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
} as const
