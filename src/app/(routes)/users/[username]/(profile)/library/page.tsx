import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../../../../actions/api/get/users'
import { LibraryCarousel, LibraryCarouselSkeleton } from './_components/carousel'

type UserLibraryPageProps = {
  params: Promise<{
    username: string
  }>
}

export const generateMetadata = async ({ params }: UserLibraryPageProps): Promise<Metadata> => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - ライブラリ | ${PROJECT_NAME}`,
    description: `${user?.name}の視聴した作品の一覧`,
  }
}

const UserLibraryPage: FC<UserLibraryPageProps> = async ({ params }) => {
  const { username } = await params

  return (
    <div className="flex flex-col gap-y-16 py-8">
      <Suspense fallback={<LibraryCarouselSkeleton status="watching" />}>
        <LibraryCarousel status="watching" username={username} />
      </Suspense>
      <Suspense fallback={<LibraryCarouselSkeleton status="wanna_watch" />}>
        <LibraryCarousel status="wanna_watch" username={username} />
      </Suspense>
      <Suspense fallback={<LibraryCarouselSkeleton status="watched" />}>
        <LibraryCarousel status="watched" username={username} />
      </Suspense>
      <Suspense fallback={<LibraryCarouselSkeleton status="on_hold" />}>
        <LibraryCarousel status="on_hold" username={username} />
      </Suspense>
      <Suspense fallback={<LibraryCarouselSkeleton status="stop_watching" />}>
        <LibraryCarousel status="stop_watching" username={username} />
      </Suspense>
    </div>
  )
}

export default UserLibraryPage
