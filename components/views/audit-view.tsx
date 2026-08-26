import { Database, FileSearch, Scale, Server } from 'lucide-react'
import { ContactCta } from '@/components/contact-cta'
import { PullQuote, RailSection, RowList, StepList } from '@/components/editorial'
import { PageHeader } from '@/components/page-header'
import { CardGrid, Prose } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

/* The audit is the red axis, as on the home page's pair of cards; every
   numeral and rule on this page carries the same colour. The icons repeat
   the home card's, in the same order as its four topics. */
const ACCENT = 'var(--red)'
const SCOPE_ICONS = [FileSearch, Server, Database, Scale]

export function AuditView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.audit

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <RailSection num="01" accent={ACCENT} title={t.scope.title}>
        <CardGrid items={t.scope.items} columns={2} icons={SCOPE_ICONS} accent={ACCENT} />
      </RailSection>
      <RailSection num="02" accent={ACCENT} title={t.perimeter.title} tint>
        <Prose paragraphs={t.perimeter.paragraphs} />
      </RailSection>
      <RailSection num="03" accent={ACCENT} title={t.deliver.title} intro={t.deliver.intro}>
        <RowList items={t.deliver.items} />
      </RailSection>
      <RailSection num="04" accent={ACCENT} title={t.process.title} tint>
        <StepList items={t.process.items} accent={ACCENT} />
      </RailSection>
      <RailSection num="05" accent={ACCENT} title={t.decision.title}>
        <Prose paragraphs={t.decision.paragraphs} />
        <PullQuote text={t.decision.pull} accent={ACCENT} />
      </RailSection>
      <ContactCta locale={locale} />
    </>
  )
}
