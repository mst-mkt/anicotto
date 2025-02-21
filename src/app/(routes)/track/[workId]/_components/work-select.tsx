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
import type { Library } from '../get-libraries'

type WorkSelectProps = {
  selected: string
  libraries: Library[] | null
}

export const WorkSelect: FC<WorkSelectProps> = ({ selected, libraries }) => {
  const router = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/track/${value}`)
  }

  if (libraries === null) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon size={24} className="text-anicotto-accent" />
        <p>エピソード情報の取得に失敗しました</p>
      </div>
    )
  }

  if (libraries.filter((lib) => lib.nextEpisode !== null).length === 0) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon size={24} className="text-anicotto-accent" />
        <p>視聴中の作品がありません</p>
      </div>
    )
  }

  return (
    <Select name="episode_id" defaultValue={selected} onValueChange={handleSelect}>
      <SelectTrigger className="h-fit w-full cursor-pointer pl-2 *:block *:h-fit *:min-h-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="[:has(>&)]:!max-w-[92svw] [:has(>&)]:!w-125 [:has(>&)]:!min-w-[50svw] w-full">
        {libraries
          .filter((lib) => lib.nextEpisode !== null)
          .map((lib) => (
            <SelectItem
              key={lib.work.id}
              value={lib.work.id.toString()}
              className="[&>:last-child]:min-w-0"
            >
              <div className="flex min-w-0 cursor-pointer items-center gap-x-4 pr-4 text-left">
                <div className="h-16 w-16 min-w-0 shrink-0 overflow-hidden rounded-md">
                  <AspectRatio ratio={1}>
                    <Image
                      height={128}
                      width={128}
                      src={lib.work.image}
                      fallback={
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-muted text-muted-foreground">
                          <ImageOffIcon size={24} />
                        </div>
                      }
                      alt={lib.work.title}
                      className="h-full w-full object-cover"
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
