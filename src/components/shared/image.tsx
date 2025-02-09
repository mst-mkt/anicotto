import type { FC, ImgHTMLAttributes, ReactNode } from 'react'

type ImageProps = {
  src: string | null | undefined
  fallback?: ReactNode
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>

export const Image: FC<ImageProps> = ({ src, fallback, ...props }) => {
  if (typeof src !== 'string') {
    return <>{fallback}</>
  }

  // biome-ignore lint/a11y/useAltText: `props` has `alt` attribute
  return <img src={src} {...props} />
}
