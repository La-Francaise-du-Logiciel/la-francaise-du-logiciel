import type { Article } from '@/lib/articles'

/**
 * The launch post. Everything claimed here already stands somewhere on the
 * site — the convictions, the commitments, the projects — gathered into the
 * story of why the company exists.
 */
export const pourquoiNousLancons: Article = {
  slug: 'pourquoi-nous-lancons-la-francaise-du-logiciel',
  locale: 'fr',
  title: 'Pourquoi nous lançons La Française du Logiciel',
  description:
    'Une entreprise française de logiciel sur mesure, née d’une conviction : un outil de travail doit pouvoir se posséder. Voici d’où vient le projet.',
  published: '2026-09-05',
  sections: [
    {
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Louer ses logiciels est devenu la norme. La messagerie, la comptabilité, la gestion des clients, l’outil qui fait tourner la production : presque tout, aujourd’hui, est un abonnement à un service que l’on ne contrôle pas. Nous lançons La Française du Logiciel pour proposer l’autre voie : des logiciels construits sur mesure, livrés avec leur code et leur documentation, que leurs utilisateurs possèdent.',
          ],
        },
      ],
    },
    {
      title: 'Le constat de départ',
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Pendant vingt ans, choisir un fournisseur américain était le choix raisonnable : meilleur, moins cher, mieux intégré. Nous avons fait ce choix nous-mêmes, longtemps, et sans regret. Mais ce n’est plus vrai partout, et le risque juridique, lui, n’a fait que grandir.',
            'Le problème n’est pas la qualité de ces outils. C’est la position dans laquelle ils placent celui qui en dépend : un changement de tarif, de conditions ou de politique, et vous n’avez aucun recours. Une entreprise qui ne maîtrise ni son code, ni ses données, ni les comptes qui font fonctionner son logiciel ne possède pas son outil de travail. Elle le loue, à des conditions qu’elle ne négocie pas.',
            'Nous détaillons cette position dans [nos convictions](/convictions), et ce qu’elle change concrètement sur la page consacrée à la [souveraineté numérique](/souverainete). La version courte : la souveraineté est la capacité de choisir ses dépendances et d’en sortir. Elle ne se décrète pas, elle se construit projet par projet.',
          ],
        },
      ],
    },
    {
      title: 'Ce que nous faisons',
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Deux métiers, qui se répondent. Le premier : le [développement de logiciel sur mesure](/conseil), logiciels métier, applications web et automatisations. Nous partons du fonctionnement réel d’une équipe, pas d’un cahier des charges théorique, et l’objectif est de remplacer les tableurs partagés, les doubles saisies et les relances par e-mail par un outil qui fait le travail à leur place.',
            'Le second : l’[audit d’applications existantes](/audit). Un outil hérité, un prestataire parti, un logiciel que personne n’ose toucher : nous examinons l’état réel du code, du déploiement et des données, puis nous chiffrons les deux chemins, reprendre ou refaire, pour que la décision repose sur autre chose qu’une impression.',
            'Dans les deux cas, la fin du projet est la même : le code dans un dépôt à votre nom, la documentation, et le contrôle des comptes techniques transférable sur simple demande. C’est le cœur de [notre méthode](/methode).',
          ],
        },
      ],
    },
    {
      title: 'Ce que nous construisons à côté',
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'À côté des missions, nous construisons les produits qui rendent l’indépendance technologique plus simple. Le premier, Tensel, est en ligne : de l’hébergement d’applications en Europe, sur une infrastructure opérée à Paris. Vous connectez un dépôt, vous poussez, le reste est géré. Le second, un hébergement de code européen pensé pour les petites équipes, est encore à l’étude.',
            'Ces produits ne sont pas un à-côté marketing. C’est la même conviction, appliquée à nous-mêmes : chaque brique dont dépend un logiciel doit avoir une version que l’on peut choisir en connaissance de cause, et quitter.',
          ],
        },
      ],
    },
    {
      title: 'Ce sur quoi vous pouvez nous tenir',
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Nous démarrons. Pas de logos clients à aligner, pas de chiffres à vendre, et nous préférons le dire nous-mêmes plutôt que de vous le laisser deviner. À la place, des engagements vérifiables dès le premier projet :',
          ],
        },
        {
          kind: 'bullets',
          items: [
            'Un seul interlocuteur, du premier échange jusqu’à la livraison.',
            'Une première réponse sous 24 heures ouvrées.',
            '100 % du code et de la documentation livrés, sans rétention.',
            'Les deux fondateurs directement impliqués dans chaque projet.',
          ],
        },
        {
          kind: 'prose',
          paragraphs: [
            'Ce site est à l’image du reste : pas de mesure d’audience, aucune ressource chargée depuis un serveur tiers, et chaque page se lit aussi en markdown pour les agents. Vous pouvez le vérifier depuis l’onglet réseau de votre navigateur.',
            'Si vous avez un projet, un existant à examiner, ou simplement une question : [écrivez-nous](/contact). Le premier échange ne vous engage à rien, et vous parlerez à l’un des deux fondateurs.',
          ],
        },
      ],
    },
  ],
}
