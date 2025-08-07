'use client'

import { ImageOffIcon, TriangleAlertIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { Image } from '../../../../../components/shared/image'
import { AspectRatio } from '../../../../../components/ui/aspect-ratio'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select'
import type { LibraryWithEpisodes } from '../../../../actions/api/get/libraries'

type WorkSelectProps = {
  selected: string
  libraries: LibraryWithEpisodes[] | null
}

export const WorkSelect: FC<WorkSelectProps> = ({ selected, libraries }) => {
  const router = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/track/${value}`)
  }

  if (libraries === null) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon className="text-anicotto-accent" size={24} />
        <p>エピソード情報の取得に失敗しました</p>
      </div>
    )
  }

  if (libraries.filter((lib) => lib.next_episode !== null).length === 0) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon className="text-anicotto-accent" size={24} />
        <p>視聴中の作品がありません</p>
      </div>
    )
  }

  return (
    <Select defaultValue={selected} name="episode_id" onValueChange={handleSelect}>
      <SelectTrigger className="h-fit w-full cursor-pointer pl-2 *:block *:h-fit *:min-h-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="[:has(>&)]:!max-w-[92svw] [:has(>&)]:!w-125 [:has(>&)]:!min-w-[40svw] w-full">
        {libraries
          .filter((lib) => lib.next_episode !== null)
          .map((lib) => (
            <SelectItem
              className="[&>:last-child]:min-w-0"
              key={lib.work.id}
              value={lib.work.id.toString()}
            >
              <div className="flex min-w-0 cursor-pointer items-center gap-x-4 pr-4 text-left">
                <div className="h-16 w-16 min-w-0 shrink-0 overflow-hidden rounded-md">
                  <AspectRatio ratio={1}>
                    <Image
                      alt={lib.work.title}
                      className="h-full w-full object-cover"
                      fallback={
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-muted text-muted-foreground">
                          <ImageOffIcon size={24} />
                        </div>
                      }
                      height={128}
                      src={lib.work.thumbnail}
                      width={128}
                    />
                  </AspectRatio>
                </div>
                <div className="flex min-w-0 flex-col gap-y-1">
                  <h3 className="min-w-0 truncate font-bold">{lib.work.title}</h3>
                  <p className="overflow-hidden break-keep text-muted-foreground">
                    全{lib.work.episodes.length}話
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
