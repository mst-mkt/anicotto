import Link from 'next/link'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { PROJECT_NAME } from '../../constants/project'
import { HeaderAccount } from './header-account'
import { ThemeButton } from './theme-button'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => (
  <header
    className={twMerge(
      'sticky top-0 z-50 grid grid-cols-subgrid bg-background/16 backdrop-blur-md',
      className,
    )}
  >
    <div className="col-start-2 flex w-full items-center justify-between gap-x-4 py-4 font-bold text-2xl">
      <Link href="/" className="transition-colors hover:text-anicotto-accent">
        {PROJECT_NAME}
      </Link>
      <div className="flex items-center gap-x-2">
        <ThemeButton />
        <HeaderAccount />
      </div>
    </div>
  </header>
)
