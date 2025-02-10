import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'

export const getWork = async (workId: number) => {
  await auth()
  const worksResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [`works-${workId}`] } },
  )

  if (worksResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch work:`, worksResult.error)
    return null
  }

  return worksResult.value.works.at(0) ?? null
}

export const getWorkStatus = async (workId: number) => {
  await auth()
  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [`status-${workId}`] } },
  )

  if (statusResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch status:`, statusResult.error)
    return null
  }

  return statusResult.value.works.at(0)?.status.kind ?? 'no_select'
}

export const getEpisodes = async (workId: number) => {
  await auth()
  const episodesResult = await annictApiClient.getEpisodes(
    { query: { filter_work_id: workId, sort_sort_number: 'asc' } },
    { next: { tags: [`episodes-${workId}`] } },
  )

  if (episodesResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch episodes:`, episodesResult.error)
    return null
  }

  return episodesResult.value.episodes
}

export const getReviews = async (workId: number) => {
  await auth()
  const reviewsResult = await annictApiClient.getReviews(
    { query: { filter_work_id: workId, filter_has_review_body: true, sort_likes_count: 'desc' } },
    { next: { tags: [`reviews-${workId}`] } },
  )

  if (reviewsResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch reviews:`, reviewsResult.error)
    return null
  }

  return reviewsResult.value.reviews
}
