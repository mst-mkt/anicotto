import { ChevronRightIcon, CloudAlertIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { AspectRatio } from '../../../components/ui/aspect-ratio'
import { Button } from '../../../components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../../../components/ui/carousel'
import { Skeleton } from '../../../components/ui/skeleton'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { getCurrentSeason } from '../../../utils/get-season'
import { SeasonIcon } from './season-icon'

const getWorks = async () => {
  await auth()
  const works = await annictApiClient.getWorks(
    {
      query: { filter_season: getCurrentSeason(), sort_watchers_count: 'desc', per_page: 10 },
    },
    {
      next: { tags: ['works'] },
    },
  )

  if (works.isErr()) {
    console.error('[/] Failed to fetch works:', works.error)
    return null
  }

  return works.value.works
}

export const CurrentSeasonWork = async () => {
  const works = await getWorks()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-x-4">
        <h2 className="flex items-center gap-x-2 font-bold text-lg">
          <SeasonIcon season={getCurrentSeason()} size={24} className="text-anicotto-accent" />
          今季アニメ
        </h2>
        <Button variant="ghost" size="sm" asChild={true}>
          <Link href="/discover">
            もっと見る
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>
      {works === null ? (
        <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
          <CloudAlertIcon size={40} className="text-muted-foreground" />
          <p>作品情報が取得できませんでした</p>
        </div>
      ) : (
        <Carousel opts={{ autoplay: true, wheel: true }}>
          <CarouselContent>
            {works.map((work) => (
              <CarouselItem key={work.id} className="basis-1/2 md:basis-1/3">
                <Link href={`/works/${work.id}`} className="group flex flex-col gap-y-2">
                  <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
                    <img
                      src={work.images.facebook.og_image_url}
                      alt={work.title}
                      className="h-full w-full object-cover"
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  )
}

export const CurrentSeasonWorkSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    <div className="flex items-center justify-between gap-x-4">
      <h2 className="flex items-center gap-x-2 font-bold text-lg">
        <SeasonIcon season={getCurrentSeason()} size={24} className="text-anicotto-accent" />
        今季アニメ
      </h2>
      <Button variant="ghost" size="sm" asChild={true}>
        <Link href="/discover">
          もっと見る
          <ChevronRightIcon size={16} />
        </Link>
      </Button>
    </div>
    <div className="flex gap-x-4">
      {[...Array(3)].map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: this key is index of static array
        <div key={index} className="flex basis-1/2 flex-col gap-y-2 md:basis-1/3">
          <Skeleton className="aspect-video" />
          <Skeleton className="h-[1lh] w-3/4" />
          <Skeleton className="h-[1lh] w-1/2 text-sm" />
        </div>
      ))}
    </div>
  </div>
)
