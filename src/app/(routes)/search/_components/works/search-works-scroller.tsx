'use client'

import { Loader2Icon, RotateCwIcon } from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../../hooks/useInfiniteScroll'
import { searchWorks, type WorkWithThumbnail } from '../../../../actions/api/get/works'
import type { SearchOrder, SearchSort } from '../../search-params'
import { WorkCard } from './work-card'

type SearchWorksScrollerProps = {
  initialWorks: WorkWithThumbnail[]
  search: {
    query: string
    sort: SearchSort
    order: SearchOrder
    season?: string
  }
}

export const SearchWorksScroller: FC<SearchWorksScrollerProps> = ({ initialWorks, search }) => {
  const {
    data: works,
    status,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialWorks,
    fetchData: (page) => searchWorks(search, page),
  })

  return (
    <>
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
      {match(status)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">作品の取得に失敗しました</p>
            <Button onClick={retry}>
              <RotateCwIcon />
              リトライ
            </Button>
          </div>
        ))
        .with('success', () => hasMore && <div className="h-16 w-full" ref={triggerRef} />)
        .exhaustive()}
    </>
  )
}
