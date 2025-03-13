import { notFound, redirect } from 'next/navigation'
import type { FC } from 'react'
import { getEpisode } from '../../works/[workId]/episodes/[episodeId]/get-episode'

type EpisodePageProps = {
  params: Promise<{
    episodeId: string
  }>
}

const EpisodePage: FC<EpisodePageProps> = async ({ params }) => {
  const { episodeId: episodeIdString } = await params
  const episodeId = Number.parseInt(episodeIdString, 10)

  if (Number.isNaN(episodeId)) {
    notFound()
  }

  const episode = await getEpisode(episodeId)

  redirect(`/works/${episode.work.id}/episodes/${episode.id}`)
}

export default EpisodePage
