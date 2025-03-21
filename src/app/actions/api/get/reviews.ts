'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Work } from '../../../../schemas/annict/works'

export const getWorkReviews = async (workId: Work['id'], page = 1) => {
  await auth()

  const reviewsResult = await annictApiClient.getReviews(
    {
      query: {
        filter_work_id: workId,
        filter_has_review_body: true,
        sort_likes_count: 'desc',
        per_page: 20,
        page,
      },
    },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_REVIEWS(workId)] } },
  )

  if (reviewsResult.isErr()) {
    console.error(`Failed to fetch reviews of work (${workId}):`, reviewsResult.error)
    return null
  }

  return { data: reviewsResult.value.reviews, next_page: reviewsResult.value.next_page }
}
