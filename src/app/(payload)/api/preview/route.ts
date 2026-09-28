import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload, type PayloadRequest } from 'payload'

import { isAllowedPreviewPath, isPreviewSecretValid } from '@/lib/preview'
import config from '@/payload.config'

const forbidden = () => new Response('Preview access denied.', { status: 403 })

export async function GET(request: NextRequest): Promise<Response> {
  const path = request.nextUrl.searchParams.get('path')
  const previewSecret = request.nextUrl.searchParams.get('previewSecret')

  if (!isAllowedPreviewPath(path) || !isPreviewSecretValid(previewSecret)) {
    return forbidden()
  }

  const payload = await getPayload({ config })
  let authenticatedUser

  try {
    const authResult = await payload.auth({
      headers: request.headers,
      req: request as unknown as PayloadRequest,
    })
    authenticatedUser = authResult.user
  } catch {
    return forbidden()
  }

  if (!authenticatedUser) return forbidden()

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
