import { BinocularsIcon, CloudAlertIcon, ImageOffIcon, MessageCircleHeartIcon } from 'lucide-react'
import type { FC } from 'react'
import { Image } from '../../../../../components/shared/image'
import { Badge } from '../../../../../components/ui/badge'
import { Separator } from '../../../../../components/ui/separator'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { getValidWorkImage } from '../../../../../lib/images/valid-url'
import type { Work } from '../../../../../schemas/annict/works'
import { getWorkStatus } from './get-status'
import { getWork } from './get-work'
import { StatusSelect } from './status-select'

type WorkInfoProps = {
  workId: Work['id']
}

export const WorkInfo: FC<WorkInfoProps> = async ({ workId }) => {
  const work = await getWork(workId)
  const status = await getWorkStatus(workId)

  if (work === null || status === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon size={64} className="text-anicotto-accent" />
        <p className="font-bold text-xl">作品情報が取得できませんでした</p>
      </div>
    )
  }

  const images = await getValidWorkImage(work.id.toString(), work.images)

  return (
    <div className="flex items-center gap-x-4 overflow-hidden">
      <div className="relative aspect-square h-48 max-w-2/5 shrink-0 overflow-hidden rounded-lg border border-muted p-2">
        <Image
          src={images}
          alt={work.title}
          height={144}
          width={256}
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <ImageOffIcon size={40} />
            </div>
          }
          className="h-full w-full rounded-sm object-cover"
        />
      </div>
      <div className="flex grow flex-col justify-center gap-y-1">
        <h1 className="line-clamp-2 w-full font-bold text-lg md:text-xl">{work.title}</h1>
        <div className="flex items-center gap-x-1">
          <Badge>{work.media_text}</Badge>
          {work.season_name_text !== undefined && work.season_name_text !== '' && (
            <Badge>{work.season_name_text}</Badge>
          )}
        </div>
        <div className="flex items-center gap-x-2 py-3">
          <div className="contents text-sm">
            <BinocularsIcon size={20} className="text-muted-foreground" />
            <span>{work.watchers_count}</span>
            <span className="hidden text-xs md:inline">人が視聴中</span>
          </div>
          <Separator orientation="vertical" />
          <div className="contents text-sm">
            <MessageCircleHeartIcon size={20} className="text-muted-foreground" />
            <span>{work.reviews_count}</span>
            <span className="hidden text-xs md:inline">件のレビュー</span>
          </div>
        </div>
        {status !== null && <StatusSelect work={work} status={status} />}
      </div>
    </div>
  )
}

export const WorkInfoSkeleton = () => (
  <div className="flex gap-x-4 overflow-hidden">
    <div className="aspect-square h-48 max-w-2/5 overflow-hidden rounded-lg border border-muted p-2">
      <Skeleton className="h-full w-full rounded-sm object-cover" />
    </div>
    <div className="flex grow flex-col justify-center gap-y-1">
      <Skeleton className="h-[1lh] w-3/4 rounded-md text-lg" />
      <Skeleton className="h-[22px] w-1/3 rounded-full" />
      <div className="flex items-center gap-x-2 py-3">
        <Skeleton className="h-[1lh] w-1/2 rounded-md" />
      </div>
      <Skeleton className="h-[38px] w-1/2 rounded-md" />
    </div>
  </div>
)
