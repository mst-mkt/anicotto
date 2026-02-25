import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'drizzle-kit'

const WRANGLER_JSON_PATH = './wrangler.jsonc'
const WRANGLER_ACCOUNT_JSON_PATH = './node_modules/.cache/wrangler/wrangler-account.json'

const SCHEMA_PATH = './src/features/**/schema.ts'
const BINDING = 'DB'

const wranglerJson = JSON.parse(readFileSync(WRANGLER_JSON_PATH, 'utf-8'))
const wranglerAccountJson = JSON.parse(readFileSync(WRANGLER_ACCOUNT_JSON_PATH, 'utf-8'))

const { database_id: databaseId, migrations_dir: migrationsDir } = wranglerJson.d1_databases.find(
  (db: { binding: string }) => db.binding === BINDING,
)

const cloudflareAccountId =
  wranglerJson.account_id ?? wranglerAccountJson.account.id ?? process.env.CLOUDFLARE_ACCOUNT_ID
const cloudflareToken =
  process.env.CLOUDFLARE_API_TOKEN ??
  JSON.parse(execSync('pnpm wrangler auth token --json').toString()).token

if (cloudflareAccountId === undefined || cloudflareToken === undefined) {
  throw new Error('Cloudflare account ID or API token is not set.')
}

export default defineConfig({
  out: migrationsDir,
  schema: SCHEMA_PATH,
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: cloudflareAccountId,
    databaseId,
    token: cloudflareToken,
  },
})
