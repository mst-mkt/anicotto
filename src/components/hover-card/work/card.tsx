import type { HoverCardContentProps } from '@radix-ui/react-hover-card'
import { ClapperboardIcon, EyeIcon, ImageOffIcon, MessageCircleHeartIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import type { ActivityWithThumbnail } from '../../../app/actions/api/get/activities'
import type { Library } from '../../../app/actions/api/get/libraries'
import type { UserRecord } from '../../../app/actions/api/get/records'
import type { WorkWithThumbnail } from '../../../app/actions/api/get/works'
import { Image } from '../../shared/image'
import { AspectRatio } from '../../ui/aspect-ratio'
import { Badge } from '../../ui/badge'
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from '../../ui/hover-card'

type WorkHoverCardProps = {
  work: WorkWithThumbnail | UserRecord['work'] | ActivityWithThumbnail['work'] | Library['work']
  side?: HoverCardContentProps['side']
  children: ReactNode
}

export const WorkHoverCard: FC<WorkHoverCardProps> = ({ work, side, children }) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger asChild={true}>{children}</HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        align="start"
        side={side}
        sideOffset={16}
        className="flex w-64 flex-col gap-y-3 rounded-lg"
      >
        <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-md">
          <Image
            src={work.thumbnail}
            alt={work.title}
            height={144}
            width={256}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={40} />
              </div>
            }
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <Link
          href={`/works/${work.id}`}
          className="line-clamp-2 font-bold transition-colors hover:text-anicotto-accent"
        >
          {work.title}
        </Link>
        <div className="flex gap-x-1">
          {<Badge>{work.media_text}</Badge>}
          {work.season_name_text !== undefined && <Badge>{work.season_name_text}</Badge>}
        </div>
        <div className="flex gap-x-2 text-muted-foreground text-sm">
          <Link
            href={`/works/${work.id}`}
            className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
          >
            <ClapperboardIcon size={16} />
            {work.episodes_count}話
          </Link>
          <Link
            href={`/works/${work.id}`}
            className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
          >
            <EyeIcon size={16} />
            {work.watchers_count}
          </Link>
          <Link
            href={`/works/${work.id}/reviews`}
            className="flex items-center gap-x-1 transition-colors hover:text-anicotto-accent"
          >
            <MessageCircleHeartIcon size={16} />
            {work.reviews_count}
          </Link>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCard>
)
