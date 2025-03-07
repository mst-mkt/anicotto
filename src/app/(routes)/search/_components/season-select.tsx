'use client'

import {
  CalendarDaysIcon,
  CalendarRangeIcon,
  FlowerIcon,
  LeafIcon,
  LoaderIcon,
  SnowflakeIcon,
  SunIcon,
} from 'lucide-react'
import { useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'
import { match } from 'ts-pattern'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '../../../../components/ui/select'
import { searchSearchParams } from '../search-params'

export const SeasonSelect = () => {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useQueryStates(searchSearchParams, { startTransition })

  const seasonText = query.season === 'all' ? 'all' : `${query.season.year}-${query.season.season}`

  const yearRange = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const length = currentYear - 2000 + 3
    return Array.from({ length }, (_, index) => currentYear + 2 - index)
  }, [])

  if (query.r !== 'works') return null

  const handleChange = (value: string) => {
    setQuery({ season: searchSearchParams.season.parse(value) })
  }

  return (
    <Select onValueChange={handleChange} value={seasonText}>
      <SelectTrigger className="w-fit shrink-0 cursor-pointer gap-x-2 justify-self-start">
        <div className="flex items-center gap-x-2">
          {isPending ? (
            <LoaderIcon size={16} className="animate-spin text-muted-foreground" />
          ) : (
            match(query.season)
              .with('all', () => <CalendarDaysIcon size={16} className="text-muted-foreground" />)
              .with({ season: 'all' }, () => (
                <CalendarRangeIcon size={16} className="text-muted-foreground" />
              ))
              .with({ season: 'winter' }, () => (
                <SnowflakeIcon size={16} className="text-muted-foreground" />
              ))
              .with({ season: 'spring' }, () => (
                <FlowerIcon size={16} className="text-muted-foreground" />
              ))
              .with({ season: 'summer' }, () => (
                <SunIcon size={16} className="text-muted-foreground" />
              ))
              .with({ season: 'autumn' }, () => (
                <LeafIcon size={16} className="text-muted-foreground" />
              ))
              .exhaustive()
          )}
          <span className=" sm:inline">
            {match(query.season)
              .with('all', () => '全期間')
              .with({ season: 'all' }, ({ year }) => `${year}年`)
              .with({ season: 'winter' }, ({ year }) => `${year}年 冬`)
              .with({ season: 'spring' }, ({ year }) => `${year}年 春`)
              .with({ season: 'summer' }, ({ year }) => `${year}年 夏`)
              .with({ season: 'autumn' }, ({ year }) => `${year}年 秋`)
              .exhaustive()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>放送時期</SelectLabel>
          <SelectItem
            value="all"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <CalendarDaysIcon size={16} className="text-muted-foreground" />
            全期間
          </SelectItem>
          {yearRange.map((year) => (
            <SelectGroup key={year}>
              <SelectLabel>{year}年</SelectLabel>
              <SelectItem
                value={`${year}-all`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <CalendarRangeIcon size={16} className="text-muted-foreground" />
                全季節
              </SelectItem>
              <SelectItem
                value={`${year}-winter`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <SnowflakeIcon size={16} className="text-muted-foreground" />冬
              </SelectItem>
              <SelectItem
                value={`${year}-spring`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <FlowerIcon size={16} className="text-muted-foreground" />春
              </SelectItem>
              <SelectItem
                value={`${year}-summer`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <SunIcon size={16} className="text-muted-foreground" />夏
              </SelectItem>
              <SelectItem
                value={`${year}-autumn`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <LeafIcon size={16} className="text-muted-foreground" />秋
              </SelectItem>
            </SelectGroup>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
