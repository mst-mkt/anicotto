'use server'

import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Status } from '../../../schemas/annict/common'

export const updateStatus = async (workId: number, kind: Status) => {
  await auth()
  const result = await annictApiClient.createStatus({
    query: { work_id: workId, kind },
  })

  if (result.isErr()) {
    console.error(`[action|updateStatus|${workId}] Failed to update status:`, result.error)
    return { success: false }
  }

  revalidateTag(CACHE_TAGS.WORK(workId))
  revalidateTag(CACHE_TAGS.WORK_STATUS(workId))
  revalidateTag(CACHE_TAGS.MY_LIBRARIES)
  revalidateTag(CACHE_TAGS.MY_ACTIVITY)

  return { success: true }
}
