'use server'

import { Result } from 'neverthrow'
import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Episode } from '../../../schemas/annict/episodes'

export const createMultipleRecords = async (episodeIds: Episode['id'][]) => {
  if (episodeIds.length > 64) return { success: false, error: 'Too many episodes' } as const

  await auth()

  const recordResults = Result.combine(
    await Promise.all(
      episodeIds.map(async (episodeId) => {
        const result = await annictApiClient.createRecords(
          { query: { episode_id: episodeId } },
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

        if (result.isOk()) {
          revalidateTag(CACHE_TAGS.EPISODE_RECORDS(episodeId))
          revalidateTag(CACHE_TAGS.MY_RECORDS)
        }

        return result
      }),
    ),
  )

  revalidateTag(CACHE_TAGS.MY_LIBRARIES)
  revalidateTag(CACHE_TAGS.MY_ACTIVITY)

  if (recordResults.isErr()) return { success: false, error: recordResults.error } as const

  return { success: true, data: recordResults.value } as const
}
