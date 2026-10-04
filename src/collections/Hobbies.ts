import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const Hobbies: CollectionConfig = {
  slug: 'hobbies',
  labels: {
    plural: adminLabel('Hobiler', 'Hobbies'),
    singular: adminLabel('Hobi', 'Hobby'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['title', 'iconKey', 'order'],
    group: portfolioGroup,
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    { name: 'key', type: 'text', label: adminLabel('Anahtar', 'Key'), unique: true },
    { name: 'title', type: 'text', label: adminLabel('Başlık', 'Title'), localized: true },
    { name: 'description', type: 'textarea', label: adminLabel('Açıklama', 'Description'), localized: true },
    {
      name: 'iconKey',
      type: 'select',
      label: adminLabel('Simge', 'Icon'),
      options: [
        { label: adminLabel('Kitap', 'Book'), value: 'book' },
        { label: adminLabel('Kamera', 'Camera'), value: 'camera' },
        { label: adminLabel('Oyun Kolu', 'Gamepad'), value: 'gamepad' },
        { label: adminLabel('Müzik', 'Music'), value: 'music' },
        { label: adminLabel('Uçak', 'Plane'), value: 'plane' },
        { label: adminLabel('Halter', 'Dumbbell'), value: 'dumbbell' },
        { label: adminLabel('Kahve', 'Coffee'), value: 'coffee' },
      ],
    },
    { name: 'order', type: 'number', label: adminLabel('Sıralama', 'Order'), defaultValue: 0, index: true },
  ],
  versions: { drafts: true },
}
