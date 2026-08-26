import { ContactCta } from '@/components/contact-cta'
import { RailSection, RefusalList, StepList } from '@/components/editorial'
import { PageHeader } from '@/components/page-header'
import { getMessages, type Locale } from '@/lib/i18n'
import { ANCHORS } from '@/lib/routes'

/* The method is set in blue, the colour the steps carry everywhere;
   only the refusals' crosses answer it in red. */
const ACCENT = 'var(--blue)'

export function MethodeView({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const t = messages.pages.methode

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      {/* The anchor survives from when the steps were their own section. */}
      <RailSection num="01" accent={ACCENT} title={t.stepsTitle} id={ANCHORS.approach}>
        <StepList items={messages.approach.steps} accent={ACCENT} />
      </RailSection>
      <RailSection num="02" accent={ACCENT} title={t.refusals.title} tint>
        <RefusalList items={t.refusals.items} />
      </RailSection>
      <ContactCta locale={locale} />
    </>
  )
}
