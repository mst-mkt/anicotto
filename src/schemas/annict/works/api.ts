import { array, integer, maxValue, minValue, number, object, optional, pipe, string } from 'valibot'
import { workSchema } from '.'
import { commaSeparatedString, order, pagenationInfo, status } from '../common'

export const worksQuerySchema = object({
  filter_ids: optional(commaSeparatedString(pipe(number(), integer()))),
  filter_season: optional(string()),
  filter_title: optional(string()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_season: optional(order),
  sort_watchers_count: optional(order),
})

export const worksResponseSchema = object({
  works: array(workSchema),
  ...pagenationInfo.entries,
})

export const meWorksQuerySchema = object({
  ...worksQuerySchema.entries,
  filter_status: optional(status),
})

export const meWorksResponseSchema = object({
  works: array(
    object({
      ...workSchema.entries,
      status: object({
        kind: status,
      }),
    }),
  ),
  ...pagenationInfo.entries,
})
