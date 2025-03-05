'use client'

import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
} from 'lucide-react'
import {} from 'next/navigation'
import { useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { match } from 'ts-pattern'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '../../../../components/ui/select'
import { searchSearchParams } from '../search-params'

export const SortSelect = () => {
  const [query, setQuery] = useQueryStates(searchSearchParams)

  const handleChange = (value: string) => {
    const [sort, order] = value.split(':')

    setQuery({
      sort: searchSearchParams.sort.parse(sort),
      order: searchSearchParams.order.parse(order),
    })
  }

  useEffect(() => {
    if (query.r === 'works' || query.r === null) return
    if (query.sort === 'id') return

    setQuery({ sort: 'id' })
  }, [query.r, query.sort, setQuery])

  return (
    <Select onValueChange={(value) => handleChange(value)} value={`${query.sort}:${query.order}`}>
      <SelectTrigger className="w-fit shrink-0 cursor-pointer gap-x-2 self-end">
        <div className="flex w-fit items-center gap-x-2">
          {match(query)
            .with({ sort: 'id', order: 'asc' }, () => <ClockArrowUpIcon size={16} />)
            .with({ sort: 'id', order: 'desc' }, () => <ClockArrowDownIcon size={16} />)
            .with({ sort: 'season', order: 'asc' }, () => <CalendarArrowUpIcon size={16} />)
            .with({ sort: 'season', order: 'desc' }, () => <CalendarArrowDownIcon size={16} />)
            .with({ sort: 'watchers', order: 'asc' }, () => <ArrowDownNarrowWideIcon size={16} />)
            .with({ sort: 'watchers', order: 'desc' }, () => <ArrowUpNarrowWideIcon size={16} />)
            .exhaustive()}
          <span className="hidden sm:inline">
            {match(query)
              .with({ sort: 'id', order: 'asc' }, () => '作成日: 古い順')
              .with({ sort: 'id', order: 'desc' }, () => '作成日: 新しい順')
              .with({ sort: 'season', order: 'asc' }, () => '放送時期: 古い順')
              .with({ sort: 'season', order: 'desc' }, () => '放送時期: 新しい順')
              .with({ sort: 'watchers', order: 'asc' }, () => '視聴者数: 少ない順')
              .with({ sort: 'watchers', order: 'desc' }, () => '視聴者数: 多い順')
              .exhaustive()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>作成順</SelectLabel>
          <SelectItem
            value="id:asc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ClockArrowUpIcon size={16} className="text-muted-foreground" />
            古い順
          </SelectItem>
          <SelectItem
            value="id:desc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ClockArrowDownIcon size={16} className="text-muted-foreground" />
            新しい順
          </SelectItem>
        </SelectGroup>
        {query.r === 'works' ||
          (query.r === null && (
            <>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>放送時期</SelectLabel>
                <SelectItem
                  value="season:asc"
                  className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <CalendarArrowUpIcon size={16} className="text-muted-foreground" />
                  古い順
                </SelectItem>
                <SelectItem
                  value="season:desc"
                  className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <CalendarArrowDownIcon size={16} className="text-muted-foreground" />
                  新しい順
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>視聴者数</SelectLabel>
                <SelectItem
                  value="watchers:asc"
                  className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <ArrowDownNarrowWideIcon size={16} className="text-muted-foreground" />
                  少ない順
                </SelectItem>
                <SelectItem
                  value="watchers:desc"
                  className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <ArrowUpNarrowWideIcon size={16} className="text-muted-foreground" />
                  多い順
                </SelectItem>
              </SelectGroup>
            </>
          ))}
      </SelectContent>
    </Select>
  )
}
