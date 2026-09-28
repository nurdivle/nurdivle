import type { Field } from 'payload'
import { describe, expect, it } from 'vitest'

import { Education } from '@/collections/Education'
import { Experiences } from '@/collections/Experiences'
import { Hobbies } from '@/collections/Hobbies'
import { Media } from '@/collections/Media'
import { Projects } from '@/collections/Projects'
import { Sections } from '@/collections/Sections'
import { SkillGroups } from '@/collections/SkillGroups'
import { Users } from '@/collections/Users'
import { Profile } from '@/globals/Profile'
import { SiteSettings } from '@/globals/SiteSettings'

const translatedLabel = {
  en: expect.any(String),
  tr: expect.any(String),
}

const expectTranslatedFields = (fields: Field[]) => {
  for (const field of fields) {
    if ('name' in field) expect(field).toMatchObject({ label: translatedLabel })
    if ('fields' in field && Array.isArray(field.fields)) expectTranslatedFields(field.fields)
  }
}

describe('admin localization', () => {
  it('gives every collection a Turkish and English name', () => {
    for (const collection of [
      Users,
      Media,
      Sections,
      Experiences,
      Projects,
      SkillGroups,
      Education,
      Hobbies,
    ]) {
      expect(collection.labels).toEqual({
        plural: translatedLabel,
        singular: translatedLabel,
      })
    }
  })

  it('gives every custom form field a Turkish and English label', () => {
    for (const entity of [
      Media,
      Sections,
      Experiences,
      Projects,
      SkillGroups,
      Education,
      Hobbies,
      Profile,
      SiteSettings,
    ]) {
      expectTranslatedFields(entity.fields)
    }
  })
})
