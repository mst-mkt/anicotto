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
        type="button"
        onClick={() => setResource('works')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'works' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'works' && isPending && 'animate-pulse',
        )}
      >
        作品
      </button>
      <button
        type="button"
        onClick={() => setResource('characters')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'characters' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'characters' && isPending && 'animate-pulse',
        )}
      >
        キャラクター
      </button>
      <button
        type="button"
        onClick={() => setResource('people')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'people' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'people' && isPending && 'animate-pulse',
        )}
      >
        人物
      </button>
      <button
        type="button"
        onClick={() => setResource('organizations')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          resource === 'organizations' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          resource === 'organizations' && isPending && 'animate-pulse',
        )}
      >
        団体
      </button>
    </div>
  )
}
