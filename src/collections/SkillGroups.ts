import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import {
  revalidatePortfolioAfterCollectionChange,
  revalidatePortfolioAfterCollectionDelete,
} from '@/lib/portfolio/cache'

const colorOptions = [
  { label: adminLabel('Camgöbeği', 'Cyan'), value: 'cyan' },
  { label: adminLabel('Nane', 'Mint'), value: 'mint' },
  { label: adminLabel('Menekşe', 'Violet'), value: 'violet' },
  { label: adminLabel('Kehribar', 'Amber'), value: 'amber' },
  { label: adminLabel('Gül', 'Rose'), value: 'rose' },
  { label: adminLabel('Kayrak', 'Slate'), value: 'slate' },
]

export const SkillGroups: CollectionConfig = {
  slug: 'skill-groups',
  labels: {
    plural: adminLabel('Yetenek Grupları', 'Skill Groups'),
    singular: adminLabel('Yetenek Grubu', 'Skill Group'),
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    defaultColumns: ['title', 'iconKey', 'colorKey', 'order'],
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
    {
      name: 'iconKey',
      type: 'select',
      label: adminLabel('Simge', 'Icon'),
      options: [
        { label: adminLabel('Kod', 'Code'), value: 'code' },
        { label: adminLabel('Ağ', 'Network'), value: 'network' },
        { label: adminLabel('Bulut', 'Cloud'), value: 'cloud' },
        { label: adminLabel('Veritabanı', 'Database'), value: 'database' },
        { label: adminLabel('Kalkan', 'Shield'), value: 'shield' },
        { label: adminLabel('Etkinlik', 'Activity'), value: 'activity' },
        { label: adminLabel('Parıltılar', 'Sparkles'), value: 'sparkles' },
      ],
      required: true,
    },
    { name: 'colorKey', type: 'select', label: adminLabel('Renk', 'Color'), options: colorOptions, required: true },
    {
      name: 'skills',
      type: 'array',
      label: adminLabel('Yetenekler', 'Skills'),
      labels: {
        plural: adminLabel('Yetenekler', 'Skills'),
        singular: adminLabel('Yetenek', 'Skill'),
      },
      localized: true,
      fields: [
        { name: 'name', type: 'text', label: adminLabel('Ad', 'Name'), required: true },
        { name: 'colorKey', type: 'select', label: adminLabel('Renk', 'Color'), options: colorOptions },
      ],
      required: true,
    },
    { name: 'order', type: 'number', label: adminLabel('Sıralama', 'Order'), defaultValue: 0, index: true, required: true },
  ],
  versions: { drafts: true },
}
