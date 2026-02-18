'use client'

import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useTransition } from 'react'
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
  const [isPending, startTransition] = useTransition()
  const [resource] = useQueryState('r', searchSearchParams.r)
  const [sort, setSort] = useQueryState('sort', {
    ...searchSearchParams.sort,
    defaultValue: resource === 'works' ? 'watchers' : 'id',
    startTransition,
  })
  const [order, setOrder] = useQueryState('order', { ...searchSearchParams.order, startTransition })

  const handleChange = (value: string) => {
    const [sort, order] = value.split(':')

    setSort(searchSearchParams.sort.parse(sort))
    setOrder(searchSearchParams.order.parse(order))
  }

  useEffect(() => {
    if (resource === 'works') return
    if (sort === 'id') return

    setSort('id')
  }, [resource, setSort, sort])

  return (
    <Select onValueChange={(value) => handleChange(value)} value={`${sort}:${order}`}>
      <SelectTrigger className="w-fit shrink-0 cursor-pointer gap-x-2 justify-self-start">
        <div className="flex w-fit items-center gap-x-2">
          {isPending ? (
            <LoaderIcon className="animate-spin text-muted-foreground" size={16} />
          ) : (
            match([sort, order])
              .with(['id', 'asc'], () => (
                <ClockArrowUpIcon className="text-muted-foreground" size={16} />
              ))
              .with(['id', 'desc'], () => (
                <ClockArrowDownIcon className="text-muted-foreground" size={16} />
              ))
              .with(['season', 'asc'], () => (
                <CalendarArrowUpIcon className="text-muted-foreground" size={16} />
              ))
              .with(['season', 'desc'], () => (
                <CalendarArrowDownIcon className="text-muted-foreground" size={16} />
              ))
              .with(['watchers', 'asc'], () => (
                <ArrowDownNarrowWideIcon className="text-muted-foreground" size={16} />
              ))
              .with(['watchers', 'desc'], () => (
                <ArrowUpNarrowWideIcon className="text-muted-foreground" size={16} />
              ))
              .exhaustive()
          )}
          <span className="hidden sm:inline">
            {match([sort, order])
              .with(['id', 'asc'], () => '作成日: 古い順')
              .with(['id', 'desc'], () => '作成日: 新しい順')
              .with(['season', 'asc'], () => '放送時期: 古い順')
              .with(['season', 'desc'], () => '放送時期: 新しい順')
              .with(['watchers', 'asc'], () => '視聴者数: 少ない順')
              .with(['watchers', 'desc'], () => '視聴者数: 多い順')
              .exhaustive()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>作成順</SelectLabel>
          <SelectItem
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
            value="id:asc"
          >
            <ClockArrowUpIcon className="text-muted-foreground" size={16} />
            古い順
          </SelectItem>
          <SelectItem
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
            value="id:desc"
          >
            <ClockArrowDownIcon className="text-muted-foreground" size={16} />
            新しい順
          </SelectItem>
        </SelectGroup>
        {resource === 'works' && (
          <>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>放送時期</SelectLabel>
              <SelectItem
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                value="season:asc"
              >
                <CalendarArrowUpIcon className="text-muted-foreground" size={16} />
                古い順
              </SelectItem>
              <SelectItem
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                value="season:desc"
              >
                <CalendarArrowDownIcon className="text-muted-foreground" size={16} />
                新しい順
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>視聴者数</SelectLabel>
              <SelectItem
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                value="watchers:asc"
              >
                <ArrowDownNarrowWideIcon className="text-muted-foreground" size={16} />
                少ない順
              </SelectItem>
              <SelectItem
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                value="watchers:desc"
              >
                <ArrowUpNarrowWideIcon className="text-muted-foreground" size={16} />
                多い順
              </SelectItem>
            </SelectGroup>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
