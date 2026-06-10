export { metadata, viewport } from 'next-sanity/studio'
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import StudioPageClient from './StudioPageClient'

export default function StudioPage({ params }: { params: { tool?: string[] } }) {
  if (!params.tool || params.tool.length === 0) {
    redirect('/studio/structure')
  }
  return <StudioPageClient />
}
