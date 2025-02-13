import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Image } from '../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../../../components/ui/badge'
import { CarouselItem } from '../../../../../../components/ui/carousel'
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
    <CarouselItem
      key={work.id}
      className="group flex shrink-0 basis-1/2 flex-col gap-y-2 md:basis-1/3"
    >
      <Link href={`/works/${work.id}`} className="contents">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
          <Image
            src={validThumbnail}
            alt={work.title}
            fill={true}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={48} />
              </div>
            }
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="flex gap-x-2">
          <Badge className="h-fit break-keep">
            {match(work.media)
              .with('TV', () => 'TV')
              .with('OVA', () => 'OVA')
              .with('MOVIE', () => '映画')
              .with('WEB', () => 'Web')
              .with('OTHER', () => 'その他')
              .exhaustive()}
          </Badge>
          <h3 className="line-clamp-2 w-full shrink text-sm transition-colors group-hover:text-anicotto-accent">
            {work.title}
          </h3>
        </div>
      </Link>
    </CarouselItem>
  )
}
