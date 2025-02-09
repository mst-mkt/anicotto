import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NuqsAdapter } from 'nuqs/adapters/next'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { twJoin } from 'tailwind-merge'
import { Footer } from '../components/layouts/footer'
import { Header } from '../components/layouts/header'
import { SideMenu } from '../components/layouts/side-menu/side-menu'
import { TooltipProvider } from '../components/ui/tooltip'
import { ThemeLoader, ThemeProvider } from '../lib/theme-provider'
import '../styles/globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Anicotto',
  description: 'Third-party Annict web client',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ja" suppressHydrationWarning={true}>
    <body className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-scroll">
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
              <Toaster />
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </SessionProvider>
    </body>
  </html>
)

export default RootLayout
