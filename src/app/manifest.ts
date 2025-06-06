import type { MetadataRoute } from 'next'
import { PROJECT_DESCRIPTION, PROJECT_ID, PROJECT_NAME } from '../constants/project'

const manifest = () =>
  ({
    name: PROJECT_NAME,
    short_name: PROJECT_ID,
    description: PROJECT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: 'oklch(100% 0 20)',
    theme_color: 'oklch(70% 0.2 20)',
    icons: [
      {
        sizes: '512x512',
        src: '/icon_512.png',
        type: 'image/png',
      },
      {
        sizes: '192x192',
        src: '/icon_192.png',
        type: 'image/png',
      },
    ],
  }) satisfies MetadataRoute.Manifest

export default manifest
