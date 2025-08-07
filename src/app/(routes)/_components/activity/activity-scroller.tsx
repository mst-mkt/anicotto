'use client'

import { Loader2Icon, RotateCwIcon } from 'lucide-react'
import { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll'
import { ActivityWithThumbnail, getFollowingActivities } from '../../../actions/api/get/activities'
import { ActivityItem } from './activity-item'

type ActivityScrollerProps = {
  initialActivities: ActivityWithThumbnail[]
}

export const ActivityScroller: FC<ActivityScrollerProps> = ({ initialActivities }) => {
  const {
    data: activities,
    status,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialActivities,
    fetchData: getFollowingActivities,
  })

  return (
    <>
      {activities.map((activity) => (
        <ActivityItem activity={activity} key={activity.id} />
      ))}
      {match(status)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">アクティビティの取得に失敗しました</p>
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
