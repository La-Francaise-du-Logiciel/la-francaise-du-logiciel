import {
  MailDeliveryError,
  type EmailAddress,
  type EmailMessage,
  type Mailer,
} from '@/lib/email/mailer'

export interface ScalewayTemMailerOptions {
  secretKey: string
  projectId: string
  from: EmailAddress
  region?: string
  baseUrl?: string
  fetchImpl?: typeof fetch
}

interface ScalewayAddress {
  email: string
  name?: string
}

const REQUEST_TIMEOUT_MS = 15_000

/** Scaleway Transactional Email REST API implementation of the Mailer contract. */
export class ScalewayTemMailer implements Mailer {
  private readonly secretKey: string
  private readonly projectId: string
  private readonly from: EmailAddress
  private readonly endpoint: string
  private readonly request: typeof fetch

  constructor(options: ScalewayTemMailerOptions) {
    this.secretKey = options.secretKey
    this.projectId = options.projectId
    this.from = options.from
    const baseUrl = options.baseUrl?.replace(/\/+$/, '') || 'https://api.scaleway.com'
    const region = options.region ?? 'fr-par'
    this.endpoint = `${baseUrl}/transactional-email/v1alpha1/regions/${region}/emails`
    this.request = options.fetchImpl ?? fetch
  }

  async send(message: EmailMessage): Promise<void> {
    const recipients = Array.isArray(message.to) ? message.to : [message.to]

    let response: Response
    try {
      response = await this.request(this.endpoint, {
        method: 'POST',
        headers: {
          'X-Auth-Token': this.secretKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: this.projectId,
          from: toScalewayAddress(this.from),
          to: recipients.map(toScalewayAddress),
          subject: message.subject,
          text: message.text,
          html: message.html,
          additional_headers: message.replyTo
            ? [{ key: 'Reply-To', value: message.replyTo.email }]
            : undefined,
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
    } catch (error) {
      throw new MailDeliveryError('Scaleway TEM request failed.', undefined, { cause: error })
    }

    if (!response.ok) {
      // Provider response bodies can contain submitted addresses. Consume the
      // body for connection reuse, but keep it out of application logs.
      await response.text().catch(() => '')
      throw new MailDeliveryError(
        `Scaleway TEM rejected the email (HTTP ${response.status}).`,
        response.status,
      )
    }
  }
}

function toScalewayAddress(address: EmailAddress): ScalewayAddress {
  return address.name ? { email: address.email, name: address.name } : { email: address.email }
}
