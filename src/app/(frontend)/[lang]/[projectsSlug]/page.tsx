import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { CursorGlow } from '@/components/portfolio/CursorGlow'
import { LivePreviewRefresh } from '@/components/portfolio/LivePreviewRefresh'
import { ProjectArchivePage } from '@/components/portfolio/ProjectArchivePage'
import { getColorThemeVariables, resolveColorTheme } from '@/lib/portfolio/colorThemes'
import { getPortfolioContent } from '@/lib/portfolio/getPortfolioContent'
import { isLocale, type Locale } from '@/lib/portfolio/types'
import { getSiteUrl } from '@/lib/siteUrl'

type Props = {
  params: Promise<{ lang: string; projectsSlug: string }>
}

const projectSlugs: Record<Locale, string> = { en: 'projects', tr: 'projeler' }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, projectsSlug } = await params
  if (!isLocale(lang) || projectSlugs[lang] !== projectsSlug) return {}

  const { isEnabled: isDraftMode } = await draftMode()
  const content = await getPortfolioContent(lang, isDraftMode)
  const title = lang === 'tr' ? 'Tüm Projeler' : 'All Projects'
  const path = `/${lang}/${projectsSlug}`

  return {
    alternates: {
      canonical: path,
      languages: { en: '/en/projects', tr: '/tr/projeler' },
    },
    description: content.settings.siteDescription,
    metadataBase: getSiteUrl(),
    robots: isDraftMode ? { follow: false, index: false } : undefined,
    title: `${title} — ${content.profile.name}`,
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { lang, projectsSlug } = await params
  if (!isLocale(lang) || projectSlugs[lang] !== projectsSlug) notFound()

  const { isEnabled: isDraftMode } = await draftMode()
  const content = await getPortfolioContent(lang, isDraftMode)
  const colorTheme = resolveColorTheme(content.settings.colorTheme)
  const colorThemeVariables = getColorThemeVariables(colorTheme.value) as CSSProperties

  return (
    <div className="site-theme" data-color-theme={colorTheme.value} style={colorThemeVariables}>
      <CursorGlow />
      {isDraftMode && <LivePreviewRefresh serverURL={getSiteUrl().origin} />}
      <ProjectArchivePage content={content} />
    </div>
  )
}
