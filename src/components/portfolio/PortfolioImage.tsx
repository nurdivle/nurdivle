import type { Media } from '@/payload-types'

type Props = {
  className: string
  image: Media
  sizes: string
}

export function PortfolioImage({ className, image, sizes }: Props) {
  if (!image.url) return null

  return (
    // The CMS serves the original object directly, so next/image would add client JavaScript
    // without performing image optimization.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={image.alt?.trim() ?? ''}
      className={className}
      decoding="async"
      height={image.height ?? 360}
      loading="lazy"
      sizes={sizes}
      src={image.url}
      width={image.width ?? 640}
    />
  )
}
