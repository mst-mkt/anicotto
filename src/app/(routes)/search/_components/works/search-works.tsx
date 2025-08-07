import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchWorks } from '../../../../actions/api/get/works'
import type { SearchOrder, SearchSort } from '../../search-params'
import { WorkCard } from './work-card'

type SearchWorksProps = {
  query: string
  sort: SearchSort
  order: SearchOrder
  season?: string
}

export const SearchWorks: FC<SearchWorksProps> = async ({ query, sort, order, season }) => {
  const works = await searchWorks({ query, sort, order, season })

  if (works === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  if (works.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>作品の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {works.data.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}

export const SearchWorksSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
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
