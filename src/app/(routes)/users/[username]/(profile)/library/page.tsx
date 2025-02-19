import { type FC, Suspense } from 'react'
import { LibraryCarousel, LibraryCarouselSkeleton } from './_components/carousel'

type UserLibraryPageProps = {
  params: Promise<{
    username: string
  }>
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
