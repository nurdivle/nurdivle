import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/siteUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteURL = getSiteUrl()
  const paths = ['/tr', '/en', '/tr/projeler', '/en/projects']

  return paths.map((path) => ({
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: path === '/tr' ? 1 : path === '/en' ? 0.9 : 0.7,
    url: new URL(path, siteURL).toString(),
  }))
}
