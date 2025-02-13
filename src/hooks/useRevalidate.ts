import { useCallback, useTransition } from 'react'
import { revalidate } from '../app/actions/revalidate'

export const useRevalidate = (tag: string) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = useCallback(() => {
    startTransition(() => revalidate(tag))
  }, [tag])

  return { isPending, revalidate: handleRevalidate }
}
