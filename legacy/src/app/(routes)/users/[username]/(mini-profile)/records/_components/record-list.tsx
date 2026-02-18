import { CloudAlertIcon, ScrollTextIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { User } from '../../../../../../../schemas/annict/users'
import { getUserRecords } from '../../../../../../actions/api/get/records'
import { RecordListScroller } from './record-list-scroller'

type RecordListProps = {
  username: User['username']
}

export const RecordList: FC<RecordListProps> = async ({ username }) => {
  const records = await getUserRecords(username)

  if (records === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-muted-foreground" size={40} />
        <p>記録の取得に失敗しました</p>
      </div>
    )
  }

  if (records.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <ScrollTextIcon className="text-muted-foreground" size={40} />
        <p>記録がありません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 py-8">
      <RecordListScroller
        initialRecords={records.data}
        initialEndCursor={records.endCursor}
        username={username}
      />
    </div>
  )
}

export const RecordListSkeleton = () => (
  <div className="flex flex-col gap-y-8 py-8">
    {[...Array(8)].map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
      <div className="flex gap-x-4" key={i}>
        <Skeleton className="aspect-square h-16 w-16 shrink-0" />
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex items-center justify-between gap-x-2">
            <Skeleton className="h-[1lh] w-1/2" />
            <Skeleton className="h-[1lh] w-1/4" />
          </div>
          <Skeleton className="h-[1lh] w-full" />
        </div>
      </div>
    ))}
  </div>
)
