import type { CheckboxFieldValidation, CollectionConfig, Where } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const validateFeaturedLimit: CheckboxFieldValidation = async (value, { id, req }) => {
  if (!value) return true

  const where: Where = id
    ? { and: [{ featured: { equals: true } }, { id: { not_equals: id } }] }
    : { featured: { equals: true } }
  const result = await req.payload.count({ collection: 'projects', overrideAccess: true, where })

  if (result.totalDocs < 4) return true
  return req.locale === 'tr'
    ? 'Ana sayfada en fazla 4 proje öne çıkarılabilir.'
    : 'A maximum of 4 projects can be featured on the homepage.'
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    plural: adminLabel('Projeler', 'Projects'),
    singular: adminLabel('Proje', 'Project'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['title', 'featured', 'order', 'updatedAt'],
    group: portfolioGroup,
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    { name: 'key', type: 'text', label: adminLabel('Anahtar', 'Key'), required: true, unique: true },
    { name: 'title', type: 'text', label: adminLabel('Başlık', 'Title'), localized: true, required: true },
    { name: 'summary', type: 'textarea', label: adminLabel('Özet', 'Summary'), localized: true, required: true },
    { name: 'role', type: 'text', label: adminLabel('Rol', 'Role'), localized: true },
    {
      name: 'image',
      type: 'upload',
      label: adminLabel('Kart Görseli', 'Card Image'),
      relationTo: 'media',
      admin: {
        description: adminLabel(
          'Ana sayfadaki proje kartında kullanılacak 16:9 oranında bir görsel seçin.',
          'Choose a 16:9 image for the project card on the homepage.',
        ),
      },
    },
    {
      name: 'year',
      type: 'number',
      label: adminLabel('Proje Yılı', 'Project Year'),
      min: 1900,
      max: 2100,
      admin: {
        description: adminLabel(
          'Tüm projeler sayfasındaki Yıl sütununda gösterilir.',
          'Displayed in the Year column on the all-projects page.',
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
        { name: 'name', type: 'text', label: adminLabel('Ad', 'Name'), required: true },
      ],
    },
    { name: 'liveUrl', type: 'text', label: adminLabel('Canlı Site Bağlantısı', 'Live Site URL') },
    { name: 'repositoryUrl', type: 'text', label: adminLabel('Depo Bağlantısı', 'Repository URL') },
    {
      name: 'featured',
      type: 'checkbox',
      label: adminLabel('Ana Sayfada Öne Çıkar', 'Feature on Homepage'),
      defaultValue: false,
      validate: validateFeaturedLimit,
      admin: {
        description: adminLabel(
          'En fazla 4 proje seçilebilir.',
          'You can select up to 4 projects.',
        ),
      },
    },
    { name: 'order', type: 'number', label: adminLabel('Sıralama', 'Order'), defaultValue: 0, index: true, required: true },
  ],
  versions: { drafts: true },
}
