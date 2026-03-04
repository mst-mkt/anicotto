import { err, ok } from '@anicotto/utils/result'
import { and, eq } from 'drizzle-orm'

import { dbClient } from '../../db/client'
import { accountSchema } from '../../features/auth/schema'

export const getOAuthToken = async (userId: string, providerId: string) => {
  const account = await dbClient
    .select({ accessToken: accountSchema.accessToken })
    .from(accountSchema)
    .where(and(eq(accountSchema.userId, userId), eq(accountSchema.providerId, providerId)))
    .get()

  if (account?.accessToken == null) {
    return err('TOKEN_NOT_FOUND')
  }

  return ok(account.accessToken)
}
