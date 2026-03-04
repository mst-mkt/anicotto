import { sValidator } from '@hono/standard-validator'

import { appError } from './error'

type ValidatorParameters = Parameters<typeof sValidator>

export const appValidator = <
  Target extends ValidatorParameters[0],
  Schema extends ValidatorParameters[1],
>(
  target: Target,
  schema: Schema,
) => {
  return sValidator(target, schema, (result) => {
    if (!result.success) throw appError('VALIDATION_ERROR')
  })
}
