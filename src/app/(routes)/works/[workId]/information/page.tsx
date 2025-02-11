import Link from 'next/link'
import type { FC } from 'react'
import { Image } from '../../../../../components/shared/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../../../components/ui/table'
import { proxiedImage } from '../../../../../lib/image-proxy'
import { getWork } from '../get-work'

type WorkInformationPageProps = {
  params: Promise<{
    workId: string
  }>
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: no complexity, just switching between displays
const WorkInformationPage: FC<WorkInformationPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  const work = await getWork(workId)
  if (work === null) return null

  const headClassName = 'break-keep'
  const cellClassName = 'break-all'
  const linkClassName = 'text-anicotto-accent line-clamp-3'

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className={headClassName}>ID</TableHead>
          <TableCell className={cellClassName}>{work.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>タイトル</TableHead>
          <TableCell className={cellClassName}>{work.title}</TableCell>
        </TableRow>
        {work.title_kana !== '' && (
          <TableRow>
            <TableHead className={headClassName}>タイトル (かな)</TableHead>
            <TableCell className={cellClassName}>{work.title_kana}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className={headClassName}>シーズン</TableHead>
          <TableCell className={cellClassName}>{work.season_name_text}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>メディア</TableHead>
          <TableCell className={cellClassName}>{work.media_text}</TableCell>
        </TableRow>
        {work.released_on !== '' && (
          <TableRow>
            <TableHead className={headClassName}>リリース日</TableHead>
            <TableCell className={cellClassName}>{work.released_on}</TableCell>
          </TableRow>
        )}
        {work.released_on_about !== '' && (
          <TableRow>
            <TableHead className={headClassName}>リリース日 (未確定)</TableHead>
            <TableCell className={cellClassName}>{work.released_on_about}</TableCell>
          </TableRow>
        )}
        {work.official_site_url !== '' && (
          <TableRow>
            <TableHead className={headClassName}>公式サイト</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={work.official_site_url}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                {work.official_site_url}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.wikipedia_url !== '' && (
          <TableRow>
            <TableHead className={headClassName}>Wikipedia</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={work.wikipedia_url}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                {work.wikipedia_url}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.twitter_username !== '' && (
          <TableRow>
            <TableHead className={headClassName}>Twitter</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={`https://twitter.com/${work.twitter_username}`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                @{work.twitter_username}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.twitter_hashtag !== '' && (
          <TableRow>
            <TableHead className={headClassName}>Twitter ハッシュタグ</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={`https://twitter.com/hashtag/${work.twitter_hashtag}`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                #{work.twitter_hashtag}
              </Link>
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className={headClassName}>Annict公式ページ</TableHead>
          <TableCell className={cellClassName}>
            <Link
              href={`https://annict.com/works/${work.id}`}
              rel="noopener noreferrer"
              target="_blank"
              className={linkClassName}
            >
              https://annict.com/works/{work.id}
            </Link>
          </TableCell>
        </TableRow>
        {work.syobocal_tid !== '' && (
          <TableRow>
            <TableHead className={headClassName}>しょぼいカレンダー</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={`http://cal.syoboi.jp/tid/${work.syobocal_tid}`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                {work.syobocal_tid}
              </Link>
            </TableCell>
          </TableRow>
        )}
        {work.mal_anime_id !== '' && (
          <TableRow>
            <TableHead className={headClassName}>MyAnimeList</TableHead>
            <TableCell className={cellClassName}>
              <Link
                href={`https://myanimelist.net/anime/${work.mal_anime_id}`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
              >
                {work.mal_anime_id}
              </Link>
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className={headClassName}>OGP画像</TableHead>
          <TableCell className={cellClassName}>
            {work.images.facebook.og_image_url !== '' ? (
              <Image
                src={proxiedImage(work.images.facebook.og_image_url)}
                alt={`${work.title} のOGP画像`}
                fallback={<span className="text-muted-foreground">画像が見つかりません</span>}
                className="max-h-32 max-w-full"
              />
            ) : (
              <span className="text-muted-foreground">未設定</span>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>Twitter カード画像</TableHead>
          <TableCell className={cellClassName}>
            {work.images.twitter.image_url !== '' ? (
              <Image
                src={proxiedImage(work.images.twitter.image_url)}
                alt={`${work.title} の Twitter カード画像`}
                fallback={<span className="text-muted-foreground">画像が見つかりません</span>}
                className="max-h-32 max-w-full"
              />
            ) : (
              <span className="text-muted-foreground">未設定</span>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>エピソード数</TableHead>
          <TableCell className={cellClassName}>{work.episodes_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>視聴ユーザー数</TableHead>
          <TableCell className={cellClassName}>{work.watchers_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>レビュー数</TableHead>
          <TableCell className={cellClassName}>{work.reviews_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className={headClassName}>エピソードの有無</TableHead>
          <TableCell className="font-mono">{work.no_episodes ? 'false' : 'true'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default WorkInformationPage
