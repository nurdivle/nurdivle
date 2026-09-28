import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const responseHeaders = {
  'Cache-Control': 'no-store, max-age=0',
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.count({ collection: 'users', overrideAccess: true })

    return NextResponse.json({ status: 'ok' }, { headers: responseHeaders })
  } catch {
    return NextResponse.json(
      { status: 'unavailable' },
      { headers: responseHeaders, status: 503 },
    )
  }
}
