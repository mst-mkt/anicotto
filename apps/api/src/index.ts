import { honoFactory } from './factory'
import { authRoutes } from './features/auth/route'
import { workRoutes } from './features/core/work/route'

const app = honoFactory
  .createApp()
  .basePath('/api')
  .route('/auth', authRoutes)
  .route('/works', workRoutes)
  .get('/health', (c) => c.json({ status: 'ok' }))

export default app
