'use server'

import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Episode as EpisodeType } from '../../../../schemas/annict/episodes'
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
        numberText:
          episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
        satisfactionRate: episode.satisfactionRate ?? 0,
        recordsCount: episode.recordsCount,
        viewerDidTrack: episode.viewerDidTrack,
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
        numberText:
          episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
        satisfactionRate: episode.satisfactionRate ?? 0,
        recordsCount: episode.recordsCount,
        viewerDidTrack: episode.viewerDidTrack,
      })) ?? []
  )
}

export const getEpisode = async (episodeId: EpisodeType['id']) => {
  const query = graphql(`
    query getEpisode($episodeId: Int!) {
      searchEpisodes(annictIds: [$episodeId]) {
        nodes {
          annictId
          numberText
          title
          satisfactionRate
          recordsCount
          recordCommentsCount
          viewerDidTrack
          prevEpisode {
            annictId
            numberText
          }
          nextEpisode {
            annictId
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
    numberText: episode.numberText,
    satisfactionRate: episode.satisfactionRate,
    recordsCount: episode.recordsCount,
    recordCommentsCount: episode.recordCommentsCount,
    viewerDidTrack: episode.viewerDidTrack,
    work: {
      id: episode.work.annictId,
      title: episode.work.title,
    },
    prevEpisode:
      episode.prevEpisode !== null
        ? {
            id: episode.prevEpisode.annictId,
            numberText: episode.prevEpisode.numberText,
          }
        : null,
    nextEpisode:
      episode.nextEpisode !== null
        ? {
            id: episode.nextEpisode.annictId,
            numberText: episode.nextEpisode.numberText,
          }
        : null,
  }
}

export type Episode = UnPromise<ReturnType<typeof getEpisode>>
