const localURL = 'http://localhost:3000'

export const getSiteUrl = (): URL => {
  const configuredURL = process.env.SITE_URL?.trim()
  const vercelProductionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const resolvedURL = configuredURL || (vercelProductionURL ? `https://${vercelProductionURL}` : localURL)

  try {
    return new URL(resolvedURL)
  } catch {
    return new URL(localURL)
  }
}
