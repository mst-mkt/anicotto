import NextImage from 'next/image'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

type ImageProps = {
  src: string | null | undefined
  fallback?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof NextImage>, 'src'>

export const Image: FC<ImageProps> = ({ src, fallback, ...props }) => {
  if (typeof src !== 'string') {
    return <>{fallback}</>
  }

  return <NextImage src={src} {...props} />
}
