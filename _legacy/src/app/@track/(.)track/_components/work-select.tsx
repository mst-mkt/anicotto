'use client'

import { ImageOffIcon } from 'lucide-react'
import { type FC, useCallback, useState } from 'react'
import { Image } from '../../../../components/shared/image'
import { AspectRatio } from '../../../../components/ui/aspect-ratio'
import { Badge } from '../../../../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import type { Library } from '../../../actions/api/get/libraries'
import { MultiTrackLink } from './link'

type WorkSelectProps = {
  libraries: Library[]
}

export const WorkSelect: FC<WorkSelectProps> = ({ libraries }) => {
  const librariesHasNext = libraries.filter(
    (lib) => lib.next_episode !== null && !lib.next_episode.viewer_did_track,
  )
  const [library, setLibrary] = useState(librariesHasNext.at(0))

  const handleSelect = useCallback(
    (value: string) => {
      const episode = Number.parseInt(value, 10)
      const library = librariesHasNext.find((lib) => lib.next_episode?.id === episode)
      setLibrary(library)
    },
    [librariesHasNext.find],
  )

  return (
    <>
      <Select
        defaultValue={library?.next_episode?.id.toString()}
        name="episode_id"
        onValueChange={handleSelect}
      >
        <SelectTrigger className="h-fit w-full cursor-pointer pl-2 [&>span]:block [&>span]:h-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-w-[92svw]">
          {librariesHasNext.map((lib) => (
            <SelectItem
              className="[&>:last-child]:min-w-0"
              key={lib.work.id}
              value={lib.next_episode?.id.toString() ?? ''}
            >
              <div className="flex cursor-pointer items-center gap-x-4 pr-4 text-left">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
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
                  <h3 className="truncate font-bold">{lib.work.title}</h3>
                  <div className="flex w-full items-center gap-x-2 overflow-hidden break-keep">
                    <Badge className="shrink-0 break-keep" variant="secondary">
                      {lib.next_episode?.number_text}
                    </Badge>
                    <span className="shrink truncate text-muted-foreground">
                      {lib.next_episode?.title}
                    </span>
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {library !== undefined && <MultiTrackLink workId={library.work.id} />}
    </>
  )
}
