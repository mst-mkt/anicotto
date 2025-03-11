import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkHoverCard } from '../../../../components/hover-card/work/card'
import { Image } from '../../../../components/shared/image'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { WorkWithStatus } from '../../../../schemas/annict/works'

export const WorkItem: FC<WorkWithStatus> = async (work) => {
  const image = await getValidWorkImage(work.id.toString(), work.images)

  return (
    <WorkHoverCard work={work} side="left">
      <Link
        href={`/works/${work.id}`}
        className="flex items-center rounded-md transition-colors hover:bg-muted"
      >
        <div className="aspect-square h-12 w-12 shrink-0 overflow-hidden rounded-md">
          <Image
            width={128}
            height={128}
            src={image}
            alt={work.title}
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOffIcon size={20} />
              </div>
            }
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="line-clamp-2 text-xs">{work.title}</h3>
        </div>
      </Link>
    </WorkHoverCard>
  )
}
