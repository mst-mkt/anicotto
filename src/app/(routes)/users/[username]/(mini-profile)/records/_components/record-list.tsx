import { CloudAlertIcon, ImageOffIcon, ScrollTextIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { RatingBadge } from '../../../../../../../components/badge/rating'
import { WorkHoverCard } from '../../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../../components/shared/image'
import { Badge } from '../../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import { MEDIA_TEXT } from '../../../../../../../constants/text/media'
import { SEASON_NAME_TEXT } from '../../../../../../../constants/text/season'
import type { User } from '../../../../../../../schemas/annict/users'
import { timeText } from '../../../../../../../utils/time-text'
import { getUserRecords } from '../get-records'
import { groupRecords } from '../group-records'

type RecordListProps = {
  username: User['username']
}

export const RecordList: FC<RecordListProps> = async ({ username }) => {
  const records = await getUserRecords(username)

  if (records === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-muted-foreground" />
        <p>記録の取得に失敗しました</p>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <ScrollTextIcon size={40} className="text-muted-foreground" />
        <p>記録がありません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 py-8">
      {groupRecords(records).map(({ id, records, work, updatedAt }) => (
        <div key={id} className="flex gap-x-4">
          <div className="sticky top-20 aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={work.image}
              alt={work.title}
              width={128}
              height={128}
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <ImageOffIcon size={24} className="text-muted-foreground" />
                </div>
              }
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <WorkHoverCard
                work={{
                  id: work.id,
                  title: work.title,
                  images: [work.image ?? ''],
                  media_text: MEDIA_TEXT(work.media),
                  season_name_text:
                    work.seasonName !== null && work.seasonYear !== null
                      ? `${work.seasonYear}年${SEASON_NAME_TEXT(work.seasonName)}`
                      : undefined,
                  episodes_count: work.episodesCount,
                  watchers_count: work.watchersCount,
                  reviews_count: work.reviewsCount,
                }}
              >
                <Link
                  href={`/works/${work.id}`}
                  className="shrink grow truncate font-bold transition-colors hover:text-anicotto-accent-600 hover:underline"
                >
                  {work.title}
                </Link>
              </WorkHoverCard>
              <time
                dateTime={updatedAt}
                className="shrink-0 break-keep text-muted-foreground text-sm"
              >
                {timeText(updatedAt)}
              </time>
            </div>
            {records.map(({ id, episode, rating, comment }) => (
              <div key={id} className="flex flex-col gap-y-2">
                <Link
                  href={`/works/${work.id}/episodes/${episode.id}`}
                  className="group flex items-center gap-x-2"
                >
                  <Badge variant="secondary" className="shrink-0 break-keep">
                    {episode.number}
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
      <div key={i} className="flex gap-x-4">
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
