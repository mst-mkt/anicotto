import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { type FC, Fragment } from 'react'
import { match } from 'ts-pattern'
import { RatingBadge } from '../../../../../../components/badge/rating'
import { StatusBadge } from '../../../../../../components/badge/status'
import { UserHoverCard } from '../../../../../../components/hover-card/user/card'
import { ActionIcon } from '../../../../../../components/icon/action'
import { Markdown } from '../../../../../../components/shared/markdown'
import { Badge } from '../../../../../../components/ui/badge'
import { ACTIVITY_TEXT } from '../../../../../../constants/text/activity'
import type { Activity } from '../../../../../../schemas/annict/activities'
import { timeText } from '../../../../../../utils/time-text'
import type { GroupedActivity } from '../../../../group-activity'
import { ActivityCard } from './activity-card'

const convertActionType = (action: GroupedActivity['action']) => {
  return match(action)
    .returnType<Activity['action']>()
    .with('create_records', () => 'create_record')
    .with('create_reviews', () => 'create_review')
    .with('create_status', () => 'create_status')
    .exhaustive()
}

type ActivityItemProps = {
  activity: GroupedActivity
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity }) => (
  <div className="flex w-full flex-col">
    <div className="flex h-12 items-center gap-x-2">
      <ActionIcon
        action={convertActionType(activity.action)}
        className="text-muted-foreground"
        size={24}
      />
      <UserHoverCard user={activity.user}>
        <Link className="hover:underline" href={`/users/${activity.user.username}`}>
          {activity.user.name}
        </Link>
      </UserHoverCard>
      <p className="shrink grow truncate text-sm">
        が{ACTIVITY_TEXT(convertActionType(activity.action))}
      </p>
      <time
        className="hidden shrink-0 grow-0 text-muted-foreground text-sm md:block"
        dateTime={activity.created_at}
      >
        {timeText(activity.created_at)}
      </time>
    </div>
    <div className="flex flex-col gap-y-2">
      {match(activity)
        .with({ action: 'create_records' }, (activity) =>
          activity.works.map(({ work, records }) => (
            <ActivityCard
              key={`records-${work.id}-${activity.id}-${records.at(0)?.record.id}`}
              work={work}
            >
              {records.map(({ record, episode }) => (
                <Fragment key={record.id}>
                  <div className="flex items-start gap-x-2">
                    <Badge className="sticky top-46 h-fit shrink-0" variant="outline">
                      {episode.number_text}
                    </Badge>
                    <Link
                      href={`/works/${work.id}/episodes/${episode.id}`}
                      className="w-fit shrink  text-sm hover:text-anicotto-accent transition-colors"
                    >
                      {episode.title === null || episode.title.trim() === '' ? (
                        <span className="text-muted-foreground">タイトル不明</span>
                      ) : (
                        episode.title
                      )}
                    </Link>
                    <div className="shrink grow self-center">
                      <div className="h-[1px] bg-muted" />
                    </div>
                  </div>
                  {record.comment !== null && (
                    <div className="text-sm flex flex-wrap justify-between items-center gap-1.5">
                      <p className="text-muted-foreground">{record.comment}</p>
                      {record.rating_state !== null && <RatingBadge rating={record.rating_state} />}
                    </div>
                  )}
                </Fragment>
              ))}
            </ActivityCard>
          )),
        )
        .with({ action: 'create_reviews' }, (activity) =>
          activity.works.map(({ work, reviews }) => (
            <ActivityCard
              key={`reviews-${work.id}-${activity.id}-${reviews.at(0)?.id}`}
              work={work}
            >
              {reviews.map((review, reviewIndex) => (
                <Fragment key={review.id}>
                  {reviewIndex !== 0 && (
                    <div className="w-full border-b border-dashed mt-2 border-muted" />
                  )}
                  <div className="flex flex-col gap-y-2">
                    {review.body.trim() !== '' && (
                      <Markdown className="text-sm">{review.body}</Markdown>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {review.rating_overall_state !== null && (
                        <RatingBadge
                          rating={review.rating_overall_state}
                          showIcon={false}
                          showRating={true}
                          showTitle={true}
                          kind="overall"
                        />
                      )}
                      {review.rating_animation_state !== null && (
                        <RatingBadge
                          rating={review.rating_animation_state}
                          showIcon={false}
                          showRating={true}
                          showTitle={true}
                          kind="animation"
                        />
                      )}
                      {review.rating_character_state !== null && (
                        <RatingBadge
                          rating={review.rating_character_state}
                          showIcon={false}
                          showRating={true}
                          showTitle={true}
                          kind="character"
                        />
                      )}
                      {review.rating_music_state !== null && (
                        <RatingBadge
                          rating={review.rating_music_state}
                          showIcon={false}
                          showRating={true}
                          showTitle={true}
                          kind="music"
                        />
                      )}
                      {review.rating_story_state !== null && (
                        <RatingBadge
                          rating={review.rating_story_state}
                          showIcon={false}
                          showRating={true}
                          showTitle={true}
                          kind="story"
                        />
                      )}
                    </div>
                  </div>
                </Fragment>
              ))}
            </ActivityCard>
          )),
        )
        .with({ action: 'create_status' }, (activity) =>
          activity.works.map(({ work, status }) => (
            <ActivityCard key={`status-${work.id}-${activity.id}`} work={work}>
              <div className="flex items-center gap-x-4 justify-between">
                <StatusBadge status={status} />
                <Link
                  className="flex items-center hover:text-anicotto-accent-600 transition-colors font-bold text-anicotto-accent text-sm"
                  href={`/works/${work.id}`}
                >
                  この作品を見る
                  <ChevronRight size={20} />
                </Link>
              </div>
            </ActivityCard>
          )),
        )
        .exhaustive()}
    </div>
  </div>
)
