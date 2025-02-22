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
import type { Library } from '../get-libraries'
import { MultiTrackLink } from './link'

type WorkSelectProps = {
  libraries: Library[]
}

export const WorkSelect: FC<WorkSelectProps> = ({ libraries }) => {
  const [library, setLibrary] = useState(libraries.at(0))

  const handleSelect = useCallback(
    (value: string) => {
      const episode = Number.parseInt(value, 10)
      const library = libraries.find((lib) => lib.nextEpisode?.id === episode)
      setLibrary(library)
    },
    [libraries.find],
  )

  return (
    <>
      <Select
        name="episode_id"
        defaultValue={library?.nextEpisode?.id.toString()}
        onValueChange={handleSelect}
      >
        <SelectTrigger className="h-fit w-full cursor-pointer pl-2 [&>span]:block [&>span]:h-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-w-[92svw]">
          {libraries
            .filter((lib) => lib.nextEpisode !== null)
            .map((lib) => (
              <SelectItem
                key={lib.work.id}
                value={lib.nextEpisode?.id.toString() ?? ''}
                className="[&>:last-child]:min-w-0"
              >
                <div className="flex cursor-pointer items-center gap-x-4 pr-4 text-left">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
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
                    <h3 className="truncate font-bold">{lib.work.title}</h3>
                    <div className="flex w-full items-center gap-x-2 overflow-hidden break-keep">
                      <Badge variant="secondary">{lib.nextEpisode?.numberText}</Badge>
                      <span className="shrink truncate text-muted-foreground">
                        {lib.nextEpisode?.title}
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
