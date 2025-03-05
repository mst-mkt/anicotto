import { createLoader, parseAsString, parseAsStringLiteral } from 'nuqs/server'

export const searchSearchParams = {
  q: parseAsString.withOptions({ shallow: false }),
  r: parseAsStringLiteral(['works', 'characters', 'people', 'organizations']).withOptions({
    shallow: false,
  }),
  sort: parseAsStringLiteral(['id', 'season', 'watchers'])
    .withDefault('id')
    .withOptions({ shallow: false }),
  order: parseAsStringLiteral(['asc', 'desc']).withDefault('desc').withOptions({ shallow: false }),
}

export const loadSearchParams = createLoader(searchSearchParams)

export type SearchSort = typeof searchSearchParams.sort.defaultValue
export type SearchOrder = typeof searchSearchParams.order.defaultValue
