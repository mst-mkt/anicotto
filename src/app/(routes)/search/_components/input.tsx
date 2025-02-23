'use client'

import { useQueryState } from 'nuqs'
import { Input } from '../../../../components/ui/input'
import { searchSearchParams } from '../search-params'

export const SearchInput = () => {
  const [search, setSearch] = useQueryState('q', {
    ...searchSearchParams.q,
    throttleMs: 1024,
    defaultValue: '',
  })

  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
      placeholder="検索するキーワードを入力"
      autoFocus={true}
    />
  )
}
