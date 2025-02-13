'use server'

import { revalidateTag } from 'next/cache'

// biome-ignore lint/suspicious/useAwait: server actions must be async functions
export const revalidate = async (tag: string) => {
  revalidateTag(tag)
}
