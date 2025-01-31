import { getCloudflareContext } from '@opennextjs/cloudflare'

export const getDb = () => {
  const { env } = getCloudflareContext()
  return env.Database
}
