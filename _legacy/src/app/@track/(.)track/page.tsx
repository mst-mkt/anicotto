import { BackDialog } from '../back-dialog'
import { FormButton } from './_components/form-button'
import { TrackFormContent } from './_components/form-content'
import { TrackFormWrapper } from './_components/form-wrapper'

const TrackModal = () => (
  <BackDialog description="アニメの視聴記録を作成します" title="記録する">
    <TrackFormWrapper className="flex w-full flex-col gap-y-4 [@media(display-mode:standalone)]:pb-4">
      <TrackFormContent />
      <FormButton className="cursor-pointer" type="submit" />
    </TrackFormWrapper>
  </BackDialog>
)

export default TrackModal
