import { createLoader, parseAsString, parseAsStringLiteral } from 'nuqs/server'

export const searchSearchParams = {
  q: parseAsString.withOptions({ shallow: false }),
  r: parseAsStringLiteral(['works', 'characters', 'people', 'organizations']).withOptions({
    shallow: false,
  }),
}

export const loadSearchParams = createLoader(searchSearchParams)
