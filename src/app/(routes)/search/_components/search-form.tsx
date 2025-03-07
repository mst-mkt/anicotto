'use client'

import { SearchIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { searchSearchParams } from '../search-params'
import { SortSelect } from './sort-select'

export const SearchForm = () => {
  const [search, setSearch] = useQueryState('q', {
    ...searchSearchParams.q,
    throttleMs: 1024,
    defaultValue: '',
  })

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="検索するキーワードを入力"
        autoFocus={true}
        className="col-span-2 w-full"
      />
      <SortSelect />
      <Button className="w-fit justify-self-end">
        <SearchIcon />
        検索
      </Button>
    </div>
  )
}
