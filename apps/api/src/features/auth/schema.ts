import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const userSchema = sqliteTable('user', (d) => ({
  id: d.text('id').primaryKey(),
  name: d.text('name').notNull(),
  email: d.text('email').notNull(),
  emailVerified: d.integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: d.text('image'),
  createdAt: d.integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: d.integer('updated_at', { mode: 'timestamp' }).notNull(),
}))

export const sessionSchema = sqliteTable('session', (d) => ({
  id: d.text('id').primaryKey(),
  expiresAt: d.integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: d.text('token').notNull().unique(),
  ipAddress: d.text('ip_address'),
  userAgent: d.text('user_agent'),
  userId: d
    .text('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
  createdAt: d.integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: d.integer('updated_at', { mode: 'timestamp' }).notNull(),
}))

export const accountSchema = sqliteTable('account', (d) => ({
  id: d.text('id').primaryKey(),
  accountId: d.text('account_id').notNull(),
  providerId: d.text('provider_id').notNull(),
  userId: d
    .text('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
  accessToken: d.text('access_token'),
  refreshToken: d.text('refresh_token'),
  idToken: d.text('id_token'),
  accessTokenExpiresAt: d.integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: d.integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: d.text('scope'),
  password: d.text('password'),
  createdAt: d.integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: d.integer('updated_at', { mode: 'timestamp' }).notNull(),
}))

export const verificationSchema = sqliteTable('verification', (d) => ({
  id: d.text('id').primaryKey(),
  identifier: d.text('identifier').notNull(),
  value: d.text('value').notNull(),
  expiresAt: d.integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: d.integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: d.integer('updated_at', { mode: 'timestamp' }).notNull(),
}))
