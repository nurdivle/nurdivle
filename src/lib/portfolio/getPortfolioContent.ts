import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Section } from '@/payload-types'

import { getFallbackContent } from './defaults'
import { portfolioContentCacheTag } from './cache'
import { getOtherLocale, type Locale, type PortfolioContent, type PortfolioSection } from './types'

const toLegacyAnchors = (section?: Section): string[] =>
  section?.legacyAnchors?.map((item) => item.value) ?? []

const loadPortfolioContent = async (
  locale: Locale,
  includeDrafts = false,
): Promise<PortfolioContent> => {
  const fallback = getFallbackContent(locale)
  const otherLocale = getOtherLocale(locale)

  try {
    const payload = await getPayload({ config })

    const [
      localizedSections,
      otherSections,
      profile,
      settings,
      experiences,
      projects,
      skillGroups,
      education,
      hobbies,
    ] = await Promise.all([
      payload.find({ collection: 'sections', draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.find({ collection: 'sections', draft: includeDrafts, fallbackLocale: false, limit: 100, locale: otherLocale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.findGlobal({ slug: 'profile', draft: includeDrafts, fallbackLocale: false, locale, overrideAccess: includeDrafts }),
      payload.findGlobal({ slug: 'site-settings', draft: includeDrafts, fallbackLocale: false, locale, overrideAccess: includeDrafts }),
      payload.find({ collection: 'experiences', depth: 1, draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.find({ collection: 'projects', depth: 1, draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.find({ collection: 'skill-groups', draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.find({ collection: 'education', draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
      payload.find({ collection: 'hobbies', draft: includeDrafts, fallbackLocale: false, limit: 100, locale, overrideAccess: includeDrafts, sort: 'order' }),
    ])

    const otherByKey = new Map(otherSections.docs.map((section) => [section.key, section]))
    const sections: PortfolioSection[] = localizedSections.docs.length
      ? localizedSections.docs
          .filter((section) => section.enabled !== false)
          .map((section) => {
            const other = otherByKey.get(section.key)
            const anchors = {
              [locale]: section.anchor,
              [otherLocale]: other?.anchor ?? section.anchor,
            } as Record<Locale, string>
            const legacyAnchors = {
              [locale]: toLegacyAnchors(section),
              [otherLocale]: toLegacyAnchors(other),
            } as Record<Locale, string[]>

            return {
              anchor: section.anchor,
              customContent: section.customContent,
              enabled: section.enabled,
              intro: section.intro,
              key: section.key,
              label: section.label,
              order: section.order,
              route: { anchors, key: section.key, legacyAnchors },
              showInNavigation: section.showInNavigation,
              type: section.type,
            }
          })
      : fallback.sections

    return {
      education: education.docs,
      experiences: experiences.docs,
      hobbies: hobbies.docs,
      locale,
      profile: {
        ...fallback.profile,
        ...profile,
        aboutParagraphs: profile.aboutParagraphs ?? [],
        jobTitle: profile.jobTitle?.trim() ?? '',
        name: profile.name?.trim() ?? '',
        socialLinks: profile.socialLinks ?? [],
        tagline: profile.tagline?.trim() ?? '',
      },
      projects: projects.docs,
      sections,
      settings,
      skillGroups: skillGroups.docs,
      source: 'cms',
    }
  } catch {
    return fallback
  }
}

const getPublishedPortfolioContent = unstable_cache(
  (locale: Locale) => loadPortfolioContent(locale, false),
  ['published-portfolio-content-v2'],
  {
    revalidate: 3600,
    tags: [portfolioContentCacheTag],
  },
)

export const getPortfolioContent = cache((locale: Locale, includeDrafts = false) =>
  includeDrafts
    ? loadPortfolioContent(locale, true)
    : getPublishedPortfolioContent(locale),
)
