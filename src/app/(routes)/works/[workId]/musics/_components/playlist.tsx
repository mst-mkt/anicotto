import { AlertCircleIcon, CloudAlertIcon } from 'lucide-react'
import type { FC } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../../../../../../components/ui/alert'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import { spotifyApiClient } from '../../../../../../lib/api/spotify/client'
import type { Work } from '../../../../../../schemas/annict/works'
import { getWork } from '../../../../../actions/api/get/works'

type PlaylistProps = {
  workId: Work['id']
}

export const Playlist: FC<PlaylistProps> = async ({ workId }) => {
  const work = await getWork(workId)

  if (work === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 py-12">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <span className="text-muted-foreground">楽曲情報を取得できませんでした</span>
      </div>
    )
  }

  const {
    playlists: {
      items: [playlist],
    },
  } = await spotifyApiClient.search(work.title, ['playlist'], 'JP', 1)

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative h-88 w-full">
        <div className="absolute h-88 w-full animate-pulse rounded-xl bg-muted" />
        <iframe
          className="absolute"
          height="352"
          src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
          title={playlist.name}
          width="100%"
        />
      </div>
      <Alert>
        <AlertCircleIcon size={16} />
        <AlertTitle>Spotifyの検索結果に基づいてプレイリストを表示しています</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          異なる作品のプレイリストが表示される場合があります。 ご了承ください。
        </AlertDescription>
      </Alert>
    </div>
  )
}

export const PlaylistSkeleton = () => (
  <div className="flex flex-col gap-y-2">
    <Skeleton className="h-88 w-full rounded-xl" />
    <Alert>
      <AlertCircleIcon size={16} />
      <AlertTitle>Spotifyの検索結果に基づいてプレイリストを表示しています</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        異なる作品のプレイリストが表示されている場合があります。ご了承ください。
      </AlertDescription>
    </Alert>
  </div>
)
