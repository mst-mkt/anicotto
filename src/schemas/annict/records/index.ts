import {
  boolean,
  integer,
  minValue,
  nullable,
  number,
  object,
  picklist,
  pipe,
  string,
} from 'valibot'
import { rating } from '../common'
import { episodeSchema } from '../episodes'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const recordSchema = object({
  id: number(),
  comment: nullable(string()),
  rating: nullable(picklist([0, 1, 2, 3, 4, 5])),
  rating_state: nullable(rating),
  is_modified: boolean(),
  likes_count: pipe(number(), integer(), minValue(0)),
  comments_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
  user: userSchema,
  work: workSchema,
  episode: episodeSchema,
})
