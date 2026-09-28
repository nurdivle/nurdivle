import Image from 'next/image'

import type { Media } from '@/payload-types'

type Props = {
  className: string
  image: Media
  sizes: string
}

export function PortfolioImage({ className, image, sizes }: Props) {
  if (!image.url) return null

  return (
    <Image
      alt={image.alt}
      className={className}
      height={image.height ?? 360}
      sizes={sizes}
      src={image.url}
      unoptimized
      width={image.width ?? 640}
    />
  )
}
