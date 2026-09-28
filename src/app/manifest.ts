import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const name = process.env.SITE_NAME || 'Nurdivle'

  return {
    background_color: '#15171a',
    description: name,
    display: 'standalone',
    icons: [{ sizes: 'any', src: '/icon.svg', type: 'image/svg+xml' }],
    name,
    short_name: name,
    start_url: '/tr',
    theme_color: '#15171a',
  }
}
