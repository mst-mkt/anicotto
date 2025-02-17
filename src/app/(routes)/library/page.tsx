import { BookImageIcon } from 'lucide-react'
import { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { STATUS_TEXT } from '../../../constants/status'
import { statusPicklist } from '../../../schemas/annict/common'
import { WorkList, WorkListSkeleton } from './_components/work-list'

const libraryStatus = statusPicklist.options.filter((status) => status !== 'no_select')

const LibraryPage = () => (
  <div className="flex flex-col gap-y-4">
    <h1 className="flex items-center gap-x-2 font-bold text-lg">
      <BookImageIcon className="text-anicotto-accent" size={24} />
      ライブラリ
    </h1>
    <Tabs defaultValue="watching">
      <TabsList>
        {libraryStatus.map((status) => (
          <TabsTrigger key={status} value={status} className="cursor-pointer">
            {STATUS_TEXT[status]}
          </TabsTrigger>
        ))}
      </TabsList>
      {libraryStatus.map((status) => (
        <TabsContent key={status} value={status}>
          <Suspense fallback={<WorkListSkeleton />}>
            <WorkList status={status} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  </div>
)

export default LibraryPage
