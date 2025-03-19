import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { ActionIcon } from '../../../../../../components/icon/action'
import { Image } from '../../../../../../components/shared/image'
import { ACTIVITY_TEXT } from '../../../../../../constants/text/activity'
import { getValidWorkImage } from '../../../../../../lib/images/valid-url'
import type { Activity } from '../../../../../../schemas/annict/activities'
import { timeText } from '../../../../../../utils/time-text'
import { ActivityInfo } from './activity-info'

type ActivityCardProps = {
  activity: Activity
}

export const ActivityCard: FC<ActivityCardProps> = async ({ activity }) => {
  const workImage = await getValidWorkImage(activity.work.id.toString(), activity.work.images)

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <ActionIcon action={activity.action} size={32} className="text-muted-foreground" />
        <span className="w-full min-w-0 shrink truncate">{ACTIVITY_TEXT(activity.action)}</span>
        <time dateTime={activity.created_at} className="shrink-0 text-muted-foreground text-sm">
          {timeText(activity.created_at)}
        </time>
      </div>
      <div className="flex items-start gap-x-4 rounded-lg border border-muted p-4">
        <div className="sticky top-20 aspect-square h-24 shrink-0 overflow-hidden rounded-md md:aspect-video">
          <Image
            width={256}
            height={256}
            src={workImage}
            alt={activity.work.title}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={32} />
              </div>
            }
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-h-24 min-w-0 flex-col justify-center gap-y-2">
          <Link
            href={`/works/${activity.work.id}`}
            className="line-clamp-2 font-bold transition-colors hover:text-anicotto-accent-600 hover:underline"
          >
            {activity.work.title}
          </Link>
          <ActivityInfo activity={activity} />
        </div>
      </div>
    </div>
  )
}
