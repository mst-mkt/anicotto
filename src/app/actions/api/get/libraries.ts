'use server'

import { graphql } from 'gql.tada'
import { match } from 'ts-pattern'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import { fetchAndSetWorkStatusCache, getWorkStatusCache } from '../../../../lib/cache/status'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { Status } from '../../../../schemas/annict/common'
import type { User } from '../../../../schemas/annict/users'
import type { introspection_types } from '../../../../types/graphql-env'
import type { UnNullable } from '../../../../types/util-types'

export const getMyLibraries = async (status: Exclude<Status, 'no_select'>) => {
  const query = graphql(`
    query getMyLibraries($status: StatusState!) {
      viewer {
        libraryEntries(states: [$status], orderBy: { field: LAST_TRACKED_AT, direction: DESC }) {
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
              seasonName
              seasonYear
              media
              image {
                facebookOgImageUrl
                recommendedImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
              watchersCount
              reviewsCount
              episodesCount
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient.query(
    query,
    {
      status: match(status)
        .returnType<introspection_types['StatusState']['enumValues']>()
        .with('watching', () => 'WATCHING')
        .with('on_hold', () => 'ON_HOLD')
        .with('stop_watching', () => 'STOP_WATCHING')
        .with('wanna_watch', () => 'WANNA_WATCH')
        .with('watched', () => 'WATCHED')
        .exhaustive(),
    },
    {
      fetchOptions: {
        next: {
          tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES, CACHE_TAGS.MY_LIBRARIES_STATUS(status)],
        },
      },
    },
  )

  const libraries = data?.viewer?.libraryEntries?.nodes?.filter((library) => library !== null)

  if (libraries === undefined || libraries === null) {
    console.error(`Failed to fetch libraries with status (${status}):`, error)
    return null
  }

  await fetchAndSetWorkStatusCache(libraries.map((lib) => lib.work.annictId))

  return await Promise.all(
    libraries.map(async (library) => ({
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
        seasonName: library.work.seasonName,
        seasonYear: library.work.seasonYear,
        media: library.work.media,
        watchersCount: library.work.watchersCount,
        reviewsCount: library.work.reviewsCount,
        episodesCount: library.work.episodesCount,
        thumbnail: await getValidWorkImage(library.work.annictId.toString(), [
          library.work.image?.facebookOgImageUrl,
          library.work.image?.recommendedImageUrl,
          library.work.image?.twitterNormalAvatarUrl,
          library.work.image?.twitterAvatarUrl,
        ]),
        status: {
          kind: getWorkStatusCache(library.work.annictId),
        },
      },
    })),
  )
}

export type Library = UnNullable<Awaited<ReturnType<typeof getMyLibraries>>>[number]

export const getMyLibrariesWithEpisodes = async (status: Exclude<Status, 'no_select'>) => {
  const query = graphql(`
    query getLibrariesWithEpisodes($status: StatusState!) {
      viewer {
        libraryEntries(states: [$status], orderBy: { field: LAST_TRACKED_AT, direction: DESC }) {
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
              seasonName
              seasonYear
              media
              image {
                facebookOgImageUrl
                recommendedImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
              watchersCount
              reviewsCount
              episodesCount
              episodes(orderBy: { field: SORT_NUMBER, direction: ASC }) {
                nodes {
                  annictId
                  number
                  numberText
                  title
                  viewerDidTrack
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
      {
        status: match(status)
          .returnType<introspection_types['StatusState']['enumValues']>()
          .with('watching', () => 'WATCHING')
          .with('on_hold', () => 'ON_HOLD')
          .with('stop_watching', () => 'STOP_WATCHING')
          .with('wanna_watch', () => 'WANNA_WATCH')
          .with('watched', () => 'WATCHED')
          .exhaustive(),
      },
      {
        fetchOptions: {
          next: {
            tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES, CACHE_TAGS.MY_LIBRARIES_STATUS(status)],
          },
        },
      },
    )
    .toPromise()

  const libraries = data?.viewer?.libraryEntries?.nodes?.filter((library) => library !== null)

  if (libraries === undefined || libraries === null) {
    console.error(`Failed to fetch libraries with status (${status}):`, error)
    return null
  }

  await fetchAndSetWorkStatusCache(libraries.map((lib) => lib.work.annictId))

  return await Promise.all(
    libraries.map(async (library) => ({
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
        seasonName: library.work.seasonName,
        seasonYear: library.work.seasonYear,
        media: library.work.media,
        watchersCount: library.work.watchersCount,
        reviewsCount: library.work.reviewsCount,
        episodesCount: library.work.episodesCount,
        thumbnail: await getValidWorkImage(library.work.annictId.toString(), [
          library.work.image?.facebookOgImageUrl,
          library.work.image?.recommendedImageUrl,
          library.work.image?.twitterNormalAvatarUrl,
          library.work.image?.twitterAvatarUrl,
        ]),
        status: {
          kind: getWorkStatusCache(library.work.annictId),
        },
        episodes:
          library.work.episodes?.nodes
            ?.filter((episode) => episode !== null)
            .map((episode) => ({
              id: episode.annictId,
              numberText:
                episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
              title: episode.title,
              viewerDidTrack: episode.viewerDidTrack,
            })) ?? [],
      },
    })),
  )
}

export type LibraryWithEpisodes = UnNullable<
  Awaited<ReturnType<typeof getMyLibrariesWithEpisodes>>
>[number]

export const getUserLibraries = async (
  username: User['username'],
  status: Exclude<Status, 'no_select'>,
) => {
  const query = graphql(`
    query getUserLibraries($username: String!, $status: StatusState!) {
      user(username: $username) {
        libraryEntries(states: [$status], orderBy: { field: LAST_TRACKED_AT, direction: DESC }) {
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
              seasonName
              seasonYear
              media
              image {
                facebookOgImageUrl
                recommendedImageUrl
                twitterNormalAvatarUrl
                twitterAvatarUrl
              }
              watchersCount
              reviewsCount
              episodesCount
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient.query(
    query,
    {
      username,
      status: match(status)
        .returnType<introspection_types['StatusState']['enumValues']>()
        .with('watching', () => 'WATCHING')
        .with('on_hold', () => 'ON_HOLD')
        .with('stop_watching', () => 'STOP_WATCHING')
        .with('wanna_watch', () => 'WANNA_WATCH')
        .with('watched', () => 'WATCHED')
        .exhaustive(),
    },
    {
      fetchOptions: {
        next: {
          tags: [CACHE_TAGS.USER(username), CACHE_TAGS.USER_LIBRARIES(username)],
        },
      },
    },
  )

  const libraries = data?.user?.libraryEntries?.nodes?.filter((library) => library !== null)

  if (libraries === undefined || libraries === null) {
    console.error(`Failed to fetch libraries with status (${status}):`, error)
    return null
  }

  await fetchAndSetWorkStatusCache(libraries.map((lib) => lib.work.annictId))

  return await Promise.all(
    libraries.map(async (library) => ({
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
        seasonName: library.work.seasonName,
        seasonYear: library.work.seasonYear,
        media: library.work.media,
        watchersCount: library.work.watchersCount,
        reviewsCount: library.work.reviewsCount,
        episodesCount: library.work.episodesCount,
        thumbnail: await getValidWorkImage(library.work.annictId.toString(), [
          library.work.image?.facebookOgImageUrl,
          library.work.image?.recommendedImageUrl,
          library.work.image?.twitterNormalAvatarUrl,
          library.work.image?.twitterAvatarUrl,
        ]),
        status: {
          kind: getWorkStatusCache(library.work.annictId),
        },
      },
    })),
  )
}
