'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, useLayoutEffect } from 'react'
import type { STATUS_TEXT } from '../../../../../../../../constants/status'
import { type Status, statusPicklist } from '../../../../../../../../schemas/annict/common'
import type { User } from '../../../../../../../../schemas/annict/users'
import { cn } from '../../../../../../../../utils/classnames'

const pages = [
  ['watching', '見てる'],
  ['wanna_watch', '見たい'],
  ['watched', '見た'],
  ['on_hold', '一時中断'],
  ['stop_watching', '視聴中止'],
] as const satisfies [Status, (typeof STATUS_TEXT)[Status]][]

const isStatus = (status: string): status is Status => {
  return statusPicklist.options.includes(status as Status)
}

type TabProps = {
  username: User['username']
}

export const Tab: FC<TabProps> = ({ username }) => {
  const status = usePathname().split('/').at(4) ?? ''

  useLayoutEffect(() => {
    const tab = document.getElementById(`tab-${status}`)
    if (tab !== null) {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [status])

  if (!isStatus(status)) return null

  return (
    <div className="scrollbar-thin flex w-fit max-w-full scroll-p-1 overflow-x-auto rounded-lg bg-muted p-1 ring-2 ring-muted">
      {pages.map(([page, label]) => (
        <Link
          key={page}
          id={`tab-${page}`}
          href={`/users/${username}/library/${page}`}
          className={cn(
            'w-fit break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
            status === page &&
              'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
