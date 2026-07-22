'use client'

import { ThemeProvider as Provider } from 'next-themes'
import { type FC, type ReactNode, useEffect, useState } from 'react'

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <Provider attribute="class" storageKey="anicotto:theme">
      {children}
    </Provider>
  )
}
