import { createLoader, parseAsStringLiteral } from 'nuqs/server'
import { statusPicklist } from '../../../schemas/annict/common'

export const librarySearchParams = {
  status: parseAsStringLiteral(statusPicklist.options.filter((status) => status !== 'no_select')),
}

export const loadSearchParams = createLoader(librarySearchParams)
