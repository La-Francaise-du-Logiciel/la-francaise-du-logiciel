import { Code, Cpu, Layers, Wrench } from 'lucide-react'
import { ContactCta } from '@/components/contact-cta'
import { RailSection, RowList, StepList } from '@/components/editorial'
import { PageHeader } from '@/components/page-header'
import { CardGrid } from '@/components/section'
import { getMessages, type Locale } from '@/lib/i18n'

/* Custom development is the blue axis, as on the home page's pair of
   cards. The icons repeat the home card's, in the same order as its
   four offers. */
const ACCENT = 'var(--blue)'
const BUILD_ICONS = [Code, Layers, Cpu, Wrench]

export function ConseilView({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pages.conseil

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />
      <RailSection num="01" accent={ACCENT} title={t.build.title}>
        <CardGrid items={t.build.items} columns={2} icons={BUILD_ICONS} accent={ACCENT} />
      </RailSection>
      <RailSection num="02" accent={ACCENT} title={t.how.title} tint>
        <StepList items={t.how.items} accent={ACCENT} />
      </RailSection>
      <RailSection num="03" accent={ACCENT} title={t.deliver.title} intro={t.deliver.intro}>
        <RowList items={t.deliver.items} />
      </RailSection>
      <ContactCta locale={locale} />
    </>
  )
}
