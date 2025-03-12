import { BookImageIcon } from 'lucide-react'
import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { ViewTransition } from '../../../components/shared/view-transition'
import { TabsContent } from '../../../components/ui/tabs'
import { PROJECT_NAME } from '../../../constants/project'
import { statusPicklist } from '../../../schemas/annict/common'
import { Tab } from './_components/tab'
import { WorkList, WorkListSkeleton } from './_components/work-list'
import { loadSearchParams } from './search-params'

export const metadata: Metadata = {
  title: `ライブラリ | ${PROJECT_NAME}`,
  description: 'ステータスを設定した作品の一覧',
}

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
              <ViewTransition>
                <Suspense fallback={<WorkListSkeleton />}>
                  <WorkList status={status} />
                </Suspense>
              </ViewTransition>
            </TabsContent>
          ))}
      </Tab>
    </div>
  )
}

export default LibraryPage
