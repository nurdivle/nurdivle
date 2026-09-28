import { createHash, timingSafeEqual } from 'node:crypto'

import { isLocale, type Locale } from './portfolio/types'

const minimumSecretLength = 32

const getPreviewSecret = (): string => {
  const configuredSecret = process.env.PREVIEW_SECRET?.trim()

  if (configuredSecret && configuredSecret.length >= minimumSecretLength) {
    return configuredSecret
  }

  if (process.env.NODE_ENV === 'development' && process.env.PAYLOAD_SECRET) {
    return createHash('sha256')
      .update(`portfolio-preview:${process.env.PAYLOAD_SECRET}`)
      .digest('hex')
  }

  return ''
}

export const getPreviewLocale = (value?: null | string): Locale =>
  value && isLocale(value) ? value : 'tr'

export const getPreviewURL = (locale?: null | string): null | string => {
  const previewSecret = getPreviewSecret()
  if (!previewSecret) return null

  const path = `/${getPreviewLocale(locale)}`
  const params = new URLSearchParams({ path, previewSecret })
  return `/api/preview?${params.toString()}`
}

export const isAllowedPreviewPath = (path: null | string): path is '/en' | '/tr' =>
  path === '/tr' || path === '/en'

export const isPreviewSecretValid = (candidate: null | string): boolean => {
  const previewSecret = getPreviewSecret()
  if (!candidate || !previewSecret) return false

  const candidateBuffer = Buffer.from(candidate)
  const secretBuffer = Buffer.from(previewSecret)

  return (
    candidateBuffer.length === secretBuffer.length &&
    timingSafeEqual(candidateBuffer, secretBuffer)
  )
}
