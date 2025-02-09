import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import type { InferOutput } from 'valibot'
import { ImageSelector } from '../../../components/shared/image-selector'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import type { getFollowingActivitiesResponseSchema } from '../../../schemas/annict/activities/api'
import { timeText } from '../../../utils/time-text'
import { ActivityIcon } from './activity-icon'
import { RatingBadge, StatusBadge } from './badges'

type ActivityProps = InferOutput<typeof getFollowingActivitiesResponseSchema>['activities'][number]

export const Activity: FC<ActivityProps> = (activity) => (
  <div className="fade-in flex animate-in gap-x-4 duration-500 ease-in-out">
    <Link href={`/users/${activity.user.username}`} className="sticky top-20 h-fit">
      <Avatar className="z-0 h-12 w-12">
        <AvatarImage src={activity.user.avatar_url} alt={activity.user.username} />
        <AvatarFallback>{activity.user.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </Link>
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex h-10 items-center gap-x-2">
        <ActivityIcon action={activity.action} size={28} className="text-foreground-300" />
        <Link href={`/users/${activity.user.username}`} className="hover:underline">
          {activity.user.name}
        </Link>
        <p className="shrink grow truncate text-sm">
          {match(activity)
            .with({ action: 'create_record' }, () => 'が記録しました')
            .with(
              { action: 'create_multiple_records' },
              (activity) => `が${activity.multiple_records.length}件の記録をしました`,
            )
            .with({ action: 'create_review' }, () => 'がレビューしました')
            .with({ action: 'create_status' }, () => 'がステータスを変更しました')
            .exhaustive()}
        </p>
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

const ActivityInfoCard: FC<ActivityProps> = (activity) =>
  activity.action === 'create_multiple_records' ? (
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
      <div className="aspect-square h-24 shrink-0 grow-0 md:aspect-video">
        <ImageSelector
          sources={[
            activity.work.images.recommended_url,
            activity.work.images.facebook.og_image_url,
            activity.work.images.twitter.image_url,
          ].filter((url) => url !== '')}
          alt={activity.work.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="line-clamp-2 font-bold">{activity.work.title}</h3>
        {match(activity)
          .with({ action: 'create_record' }, ({ episode }) => (
            <div className="flex items-center gap-x-2">
              <Badge className="shrink-0 grow-0">{episode.number_text}</Badge>
              {episode.title !== null && (
                <span className="line-clamp-1 shrink">{episode.title}</span>
              )}
            </div>
          ))
          .with({ action: 'create_review' }, ({ review }) => (
            <div className="flex items-center gap-x-2">
              <RatingBadge rating={review.rating_overall_state} className="shrink-0 grow-0" />
              {review.body.trim() !== '' && (
                <span className="line-clamp-1 shrink ">{review.body}</span>
              )}
            </div>
          ))
          .with({ action: 'create_status' }, ({ status }) => (
            <StatusBadge status={status.kind} className="w-fit" />
          ))
          .otherwise(() => null)}
      </div>
    </div>
  )
