'use server'

import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { annictApiClient } from '../../../../lib/api/annict-rest/client'
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
              numberText
              title
            }
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

  const records = data?.user?.records?.nodes ?? []

  if (records === undefined) {
    console.error(`Failed to fetch records of user (${username}):`, error)
    return null
  }

  return await Promise.all(
    records
      .filter((record) => record !== null)
      .map(async (record) => ({
        id: record.annictId,
        rating: record.ratingState,
        comment: record.comment,
        updatedAt: `${record.updatedAt}`,
        work: {
          id: record.work.annictId,
          title: record.work.title,
          media: record.work.media,
          seasonYear: record.work.seasonYear,
          seasonName: record.work.seasonName,
          thumbnail: await getValidWorkImage(record.work.annictId.toString(), [
            record.work.image?.recommendedImageUrl ?? null,
            record.work.image?.facebookOgImageUrl ?? null,
            record.work.image?.twitterNormalAvatarUrl ?? null,
            record.work.image?.twitterAvatarUrl ?? null,
          ]),
          episodesCount: record.work.episodesCount,
          watchersCount: record.work.watchersCount,
          reviewsCount: record.work.reviewsCount,
        },
        episode: {
          id: record.episode.annictId,
          number: record.episode.numberText,
          title: record.episode.title,
        },
      })),
  )
}

export type UserRecord = UnNullable<Awaited<ReturnType<typeof getUserRecords>>>[number]

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
