import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import {
  getProjectHref,
  getProjectLinkLabel,
  getProjectYear,
} from '@/lib/portfolio/projects'
import type { PortfolioContent } from '@/lib/portfolio/types'

import { LanguageSwitcher } from './LanguageSwitcher'

type Props = {
  content: PortfolioContent
}

const ui = {
  en: {
    builtWith: 'Built with',
    link: 'Link',
    project: 'Project',
    title: 'All Projects',
    year: 'Year',
  },
  tr: {
    builtWith: 'Teknolojiler',
    link: 'Bağlantı',
    project: 'Proje',
    title: 'Tüm Projeler',
    year: 'Yıl',
  },
} as const

export function ProjectArchivePage({ content }: Props) {
  const { locale, profile, projects, settings } = content
  const homeHref = `/${locale}#${locale === 'tr' ? 'projeler' : 'projects'}`

  return (
    <>
      <LanguageSwitcher
        locale={locale}
        paths={{ en: '/en/projects', tr: '/tr/projeler' }}
        position={settings.languageSwitcherPosition}
        routes={[]}
      />
      <main className="project-archive">
        <header className="project-archive__header">
          <a className="project-archive__back" href={homeHref}>
            <ArrowLeft aria-hidden="true" size={16} />
            {profile.name}
          </a>
          <h1>{ui[locale].title}</h1>
        </header>

        <div className="project-archive__table-wrap">
          <table>
            <thead>
              <tr>
                <th>{ui[locale].year}</th>
                <th>{ui[locale].project}</th>
                <th>{ui[locale].builtWith}</th>
                <th>{ui[locale].link}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const href = getProjectHref(project)

                return (
                  <tr key={project.id}>
                    <td className="project-archive__year">{getProjectYear(project)}</td>
                    <td className="project-archive__title">{project.title}</td>
                    <td>
                      <ul aria-label={ui[locale].builtWith} className="project-archive__tags">
                        {project.technologies?.map((technology) => (
                          <li key={technology.id ?? technology.name}>{technology.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="project-archive__external">
                      {href ? (
                        <a href={href} rel="noreferrer" target="_blank">
                          <span>{getProjectLinkLabel(href)}</span>
                          <ArrowUpRight aria-hidden="true" size={14} />
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
