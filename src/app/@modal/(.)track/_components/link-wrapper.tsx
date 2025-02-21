import type { FC } from 'react'
import { getEpisode } from '../get-episode'
import { MultiTrackLink as MultiTrackLinkContent } from './link'

type MultiTrackLinkProps = {
  episodeId: number
}

export const MultiTrackLink: FC<MultiTrackLinkProps> = async ({ episodeId }) => {
  const episode = await getEpisode(episodeId)

  if (episode === null) return null

  return <MultiTrackLinkContent workId={episode.work.id} />
}
