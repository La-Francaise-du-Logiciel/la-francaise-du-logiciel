import { describe, expect, it } from 'vitest'
import {
  createMailer,
  MailDeliveryError,
  MailerConfigurationError,
  RecordingMailer,
  type Mailer,
} from '@/lib/email'
import {
  ResendMailer,
  type ResendClient,
} from '@/lib/email/providers/resend-mailer'
import { ScalewayTemMailer } from '@/lib/email/providers/scaleway-tem-mailer'

const SCALEWAY_SENDER = {
  email: 'formulaire@francaisedulogiciel.fr',
  name: 'La Française du Logiciel',
}

const RESEND_SENDER = {
  email: 'formulaire@mails.francaisedulogiciel.fr',
  name: 'La Française du Logiciel',
}

const SCALEWAY = {
  secretKey: 'scw-secret',
  projectId: '1f26c6ea-a773-4cc8-9f1a-01815709733a',
  from: SCALEWAY_SENDER,
  region: 'fr-par',
}

const MESSAGE = {
  to: { email: 'contact@francaisedulogiciel.fr' },
  replyTo: { email: 'person@example.fr' },
  subject: '[Site] Premier contact',
  text: 'Bonjour',
}

function recordingFetch(response: Response) {
  const calls: Array<{ url: string; init: RequestInit }> = []
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} })
    return response
  }) as typeof fetch
  return { calls, fetchImpl }
}

function recordingResend(result: unknown) {
  const calls: Array<Record<string, unknown>> = []
  const client = {
    emails: {
      send: async (payload: Record<string, unknown>) => {
        calls.push(payload)
        return { ...(result as object), headers: null }
      },
    },
  } as unknown as ResendClient
  return { calls, client }
}

describe('Mailer port', () => {
  it('accepts an implementation without changing the caller', async () => {
    const recording = new RecordingMailer()
    const mailer: Mailer = recording
    await mailer.send(MESSAGE)

    expect(recording.sent).toEqual([MESSAGE])
  })
})

describe('Scaleway TEM adapter', () => {
  it('posts the provider-neutral message to the regional TEM endpoint', async () => {
    const { calls, fetchImpl } = recordingFetch(new Response('{}', { status: 200 }))
    const mailer = new ScalewayTemMailer({ ...SCALEWAY, fetchImpl })

    await mailer.send(MESSAGE)

    expect(calls).toHaveLength(1)
    expect(calls[0]?.url).toBe(
      'https://api.scaleway.com/transactional-email/v1alpha1/regions/fr-par/emails',
    )
    expect(calls[0]?.init.method).toBe('POST')
    expect(calls[0]?.init.headers).toMatchObject({ 'X-Auth-Token': 'scw-secret' })
    expect(JSON.parse(String(calls[0]?.init.body))).toEqual({
      project_id: SCALEWAY.projectId,
      from: SCALEWAY.from,
      to: [MESSAGE.to],
      subject: MESSAGE.subject,
      text: MESSAGE.text,
      additional_headers: [{ key: 'Reply-To', value: MESSAGE.replyTo.email }],
    })
  })

  it('surfaces provider rejection without including its response body', async () => {
    const { fetchImpl } = recordingFetch(
      new Response('{"message":"address person@example.fr rejected"}', { status: 403 }),
    )
    const mailer = new ScalewayTemMailer({ ...SCALEWAY, fetchImpl })

    const delivery = mailer.send(MESSAGE)
    await expect(delivery).rejects.toBeInstanceOf(MailDeliveryError)
    await expect(delivery).rejects.not.toThrow(/person@example\.fr/)
  })
})

