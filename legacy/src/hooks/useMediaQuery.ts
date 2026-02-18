import { useSyncExternalStore } from 'react'

const subscribe = (mediaQuery: MediaQueryList, callback: () => void) => {
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

export const useMediaQuery = (query: string): boolean => {
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(
    (onChange) => subscribe(window.matchMedia(query), onChange),
    getSnapshot,
    getServerSnapshot,
  )
}
