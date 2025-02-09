import type { Work } from '../schemas/annict/works'
import { proxiedImage } from './image-proxy'

const workImageChace = new Map<string, string | null>()

const checkImage = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.ok) return url
  } catch {
    return null
  }
  return null
}

export const getValidWorkImage = async (workId: string, images: Work['images']) => {
  if (workImageChace.has(workId)) {
    return workImageChace.get(workId) ?? null
  }

  const urls = [
    images.recommended_url,
    images.facebook.og_image_url,
    images.twitter.image_url,
    images.twitter.normal_avatar_url,
    images.twitter.original_avatar_url,
    images.twitter.mini_avatar_url,
    images.twitter.bigger_avatar_url,
  ]
    .map(proxiedImage)
    .filter((url) => url !== '')

  const validUrls = await (async () => {
    for (const url of urls) {
      const validUrl = await checkImage(url)
      if (validUrl) return validUrl
    }
    return null
  })()

  workImageChace.set(workId, validUrls)
  return validUrls
}
