import { url, minLength, object, pipe, safeParse, string } from 'valibot'

const envVariablesSchema = object({
  // App
  BASE_URL: pipe(string(), url()),

  // Annict OAuth
  ANNICT_CLIENT_ID: pipe(string(), minLength(1)),
  ANNICT_CLIENT_SECRET: pipe(string(), minLength(1)),

  // Auth
  AUTH_SECRET: pipe(string(), minLength(1)),
})

const envVariablesResult = safeParse(envVariablesSchema, process.env)

if (!envVariablesResult.success) {
  console.error(process.env)
  throw new Error(`Invalid environment variables:
${envVariablesResult.issues.map((error) => `  - ${error.message}`).join('\n')}
`)
}

export const envVariables = envVariablesResult.output
