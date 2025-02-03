import {
  type BaseIssue,
  type BaseSchema,
  array,
  custom,
  nullable,
  number,
  object,
  picklist,
  pipe,
  string,
  transform,
} from 'valibot'

export const mediaPicklist = picklist(['tv', 'ova', 'movie', 'web', 'other'])
export const mediaTextPicklist = picklist(['TV', 'OVA', '映画', 'Web', 'その他'])

export const orderPicklist = picklist(['asc', 'desc'])

export const statusPicklist = picklist([
  'wanna_watch',
  'watching',
  'watched',
  'on_hold',
  'stop_watching',
])
export const ratingPicklist = picklist(['bad', 'average', 'good', 'great'])
export const actionPicklist = picklist([
  'create_record',
  'create_review',
  'create_multiple_records',
  'create_status',
])

export const numericString = custom<'' | `${number}`>(
  (value) => value === '' || !Number.isNaN(Number.parseInt(`${value}`, 10)),
)

export const commaSeparatedString = <
  ItemSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  itemSchema: ItemSchema,
) =>
  pipe(
    array(itemSchema),
    transform((value) => value.join(',')),
  )

export const paginationInfoSchema = object({
  total_count: number(),
  next_page: nullable(number()),
  prev_page: nullable(number()),
})

export const prefectureSchema = object({
  id: number(),
  name: string(),
})

export const channelSchema = object({
  id: number(),
  name: string(),
})
