import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  test.describe.configure({ timeout: 90_000 })

  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await page.context().close()
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('http://localhost:3000/admin')
    await expect(page).toHaveURL('http://localhost:3000/admin')
    const dashboardArtifact = page.locator('.dashboard').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('shows a working back control on admin pages', async () => {
    await page.goto('http://localhost:3000/admin')
    await page.goto('http://localhost:3000/admin/collections/users')

    const backControl = page.getByRole('link', { name: 'Geri dön' })
    await expect(backControl).toBeVisible()
    await backControl.click()

    await expect(page).toHaveURL('http://localhost:3000/admin')
  })

  test('can navigate to list view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users')
    await expect(page).toHaveURL('http://localhost:3000/admin/collections/users')
    const listViewArtifact = page.locator('h1', { hasText: 'Kullanıcılar' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users/create')
    await expect(page).toHaveURL(/\/admin\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })

  test('offers a rename action for social link rows', async () => {
    await page.goto('http://localhost:3000/admin/globals/profile')

    const socialLinks = page.locator('#field-socialLinks')
    await socialLinks.getByRole('button', { name: /Sosyal Bağlantı ekle/i }).click()
    const addedRow = socialLinks.locator('.array-field__row').last()
    await expect(addedRow.getByText(/Sosyal Bağlantı \d+/)).toBeVisible()
    await addedRow.locator('.array-actions__button').click()

    await expect(page.getByRole('button', { name: 'Yeniden adlandır', exact: true })).toBeVisible()
  })

  test('matches admin headings to the selected content locale', async () => {
    await page.goto('http://localhost:3000/admin/collections/education?locale=tr')
    await expect(page.locator('h1', { hasText: 'Eğitim' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projeler', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Yetenek Grupları', exact: true })).toBeVisible()

    await page.goto('http://localhost:3000/admin/collections/education?locale=en')
    await expect(page.locator('h1', { hasText: 'Education' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Skill Groups', exact: true })).toBeVisible()
  })

  test('can enter and exit Turkish draft preview', async () => {
    await page.goto('http://localhost:3000/admin/globals/profile?locale=tr')
    await page.locator('#live-preview-toggler').click()

    const preview = page.frameLocator('#live-preview-iframe')
    await expect(preview.getByText('Taslak önizleme etkin')).toBeVisible()
    await expect(preview.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    )

    await preview
      .getByRole('link', { name: 'Önizlemeden çık' })
      .evaluate((link: HTMLAnchorElement) => link.click())
    await expect(preview.getByText('Taslak önizleme etkin')).toHaveCount(0)
  })
})
