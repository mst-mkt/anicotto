import { Suspense } from 'react'
import { Label } from '../../../../components/ui/label'
import { Switch } from '../../../../components/ui/switch'
import { Textarea } from '../../../../components/ui/textarea'
import { FormButton } from './form-button'
import { RatingSelect } from './rating-select'
import { WorkSelect, WorkSelectSkeleton } from './work-select'

export const TrackFormContent = () => (
  <>
    <div className="flex flex-col gap-y-4 py-4">
      <Suspense fallback={<WorkSelectSkeleton />}>
        <WorkSelect />
      </Suspense>
      <RatingSelect />
      <Label className="flex flex-col gap-y-2">
        コメント
        <Textarea className="min-h-[6lh]" />
      </Label>
      <Label className="flex items-center gap-x-2">
        <Switch name="share_twitter" />
        Twitterにシェアする
      </Label>
      <Label className="flex items-center gap-x-2">
        <Switch name="share_facebook" />
        Facebookにシェアする
      </Label>
    </div>
    <FormButton type="submit" className="cursor-pointer" />
  </>
)
