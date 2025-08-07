import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { seriesSchema } from '.'

export const getSeriesQuerySchema = object({
  filter_ids: optional(commaSeparatedString(seriesSchema.entries.id)),
  filter_name: optional(seriesSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getSeriesResponseSchema = object({
  series: array(seriesSchema),
  ...paginationInfoSchema.entries,
})
