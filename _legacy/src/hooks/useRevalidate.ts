import { useCallback, useTransition } from 'react'
import { revalidate } from '../app/actions/revalidate'

export const useRevalidate = (...tags: string[]) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = useCallback(() => {
    startTransition(() => {
      Promise.all(tags.map((tag) => revalidate(tag)))
    })
  }, [tags])

  return { isPending, revalidate: handleRevalidate }
}
