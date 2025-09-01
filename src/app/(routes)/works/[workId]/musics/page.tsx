import { Disc3Icon, MusicIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../../../../actions/api/get/works'
import { Playlist, PlaylistSkeleton } from './_components/playlist'
import { Tracks, TracksSkeleton } from './_components/tracks'

type WorkMusicsPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkMusicsPageProps): Promise<Metadata> => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return BASIC_METADATA

  const work = await getWork(workId)
  if (work === null) return BASIC_METADATA

  return {
    title: `${work.title} - 楽曲 | ${PROJECT_NAME}`,
    description: `${work.title}の楽曲情報`,
  }
}

const WorkMusicsPage: FC<WorkMusicsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="flex items-center gap-x-2 font-bold text-lg">
        <Disc3Icon className="text-anicotto-accent" size={24} />
        プレイリスト
      </h2>
      <Suspense fallback={<PlaylistSkeleton />}>
        <Playlist workId={workId} />
      </Suspense>
      <h2 className="flex items-center gap-x-2 font-bold text-lg">
        <MusicIcon className="text-anicotto-accent" size={24} />
        関連楽曲
      </h2>
      <Suspense fallback={<TracksSkeleton />}>
        <Tracks workId={workId} />
      </Suspense>
    </div>
  )
}

export default WorkMusicsPage
