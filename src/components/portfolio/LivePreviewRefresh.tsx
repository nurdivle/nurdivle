'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreviewRefresh({ serverURL }: { serverURL: string }) {
  const router = useRouter()

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
