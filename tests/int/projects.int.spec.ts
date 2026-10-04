import { describe, expect, it, vi } from 'vitest'

import { validateFeaturedLimit } from '../../src/collections/Projects'
import {
  getFeaturedProjects,
  getProjectHref,
  getProjectLinkLabel,
  getProjectYear,
} from '../../src/lib/portfolio/projects'
import type { Project } from '../../src/payload-types'

const project = (id: number, featured = false): Project => ({
  createdAt: '2024-04-20T00:00:00.000Z',
  featured,
  id,
  key: `project-${id}`,
  order: id,
  summary: 'Summary',
  title: `Project ${id}`,
  updatedAt: '2024-04-20T00:00:00.000Z',
})

describe('project presentation', () => {
  it('returns at most four explicitly featured projects', () => {
    const projects = Array.from({ length: 7 }, (_, index) => project(index + 1, index < 6))
    expect(getFeaturedProjects(projects).map(({ id }) => id)).toEqual([1, 2, 3, 4])
  })

  it('ignores a featured project with no displayable content', () => {
    const emptyProject = {
      createdAt: '2024-04-20T00:00:00.000Z',
      featured: true,
      id: 99,
      updatedAt: '2024-04-20T00:00:00.000Z',
    } as Project

    expect(getFeaturedProjects([emptyProject])).toEqual([])
  })

  it('prefers the live URL and formats archive values', () => {
    const item = { ...project(1), liveUrl: 'https://www.example.com/work/', repositoryUrl: 'https://github.com/example/work' }
    expect(getProjectHref(item)).toBe(item.liveUrl)
    expect(getProjectLinkLabel(item.liveUrl)).toBe('example.com/work')
    expect(getProjectYear(item)).toBe('2024')
    expect(getProjectYear({ ...item, year: 2026 })).toBe('2026')
  })
})

describe('featured project validation', () => {
  it('rejects a fifth featured project', async () => {
    const count = vi.fn().mockResolvedValue({ totalDocs: 4 })
    const result = await validateFeaturedLimit(true, {
      req: { locale: 'tr', payload: { count } },
    } as never)

    expect(result).toContain('en fazla 4')
  })

  it('allows an unfeatured project without querying', async () => {
    const count = vi.fn()
    const result = await validateFeaturedLimit(false, {
      req: { locale: 'en', payload: { count } },
    } as never)

    expect(result).toBe(true)
    expect(count).not.toHaveBeenCalled()
  })
})
