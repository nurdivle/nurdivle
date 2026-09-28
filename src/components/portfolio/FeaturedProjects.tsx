import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { getFeaturedProjects, getUploadedImage } from '@/lib/portfolio/projects'
import type { Locale } from '@/lib/portfolio/types'
import type { Project } from '@/payload-types'

import { GitHubIcon } from './BrandIcons'
import { PortfolioImage } from './PortfolioImage'

type Props = {
  locale: Locale
  projects: Project[]
}

const labels = {
  en: { archive: 'View Full Project Archive', technologies: 'Technologies' },
  tr: { archive: 'Tüm Projeleri Görüntüle', technologies: 'Teknolojiler' },
} as const

export function FeaturedProjects({ locale, projects }: Props) {
  const featuredProjects = getFeaturedProjects(projects)
  const archiveHref = locale === 'tr' ? '/tr/projeler' : '/en/projects'

  return (
    <>
      <div className="featured-project-list">
        {featuredProjects.map((project) => {
          const image = getUploadedImage(project.image)
          const primaryHref = project.liveUrl?.trim() || null

          return (
            <article
              className={`featured-project${image ? '' : ' featured-project--without-image'}${primaryHref ? ' featured-project--linked' : ''}`}
              key={project.id}
            >
              {primaryHref && (
                <a
                  aria-label={project.title}
                  className="featured-project__primary-link"
                  href={primaryHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{project.title}</span>
                </a>
              )}
              {image && (
                <PortfolioImage
                  className="featured-project__image"
                  image={image}
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 25vw, 100vw"
                />
              )}
              <div className="featured-project__content">
                {project.role && <p className="project__role">{project.role}</p>}
                <h3>
                  {project.title}
                  {primaryHref && <ArrowUpRight aria-hidden="true" size={16} />}
                </h3>
                <p>{project.summary}</p>
                <div className="featured-project__links">
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} rel="noreferrer" target="_blank">
                      <GitHubIcon aria-hidden size={16} /> GitHub
                    </a>
                  )}
                </div>
                {!!project.technologies?.length && (
                  <ul aria-label={labels[locale].technologies} className="tag-list">
                    {project.technologies.map((technology) => (
                      <li key={technology.id ?? technology.name}>{technology.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          )
        })}
      </div>
      <a className="project-archive-link" href={archiveHref}>
        {labels[locale].archive}
        <ArrowRight aria-hidden="true" size={16} />
      </a>
    </>
  )
}
