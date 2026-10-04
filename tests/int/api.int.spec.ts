import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { Sections } from '@/collections/Sections'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('stores section anchors per locale', async () => {
    const anchor = Sections.fields.find(
      (field) => 'name' in field && field.name === 'anchor',
    )

    expect(anchor).toMatchObject({
      localized: true,
      type: 'text',
    })
    expect(anchor).not.toHaveProperty('required', true)
  })

  it('loads the CMS-managed skill groups without requiring seeded content', async () => {
    const groups = await payload.find({
      collection: 'skill-groups',
      locale: 'tr',
      limit: 20,
    })

    expect(groups.docs).toEqual(expect.any(Array))
    expect(groups.totalDocs).toBeGreaterThanOrEqual(0)
  })
})
