import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const APP_ERROR_CODES = [
  'UNAUTHORIZED',
  'TOKEN_NOT_FOUND',
  'NOT_FOUND',
  'VALIDATION_ERROR',
  'INTERNAL_ERROR',
  'BAD_GATEWAY',
] as const

export type AppErrorCode = (typeof APP_ERROR_CODES)[number]

const STATUS_MAP = {
  UNAUTHORIZED: 401,
  TOKEN_NOT_FOUND: 401,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502,
} as const satisfies Record<AppErrorCode, ContentfulStatusCode>

export const appError = (code: AppErrorCode) => {
  const status = STATUS_MAP[code]
  return new HTTPException(status, {
    res: Response.json({ error: { code } }, { status }),
  })
}
