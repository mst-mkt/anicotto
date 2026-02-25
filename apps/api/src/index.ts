import { honoFactory } from './factory'
import { authRoutes } from './features/auth/route'

const app = honoFactory
  .createApp()
  .basePath('/api')
  .route('/auth', authRoutes)
  .get('/health', (c) => c.json({ status: 'ok' }))

export default app
