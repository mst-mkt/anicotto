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
  transform,
} from 'valibot'

export const media = picklist(['tv', 'ova', 'movie', 'web', 'other'])
export const mediaText = picklist(['TV', 'OVA', '映画', 'Web', 'その他'])

export const order = picklist(['asc', 'desc'])

export const status = picklist(['wanna_watch', 'watching', 'watched', 'on_hold', 'stop_watching'])

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

export const paginationInfo = object({
  total_count: number(),
  next_page: nullable(number()),
  prev_page: nullable(number()),
})
