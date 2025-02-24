import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../../components/hover-card/work'
import { Image } from '../../../../../components/shared/image'
import { Badge } from '../../../../../components/ui/badge'
import { getValidWorkImage } from '../../../../../lib/images/valid-url'
import type { Work } from '../../../../../schemas/annict/works'

type WorkCardProps = {
  work: Work
}

export const WorkCard: FC<WorkCardProps> = async ({ work }) => {
  const image = await getValidWorkImage(work.id.toString(), work.images)

  return (
    <WorkHoverCard work={work}>
      <Link
        href={`/works/${work.id}`}
        className="group flex items-center rounded-lg border border-muted p-2 shadow-xs transition-colors hover:bg-muted"
      >
        <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={work.title}
            height={128}
            width={128}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <ImageOffIcon className="text-muted-foreground" size={24} />
              </div>
            }
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 p-4">
          <h2 className="line-clamp-2 font-bold text-base transition-colors group-hover:text-anicotto-accent md:text-lg">
            {work.title}
          </h2>
          <div className="flex gap-x-2">
            <Badge>{work.media_text}</Badge>
            {work.season_name_text !== undefined && work.season_name_text !== '' && (
              <Badge>{work.season_name_text}</Badge>
            )}
          </div>
        </div>
      </Link>
    </WorkHoverCard>
  )
}
