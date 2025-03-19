import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { RatingBadge } from '../../../../../../components/badge/rating'
import { StatusBadge } from '../../../../../../components/badge/status'
import { Badge } from '../../../../../../components/ui/badge'
import type {
  Activity,
  CreateMultipleRecordsActivity,
  CreateRecordActivity,
  CreateReviewActivity,
  CreateStatusActivity,
} from '../../../../../../schemas/annict/activities'

const CreateRecordInfo: FC<CreateRecordActivity> = (activity) => (
  <Link
    href={`/works/${activity.work.id}/episodes/${activity.episode.id}`}
    className="group flex items-center gap-x-2"
  >
    <Badge className="shrink-0 break-keep">{activity.episode.number_text}</Badge>
    <span className="shrink truncate transition-colors group-hover:text-anicotto-accent-600 group-hover:underline">
      {activity.episode.title}
    </span>
  </Link>
)

const CreateMultipleRecordsInfo: FC<CreateMultipleRecordsActivity> = (activity) => (
  <div className="flex flex-col gap-y-2">
    {activity.multiple_records.map(({ record, episode }) => (
      <div key={record.id} className="flex items-center gap-x-2 truncate">
        <Badge>{episode.number_text}</Badge>
        <span>{episode.title}</span>
      </div>
    ))}
  </div>
)

const CreateReviewInfo: FC<CreateReviewActivity> = (activity) => (
  <div className="flex flex-col gap-y-2">
    <RatingBadge rating={activity.review.rating_overall_state} />
    {activity.review.body !== '' && (
      <span className="line-clamp-3 text-muted-foreground text-sm">{activity.review.body}</span>
    )}
  </div>
)

const CreateStatusInfo: FC<CreateStatusActivity> = (activity) => (
  <div>
    <StatusBadge status={activity.status.kind} />
  </div>
)

type ActivityInfoProps = {
  activity: Activity
}

export const ActivityInfo: FC<ActivityInfoProps> = ({ activity }) => {
  return match(activity)
    .with({ action: 'create_record' }, (activity) => <CreateRecordInfo {...activity} />)
    .with({ action: 'create_multiple_records' }, (activity) => (
      <CreateMultipleRecordsInfo {...activity} />
    ))
    .with({ action: 'create_review' }, (activity) => <CreateReviewInfo {...activity} />)
    .with({ action: 'create_status' }, (activity) => <CreateStatusInfo {...activity} />)
    .exhaustive()
}
