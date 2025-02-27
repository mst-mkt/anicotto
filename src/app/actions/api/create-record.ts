'use server'

import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Rating } from '../../../schemas/annict/common'
import type { Episode } from '../../../schemas/annict/episodes'

export const createRecord = async (episodeId: Episode['id'], comment?: string, rating?: Rating) => {
  await auth()

  const result = await annictApiClient.createRecords(
    {
      query: {
        episode_id: episodeId,
        comment,
        rating_state: rating,
      },
    },
    {
      next: {
        tags: [
          CACHE_TAGS.EPISODE(episodeId),
          CACHE_TAGS.EPISODE_RECORDS(episodeId),
          CACHE_TAGS.MY_ACTIVITY,
          CACHE_TAGS.MY_RECORDS,
        ],
      },
    },
  )

  if (result.isErr()) return { success: false, error: result.error } as const

  revalidateTag(CACHE_TAGS.EPISODE(episodeId))
  revalidateTag(CACHE_TAGS.EPISODE_RECORDS(episodeId))
  revalidateTag(CACHE_TAGS.MY_RECORDS)
  revalidateTag(CACHE_TAGS.MY_ACTIVITY)

  return { success: true, data: result.value } as const
}
