import Link from 'next/link'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { PROJECT_NAME } from '../../constants/project'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => (
  <header className={twMerge('sticky top-0 bg-background/16 backdrop-blur-md', className)}>
    <div className="mx-auto flex min-w-[56svw] max-w-[600px] items-center justify-between gap-y-4 py-4 font-bold text-2xl">
      <Link href="/" className="transition-colors hover:text-accent">
        {PROJECT_NAME}
      </Link>
    </div>
  </header>
)
