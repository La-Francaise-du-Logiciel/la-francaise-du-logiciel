import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Axes } from '@/components/axes'
import { Approach } from '@/components/approach'
import { Manifesto } from '@/components/manifesto'
import { ContactCta } from '@/components/contact-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Axes />
        <Approach />
        <Manifesto />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
