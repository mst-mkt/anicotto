import Link from 'next/link'
import type { FC } from 'react'
import { Badge } from '../../../../../components/ui/badge'
import type { Work } from '../../../../../schemas/annict/works'
import { getWorkAllEpisodes } from '../../../../actions/api/get/episodes'
import { CollapseList } from './collapse-list'

type EpisodesProps = {
  workId: Work['id']
}

export const Episodes: FC<EpisodesProps> = async ({ workId }) => {
  const episodes = await getWorkAllEpisodes(workId)

  if (episodes === null || episodes.length === 0) return null

  return (
    <CollapseList className="flex flex-col gap-y-4" thumbnailCount={16}>
      {episodes.map((episode) => (
        <Link
          className="group relative"
          href={`/works/${workId}/episodes/${episode.id}`}
          key={episode.id}
        >
          <hgroup className="flex items-start gap-x-2">
            <Badge
              className="sticky top-20 h-fit shrink-0 transition-colors group-hover:bg-anicotto-accent-50"
              variant="outline"
            >
              {episode.number_text}
            </Badge>
            <h3 className="w-fit shrink group-hover:underline">
              {episode.title === null ? (
                <span className="text-muted-foreground">タイトル不明</span>
              ) : (
                episode.title
              )}
            </h3>
            <div className="shrink grow self-center">
              <div className="h-[1px] bg-muted" />
            </div>
          </hgroup>
        </Link>
      ))}
    </CollapseList>
  )
}
