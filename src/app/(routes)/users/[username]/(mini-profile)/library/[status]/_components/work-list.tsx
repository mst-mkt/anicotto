import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Badge } from '../../../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../../../components/ui/skeleton'
import { STATUS_TEXT } from '../../../../../../../../constants/text/status'
import type { Status } from '../../../../../../../../schemas/annict/common'
import type { User } from '../../../../../../../../schemas/annict/users'
import { getUserLibraries } from '../../../../../../../actions/api/get/libraries'
import { WorkCard } from './work-card'

type WorkListProps = {
  username: User['username']
  status: Exclude<Status, 'no_select'>
}

export const WorkList: FC<WorkListProps> = async ({ status, username }) => {
  const libraries = await getUserLibraries(username, status)

  if (libraries === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>
          <Badge variant="secondary">{STATUS_TEXT(status)}</Badge> の作品の取得に失敗しました
        </p>
      </div>
    )
  }

  if (libraries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <div>
          <Badge variant="secondary">{STATUS_TEXT(status)}</Badge> の作品が見当たりません
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {libraries.map(({ work }) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}

export const WorkListSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex items-center rounded-lg border border-muted p-2 shadow-xs">
        <Skeleton className="h-24 w-24 shrink-0" />
        <div className="flex w-full flex-col gap-y-1 p-4">
          <Skeleton className="h-[1lh] w-full" />
          <Skeleton className="h-[1lh] w-1/2" />
        </div>
      </div>
    ))}
  </div>
)
