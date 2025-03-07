import { createLoader, parseAsString, parseAsStringLiteral } from 'nuqs/server'

export const searchSearchParams = {
  q: parseAsString.withOptions({ shallow: false }),
  r: parseAsStringLiteral(['works', 'characters', 'people', 'organizations'])
    .withDefault('works')
    .withOptions({ shallow: false }),
  sort: parseAsStringLiteral(['id', 'season', 'watchers']).withOptions({ shallow: false }),
  order: parseAsStringLiteral(['asc', 'desc']).withDefault('desc').withOptions({ shallow: false }),
}

export const loadSearchParams = createLoader(searchSearchParams)

export type SearchSort = NonNullable<ReturnType<typeof searchSearchParams.sort.parse>>
export type SearchOrder = typeof searchSearchParams.order.defaultValue
