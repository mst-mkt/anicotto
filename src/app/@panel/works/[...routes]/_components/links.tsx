import {
  CalendarIcon,
  EarthIcon,
  HashIcon,
  Paintbrush2Icon,
  ScrollTextIcon,
  TwitterIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { Work } from '../../../../../schemas/annict/works'
import { getWork } from '../../../../actions/api/get/works'
import { LinkItem } from './link-item'

type LinksProps = {
  workId: Work['id']
}

export const Links: FC<LinksProps> = async ({ workId }) => {
  const work = await getWork(workId)

  if (work === null) return null

  return (
    <div className="flex flex-col gap-y-2">
      {work.official_site_url !== '' && (
        <LinkItem href={work.official_site_url} icon={EarthIcon}>
          公式サイト
        </LinkItem>
      )}
      {work.twitter_username !== '' && (
        <LinkItem href={`https://twitter.com/${work.twitter_username}`} icon={TwitterIcon}>
          Twitter 公式アカウント
        </LinkItem>
      )}
      {work.twitter_hashtag !== '' && (
        <LinkItem href={`https://twitter.com/hashtag/${work.twitter_hashtag}`} icon={HashIcon}>
          関連ツイート
        </LinkItem>
      )}
      {work.wikipedia_url !== '' && (
        <LinkItem href={work.wikipedia_url} icon={EarthIcon}>
          Wikipedia
        </LinkItem>
      )}
      {work.syobocal_tid !== '' && (
        <LinkItem href={`https://cal.syoboi.jp/tid/${work.syobocal_tid}`} icon={CalendarIcon}>
          しょぼいカレンダー
        </LinkItem>
      )}
      {work.mal_anime_id !== '' && (
        <LinkItem href={`https://myanimelist.net/anime/${work.mal_anime_id}`} icon={ScrollTextIcon}>
          MyAnimeList
        </LinkItem>
      )}
      {work.twitter_hashtag !== '' && (
        <LinkItem
          href={`https://www.pixiv.net/tags/${work.twitter_hashtag}`}
          icon={Paintbrush2Icon}
        >
          <HashIcon className="text-muted-foreground" size={16} />
          {work.twitter_hashtag} のイラスト
        </LinkItem>
      )}
    </div>
  )
}

export const LinksSkeleton = () => (
  <div className="flex flex-col gap-y-2">
    {[...Array(6)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
      <Skeleton className="h-11 w-full" key={index} />
    ))}
  </div>
)
