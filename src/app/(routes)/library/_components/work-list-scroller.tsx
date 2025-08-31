'use client'

import { Loader2Icon, RotateCwIcon } from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll'
import type { Status } from '../../../../schemas/annict/common'
import { getMyWorks, type WorkWithThumbnail } from '../../../actions/api/get/works'
import { WorkCard } from './work-card'

type WorkListScrollerProps = {
  initialWorks: WorkWithThumbnail[]
  status: Status
}

export const WorkListScroller: FC<WorkListScrollerProps> = ({ initialWorks, status }) => {
  const {
    data: works,
    status: loadingStatus,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialWorks,
    fetchData: (page) => getMyWorks(status, page),
  })

  return (
    <>
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
      {match(loadingStatus)
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
