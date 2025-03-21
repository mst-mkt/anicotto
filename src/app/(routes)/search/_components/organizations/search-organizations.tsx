import { CloudAlertIcon, HeartIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchOrganizations } from '../../../../actions/api/get/organizations'
import type { SearchOrder } from '../../search-params'

type SearchOrganizationsProps = {
  query: string
  order: SearchOrder
}

export const SearchOrganizations: FC<SearchOrganizationsProps> = async ({ query, order }) => {
  const organizations = await searchOrganizations({ query, order })

  if (organizations === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>団体の検索に失敗しました</p>
      </div>
    )
  }

  if (organizations.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>団体の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {organizations.data.map((organization) => (
        <Link
          href={`/organizations/${organization.id}`}
          key={organization.id}
          className="group flex flex-col rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-muted"
        >
          <h2 className="font-bold text-lg transition-colors group-hover:text-anicotto-accent">
            {organization.name}
          </h2>
          <div className="flex w-fit items-center gap-x-1 self-end rounded-md bg-anicotto-accent/8 px-2 py-1 text-anicotto-accent">
            <HeartIcon size={16} />
            <span className="font-bold text-sm">{organization.favorite_organizations_count}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const SearchOrganizationsSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col gap-y-1 rounded-lg border border-muted p-4 shadow-xs"
      >
        <Skeleton className="h-[1lh] w-2/3 text-lg" />
        <Skeleton className="h-[1lh] w-1/3" />
      </div>
    ))}
  </div>
)
