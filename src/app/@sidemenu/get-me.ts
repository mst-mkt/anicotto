import { annictApiClient } from '../../lib/api/client'
import { auth } from '../../lib/auth'
import { CACHE_TAGS } from '../../lib/cache-tag'

export const getMe = async () => {
  await auth()

  const meResult = await annictApiClient.getMe({}, { next: { tags: [CACHE_TAGS.ME] } })

  if (meResult.isErr()) {
    return null
  }

  return meResult.value
}
