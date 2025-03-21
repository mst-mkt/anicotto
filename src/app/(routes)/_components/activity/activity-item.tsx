import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { RatingBadge } from '../../../../components/badge/rating'
import { StatusBadge } from '../../../../components/badge/status'
import { UserHoverCard } from '../../../../components/hover-card/user/card'
import { WorkHoverCard } from '../../../../components/hover-card/work/card'
import { ActionIcon } from '../../../../components/icon/action'
import { Image } from '../../../../components/shared/image'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { Badge } from '../../../../components/ui/badge'
import { ACTIVITY_TEXT } from '../../../../constants/text/activity'
import { timeText } from '../../../../utils/time-text'
import type { ActivityWithThumbnailAndStatus } from '../../../actions/api/get/activities'

type ActivityItemProps = {
  activity: ActivityWithThumbnailAndStatus
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity }) => (
  <div className="flex gap-x-4">
    <UserHoverCard user={activity.user}>
      <Link href={`/users/${activity.user.username}`} className="sticky top-20 h-fit">
        <Avatar className="z-0 h-12 w-12">
          <AvatarImage src={activity.user.avatar_url} alt={activity.user.username} />
          <AvatarFallback>{activity.user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </Link>
    </UserHoverCard>
    <div className="flex w-full flex-col">
      <div className="flex h-12 items-center gap-x-2">
        <ActionIcon action={activity.action} size={24} className="text-muted-foreground" />
        <UserHoverCard user={activity.user}>
          <Link href={`/users/${activity.user.username}`} className="hover:underline">
            {activity.user.name}
          </Link>
        </UserHoverCard>
        <p className="shrink grow truncate text-sm">が{ACTIVITY_TEXT(activity.action)}</p>
        <time
          dateTime={activity.created_at}
          className="hidden shrink-0 grow-0 text-muted-foreground text-sm md:block"
        >
          {timeText(activity.created_at)}
        </time>
      </div>
      <div className="flex items-center gap-x-4 rounded-lg border border-muted p-2">
        <div className="relative aspect-square h-24 shrink-0 grow-0 overflow-hidden rounded-md md:aspect-video">
          <Image
            src={activity.work.thumbnail}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={40} />
              </div>
            }
            height={256}
            width={256}
            alt={activity.work.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <WorkHoverCard work={activity.work}>
            <Link
              href={`/works/${activity.work.id}`}
              className="transition-colors hover:text-anicotto-accent"
            >
              <h3 className="line-clamp-2 font-bold">{activity.work.title}</h3>
            </Link>
          </WorkHoverCard>
          {match(activity)
            .with({ action: 'create_record' }, ({ episode }) => (
              <Link
                href={`/works/${activity.work.id}/episodes/${episode.id}`}
                className="group flex items-center gap-x-2"
              >
                <Badge className="shrink-0 grow-0 group-hover:bg-primary/80">
                  {episode.number_text}
                </Badge>
                {episode.title !== null && (
                  <span className="line-clamp-1 shrink transition-colors group-hover:text-anicotto-accent">
                    {episode.title}
                  </span>
                )}
              </Link>
            ))
            .with({ action: 'create_review' }, ({ review }) => (
              <Link
                href={`/works/${activity.work.id}/reviews`}
                className="group flex items-center gap-x-2"
              >
                <RatingBadge rating={review.rating_overall_state} />
                {review.body.trim() !== '' && (
                  <span className="line-clamp-1 shrink transition-colors group-hover:text-anicotto-accent">
                    {review.body}
                  </span>
                )}
              </Link>
            ))
            .with({ action: 'create_status' }, ({ status }) => <StatusBadge status={status.kind} />)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  </div>
)
