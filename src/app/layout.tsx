import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import TopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { twJoin } from 'tailwind-merge'
import { Footer } from '../components/layouts/footer'
import { Header } from '../components/layouts/header'
import { SideMenu } from '../components/layouts/side-menu/side-menu'
import { TooltipProvider } from '../components/ui/tooltip'
import { ThemeLoader } from '../lib/theme/loader'
import '../styles/globals.css'
import { cn } from '../utils/classnames'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Anicotto',
  description: 'Third-party Annict web client',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ja" suppressHydrationWarning={true}>
    <body
      className={cn(
        'overflow-y-scroll',
        'scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent',
        '[&>#nprogress>.spinner]:!hidden md:[&>#nprogress>.spinner]:!block',
      )}
    >
      <TopLoader color="oklch(70% 0.2 20)" shadow={false} easing="ease-in-out" />
      <ThemeLoader />
      <SessionProvider>
        <ThemeProvider>
          <NuqsAdapter>
            <TooltipProvider delayDuration={100}>
              <div className={styles.layout}>
                <Header className={styles.header} />
                <SideMenu className={styles.sideMenu} />
                <main
                  className={twJoin(
                    styles.main,
                    'mx-auto w-full min-w-[56svw] max-w-[600px] px-[4svmin] py-4',
                  )}
                >
                  {children}
                </main>
                <Footer className={styles.footer} />
              </div>
              <Toaster richColors={true} />
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </SessionProvider>
    </body>
  </html>
)

export default RootLayout
