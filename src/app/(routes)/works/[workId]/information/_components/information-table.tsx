import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { Image } from '../../../../../../components/shared/image'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../../../../components/ui/table'
import { proxiedImage } from '../../../../../../lib/images/proxy'
import type { Work } from '../../../../../../schemas/annict/works'
import { isWithProtocol } from '../../../../../../utils/route-type'
import { getWork } from '../../../../../actions/api/get/works'

type InformationTableProps = {
  workId: Work['id']
}

export const InformationTable: FC<InformationTableProps> = async ({ workId }) => {
  const work = await getWork(workId)

  if (work === null) {
    notFound()
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className="break-keep">ID</TableHead>
          <TableCell className="break-all">{work.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">タイトル</TableHead>
          <TableCell className="break-all">{work.title}</TableCell>
        </TableRow>
        {work.title_kana !== '' && (
          <TableRow>
            <TableHead className="break-keep">タイトル (かな)</TableHead>
            <TableCell className="break-all">{work.title_kana}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className="break-keep">シーズン</TableHead>
          <TableCell className="break-all">{work.season_name_text}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">メディア</TableHead>
          <TableCell className="break-all">{work.media_text}</TableCell>
        </TableRow>
        {work.released_on !== '' && (
          <TableRow>
            <TableHead className="break-keep">リリース日</TableHead>
            <TableCell className="break-all">{work.released_on}</TableCell>
          </TableRow>
        )}
        {work.released_on_about !== '' && (
          <TableRow>
            <TableHead className="break-keep">リリース日 (未確定)</TableHead>
            <TableCell className="break-all">{work.released_on_about}</TableCell>
          </TableRow>
        )}
        {work.official_site_url !== '' && (
          <TableRow>
            <TableHead className="break-keep">公式サイト</TableHead>
            <TableCell className="break-all">
              {isWithProtocol(work.official_site_url) && (
                <Link
                  className="line-clamp-3 text-anicotto-accent"
                  href={work.official_site_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {work.official_site_url}
                </Link>
              )}
            </TableCell>
          </TableRow>
        )}
        {work.wikipedia_url !== '' && (
          <TableRow>
            <TableHead className="break-keep">Wikipedia</TableHead>
            <TableCell className="break-all">
              {isWithProtocol(work.wikipedia_url) && (
                <Link
                  className="line-clamp-3 text-anicotto-accent"
                  href={work.wikipedia_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {work.wikipedia_url}
                </Link>
              )}
            </TableCell>
          </TableRow>
        )}
        {work.twitter_username !== '' && (
          <TableRow>
            <TableHead className="break-keep">Twitter</TableHead>
            <TableCell className="break-all">
              <Link
                className="line-clamp-3 text-anicotto-accent"
                href={`https://twitter.com/${work.twitter_username}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                @{work.twitter_username}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.twitter_hashtag !== '' && (
          <TableRow>
            <TableHead className="break-keep">Twitter ハッシュタグ</TableHead>
            <TableCell className="break-all">
              <Link
                className="line-clamp-3 text-anicotto-accent"
                href={`https://twitter.com/hashtag/${work.twitter_hashtag}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                #{work.twitter_hashtag}
              </Link>
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className="break-keep">Annict公式ページ</TableHead>
          <TableCell className="break-all">
            <Link
              className="line-clamp-3 text-anicotto-accent"
              href={`https://annict.com/works/${work.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              https://annict.com/works/{work.id}
            </Link>
          </TableCell>
        </TableRow>
        {work.syobocal_tid !== '' && (
          <TableRow>
            <TableHead className="break-keep">しょぼいカレンダー</TableHead>
            <TableCell className="break-all">
              <Link
                className="line-clamp-3 text-anicotto-accent"
                href={`http://cal.syoboi.jp/tid/${work.syobocal_tid}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {work.syobocal_tid}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.mal_anime_id !== '' && (
          <TableRow>
            <TableHead className="break-keep">MyAnimeList</TableHead>
            <TableCell className="break-all">
              <Link
                className="line-clamp-3 text-anicotto-accent"
                href={`https://myanimelist.net/anime/${work.mal_anime_id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {work.mal_anime_id}
              </Link>
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className="break-keep">OGP画像</TableHead>
          <TableCell className="break-all">
            {work.images.facebook.og_image_url !== '' ? (
              <Image
                alt={`${work.title} のOGP画像`}
                className="max-h-32 max-w-full"
                fallback={<span className="text-muted-foreground">画像が見つかりません</span>}
                height={144}
                src={proxiedImage(work.images.facebook.og_image_url)}
                width={256}
              />
            ) : (
              <span className="text-muted-foreground">未設定</span>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">Twitter カード画像</TableHead>
          <TableCell className="break-all">
            {work.images.twitter.image_url !== '' ? (
              <Image
                alt={`${work.title} の Twitter カード画像`}
                className="max-h-32 max-w-full"
                fallback={<span className="text-muted-foreground">画像が見つかりません</span>}
                height={144}
                src={proxiedImage(work.images.twitter.image_url)}
                width={256}
              />
            ) : (
              <span className="text-muted-foreground">未設定</span>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">エピソード数</TableHead>
          <TableCell className="break-all">{work.episodes_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">視聴ユーザー数</TableHead>
          <TableCell className="break-all">{work.watchers_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">レビュー数</TableHead>
          <TableCell className="break-all">{work.reviews_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="break-keep">エピソードの有無</TableHead>
          <TableCell className="font-mono">{work.no_episodes ? 'false' : 'true'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export const InformationTableSkeleton = () => (
  <Table>
    <TableBody>
      {[...Array(15)].map((_, index) => (
        <TableRow key={index}>
          <TableHead className="break-keep">
            <Skeleton className="h-[1lh] w-32" />
          </TableHead>
          <TableCell>
            <Skeleton className="h-[1lh] w-64" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
