import { ImageOffIcon, TriangleAlertIcon } from 'lucide-react'
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
import { Skeleton } from '../../../../components/ui/skeleton'
import { getLibraries } from '../get-libraries'

export const WorkSelect = async () => {
  const libraries = await getLibraries()

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
    <Select name="episode_id" defaultValue={libraries[0].nextEpisode?.id.toString() ?? ''}>
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
                      fill={true}
                      src={lib.work.image}
                      fallback={
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-muted text-muted-foreground">
                          <ImageOffIcon size={24} />
                        </div>
                      }
                      alt={lib.work.title}
                      className="object-cover"
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
  )
}

export const WorkSelectSkeleton = () => (
  <div className="flex items-center gap-x-4 rounded-md border border-muted p-2">
    <Skeleton className="h-16 w-16" />
    <div className="flex flex-col gap-y-1">
      <Skeleton className="h-[1lh] w-20" />
      <Skeleton className="h-[1lh] w-32" />
    </div>
  </div>
)
