import { type Result, err, ok } from 'neverthrow'
import type { BaseIssue, BaseSchema, InferInput, InferOutput } from 'valibot'
import {
  getActivitiesQuerySchema,
  getActivitiesResponseSchema,
  getFollowingActivitiesQuerySchema,
  getFollowingActivitiesResponseSchema,
} from '../../schemas/annict/activities/api'
import { getCastsQuerySchema, getCastsResponseSchema } from '../../schemas/annict/casts/api'
import {
  getCharactersQuerySchema,
  getCharactersResponseSchema,
} from '../../schemas/annict/characters/api'
import {
  getEpisodesQuerySchema,
  getEpisodesResponseSchema,
} from '../../schemas/annict/episodes/api'
import {
  getFollowingQuerySchema,
  getFollowingResponseSchema,
} from '../../schemas/annict/followee/api'
import {
  getFollowersQuerySchema,
  getFollowersResponseSchema,
} from '../../schemas/annict/followers/api'
import {
  getOrganizationsQuerySchema,
  getOrganizationsResponseSchema,
} from '../../schemas/annict/organizations/api'
import { getPeopleQuerySchema, getPeopleResponseSchema } from '../../schemas/annict/people/api'
import {
  getMyProgramsQuerySchema,
  getMyProgramsResponseSchema,
} from '../../schemas/annict/programs/api'
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
import { getSeriesQuerySchema, getSeriesResponseSchema } from '../../schemas/annict/series/api'
import { getStaffsQuerySchema, getStaffsResponseSchema } from '../../schemas/annict/staffs/api'
import { createStatusesQuerySchema } from '../../schemas/annict/statuses/api'
import {
  getMeResponseSchema,
  getUsersQuerySchema,
  getUsersResponseSchema,
} from '../../schemas/annict/users/api'
import {
  getMyWorksQuerySchema,
  getMyWorksResponseSchema,
  getWorksQuerySchema,
  getWorksResponseSchema,
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

    const fetcher = async (
      params: Params,
      options?: RequestInit,
      // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: for branching for error handling
    ): Promise<Result<Response, string>> => {
      if (this.accessToken === null) {
        return err('Access token is not set')
      }

      const pathWithParams = generatePath(path, params.path)
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      }

      const validatedQuery = validate(schemas.query, params.query, 'query')

      if (validatedQuery.isErr()) {
        return err(validatedQuery.error)
      }

      const url = generateUrlWithQuery(`${this.baseUrl}${pathWithParams}`, validatedQuery.value)

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
        return err(`Failed to fetch: ${response.statusText}`)
      }

      if (schemas.response === undefined) {
        return ok(undefined as Response)
      }

      const jsonResponse = await response.json()
      const validatedResponse = validate(schemas.response, jsonResponse, 'response')

      if (validatedResponse.isErr()) {
        return err(`Failed to validate response: ${validatedResponse.error}`)
      }

      return ok(validatedResponse.value as Response)
    }

    return fetcher
  }

  getWorks = this.createFetcher('/works', 'GET', {
    query: getWorksQuerySchema,
    response: getWorksResponseSchema,
  })

  getMyWorks = this.createFetcher('/me/works', 'GET', {
    query: getMyWorksQuerySchema,
    response: getMyWorksResponseSchema,
  })

  getEpisodes = this.createFetcher('/episodes', 'GET', {
    query: getEpisodesQuerySchema,
    response: getEpisodesResponseSchema,
  })

  getSeries = this.createFetcher('/series', 'GET', {
    query: getSeriesQuerySchema,
    response: getSeriesResponseSchema,
  })

  getCharacters = this.createFetcher('/characters', 'GET', {
    query: getCharactersQuerySchema,
    response: getCharactersResponseSchema,
  })

  getPeople = this.createFetcher('/people', 'GET', {
    query: getPeopleQuerySchema,
    response: getPeopleResponseSchema,
  })

  getOrganizations = this.createFetcher('/organizations', 'GET', {
    query: getOrganizationsQuerySchema,
    response: getOrganizationsResponseSchema,
  })

  getCasts = this.createFetcher('/casts', 'GET', {
    query: getCastsQuerySchema,
    response: getCastsResponseSchema,
  })

  getStaffs = this.createFetcher('/staffs', 'GET', {
    query: getStaffsQuerySchema,
    response: getStaffsResponseSchema,
  })

  getMyPrograms = this.createFetcher('/me/programs', 'GET', {
    query: getMyProgramsQuerySchema,
    response: getMyProgramsResponseSchema,
  })

  getUsers = this.createFetcher('/users', 'GET', {
    query: getUsersQuerySchema,
    response: getUsersResponseSchema,
  })

  getMe = this.createFetcher('/me', 'GET', {
    response: getMeResponseSchema,
  })

  getFollowing = this.createFetcher('/following', 'GET', {
    query: getFollowingQuerySchema,
    response: getFollowingResponseSchema,
  })

  getFollowers = this.createFetcher('/followers', 'GET', {
    query: getFollowersQuerySchema,
    response: getFollowersResponseSchema,
  })

  createStatus = this.createFetcher('/me/statuses', 'POST', {
    query: createStatusesQuerySchema,
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

  getActivities = this.createFetcher('/activities', 'GET', {
    query: getActivitiesQuerySchema,
    response: getActivitiesResponseSchema,
  })

  getFollowingActivities = this.createFetcher('/me/following_activities', 'GET', {
    query: getFollowingActivitiesQuerySchema,
    response: getFollowingActivitiesResponseSchema,
  })
}
