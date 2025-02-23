import type { Metadata } from 'next'
import TopLoader from 'nextjs-toploader'
import type { FC, ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'
import { Toaster } from '../components/ui/sonner'
import { ThemeLoader } from '../lib/theme/loader'
import '../styles/globals.css'
import { cn } from '../utils/classnames'
import { Footer } from './_layouts/footer/footer'
import { Header } from './_layouts/header/header'
import { BottomMenu } from './_layouts/mobile-menu/mobile-menu'
import { Sidemenu } from './_layouts/side-menu/sidemenu'
import styles from './layout.module.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Anicotto',
  description: 'Third-party Annict web client',
}

type RootLayoutProps = {
  children: ReactNode
  modal: ReactNode
  panel: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children, modal, panel }) => (
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
        <div
          className={cn(styles.layout, 'w-full bg-background pb-24 md:pb-0')}
          data-vaul-drawer-wrapper={true}
        >
          <Header className={styles.header} />
          <Sidemenu className={styles.sideMenu} />
          <main className={twJoin(styles.main, 'w-full py-4')}>{children}</main>
          <Footer className={styles.footer} />
          {panel}
          {modal}
        </div>
        <BottomMenu />
        <Toaster />
      </Providers>
    </body>
  </html>
)

export default RootLayout
