import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/siteUrl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin/', '/api/'],
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', getSiteUrl()).toString(),
  }
}
