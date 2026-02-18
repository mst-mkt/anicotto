'use server'

import { Result } from 'neverthrow'
import { revalidateTag } from 'next/cache'
import type { InferOutput } from 'valibot'
import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Episode } from '../../../../schemas/annict/episodes'
import type { createRecordResponseSchema } from '../../../../schemas/annict/records/api'

export const createMultipleRecords = async (episodeIds: Episode['id'][]) => {
  if (episodeIds.length > 64) return { success: false, error: 'Too many episodes' } as const

  await auth()

  const recordResults = await (async () => {
    type CreateRecordsResponse = InferOutput<typeof createRecordResponseSchema>
    const results: Result<CreateRecordsResponse, string>[] = []

    for (const episodeId of episodeIds) {
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

      results.push(result)
    }

    return Result.combine(results)
  })()

  revalidateTag(CACHE_TAGS.MY_LIBRARIES)
  revalidateTag(CACHE_TAGS.MY_ACTIVITY)

  if (recordResults.isErr()) return { success: false, error: recordResults.error } as const

  return { success: true, data: recordResults.value } as const
}
