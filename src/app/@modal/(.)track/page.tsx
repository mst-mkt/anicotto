import { BackDialog } from '../back-dialog'
import { TrackFormContent } from './_components/form-content'
import { TrackFormWrapper } from './_components/form-wrapper'

const TrackModal = () => {
  return (
    <BackDialog title="記録する" description="アニメの視聴記録を作成します">
      <TrackFormWrapper className="flex w-full flex-col gap-y-4">
        <TrackFormContent />
      </TrackFormWrapper>
    </BackDialog>
  )
}

export default TrackModal
