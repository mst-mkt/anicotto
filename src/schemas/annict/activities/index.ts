import { array, integer, literal, number, object, pipe, string, union } from 'valibot'
import { actionPicklist, statusPicklist } from '../common'
import { episodeSchema } from '../episodes'
import { recordSchema } from '../records'
import { reviewSchema } from '../reviews'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const baseActivitySchema = object({
  id: pipe(number(), integer()),
  user: userSchema,
  work: workSchema,
  action: actionPicklist,
  created_at: string(),
})

const createRecordActivitySchema = object({
  ...baseActivitySchema.entries,
  action: literal('create_record'),
  episode: episodeSchema,
  record: recordSchema,
})

const createReviewActivitySchema = object({
  ...baseActivitySchema.entries,
  action: literal('create_review'),
  review: reviewSchema,
})

const createMultipleRecordsActivitySchema = object({
  ...baseActivitySchema.entries,
  action: literal('create_multiple_records'),
  multiple_records: array(
    object({
      episode: episodeSchema,
      record: recordSchema,
    }),
  ),
})

const createStatusActivitySchema = object({
  ...baseActivitySchema.entries,
  action: literal('create_status'),
  status: object({
    kind: statusPicklist,
  }),
})

export const activitySchema = union([
  createRecordActivitySchema,
  createReviewActivitySchema,
  createMultipleRecordsActivitySchema,
  createStatusActivitySchema,
])
