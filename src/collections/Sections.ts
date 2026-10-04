import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { validateAnchor } from '@/fields/validateAnchor'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

export const Sections: CollectionConfig = {
  slug: 'sections',
  labels: {
    plural: adminLabel('Bölümler', 'Sections'),
    singular: adminLabel('Bölüm', 'Section'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['label', 'key', 'type', 'order', 'enabled'],
    group: portfolioGroup,
    useAsTitle: 'label',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidatePortfolioAfterCollectionChange],
    afterDelete: [revalidatePortfolioAfterCollectionDelete],
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: adminLabel('Anahtar', 'Key'),
      admin: {
        description: adminLabel(
          'Sabit dahili tanımlayıcıdır. Yayımladıktan sonra değiştirmeyin.',
          'Stable internal identifier. Do not change after publishing.',
        ),
      },
      index: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      label: adminLabel('Tür', 'Type'),
      options: [
        { label: adminLabel('Hakkımda', 'About'), value: 'about' },
        { label: adminLabel('Deneyim', 'Experience'), value: 'experience' },
        { label: adminLabel('Projeler', 'Projects'), value: 'projects' },
        { label: adminLabel('Yetenekler', 'Skills'), value: 'skills' },
        { label: adminLabel('Eğitim', 'Education'), value: 'education' },
        { label: adminLabel('Hobiler', 'Hobbies'), value: 'hobbies' },
        { label: adminLabel('Özel içerik', 'Custom content'), value: 'custom' },
      ],
    },
    {
      name: 'label',
      type: 'text',
      label: adminLabel('Başlık', 'Label'),
      localized: true,
    },
    {
      name: 'anchor',
      type: 'text',
      label: adminLabel('Bağlantı Çapası', 'URL Anchor'),
      admin: {
        description: adminLabel(
          '# işareti olmadan dile özel URL parçası; örneğin projects veya projeler.',
          'Localized URL fragment without #, e.g. projects or projeler.',
        ),
      },
      index: true,
      localized: true,
      validate: validateAnchor,
    },
    {
      name: 'legacyAnchors',
      type: 'array',
      label: adminLabel('Eski Bağlantı Çapaları', 'Legacy URL Anchors'),
      labels: {
        plural: adminLabel('Eski Bağlantı Çapaları', 'Legacy URL Anchors'),
        singular: adminLabel('Eski Bağlantı Çapası', 'Legacy URL Anchor'),
      },
      admin: {
        description: adminLabel(
          'Önceden paylaşılmış bağlantıların çalışması için saklanan eski çapalar.',
          'Optional previous anchors kept for old shared links.',
        ),
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: adminLabel('Değer', 'Value'),
          validate: validateAnchor,
        },
      ],
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: adminLabel('Giriş Metni', 'Introduction'),
      localized: true,
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: adminLabel('Etkin', 'Enabled'),
      defaultValue: true,
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      label: adminLabel('Gezinmede Göster', 'Show in Navigation'),
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: adminLabel('Sıralama', 'Order'),
      defaultValue: 0,
      index: true,
    },
    {
      name: 'customContent',
      type: 'richText',
      label: adminLabel('Özel İçerik', 'Custom Content'),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      localized: true,
    },
  ],
  versions: {
    drafts: true,
  },
}
