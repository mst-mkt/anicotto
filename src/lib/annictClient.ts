import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { ANNICT_API_BASEURL } from '../constants/annict'
import { auth } from './auth'

export const annictClient = createClient({
  url: `${ANNICT_API_BASEURL}/graphql`,
  fetch: async (url, fetchOptions = {}) => {
    const session = await auth()

    if (session?.accessToken === undefined) {
      throw new Error('No token found')
    }

    return fetch(url, {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
  },
  exchanges: [cacheExchange, fetchExchange],
})
