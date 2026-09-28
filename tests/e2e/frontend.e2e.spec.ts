import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { resolveColorTheme } from '../../src/lib/portfolio/colorThemes'

test.describe('Frontend', () => {
  test('publishes crawler files and security headers', async ({ request }) => {
    const healthResponse = await request.get('/api/health')
    const pageResponse = await request.get('/tr')
    const robotsResponse = await request.get('/robots.txt')
    const sitemapResponse = await request.get('/sitemap.xml')

    await expect(healthResponse).toBeOK()
    expect(healthResponse.headers()['cache-control']).toContain('no-store')
    expect(await healthResponse.json()).toEqual({ status: 'ok' })
    expect(pageResponse.headers()['content-security-policy']).toContain("default-src 'self'")
    expect(pageResponse.headers()['x-content-type-options']).toBe('nosniff')
    await expect(robotsResponse).toBeOK()
    expect(await robotsResponse.text()).toContain('Disallow: /admin/')
    await expect(sitemapResponse).toBeOK()
    expect(await sitemapResponse.text()).toContain('/tr')
    expect(await sitemapResponse.text()).toContain('/en')
  })

  test('rejects draft preview without an administrator session', async ({ request }) => {
    const params = new URLSearchParams({
      path: '/tr',
      previewSecret: process.env.PREVIEW_SECRET!,
    })
    const response = await request.get(`/api/preview?${params.toString()}`, {
      maxRedirects: 0,
    })

    expect(response.status()).toBe(403)
  })

  test('uses the Site Settings color palette tokens', async ({ page }) => {
    await page.goto('/tr')

    const theme = await page.evaluate(() => {
      const themeRoot = document.querySelector<HTMLElement>('.site-theme')!
      const styles = getComputedStyle(themeRoot)
      return {
        accent: styles.getPropertyValue('--accent').trim(),
        background: styles.getPropertyValue('--bg').trim(),
        key: themeRoot.dataset.colorTheme,
        muted: styles.getPropertyValue('--muted').trim(),
      }
    })

    const selectedTheme = resolveColorTheme(theme.key)
    expect(theme).toEqual({
      accent: selectedTheme.accent,
      background: selectedTheme.background,
      key: selectedTheme.value,
      muted: selectedTheme.muted,
    })
  })

  test('shows a neutral glow around a fine pointer', async ({ page }) => {
    await page.goto('/tr')
    const supportsFinePointer = await page.evaluate(() =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    )

    if (!supportsFinePointer) {
      await expect(page.locator('.cursor-glow')).toBeHidden()
      return
    }

    await page.waitForTimeout(200)
    await page.mouse.move(420, 280)

    const glow = page.locator('.cursor-glow')
    await expect(glow).toHaveAttribute('data-visible', 'true')
    await expect(glow).toHaveCSS('pointer-events', 'none')
    expect(await glow.evaluate((element) => getComputedStyle(element).backgroundImage)).toContain(
      '255, 255, 255',
    )
  })

  test('renders localized sections and maps the active anchor when switching language', async ({ page }) => {
    await page.goto('/tr#hakkimda')

    const profileName = (await page.getByRole('heading', { level: 1 }).textContent())?.trim()
    expect(profileName).toBeTruthy()
    await expect(page).toHaveTitle(new RegExp(profileName!))
    await expect(page.getByRole('link', { name: 'Hakkımda', exact: true })).toHaveAttribute(
      'href',
      '#hakkimda',
    )

    await page.getByRole('link', { name: 'Switch language to English' }).click()

    await expect(page).toHaveURL(/\/en#about$/)
    await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'href',
      '#about',
    )
    await expect(page.getByRole('heading', { name: 'About', level: 2 })).toBeVisible()
  })

  test('collapses the sticky two-column layout on mobile without horizontal overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 })
    await page.goto('/tr')

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      shellDisplay: getComputedStyle(document.querySelector('.portfolio-shell')!).display,
      sidebarPosition: getComputedStyle(document.querySelector('.sidebar')!).position,
      skillColumns: getComputedStyle(document.querySelector('.skill-grid')!).gridTemplateColumns,
      viewportWidth: window.innerWidth,
    }))

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.shellDisplay).toBe('block')
    expect(layout.sidebarPosition).toBe('static')
    expect(layout.skillColumns.split(' ')).toHaveLength(1)
  })

  test('uses a two-column skill grid on tablet without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ height: 1024, width: 768 })
    await page.goto('/tr')

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      shellDisplay: getComputedStyle(document.querySelector('.portfolio-shell')!).display,
      skillColumns: getComputedStyle(document.querySelector('.skill-grid')!).gridTemplateColumns,
      viewportWidth: window.innerWidth,
    }))

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.shellDisplay).toBe('block')
    expect(layout.skillColumns.split(' ')).toHaveLength(2)
  })

  test('keeps the identity column sticky on desktop', async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1280 })
    await page.goto('/tr')

    await expect(page.locator('.sidebar')).toHaveCSS('position', 'sticky')
    await expect(page.locator('.portfolio-shell')).toHaveCSS('display', 'flex')
  })

  test('supports keyboard skip navigation and localized accessible labels', async ({ page }) => {
    await page.goto('/tr')
    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: 'İçeriğe geç' })
    await expect(skipLink).toBeFocused()
    await skipLink.press('Enter')
    await expect(page).toHaveURL(/#main-content$/)
    await expect(page.getByRole('navigation', { name: 'Portfolyo bölümleri' })).toBeVisible()
    await expect(page.getByRole('list', { name: 'Teknolojiler' }).first()).toBeVisible()
  })

  test('disables smooth motion when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/tr')

    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
    await expect(page.locator('.cursor-glow')).toBeHidden()
  })

  for (const locale of ['tr', 'en']) {
    test(`${locale} homepage has no serious accessibility violations`, async ({ page }) => {
      await page.goto(`/${locale}`)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      const seriousViolations = results.violations.filter((violation) =>
        ['critical', 'serious'].includes(violation.impact ?? ''),
      )

      expect(seriousViolations).toEqual([])
    })
  }
})
