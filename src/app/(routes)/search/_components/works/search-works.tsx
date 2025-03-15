import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { SearchOrder, SearchSort } from '../../search-params'
import { searchWorks } from './get-works'
import { WorkCard } from './work-card'

type SearchWorksProps = {
  query: string
  sort: SearchSort
  order: SearchOrder
  season?: string
}

export const SearchWorks: FC<SearchWorksProps> = async ({ query, sort, order, season }) => {
  const works = await searchWorks(query, sort, order, season)

  if (works === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>作品の検索結果が見当たりませんでした</p>
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

export const SearchWorksSkeleton = () => (
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
