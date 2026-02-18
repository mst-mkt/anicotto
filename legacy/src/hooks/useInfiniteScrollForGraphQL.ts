import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type InfiniteScrollResponse<T> = {
  endCursor: string | null
  data: T[]
} | null

type UseInfiniteScrollOptions<T> = {
  initialData: T[]
  fetchData: (after: string, signal?: AbortSignal) => Promise<InfiniteScrollResponse<T>>
  initialEndCursor?: string | null
  rootMargin?: number
  threshold?: number | number[]
}

type UseInfiniteScrollReturn<T> = {
  data: T[]
  status: 'loading' | 'error' | 'success'
  error: Error | null
  triggerRef: RefObject<HTMLDivElement | null>
  hasMore: boolean
  retry: () => void
  reset: () => void
}

// for Annict GraphQL API
export const useInfiniteScroll = <T>({
  initialData,
  initialEndCursor = null,
  fetchData,
  rootMargin = 64,
  threshold = 0,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> => {
  const [data, setData] = useState<T[]>(initialData)
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const triggerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || endCursor === null) return

    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    isLoadingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchData(endCursor, abortControllerRef.current.signal)

      if (response && response.data.length > 0) {
        setData((prev) => [...prev, ...response.data])
        setEndCursor(response.endCursor)
      } else {
        setEndCursor(null)
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error fetching data:', err)
        setError(err)
      }
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [endCursor, fetchData])

  useEffect(() => {
    const currentTrigger = triggerRef.current
    if (!currentTrigger) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.at(0)?.isIntersecting && !isLoadingRef.current && endCursor !== null) {
          loadMore()
        }
      },
      { rootMargin: `${rootMargin}px`, threshold },
    )

    observer.observe(currentTrigger)

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current)
      }
      observer.disconnect()
    }
  }, [loadMore, endCursor, rootMargin, threshold])

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  useEffect(() => {
    setData(initialData)
    setEndCursor(initialEndCursor)
  }, [initialData, initialEndCursor])

  const retry = useCallback(() => {
    setError(null)
    loadMore()
  }, [loadMore])

  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setData(initialData)
    setEndCursor(initialEndCursor)
    setIsLoading(false)
    setError(null)
    isLoadingRef.current = false
  }, [initialData, initialEndCursor])

  const status = useMemo(() => {
    if (isLoading) return 'loading'
    if (error !== null) return 'error'
    return 'success'
  }, [isLoading, error])

  return {
    data,
    status,
    error,
    triggerRef,
    hasMore: endCursor !== null,
    retry,
    reset,
  }
}
