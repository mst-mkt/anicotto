'use server'

import { graphql } from 'gql.tada'
import { match, P } from 'ts-pattern'
import { MEDIA_TEXT } from '../../../../constants/text/media'
import { SEASON_NAME_TEXT } from '../../../../constants/text/season'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { annictToMal } from '../../../../lib/api/id'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { Episode } from '../../../../schemas/annict/episodes'
import type { User } from '../../../../schemas/annict/users'
import type { UnNullable } from '../../../../types/util-types'

export const getUserRecords = async (username: User['username'], after?: string) => {
  const query = graphql(`
    query getUserRecords($username: String!, $after: String) {
      user(username: $username) {
        records(first: 128, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            annictId
            ratingState
            comment
            updatedAt
            work {
              annictId
              malAnimeId
              title
              media
              seasonYear
              seasonName
              image {
                recommendedImageUrl
                facebookOgImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
              episodesCount
              watchersCount
              reviewsCount
            }
            episode {
              annictId
              number
              numberText
              title
            }
          }
          pageInfo {
            endCursor
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { username, after },
      {
        fetchOptions: {
          next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.USER_RECORDS(username)] },
        },
      },
    )
    .toPromise()

  const records = data?.user?.records?.nodes?.filter((record) => record !== null)

  if (records === undefined) {
    console.error(`Failed to fetch records of user (${username}):`, error)
    return null
  }

  const endCursor = data?.user?.records?.pageInfo?.endCursor ?? null

  const recordsData = await Promise.all(
    records.map(async (record) => ({
      id: record.annictId,
      rating: record.ratingState,
      comment: record.comment,
      updated_at: `${record.updatedAt}`,
      work: {
        id: record.work.annictId,
        title: record.work.title,
        media_text: MEDIA_TEXT(record.work.media),
        season_name_text: match([record.work.seasonYear, record.work.seasonName])
          .with([P.nullish, P._], () => null)
          .with([P.number, P.nullish], ([year]) => `${year}年`)
          .with([P.number, P.string], ([year, season]) => `${year}年${SEASON_NAME_TEXT(season)}`)
          .exhaustive(),
        thumbnail: await getValidWorkImage(
          record.work.image?.facebookOgImageUrl ?? null,
          [
            record.work.image?.recommendedImageUrl ?? null,
            record.work.image?.twitterNormalAvatarUrl ?? null,
            record.work.image?.twitterAvatarUrl ?? null,
          ],
          record.work.malAnimeId ?? annictToMal(record.work.annictId)?.toString() ?? null,
        ),
        episodes_count: record.work.episodesCount,
        watchers_count: record.work.watchersCount,
        reviews_count: record.work.reviewsCount,
      },
      episode: {
        id: record.episode.annictId,
        number_text:
          record.episode.numberText ??
          (record.episode.number === null ? '不明' : `第${record.episode.number}話`),
        title: record.episode.title,
      },
    })),
  )

  return { data: recordsData, endCursor }
}

export type UserRecord = UnNullable<Awaited<ReturnType<typeof getUserRecords>>>['data'][number]

export const getEpisodeRecords = async (episodeId: Episode['id'], page = 1) => {
  await auth()

  const recordsResult = await annictApiClient.getRecords(
    {
      query: { filter_episode_id: episodeId, filter_has_record_comment: true, per_page: 24, page },
    },
    { next: { tags: [CACHE_TAGS.EPISODE(episodeId), CACHE_TAGS.EPISODE_RECORDS(episodeId)] } },
  )

  if (recordsResult.isErr()) {
    console.error(`Failed to fetch records of episode (${episodeId}):`, recordsResult.error)
    return null
  }

  return { data: recordsResult.value.records, next_page: recordsResult.value.next_page }
}
