import { CloudAlertIcon, ExternalLinkIcon, ImageOffIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Image } from '../../../../../../components/shared/image'
import { Badge } from '../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import { spotifyApiClient } from '../../../../../../lib/api/spotify/client'
import { proxiedImage } from '../../../../../../lib/images/proxy'
import type { Work } from '../../../../../../schemas/annict/works'
import { getWork } from '../../../../../actions/api/get/works'

type TracksProps = {
  workId: Work['id']
}

export const Tracks: FC<TracksProps> = async ({ workId }) => {
  const work = await getWork(workId)

  if (work === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 py-12">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <span className="text-muted-foreground">楽曲情報を取得できませんでした</span>
      </div>
    )
  }

  const {
    tracks: { items: tracks },
  } = await spotifyApiClient.search(work.title, ['track'], 'JP', 16)

  return (
    <div className="flex flex-col gap-y-1">
      {tracks.map((track) => (
        <Link
          key={track.id}
          href={track.external_urls.spotify}
          className="group flex items-center gap-x-4 p-2"
        >
          <div className="aspect-square h-18 w-18 shrink-0 grow-0 overflow-hidden rounded-md">
            <Image
              src={
                track.album.images[0].url !== undefined
                  ? proxiedImage(track.album.images[0].url)
                  : null
              }
              alt={track.album.name}
              height={64}
              width={64}
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-muted object-cover text-muted-foreground">
                  <ImageOffIcon size={24} />
                </div>
              }
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex min-w-0 grow flex-col justify-center gap-y-1 transition-colors">
            <h3 className="truncate font-bold group-hover:text-anicotto-accent">{track.name}</h3>
            <div className="flex h-[22px] flex-wrap gap-x-1 overflow-hidden">
              {track.artists.map((artist) => (
                <Badge key={artist.id} variant="outline" className="break-keep">
                  {artist.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="h-fit w-fit rounded-md p-2 transition-colors hover:bg-muted">
            <ExternalLinkIcon size={16} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export const TracksSkeleton = () => (
  <div className="flex flex-col gap-y-1">
    {[...Array(16)].map((_, index) => (
      <div key={index} className="group flex items-center gap-x-4 p-2">
        <Skeleton className="aspect-square h-18 w-18" />
        <div className="flex min-w-0 grow flex-col justify-center gap-y-1 transition-colors">
          <Skeleton className="h-[1lh] w-2/3" />
          <Skeleton className="h-[1lh] w-1/2 text-sm" />
        </div>
        <div className="h-fit w-fit rounded-md p-2 transition-colors hover:bg-muted">
          <ExternalLinkIcon size={16} />
        </div>
      </div>
    ))}
  </div>
)
