import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../../../components/ui/badge'
import { CarouselItem } from '../../../../../../components/ui/carousel'
import type { WorkSeries } from '../../../../../actions/api/get/series'

type SeriesCarouselItemProps = {
  work: WorkSeries[number]['works'][number]
}

export const SeriesCarouselItem: FC<SeriesCarouselItemProps> = async ({ work }) => (
  <CarouselItem key={work.id} className="group shrink-0 basis-1/2 md:basis-1/3">
    <WorkHoverCard work={work}>
      <Link href={`/works/${work.id}`} className="flex flex-col gap-y-2">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
          <Image
            src={work.thumbnail}
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
          <Badge className="h-fit break-keep">{work.media_text}</Badge>
          <h3 className="line-clamp-2 w-full shrink text-sm transition-colors group-hover:text-anicotto-accent">
            {work.title}
          </h3>
        </div>
      </Link>
    </WorkHoverCard>
  </CarouselItem>
)
