import { BookImageIcon } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { TabsContent } from '../../../components/ui/tabs'
import { statusPicklist } from '../../../schemas/annict/common'
import { Tab } from './_components/tab'
import { WorkList, WorkListSkeleton } from './_components/work-list'
import { loadSearchParams } from './search-params'

type LibraryPageProps = {
  searchParams: Promise<SearchParams>
}

const LibraryPage: FC<LibraryPageProps> = async ({ searchParams }) => {
  const { status } = await loadSearchParams(searchParams)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <BookImageIcon className="text-anicotto-accent" size={24} />
        ライブラリ
      </h1>
      <Tab initialStatus={status ?? 'watching'}>
        {statusPicklist.options
          .filter((status) => status !== 'no_select')
          .map((status) => (
            <TabsContent key={status} value={status}>
              <Suspense fallback={<WorkListSkeleton />}>
                <WorkList status={status} />
              </Suspense>
            </TabsContent>
          ))}
      </Tab>
    </div>
  )
}

export default LibraryPage
