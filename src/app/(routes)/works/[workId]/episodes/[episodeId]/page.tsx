import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { EpisodeInfo } from './_components/episode-info'
import { getEpisode } from './get-episode'

type EpisodePageProps = {
  params: Promise<{
    workId: string
    episodeId: string
  }>
}

export const generateMetadata = async ({ params }: EpisodePageProps) => {
  const { episodeId: episodeIdString } = await params
  const episodeId = Number.parseInt(episodeIdString, 10)

  if (Number.isNaN(episodeId)) {
    notFound()
  }

  const episode = await getEpisode(episodeId)

  return {
    title: `${episode.numberText} - ${episode.title ?? 'タイトル不明'} | ${PROJECT_NAME}`,
    description: `${episode.work.title} ${episode.numberText}「${episode.title ?? 'タイトル不明'}」のエピソードページ`,
  }
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
