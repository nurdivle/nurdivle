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

type ProfileParagraph = NonNullable<Profile['aboutParagraphs']>[number] & { text: string }
type ProfileSocialLink = NonNullable<Profile['socialLinks']>[number] & {
  label: string
  platform: NonNullable<NonNullable<Profile['socialLinks']>[number]['platform']>
  url: string
}

export type PortfolioProfile = Omit<
  Profile,
  'aboutParagraphs' | 'jobTitle' | 'name' | 'socialLinks' | 'tagline'
> & {
  aboutParagraphs: ProfileParagraph[]
  jobTitle: string
  name: string
  socialLinks: ProfileSocialLink[]
  tagline: string
}

export type PortfolioSettings = SiteSetting & {
  backgroundEffect: NonNullable<SiteSetting['backgroundEffect']>
  colorTheme: NonNullable<SiteSetting['colorTheme']>
  defaultLanguage: NonNullable<SiteSetting['defaultLanguage']>
  defaultSectionKey: string
  languageSwitcherPosition: NonNullable<SiteSetting['languageSwitcherPosition']>
  siteDescription: string
  siteTitle: string
}

export type PortfolioContent = {
  education: Education[]
  experiences: Experience[]
  hobbies: Hobby[]
  locale: Locale
  profile: PortfolioProfile
  projects: Project[]
  sections: PortfolioSection[]
  settings: PortfolioSettings
  skillGroups: SkillGroup[]
  source: 'cms' | 'fallback'
}

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale)

export const getOtherLocale = (locale: Locale): Locale => (locale === 'tr' ? 'en' : 'tr')
