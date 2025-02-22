'use client'

import { useTheme } from 'next-themes'
import type { FC } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export const Toaster: FC<ToasterProps> = (props) => {
  const { theme } = useTheme()
  const showBottomMenu = useMediaQuery('(width < 48rem)')

  return (
    <Sonner
      theme={theme === 'dark' ? 'dark' : 'light'}
      richColors={true}
      mobileOffset={{
        bottom: showBottomMenu ? '92px' : '24px',
      }}
      {...props}
    />
  )
}
