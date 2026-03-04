import { SeasonNameSchema } from '@anicotto/domain/season'
import * as v from 'valibot'

import { honoFactory } from '../../../factory'
import { appError } from '../../../libs/error'
import { appValidator } from '../../../libs/validator'
import { requireAuth } from '../../../middleware/auth'
import { createWorkRepository } from './repository'
import { createWorkUsecase } from './usecase'

const sortTypeSchema = v.picklist(['id', 'season', 'watchers_count'])
const sortOrderSchema = v.picklist(['asc', 'desc'])

const idSchema = v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1))
const yearSchema = v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1900), v.maxValue(2200))
const pageSchema = v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1))
const limitSchema = v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1), v.maxValue(50))

export const workRoutes = honoFactory
  .createApp()
  .use(requireAuth)
  .get(
    '/',
    appValidator(
      'query',
      v.object({
        q: v.optional(v.pipe(v.string(), v.nonEmpty())),
        season: v.optional(SeasonNameSchema),
        year: v.optional(yearSchema),
        sort_type: v.optional(sortTypeSchema),
        sort_order: v.optional(sortOrderSchema),
        page: v.optional(pageSchema),
        limit: v.optional(limitSchema),
      }),
    ),
    async (c) => {
      const { q, season, year, sort_type, sort_order, page, limit } = c.req.valid('query')
      const repository = createWorkRepository(c.var.annictClient)
      const usecase = createWorkUsecase(repository)

      const result = await usecase.searchWorks({
        query: q,
        season: year !== undefined ? { year, name: season ?? 'all' } : undefined,
        sort:
          sort_type !== undefined ? { type: sort_type, order: sort_order ?? 'desc' } : undefined,
        page,
        limit,
      })

      if (!result.ok) throw appError(result.error)
      return c.json(result.value)
    },
  )
  .get(
    '/current-season',
    appValidator(
      'query',
      v.object({
        page: v.optional(pageSchema),
        limit: v.optional(limitSchema),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid('query')
      const repository = createWorkRepository(c.var.annictClient)
      const usecase = createWorkUsecase(repository)

      const result = await usecase.getCurrentSeasonWorks({ page, limit })

      if (!result.ok) throw appError(result.error)
      return c.json(result.value)
    },
  )
  .get('/:id', appValidator('param', v.object({ id: idSchema })), async (c) => {
    const { id } = c.req.valid('param')
    const repository = createWorkRepository(c.var.annictClient)
    const usecase = createWorkUsecase(repository)
    const result = await usecase.getWorkById(id)

    if (!result.ok) throw appError(result.error)
    return c.json(result.value)
  })
