import {
  type BaseIssue,
  type BaseSchema,
  type InferInput,
  type InferOutput,
  getDotPath,
  safeParse,
} from 'valibot'
import { castsQuerySchema, castsResponseSchema } from '../../schemas/annict/casts/api'
import {
  charactersQuerySchema,
  charactersResponseSchema,
} from '../../schemas/annict/characters/api'
import { episodesQuerySchema, episodesResponseSchema } from '../../schemas/annict/episodes/api'
import { followingQuerySchema, followingResponseSchema } from '../../schemas/annict/followee/api'
import {
  organizationsQuerySchema,
  organizationsResponseSchema,
} from '../../schemas/annict/organizations/api'
import { peopleQuerySchema, peopleResponseSchema } from '../../schemas/annict/people/api'
import { meProgramsQuerySchema, meProgramsResponseSchema } from '../../schemas/annict/programs/api'
import { seriesQuerySchema, seriesResponseSchema } from '../../schemas/annict/series/api'
import { staffsQuerySchema, staffsResponseSchema } from '../../schemas/annict/staffs/api'
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

  private validate = <T extends ValibotSchema | undefined>(
    schema: T,
    data: unknown,
    dataName?: string,
  ): T extends ValibotSchema ? InferOutput<T> : undefined => {
    // biome-ignore lint/suspicious/noExplicitAny: conditionally cast to any
    if (schema === undefined) return undefined as any

    const result = safeParse(schema, data)

    if (!result.success) {
      throw new Error(`
Invalid ${dataName ?? 'data'}:

${result.issues
  .map(
    (issue) => `  - ${getDotPath(issue)}:
    ${issue.message}`,
  )
  .join('\n')}
`)
    }

    return result.output
  }

  private createFetcher = <
    QuerySchema extends ValibotSchema | undefined = undefined,
    BodySchema extends ValibotSchema | undefined = undefined,
    ResponseSchema extends ValibotSchema | undefined = undefined,
  >(
    path: string,
    method: Method,
    schemas: {
      query?: QuerySchema
      body?: BodySchema
      response?: ResponseSchema
    },
  ) => {
    type Query = QuerySchema extends ValibotSchema ? InferInput<QuerySchema> : undefined
    type Body = BodySchema extends ValibotSchema ? InferInput<BodySchema> : undefined
    type Response = ResponseSchema extends ValibotSchema ? InferOutput<ResponseSchema> : undefined

    type Params = QuerySchema extends ValibotSchema
      ? BodySchema extends ValibotSchema
        ? { query: Query; body: Body }
        : { query: Query; body?: undefined }
      : BodySchema extends ValibotSchema
        ? { query?: undefined; body: Body }
        : { query?: undefined; body?: undefined }

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: for branching for error handling
    const fetcher = async (params: Params, options?: RequestInit): Promise<Response> => {
      if (this.accessToken === null) {
        throw new Error('No token found')
      }

      const url = new URL(`${this.baseUrl}${path}`)
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      }

      const validatedQuery = this.validate(schemas.query, params.query, 'query')
      for (const [key, value] of Object.entries(validatedQuery ?? {})) {
        url.searchParams.set(key, String(value))
      }

      const fetchOptions: RequestInit = {
        ...options,
        method,
        headers: {
          ...headers,
          ...options?.headers,
        },
      }

      const validatedBody = this.validate(schemas.body, params.body, 'body')

      if (validatedBody !== undefined) {
        fetchOptions.body = JSON.stringify(validatedBody)
      }

      const response = await fetch(url.toString(), fetchOptions)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const jsonResponse = await response.json()
      const validatedResponse = this.validate(schemas.response, jsonResponse, 'response')

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
}
