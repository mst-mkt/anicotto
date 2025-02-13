import { annictApiClient } from '../../lib/api/client'
import { auth } from '../../lib/auth'

export const getMe = async () => {
  await auth()

  const meResult = await annictApiClient.getMe({}, { next: { tags: ['me'] } })

  if (meResult.isErr()) {
    return null
  }

  return meResult.value
}
