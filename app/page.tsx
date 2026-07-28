import { Hero } from '@/components/hero'
import { Axes } from '@/components/axes'
import { Commitments } from '@/components/commitments'
import { ManifestoTeaser } from '@/components/manifesto'
import { ContactCta } from '@/components/contact-cta'

export default function Page() {
  return (
    <>
      <Hero />
      <Axes />
      <Commitments />
      <ManifestoTeaser />
      <ContactCta />
    </>
  )
}
