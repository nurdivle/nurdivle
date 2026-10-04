const anchorPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const validateAnchor = (value: unknown): string | true => {
  if (value == null || (typeof value === 'string' && !value.trim())) return true

  if (typeof value !== 'string') return 'Anchor must be text.'

  if (!anchorPattern.test(value)) {
    return 'Use lowercase ASCII letters, numbers, and single hyphens only.'
  }

  return true
}
