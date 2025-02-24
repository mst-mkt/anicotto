import { CloudAlertIcon, ImageOffIcon, OrigamiIcon, PackageSearchIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../../../components/hover-card/work'
import { Image } from '../../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../../../../components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../../../../../../components/ui/carousel'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import { MEDIA_TEXT } from '../../../../../../../constants/media'
import { SEASON_TEXT } from '../../../../../../../constants/season'
import { STATUS_TEXT } from '../../../../../../../constants/status'
import type { Status } from '../../../../../../../schemas/annict/common'
import { getLibrary } from '../get-library'
import { LibraryCarouselTitle, LibraryTitle } from './carousel-title'

type LibraryCarouselProps = {
  status: Exclude<Status, 'no_select'>
  username: string
}

export const LibraryCarousel: FC<LibraryCarouselProps> = async ({ status, username }) => {
  const libraries = await getLibrary(username, status)

  if (libraries === null) {
    return (
      <div>
        <LibraryTitle status={status} />
        <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
          <CloudAlertIcon size={40} className="text-muted-foreground" />
          <p>「{STATUS_TEXT[status]}」のライブラリが取得できませんでした</p>
        </div>
      </div>
    )
  }

  if (libraries.length === 0) {
    return (
      <div>
        <LibraryTitle status={status} />
        <div className="flex w-full flex-col items-center justify-center gap-y-6 py-12">
          <OrigamiIcon size={40} className="text-muted-foreground" />
          <p>ライブラリに「{STATUS_TEXT[status]}」の作品はありません</p>
        </div>
      </div>
    )
  }

  return (
    <Carousel opts={{ wheel: true }} className="flex flex-col gap-y-4">
      <LibraryCarouselTitle status={status} itemCount={libraries.length} />
      <CarouselContent>
        {libraries.map(({ work }) => (
          <CarouselItem key={work.id} className="basis-1/2 md:basis-1/3">
            <WorkHoverCard
              work={{
                id: work.id,
                title: work.title,
                media_text: MEDIA_TEXT[work.media],
                season_name_text:
                  work.seasonName !== null && work.seasonYear !== null
                    ? `${work.seasonYear}年${SEASON_TEXT[work.seasonName]}`
                    : undefined,
                episodes_count: work.episodesCount,
                watchers_count: work.watchersCount,
                reviews_count: work.reviewsCount,
                images: [work.image ?? ''],
              }}
            >
              <Link href={`/works/${work.id}`} className="group flex flex-col gap-y-2">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={256}
                    height={144}
                    fallback={
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        <ImageOffIcon size={40} />
                      </div>
                    }
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
                <h3 className="line-clamp-2 font-bold text-sm transition-colors group-hover:text-anicotto-accent-600">
                  {work.title}
                </h3>
                <div className="flex gap-x-2 py-1">
                  {work.seasonName !== null && work.seasonYear && (
                    <Badge variant="secondary">
                      {work.seasonYear}年{SEASON_TEXT[work.seasonName]}
                    </Badge>
                  )}
                  <Badge variant="secondary">{MEDIA_TEXT[work.media]}</Badge>
                </div>
              </Link>
            </WorkHoverCard>
          </CarouselItem>
        ))}
        {libraries.length > 4 && (
          <CarouselItem className="basis-1/2 md:basis-1/3">
            <Link
              href={`/users/${username}/library/${status}`}
              className="flex h-full flex-col items-center justify-center gap-y-4 rounded-md border border-muted-foreground bg-muted text-muted-foreground transition-colors hover:bg-background-100"
            >
              <PackageSearchIcon size={40} />
              すべて見る
            </Link>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  )
}

export const LibraryCarouselSkeleton: FC<Pick<LibraryCarouselProps, 'status'>> = ({ status }) => (
  <div className="flex flex-col gap-y-4">
    <LibraryTitle status={status} />
    <div className="flex w-full gap-x-4">
      {[...Array(3)].map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: this key is index of static array
          key={i}
          className="flex shrink basis-1/2 flex-col gap-y-2 last:hidden md:basis-1/3 md:last:flex"
        >
          <Skeleton className="aspect-video" />
          <Skeleton className="h-[1lh] w-2/3" />
          <Skeleton className="h-[1lh] w-1/2 text-sm" />
        </div>
      ))}
    </div>
  </div>
)
