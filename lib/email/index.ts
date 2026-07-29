import {
  MailerConfigurationError,
  type EmailMessage,
  type Mailer,
} from '@/lib/email/mailer'
import { ScalewayTemMailer } from '@/lib/email/providers/scaleway-tem-mailer'

export {
  MailDeliveryError,
  MailerConfigurationError,
  type EmailAddress,
  type EmailMessage,
  type Mailer,
  RecordingMailer,
} from '@/lib/email/mailer'

const EMAIL_DOMAIN = 'francaisedulogiciel.fr'
let implementation: Mailer | undefined
type Environment = Readonly<Record<string, string | undefined>>

/**
 * Application-facing mailer. To change providers, replace only the factory
 * below; call sites continue to depend on the Mailer interface.
 */
export const mailer: Mailer = {
  send(message: EmailMessage) {
    implementation ??= createMailer()
    return implementation.send(message)
  },
}

export function createMailer(environment: Environment = process.env): Mailer {
  const from = requiredEnvironmentVariable(environment, 'CONTACT_FROM').toLowerCase()
  assertSendingDomain(from)

  return new ScalewayTemMailer({
    secretKey: requiredEnvironmentVariable(environment, 'SCW_SECRET_KEY'),
    projectId: uuidEnvironmentVariable(environment, 'SCW_PROJECT_ID'),
    region: exactEnvironmentVariable(environment, 'SCW_EMAIL_REGION', 'fr-par'),
    from: {
      email: from,
      name: 'La Française du Logiciel',
    },
  })
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

function assertSendingDomain(email: string): void {
  if (!/^[^\s@]+@[^\s@]+$/.test(email) || email.split('@').at(-1) !== EMAIL_DOMAIN) {
    throw new MailerConfigurationError(
      `CONTACT_FROM must use the validated ${EMAIL_DOMAIN} domain.`,
    )
  }
}
