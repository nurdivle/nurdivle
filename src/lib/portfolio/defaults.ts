import type { SkillGroup } from '@/payload-types'

import type {
  Locale,
  Localized,
  PortfolioContent,
  PortfolioProfile,
  PortfolioSection,
  PortfolioSettings,
} from './types'
import { defaultColorTheme } from './colorThemes'

type SectionSeed = {
  anchor: Localized<string>
  intro: Localized<string>
  key: string
  label: Localized<string>
  order: number
  type: PortfolioSection['type']
}

export const sectionSeeds: SectionSeed[] = [
  {
    anchor: { en: 'about', tr: 'hakkimda' },
    intro: { en: 'A short introduction and the way I approach my work.', tr: 'Kısa bir tanıtım ve çalışma yaklaşımım.' },
    key: 'about',
    label: { en: 'About', tr: 'Hakkımda' },
    order: 10,
    type: 'about',
  },
  {
    anchor: { en: 'experience', tr: 'deneyim' },
    intro: { en: 'Roles, responsibilities, and the impact of my work.', tr: 'Rollerim, sorumluluklarım ve çalışmalarımın etkisi.' },
    key: 'experience',
    label: { en: 'Experience', tr: 'Deneyim' },
    order: 20,
    type: 'experience',
  },
  {
    anchor: { en: 'projects', tr: 'projeler' },
    intro: { en: 'A selection of things I have designed and built.', tr: 'Tasarladığım ve geliştirdiğim çalışmalardan seçkiler.' },
    key: 'projects',
    label: { en: 'Projects', tr: 'Projeler' },
    order: 30,
    type: 'projects',
  },
  {
    anchor: { en: 'skills', tr: 'beceriler' },
    intro: { en: 'Technologies and engineering disciplines grouped by focus.', tr: 'Odak alanlarına göre gruplandırılmış teknolojiler ve mühendislik disiplinleri.' },
    key: 'skills',
    label: { en: 'Skills', tr: 'Beceriler' },
    order: 40,
    type: 'skills',
  },
  {
    anchor: { en: 'education', tr: 'egitim' },
    intro: { en: 'Formal education and selected learning milestones.', tr: 'Akademik eğitim ve seçili öğrenim kilometre taşları.' },
    key: 'education',
    label: { en: 'Education', tr: 'Eğitim' },
    order: 50,
    type: 'education',
  },
  {
    anchor: { en: 'hobbies', tr: 'hobiler' },
    intro: { en: 'What keeps me curious away from the keyboard.', tr: 'Klavyeden uzaktayken merakımı canlı tutan uğraşlar.' },
    key: 'hobbies',
    label: { en: 'Hobbies', tr: 'Hobiler' },
    order: 60,
    type: 'hobbies',
  },
]

const timestamp = '2026-01-01T00:00:00.000Z'

const text = <T>(locale: Locale, values: Localized<T>): T => values[locale]

export const getDefaultProfile = (locale: Locale): PortfolioProfile => ({
  aboutParagraphs: [
    {
      text: text(locale, {
        en: 'Use the admin panel to replace this starter copy with your own story, engineering focus, and the kind of problems you enjoy solving.',
        tr: 'Bu başlangıç metnini kendi hikâyeniz, mühendislik odağınız ve çözmekten keyif aldığınız problemlerle değiştirmek için yönetim panelini kullanın.',
      }),
    },
    {
      text: text(locale, {
        en: 'Every section, navigation label, and localized link on this page is designed to be managed without editing the code.',
        tr: 'Bu sayfadaki her bölüm, navigasyon etiketi ve dile özel bağlantı kod değiştirmeden yönetilecek şekilde tasarlandı.',
      }),
    },
  ],
  createdAt: timestamp,
  id: 0,
  jobTitle: text(locale, { en: 'Software Developer', tr: 'Yazılım Geliştirici' }),
  name: text(locale, { en: 'Your Name', tr: 'Adınız Soyadınız' }),
  socialLinks: [],
  tagline: text(locale, {
    en: 'I build reliable systems and thoughtful digital products.',
    tr: 'Güvenilir sistemler ve özenli dijital ürünler geliştiriyorum.',
  }),
  updatedAt: timestamp,
})

export const getDefaultSettings = (locale: Locale): PortfolioSettings => ({
  backgroundEffect: 'gradient',
  colorTheme: defaultColorTheme,
  defaultLanguage: 'tr',
  defaultSectionKey: 'about',
  id: 0,
  languageSwitcherPosition: 'top-right',
  siteDescription: text(locale, {
    en: 'Bilingual software developer portfolio.',
    tr: 'İki dilli yazılım geliştirici portfolyosu.',
  }),
  siteTitle: 'Nurdivle',
})

export const getDefaultSections = (locale: Locale): PortfolioSection[] =>
  sectionSeeds.map((section) => ({
    anchor: section.anchor[locale],
    customContent: null,
    enabled: true,
    intro: section.intro[locale],
    key: section.key,
    label: section.label[locale],
    order: section.order,
    route: {
      anchors: section.anchor,
      key: section.key,
      legacyAnchors: { en: [], tr: [] },
    },
    showInNavigation: true,
    type: section.type,
  }))

export const skillGroupSeeds: Array<
  Omit<SkillGroup, 'createdAt' | 'id' | 'skills' | 'title' | 'updatedAt'> & {
    skills: string[]
    title: Localized<string>
  }
> = [
  { colorKey: 'cyan', iconKey: 'code', key: 'backend', order: 10, skills: ['Java 21', 'Spring Boot', 'Node.js', 'REST APIs'], title: { en: 'Backend engineering', tr: 'Backend mühendisliği' } },
  { colorKey: 'violet', iconKey: 'network', key: 'distributed', order: 20, skills: ['RabbitMQ', 'Microservices', 'Spring Cloud Gateway', 'Resilience4j'], title: { en: 'Distributed systems', tr: 'Dağıtık sistemler' } },
  { colorKey: 'mint', iconKey: 'cloud', key: 'cloud', order: 30, skills: ['Docker', 'Kubernetes', 'AWS EC2', 'AWS EKS', 'Helm'], title: { en: 'Cloud and DevOps', tr: 'Cloud ve DevOps' } },
  { colorKey: 'amber', iconKey: 'database', key: 'data', order: 40, skills: ['PostgreSQL', 'SQLite', 'Schema design', 'Migrations'], title: { en: 'Data and persistence', tr: 'Veri ve kalıcılık' } },
  { colorKey: 'rose', iconKey: 'shield', key: 'security', order: 50, skills: ['JWT', 'RBAC', 'CORS hardening', 'JUnit 5', 'Mockito'], title: { en: 'Security and quality', tr: 'Güvenlik ve kalite' } },
  { colorKey: 'slate', iconKey: 'activity', key: 'observability', order: 60, skills: ['Prometheus', 'Grafana', 'GitHub Actions', 'Terraform', 'Ansible'], title: { en: 'Observability and delivery', tr: 'Gözlemlenebilirlik ve teslimat' } },
]

export const getFallbackContent = (locale: Locale): PortfolioContent => ({
  education: [],
  experiences: [],
  hobbies: [],
  locale,
  profile: {
    ...getDefaultProfile(locale),
    aboutParagraphs: [],
    jobTitle: '',
    name: '',
    socialLinks: [],
    tagline: '',
  },
  projects: [],
  sections: getDefaultSections(locale),
  settings: getDefaultSettings(locale),
  skillGroups: [],
  source: 'fallback',
})
