import type { PaginationParams } from '@anicotto/domain/pagination'
import { getCurrentSeason, type Season, stringifySeason } from '@anicotto/domain/season'

import type { WorkRepository, WorkSortType } from './repository'

export const createWorkUsecase = (repository: WorkRepository) => ({
  searchWorks: (
    params: {
      query?: string
      season?: Season
      sort?: { type: WorkSortType; order: 'asc' | 'desc' }
    } & PaginationParams,
  ) => {
    return repository.searchWorks({
      query: params.query,
      season: params.season !== undefined ? stringifySeason(params.season) : undefined,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    })
  },

  getCurrentSeasonWorks: (params: PaginationParams) => {
    return repository.searchWorks({
      season: stringifySeason(getCurrentSeason()),
      sort: { type: 'watchers_count', order: 'desc' },
      ...params,
    })
  },

  getWorkById: (workId: number) => {
    return repository.getWorkById(workId)
  },
})

export type WorkUsecase = ReturnType<typeof createWorkUsecase>
