'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, useLayoutEffect } from 'react'
import { STATUS_TEXT } from '../../../../../../../../constants/text/status'
import { statusPicklist } from '../../../../../../../../schemas/annict/common'
import type { User } from '../../../../../../../../schemas/annict/users'
import { cn } from '../../../../../../../../utils/classnames'

type TabProps = {
  username: User['username']
}

export const Tab: FC<TabProps> = ({ username }) => {
  const currentStatus = usePathname().split('/').at(4) ?? ''

  useLayoutEffect(() => {
    const tab = document.getElementById(`tab-${currentStatus}`)
    if (tab !== null) {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentStatus])

  return (
    <div className="scrollbar-thin flex w-fit max-w-full scroll-p-1 overflow-x-auto rounded-lg bg-muted p-1 ring-2 ring-muted">
      {statusPicklist.options
        .filter((status) => status !== 'no_select')
        .map((status) => (
          <Link
            className={cn(
              'w-fit break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
              status === currentStatus &&
                'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
            )}
            href={`/users/${username}/library/${status}`}
            id={`tab-${status}`}
            key={status}
          >
            {STATUS_TEXT(status)}
          </Link>
        ))}
    </div>
  )
}
