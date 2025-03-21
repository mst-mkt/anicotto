'use server'

import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Episode, Episode as EpisodeType } from '../../../../schemas/annict/episodes'
import type { Work } from '../../../../schemas/annict/works'
import type { UnPromise } from '../../../../types/util-types'

export const getWorkAllEpisodes = async (workId: Work['id']) => {
  const query = graphql(`
    query getEpisodes($workId: Int!) {
      searchWorks(annictIds: [$workId]) {
        nodes {
          episodes(orderBy: { field: SORT_NUMBER, direction: ASC }) {
            nodes {
              annictId
              title
              number
              numberText
              satisfactionRate
              recordsCount
              viewerDidTrack
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { workId, page: 1 },
      { fetchOptions: { next: { tags: [CACHE_TAGS.WORK_EPISODES(workId)] } } },
    )
    .toPromise()

  if (data === undefined || data.searchWorks === null) {
    console.error(`Failed to fetch episodes of work (${workId})`, error)
    return []
  }

  return (
    data.searchWorks.nodes
      ?.at(0)
      ?.episodes?.nodes?.filter((episode) => episode !== null)
      .map((episode) => ({
        id: episode.annictId,
        title: episode.title,
        number_text:
          episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
        satisfaction_rate: episode.satisfactionRate ?? 0,
        records_count: episode.recordsCount,
        viewer_did_track: episode.viewerDidTrack,
      })) ?? []
  )
}

export type Episodes = UnPromise<ReturnType<typeof getWorkAllEpisodes>>

export const getWorkLatestEpisode = async (workId: Work['id'], count = 24) => {
  const query = graphql(`
    query getEpisodes($workId: Int!, $count: Int!) {
      searchWorks(annictIds: [$workId]) {
        nodes {
          episodes(orderBy: { field: SORT_NUMBER, direction: DESC }, last: $count) {
            nodes {
              annictId
              title
              number
              numberText
              satisfactionRate
              recordsCount
              viewerDidTrack
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { workId, count },
      { fetchOptions: { next: { tags: [CACHE_TAGS.WORK_EPISODES(workId)] } } },
    )
    .toPromise()

  if (data === undefined || data.searchWorks === null) {
    console.error(`Failed to fetch latest episodes of work (${workId})`, error)
    return []
  }

  return (
    data.searchWorks.nodes
      ?.at(0)
      ?.episodes?.nodes?.filter((episode) => episode !== null)
      .map((episode) => ({
        id: episode.annictId,
        title: episode.title,
        number_text:
          episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
        satisfaction_rate: episode.satisfactionRate ?? 0,
        records_count: episode.recordsCount,
        viewer_did_track: episode.viewerDidTrack,
      })) ?? []
  )
}

export const getEpisodeWithInfo = async (episodeId: EpisodeType['id']) => {
  const query = graphql(`
    query getEpisode($episodeId: Int!) {
      searchEpisodes(annictIds: [$episodeId]) {
        nodes {
          annictId
          number
          numberText
          title
          satisfactionRate
          recordsCount
          recordCommentsCount
          viewerDidTrack
          prevEpisode {
            annictId
            number
            numberText
          }
          nextEpisode {
            annictId
            number
            numberText
          }
          work {
            annictId
            title
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { episodeId },
      { fetchOptions: { next: { tags: [CACHE_TAGS.EPISODE(episodeId)] } } },
    )
    .toPromise()

  if (data === undefined || data.searchEpisodes === null) {
    console.error(`Failed to fetch episode (${episodeId})`, error)
    return null
  }

  const episode = data.searchEpisodes.nodes?.at(0)

  if (episode === undefined || episode === null) {
    return null
  }

  return {
    id: episode.annictId,
    title: episode.title,
    number_text: episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
    satisfaction_rate: episode.satisfactionRate,
    records_count: episode.recordsCount,
    record_comments_count: episode.recordCommentsCount,
    viewer_did_track: episode.viewerDidTrack,
    work: {
      id: episode.work.annictId,
      title: episode.work.title,
    },
    prev_episode:
      episode.prevEpisode !== null
        ? {
            id: episode.prevEpisode.annictId,
            number_text:
              episode.prevEpisode.numberText ??
              (episode.prevEpisode.number === null ? '不明' : `第${episode.prevEpisode.number}話`),
          }
        : null,
    next_episode:
      episode.nextEpisode !== null
        ? {
            id: episode.nextEpisode.annictId,
            number_text:
              episode.nextEpisode.numberText ??
              (episode.nextEpisode.number === null ? '不明' : `第${episode.nextEpisode.number}話`),
          }
        : null,
  }
}

export type EpisodeWithInfo = UnPromise<ReturnType<typeof getEpisodeWithInfo>>

export const getEpisode = async (episodeId: Episode['id']) => {
  await auth()

  const episodeResult = await annictApiClient.getEpisodes(
    { query: { filter_ids: [episodeId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.EPISODE(episodeId)] } },
  )

  if (episodeResult.isErr()) {
    console.error(`Failed to fetch episode (${episodeId})`, episodeResult.error)
    return null
  }

  return episodeResult.value.episodes.at(0) ?? null
}
