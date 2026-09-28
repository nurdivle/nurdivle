const anchorPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const validateAnchor = (value: unknown): string | true => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Anchor is required.'
  }

  if (!anchorPattern.test(value)) {
    return 'Use lowercase ASCII letters, numbers, and single hyphens only.'
  }

  return true
}
