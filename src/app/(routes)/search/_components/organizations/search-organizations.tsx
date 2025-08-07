import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchOrganizations } from '../../../../actions/api/get/organizations'
import type { SearchOrder } from '../../search-params'
import { SearchOrganizationsScroller } from './search-organizations-scroller'

type SearchOrganizationsProps = {
  query: string
  order: SearchOrder
}

export const SearchOrganizations: FC<SearchOrganizationsProps> = async ({ query, order }) => {
  const organizations = await searchOrganizations({ query, order })

  if (organizations === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>団体の検索に失敗しました</p>
      </div>
    )
  }

  if (organizations.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>団体の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <SearchOrganizationsScroller
        initialOrganizations={organizations.data}
        search={{ query, order }}
      />
    </div>
  )
}

export const SearchOrganizationsSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        className="flex flex-col gap-y-1 rounded-lg border border-muted p-4 shadow-xs"
        key={index}
      >
        <Skeleton className="h-[1lh] w-2/3 text-lg" />
        <Skeleton className="h-[1lh] w-1/3" />
      </div>
    ))}
  </div>
)
