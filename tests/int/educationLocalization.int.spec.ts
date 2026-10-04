import { describe, expect, it } from 'vitest'

import { Education } from '@/collections/Education'

describe('education localization', () => {
  it('stores institution names separately for each locale', () => {
    const institution = Education.fields.find(
      (field) => 'name' in field && field.name === 'institution',
    )

    expect(institution).toMatchObject({
      localized: true,
      type: 'text',
    })
    expect(institution).not.toHaveProperty('required', true)
  })
})
