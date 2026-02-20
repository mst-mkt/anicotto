import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const schemaPath = fileURLToPath(import.meta.resolve('@anicotto/annict-openapi/openapi.yaml'))

execSync(`openapi-typescript ${schemaPath} -o src/schema.generated.ts`, {
  stdio: 'inherit',
})
