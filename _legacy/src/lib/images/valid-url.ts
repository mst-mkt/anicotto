import 'server-only'

import type { Work } from '../../schemas/annict/works'
import { jikanApiClient } from '../api/jikan/index'
import { proxiedImage } from './proxy'

const httpRegex = /^http:\/\//

const checkImage = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.ok) return true
  } catch {
    return false
  }
  return false
}

export const getValidWorkImage = async (
  primaryImage: string | null,
  images: (string | null)[],
  malId: string | null,
) => {
  // 1st. check annictWork.images.facebook.og_image_url
  const ogpImage = primaryImage?.replace(httpRegex, 'https://') ?? ''

  if (ogpImage !== '') {
    const isValid = await checkImage(ogpImage)
    if (isValid) return proxiedImage(ogpImage)
  }

  // 2nd. check malWork.images.webp.image_url
  if (malId !== '' && malId !== null) {
    try {
      const { data } = await jikanApiClient.GET('/anime/{id}', {
        params: { path: { id: Number.parseInt(malId, 10) } },
        cache: 'force-cache',
        next: { revalidate: 60 * 60 * 24 * 30 },
      })

      const malImage = data?.data?.images?.webp?.image_url?.replace(httpRegex, 'https://')

      if (typeof malImage === 'string' && malImage !== '') {
        return proxiedImage(malImage)
      }
    } catch (error) {
      console.error(`Failed to fetch MAL image for ID ${malId}:`, error)
    }
  }

  // 3rd. check annictWork.images other properties
  const urls = images.map((url) => url?.replace(httpRegex, 'https://') ?? '')

  for (const url of urls) {
    if (url !== '') {
      const isValid = await checkImage(url)
      if (isValid) return proxiedImage(url)
    }
  }

  return null
}

export const getImagesFromWork = (work: Work) => [
  work.images.recommended_url,
  work.images.twitter.image_url,
  work.images.twitter.normal_avatar_url,
  work.images.twitter.original_avatar_url,
]
