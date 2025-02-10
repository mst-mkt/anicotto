import { BinocularsIcon, MessageCircleHeartIcon } from 'lucide-react'
import type { FC } from 'react'
import { Image } from '../../../../../components/shared/image'
import { Badge } from '../../../../../components/ui/badge'
import { Separator } from '../../../../../components/ui/separator'
import { getValidWorkImage } from '../../../../../lib/work-images'
import type { Status } from '../../../../../schemas/annict/common'
import type { Work } from '../../../../../schemas/annict/works'
import { StatusSelect } from './status-select'

type WorkInfoProps = {
  work: Work
  status: Status | null
}

export const WorkInfo: FC<WorkInfoProps> = async ({ work, status }) => {
  const images = await getValidWorkImage(work.id.toString(), work.images)

  return (
    <div className="flex gap-x-4 overflow-hidden">
      <div className="w-64 min-w-2/5 overflow-hidden rounded-lg border border-muted p-2">
        <Image src={images} alt={work.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex grow flex-col justify-center gap-y-1">
        <h1 className="line-clamp-2 w-full font-bold text-lg md:text-xl">{work.title}</h1>
        <div>
          <Badge>{work.media_text}</Badge>
          <Badge>{work.season_name_text}</Badge>
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
