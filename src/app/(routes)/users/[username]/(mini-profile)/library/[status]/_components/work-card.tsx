import { ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Image } from '../../../../../../../../components/shared/image'
import { Badge } from '../../../../../../../../components/ui/badge'
import { MEDIA_TEXT } from '../../../../../../../../constants/media'
import { SEASON_TEXT } from '../../../../../../../../constants/season'
import type { Library } from '../get-library'

type WorkCardProps = {
  work: Library[number]['work']
}

export const WorkCard: FC<WorkCardProps> = async ({ work }) => (
  <Link
    href={`/works/${work.id}`}
    className="group flex items-center rounded-lg border border-muted p-2 shadow-xs transition-colors hover:bg-muted"
  >
    <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
      <Image
        src={work.image}
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
        <Badge>{MEDIA_TEXT[work.media]}</Badge>
        {work.seasonYear !== null && work.seasonName !== null && (
          <Badge>
            {work.seasonYear}年{SEASON_TEXT[work.seasonName]}
          </Badge>
        )}
      </div>
    </div>
  </Link>
)
