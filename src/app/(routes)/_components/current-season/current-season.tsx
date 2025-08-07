import { CloudAlertIcon, EyeIcon, ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import { WorkHoverCard } from '../../../../components/hover-card/work/card'
import { Image } from '../../../../components/shared/image'
import { AspectRatio } from '../../../../components/ui/aspect-ratio'
import { Carousel, CarouselContent, CarouselItem } from '../../../../components/ui/carousel'
import { Skeleton } from '../../../../components/ui/skeleton'
import { getCurrentSeasonWorks } from '../../../actions/api/get/works'

export const CurrentSeasonWork = async () => {
  const works = await getCurrentSeasonWorks()

  if (works === null) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
        <CloudAlertIcon className="text-muted-foreground" size={40} />
        <p>作品情報が取得できませんでした</p>
      </div>
    )
  }

  return (
    <Carousel opts={{ autoplay: true, wheel: true }}>
      <CarouselContent>
        {works.data.map((work) => (
          <CarouselItem className="basis-1/2 md:basis-1/3" key={work.id}>
            <WorkHoverCard work={work}>
              <Link className="group flex flex-col gap-y-2" href={`/works/${work.id}`}>
                <AspectRatio className="overflow-hidden rounded-md" ratio={16 / 9}>
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
                <div className="flex w-full flex-col gap-y-2">
                  <h3 className="line-clamp-1 font-bold transition-colors group-hover:text-anicotto-accent-600 md:line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="flex items-center gap-x-2 text-muted-foreground text-sm">
                    <EyeIcon size={16} />
                    <span>{work.watchers_count}人が視聴中</span>
                  </p>
                </div>
              </Link>
            </WorkHoverCard>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export const CurrentSeasonWorkSkeleton = () => (
  <div className="flex gap-x-4">
    {[...Array(3)].map((_, index) => (
      <div
        className="flex basis-1/2 flex-col gap-y-2 last:hidden md:basis-1/3 md:last:flex"
        key={index}
      >
        <Skeleton className="aspect-video" />
        <Skeleton className="h-[1lh] w-full" />
        <Skeleton className="h-[1lh] w-1/2 text-sm" />
        <div className="-mt-2 hidden h-[1lh] w-full md:block" />
      </div>
    ))}
  </div>
)