describe('Resend adapter', () => {
  it('hands the provider-neutral message to the SDK in its own shape', async () => {
    const { calls, client } = recordingResend({ data: { id: 'ff3c…' }, error: null })
    const mailer = new ResendMailer({ from: RESEND_SENDER, client })

    await mailer.send(MESSAGE)

    expect(calls).toEqual([
      {
        from: '"La Française du Logiciel" <formulaire@mails.francaisedulogiciel.fr>',
        to: ['contact@francaisedulogiciel.fr'],
        subject: MESSAGE.subject,
        text: MESSAGE.text,
        replyTo: 'person@example.fr',
      },
    ])
  })

  it('quotes a display name so it cannot break out of the address header', async () => {
    const { calls, client } = recordingResend({ data: { id: 'ff3c…' }, error: null })
    const mailer = new ResendMailer({ from: RESEND_SENDER, client })

    await mailer.send({
      ...MESSAGE,
      replyTo: { email: 'person@example.fr', name: 'Ada" <attacker@evil.fr>, x' },
    })

    expect(calls[0]?.replyTo).toBe('"Ada <attacker@evil.fr>, x" <person@example.fr>')
  })

  it('surfaces provider rejection without including its message', async () => {
    const { client } = recordingResend({
      data: null,
      error: { name: 'validation_error', statusCode: 422, message: 'person@example.fr rejected' },
    })
    const mailer = new ResendMailer({ from: RESEND_SENDER, client })

    const delivery = mailer.send(MESSAGE)
    await expect(delivery).rejects.toBeInstanceOf(MailDeliveryError)
    await expect(delivery).rejects.not.toThrow(/person@example\.fr/)
  })

  it('wraps a transport failure as a delivery error', async () => {
    const client = {
      emails: {
        send: async () => {
          throw new Error('socket hang up')
        },
      },
    } as unknown as ResendClient
    const mailer = new ResendMailer({ from: RESEND_SENDER, client })

    await expect(mailer.send(MESSAGE)).rejects.toBeInstanceOf(MailDeliveryError)
  })
})

describe('email configuration', () => {
  const scaleway = {
    CONTACT_FROM: SCALEWAY_SENDER.email,
    SCW_SECRET_KEY: SCALEWAY.secretKey,
    SCW_PROJECT_ID: SCALEWAY.projectId,
    SCW_EMAIL_REGION: 'fr-par',
  }
  const resend = {
    CONTACT_FROM: RESEND_SENDER.email,
    MAIL_PROVIDER: 'resend',
    RESEND_API_KEY: 're_test_key',
  }

  it('builds Scaleway TEM by default, behind the Mailer interface', () => {
    expect(createMailer(scaleway)).toBeInstanceOf(ScalewayTemMailer)
  })

  it('switches provider from the environment alone', () => {
    expect(createMailer(resend)).toBeInstanceOf(ResendMailer)
  })

  it('refuses an unknown provider instead of silently falling back', () => {
    expect(() => createMailer({ ...scaleway, MAIL_PROVIDER: 'sendgrid' })).toThrow(
      /MAIL_PROVIDER/,
    )
  })

  it('requires the selected provider credential', () => {
    expect(() => createMailer({ ...scaleway, SCW_SECRET_KEY: '' })).toThrow(/SCW_SECRET_KEY/)
    expect(() => createMailer({ ...resend, RESEND_API_KEY: '' })).toThrow(/RESEND_API_KEY/)
  })

  it('accepts only the Scaleway-validated root domain by default', () => {
    for (const from of [
      'formulaire@lafrancaisedulogiciel.fr', // lookalike domain
      'formulaire@mails.francaisedulogiciel.fr', // Resend's sending subdomain
      'formulaire@francaisedulogiciel.fr.evil.fr', // suffix impostor
    ]) {
      expect(() => createMailer({ ...scaleway, CONTACT_FROM: from })).toThrow(
        MailerConfigurationError,
      )
    }
  })

  it('accepts only the Resend-validated subdomain when Resend is selected', () => {
    for (const from of [
      'formulaire@lafrancaisedulogiciel.fr', // lookalike domain
      'formulaire@francaisedulogiciel.fr', // Scaleway's root domain
      'formulaire@mails.francaisedulogiciel.fr.evil.fr', // suffix impostor
    ]) {
      expect(() => createMailer({ ...resend, CONTACT_FROM: from })).toThrow(
        MailerConfigurationError,
      )
    }
  })

  it('rejects unsupported regions and malformed project IDs before sending', () => {
    expect(() => createMailer({ ...scaleway, SCW_EMAIL_REGION: 'nl-ams' })).toThrow(
      /SCW_EMAIL_REGION/,
    )
    expect(() => createMailer({ ...scaleway, SCW_PROJECT_ID: 'not-a-project-id' })).toThrow(
      /SCW_PROJECT_ID/,
    )
  })
})
