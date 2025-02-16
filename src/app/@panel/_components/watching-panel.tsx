import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getWorks } from '../get-programs'
import { WorkItem } from './work-item'

export const WatchingPanel = async () => {
  const watchingWorks = await getWorks()

  if (watchingWorks === null) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-y-2">
      {watchingWorks.slice(0, 8).map((work) => (
        <WorkItem key={work.id} {...work} />
      ))}
      {watchingWorks.length > 8 && (
        <Link
          href="/library"
          className="mx-auto flex w-fit items-center gap-x-2 rounded-full px-4 py-3 font-bold text-anicotto-accent text-sm transition-colors hover:bg-muted"
        >
          もっと見る
          <ChevronRightIcon size={20} />
        </Link>
      )}
    </div>
  )
}

export const WatchingPanelSkeleton = () => (
  <div>
    <div>loading...</div>
  </div>
)
