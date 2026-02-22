import createClient, { type ClientOptions } from 'openapi-fetch'

import { BASE_URL } from './constants'
import type { paths } from './schema.generated'

export type publicPaths = Omit<
  paths,
  | '/v1/followers'
  | '/v1/following'
  | '/v1/me'
  | '/v1/me/following_activities'
  | '/v1/me/programs'
  | '/v1/me/records'
  | '/v1/me/records/{id}'
  | '/v1/me/reviews'
  | '/v1/me/reviews/{id}'
  | '/v1/me/statuses'
  | '/v1/me/works'
>

export const createAnnictPublicClient = (
  token: string,
  options?: Omit<ClientOptions, 'baseUrl' | 'headers'>,
) => {
  return createClient<publicPaths>({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  })
}
