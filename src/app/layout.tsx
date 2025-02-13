import type { Metadata } from 'next'
import TopLoader from 'nextjs-toploader'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { twJoin } from 'tailwind-merge'
import { ThemeLoader } from '../lib/theme/loader'
import '../styles/globals.css'
import { cn } from '../utils/classnames'
import { Footer } from './_layouts/footer'
import { Header } from './_layouts/header'
import { SideMenu } from './_layouts/side-menu/side-menu'
import styles from './layout.module.css'
import { Providers } from './providers'

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
      <ThemeLoader />
      <Providers>
        <TopLoader color="oklch(70% 0.2 20)" shadow={false} easing="ease-in-out" />
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
      </Providers>
    </body>
  </html>
)

export default RootLayout
