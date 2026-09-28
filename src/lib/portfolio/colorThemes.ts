type ColorThemeDefinition = {
  accent: string
  accentSecondary?: string
  background: string
  label: string
  labelTr: string
  muted: string
  raised?: string
  surface: string
  text: string
  value: string
}

export const colorThemes = [
  { value: 'ink-mint', label: 'Ink & Mint', labelTr: 'Mürekkep ve Nane', background: '#0b1220', raised: '#111c2f', surface: '#16243a', text: '#e6edf7', muted: '#9baac0', accent: '#5eead4', accentSecondary: '#60a5fa' },
  { value: 'ocean-ink', label: 'Ocean Ink', labelTr: 'Okyanus Mürekkebi', background: '#08131f', surface: '#14263a', text: '#e8f0f7', muted: '#93a6b8', accent: '#58d7c3' },
  { value: 'graphite-sage', label: 'Graphite Sage', labelTr: 'Grafit Adaçayı', background: '#111512', surface: '#1b251e', text: '#edf3ee', muted: '#9aa99e', accent: '#97d2ad' },
  { value: 'night-plum', label: 'Night Plum', labelTr: 'Gece Mürdümü', background: '#15111b', surface: '#261e30', text: '#f0ecf5', muted: '#aaa0b4', accent: '#bba4e6' },
  { value: 'warm-anthracite', label: 'Warm Anthracite', labelTr: 'Sıcak Antrasit', background: '#171513', surface: '#29231d', text: '#f3eee7', muted: '#ada398', accent: '#d7b879' },
  { value: 'pure-anthracite', label: 'Pure Anthracite', labelTr: 'Saf Antrasit', background: '#0f1115', surface: '#20242a', text: '#f0f2f5', muted: '#9ba1aa', accent: '#cbd1d9' },
  { value: 'smoky-blue', label: 'Smoky Blue', labelTr: 'Duman Mavisi', background: '#101722', surface: '#1c2a3c', text: '#edf2f8', muted: '#97a5b7', accent: '#8bafd9' },
  { value: 'deep-petrol', label: 'Deep Petrol', labelTr: 'Derin Petrol', background: '#07191b', surface: '#113033', text: '#e7f3f2', muted: '#8ca9a7', accent: '#61cbbb' },
  { value: 'dark-olive', label: 'Dark Olive', labelTr: 'Koyu Zeytin', background: '#15180f', surface: '#292f1c', text: '#f0f2e8', muted: '#a5aa94', accent: '#b4c777' },
  { value: 'burgundy-ink', label: 'Burgundy Ink', labelTr: 'Bordo Mürekkep', background: '#1b1015', surface: '#342029', text: '#f5ecef', muted: '#b09ca4', accent: '#d78c9e' },
  { value: 'coffee-ink', label: 'Coffee Ink', labelTr: 'Kahve Mürekkebi', background: '#18130f', surface: '#30261d', text: '#f3eee8', muted: '#ab9f93', accent: '#c8a47a' },
  { value: 'carbon-black', label: 'Carbon Black', labelTr: 'Karbon Siyahı', background: '#0b0d10', surface: '#181c21', text: '#f1f3f5', muted: '#949ba5', accent: '#b9c0ca' },
  { value: 'titanium', label: 'Titanium', labelTr: 'Titanyum', background: '#121416', surface: '#23272a', text: '#f4f4f3', muted: '#a2a5a8', accent: '#d1d5da' },
  { value: 'blue-anthracite', label: 'Blue Anthracite', labelTr: 'Mavi Antrasit', background: '#0e131a', surface: '#1a2531', text: '#edf2f7', muted: '#919eae', accent: '#9fb4cc' },
  { value: 'smoke-graphite', label: 'Smoke Graphite', labelTr: 'Duman Grafit', background: '#15171a', surface: '#272a2f', text: '#f0f1f2', muted: '#9a9ea3', accent: '#adb3ba' },
  { value: 'warm-graphite', label: 'Warm Graphite', labelTr: 'Sıcak Grafit', background: '#171512', surface: '#29251f', text: '#f4f1ec', muted: '#a59e94', accent: '#c4bdb3' },
  { value: 'lava-stone', label: 'Lava Stone', labelTr: 'Lav Taşı', background: '#121111', surface: '#252121', text: '#f1eeee', muted: '#9e9696', accent: '#b8afaf' },
] as const satisfies readonly ColorThemeDefinition[]

export type ColorThemeKey = (typeof colorThemes)[number]['value']
export type ColorTheme = ColorThemeDefinition & { value: ColorThemeKey }

export const defaultColorTheme: ColorThemeKey = 'smoke-graphite'

export const colorThemeOptions = colorThemes.map(({ label, labelTr, value }) => ({
  label: { en: label, tr: labelTr },
  value,
}))

export const resolveColorTheme = (value?: null | string): ColorTheme =>
  colorThemes.find((theme) => theme.value === value) ??
  colorThemes.find((theme) => theme.value === defaultColorTheme)!

export const getColorThemeVariables = (value?: null | string) => {
  const theme = resolveColorTheme(value)

  const variables: Record<`--${string}`, string> = {
    '--accent': theme.accent,
    '--bg': theme.background,
    '--bg-hover': theme.surface,
    '--muted': theme.muted,
    '--text': theme.text,
  }

  if (theme.accentSecondary) variables['--accent-2'] = theme.accentSecondary
  if (theme.raised) variables['--bg-raised'] = theme.raised

  return variables
}
