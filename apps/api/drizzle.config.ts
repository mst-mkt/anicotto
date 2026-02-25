import { createHash, createHmac } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'drizzle-kit'

const BINDING = 'DB'
const WRANGLER_JSON_PATH = './wrangler.jsonc'
const SCHEMA_PATH = './src/features/**/schema.ts'

const wranglerJson = JSON.parse(readFileSync(WRANGLER_JSON_PATH, 'utf-8'))
const { database_id: databaseId, migrations_dir: migrationsDir } = wranglerJson.d1_databases.find(
  (db: { binding: string }) => db.binding === BINDING,
)

const getD1SqlitePath = (id: string): string => {
  const D1_SERVICE_UNIQUE_KEY = 'miniflare-D1DatabaseObject'

  const key = createHash('sha256').update(D1_SERVICE_UNIQUE_KEY).digest()
  const idHmac = createHmac('sha256', key).update(id).digest().subarray(0, 16)
  const hmac = createHmac('sha256', key).update(idHmac).digest().subarray(0, 16)
  const hash = Buffer.concat([idHmac, hmac]).toString('hex')

  const relativePath = `.wrangler/state/v3/d1/${D1_SERVICE_UNIQUE_KEY}/${hash}.sqlite`
  const absolutePath = resolve(process.cwd(), relativePath)

  return absolutePath
}

export default defineConfig({
  out: migrationsDir,
  schema: SCHEMA_PATH,
  dialect: 'sqlite',
  dbCredentials: { url: getD1SqlitePath(databaseId) },
})
