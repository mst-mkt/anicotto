'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '../../../../../../../components/ui/button'
import { useCarousel } from '../../../../../../../components/ui/carousel'
import { Separator } from '../../../../../../../components/ui/separator'
import {} from '../../../../../../../components/ui/tooltip'
import { STATUS_ICON, STATUS_TEXT } from '../../../../../../../constants/status'
import { useMediaQuery } from '../../../../../../../hooks/useMediaQuery'
import type { Status } from '../../../../../../../schemas/annict/common'

type LibraryCarouselTitleProps = {
  status: Exclude<Status, 'no_select'>
  itemCount: number
}

export const LibraryCarouselTitle: FC<LibraryCarouselTitleProps> = ({ status, itemCount }) => {
  const isMobile = useMediaQuery('(width < 48rem)')
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const Icon = STATUS_ICON[status]

  const basis = isMobile ? 2 : 3

  return (
    <div className="flex items-center justify-between gap-x-4">
      <h2 className="flex w-fit items-center gap-x-2 break-keep font-bold">
        <Icon className="text-anicotto-accent" size={24} />
        {STATUS_TEXT[status]}
      </h2>
      <Separator className="shrink" />
      {itemCount > basis && (
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className="h-8 w-8 cursor-pointer rounded-full"
          >
            <ChevronLeft size={32} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={!canScrollNext}
            onClick={scrollNext}
            className="h-8 w-8 cursor-pointer rounded-full"
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      )}
    </div>
  )
}

export const LibraryTitle: FC<Omit<LibraryCarouselTitleProps, 'itemCount'>> = ({ status }) => {
  const Icon = STATUS_ICON[status]

  return (
    <div className="flex items-center gap-x-4">
      <h2 className="flex w-fit items-center gap-x-2 break-keep font-bold">
        <Icon className="text-anicotto-accent" size={24} />
        {STATUS_TEXT[status]}
      </h2>
      <Separator className="shrink" />
    </div>
  )
}
