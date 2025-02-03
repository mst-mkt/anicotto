import type { BaseIssue, BaseSchema, InferInput, InferOutput } from 'valibot'
import { castsQuerySchema, castsResponseSchema } from '../../schemas/annict/casts/api'
import {
  charactersQuerySchema,
  charactersResponseSchema,
} from '../../schemas/annict/characters/api'
import { episodesQuerySchema, episodesResponseSchema } from '../../schemas/annict/episodes/api'
import { followingQuerySchema, followingResponseSchema } from '../../schemas/annict/followee/api'
import { followersQuerySchema, followersResponseSchema } from '../../schemas/annict/followers/api'
import {
  organizationsQuerySchema,
  organizationsResponseSchema,
} from '../../schemas/annict/organizations/api'
import { peopleQuerySchema, peopleResponseSchema } from '../../schemas/annict/people/api'
import { meProgramsQuerySchema, meProgramsResponseSchema } from '../../schemas/annict/programs/api'
import {
  createRecordQuerySchema,
  createRecordResponseSchema,
  getRecordsQuerySchema,
  getRecordsResponseSchema,
  updateRecordQuerySchema,
  updateRecordResponseSchema,
} from '../../schemas/annict/records/api'
import {
  createReviewsQuerySchema,
  createReviewsResponseSchema,
  getReviewsQuerySchema,
  getReviewsResponseSchema,
  updateReviewsQuerySchema,
  updateReviewsResponseSchema,
} from '../../schemas/annict/reviews/api'
import { seriesQuerySchema, seriesResponseSchema } from '../../schemas/annict/series/api'
import { staffsQuerySchema, staffsResponseSchema } from '../../schemas/annict/staffs/api'
import { statusesQuerySchema } from '../../schemas/annict/statuses/api'
import {
  meResponseSchema,
  usersQuerySchema,
  usersResponseSchema,
} from '../../schemas/annict/users/api'
import {
  meWorksQuerySchema,
  meWorksResponseSchema,
  worksQuerySchema,
  worksResponseSchema,
} from '../../schemas/annict/works/api'
import { type ParsePathParam, generatePath, generateUrlWithQuery, validate } from './utils'

// biome-ignore lint/suspicious/noExplicitAny: Any is needed to receive any schema
type ValibotSchema = BaseSchema<any, any, BaseIssue<unknown>>
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export class AnnictClient {
  private baseUrl: string
  private accessToken: string | null

  constructor(baseUrl: string, accessToken?: string) {
    this.baseUrl = baseUrl
    this.accessToken = accessToken ?? null
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  private createFetcher = <
    Path extends string,
    QuerySchema extends ValibotSchema | undefined = undefined,
    ResponseSchema extends ValibotSchema | undefined = undefined,
  >(
    path: Path,
    method: Method,
    schemas: {
      query?: QuerySchema
      response?: ResponseSchema
    },
  ) => {
    type PathParam = ParsePathParam<Path>
    type Query = QuerySchema extends ValibotSchema ? InferInput<QuerySchema> : undefined
    type Response = ResponseSchema extends ValibotSchema ? InferOutput<ResponseSchema> : undefined

    type Params = QuerySchema extends ValibotSchema
      ? keyof PathParam extends never
        ? { query: Query; path?: undefined }
        : { query: Query; path: PathParam }
      : keyof PathParam extends never
        ? { query?: undefined; path?: undefined }
        : { query?: undefined; path: PathParam }

    const fetcher = async (params: Params, options?: RequestInit): Promise<Response> => {
      if (this.accessToken === null) {
        throw new Error('No token found')
      }

      const pathWithParams = generatePath(path, params.path)
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      }

      const validatedQuery = validate(schemas.query, params.query, 'query')
      const url = generateUrlWithQuery(`${this.baseUrl}${pathWithParams}`, validatedQuery)

      const fetchOptions: RequestInit = {
        ...options,
        method,
        headers: {
          ...headers,
          ...options?.headers,
        },
      }

      const response = await fetch(url.toString(), fetchOptions)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const jsonResponse = await response.json()
      const validatedResponse = validate(schemas.response, jsonResponse, 'response')

      return validatedResponse as Response
    }

    return fetcher
  }

  getWorks = this.createFetcher('/works', 'GET', {
    query: worksQuerySchema,
    response: worksResponseSchema,
  })

  getMeWorks = this.createFetcher('/me/works', 'GET', {
    query: meWorksQuerySchema,
    response: meWorksResponseSchema,
  })

  getEpisodes = this.createFetcher('/episodes', 'GET', {
    query: episodesQuerySchema,
    response: episodesResponseSchema,
  })

  getSeries = this.createFetcher('/series', 'GET', {
    query: seriesQuerySchema,
    response: seriesResponseSchema,
  })

  getCharacters = this.createFetcher('/characters', 'GET', {
    query: charactersQuerySchema,
    response: charactersResponseSchema,
  })

  getPeople = this.createFetcher('/people', 'GET', {
    query: peopleQuerySchema,
    response: peopleResponseSchema,
  })

  getOrganizations = this.createFetcher('/organizations', 'GET', {
    query: organizationsQuerySchema,
    response: organizationsResponseSchema,
  })

  getCasts = this.createFetcher('/casts', 'GET', {
    query: castsQuerySchema,
    response: castsResponseSchema,
  })

  getStaffs = this.createFetcher('/staffs', 'GET', {
    query: staffsQuerySchema,
    response: staffsResponseSchema,
  })

  getMePrograms = this.createFetcher('/me/programs', 'GET', {
    query: meProgramsQuerySchema,
    response: meProgramsResponseSchema,
  })

  getUsers = this.createFetcher('/users', 'GET', {
    query: usersQuerySchema,
    response: usersResponseSchema,
  })

  getMe = this.createFetcher('/me', 'GET', {
    response: meResponseSchema,
  })

  getFollowing = this.createFetcher('/following', 'GET', {
    query: followingQuerySchema,
    response: followingResponseSchema,
  })

  getFollowers = this.createFetcher('/followers', 'GET', {
    query: followersQuerySchema,
    response: followersResponseSchema,
  })

  createStatus = this.createFetcher('/me/statuses', 'POST', {
    query: statusesQuerySchema,
  })

  getRecords = this.createFetcher('/records', 'GET', {
    query: getRecordsQuerySchema,
    response: getRecordsResponseSchema,
  })

  createRecords = this.createFetcher('/me/records', 'POST', {
    query: createRecordQuerySchema,
    response: createRecordResponseSchema,
  })

  updateRecords = this.createFetcher('/me/records/{id}', 'PATCH', {
    query: updateRecordQuerySchema,
    response: updateRecordResponseSchema,
  })

  deleteRecords = this.createFetcher('/me/records/{id}', 'DELETE', {})

  getReviews = this.createFetcher('/reviews', 'GET', {
    query: getReviewsQuerySchema,
    response: getReviewsResponseSchema,
  })

  createReviews = this.createFetcher('/me/reviews', 'POST', {
    query: createReviewsQuerySchema,
    response: createReviewsResponseSchema,
  })

  updateReviews = this.createFetcher('/me/reviews/{id}', 'PATCH', {
    query: updateReviewsQuerySchema,
    response: updateReviewsResponseSchema,
  })

  deleteReviews = this.createFetcher('/me/reviews/{id}', 'DELETE', {})
}
