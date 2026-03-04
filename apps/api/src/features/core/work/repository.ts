import type { PaginationParams } from '@anicotto/domain/pagination'
import { collect, err, ok } from '@anicotto/utils/result'

import type { AnnictClient } from '../../../types/annict-client'
import { convertAnnictWork } from './converter'

export type WorkSortType = 'id' | 'season' | 'watchers_count'

export type SearchWorksParams = {
  query?: string
  season?: string
  sort?: { type: WorkSortType; order: 'asc' | 'desc' }
} & PaginationParams

export const createWorkRepository = (client: AnnictClient) => ({
  searchWorks: async (params: SearchWorksParams) => {
    const { data, error } = await client.GET('/v1/works', {
      params: {
        query: {
          filter_title: params.query,
          filter_season: params.season,
          sort_id: params.sort?.type === 'id' ? params.sort.order : undefined,
          sort_season: params.sort?.type === 'season' ? params.sort.order : undefined,
          sort_watchers_count:
            params.sort?.type === 'watchers_count' ? params.sort.order : undefined,
          page: params.page,
          per_page: params.limit,
        },
      },
    })

    if (data === undefined) {
      console.error('[work:repository] Annict API error:', error)
      return err('BAD_GATEWAY')
    }

    const worksResult = collect(data.works.map(convertAnnictWork))
    if (!worksResult.ok) return worksResult

    return ok({
      works: worksResult.value,
      totalCount: data.total_count,
      nextPage: data.next_page,
      prevPage: data.prev_page,
    })
  },

  getWorkById: async (workId: number) => {
    const { data, error } = await client.GET('/v1/works', {
      params: {
        query: {
          filter_ids: [workId],
          per_page: 1,
        },
      },
    })

    if (data === undefined) {
      console.error('[work:repository] Annict API error:', error)
      return err('BAD_GATEWAY')
    }

    const annictWork = data.works.at(0)
    if (annictWork === undefined) {
      return err('NOT_FOUND')
    }

    return convertAnnictWork(annictWork)
  },
})

export type WorkRepository = ReturnType<typeof createWorkRepository>
