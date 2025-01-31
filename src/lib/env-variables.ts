import { getCloudflareContext } from '@opennextjs/cloudflare'
import { url, minLength, object, pipe, safeParse, string } from 'valibot'

const { env } = await getCloudflareContext()

const envVariablesSchema = object({
  // Annict Oauth
  ANNICT_CLIENT_ID: pipe(string(), minLength(1)),
  ANNICT_CLIENT_SECRET: pipe(string(), minLength(1)),

  // Better Auth
  BETTER_AUTH_SECRET: pipe(string(), minLength(1)),
  BETTER_AUTH_URL: pipe(string(), url()),
})

const envVariablesResult = safeParse(envVariablesSchema, env)

if (!envVariablesResult.success) {
  throw new Error(`Invalid environment variables:
${envVariablesResult.issues.map((error) => `  - ${error.message}`).join('\n')}
`)
}

export const envVariables = envVariablesResult.output
