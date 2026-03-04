import * as v from 'valibot'

import { NonNegativeIntSchema, PositiveIntSchema } from './primitives'

export const PaginationParamsSchema = v.object({
  page: v.optional(PositiveIntSchema),
  limit: v.optional(v.pipe(PositiveIntSchema, v.maxValue(50))),
})
export type PaginationParams = v.InferOutput<typeof PaginationParamsSchema>

export const PaginationMetaSchema = v.object({
  totalCount: NonNegativeIntSchema,
  nextPage: v.nullable(PositiveIntSchema),
  prevPage: v.nullable(PositiveIntSchema),
})
export type PaginationMeta = v.InferOutput<typeof PaginationMetaSchema>
