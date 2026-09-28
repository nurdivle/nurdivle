'use client'

import { useTranslation } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

export function AdminBackIcon() {
  const iconRef = useRef<SVGSVGElement>(null)
  const { i18n } = useTranslation()
  const label = i18n.language === 'tr' ? 'Geri dön' : 'Go back'

  useEffect(() => {
    const link = iconRef.current?.closest<HTMLAnchorElement>('.step-nav__home')
    if (!link) return

    const labelElement = link.querySelector<HTMLElement>(':scope > span')
    const previousAriaLabel = link.getAttribute('aria-label')
    const previousTitle = labelElement?.getAttribute('title')

    const goBack = (event: MouseEvent) => {
      if (window.history.length <= 1) return

      event.preventDefault()
      window.history.back()
    }

    link.setAttribute('aria-label', label)
    labelElement?.setAttribute('title', label)
    link.addEventListener('click', goBack)

    return () => {
      link.removeEventListener('click', goBack)

      if (previousAriaLabel) link.setAttribute('aria-label', previousAriaLabel)
      else link.removeAttribute('aria-label')

      if (labelElement && previousTitle) labelElement.setAttribute('title', previousTitle)
    }
  }, [label])

  return (
    <svg
      aria-hidden="true"
      className="admin-back-icon"
      fill="none"
      ref={iconRef}
      viewBox="0 0 20 20"
    >
      <path d="M12.5 4.5 7 10l5.5 5.5M7.5 10H17" />
    </svg>
  )
}
