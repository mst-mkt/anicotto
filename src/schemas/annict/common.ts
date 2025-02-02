import {
  array,
  custom,
  null_,
  number,
  object,
  picklist,
  pipe,
  string,
  transform,
  union,
} from 'valibot'

export const media = picklist(['tv', 'ova', 'movie', 'web', 'other'])
export const mediaText = picklist(['TV', 'OVA', '映画', 'Web', 'その他'])

export const order = picklist(['asc', 'desc'])

export const status = picklist(['wanna_watch', 'watching', 'watched', 'on_hold', 'stop_watching'])

export const numericString = custom<'' | `${number}`>(
  (value) => value === '' || !Number.isNaN(Number.parseInt(`${value}`, 10)),
)

export const commaSeparatedString = pipe(
  array(string()),
  transform((value) => value.join(',')),
)

export const pagenationInfo = object({
  total_count: number(),
  next_page: union([number(), null_()]),
  prev_page: union([number(), null_()]),
})
