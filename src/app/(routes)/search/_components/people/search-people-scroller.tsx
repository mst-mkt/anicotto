'use client'

import { HeartIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../../hooks/useInfiniteScroll'
import { PersonWithPrefecture } from '../../../../../schemas/annict/people'
import { searchPeople } from '../../../../actions/api/get/people'
import { SearchOrder } from '../../search-params'

type SearchPeopleScrollerProps = {
  initialPeople: PersonWithPrefecture[]
  search: {
    query: string
    order: SearchOrder
  }
}

export const SearchPeopleScroller: FC<SearchPeopleScrollerProps> = ({ initialPeople, search }) => {
  const {
    data: people,
    status,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialPeople,
    fetchData: (page) => searchPeople(search, page),
  })

  return (
    <>
      {people.map((person) => (
        <Link
          className="group flex flex-col rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-muted"
          href={`/people/${person.id}`}
          key={person.id}
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
      {match(status)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">人物の取得に失敗しました</p>
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
