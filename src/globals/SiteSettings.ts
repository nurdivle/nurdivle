import type { GlobalConfig } from 'payload'

import { adminLabel, settingsGroup } from '@/lib/admin/localizedLabels'
import { revalidatePortfolioAfterGlobalChange } from '@/lib/portfolio/cache'
import { colorThemeOptions, defaultColorTheme } from '@/lib/portfolio/colorThemes'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: adminLabel('Site Ayarları', 'Site Settings'),
  access: {
    read: () => true,
  },
  admin: {
    group: settingsGroup,
  },
  hooks: {
    afterChange: [revalidatePortfolioAfterGlobalChange],
  },
  fields: [
    {
      name: 'defaultLanguage',
      type: 'select',
      label: adminLabel('Varsayılan Dil', 'Default Language'),
      defaultValue: 'tr',
      options: [
        { label: 'Türkçe', value: 'tr' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'languageSwitcherPosition',
      type: 'select',
      label: adminLabel('Dil Seçicinin Konumu', 'Language Switcher Position'),
      defaultValue: 'top-right',
      options: [
        { label: adminLabel('Sağ üst', 'Top right'), value: 'top-right' },
        { label: adminLabel('Sağ alt', 'Bottom right'), value: 'bottom-right' },
      ],
    },
    {
      name: 'backgroundEffect',
      type: 'select',
      label: adminLabel('Arka Plan Efekti', 'Background Effect'),
      defaultValue: 'gradient',
      options: [
        { label: adminLabel('Kapalı', 'Off'), value: 'off' },
        { label: adminLabel('Yumuşak geçiş', 'Soft gradient'), value: 'gradient' },
        { label: adminLabel('İkili sayı deseni', 'Binary pattern'), value: 'binary' },
      ],
    },
    {
      name: 'colorTheme',
      type: 'select',
      admin: {
        description: adminLabel(
          'Herkese açık sitede kullanılacak renk paletini seçer.',
          'Selects the color palette used across the public site.',
        ),
      },
      defaultValue: defaultColorTheme,
      label: adminLabel('Site Renk Paleti', 'Site Color Palette'),
      options: colorThemeOptions,
    },
    { name: 'siteTitle', type: 'text', label: adminLabel('Site Başlığı', 'Site Title'), localized: true },
    { name: 'siteDescription', type: 'textarea', label: adminLabel('Site Açıklaması', 'Site Description'), localized: true },
    { name: 'defaultSectionKey', type: 'text', label: adminLabel('Varsayılan Bölüm Anahtarı', 'Default Section Key'), defaultValue: 'about' },
  ],
  versions: { drafts: true },
}
