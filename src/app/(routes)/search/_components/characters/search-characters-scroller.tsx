'use client'

import { HeartIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../../hooks/useInfiniteScroll'
import { CharacterWithSeries } from '../../../../../schemas/annict/characters'
import { searchCharacters } from '../../../../actions/api/get/characters'
import { SearchOrder } from '../../search-params'

type SearchCharactersScrollerProps = {
  initialCharacters: CharacterWithSeries[]
  search: {
    query: string
    order: SearchOrder
  }
}

export const SearchCharactersScroller: FC<SearchCharactersScrollerProps> = ({
  initialCharacters,
  search,
}) => {
  const {
    data: characters,
    status,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialCharacters,
    fetchData: (page) => searchCharacters(search, page),
  })

  return (
    <>
      {characters.map((character) => (
        <Link
          className="group rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-muted"
          href={`/characters/${character.id}`}
          key={character.id}
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
      {match(status)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">キャラクターの取得に失敗しました</p>
            <Button onClick={retry}>
              <RotateCwIcon />
              リトライ
            </Button>
          </div>
        ))
        .with('success', () => hasMore && <div className="h-16 w-full" ref={triggerRef} />)
        .exhaustive()}
    </>
  )
}
