import type { ComponentType } from 'react'
import { AuditView } from '@/components/views/audit-view'
import { ConfidentialiteView } from '@/components/views/confidentialite-view'
import { ConseilView } from '@/components/views/conseil-view'
import { ContactView } from '@/components/views/contact-view'
import { ConvictionsView } from '@/components/views/convictions-view'
import { MentionsLegalesView } from '@/components/views/mentions-legales-view'
import { MethodeView } from '@/components/views/methode-view'
import { SouveraineteView } from '@/components/views/souverainete-view'
import type { Locale } from '@/lib/i18n'
import type { CataloguePageId } from '@/lib/routes'

/**
 * Which body renders which page. The route tree is locale-generic, so this
 * is where a page id turns into a component; a new page is an entry in
 * lib/routes plus one line here, in every language at once.
 */
export const VIEWS: Record<CataloguePageId, ComponentType<{ locale: Locale }>> = {
  conseil: ConseilView,
  audit: AuditView,
  methode: MethodeView,
  convictions: ConvictionsView,
  souverainete: SouveraineteView,
  contact: ContactView,
  mentionsLegales: MentionsLegalesView,
  confidentialite: ConfidentialiteView,
}
