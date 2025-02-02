import {
  type BaseIssue,
  type BaseSchema,
  type InferInput,
  type InferOutput,
  safeParse,
} from 'valibot'

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

${result.issues.map((issue) => `  - ${issue}`).join('\n')}
`)
    }

    return result.output
  }

  private createFetcher<
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
  ) {
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

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    }

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: for branching for error handling
    const fetcher = async (params: Params, options?: RequestInit): Promise<Response> => {
      if (this.accessToken === null) {
        throw new Error('No token found')
      }

      const url = new URL(path, this.baseUrl)

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
}
