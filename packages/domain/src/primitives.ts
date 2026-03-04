import * as v from 'valibot'

export const NonNegativeIntSchema = v.pipe(v.number(), v.integer(), v.minValue(0))
export const PositiveIntSchema = v.pipe(v.number(), v.integer(), v.minValue(1))

type Url = `http://${string}` | `https://${string}`

export const UrlSchema = v.pipe(
  v.string(),
  v.custom<Url>(
    (value) =>
      typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')),
    'Invalid URL: Expected string starting with "http://" or "https://"',
  ),
)

export const IdSchema = <T extends string>(name: T) => v.pipe(PositiveIntSchema, v.brand(name))
