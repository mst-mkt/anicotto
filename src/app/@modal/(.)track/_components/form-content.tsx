import { type FC, Suspense } from 'react'
import { Label } from '../../../../components/ui/label'
import { Switch } from '../../../../components/ui/switch'
import { Textarea } from '../../../../components/ui/textarea'
import { FormButton } from './form-button'
import { MultiTrackLink } from './link-wrapper'
import { RatingSelect } from './rating-select'
import { WorkSelect, WorkSelectSkeleton } from './work-select-wrapper'

type TrackFormContentProps = {
  selectedEpisode: number | null
}

export const TrackFormContent: FC<TrackFormContentProps> = ({ selectedEpisode }) => {
  return (
    <>
      <div className="flex flex-col gap-y-4 py-4">
        <Suspense fallback={<WorkSelectSkeleton />}>
          <WorkSelect selectedEpisode={selectedEpisode} />
        </Suspense>
        {selectedEpisode !== null && (
          <Suspense>
            <MultiTrackLink episodeId={selectedEpisode} />
          </Suspense>
        )}
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
}
