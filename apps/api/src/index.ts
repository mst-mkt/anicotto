import { honoFactory } from './factory'

const app = honoFactory
  .createApp()
  .basePath('/api')
  .get('/health', (c) => c.json({ status: 'ok' }))

export default app
