import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Camera,
  Cloud,
  Code2,
  Coffee,
  Database,
  Dumbbell,
  Gamepad2,
  Globe2,
  Mail,
  Music2,
  Network,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import type { ComponentType } from 'react'

import type { PortfolioContent, PortfolioSection } from '@/lib/portfolio/types'
import { formatDateRange } from '@/lib/portfolio/formatDateRange'
import { getVisibleSections } from '@/lib/portfolio/getVisibleSections'
import { getUploadedImage } from '@/lib/portfolio/projects'
import type { Hobby, SkillGroup } from '@/payload-types'

import { GitHubIcon, InstagramIcon, LinkedInIcon } from './BrandIcons'
import { FeaturedProjects } from './FeaturedProjects'
import { LanguageSwitcher } from './LanguageSwitcher'
import { PortfolioImage } from './PortfolioImage'
import { SectionNavigation } from './SectionNavigation'

type Props = {
  content: PortfolioContent
}

type IconProps = { 'aria-hidden'?: boolean; size?: number; strokeWidth?: number }

const skillIcons: Record<SkillGroup['iconKey'], ComponentType<IconProps>> = {
  activity: Activity,
  cloud: Cloud,
  code: Code2,
  database: Database,
  network: Network,
  shield: ShieldCheck,
  sparkles: Sparkles,
}

const hobbyIcons: Record<Hobby['iconKey'], ComponentType<IconProps>> = {
  book: BookOpen,
  camera: Camera,
  coffee: Coffee,
  dumbbell: Dumbbell,
  gamepad: Gamepad2,
  music: Music2,
  plane: Plane,
}

const socialIcons = {
  email: Mail,
  github: GitHubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  website: Globe2,
} as const

const getSocialHref = (platform: keyof typeof socialIcons, url: string) => {
  const href = url.trim()
  return platform === 'email' && !href.toLowerCase().startsWith('mailto:') ? `mailto:${href}` : href
}

const ui = {
  en: {
    current: 'Present',
    resume: 'View résumé',
    skip: 'Skip to content',
    technologies: 'Technologies',
  },
  tr: {
    current: 'Günümüz',
    resume: 'Özgeçmişi görüntüle',
    skip: 'İçeriğe geç',
    technologies: 'Teknolojiler',
  },
} as const

function SectionHeading({ section }: { section: PortfolioSection }) {
  return (
    <header className="section-heading">
      <h2>{section.label}</h2>
    </header>
  )
}

