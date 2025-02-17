import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Badge } from '../../../../components/ui/badge'
import { Skeleton } from '../../../../components/ui/skeleton'
import { STATUS_TEXT } from '../../../../constants/status'
import type { Status } from '../../../../schemas/annict/common'
import { getWorks } from '../get-works'
import { WorkCard } from './work-card'

type WorkListProps = {
  status: Status
}

export const WorkList: FC<WorkListProps> = async ({ status }) => {
  const works = await getWorks(status)

  if (works === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>
          <Badge variant="secondary">{STATUS_TEXT[status]}</Badge> の作品の取得に失敗しました
        </p>
      </div>
    )
  }

  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <div>
          <Badge variant="secondary">{STATUS_TEXT[status]}</Badge> の作品が見当たりません
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}

export const WorkListSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: this is static array
        key={index}
        className="flex items-center rounded-lg border border-muted p-2 shadow-xs"
      >
        <Skeleton className="h-24 w-24 shrink-0" />
        <div className="flex w-full flex-col gap-y-1 p-4">
          <Skeleton className="h-[1lh] w-full" />
          <Skeleton className="h-[1lh] w-1/2" />
        </div>
      </div>
    ))}
  </div>
)
