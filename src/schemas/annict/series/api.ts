import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { seriesSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'

export const seriesQuerySchema = object({
  filter_ids: optional(commaSeparatedString(seriesSchema.entries.id)),
  filter_name: optional(seriesSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
})

export const seriesResponseSchema = object({
  series: array(seriesSchema),
  ...paginationInfo.entries,
})
