import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../../../../components/hover-card/work/card'
import { Image } from '../../../../../../../../components/shared/image'
import { Badge } from '../../../../../../../../components/ui/badge'
import type { Library } from '../../../../../../../actions/api/get/libraries'

type WorkCardProps = {
  work: Library['work']
}

export const WorkCard: FC<WorkCardProps> = async ({ work }) => (
  <WorkHoverCard work={work}>
    <Link
      className="group flex items-center rounded-lg border border-muted p-2 shadow-xs transition-colors hover:bg-muted"
      href={`/works/${work.id}`}
    >
      <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          alt={work.title}
          className="h-full w-full object-cover"
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageOffIcon className="text-muted-foreground" size={24} />
            </div>
          }
          height={128}
          src={work.thumbnail}
          width={128}
        />
      </div>
      <div className="flex flex-col gap-y-1 p-4">
        <h2 className="line-clamp-2 font-bold text-base transition-colors group-hover:text-anicotto-accent md:text-lg">
          {work.title}
        </h2>
        <div className="flex gap-x-2">
          <Badge>{work.media_text}</Badge>
          {work.season_name_text !== null && <Badge>{work.season_name_text}</Badge>}
        </div>
      </div>
    </Link>
  </WorkHoverCard>
)
