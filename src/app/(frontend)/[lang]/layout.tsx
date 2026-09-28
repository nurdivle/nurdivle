import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '@fontsource-variable/inter'

import { isLocale } from '@/lib/portfolio/types'
import { getSiteUrl } from '@/lib/siteUrl'

import '../styles.css'
import '../portfolio-cards.css'
import '../project-archive.css'

type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
}

export default async function PortfolioLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html data-scroll-behavior="smooth" lang={lang}>
      <body>{children}</body>
    </html>
  )
}
