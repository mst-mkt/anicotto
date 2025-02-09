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
    <Provider storageKey="anicotto:theme" attribute="class">
      {children}
    </Provider>
  )
}

export const ThemeLoader = () => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml:
    dangerouslySetInnerHTML={{
      __html: `
            const theme = localStorage.getItem('anicotto:theme')
            document.documentElement.classList.add(theme ?? 'light')
        `,
    }}
  />
)
