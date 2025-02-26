import { useSyncExternalStore } from 'react'

const isClient = typeof window !== 'undefined'

const parseStorageValue = <T>(item: string | null, initialValue: T, key: string): T => {
  if (item === null) return initialValue

  try {
    return JSON.parse(item)
  } catch (parseError) {
    if (typeof item === typeof initialValue) {
      return item as unknown as T
    }
    console.error(`Error parsing localStorage key "${key}":`, parseError)
    return initialValue
  }
}

/**
 * Custom hook that synchronizes state with localStorage
 * @param key The localStorage key to use
 * @param initialValue The initial value to use if no value exists in localStorage
 * @returns A stateful value and a function to update it (similar to useState)
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevState: T) => T)) => void] {
  const getSnapshot = (): T => {
    if (!isClient) return initialValue

    try {
      const item = localStorage.getItem(key)

      if (item === null) {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }

      return parseStorageValue(item, initialValue, key)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const subscribe = (callback: () => void): (() => void) => {
    // biome-ignore lint/suspicious/noEmptyBlockStatements: with SSR, there's no need to unsubscribe
    if (!isClient) return () => {}

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) callback()
    }

    const handleCustomChange = (e: CustomEvent) => {
      if (e.detail === key) callback()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleCustomChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleCustomChange as EventListener)
    }
  }

  const getServerSnapshot = () => initialValue

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = (valueOrFn: T | ((prevState: T) => T)): void => {
    if (!isClient) return

    try {
      const prevValue = getSnapshot()
      const newValue = valueOrFn instanceof Function ? valueOrFn(prevValue) : valueOrFn

      localStorage.setItem(key, JSON.stringify(newValue))

      const event = new CustomEvent('local-storage', { detail: key })
      window.dispatchEvent(event)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [value, setValue]
}
