import createClient, { type ClientOptions } from 'openapi-fetch'

import { BASE_URL } from './constants'
import type { paths } from './schema.generated'

export const createAnnictClient = (
  token: string,
  options?: Omit<ClientOptions, 'baseUrl' | 'headers'>,
) => {
  return createClient<paths>({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  })
}
