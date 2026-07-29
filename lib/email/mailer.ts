export interface EmailAddress {
  email: string
  name?: string
}

export interface EmailMessage {
  to: EmailAddress | readonly EmailAddress[]
  subject: string
  text: string
  html?: string
  replyTo?: EmailAddress
}

/** Provider-neutral contract used by every application mail flow. */
export interface Mailer {
  send(message: EmailMessage): Promise<void>
}

/** Records messages instead of delivering them, for tests and local callers. */
export class RecordingMailer implements Mailer {
  readonly sent: EmailMessage[] = []

  async send(message: EmailMessage): Promise<void> {
    this.sent.push(message)
  }
}

export class MailerConfigurationError extends Error {
  override name = 'MailerConfigurationError'
}

export class MailDeliveryError extends Error {
  override name = 'MailDeliveryError'

  constructor(
    message: string,
    readonly status?: number,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}
