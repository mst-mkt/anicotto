import { Suspense } from 'react'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import { RatingSelect } from './rating-select'
import { WorkSelect, WorkSelectSkeleton } from './work-select-wrapper'

export const TrackFormContent = () => (
  <div className="flex flex-col gap-y-4 py-4">
    <Suspense fallback={<WorkSelectSkeleton />}>
      <WorkSelect />
    </Suspense>
    <RatingSelect />
    <Label className="flex flex-col gap-y-2">
      コメント
      <Textarea className="min-h-[6lh]" />
    </Label>
  </div>
)
