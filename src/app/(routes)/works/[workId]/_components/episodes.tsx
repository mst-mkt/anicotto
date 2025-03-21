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
    <CollapseList thumbnailCount={16} className="flex flex-col gap-y-4">
      {episodes.map((episode) => (
        <Link
          key={episode.id}
          href={`/works/${workId}/episodes/${episode.id}`}
          className="group relative"
        >
          <hgroup className="flex items-start gap-x-2">
            <Badge
              variant="outline"
              className="sticky top-20 h-fit shrink-0 transition-colors group-hover:bg-anicotto-accent-50"
            >
              {episode.numberText}
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
