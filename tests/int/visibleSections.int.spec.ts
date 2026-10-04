import { describe, expect, it } from 'vitest'

import {
  getVisibleSections,
  hasSectionContent,
} from '../../src/lib/portfolio/getVisibleSections'
import { getFallbackContent } from '../../src/lib/portfolio/defaults'
import type { PortfolioSection } from '../../src/lib/portfolio/types'

type SectionContent = Parameters<typeof hasSectionContent>[1]

const section = (
  type: PortfolioSection['type'],
  customContent?: PortfolioSection['customContent'],
): PortfolioSection => ({ customContent, type } as PortfolioSection)

const content = (): SectionContent => ({
  education: [],
  experiences: [],
  hobbies: [],
  profile: { aboutParagraphs: [{ text: 'About me' }] } as SectionContent['profile'],
  projects: [],
  skillGroups: [],
})

describe('portfolio section visibility', () => {
  it('keeps the about section when it has a paragraph', () => {
    expect(hasSectionContent(section('about'), content())).toBe(true)
  })

  it('hides an empty collection section and shows it after content is added', () => {
    const pageContent = content()
    expect(hasSectionContent(section('projects'), pageContent)).toBe(false)

    pageContent.projects.push({
      featured: true,
      title: 'Project',
    } as SectionContent['projects'][number])
    expect(hasSectionContent(section('projects'), pageContent)).toBe(true)
  })

  it('hides skill groups whose localized skills are empty', () => {
    const pageContent = content()
    pageContent.skillGroups.push({ skills: null } as unknown as SectionContent['skillGroups'][number])

    expect(hasSectionContent(section('skills'), pageContent)).toBe(false)
  })

  it('requires meaningful text in a custom section', () => {
    const blank = { root: { children: [{ children: [{ text: '   ' }] }] } }
    const populated = { root: { children: [{ children: [{ text: 'Hello' }] }] } }

    expect(
      hasSectionContent(
        section('custom', blank as unknown as PortfolioSection['customContent']),
        content(),
      ),
    ).toBe(false)
    expect(
      hasSectionContent(
        section('custom', populated as unknown as PortfolioSection['customContent']),
        content(),
      ),
    ).toBe(true)
  })

  it('returns only sections with content', () => {
    const sections = [section('about'), section('projects'), section('education')]
    expect(getVisibleSections(sections, content()).map(({ type }) => type)).toEqual(['about'])
  })

  it('does not expose starter records when the CMS is unavailable or incomplete', () => {
    const fallback = getFallbackContent('tr')

    expect(getVisibleSections(fallback.sections, fallback)).toEqual([])
    expect(fallback.education).toEqual([])
    expect(fallback.experiences).toEqual([])
    expect(fallback.hobbies).toEqual([])
    expect(fallback.projects).toEqual([])
    expect(fallback.skillGroups).toEqual([])
  })
})
