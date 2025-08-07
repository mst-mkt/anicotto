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
import type { ActivityWithThumbnail } from '../../../actions/api/get/activities'

type ActivityItemProps = {
  activity: ActivityWithThumbnail
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity }) => (
  <div className="flex gap-x-4">
    <UserHoverCard user={activity.user}>
      <Link className="sticky top-20 h-fit" href={`/users/${activity.user.username}`}>
        <Avatar className="z-0 h-12 w-12">
          <AvatarImage alt={activity.user.username} src={activity.user.avatar_url} />
          <AvatarFallback>{activity.user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </Link>
    </UserHoverCard>
    <div className="flex w-full flex-col">
      <div className="flex h-12 items-center gap-x-2">
        <ActionIcon action={activity.action} className="text-muted-foreground" size={24} />
        <UserHoverCard user={activity.user}>
          <Link className="hover:underline" href={`/users/${activity.user.username}`}>
            {activity.user.name}
          </Link>
        </UserHoverCard>
        <p className="shrink grow truncate text-sm">が{ACTIVITY_TEXT(activity.action)}</p>
        <time
          className="hidden shrink-0 grow-0 text-muted-foreground text-sm md:block"
          dateTime={activity.created_at}
        >
          {timeText(activity.created_at)}
        </time>
      </div>
      <div className="flex items-center gap-x-4 rounded-lg border border-muted p-2">
        <div className="relative aspect-square h-24 shrink-0 grow-0 overflow-hidden rounded-md md:aspect-video">
          <Image
            alt={activity.work.title}
            className="h-full w-full object-cover"
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={40} />
              </div>
            }
            height={256}
            src={activity.work.thumbnail}
            width={256}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <WorkHoverCard work={activity.work}>
            <Link
              className="transition-colors hover:text-anicotto-accent"
              href={`/works/${activity.work.id}`}
            >
              <h3 className="line-clamp-2 font-bold">{activity.work.title}</h3>
            </Link>
          </WorkHoverCard>
          {match(activity)
            .with({ action: 'create_record' }, ({ episode }) => (
              <Link
                className="group flex items-center gap-x-2"
                href={`/works/${activity.work.id}/episodes/${episode.id}`}
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
                className="group flex items-center gap-x-2"
                href={`/works/${activity.work.id}/reviews`}
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
