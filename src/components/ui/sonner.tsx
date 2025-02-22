'use client'

import { useTheme } from 'next-themes'
import type { FC } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

export const Toaster: FC<ToasterProps> = (props) => {
  const { theme } = useTheme()

  return <Sonner theme={theme === 'dark' ? 'dark' : 'light'} richColors={true} {...props} />
}
