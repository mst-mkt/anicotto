'use server'

import { Result } from 'neverthrow'
import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import type { Episode } from '../../../schemas/annict/episodes'

export const createMultipleRecords = async (episodeIds: Episode['id'][]) => {
  if (episodeIds.length > 64) return { success: false, error: 'Too many episodes' } as const

  await auth()

  const recordResults = Result.combine(
    await Promise.all(
      episodeIds.map(async (episodeId) => {
        const result = await annictApiClient.createRecords(
          { query: { episode_id: episodeId } },
          { next: { tags: [`records-${episodeId}`] } },
        )

        if (result.isOk()) {
          revalidateTag(`records-${episodeId}`)
          revalidateTag(`episodes-${episodeId}`)
        }

        return result
      }),
    ),
  )

  revalidateTag('libraries')
  revalidateTag('activities')

  if (recordResults.isErr()) return { success: false, error: recordResults.error } as const

  return { success: true, data: recordResults.value } as const
}
