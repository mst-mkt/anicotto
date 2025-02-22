import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/graphql'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { UnNullable, UnPromise } from '../../../../types/util-types'

const ensureValue = <T>(value: T | null | undefined): T | null => {
  return value ?? null
}

export const getLibraries = async () => {
  await auth()

  const query = graphql(`
    query getLibraries {
      viewer {
        libraryEntries(states: [WATCHING], orderBy: { field: LAST_TRACKED_AT, direction: DESC }) {
          nodes {
            nextEpisode {
              annictId
              numberText
              title
              viewerDidTrack
            }
            work {
              annictId
              title
              image {
                facebookOgImageUrl
                recommendedImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
              episodes(orderBy: { field: SORT_NUMBER, direction: ASC }) {
                nodes {
                  annictId
                  viewerDidTrack
                  numberText
                  title
                }
              }
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      {},
      { fetchOptions: { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES] } } },
    )
    .toPromise()

  const libraries = data?.viewer?.libraryEntries?.nodes ?? []

  if (libraries === undefined || libraries === null) {
    console.error('[/track] Failed to fetch libraries:', error)
    return null
  }

  return await Promise.all(
    libraries
      .filter((library) => library !== null)
      .map(async (library) => ({
        nextEpisode:
          library.nextEpisode === null
            ? null
            : {
                id: library.nextEpisode.annictId,
                numberText: library.nextEpisode.numberText,
                title: library.nextEpisode.title,
                viewerDidTrack: library.nextEpisode.viewerDidTrack,
              },
        work: {
          id: library.work.annictId,
          title: library.work.title,
          image: await getValidWorkImage(library.work.annictId.toString(), [
            ensureValue(library.work.image?.facebookOgImageUrl),
            ensureValue(library.work.image?.recommendedImageUrl),
            ensureValue(library.work.image?.twitterNormalAvatarUrl),
            ensureValue(library.work.image?.twitterAvatarUrl),
          ]),
          episodes:
            library.work.episodes?.nodes?.map((episode) => ({
              id: ensureValue(episode?.annictId),
              numberText: ensureValue(episode?.numberText),
              title: ensureValue(episode?.title),
              viewerDidTrack: ensureValue(episode?.viewerDidTrack),
            })) ?? [],
        },
      })),
  )
}

export type Library = UnNullable<UnPromise<ReturnType<typeof getLibraries>>>[number]
