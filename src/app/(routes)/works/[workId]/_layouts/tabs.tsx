'use client'

import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, useLayoutEffect } from 'react'
import { cn } from '../../../../../utils/classnames'

const pages = [
  ['', 'トップ'],
  ['reviews', 'レビュー'],
  ['casts', 'キャスト'],
  ['staffs', 'スタッフ'],
  ['musics', '音楽'],
  ['series', '関連作品'],
] as const satisfies [string, string][]
type PagePath = (typeof pages)[number][0]

const isPage = (path: string): path is PagePath => {
  return pages.some(([page]) => page === path)
}

type TabProps = {
  workId: number
}

export const Tab: FC<TabProps> = ({ workId }) => {
  const path = usePathname().split('/').at(3) ?? ''

  useLayoutEffect(() => {
    const tab = document.getElementById(`tab-${path}`)
    if (tab !== null) {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [path])

  if (!isPage(path)) return null

  return (
    <div className="scrollbar-thin flex w-fit max-w-full scroll-p-1 overflow-x-auto rounded-lg bg-muted p-1 ring-2 ring-muted">
      {pages.map(([page, label]) => (
        <Link
          key={page}
          id={`tab-${page}`}
          href={page === '' ? `/works/${workId}` : `/works/${workId}/${page}`}
          className={cn(
            'w-fit break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
            path === page &&
              'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          )}
        >
          {label}
        </Link>
      ))}
      <Link
        href={`https://annict.com/works/${workId}`}
        rel="noopener noreferrer"
        target="_blank"
        className="flex w-fit items-center gap-x-1 break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300"
      >
        Annict
        <ExternalLinkIcon size={16} />
      </Link>
    </div>
  )
}
