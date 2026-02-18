import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { WorkHoverCard } from '../../../../components/hover-card/work/card'
import { Image } from '../../../../components/shared/image'
import { Badge } from '../../../../components/ui/badge'
import type { WorkWithThumbnail } from '../../../actions/api/get/works'

type ActivityCardProps = {
  work: WorkWithThumbnail
  children: ReactNode
}

export const ActivityCard: FC<ActivityCardProps> = ({ work, children }) => (
  <div className="rounded-xl border border-muted flex flex-col">
    <div className="has-[+div>:nth-child(3)]:sticky flex flex-col top-16 z-20">
      <div className="flex items-center gap-x-4 bg-background rounded-xl p-3 pb-0">
        <div className="relative aspect-video h-20 md:h-27 shrink-0 grow-0 overflow-hidden rounded-md">
          <Image
            alt={work.title}
            className="h-full w-full object-cover"
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={40} />
              </div>
            }
            height={256}
            src={work.thumbnail}
            width={256}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <WorkHoverCard work={work}>
            <Link
              className="transition-colors hover:text-anicotto-accent"
              href={`/works/${work.id}`}
            >
              <h3 className="line-clamp-2 font-bold text-sm md:text-base">{work.title}</h3>
            </Link>
          </WorkHoverCard>
          <div className="flex gap-x-2">
            <Badge variant="secondary">{work.media_text}</Badge>
            {work.season_name_text !== undefined && work.season_name_text !== '' && (
              <Badge variant="secondary">{work.season_name_text}</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="h-3 w-full bg-gradient-to-b from-background to-transparent" />
    </div>
    <div className="flex flex-col gap-y-2 p-3 pt-0">{children}</div>
  </div>
)
