import { Resend, type CreateEmailOptions, type CreateEmailResponse } from 'resend'
import {
  MailDeliveryError,
  type EmailAddress,
  type EmailMessage,
  type Mailer,
} from '@/lib/email/mailer'

/** The slice of the Resend SDK this adapter uses, so tests can supply a double. */
export interface ResendClient {
  emails: {
    send(payload: CreateEmailOptions): Promise<CreateEmailResponse>
  }
}

export interface ResendMailerOptions {
  apiKey?: string
  from: EmailAddress
  client?: ResendClient
}

/** Resend SDK implementation of the Mailer contract. */
export class ResendMailer implements Mailer {
  private readonly client: ResendClient
  private readonly from: string

  constructor(options: ResendMailerOptions) {
    this.client = options.client ?? new Resend(options.apiKey)
    this.from = formatAddress(options.from)
  }

  async send(message: EmailMessage): Promise<void> {
    const recipients = Array.isArray(message.to) ? message.to : [message.to]

    let result: CreateEmailResponse
    try {
      result = await this.client.emails.send({
        from: this.from,
        to: recipients.map(formatAddress),
        subject: message.subject,
        text: message.text,
        ...(message.html ? { html: message.html } : {}),
        ...(message.replyTo ? { replyTo: formatAddress(message.replyTo) } : {}),
      })
    } catch (error) {
      throw new MailDeliveryError('Resend request failed.', undefined, { cause: error })
    }

    if (result.error) {
      // Provider messages can quote the submitted addresses. Report the stable
      // error code and status only, so addresses stay out of application logs.
      throw new MailDeliveryError(
        `Resend rejected the email (${result.error.name}).`,
        result.error.statusCode ?? undefined,
      )
    }
  }
}

/**
 * Resend takes addresses as `Name <email>` header strings. Display names can
 * come from the contact form, so quote them and drop the characters that would
 * otherwise let a name break out of the header.
 */
function formatAddress(address: EmailAddress): string {
  if (!address.name) return address.email
  const name = address.name.replace(/[\r\n]+/g, ' ').replace(/["\\]/g, '').trim()
  return name ? `"${name}" <${address.email}>` : address.email
}
