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

export const hasSectionContent = (
  section: PortfolioSection,
  content: SectionContent,
): boolean => {
  switch (section.type) {
    case 'about':
      return content.profile.aboutParagraphs.some((paragraph) => paragraph.text.trim().length > 0)
    case 'experience':
      return content.experiences.length > 0
    case 'projects':
      return getFeaturedProjects(content.projects).length > 0
    case 'skills':
      return content.skillGroups.length > 0
    case 'education':
      return content.education.length > 0
    case 'hobbies':
      return content.hobbies.length > 0
    case 'custom':
      return hasRichText(section.customContent)
  }
}

export const getVisibleSections = (
  sections: PortfolioSection[],
  content: SectionContent,
): PortfolioSection[] => sections.filter((section) => hasSectionContent(section, content))
