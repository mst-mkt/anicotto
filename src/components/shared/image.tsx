import NextImage from 'next/image'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { fetchImageBase64 } from '../../utils/fetch-image-base64'

type ImageProps = {
  src: string | null | undefined
  fallback?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof NextImage>, 'src'>

export const Image: FC<ImageProps> = async ({ src, fallback, ...props }) => {
  if (typeof src !== 'string') {
    return <>{fallback}</>
  }

  try {
    const base64 = await fetchImageBase64(src)
    return <NextImage src={src} {...props} placeholder="blur" blurDataURL={base64} />
  } catch (error) {
    console.error('[Image] Failed to fetch image base64:', error)
    return <>{fallback}</>
  }
}
