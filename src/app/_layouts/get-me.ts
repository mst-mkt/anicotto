import { annictApiClient } from '../../lib/api/annict-rest/client'
import { auth } from '../../lib/auth'
import { CACHE_TAGS } from '../../lib/cache-tag'

export const getMe = async () => {
  const session = await auth()

  if (session === null) {
    return null
  }

  const meResult = await annictApiClient.getMe({}, { next: { tags: [CACHE_TAGS.ME] } })

  if (meResult.isErr()) {
    return null
  }

  return meResult.value
}
