import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { CursorGlow } from '@/components/portfolio/CursorGlow'
import { LivePreviewRefresh } from '@/components/portfolio/LivePreviewRefresh'
import { PortfolioPage } from '@/components/portfolio/PortfolioPage'
import { getColorThemeVariables, resolveColorTheme } from '@/lib/portfolio/colorThemes'
import { getPortfolioContent } from '@/lib/portfolio/getPortfolioContent'
import { isLocale } from '@/lib/portfolio/types'
import { getSiteUrl } from '@/lib/siteUrl'

type Props = {
  params: Promise<{ lang: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const { isEnabled: isDraftMode } = await draftMode()
  const content = await getPortfolioContent(lang, isDraftMode)
  const canonicalPath = `/${lang}`
  const title = `${content.profile.name} — ${content.settings.siteTitle}`

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/en',
        tr: '/tr',
      },
    },
    description: content.settings.siteDescription,
    metadataBase: getSiteUrl(),
    openGraph: {
      description: content.settings.siteDescription,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      siteName: content.settings.siteTitle,
      title,
      type: 'profile',
      url: canonicalPath,
    },
    robots: isDraftMode ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: 'summary_large_image',
      description: content.settings.siteDescription,
      title,
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const { isEnabled: isDraftMode } = await draftMode()
  const content = await getPortfolioContent(lang, isDraftMode)
  const colorTheme = resolveColorTheme(content.settings.colorTheme)
  const colorThemeVariables = getColorThemeVariables(colorTheme.value) as CSSProperties
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    description: content.settings.siteDescription,
    jobTitle: content.profile.jobTitle,
    name: content.profile.name,
    sameAs: content.profile.socialLinks?.map((link) => link.url).filter(Boolean) ?? [],
    url: new URL(`/${lang}`, getSiteUrl()).toString(),
  }

  return (
    <div className="site-theme" data-color-theme={colorTheme.value} style={colorThemeVariables}>
      <CursorGlow />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replaceAll('<', '\\u003c') }}
        type="application/ld+json"
      />
      {isDraftMode && (
        <>
          <LivePreviewRefresh serverURL={getSiteUrl().origin} />
          <aside className="preview-banner" role="status">
            <span>{lang === 'tr' ? 'Taslak önizleme etkin' : 'Draft preview active'}</span>
            <a href={`/api/preview/exit?path=/${lang}`}>
              {lang === 'tr' ? 'Önizlemeden çık' : 'Exit preview'}
            </a>
          </aside>
        </>
      )}
      <PortfolioPage content={content} />
    </div>
  )
}
