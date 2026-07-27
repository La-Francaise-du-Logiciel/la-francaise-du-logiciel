import { Wordmark } from '@/components/logo'

const COLUMNS = [
  {
    title: 'Conseil',
    links: ['Sites & produits web', 'SaaS sur mesure', 'Automatisation & IA', 'Audit technique'],
  },
  {
    title: 'Souveraineté',
    links: ['Infrastructure', 'Hébergement en France', 'Standards ouverts', 'Conformité RGPD'],
  },
  {
    title: 'Entreprise',
    links: ['Notre approche', 'Manifeste', 'Carrières', 'Contact'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Wordmark />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Conseil logiciel et souveraineté numérique. Conçu et hébergé en France, au service de
              l&apos;indépendance européenne.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-block h-3 w-1.5 rounded-[1px] bg-[var(--blue)]" />
              <span className="inline-block h-3 w-1.5 rounded-[1px] bg-foreground/80" />
              <span className="inline-block h-3 w-1.5 rounded-[1px] bg-[var(--red)]" />
              <span className="ml-1">Made in France</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} La Française du Logiciel. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
