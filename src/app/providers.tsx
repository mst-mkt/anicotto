import { SessionProvider } from 'next-auth/react'
import { NuqsAdapter } from 'nuqs/adapters/next'
import type { FC, ReactNode } from 'react'
import { TooltipProvider } from '../components/ui/tooltip'
import { ThemeProvider } from '../lib/theme/provider'

type ProvidersProps = {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    <ThemeProvider>
      <NuqsAdapter>
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  </SessionProvider>
)
