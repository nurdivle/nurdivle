import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const Education: CollectionConfig = {
  slug: 'education',
  labels: {
    plural: adminLabel('Eğitim', 'Education'),
    singular: adminLabel('Eğitim', 'Education'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['institution', 'program', 'startDate', 'endDate', 'order'],
    group: portfolioGroup,
    useAsTitle: 'institution',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    { name: 'key', type: 'text', label: adminLabel('Anahtar', 'Key'), required: true, unique: true },
    { name: 'institution', type: 'text', label: adminLabel('Kurum', 'Institution'), localized: true, required: true },
    { name: 'program', type: 'text', label: adminLabel('Program', 'Program'), localized: true, required: true },
    { name: 'degree', type: 'text', label: adminLabel('Derece', 'Degree'), localized: true },
    { name: 'startDate', type: 'date', label: adminLabel('Başlangıç Tarihi', 'Start Date') },
    { name: 'endDate', type: 'date', label: adminLabel('Bitiş Tarihi', 'End Date') },
    { name: 'location', type: 'text', label: adminLabel('Konum', 'Location'), localized: true },
    { name: 'description', type: 'textarea', label: adminLabel('Açıklama', 'Description'), localized: true },
    { name: 'order', type: 'number', label: adminLabel('Sıralama', 'Order'), defaultValue: 0, index: true, required: true },
  ],
  versions: { drafts: true },
}
