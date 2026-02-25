import { honoFactory } from '../../factory'
import { auth } from '../../libs/auth/client'

export const authRoutes = honoFactory.createApp().on(['POST', 'GET'], '/*', (c) => {
  return auth.handler(c.req.raw)
})