export function PortfolioPage({ content }: Props) {
  const { education, experiences, hobbies, locale, profile, projects, sections, settings, skillGroups } =
    content
  const resumeUrl = typeof profile.resume === 'object' ? profile.resume?.url : undefined
  const visibleSections = getVisibleSections(sections, content)

  const renderSection = (section: PortfolioSection) => {
    switch (section.type) {
      case 'about':
        return (
          <div className="about-copy">
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.id ?? paragraph.text}>{paragraph.text}</p>
            ))}
          </div>
        )

      case 'experience':
        return (
          <div className="record-list">
            {experiences.map((experience) => {
              const image = getUploadedImage(experience.image)
              const recordContent = (
                <>
                  <div className="record__aside">
                    <p className="record__date">
                      {formatDateRange({
                        currentLabel: ui[locale].current,
                        endDate: experience.endDate,
                        isCurrent: experience.isCurrent,
                        locale,
                        startDate: experience.startDate,
                      })}
                    </p>
                    {image && (
                      <PortfolioImage
                        className="record__image"
                        image={image}
                        sizes="(min-width: 1024px) 150px, (min-width: 640px) 25vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="record__content">
                    <h3>
                      {experience.role} · {experience.company}
                      {experience.companyUrl && <ArrowUpRight aria-hidden="true" size={16} />}
                    </h3>
                    {experience.location && <p className="record__meta">{experience.location}</p>}
                    <p>{experience.summary}</p>
                    <ul aria-label={ui[locale].technologies} className="tag-list">
                      {experience.technologies?.map((technology) => (
                        <li key={technology.id ?? technology.name}>{technology.name}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )

              return experience.companyUrl ? (
                <a
                  aria-label={`${experience.role} · ${experience.company}`}
                  className="record record--linked"
                  href={experience.companyUrl}
                  key={experience.id}
                  rel="noreferrer"
                  target="_blank"
                >
                  {recordContent}
                </a>
              ) : (
                <article className="record" key={experience.id}>
                  {recordContent}
                </article>
              )
            })}
          </div>
        )

      case 'projects':
        return <FeaturedProjects locale={locale} projects={projects} />

      case 'skills':
        return (
          <div className="skill-grid">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.iconKey]
              return (
                <article className={`skill-card skill-card--${group.colorKey}`} key={group.id}>
                  <header>
                    <Icon aria-hidden={true} size={24} strokeWidth={1.8} />
                    <h3>{group.title}</h3>
                  </header>
                  <ul aria-label={ui[locale].technologies} className="skill-card__tags">
                    {(group.skills ?? []).map((skill) => (
                      <li className={`tag--${skill.colorKey ?? group.colorKey}`} key={skill.id ?? skill.name}>
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        )

      case 'education':
        return (
          <div className="record-list">
            {education.map((item) => (
              <article className="record" key={item.id}>
                <p className="record__date">
                  {formatDateRange({ endDate: item.endDate, locale, startDate: item.startDate })}
                </p>
                <div className="record__content">
                  <h3>{item.program} · {item.institution}</h3>
                  {(item.degree || item.location) && (
                    <p className="record__meta">{[item.degree, item.location].filter(Boolean).join(' · ')}</p>
                  )}
                  {item.description && <p>{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )

      case 'hobbies':
        return (
          <div className="hobby-grid">
            {hobbies.map((hobby) => {
              const Icon = hobbyIcons[hobby.iconKey]
              return (
                <article className="hobby-card" key={hobby.id}>
                  <Icon aria-hidden={true} size={22} strokeWidth={1.8} />
                  <div>
                    <h3>{hobby.title}</h3>
                    <p>{hobby.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )

      case 'custom':
        return section.customContent && <RichText className="rich-text" data={section.customContent} />
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{ui[locale].skip}</a>
      <LanguageSwitcher
        locale={locale}
        position={settings.languageSwitcherPosition}
        routes={visibleSections.map((section) => section.route)}
      />
      <div className={`portfolio-shell portfolio-shell--${settings.backgroundEffect}`}>
        <aside className="sidebar">
          <div>
            {profile.name && <h1>{profile.name}</h1>}
            {profile.jobTitle && <h2>{profile.jobTitle}</h2>}
            {profile.tagline && <p className="identity__tagline">{profile.tagline}</p>}
          </div>

          {visibleSections.length > 0 && (
            <SectionNavigation locale={locale} sections={visibleSections} />
          )}

          {(profile.socialLinks?.length || resumeUrl) && (
            <footer className="sidebar__footer">
              <div className="social-links">
                {profile.socialLinks?.map((link) => {
                  const Icon = socialIcons[link.platform]
                  const isEmail = link.platform === 'email'
                  return (
                    <a
                      aria-label={link.label}
                      href={getSocialHref(link.platform, link.url)}
                      key={link.id ?? link.url}
                      rel={isEmail ? undefined : 'noreferrer'}
                      target={isEmail ? undefined : '_blank'}
                    >
                      <Icon aria-hidden={true} size={24} strokeWidth={1.8} />
                    </a>
                  )
                })}
                {resumeUrl && (
                  <a className="resume-link" href={resumeUrl} rel="noreferrer" target="_blank">
                    {ui[locale].resume}
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                )}
              </div>
            </footer>
          )}
        </aside>

        <main id="main-content">
          {visibleSections.map((section) => (
            <section data-section-key={section.key} id={section.anchor} key={section.key}>
              <SectionHeading section={section} />
              {renderSection(section)}
            </section>
          ))}
        </main>
      </div>
    </>
  )
}
