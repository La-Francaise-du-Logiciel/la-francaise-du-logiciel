import { Wordmark } from '@/components/logo'
import { format, getMessages } from '@/lib/i18n'

export function SiteFooter() {
  const t = getMessages().footer

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Wordmark />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
            <div className="flex flex-col gap-2.5">
              <span className="font-serif text-lg italic leading-none text-foreground">
                {t.madeIn}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-24 bg-[linear-gradient(90deg,var(--blue),oklch(0.75_0.02_264)_50%,var(--red))]"
              />
            </div>
          </div>

          {t.columns.map((col) => (
            <div key={col.key} className="flex flex-col gap-4">
              <h3 className="text-sm font-medium text-foreground">
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
            {format(t.copyright, { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground">
              {t.legal}
            </a>
            <a href="#" className="text-xs text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground">
              {t.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
