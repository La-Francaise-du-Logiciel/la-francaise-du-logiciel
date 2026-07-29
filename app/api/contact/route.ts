import { NextResponse } from 'next/server'
import { mailer, MailerConfigurationError } from '@/lib/email'

/**
 * Receives the contact form and passes its message to the application's
 * provider-neutral mailer. Provider configuration stays in lib/email.
 */

const MAX_MESSAGE = 5000
const MAX_FIELD = 200
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactPayload {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
}

export async function POST(request: Request) {
  let payload: ContactPayload
  try {
    const value: unknown = await request.json()
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
    }
    payload = value
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  /* Honeypot: real visitors never fill the hidden field. Answer as if
     everything worked, so bots learn nothing. */
  if (typeof payload.website === 'string' && payload.website) {
    return NextResponse.json({ ok: true })
  }

  const name = readString(payload.name).replace(/[\r\n]+/g, ' ').slice(0, MAX_FIELD)
  const email = readString(payload.email).toLowerCase().slice(0, MAX_FIELD)
  const message = readString(payload.message).slice(0, MAX_MESSAGE)

  if (!message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 })
  }

  const to = process.env.CONTACT_TO?.trim()
  if (!to || !EMAIL_PATTERN.test(to)) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const subject = name ? `[Site] Premier contact de ${name}` : '[Site] Premier contact'
  const text = [
    `De : ${name || 'non renseigné'} <${email}>`,
    '',
    message,
  ].join('\n')

  try {
    await mailer.send({
      to: { email: to },
      replyTo: { email, name: name || undefined },
      subject,
      text,
    })
  } catch (error) {
    if (error instanceof MailerConfigurationError) {
      console.error('Mailer configuration error:', error.message)
      return NextResponse.json({ error: 'not_configured' }, { status: 503 })
    }
    console.error('Contact email delivery failed:', error)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}
