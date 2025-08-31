import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Badge } from '../../../../components/ui/badge'
import { Skeleton } from '../../../../components/ui/skeleton'
import { STATUS_TEXT } from '../../../../constants/text/status'
import type { Status } from '../../../../schemas/annict/common'
import { getMyWorks } from '../../../actions/api/get/works'
import { WorkCard } from './work-card'

type WorkListProps = {
  status: Status
}

export const WorkList: FC<WorkListProps> = async ({ status }) => {
  const works = await getMyWorks(status)

  if (works === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <div>
          <Badge variant="secondary">{STATUS_TEXT(status)}</Badge> の作品の取得に失敗しました
        </div>
      </div>
    )
  }

  if (works.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <div>
          <Badge variant="secondary">{STATUS_TEXT(status)}</Badge> の作品が見当たりません
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {works.data.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}

export const WorkListSkeleton = () => (
  <div className="flex flex-col gap-y-4 py-4">
    {[...Array(8)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
      <div className="flex items-center rounded-lg border border-muted p-2 shadow-xs" key={index}>
        <Skeleton className="h-24 w-24 shrink-0" />
        <div className="flex w-full flex-col gap-y-1 p-4">
          <Skeleton className="h-[1lh] w-full" />
          <Skeleton className="h-[1lh] w-1/2" />
        </div>
      </div>
    ))}
  </div>
)
