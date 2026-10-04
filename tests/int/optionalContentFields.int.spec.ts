import { describe, expect, it } from 'vitest'

import { Education } from '@/collections/Education'
import { Experiences } from '@/collections/Experiences'
import { Hobbies } from '@/collections/Hobbies'
import { Media } from '@/collections/Media'
import { Projects } from '@/collections/Projects'
import { Sections } from '@/collections/Sections'
import { SkillGroups } from '@/collections/SkillGroups'
import { Profile } from '@/globals/Profile'
import { SiteSettings } from '@/globals/SiteSettings'
import { validateAnchor } from '@/fields/validateAnchor'

const contentSchemas = [
  Education,
  Experiences,
  Hobbies,
  Media,
  Projects,
  Sections,
  SkillGroups,
  Profile,
  SiteSettings,
]

const findRequiredFields = (value: unknown, path = 'fields'): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findRequiredFields(item, `${path}.${index}`))
  }
  if (!value || typeof value !== 'object') return []

  const node = value as Record<string, unknown>
  const ownPath = node.required === true ? [path] : []
  const nestedPaths = ['blocks', 'fields', 'tabs'].flatMap((key) =>
    findRequiredFields(node[key], `${path}.${key}`),
  )

  return [...ownPath, ...nestedPaths]
}

describe('content schema optionality', () => {
  it('does not require any custom content field', () => {
    const requiredFields = contentSchemas.flatMap((schema) =>
      findRequiredFields(schema.fields, schema.slug),
    )

    expect(requiredFields).toEqual([])
  })

  it('allows optional anchors to remain empty', () => {
    expect(validateAnchor(undefined)).toBe(true)
    expect(validateAnchor('')).toBe(true)
    expect(validateAnchor('valid-anchor')).toBe(true)
    expect(validateAnchor('Invalid Anchor')).not.toBe(true)
  })
})
