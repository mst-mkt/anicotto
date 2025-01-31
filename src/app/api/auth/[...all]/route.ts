import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = await (async () => {
  // Error on `getCloudflareContext` unless dynamic import
  const { auth } = await import('../../../../lib/auth')
  return toNextJsHandler(auth.handler)
})()
