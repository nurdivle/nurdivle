import type { PortfolioContent, PortfolioSection } from './types'
import { getFeaturedProjects } from './projects'

type SectionContent = Pick<
  PortfolioContent,
  'education' | 'experiences' | 'hobbies' | 'profile' | 'projects' | 'skillGroups'
>

const hasRichText = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') return false

  const node = value as { children?: unknown[]; root?: unknown; text?: unknown }
  if (typeof node.text === 'string' && node.text.trim().length > 0) return true
  if (node.root) return hasRichText(node.root)

  return Array.isArray(node.children) && node.children.some(hasRichText)
}

const hasText = (value: unknown): boolean =>
  typeof value === 'string' && value.trim().length > 0

const hasListItemContent = (item: unknown): boolean => {
  if (!item || typeof item !== 'object') return hasText(item)

  return Object.entries(item).some(([key, value]) => {
    if (['createdAt', 'id', 'order', 'updatedAt'].includes(key)) return false
    if (hasText(value)) return true
    if (Array.isArray(value)) return value.some((entry) => hasListItemContent(entry))
    if (value && typeof value === 'object') return hasListItemContent(value)
    return false
  })
}

export const hasSectionContent = (
  section: PortfolioSection,
  content: SectionContent,
): boolean => {
  switch (section.type) {
    case 'about':
      return content.profile.aboutParagraphs.some((paragraph) => hasText(paragraph.text))
    case 'experience':
      return content.experiences.some((item) => hasListItemContent(item))
    case 'projects':
      return getFeaturedProjects(content.projects).length > 0
    case 'skills':
      return content.skillGroups.some(
        (group) => hasText(group.title) || group.skills?.some((skill) => hasText(skill.name)),
      )
    case 'education':
      return content.education.some((item) => hasListItemContent(item))
    case 'hobbies':
      return content.hobbies.some((item) => hasListItemContent(item))
    case 'custom':
      return hasRichText(section.customContent)
    default:
      return false
  }
}

export const getVisibleSections = (
  sections: PortfolioSection[],
  content: SectionContent,
): PortfolioSection[] => sections.filter((section) => hasSectionContent(section, content))
