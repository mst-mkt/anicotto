import type { Metadata } from 'next'

export const PROJECT_ID = 'anicotto'
export const PROJECT_NAME = 'Anicotto'
export const PROJECT_DESCRIPTION = 'Third-party Annict web client'
export const PROJECT_AUTHOR = ['mst-mkt'] as const
export const PROJECT_OWNER = 'mst-mkt'
export const PROJECT_REPOSITORY_URL = `https://github.com/${PROJECT_OWNER}/${PROJECT_ID}`
export const PROJECT_LINKS = {
  github: PROJECT_REPOSITORY_URL,
  annict: 'https://annict.com/',
} as const

export const BASIC_METADATA = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
} satisfies Metadata
