import createClient, { type ClientOptions } from 'openapi-fetch'

import type { paths } from './schema.generated'

const BASE_URL = 'https://api.annict.com'

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
