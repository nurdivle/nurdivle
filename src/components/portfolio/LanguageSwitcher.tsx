'use client'

import { Languages } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import type { MouseEvent } from 'react'

import type { Locale, Localized, SectionRoute } from '@/lib/portfolio/types'

type Props = {
  locale: Locale
  paths?: Localized<string>
  position: 'bottom-right' | 'top-right'
  routes: SectionRoute[]
}

export function LanguageSwitcher({ locale, paths, position, routes }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const targetLocale: Locale = locale === 'tr' ? 'en' : 'tr'

  const handleChange = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const currentAnchor = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    const currentSection = routes.find((route) => {
      const candidates = [route.anchors[locale], ...route.legacyAnchors[locale]]
      return candidates.includes(currentAnchor)
    })
    const targetAnchor = currentSection?.anchors[targetLocale]
    const nextPath = paths?.[targetLocale] ?? pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${targetLocale}`)
    const destination = `${nextPath}${targetAnchor ? `#${targetAnchor}` : ''}`

    document.cookie = `portfolio-locale=${targetLocale}; path=/; max-age=31536000; samesite=lax`
    router.push(destination)
  }

  return (
    <div className={`language-switcher language-switcher--${position}`}>
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} />
      <a
        aria-label={locale === 'tr' ? 'Switch language to English' : 'Dili Türkçe yap'}
        href={paths?.[targetLocale] ?? `/${targetLocale}`}
        onClick={handleChange}
      >
        <span className="language-switcher__current">{locale.toUpperCase()}</span>
        <span aria-hidden="true" className="language-switcher__separator">/</span>
        <span>{targetLocale.toUpperCase()}</span>
      </a>
    </div>
  )
}
