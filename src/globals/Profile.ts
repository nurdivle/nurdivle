import type { GlobalConfig } from 'payload'

import { adminLabel, portfolioGroup } from '@/lib/admin/localizedLabels'
import { revalidatePortfolioAfterGlobalChange } from '@/lib/portfolio/cache'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: adminLabel('Profil', 'Profile'),
  access: {
    read: () => true,
  },
  admin: {
    group: portfolioGroup,
  },
  hooks: {
    afterChange: [revalidatePortfolioAfterGlobalChange],
  },
  fields: [
    { name: 'name', type: 'text', label: adminLabel('Ad Soyad', 'Name'), localized: true, required: true },
    { name: 'jobTitle', type: 'text', label: adminLabel('Mesleki Ünvan', 'Job Title'), localized: true, required: true },
    { name: 'tagline', type: 'textarea', label: adminLabel('Kısa Tanıtım', 'Tagline'), localized: true, required: true },
    {
      name: 'aboutParagraphs',
      type: 'array',
      label: adminLabel('Hakkımda Paragrafları', 'About Paragraphs'),
      labels: {
        plural: adminLabel('Hakkımda Paragrafları', 'About Paragraphs'),
        singular: adminLabel('Hakkımda Paragrafı', 'About Paragraph'),
      },
      fields: [
        { name: 'text', type: 'textarea', label: adminLabel('Metin', 'Text'), required: true },
      ],
      localized: true,
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: adminLabel('Sosyal Bağlantılar', 'Social Links'),
      labels: {
        plural: adminLabel('Sosyal Bağlantılar', 'Social Links'),
        singular: adminLabel('Sosyal Bağlantı', 'Social Link'),
      },
      admin: {
        components: {
          RowLabel: '@/components/admin/SocialLinkRowLabel#SocialLinkRowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: adminLabel('Platform', 'Platform'),
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: adminLabel('E-posta', 'Email'), value: 'email' },
            { label: adminLabel('Web Sitesi', 'Website'), value: 'website' },
          ],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: adminLabel(
              'Satır kapatıldığında satır adı olarak da kullanılır.',
              'Also used as this row name when the row is collapsed.',
            ),
          },
          label: adminLabel('Satır Adı / Erişilebilirlik Etiketi', 'Row Name / Accessibility Label'),
          localized: true,
          required: true,
        },
        { name: 'url', type: 'text', label: adminLabel('Bağlantı', 'URL'), required: true },
      ],
    },
    { name: 'resume', type: 'upload', label: adminLabel('Özgeçmiş', 'Resume'), relationTo: 'media', localized: true },
  ],
  versions: { drafts: true },
}
