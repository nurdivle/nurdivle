import { render, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const adminLanguage = vi.hoisted(() => ({
  contentLocale: 'tr',
  interfaceLanguage: 'en',
  switchLanguage: vi.fn(),
}))

vi.mock('@payloadcms/ui', () => ({
  useLocale: () => ({ code: adminLanguage.contentLocale }),
  useTranslation: () => ({
    i18n: { language: adminLanguage.interfaceLanguage },
    switchLanguage: adminLanguage.switchLanguage,
  }),
}))

import { AdminLocaleLanguageSync } from '@/components/admin/AdminLocaleLanguageSync'

describe('AdminLocaleLanguageSync', () => {
  beforeEach(() => {
    adminLanguage.contentLocale = 'tr'
    adminLanguage.interfaceLanguage = 'en'
    adminLanguage.switchLanguage.mockReset()
  })

  it('matches the interface language to the selected content locale', async () => {
    render(createElement(AdminLocaleLanguageSync, null, 'Panel'))

    await waitFor(() => expect(adminLanguage.switchLanguage).toHaveBeenCalledWith('tr'))
  })

  it('does not refresh when both languages already match', () => {
    adminLanguage.interfaceLanguage = 'tr'

    render(createElement(AdminLocaleLanguageSync, null, 'Panel'))

    expect(adminLanguage.switchLanguage).not.toHaveBeenCalled()
  })
})
