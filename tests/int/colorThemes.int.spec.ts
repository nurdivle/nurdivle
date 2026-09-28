import { describe, expect, it } from 'vitest'

import {
  colorThemeOptions,
  colorThemes,
  defaultColorTheme,
  getColorThemeVariables,
  resolveColorTheme,
} from '@/lib/portfolio/colorThemes'

const luminance = (hex: string) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

const contrast = (first: string, second: string) => {
  const lighter = Math.max(luminance(first), luminance(second))
  const darker = Math.min(luminance(first), luminance(second))
  return (lighter + 0.05) / (darker + 0.05)
}

describe('Site color themes', () => {
  it('keeps every proposed palette available with unique keys', () => {
    expect(colorThemes).toHaveLength(17)
    expect(new Set(colorThemes.map(({ value }) => value)).size).toBe(colorThemes.length)
    expect(colorThemeOptions.map(({ label }) => label.tr)).toEqual([
      'Mürekkep ve Nane',
      'Okyanus Mürekkebi',
      'Grafit Adaçayı',
      'Gece Mürdümü',
      'Sıcak Antrasit',
      'Saf Antrasit',
      'Duman Mavisi',
      'Derin Petrol',
      'Koyu Zeytin',
      'Bordo Mürekkep',
      'Kahve Mürekkebi',
      'Karbon Siyahı',
      'Titanyum',
      'Mavi Antrasit',
      'Duman Grafit',
      'Sıcak Grafit',
      'Lav Taşı',
    ])
    expect(colorThemeOptions.map(({ label }) => label.en)).toEqual([
      'Ink & Mint',
      'Ocean Ink',
      'Graphite Sage',
      'Night Plum',
      'Warm Anthracite',
      'Pure Anthracite',
      'Smoky Blue',
      'Deep Petrol',
      'Dark Olive',
      'Burgundy Ink',
      'Coffee Ink',
      'Carbon Black',
      'Titanium',
      'Blue Anthracite',
      'Smoke Graphite',
      'Warm Graphite',
      'Lava Stone',
    ])
  })

  it('uses Duman Grafit as a safe default', () => {
    expect(defaultColorTheme).toBe('smoke-graphite')
    expect(resolveColorTheme('unknown').value).toBe(defaultColorTheme)
    expect(getColorThemeVariables()).toMatchObject({
      '--accent': '#adb3ba',
      '--bg': '#15171a',
      '--muted': '#9a9ea3',
    })
  })

  it('keeps text and accent tokens readable on every background', () => {
    for (const theme of colorThemes) {
      expect(
        contrast(theme.text, theme.background),
        `${theme.label} text`,
      ).toBeGreaterThanOrEqual(4.5)
      expect(
        contrast(theme.muted, theme.background),
        `${theme.label} muted`,
      ).toBeGreaterThanOrEqual(4.5)
      expect(
        contrast(theme.accent, theme.background),
        `${theme.label} accent`,
      ).toBeGreaterThanOrEqual(4.5)
    }
  })
})
