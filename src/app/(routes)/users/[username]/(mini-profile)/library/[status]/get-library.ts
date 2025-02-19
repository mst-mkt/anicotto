import { graphql } from 'gql.tada'
import { match } from 'ts-pattern'
import { annictGraphqlClient } from '../../../../../../../lib/api/graphql'
import { auth } from '../../../../../../../lib/auth'
import { getValidWorkImage } from '../../../../../../../lib/images/valid-url'
import type { Status } from '../../../../../../../schemas/annict/common'
import type { User } from '../../../../../../../schemas/annict/users'
import type { UnNullable, UnPromise } from '../../../../../../../types/util-types'

type SelectedStatus = Exclude<Status, 'no_select'>

const convertStatusEnum = (status: SelectedStatus) => {
  return match(status)
    .with('watching', () => 'WATCHING' as const)
    .with('watched', () => 'WATCHED' as const)
    .with('on_hold', () => 'ON_HOLD' as const)
    .with('stop_watching', () => 'STOP_WATCHING' as const)
    .with('wanna_watch', () => 'WANNA_WATCH' as const)
    .exhaustive()
}

export const getLibrary = async (username: User['username'], status: SelectedStatus) => {
  await auth()

  const query = graphql(`
    query getLibrary($username: String!, $status: StatusState!) {
      user(username: $username) {
        libraryEntries(states: [$status], orderBy: { field: LAST_TRACKED_AT, direction: DESC }, first: 32) {
          edges {
            node {
              work {
                annictId
                title
                seasonName
                seasonYear
                media
                image {
                  facebookOgImageUrl
                  recommendedImageUrl
                  twitterNormalAvatarUrl
                  twitterAvatarUrl
                }
              }
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient.query(
    query,
    { username, status: convertStatusEnum(status) },
    { fetchOptions: { next: { tags: ['libraries', `libraries-${username}`] } } },
  )

  const libraries =
    data?.user?.libraryEntries?.edges?.filter((edge) => edge !== null).map(({ node }) => node) ?? []

  if (libraries === undefined || libraries === null) {
    console.error('[/users/[username]/library] Failed to fetch libraries:', error)
    return null
  }

  return await Promise.all(
    libraries
      .filter((library) => library !== null)
      .map(async (library) => ({
        work: {
          id: library.work.annictId,
          title: library.work.title,
          seasonName: library.work.seasonName,
          seasonYear: library.work.seasonYear,
          media: library.work.media,
          image: await getValidWorkImage(library.work.annictId.toString(), [
            library.work.image?.facebookOgImageUrl ?? null,
            library.work.image?.recommendedImageUrl ?? null,
            library.work.image?.twitterNormalAvatarUrl ?? null,
            library.work.image?.twitterAvatarUrl ?? null,
          ]),
        },
      })),
  )
}

export type Library = UnNullable<UnPromise<ReturnType<typeof getLibrary>>>
