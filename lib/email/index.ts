import {
  MailerConfigurationError,
  type EmailAddress,
  type EmailMessage,
  type Mailer,
} from '@/lib/email/mailer'
import { ResendMailer } from '@/lib/email/providers/resend-mailer'
import { ScalewayTemMailer } from '@/lib/email/providers/scaleway-tem-mailer'

export {
  MailDeliveryError,
  MailerConfigurationError,
  type EmailAddress,
  type EmailMessage,
  type Mailer,
  RecordingMailer,
} from '@/lib/email/mailer'

const SENDER_NAME = 'La Française du Logiciel'
const DEFAULT_PROVIDER = 'scaleway-tem'

let implementation: Mailer | undefined
type Environment = Readonly<Record<string, string | undefined>>
type MailerFactory = (environment: Environment, from: EmailAddress) => Mailer
interface ProviderRegistration {
  readonly sendingDomain: string
  readonly create: MailerFactory
}

/**
 * Provider adapters, keyed by the MAIL_PROVIDER value that selects one.
 * Switching providers is an environment change; adding one is an entry here
 * plus a file under providers/. Neither touches a call site, because the rest
 * of the site depends on the Mailer interface alone.
 */
const providers: Readonly<Record<string, ProviderRegistration>> = {
  resend: {
    sendingDomain: 'mails.francaisedulogiciel.fr',
    create: (environment, from) =>
      new ResendMailer({
        apiKey: requiredEnvironmentVariable(environment, 'RESEND_API_KEY'),
        from,
      }),
  },
  'scaleway-tem': {
    sendingDomain: 'francaisedulogiciel.fr',
    create: (environment, from) =>
      new ScalewayTemMailer({
        secretKey: requiredEnvironmentVariable(environment, 'SCW_SECRET_KEY'),
        projectId: uuidEnvironmentVariable(environment, 'SCW_PROJECT_ID'),
        region: exactEnvironmentVariable(environment, 'SCW_EMAIL_REGION', 'fr-par'),
        from,
      }),
  },
}

export const supportedProviders: readonly string[] = Object.keys(providers)

/**
 * Application-facing mailer. Call sites depend on this and on the Mailer
 * interface; which provider answers is decided by createMailer.
 */
export const mailer: Mailer = {
  send(message: EmailMessage) {
    implementation ??= createMailer()
    return implementation.send(message)
  },
}

export function createMailer(environment: Environment = process.env): Mailer {
  const provider = environment.MAIL_PROVIDER?.trim().toLowerCase() || DEFAULT_PROVIDER
  const registration = providers[provider]
  if (!registration) {
    throw new MailerConfigurationError(
      `Unknown MAIL_PROVIDER "${provider}". Supported: ${supportedProviders.join(', ')}.`,
    )
  }

  const from = requiredEnvironmentVariable(environment, 'CONTACT_FROM').toLowerCase()
  assertSendingDomain(from, registration.sendingDomain)

  return registration.create(environment, { email: from, name: SENDER_NAME })
}

function requiredEnvironmentVariable(environment: Environment, name: string): string {
  const value = environment[name]?.trim()
  if (!value) {
    throw new MailerConfigurationError(`Missing ${name} environment variable.`)
  }
  return value
}

function uuidEnvironmentVariable(environment: Environment, name: string): string {
  const value = requiredEnvironmentVariable(environment, name)
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) {
    throw new MailerConfigurationError(`${name} must be a lowercase UUID.`)
  }
  return value
}

function exactEnvironmentVariable(
  environment: Environment,
  name: string,
  expected: string,
): string {
  const value = environment[name]?.trim() || expected
  if (value !== expected) {
    throw new MailerConfigurationError(`${name} must be ${expected}.`)
  }
  return value
}

function assertSendingDomain(email: string, sendingDomain: string): void {
  if (!/^[^\s@]+@[^\s@]+$/.test(email) || email.split('@').at(-1) !== sendingDomain) {
    throw new MailerConfigurationError(
      `CONTACT_FROM must use the validated ${sendingDomain} domain for the selected provider.`,
    )
  }
}
