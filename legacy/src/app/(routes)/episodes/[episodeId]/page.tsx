import { notFound, redirect } from 'next/navigation'
import type { FC } from 'react'
import { getEpisodeWithInfo } from '../../../actions/api/get/episodes'

const EpisodePage: FC<PageProps<'/episodes/[episodeId]'>> = async ({ params }) => {
  const { episodeId: episodeIdString } = await params
  const episodeId = Number.parseInt(episodeIdString, 10)

  if (Number.isNaN(episodeId)) {
    notFound()
  }

  const episode = await getEpisodeWithInfo(episodeId)

  if (episode === null) {
    notFound()
  }

  redirect(`/works/${episode.work.id}/episodes/${episode.id}`)
}

export default EpisodePage
