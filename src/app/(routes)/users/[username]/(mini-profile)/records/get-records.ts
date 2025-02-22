import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../../../lib/api/graphql'
import { auth } from '../../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../../lib/cache-tag'
import { getValidWorkImage } from '../../../../../../lib/images/valid-url'
import type { User } from '../../../../../../schemas/annict/users'
import type { UnNullable, UnPromise } from '../../../../../../types/util-types'

export const getUserRecords = async (username: User['username']) => {
  await auth()

  const query = graphql(`
    query getUserRecords($username: String!) {
      user(username: $username) {
        records(first: 128, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            annictId
            ratingState
            comment
            updatedAt
            work {
              annictId
              title
              image {
                recommendedImageUrl
                facebookOgImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
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
      { username },
      {
        fetchOptions: {
          next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.USER_RECORDS(username)] },
        },
      },
    )
    .toPromise()

  const records = data?.user?.records?.nodes ?? []

  if (records === undefined) {
    console.error('[/users/[username]/records] Failed to fetch records:', error)
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
          image: await getValidWorkImage(record.work.annictId.toString(), [
            record.work.image?.recommendedImageUrl ?? null,
            record.work.image?.facebookOgImageUrl ?? null,
            record.work.image?.twitterNormalAvatarUrl ?? null,
            record.work.image?.twitterAvatarUrl ?? null,
          ]),
        },
        episode: {
          id: record.episode.annictId,
          number: record.episode.numberText,
          title: record.episode.title,
        },
      })),
  )
}

export type UserRecord = UnNullable<UnPromise<ReturnType<typeof getUserRecords>>>[number]
