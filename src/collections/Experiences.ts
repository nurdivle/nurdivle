import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: {
    plural: adminLabel('Deneyimler', 'Experiences'),
    singular: adminLabel('Deneyim', 'Experience'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['company', 'role', 'startDate', 'isCurrent', 'order'],
    group: portfolioGroup,
    useAsTitle: 'company',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    { name: 'key', type: 'text', label: adminLabel('Anahtar', 'Key'), unique: true },
    { name: 'company', type: 'text', label: adminLabel('Şirket', 'Company') },
    { name: 'role', type: 'text', label: adminLabel('Rol', 'Role'), localized: true },
    { name: 'location', type: 'text', label: adminLabel('Konum', 'Location'), localized: true },
    { name: 'startDate', type: 'date', label: adminLabel('Başlangıç Tarihi', 'Start Date') },
    { name: 'endDate', type: 'date', label: adminLabel('Bitiş Tarihi', 'End Date') },
    { name: 'isCurrent', type: 'checkbox', label: adminLabel('Devam Ediyor', 'Current'), defaultValue: false },
    { name: 'summary', type: 'textarea', label: adminLabel('Özet', 'Summary'), localized: true },
    {
      name: 'image',
      type: 'upload',
      label: adminLabel('Kart Görseli', 'Card Image'),
      relationTo: 'media',
      admin: {
        description: adminLabel(
          'Deneyim kartında gösterilecek 16:9 oranında bir görsel seçin.',
          'Choose a 16:9 image to display in the experience card.',
        ),
      },
    },
    {
      name: 'technologies',
      type: 'array',
      label: adminLabel('Teknolojiler', 'Technologies'),
      labels: {
        plural: adminLabel('Teknolojiler', 'Technologies'),
        singular: adminLabel('Teknoloji', 'Technology'),
      },
      fields: [
        { name: 'name', type: 'text', label: adminLabel('Ad', 'Name') },
      ],
    },
    { name: 'companyUrl', type: 'text', label: adminLabel('Şirket Bağlantısı', 'Company URL') },
    { name: 'order', type: 'number', label: adminLabel('Sıralama', 'Order'), defaultValue: 0, index: true },
  ],
  versions: { drafts: true },
}
