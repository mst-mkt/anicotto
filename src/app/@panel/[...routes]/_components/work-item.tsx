import { ImageOffIcon, PenToolIcon } from 'lucide-react'
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
      <div className="group relative">
        <Link
          href={`/works/${work.id}`}
          className="flex items-center rounded-md transition-colors hover:bg-muted group-hover:pr-12"
        >
          <div className="aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-md">
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
          <div className="px-3 py-2">
            <h3 className="line-clamp-2 text-xs">{work.title}</h3>
          </div>
        </Link>
        <Link
          href={`/track/${work.id}`}
          className="absolute top-2 right-2 hidden aspect-square h-10 items-center justify-center rounded-md border border-background-300 bg-background transition-colors hover:bg-muted group-hover:flex"
        >
          <PenToolIcon size={16} className="text-muted-foreground" />
        </Link>
      </div>
    </WorkHoverCard>
  )
}
