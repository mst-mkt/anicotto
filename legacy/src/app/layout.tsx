import TopLoader from 'nextjs-toploader'
import type { FC } from 'react'
import { Toaster } from '../components/ui/sonner'
import { BASIC_METADATA } from '../constants/project'
import { ThemeLoader } from '../lib/theme/loader'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { cn } from '../utils/classnames'
import { Footer } from './_layouts/footer/footer'
import { Header } from './_layouts/header/header'
import { BottomMenu } from './_layouts/mobile-menu/mobile-menu'
import { Sidemenu } from './_layouts/side-menu/sidemenu'
import styles from './layout.module.css'
import { Providers } from './providers'

export const metadata: Metadata = BASIC_METADATA

const RootLayout: FC<LayoutProps<'/'>> = ({ children, track, panel }) => (
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
        <TopLoader color="oklch(70% 0.2 20)" easing="ease-in-out" shadow={false} />
        <div
          className={cn(styles.layout, 'w-full bg-background pb-24 md:pb-0')}
          data-vaul-drawer-wrapper={true}
        >
          <Header className={styles.header} />
          <Sidemenu className={styles.sideMenu} />
          <main className={cn(styles.main, 'w-full py-4')}>{children}</main>
          <Footer className={styles.footer} />
          {panel}
          {track}
        </div>
        <BottomMenu />
        <Toaster />
      </Providers>
    </body>
  </html>
)

export default RootLayout
