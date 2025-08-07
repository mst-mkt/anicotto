import { notFound } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../../constants/project'
import { getEpisodeWithInfo } from '../../../../../actions/api/get/episodes'
import { EpisodeInfo, EpisodeInfoSkeleton } from './_components/episode-info'

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

  const episode = await getEpisodeWithInfo(episodeId)

  if (episode === null) return BASIC_METADATA

  return {
    title: `${episode.number_text} - ${episode.title ?? 'タイトル不明'} | ${PROJECT_NAME}`,
    description: `${episode.work.title} ${episode.number_text}「${episode.title ?? 'タイトル不明'}」のエピソードページ`,
  }
}

const EpisodePage: FC<EpisodePageProps> = async ({ params }) => {
  const { workId: workIdString, episodeId: episodeIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  const episodeId = Number.parseInt(episodeIdString, 10)

  if (Number.isNaN(episodeId)) {
    notFound()
  }

  return (
    <Suspense fallback={<EpisodeInfoSkeleton />}>
      <EpisodeInfo episodeId={episodeId} workId={workId} />
    </Suspense>
  )
}

export default EpisodePage
