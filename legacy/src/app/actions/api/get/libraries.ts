'use server'

import { graphql } from 'gql.tada'
import { match, P } from 'ts-pattern'
import { MEDIA_TEXT } from '../../../../constants/text/media'
import { SEASON_NAME_TEXT } from '../../../../constants/text/season'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { annictToMal } from '../../../../lib/api/id'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
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
              number
              numberText
              title
              viewerDidTrack
            }
            work {
              annictId
              malAnimeId
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

  return await Promise.all(
    libraries.map(async (library) => ({
      next_episode:
        library.nextEpisode === null
          ? null
          : {
              id: library.nextEpisode.annictId,
              number_text:
                library.nextEpisode.numberText ??
                (library.nextEpisode.number === null
                  ? '不明'
                  : `第${library.nextEpisode.number}話`),
              title: library.nextEpisode.title,
              viewer_did_track: library.nextEpisode.viewerDidTrack,
            },
      work: {
        id: library.work.annictId,
        title: library.work.title,
        season_name_text: match([library.work.seasonYear, library.work.seasonName])
          .with([P.nullish, P._], () => null)
          .with([P.number, P.nullish], ([year]) => `${year}年`)
          .with([P.number, P.string], ([year, season]) => `${year}年${SEASON_NAME_TEXT(season)}`)
          .exhaustive(),
        media_text: MEDIA_TEXT(library.work.media),
        watchers_count: library.work.watchersCount,
        reviews_count: library.work.reviewsCount,
        episodes_count: library.work.episodesCount,
        thumbnail: await getValidWorkImage(
          library.work.image?.facebookOgImageUrl ?? null,
          [
            library.work.image?.recommendedImageUrl ?? null,
            library.work.image?.twitterNormalAvatarUrl ?? null,
            library.work.image?.twitterAvatarUrl ?? null,
          ],
          library.work.malAnimeId ?? annictToMal(library.work.annictId)?.toString() ?? null,
        ),
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
              number
              numberText
              title
              viewerDidTrack
            }
            work {
              annictId
              malAnimeId
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

  return await Promise.all(
    libraries.map(async (library) => ({
      next_episode:
        library.nextEpisode === null
          ? null
          : {
              id: library.nextEpisode.annictId,
              number_text:
                library.nextEpisode.numberText ??
                (library.nextEpisode.number === null
                  ? '不明'
                  : `第${library.nextEpisode.number}話`),
              title: library.nextEpisode.title,
              viewer_did_track: library.nextEpisode.viewerDidTrack,
            },
      work: {
        id: library.work.annictId,
        title: library.work.title,
        season_name_text: match([library.work.seasonYear, library.work.seasonName])
          .with([P.nullish, P._], () => null)
          .with([P.number, P.nullish], ([year]) => `${year}年`)
          .with([P.number, P.string], ([year, season]) => `${year}年${SEASON_NAME_TEXT(season)}`)
          .exhaustive(),
        media_text: MEDIA_TEXT(library.work.media),
        watchers_count: library.work.watchersCount,
        reviews_count: library.work.reviewsCount,
        episodes_count: library.work.episodesCount,
        thumbnail: await getValidWorkImage(
          library.work.image?.facebookOgImageUrl ?? null,
          [
            library.work.image?.recommendedImageUrl ?? null,
            library.work.image?.twitterNormalAvatarUrl ?? null,
            library.work.image?.twitterAvatarUrl ?? null,
          ],
          library.work.malAnimeId ?? annictToMal(library.work.annictId)?.toString() ?? null,
        ),
        episodes:
          library.work.episodes?.nodes
            ?.filter((episode) => episode !== null)
            .map((episode) => ({
              id: episode.annictId,
              number_text:
                episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
              title: episode.title,
              viewer_did_track: episode.viewerDidTrack,
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
              number
              numberText
              title
              viewerDidTrack
            }
            work {
              annictId
              malAnimeId
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

  return await Promise.all(
    libraries.map(async (library) => ({
      next_episode:
        library.nextEpisode === null
          ? null
          : {
              id: library.nextEpisode.annictId,
              number_text:
                library.nextEpisode.numberText ??
                (library.nextEpisode.number === null
                  ? '不明'
                  : `第${library.nextEpisode.number}話`),
              title: library.nextEpisode.title,
              viewer_did_track: library.nextEpisode.viewerDidTrack,
            },
      work: {
        id: library.work.annictId,
        title: library.work.title,
        season_name_text: match([library.work.seasonYear, library.work.seasonName])
          .with([P.nullish, P._], () => null)
          .with([P.number, P.nullish], ([year]) => `${year}年`)
          .with([P.number, P.string], ([year, season]) => `${year}年${SEASON_NAME_TEXT(season)}`)
          .exhaustive(),
        media_text: MEDIA_TEXT(library.work.media),
        watchers_count: library.work.watchersCount,
        reviews_count: library.work.reviewsCount,
        episodes_count: library.work.episodesCount,
        thumbnail: await getValidWorkImage(
          library.work.image?.facebookOgImageUrl ?? null,
          [
            library.work.image?.recommendedImageUrl ?? null,
            library.work.image?.twitterNormalAvatarUrl ?? null,
            library.work.image?.twitterAvatarUrl ?? null,
          ],
          library.work.malAnimeId ?? annictToMal(library.work.annictId)?.toString() ?? null,
        ),
      },
    })),
  )
}
