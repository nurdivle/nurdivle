import type { CollectionConfig } from 'payload'

import { adminLabel } from '@/lib/admin/localizedLabels'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: adminLabel('Kullanıcılar', 'Users'),
    singular: adminLabel('Kullanıcı', 'User'),
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    lockTime: 10 * 60 * 1000,
    maxLoginAttempts: 5,
    removeTokenFromResponses: true,
  },
  fields: [],
}
