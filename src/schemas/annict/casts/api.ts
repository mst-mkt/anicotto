import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { castSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'
import { workSchema } from '../works'

export const castsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(castSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_sort_number: optional(order),
})

export const castsResponseSchema = object({
  casts: array(castSchema),
  ...paginationInfo.entries,
})
