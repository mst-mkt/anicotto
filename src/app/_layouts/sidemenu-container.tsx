import type { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SidemenuContainerProps = {
  className?: string
  children: ReactNode
}

export const SidemenuContainer: FC<SidemenuContainerProps> = ({ className, children }) => (
  <aside
    className={twMerge(
      'flex h-full w-full max-w-64 flex-col justify-between gap-y-4 px-4',
      className,
    )}
  >
    {children}
  </aside>
)
