# Envoi d'e-mails

Le formulaire de contact (`/contact`) poste vers `app/api/contact/route.ts`, qui
relaie le message via `lib/email`. Resend est le fournisseur par défaut.

## Architecture

Tout le site dépend d'une seule interface, jamais d'un fournisseur :

```
components/contact-form.tsx
        ↓ POST /api/contact
app/api/contact/route.ts   ──►   mailer.send(message)      (interface Mailer)
                                        │
                                 lib/email/index.ts        (registre + config)
                                        │
                    ┌───────────────────┴───────────────────┐
        providers/resend-mailer.ts              providers/scaleway-tem-mailer.ts
```

| Fichier | Rôle |
| --- | --- |
| `lib/email/mailer.ts` | Le contrat : `Mailer`, `EmailMessage`, `EmailAddress`, les erreurs, et `RecordingMailer` pour les tests. |
| `lib/email/index.ts` | Le registre des fournisseurs, la lecture des variables d'environnement, et le `mailer` exporté à l'application. |
| `lib/email/providers/*.ts` | Un adaptateur par fournisseur. Traduit `EmailMessage` vers l'API du fournisseur. |

Le message est décrit en termes neutres (`to`, `subject`, `text`, `html`,
`replyTo`). Aucun champ propre à un fournisseur ne remonte dans le site.

## Configuration

Variables communes, quel que soit le fournisseur :

| Variable | Rôle |
| --- | --- |
| `MAIL_PROVIDER` | `resend` (défaut) ou `scaleway-tem`. |
| `CONTACT_FROM` | Expéditeur. Doit être sur `mails.francaisedulogiciel.fr`, le sous-domaine d'envoi validé chez le fournisseur. |
| `CONTACT_TO` | Boîte de réception qui reçoit les messages du formulaire. |

Variables propres à Resend :

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé d'API Resend, en envoi seul, restreinte au sous-domaine d'envoi. |

Variables propres à Scaleway TEM :

| Variable | Rôle |
| --- | --- |
| `SCW_SECRET_KEY` | Clé d'API de l'application IAM dédiée au site. |
| `SCW_PROJECT_ID` | Projet Scaleway qui porte le domaine validé. |
| `SCW_EMAIL_REGION` | `fr-par`. |

En développement, ces valeurs vont dans `.env` ou `.env.local`, tous deux
ignorés par git. En production, elles vont dans l'environnement de
l'hébergeur. `.env.example` liste les variables et la marche à suivre côté
console.

Le courrier part de `mails.francaisedulogiciel.fr`, un sous-domaine dédié : la
réputation d'envoi du domaine racine ne dépend jamais de ce que poste le
formulaire. `lib/email` refuse tout autre expéditeur, y compris le domaine
racine. Les destinataires, eux, ne sont pas contraints — `CONTACT_TO` reste sur
`francaisedulogiciel.fr`.

### Mettre en place Resend

1. Tableau de bord Resend → **Domains** → ajouter
   `mails.francaisedulogiciel.fr`, publier les enregistrements SPF, DKIM et
   DMARC proposés, puis attendre le statut vérifié.
2. **API Keys** → créer une clé dédiée à ce site, en permission *Sending
   access*, restreinte à ce sous-domaine. Ne pas réutiliser une clé d'un autre
   produit.
3. Renseigner `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO`.

La clé n'est affichée qu'une fois : la stocker directement dans le gestionnaire
de secrets de l'hébergeur.

## Changer de fournisseur

Passer à Scaleway TEM : mettre `MAIL_PROVIDER=scaleway-tem` et renseigner les
variables `SCW_*`. Aucun changement de code, aucun redéploiement de composant.

Ajouter un fournisseur :

1. Créer `lib/email/providers/<nom>-mailer.ts` avec une classe
   `implements Mailer`, qui traduit `EmailMessage` vers son API et lève
   `MailDeliveryError` en cas d'échec.
2. Ajouter une entrée dans `providers` (`lib/email/index.ts`) qui lit ses
   variables d'environnement et construit l'adaptateur.
3. Documenter les variables dans `.env.example` et ici.

Rien d'autre ne bouge : `app/api/contact/route.ts` et les composants ne
connaissent que l'interface.

## Erreurs et confidentialité

| Erreur | Sens | Réponse HTTP |
| --- | --- | --- |
| `MailerConfigurationError` | Variable manquante ou invalide, fournisseur inconnu. | `503 not_configured` |
| `MailDeliveryError` | Le fournisseur a refusé ou n'a pas répondu. | `502 send_failed` |

Les adaptateurs ne recopient jamais le corps de la réponse du fournisseur dans
l'erreur : ces réponses citent les adresses soumises, qui n'ont rien à faire
dans les journaux applicatifs. Seuls le code d'erreur et le statut HTTP sont
conservés.

Le formulaire affiche l'adresse de contact directe sous le formulaire, ce qui
laisse une voie de repli quand la relève échoue.

## Tests

`test/email.test.ts` couvre le contrat, les deux adaptateurs et la sélection du
fournisseur, sans appel réseau : les adaptateurs acceptent un client injecté.

```
pnpm test
```
