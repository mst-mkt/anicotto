import { array, literal, number, object, string, union } from 'valibot'
import { action, status } from '../common'
import { episodeSchema } from '../episodes'
import { recordSchema } from '../records'
import { reviewSchema } from '../reviews'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const baseActivitySchema = object({
  id: number(),
  user: userSchema,
  work: workSchema,
  action: action,
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
    kind: status,
  }),
})

export const activitySchema = union([
  createRecordActivitySchema,
  createReviewActivitySchema,
  createMultipleRecordsActivitySchema,
  createStatusActivitySchema,
])
