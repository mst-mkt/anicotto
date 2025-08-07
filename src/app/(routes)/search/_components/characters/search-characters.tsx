import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { searchCharacters } from '../../../../actions/api/get/characters'
import type { SearchOrder } from '../../search-params'
import { SearchCharactersScroller } from './search-characters-scroller'

type SearchCharactersProps = {
  query: string
  order: SearchOrder
}

export const SearchCharacters: FC<SearchCharactersProps> = async ({ query, order }) => {
  const characters = await searchCharacters({ query, order })

  if (characters === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>キャラクターの検索に失敗しました</p>
      </div>
    )
  }

  if (characters.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>キャラクターの検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <SearchCharactersScroller initialCharacters={characters.data} search={{ query, order }} />
    </div>
  )
}

export const SearchCharactersSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        className="flex flex-col gap-y-1 rounded-lg border border-muted p-4 shadow-xs"
        key={index}
      >
        <Skeleton className="h-[1lh] w-1/2 text-lg" />
        <Skeleton className="h-[1lh] w-2/3" />
      </div>
    ))}
  </div>
)
