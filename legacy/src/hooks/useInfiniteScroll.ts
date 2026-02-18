import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type InfiniteScrollResponse<T> = {
  next_page: number | null
  data: T[]
} | null

type UseInfiniteScrollOptions<T> = {
  initialData: T[]
  fetchData: (page: number, signal?: AbortSignal) => Promise<InfiniteScrollResponse<T>>
  initialPage?: number
  rootMargin?: number
  threshold?: number | number[]
}

type UseInfiniteScrollReturn<T> = {
  data: T[]
  status: 'loading' | 'error' | 'success'
  error: Error | null
  triggerRef: RefObject<HTMLDivElement | null>
  currentPage: number
  nextPage: number | null
  hasMore: boolean
  retry: () => void
  reset: () => void
}

export const useInfiniteScroll = <T>({
  initialData,
  fetchData,
  initialPage = 1,
  rootMargin = 64,
  threshold = 0,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> => {
  const [data, setData] = useState<T[]>(initialData)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [nextPage, setNextPage] = useState<number | null>(initialPage + 1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const triggerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || nextPage === null) return

    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    isLoadingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchData(nextPage, abortControllerRef.current.signal)

      if (response && response.data.length > 0) {
        setData((prev) => [...prev, ...response.data])
        setCurrentPage(nextPage)
        setNextPage(response.next_page)
      } else {
        setNextPage(null)
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
  }, [nextPage, fetchData])

  useEffect(() => {
    const currentTrigger = triggerRef.current
    if (!currentTrigger) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.at(0)?.isIntersecting && !isLoadingRef.current && nextPage !== null) {
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
  }, [loadMore, nextPage, rootMargin, threshold])

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  useEffect(() => {
    setData(initialData)
    setCurrentPage(initialPage)
    setNextPage(initialPage + 1)
  }, [initialData, initialPage])

  const retry = useCallback(() => {
    setError(null)
    loadMore()
  }, [loadMore])

  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setData(initialData)
    setCurrentPage(initialPage)
    setNextPage(initialPage + 1)
    setIsLoading(false)
    setError(null)
    isLoadingRef.current = false
  }, [initialData, initialPage])

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
    currentPage,
    nextPage,
    hasMore: nextPage !== null,
    retry,
    reset,
  }
}
