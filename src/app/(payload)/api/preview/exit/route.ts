import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { isAllowedPreviewPath } from '@/lib/preview'

export async function GET(request: NextRequest): Promise<Response> {
  const requestedPath = request.nextUrl.searchParams.get('path')
  const path = isAllowedPreviewPath(requestedPath) ? requestedPath : '/tr'
  const draft = await draftMode()

  draft.disable()
  redirect(path)
}
