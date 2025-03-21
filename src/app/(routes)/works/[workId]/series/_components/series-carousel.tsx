import { RatIcon } from 'lucide-react'
import type { FC } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../../../../../components/ui/carousel'
import type { Work } from '../../../../../../schemas/annict/works'
import { getWorkSeries } from '../../../../../actions/api/get/series'
import { SeriesCarouselItem } from './series-carousel-item'

type SeriesCarouselsProps = {
  workId: Work['id']
}

export const SeriesCarousels: FC<SeriesCarouselsProps> = async ({ workId }) => {
  const series = await getWorkSeries(workId)

  if (series === null || series.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 p-16">
        <RatIcon size={48} className="text-anicotto-accent" />
        <span className="font-bold text-muted-foreground">関連作品がありません</span>
      </div>
    )
  }

  return series.map((series) => (
    <div key={series.id} className="contents">
      <hgroup className="flex items-center gap-x-2">
        <h2 className="font-bold text-lg">{series.name}</h2>
        <span className="font-bold text-muted-foreground">シリーズ</span>
      </hgroup>
      <Carousel opts={{ wheel: true }} className="flex flex-col gap-y-8">
        <CarouselPrevious className="top-3/7 hidden cursor-pointer md:flex" />
        <CarouselNext className="top-3/7 hidden cursor-pointer md:flex" />
        <CarouselContent>
          {series.works.map(async (work) => (
            <SeriesCarouselItem key={work.id} work={work} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ))
}
