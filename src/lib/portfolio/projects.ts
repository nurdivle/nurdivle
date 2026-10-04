import type { Media, Project } from '@/payload-types'

const hasText = (value: null | string | undefined): boolean => Boolean(value?.trim())

export const hasProjectContent = (project: Project): boolean =>
  hasText(project.title) ||
  hasText(project.summary) ||
  hasText(project.role) ||
  hasText(project.liveUrl) ||
  hasText(project.repositoryUrl) ||
  Boolean(getUploadedImage(project.image)) ||
  Boolean(project.technologies?.some((technology) => hasText(technology.name))) ||
  typeof project.year === 'number'

export const getDisplayableProjects = (projects: Project[]): Project[] =>
  projects.filter(hasProjectContent)

export const getFeaturedProjects = (projects: Project[]): Project[] =>
  getDisplayableProjects(projects).filter((project) => project.featured === true).slice(0, 4)

export const getProjectHref = (project: Project): null | string =>
  project.liveUrl?.trim() || project.repositoryUrl?.trim() || null

export const getProjectYear = (project: Project): string => {
  if (typeof project.year === 'number') return String(Math.trunc(project.year))

  const year = new Date(project.createdAt).getFullYear()
  return Number.isFinite(year) ? String(year) : '—'
}

export const getProjectLinkLabel = (url: string): string => {
  try {
    const parsed = new URL(url)
    return `${parsed.hostname.replace(/^www\./, '')}${parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/$/, '')}`
  } catch {
    return url
  }
}

export const getUploadedImage = (value: Media | null | number | undefined): Media | null =>
  typeof value === 'object' && value?.url ? value : null
