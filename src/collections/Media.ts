import type { CollectionConfig } from 'payload'
import path from 'path'

import { adminLabel } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: adminLabel('Medya', 'Media'),
    singular: adminLabel('Medya Dosyası', 'Media Item'),
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: adminLabel('Alternatif Metin', 'Alternative Text'),
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    staticDir: path.resolve(process.cwd(), 'media'),
  },
}
