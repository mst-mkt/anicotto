'use client'

import { LoaderIcon, SearchIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { searchSearchParams } from '../search-params'
import { SortSelect } from './sort-select'

export const SearchForm = () => {
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useQueryState('q', {
    ...searchSearchParams.q,
    throttleMs: 1024,
    defaultValue: '',
  })
  const [_, setSearchInstantly] = useQueryState('q', {
    ...searchSearchParams.q,
    history: 'push',
    startTransition,
  })

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyDown={(e) => e.key === 'Enter' && setSearchInstantly(search)}
        placeholder="検索するキーワードを入力"
        autoFocus={true}
        className="col-span-2 w-full"
      />
      <SortSelect />
      <Button
        onClick={() => setSearchInstantly(search)}
        disabled={isPending || search.trim() === ''}
        className="w-fit justify-self-end"
      >
        {isPending ? <LoaderIcon className="animate-spin" /> : <SearchIcon />}
        検索
      </Button>
    </div>
  )
}
