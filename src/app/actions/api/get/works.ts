'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Status } from '../../../../schemas/annict/common'
import type { Work } from '../../../../schemas/annict/works'
import { getCurrentSeason } from '../../../../utils/get-season'

export const getCurrentSeasonWorks = async (count = 12) => {
  await auth()

  const currentSeason = getCurrentSeason()

  const works = await annictApiClient.getWorks(
    { query: { filter_season: currentSeason, sort_watchers_count: 'desc', per_page: count } },
    { next: { tags: [CACHE_TAGS.WORKS_SEASON(currentSeason), CACHE_TAGS.WORKS_CURRENT_SEASON] } },
  )

  if (works.isErr()) {
    console.error('Failed to fetch current-season works:', works.error)
    return null
  }

  return works.value.works
}

export const getMyWorks = async (status: Status, page = 1) => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks(
    { query: { sort_season: 'desc', filter_status: status, per_page: 20, page } },
    {
      next: {
        tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES, CACHE_TAGS.MY_LIBRARIES_STATUS(status)],
      },
    },
  )

  if (worksResult.isErr()) {
    return null
  }

  return { data: worksResult.value.works, next_page: worksResult.value.next_page }
}

export const searchWorks = async (
  search: {
    query: string
    sort: 'season' | 'id' | 'watchers'
    order: 'asc' | 'desc'
    season?: string
  },
  page = 1,
) => {
  await auth()

  const worksResult = await annictApiClient.getWorks(
    {
      query: {
        filter_title: search.query,
        filter_season: search.season,
        sort_id: search.sort === 'id' ? search.order : undefined,
        sort_season: search.sort === 'season' ? search.order : undefined,
        sort_watchers_count: search.sort === 'watchers' ? search.order : undefined,
        per_page: 20,
        page,
      },
    },
    { next: { tags: [CACHE_TAGS.WORKS] } },
  )

  if (worksResult.isErr()) {
    console.error(`Failed to search works (query:${search.query}):`, worksResult.error)
    return null
  }

  return { data: worksResult.value.works, next_page: worksResult.value.next_page }
}

export const getWork = async (workId: Work['id']) => {
  await auth()

  const workResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.WORK(workId)] } },
  )

  if (workResult.isErr()) {
    console.error(`Failed to fetch work (id:${workId}):`, workResult.error)
    return null
  }

  return workResult.value.works.at(0) ?? null
}
