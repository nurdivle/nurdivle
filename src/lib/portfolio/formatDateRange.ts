import type { Locale } from './types'

type DateRangeOptions = {
  currentLabel?: string
  endDate?: null | string
  isCurrent?: boolean | null
  locale: Locale
  startDate?: null | string
}

const getDateParts = (value: null | string | undefined) => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return {
    date,
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
  }
}

export const formatDateRange = ({
  currentLabel,
  endDate,
  isCurrent = false,
  locale,
  startDate,
}: DateRangeOptions) => {
  const start = getDateParts(startDate)
  if (!start) return ''

  if (isCurrent) return `${start.year} — ${currentLabel ?? ''}`.trim()

  const end = getDateParts(endDate)
  if (!end) return String(start.year)
  if (start.year !== end.year) return `${start.year} — ${end.year}`

  const formatter = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    month: 'long',
    timeZone: 'UTC',
  })
  const startMonth = formatter.format(start.date)
  const endMonth = formatter.format(end.date)

  return start.month === end.month
    ? `${startMonth} ${start.year}`
    : `${startMonth} — ${endMonth} ${start.year}`
}
