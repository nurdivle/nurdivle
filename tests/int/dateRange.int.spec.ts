import { formatDateRange } from '@/lib/portfolio/formatDateRange'
import { describe, expect, it } from 'vitest'

describe('formatDateRange', () => {
  it('shows only years when the years differ', () => {
    expect(
      formatDateRange({
        endDate: '2026-08-25T00:00:00.000Z',
        locale: 'tr',
        startDate: '2025-06-01T00:00:00.000Z',
      }),
    ).toBe('2025 — 2026')
  })

  it('shows months and one year when only the months differ', () => {
    expect(
      formatDateRange({
        endDate: '2026-08-25T00:00:00.000Z',
        locale: 'tr',
        startDate: '2026-06-01T00:00:00.000Z',
      }),
    ).toBe('Haziran — Ağustos 2026')
  })

  it('uses the selected language for month names', () => {
    expect(
      formatDateRange({
        endDate: '2026-08-25T00:00:00.000Z',
        locale: 'en',
        startDate: '2026-06-01T00:00:00.000Z',
      }),
    ).toBe('June — August 2026')
  })

  it('shows one month when both dates are in the same month', () => {
    expect(
      formatDateRange({
        endDate: '2026-06-25T00:00:00.000Z',
        locale: 'en',
        startDate: '2026-06-01T00:00:00.000Z',
      }),
    ).toBe('June 2026')
  })

  it('keeps current roles as a year-to-present range', () => {
    expect(
      formatDateRange({
        currentLabel: 'Günümüz',
        isCurrent: true,
        locale: 'tr',
        startDate: '2026-06-01T00:00:00.000Z',
      }),
    ).toBe('2026 — Günümüz')
  })
})
