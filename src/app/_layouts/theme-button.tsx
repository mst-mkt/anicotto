'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { match } from 'ts-pattern'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="aspect-square cursor-pointer rounded-md p-2 outline-none transition-colors hover:bg-background-500/16"
    >
      {match(theme)
        .with('dark', () => <IconMoon size={20} />)
        .otherwise(() => (
          <IconSun size={20} />
        ))}
    </button>
  )
}
