'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Check, Copy } from 'lucide-react'
import { HoverArrow } from '@/components/hover-arrow'
import { format, getMessages } from '@/lib/i18n'

/**
 * A form with no backend, on purpose: submitting composes the e-mail in
 * the visitor's own mail client, so nothing transits through a service.
 * The direct address sits underneath with a copy button for people who
 * would rather start from their inbox.
 */
export function ContactForm() {
  const contact = getMessages().contact
  const f = getMessages().pages.contact.form

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(0)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = name.trim() ? format(f.subjectWithName, { name: name.trim() }) : f.subjectFallback
    const params = new URLSearchParams({ subject, body: message })
    /* URLSearchParams encodes spaces as +, which mail clients show as-is */
    window.location.href = `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`
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
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            {f.messageLabel}
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={f.messagePlaceholder}
            rows={7}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="arrow-hover sheen inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 ease-out hover:bg-[var(--blue)] hover:text-primary-foreground"
          >
            {f.submit}
            <HoverArrow />
          </button>
          <p className="text-xs leading-relaxed text-muted-foreground">{f.hint}</p>
        </div>
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
