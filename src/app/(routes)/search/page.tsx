import { SearchIcon } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { match } from 'ts-pattern'
import { PROJECT_NAME } from '../../../constants/project'
import {
  SearchCharacters,
  SearchCharactersSkeleton,
} from './_components/characters/search-characters'
import { SearchInput } from './_components/input'
import { SearchTabs } from './_components/tabs'
import { SearchWorks, SearchWorksSkeleton } from './_components/works/search-works'
import { loadSearchParams } from './search-params'

type SearchPageProps = {
  searchParams: Promise<SearchParams>
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
  const { q: query } = await loadSearchParams(searchParams)

  return {
    title: `検索 ${query === null ? '' : `"${query}" `}| ${PROJECT_NAME}`,
    description: `アニメ作品検索結果 "${query}"`,
  }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { q: query, r: resource } = await loadSearchParams(searchParams)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <SearchIcon size={24} className="text-anicotto-accent" />
        検索
      </h1>
      <SearchInput />
      <SearchTabs />
      {query === null ? null : (
        <div>
          {match(resource ?? 'works')
            .with('works', () => (
              <Suspense fallback={<SearchWorksSkeleton />}>
                <SearchWorks query={query} />
              </Suspense>
            ))
            .with('characters', () => (
              <Suspense fallback={<SearchCharactersSkeleton />}>
                <SearchCharacters query={query} />
              </Suspense>
            ))
            .otherwise(() => (
              <div>検索結果が見つかりませんでした</div>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchPage
