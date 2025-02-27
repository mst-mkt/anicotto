import { useCallback, useTransition } from 'react'
import { revalidate } from '../app/actions/revalidate'

export const useRevalidate = (...tags: string[]) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = useCallback(() => {
    startTransition(() => {
      for (const tag of tags) {
        revalidate(tag)
      }
    })
  }, [tags])

  return { isPending, revalidate: handleRevalidate }
}
