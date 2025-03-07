import { SearchIcon } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { match } from 'ts-pattern'
import { Separator } from '../../../components/ui/separator'
import { PROJECT_NAME } from '../../../constants/project'
import {
  SearchCharacters,
  SearchCharactersSkeleton,
} from './_components/characters/search-characters'
import {
  SearchOrganizations,
  SearchOrganizationsSkeleton,
} from './_components/organizations/search-organizations'
import { SearchPeople, SearchPeopleSkeleton } from './_components/people/search-people'
import { SearchForm } from './_components/search-form'
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
  const { q: query, r: resource, sort, order } = await loadSearchParams(searchParams)

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <SearchIcon size={24} className="text-anicotto-accent" />
        検索
      </h1>
      <SearchTabs />
      <SearchForm />
      {query === null ? null : (
        <>
          <Separator />
          {match(resource ?? 'works')
            .with('works', () => (
              <Suspense fallback={<SearchWorksSkeleton />}>
                <SearchWorks query={query} sort={sort} order={order} />
              </Suspense>
            ))
            .with('characters', () => (
              <Suspense fallback={<SearchCharactersSkeleton />}>
                <SearchCharacters query={query} order={order} />
              </Suspense>
            ))
            .with('people', () => (
              <Suspense fallback={<SearchPeopleSkeleton />}>
                <SearchPeople query={query} order={order} />
              </Suspense>
            ))
            .with('organizations', () => (
              <Suspense fallback={<SearchOrganizationsSkeleton />}>
                <SearchOrganizations query={query} order={order} />
              </Suspense>
            ))
            .exhaustive()}
        </>
      )}
    </div>
  )
}

export default SearchPage
