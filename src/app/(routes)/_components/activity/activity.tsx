import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Image } from '../../../../components/shared/image'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { Badge } from '../../../../components/ui/badge'
import { ACTIVITY_ICON, ACTIVITY_TEXT } from '../../../../constants/activity'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { Activity as ActivityType } from '../../../../schemas/annict/activities'
import { timeText } from '../../../../utils/time-text'
import { RatingBadge, StatusBadge } from './badges'

export const Activity: FC<ActivityType> = (activity) => {
  const Icon = ACTIVITY_ICON[activity.action]

  return (
    <div className="flex animate-in gap-x-4 duration-500 ease-in-out">
      <Link href={`/users/${activity.user.username}`} className="sticky top-20 h-fit">
        <Avatar className="z-0 h-12 w-12">
          <AvatarImage src={activity.user.avatar_url} alt={activity.user.username} />
          <AvatarFallback>{activity.user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex h-10 items-center gap-x-2">
          <Icon size={28} className="text-foreground-300" />
          <Link href={`/users/${activity.user.username}`} className="hover:underline">
            {activity.user.name}
          </Link>
          <p className="shrink grow truncate text-sm">が{ACTIVITY_TEXT(activity)}</p>
          <time
            dateTime={activity.created_at}
            className="hidden shrink-0 grow-0 text-muted-foreground text-sm md:block"
          >
            {timeText(activity.created_at)}
          </time>
        </div>
        <ActivityInfoCard {...activity} />
      </div>
    </div>
  )
}

const ActivityInfoCard: FC<ActivityType> = async (activity) => {
  const image = await getValidWorkImage(activity.work.id.toString(), activity.work.images)

  return activity.action === 'create_multiple_records' ? (
    activity.multiple_records.map(({ record, episode }) => (
      <ActivityInfoCard
        key={record.id}
        {...activity}
        action="create_record"
        record={record}
        episode={episode}
      />
    ))
  ) : (
    <div className="flex items-center gap-x-4 rounded-lg border border-muted p-2">
      <div className="relative aspect-square h-24 shrink-0 grow-0 overflow-hidden rounded-md md:aspect-video">
        <Image
          src={image}
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
        <Link
          href={`/works/${activity.work.id}`}
          className="transition-colors hover:text-anicotto-accent-600 hover:underline"
        >
          <h3 className="line-clamp-2 font-bold">{activity.work.title}</h3>
        </Link>
        {match(activity)
          .with({ action: 'create_record' }, ({ episode }) => (
            <Link
              href={`/work/${activity.work.id}/episodes/${episode.id}`}
              className="group flex items-center gap-x-2"
            >
              <Badge className="shrink-0 grow-0 group-hover:bg-primary/80">
                {episode.number_text}
              </Badge>
              {episode.title !== null && (
                <span className="line-clamp-1 shrink transition-colors group-hover:text-anicotto-accent-600 group-hover:underline">
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
              <RatingBadge
                variant="secondary"
                rating={review.rating_overall_state}
                className="shrink-0 grow-0 cursor-default gap-x-1 px-2 py-1"
              />
              {review.body.trim() !== '' && (
                <span className="line-clamp-1 shrink transition-colors group-hover:text-anicotto-accent-600 group-hover:underline">
                  {review.body}
                </span>
              )}
            </Link>
          ))
          .with({ action: 'create_status' }, ({ status }) => (
            <StatusBadge
              variant="secondary"
              status={status.kind}
              className="w-fit cursor-default gap-x-1 px-2 py-1"
            />
          ))
          .otherwise(() => null)}
      </div>
    </div>
  )
}
