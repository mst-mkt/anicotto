import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LibraryBigIcon,
  MessageCircleHeartIcon,
  PenToolIcon,
  StarHalfIcon,
  StarIcon,
  StarsIcon,
  ThumbsDownIcon,
} from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { RatingBadge } from '../../../../../../../components/badge/rating'
import { UserHoverCard } from '../../../../../../../components/hover-card/user/card'
import { Markdown } from '../../../../../../../components/shared/markdown'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../../components/ui/avatar'
import { Button } from '../../../../../../../components/ui/button'
import { Separator } from '../../../../../../../components/ui/separator'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../../../components/ui/tooltip'
import type { Episode } from '../../../../../../../schemas/annict/episodes'
import type { Work } from '../../../../../../../schemas/annict/works'
import { timeText } from '../../../../../../../utils/time-text'
import { getEpisodeWithInfo } from '../../../../../../actions/api/get/episodes'
import { getEpisodeRecords } from '../../../../../../actions/api/get/records'
import { RecordForm } from './record-form'

type EpisodeInfoProps = {
  workId: Work['id']
  episodeId: Episode['id']
}

export const EpisodeInfo: FC<EpisodeInfoProps> = async ({ workId, episodeId }) => {
  const episode = await getEpisodeWithInfo(episodeId)

  if (episode === null) {
    notFound()
  }

  if (episode.work.id !== workId) {
    redirect(`/works/${episode.work.id}/episodes/${episode.id}`)
  }

  const records = await getEpisodeRecords(episodeId)

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <p className="shrink-0 break-keep font-bold text-muted-foreground">
            {episode.numberText}
          </p>
          <Separator className="shrink" />
          {episode.prevEpisode !== null && (
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-fit w-fit rounded-full p-2"
                  asChild={true}
                >
                  <Link href={`/works/${episode.work.id}/episodes/${episode.prevEpisode.id}`}>
                    <ChevronLeftIcon size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{episode.prevEpisode.numberText}</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                className="h-fit w-fit rounded-full p-2"
                asChild={true}
              >
                <Link href={`/works/${episode.work.id}`}>
                  <LibraryBigIcon size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>作品ページ</TooltipContent>
          </Tooltip>
          {episode.nextEpisode !== null && (
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-fit w-fit rounded-full p-2"
                  asChild={true}
                >
                  <Link href={`/works/${episode.work.id}/episodes/${episode.nextEpisode.id}`}>
                    <ChevronRightIcon size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{episode.nextEpisode.numberText}</TooltipContent>
            </Tooltip>
          )}
        </div>
        <h1 className="font-bold text-xl">{episode.title}</h1>
      </div>
      <div className="flex gap-x-6">
        {episode.satisfactionRate !== null && (
          <div className="flex items-center gap-x-2 text-sm">
            {match(episode.satisfactionRate)
              .with(100, () => <StarsIcon size={20} className="text-anicotto-accent" />)
              .when(
                (rate) => rate >= 80,
                () => <StarIcon size={20} className="text-anicotto-accent" />,
              )
              .when(
                (rate) => rate >= 60,
                () => <StarHalfIcon size={20} className="text-anicotto-accent" />,
              )
              .otherwise(() => (
                <ThumbsDownIcon size={20} className="text-anicotto-accent" />
              ))}
            <span>満足度</span>
            <b>{episode.satisfactionRate}</b>
          </div>
        )}
        <div className="flex items-center gap-x-2 text-sm">
          <PenToolIcon size={20} className="text-anicotto-accent" />
          <span>記録</span>
          <b>{episode.recordsCount}</b>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <MessageCircleHeartIcon size={20} className="text-anicotto-accent" />
          <span>感想</span>
          <b>{episode.recordCommentsCount}</b>
        </div>
      </div>
      <RecordForm episodeId={episode.id} tracked={episode.viewerDidTrack} />
      <div className="flex flex-col gap-y-8">
        {records?.data.map((record) => (
          <div key={record.id} className="flex gap-x-4">
            <UserHoverCard user={record.user}>
              <Link href={`/users/${record.user.username}`} className="sticky top-20 h-fit">
                <Avatar className="h-10 w-10">
                  {record.user.avatar_url !== null && (
                    <AvatarImage
                      src={record.user.avatar_url}
                      alt={`${record.user.username}のアバター`}
                    />
                  )}
                  <AvatarFallback>{record.user.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </Link>
            </UserHoverCard>
            <div className="flex w-full min-w-0 flex-col gap-y-2">
              <header className="flex h-8 items-center justify-between gap-x-4">
                <UserHoverCard user={record.user}>
                  <Link
                    href={`/users/${record.user.username}`}
                    className="flex min-w-0 items-center gap-x-2 truncate"
                  >
                    <span className="min-w-0 truncate font-bold">{record.user.name}</span>
                    <span className="min-w-0 shrink-0 text-muted-foreground">
                      @{record.user.username}
                    </span>
                  </Link>
                </UserHoverCard>
                <time
                  dateTime={record.created_at}
                  className="shrink-0 break-keep text-muted-foreground text-sm"
                >
                  {timeText(record.created_at)}
                </time>
              </header>
              {record.comment !== null && <Markdown>{record.comment}</Markdown>}
              {record.rating_state !== null && <RatingBadge rating={record.rating_state} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const EpisodeInfoSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex flex-col gap-y-4">
      <div className="flex h-8.5 items-center gap-x-2">
        <Skeleton className="h-[1lh] w-1/4" />
        <Separator className="shrink" />
      </div>
      <Skeleton className="h-[1lh] w-1/2 text-xl" />
    </div>
    <div className="flex gap-x-6">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-24" />
    </div>
    <RecordForm />
    <div className="h-64 w-full" />
  </div>
)
