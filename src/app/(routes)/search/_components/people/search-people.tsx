import { CloudAlertIcon, HeartIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchPeople } from '../../../../actions/api/get/people'
import type { SearchOrder } from '../../search-params'

type SearchPeopleProps = {
  query: string
  order: SearchOrder
}

export const SearchPeople: FC<SearchPeopleProps> = async ({ query, order }) => {
  const people = await searchPeople({ query, order })

  if (people === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>人物の検索に失敗しました</p>
      </div>
    )
  }

  if (people.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>人物の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {people.data.map((person) => (
        <Link
          href={`/people/${person.id}`}
          key={person.id}
          className="group flex flex-col rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-muted"
        >
          <h2 className="font-bold text-lg transition-colors group-hover:text-anicotto-accent">
            {person.name}
          </h2>
          <div className="flex w-fit items-center gap-x-1 self-end rounded-md bg-anicotto-accent/8 px-2 py-1 text-anicotto-accent">
            <HeartIcon size={16} />
            <span className="font-bold text-sm">{person.favorite_people_count}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const SearchPeopleSkeleton = () => (
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
