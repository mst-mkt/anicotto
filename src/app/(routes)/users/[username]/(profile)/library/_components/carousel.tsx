import { CloudAlertIcon, ImageOffIcon, OrigamiIcon, PackageSearchIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../../../../components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../../../../../../components/ui/carousel'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import { STATUS_TEXT } from '../../../../../../../constants/text/status'
import type { Status } from '../../../../../../../schemas/annict/common'
import { getUserLibraries } from '../../../../../../actions/api/get/libraries'
import { LibraryCarouselTitle, LibraryTitle } from './carousel-title'

type LibraryCarouselProps = {
  status: Exclude<Status, 'no_select'>
  username: string
}

export const LibraryCarousel: FC<LibraryCarouselProps> = async ({ status, username }) => {
  const libraries = await getUserLibraries(username, status)

  if (libraries === null) {
    return (
      <div>
        <LibraryTitle status={status} />
        <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
          <CloudAlertIcon className="text-muted-foreground" size={40} />
          <p>「{STATUS_TEXT(status)}」のライブラリが取得できませんでした</p>
        </div>
      </div>
    )
  }

  if (libraries.length === 0) {
    return (
      <div>
        <LibraryTitle status={status} />
        <div className="flex w-full flex-col items-center justify-center gap-y-6 py-12">
          <OrigamiIcon className="text-muted-foreground" size={40} />
          <p>ライブラリに「{STATUS_TEXT(status)}」の作品はありません</p>
        </div>
      </div>
    )
  }

  return (
    <Carousel className="flex flex-col gap-y-4" opts={{ wheel: true }}>
      <LibraryCarouselTitle itemCount={libraries.length} status={status} />
      <CarouselContent>
        {libraries.map(({ work }) => (
          <CarouselItem className="basis-1/2 md:basis-1/3" key={work.id}>
            <WorkHoverCard work={work}>
              <Link className="group flex flex-col gap-y-2" href={`/works/${work.id}`}>
                <AspectRatio className="overflow-hidden rounded-md bg-muted" ratio={16 / 9}>
                  <Image
                    alt={work.title}
                    className="h-full w-full object-cover"
                    fallback={
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        <ImageOffIcon size={40} />
                      </div>
                    }
                    height={144}
                    src={work.thumbnail}
                    width={256}
                  />
                </AspectRatio>
                <h3 className="line-clamp-2 font-bold text-sm transition-colors group-hover:text-anicotto-accent-600">
                  {work.title}
                </h3>
                <div className="flex gap-x-2 py-1">
                  {work.season_name_text !== null && (
                    <Badge variant="secondary">{work.season_name_text}</Badge>
                  )}
                  <Badge variant="secondary">{work.media_text}</Badge>
                </div>
              </Link>
            </WorkHoverCard>
          </CarouselItem>
        ))}
        {libraries.length > 4 && (
          <CarouselItem className="basis-1/2 md:basis-1/3">
            <Link
              className="flex h-full flex-col items-center justify-center gap-y-4 rounded-md border border-muted-foreground bg-muted text-muted-foreground transition-colors hover:bg-background-100"
              href={`/users/${username}/library/${status}`}
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
          className="flex shrink basis-1/2 flex-col gap-y-2 last:hidden md:basis-1/3 md:last:flex"
          // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
          key={i}
        >
          <Skeleton className="aspect-video" />
          <Skeleton className="h-[1lh] w-2/3" />
          <Skeleton className="h-[1lh] w-1/2 text-sm" />
        </div>
      ))}
    </div>
  </div>
)
