'use client'

import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { cn } from '../../../../utils/classnames'
import { searchSearchParams } from '../search-params'

export const SearchTabs = () => {
  const [isPending, startTransition] = useTransition()
  const [resource, setResource] = useQueryState('r', {
    ...searchSearchParams.r,
    defaultValue: 'works',
    history: 'push',
    startTransition,
  })

  return (
    <div className="scrollbar-thin flex w-fit max-w-full scroll-p-1 self-start overflow-x-auto rounded-lg bg-muted p-1 ring-2 ring-muted">
      <button
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'works' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'works' && isPending && 'animate-pulse',
        )}
        onClick={() => setResource('works')}
        type="button"
      >
        作品
      </button>
      <button
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'characters' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'characters' && isPending && 'animate-pulse',
        )}
        onClick={() => setResource('characters')}
        type="button"
      >
        キャラクター
      </button>
      <button
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'people' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'people' && isPending && 'animate-pulse',
        )}
        onClick={() => setResource('people')}
        type="button"
      >
        人物
      </button>
      <button
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'organizations' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'organizations' && isPending && 'animate-pulse',
        )}
        onClick={() => setResource('organizations')}
        type="button"
      >
        団体
      </button>
    </div>
  )
}
