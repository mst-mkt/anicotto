import { createLoader, parseAsInteger } from 'nuqs/server'

export const trackSearchParams = {
  episode: parseAsInteger,
}

export const loadSearchParams = createLoader(trackSearchParams)
