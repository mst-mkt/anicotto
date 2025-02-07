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
import { ratingPicklist } from '../common'

export const recordSchema = object({
  id: pipe(number(), integer()),
  comment: nullable(string()),
  rating: nullable(picklist([0, 1, 2, 3, 4, 5])),
  rating_state: nullable(ratingPicklist),
  is_modified: boolean(),
  likes_count: pipe(number(), integer(), minValue(0)),
  comments_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
})
