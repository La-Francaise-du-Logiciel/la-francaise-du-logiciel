'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Check, Copy } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { getMessages, type Locale } from '@/lib/i18n'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Posts to /api/contact, which relays the message through the configured
 * mail provider. The direct address sits underneath, both as the fallback
 * when the relay fails and for people who prefer their inbox.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale)
  const contact = t.contact
  const f = t.pages.contact.form

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(0)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard unavailable: the address is selectable text anyway. */
    }
  }

  const fieldClass =
    'w-full rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors duration-300 ease-out focus:border-[var(--blue)]'

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
            {f.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.namePlaceholder}
            autoComplete="organization"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
            {f.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={f.emailPlaceholder}
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            {f.messageLabel}
          </label>
          <textarea
            id="contact-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={f.messagePlaceholder}
            rows={7}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </div>

        {/* Honeypot: hidden from people, filled by bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="arrow-hover sheen inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground disabled:opacity-60"
          >
            {status === 'sending' ? f.sending : f.submit}
            <HoverArrow />
          </button>
          <p className="text-xs leading-relaxed text-muted-foreground">{f.hint}</p>
        </div>

        {status === 'sent' ? (
          <p role="status" className="text-sm font-medium text-[var(--blue)]">
            {f.success}
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="status" className="text-sm font-medium text-[var(--red)]">
            {f.error}
          </p>
        ) : null}
      </form>

      <div className="mt-10 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">{f.directLabel}</p>
        <div className="mt-3 flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-3">
          <a href={`mailto:${contact.email}`} className="text-sm font-medium text-foreground">
            {contact.email}
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[var(--blue)]" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? f.copied : f.copy}
          </button>
        </div>
      </div>
    </div>
  )
}
