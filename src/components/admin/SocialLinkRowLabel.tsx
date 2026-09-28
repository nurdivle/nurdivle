'use client'

import { useField, useRowLabel, useTranslation } from '@payloadcms/ui'
import { useCallback, useEffect, useRef } from 'react'

type SocialLinkRowData = {
  label?: string
  platform?: 'email' | 'github' | 'instagram' | 'linkedin' | 'website'
}

const platformLabels: Record<
  NonNullable<SocialLinkRowData['platform']>,
  Record<'en' | 'tr', string>
> = {
  email: { en: 'Email', tr: 'E-posta' },
  github: { en: 'GitHub', tr: 'GitHub' },
  instagram: { en: 'Instagram', tr: 'Instagram' },
  linkedin: { en: 'LinkedIn', tr: 'LinkedIn' },
  website: { en: 'Website', tr: 'Web Sitesi' },
}

export function SocialLinkRowLabel() {
  const { data, path, rowNumber } = useRowLabel<SocialLinkRowData>()
  const { setValue, value } = useField<string>({ path: `${path}.label` })
  const { i18n } = useTranslation()
  const language = i18n.language === 'tr' ? 'tr' : 'en'
  const labelRef = useRef<HTMLSpanElement>(null)
  const renameRequestedRef = useRef(false)
  const customLabel = data.label?.trim()
  const platformLabel = data.platform ? platformLabels[data.platform][language] : undefined
  const fallbackLabel = `${language === 'tr' ? 'Sosyal Bağlantı' : 'Social Link'} ${String(rowNumber ?? 1).padStart(2, '0')}`
  const rowLabel = customLabel || platformLabel || fallbackLabel

  const rename = useCallback(() => {
    const promptLabel = language === 'tr' ? 'Sosyal bağlantıyı yeniden adlandır' : 'Rename social link'
    const nextName = window.prompt(promptLabel, value?.trim() || rowLabel)
    const normalizedName = nextName?.trim()

    if (normalizedName) setValue(normalizedName)
  }, [language, rowLabel, setValue, value])

  useEffect(() => {
    const row = labelRef.current?.closest('.array-field__row')
    if (!row) return

    let injectedButton: HTMLButtonElement | undefined

    const connectOpenMenu = () => {
      if (!renameRequestedRef.current) return

      const menus = Array.from(
        document.querySelectorAll<HTMLElement>('.popup__content .popup-button-list'),
      )
      const openMenu = menus.at(-1)

      if (!openMenu) return

      renameRequestedRef.current = false
      const existingButton = openMenu.querySelector<HTMLButtonElement>(
        `[data-social-link-rename="${path}"]`,
      )
      if (existingButton) return

      injectedButton = document.createElement('button')
      injectedButton.className = 'popup-button-list__button array-actions__action'
      injectedButton.dataset.socialLinkRename = path
      injectedButton.style.order = '-1'
      injectedButton.type = 'button'

      const icon = document.createElement('span')
      icon.ariaHidden = 'true'
      icon.textContent = '✎'

      const text = document.createElement('span')
      text.textContent = language === 'tr' ? 'Yeniden adlandır' : 'Rename'

      injectedButton.append(icon, text)
      injectedButton.addEventListener('click', rename)
      openMenu.prepend(injectedButton)
    }

    const findOpenMenu = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const clickedMenuButton = target.closest('.array-actions__button')
      if (!clickedMenuButton || !row.contains(clickedMenuButton)) return

      renameRequestedRef.current = true
      window.setTimeout(connectOpenMenu, 0)
    }

    const observer = new MutationObserver(() => {
      connectOpenMenu()
    })
    observer.observe(document.body, { attributes: true, childList: true, subtree: true })
    document.addEventListener('click', findOpenMenu, true)

    return () => {
      observer.disconnect()
      injectedButton?.removeEventListener('click', rename)
      injectedButton?.remove()
      document.removeEventListener('click', findOpenMenu, true)
    }
  }, [language, path, rename])

  return (
    <span ref={labelRef}>{rowLabel}</span>
  )
}
