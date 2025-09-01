'use client'

import type { HoverCardContentProps } from '@radix-ui/react-hover-card'
import { ClapperboardIcon, EyeIcon, ImageOffIcon, MessageCircleHeartIcon } from 'lucide-react'
import Link from 'next/link'
import { type FC, type ReactNode, useState } from 'react'
import type { ActivityWithThumbnail } from '../../../app/actions/api/get/activities'
import type { Library } from '../../../app/actions/api/get/libraries'
import type { UserRecord } from '../../../app/actions/api/get/records'
import { getWorkStatus, type WorkWithThumbnail } from '../../../app/actions/api/get/works'
import type { Status } from '../../../schemas/annict/common'
import { Image } from '../../shared/image'
import { AspectRatio } from '../../ui/aspect-ratio'
import { Badge } from '../../ui/badge'
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from '../../ui/hover-card'
import { StatusSelect, StatusSelectSkeleton } from './status-select'

type WorkHoverCardProps = {
  work: WorkWithThumbnail | UserRecord['work'] | ActivityWithThumbnail['work'] | Library['work']
  side?: HoverCardContentProps['side']
  children: ReactNode
}

export const WorkHoverCard: FC<WorkHoverCardProps> = ({ work, side, children }) => {
  const [workStatus, setWorkStatus] = useState<Status | null>(null)

  const handleOpenChange = async (open: boolean) => {
    if (!open || workStatus !== null) return

    const status = await getWorkStatus(work.id)
    setWorkStatus(status)
  }

  return (
    <HoverCard closeDelay={100} openDelay={100} onOpenChange={handleOpenChange}>
      <HoverCardTrigger asChild={true}>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          align="start"
          className="flex w-64 flex-col gap-y-3 rounded-lg"
          side={side}
          sideOffset={16}
        >
          <AspectRatio className="w-full overflow-hidden rounded-md" ratio={16 / 9}>
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
          <Link
            className="line-clamp-2 font-bold transition-colors hover:text-anicotto-accent"
            href={`/works/${work.id}`}
          >
            {work.title}
          </Link>
          <div className="flex gap-x-1">
            {<Badge>{work.media_text}</Badge>}
            {work.season_name_text !== undefined && <Badge>{work.season_name_text}</Badge>}
          </div>
          <div className="flex gap-x-2 text-muted-foreground text-sm">
            <Link
              className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
              href={`/works/${work.id}`}
            >
              <ClapperboardIcon size={16} />
              {work.episodes_count}話
            </Link>
            <Link
              className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
              href={`/works/${work.id}`}
            >
              <EyeIcon size={16} />
              {work.watchers_count}
            </Link>
            <Link
              className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
              href={`/works/${work.id}/reviews`}
            >
              <MessageCircleHeartIcon size={16} />
              {work.reviews_count}
            </Link>
          </div>
          {workStatus === null ? (
            <StatusSelectSkeleton />
          ) : (
            <StatusSelect status={workStatus} id={work.id} title={work.title} />
          )}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
