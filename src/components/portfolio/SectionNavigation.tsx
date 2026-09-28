'use client'

import { useEffect, useState } from 'react'

import type { Locale, PortfolioSection } from '@/lib/portfolio/types'

type Props = {
  locale: Locale
  sections: PortfolioSection[]
}

export function SectionNavigation({ locale, sections }: Props) {
  const navigationSections = sections.filter((section) => section.showInNavigation !== false)
  const [activeKey, setActiveKey] = useState(navigationSections[0]?.key ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const key = visible?.target.getAttribute('data-section-key')
        if (key) setActiveKey(key)
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    )

    navigationSections.forEach((section) => {
      const element = document.getElementById(section.anchor)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [navigationSections])

  return (
    <nav
      aria-label={locale === 'tr' ? 'Portfolyo bölümleri' : 'Portfolio sections'}
      className="section-navigation"
    >
      <ol>
        {navigationSections.map((section) => {
          const isActive = activeKey === section.key

          return (
            <li key={section.key}>
              <a aria-current={isActive ? 'location' : undefined} href={`#${section.anchor}`}>
                <span aria-hidden="true" className="section-navigation__dot" />
                <span>{section.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
