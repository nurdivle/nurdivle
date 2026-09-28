import type { Media, Project } from '@/payload-types'

export const getFeaturedProjects = (projects: Project[]): Project[] =>
  projects.filter((project) => project.featured === true).slice(0, 4)

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
