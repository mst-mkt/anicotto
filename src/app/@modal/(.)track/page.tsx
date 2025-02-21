import type { SearchParams } from 'nuqs/server'
import type { FC } from 'react'
import { BackDialog } from '../back-dialog'
import { TrackFormContent } from './_components/form-content'
import { TrackFormWrapper } from './_components/form-wrapper'
import { loadSearchParams } from './search-params'

type TrackModalProps = {
  searchParams: Promise<SearchParams>
}

const TrackModal: FC<TrackModalProps> = async ({ searchParams }) => {
  const { episode } = await loadSearchParams(searchParams)

  return (
    <BackDialog title="記録する" description="アニメの視聴記録を作成します">
      <TrackFormWrapper className="flex w-full flex-col gap-y-4">
        <TrackFormContent selectedEpisode={episode} />
      </TrackFormWrapper>
    </BackDialog>
  )
}

export default TrackModal
