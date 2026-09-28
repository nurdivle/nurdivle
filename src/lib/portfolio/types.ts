import type {
  Education,
  Experience,
  Hobby,
  Profile,
  Project,
  Section,
  SiteSetting,
  SkillGroup,
} from '@/payload-types'

export const locales = ['tr', 'en'] as const

export type Locale = (typeof locales)[number]
export type Localized<T> = Record<Locale, T>

export type SectionRoute = {
  anchors: Localized<string>
  key: string
  legacyAnchors: Localized<string[]>
}

export type PortfolioSection = Pick<
  Section,
  'customContent' | 'enabled' | 'key' | 'order' | 'showInNavigation' | 'type'
> & {
  anchor: string
  intro?: null | string
  label: string
  route: SectionRoute
}

export type PortfolioContent = {
  education: Education[]
  experiences: Experience[]
  hobbies: Hobby[]
  locale: Locale
  profile: Profile
  projects: Project[]
  sections: PortfolioSection[]
  settings: SiteSetting
  skillGroups: SkillGroup[]
  source: 'cms' | 'fallback'
}

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale)

export const getOtherLocale = (locale: Locale): Locale => (locale === 'tr' ? 'en' : 'tr')
