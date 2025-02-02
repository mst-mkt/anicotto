import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { staffSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'
import { organizationSchema } from '../organizations'
import { personSchema } from '../people'
import { workSchema } from '../works'

export const staffsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(staffSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_sort_number: optional(order),
})

export const staffsResponseSchema = object({
  staffs: array(
    object({
      ...staffSchema.entries,
      work: workSchema,
      person: optional(personSchema),
      organization: optional(organizationSchema),
    }),
  ),
  ...paginationInfo.entries,
})
