'use client'

import { useLocale, useTranslation } from '@payloadcms/ui'
import { useEffect } from 'react'

export function AdminLocaleLanguageSync({ children }: { children?: React.ReactNode }) {
  const locale = useLocale()
  const { i18n, switchLanguage } = useTranslation()
  const targetLanguage = locale.code === 'en' ? 'en' : 'tr'

  useEffect(() => {
    if (i18n.language === targetLanguage || !switchLanguage) return

    void switchLanguage(targetLanguage)
  }, [i18n.language, switchLanguage, targetLanguage])

  return children
}
