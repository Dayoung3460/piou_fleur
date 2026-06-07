export { metadata, viewport } from 'next-sanity/studio'
export const dynamic = 'force-dynamic'

import StudioPageClient from './StudioPageClient'

export default function StudioPage() {
  return <StudioPageClient />
}
