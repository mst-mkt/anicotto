import type { FC, ReactNode } from 'react'

import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="ja">
    <body>{children}</body>
  </html>
)

export default RootLayout
