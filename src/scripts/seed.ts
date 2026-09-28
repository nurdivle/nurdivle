import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import {
  getDefaultProfile,
  getDefaultSettings,
  sectionSeeds,
  skillGroupSeeds,
} from '@/lib/portfolio/defaults'
import type { Locale } from '@/lib/portfolio/types'

const locales: Locale[] = ['tr', 'en']

async function seed() {
  const payload = await getPayload({ config })

  for (const section of sectionSeeds) {
    const existing = await payload.find({
      collection: 'sections',
      limit: 1,
      locale: 'tr',
      overrideAccess: true,
      where: { key: { equals: section.key } },
    })

    const baseData = {
      _status: 'published' as const,
      anchor: section.anchor.tr,
      enabled: true,
      intro: section.intro.tr,
      key: section.key,
      label: section.label.tr,
      order: section.order,
      showInNavigation: true,
      type: section.type,
    }

    const document = existing.docs[0]
      ? await payload.update({ collection: 'sections', data: baseData, id: existing.docs[0].id, locale: 'tr' })
      : await payload.create({ collection: 'sections', data: baseData, locale: 'tr' })

    await payload.update({
      collection: 'sections',
      data: {
        _status: 'published',
        anchor: section.anchor.en,
        intro: section.intro.en,
        label: section.label.en,
      },
      id: document.id,
      locale: 'en',
    })
  }

  for (const group of skillGroupSeeds) {
    const existing = await payload.find({
      collection: 'skill-groups',
      limit: 1,
      locale: 'tr',
      overrideAccess: true,
      where: { key: { equals: group.key } },
    })

    const document = existing.docs[0]
      ? await payload.update({
          collection: 'skill-groups',
          data: {
            _status: 'published',
            colorKey: group.colorKey,
            iconKey: group.iconKey,
            key: group.key,
            order: group.order,
            skills: group.skills.map((name) => ({ name })),
            title: group.title.tr,
          },
          id: existing.docs[0].id,
          locale: 'tr',
        })
      : await payload.create({
          collection: 'skill-groups',
          data: {
            _status: 'published',
            colorKey: group.colorKey,
            iconKey: group.iconKey,
            key: group.key,
            order: group.order,
            skills: group.skills.map((name) => ({ name })),
            title: group.title.tr,
          },
          locale: 'tr',
        })

    await payload.update({
      collection: 'skill-groups',
      data: {
        _status: 'published',
        skills: group.skills.map((name) => ({ name })),
        title: group.title.en,
      },
      id: document.id,
      locale: 'en',
    })
  }

  for (const locale of locales) {
    const profile = getDefaultProfile(locale)
    const settings = getDefaultSettings(locale)

    await payload.updateGlobal({
      data: {
        _status: 'published',
        aboutParagraphs: profile.aboutParagraphs,
        jobTitle: profile.jobTitle,
        name: profile.name,
        socialLinks: profile.socialLinks,
        tagline: profile.tagline,
      },
      locale,
      slug: 'profile',
    })

    await payload.updateGlobal({
      data: {
        _status: 'published',
        backgroundEffect: settings.backgroundEffect,
        colorTheme: settings.colorTheme,
        defaultLanguage: settings.defaultLanguage,
        defaultSectionKey: settings.defaultSectionKey,
        languageSwitcherPosition: settings.languageSwitcherPosition,
        siteDescription: settings.siteDescription,
        siteTitle: settings.siteTitle,
      },
      locale,
      slug: 'site-settings',
    })
  }

  payload.logger.info('Portfolio starter content seeded for Turkish and English.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
