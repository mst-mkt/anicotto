import { CloudAlertIcon, ImageOffIcon, ScrollTextIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { RatingBadge } from '../../../../../../../components/badge/rating'
import { WorkHoverCard } from '../../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../../components/shared/image'
import { Badge } from '../../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { User } from '../../../../../../../schemas/annict/users'
import { timeText } from '../../../../../../../utils/time-text'
import { getUserRecords } from '../../../../../../actions/api/get/records'
import { groupRecords } from '../group-records'

type RecordListProps = {
  username: User['username']
}

export const RecordList: FC<RecordListProps> = async ({ username }) => {
  const records = await getUserRecords(username)

  if (records === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-muted-foreground" size={40} />
        <p>記録の取得に失敗しました</p>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <ScrollTextIcon className="text-muted-foreground" size={40} />
        <p>記録がありません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 py-8">
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
    </div>
  )
}

export const RecordListSkeleton = () => (
  <div className="flex flex-col gap-y-8 py-8">
    {[...Array(8)].map((_, i) => (
      <div className="flex gap-x-4" key={i}>
        <Skeleton className="aspect-square h-16 w-16 shrink-0" />
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex items-center justify-between gap-x-2">
            <Skeleton className="h-[1lh] w-1/2" />
            <Skeleton className="h-[1lh] w-1/4" />
          </div>
          <Skeleton className="h-[1lh] w-full" />
        </div>
      </div>
    ))}
  </div>
)
