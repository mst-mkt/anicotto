import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { Work } from '../../../../../schemas/annict/works'

export const getReviews = async (workId: Work['id'], per = 20, page = 1) => {
  await auth()

  const reviewsResult = await annictApiClient.getReviews(
    {
      query: {
        filter_work_id: workId,
        filter_has_review_body: true,
        sort_likes_count: 'desc',
        per_page: per,
        page,
      },
    },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_REVIEWS(workId)] } },
  )

  if (reviewsResult.isErr()) {
    console.error(`[/works/${workId}/reviews] Failed to fetch reviews:`, reviewsResult.error)
    return null
  }

  return reviewsResult.value.reviews
}
