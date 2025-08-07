import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { ActionIcon } from '../../../../../../components/icon/action'
import { Image } from '../../../../../../components/shared/image'
import { ACTIVITY_TEXT } from '../../../../../../constants/text/activity'
import { timeText } from '../../../../../../utils/time-text'
import type { ActivityWithThumbnail } from '../../../../../actions/api/get/activities'
import { ActivityInfo } from './activity-info'

type ActivityCardProps = {
  activity: ActivityWithThumbnail
}

export const ActivityCard: FC<ActivityCardProps> = ({ activity }) => (
  <div className="flex flex-col gap-y-2">
    <div className="flex items-center gap-x-2">
      <ActionIcon action={activity.action} className="text-muted-foreground" size={32} />
      <span className="w-full min-w-0 shrink truncate">{ACTIVITY_TEXT(activity.action)}</span>
      <time className="shrink-0 text-muted-foreground text-sm" dateTime={activity.created_at}>
        {timeText(activity.created_at)}
      </time>
    </div>
    <div className="flex items-start gap-x-4 rounded-lg border border-muted p-4">
      <div className="sticky top-20 aspect-square h-24 shrink-0 overflow-hidden rounded-md md:aspect-video">
        <Image
          alt={activity.work.title}
          className="h-full w-full object-cover"
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <ImageOffIcon size={32} />
            </div>
          }
          height={256}
          src={activity.work.thumbnail}
          width={256}
        />
      </div>
      <div className="flex min-h-24 min-w-0 flex-col justify-center gap-y-2">
        <Link
          className="line-clamp-2 font-bold transition-colors hover:text-anicotto-accent-600 hover:underline"
          href={`/works/${activity.work.id}`}
        >
          {activity.work.title}
        </Link>
        <ActivityInfo activity={activity} />
      </div>
    </div>
  </div>
)
