import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { EpisodeInfo } from './_components/episode-info'

type EpisodePageProps = {
  params: Promise<{
    workId: string
    episodeId: string
  }>
}

const EpisodePage: FC<EpisodePageProps> = async ({ params }) => {
  const { workId: workIdString, episodeId: episodeIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  const episodeId = Number.parseInt(episodeIdString, 10)

  if (Number.isNaN(episodeId)) {
    notFound()
  }

  return <EpisodeInfo workId={workId} episodeId={episodeId} />
}

export default EpisodePage
