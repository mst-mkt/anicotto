import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchPeople } from '../../../../actions/api/get/people'
import type { SearchOrder } from '../../search-params'
import { SearchPeopleScroller } from './search-people-scroller'

type SearchPeopleProps = {
  query: string
  order: SearchOrder
}

export const SearchPeople: FC<SearchPeopleProps> = async ({ query, order }) => {
  const people = await searchPeople({ query, order })

  if (people === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>人物の検索に失敗しました</p>
      </div>
    )
  }

  if (people.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>人物の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <SearchPeopleScroller initialPeople={people.data} search={{ query, order }} />
    </div>
  )
}

export const SearchPeopleSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        className="flex flex-col gap-y-1 rounded-lg border border-muted p-4 shadow-xs"
        // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
        key={index}
      >
        <Skeleton className="h-[1lh] w-2/3 text-lg" />
        <Skeleton className="h-[1lh] w-1/3" />
      </div>
    ))}
  </div>
)
