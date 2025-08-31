'use client'

import { ImageOffIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { RatingBadge } from '../../../../../../../components/badge/rating'
import { WorkHoverCard } from '../../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../../components/shared/image'
import { Badge } from '../../../../../../../components/ui/badge'
import { Button } from '../../../../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScrollForGraphQL'
import type { User } from '../../../../../../../schemas/annict/users'
import { timeText } from '../../../../../../../utils/time-text'
import { getUserRecords, type UserRecord } from '../../../../../../actions/api/get/records'
import { groupRecords } from '../group-records'

type RecordListScrollerProps = {
  initialRecords: UserRecord[]
  initialEndCursor: string | null
  username: User['username']
}

export const RecordListScroller: FC<RecordListScrollerProps> = ({
  initialRecords,
  username,
  initialEndCursor,
}) => {
  const {
    data: records,
    status: loadingStatus,
    hasMore,
    triggerRef,
    retry,
  } = useInfiniteScroll({
    initialData: initialRecords,
    initialEndCursor,
    fetchData: (page) => getUserRecords(username, page),
  })

  return (
    <>
      {groupRecords(records).map(({ id, records, work, updated_at }) => (
        <div className="flex gap-x-4" key={id}>
          <div className="sticky top-20 aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              alt={work.title}
              className="h-full w-full object-cover"
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <ImageOffIcon className="text-muted-foreground" size={24} />
                </div>
              }
              height={128}
              src={work.thumbnail}
              width={128}
            />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <WorkHoverCard work={work}>
                <Link
                  className="shrink grow truncate font-bold transition-colors hover:text-anicotto-accent-600 hover:underline"
                  href={`/works/${work.id}`}
                >
                  {work.title}
                </Link>
              </WorkHoverCard>
              <time
                className="shrink-0 break-keep text-muted-foreground text-sm"
                dateTime={updated_at}
              >
                {timeText(updated_at)}
              </time>
            </div>
            {records.map(({ id, episode, rating, comment }) => (
              <div className="flex flex-col gap-y-2" key={id}>
                <Link
                  className="group flex items-center gap-x-2"
                  href={`/works/${work.id}/episodes/${episode.id}`}
                >
                  <Badge className="shrink-0 break-keep" variant="secondary">
                    {episode.number_text}
                  </Badge>
                  {episode.title !== null ? (
                    <span className="min-w-0 grow truncate group-hover:underline">
                      {episode.title}
                    </span>
                  ) : (
                    <span className="min-w-0 grow truncate text-muted-foreground group-hover:underline">
                      タイトル不明
                    </span>
                  )}
                  {rating !== null && <RatingBadge rating={rating} />}
                </Link>
                {comment !== null && comment !== '' && (
                  <p className="pb-2 text-muted-foreground text-sm">{comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {match(loadingStatus)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">レビューの取得に失敗しました</p>
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
