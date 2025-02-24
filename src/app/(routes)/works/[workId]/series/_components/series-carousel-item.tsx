import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../../components/hover-card/work'
import { Image } from '../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../../../components/ui/badge'
import { CarouselItem } from '../../../../../../components/ui/carousel'
import { MEDIA_TEXT } from '../../../../../../constants/media'
import { SEASON_TEXT } from '../../../../../../constants/season'
import { getValidWorkImage } from '../../../../../../lib/images/valid-url'
import type { Series } from '../get-series'

type SeriesCarouselItemProps = {
  work: Series['works'][number]
}

export const SeriesCarouselItem: FC<SeriesCarouselItemProps> = async ({ work }) => {
  const validThumbnail = await getValidWorkImage(work.id.toString(), [
    work.image.recommendedImageUrl,
    work.image.facebookOgImageUrl,
    work.image.twitterNormalAvatarUrl,
    work.image.twitterAvatarUrl,
  ])

  return (
    <CarouselItem key={work.id} className="group shrink-0 basis-1/2 md:basis-1/3">
      <WorkHoverCard
        work={{
          id: work.id,
          title: work.title,
          media_text: MEDIA_TEXT[work.media],
          season_name_text:
            work.seasonName !== null && work.seasonYear !== null
              ? `${work.seasonYear}年${SEASON_TEXT[work.seasonName]}`
              : undefined,
          images: [validThumbnail ?? ''],
          episodes_count: work.episodesCount,
          watchers_count: work.watchersCount,
          reviews_count: work.reviewsCount,
        }}
      >
        <Link href={`/works/${work.id}`} className="flex flex-col gap-y-2">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
            <Image
              src={validThumbnail}
              alt={work.title}
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  <ImageOffIcon size={48} />
                </div>
              }
              height={144}
              width={256}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div className="flex gap-x-2">
            <Badge className="h-fit break-keep">{MEDIA_TEXT[work.media]}</Badge>
            <h3 className="line-clamp-2 w-full shrink text-sm transition-colors group-hover:text-anicotto-accent">
              {work.title}
            </h3>
          </div>
        </Link>
      </WorkHoverCard>
    </CarouselItem>
  )
}
