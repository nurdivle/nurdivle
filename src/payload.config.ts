import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { setDefaultResultOrder } from 'node:dns'
import path from 'path'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import { tr } from 'payload/i18n/tr'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Education } from './collections/Education'
import { Experiences } from './collections/Experiences'
import { Hobbies } from './collections/Hobbies'
import { Projects } from './collections/Projects'
import { Sections } from './collections/Sections'
import { SkillGroups } from './collections/SkillGroups'
import { Profile } from './globals/Profile'
import { SiteSettings } from './globals/SiteSettings'
import { getPreviewURL } from './lib/preview'
import { migrations } from './migrations'

setDefaultResultOrder('ipv4first')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const vercelProductionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
const serverURL =
  process.env.SITE_URL ||
  (vercelProductionURL ? `https://${vercelProductionURL}` : 'http://localhost:3000')
const allowedOrigins = (process.env.ALLOWED_ORIGINS || serverURL)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const databasePoolMax = Number(process.env.DATABASE_POOL_MAX || (process.env.VERCEL ? 5 : 10))

if (!Number.isInteger(databasePoolMax) || databasePoolMax < 1) {
  throw new Error('DATABASE_POOL_MAX must be a positive integer.')
}

const s3Bucket = process.env.S3_BUCKET?.trim()
const s3Endpoint = (process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT_URL_S3)?.trim()
const s3AccessKeyId = (process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID)?.trim()
const s3SecretAccessKey = (
  process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
)?.trim()
const s3Region = (process.env.S3_REGION || process.env.AWS_REGION || 'auto').trim()
const requiredS3Values = [s3Bucket, s3Endpoint, s3AccessKeyId, s3SecretAccessKey]
const suppliedS3ValueCount = requiredS3Values.filter(Boolean).length

if (suppliedS3ValueCount > 0 && suppliedS3ValueCount < requiredS3Values.length) {
  throw new Error(
    'S3_BUCKET, S3_ENDPOINT, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY must be configured together.',
  )
}

const s3Enabled = suppliedS3ValueCount === requiredS3Values.length

const resendApiKey = process.env.RESEND_API_KEY?.trim()
const email = resendApiKey
  ? resendAdapter({
      apiKey: resendApiKey,
      defaultFromAddress:
        process.env.RESEND_FROM_ADDRESS?.trim() || 'noreply@nurdivle.com',
      defaultFromName: process.env.RESEND_FROM_NAME?.trim() || 'Nurdivle',
    })
  : undefined

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: '@/components/admin/AdminBackIcon#AdminBackIcon',
      },
      providers: [
        '@/components/admin/AdminLocaleLanguageSync#AdminLocaleLanguageSync',
      ],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { height: 844, label: 'Mobile', name: 'mobile', width: 390 },
        { height: 1024, label: 'Tablet', name: 'tablet', width: 768 },
        { height: 900, label: 'Desktop', name: 'desktop', width: 1440 },
      ],
      collections: [
        Sections.slug,
        Experiences.slug,
        Projects.slug,
        SkillGroups.slug,
        Education.slug,
        Hobbies.slug,
      ],
      globals: [Profile.slug, SiteSettings.slug],
      url: ({ locale }) =>
        getPreviewURL(typeof locale === 'string' ? locale : locale?.code),
    },
  },
  collections: [Users, Media, Sections, Experiences, Projects, SkillGroups, Education, Hobbies],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  editor: lexicalEditor(),
  email,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    autoGenerate: false,
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    prodMigrations: process.env.VERCEL ? undefined : migrations,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: databasePoolMax,
    },
  }),
  globals: [Profile, SiteSettings],
  i18n: {
    fallbackLanguage: 'tr',
    supportedLanguages: { tr, en },
  },
  localization: {
    defaultLocale: 'tr',
    fallback: false,
    locales: [
      { code: 'tr', label: 'Türkçe' },
      { code: 'en', label: 'English' },
    ],
  },
  serverURL,
  sharp,
  plugins: [
    s3Storage({
      alwaysInsertFields: true,
      bucket: s3Bucket || 'storage-disabled',
      clientUploads: process.env.S3_CLIENT_UPLOADS === 'true',
      collections: {
        media: {
          prefix: 'media',
        },
      },
      config: {
        credentials: s3Enabled
          ? {
              accessKeyId: s3AccessKeyId || '',
              secretAccessKey: s3SecretAccessKey || '',
            }
          : undefined,
        endpoint: s3Endpoint,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== 'false',
        region: s3Region,
      },
      enabled: s3Enabled,
    }),
  ],
})
