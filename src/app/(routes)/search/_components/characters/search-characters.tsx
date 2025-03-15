import { CloudAlertIcon, HeartIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { SearchOrder } from '../../search-params'
import { searchCharacters } from './get-characters'

type SearchCharactersProps = {
  query: string
  order: SearchOrder
}

export const SearchCharacters: FC<SearchCharactersProps> = async ({ query, order }) => {
  const characters = await searchCharacters(query, order)

  if (characters === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>キャラクターの検索に失敗しました</p>
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>キャラクターの検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {characters.map((character) => (
        <Link
          href={`/characters/${character.id}`}
          key={character.id}
          className="group rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-muted"
        >
          <h2 className="font-bold text-lg transition-colors group-hover:text-anicotto-accent">
            {character.name}
          </h2>
          <div className="flex items-center justify-end gap-x-4">
            {character.series !== null && (
              <p className="flex w-full min-w-0 shrink gap-x-1">
                <span className="truncate">{character.series.name}</span>
                <span className="shrink-0 self-end break-keep font-bold text-muted-foreground text-sm">
                  シリーズ
                </span>
              </p>
            )}
            <div className="flex w-fit items-center gap-x-1 rounded-md bg-anicotto-accent/8 px-2 py-1 text-anicotto-accent">
              <HeartIcon size={16} />
              <span className="font-bold text-sm">{character.favorite_characters_count}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const SearchCharactersSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col gap-y-1 rounded-lg border border-muted p-4 shadow-xs"
      >
        <Skeleton className="h-[1lh] w-1/2 text-lg" />
        <Skeleton className="h-[1lh] w-2/3" />
      </div>
    ))}
  </div>
)
