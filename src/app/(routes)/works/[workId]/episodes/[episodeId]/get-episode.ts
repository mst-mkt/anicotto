import { graphql } from 'gql.tada'
import { notFound } from 'next/navigation'
import { annictGraphqlClient } from '../../../../../../lib/api/annict-graphql/client'
import { CACHE_TAGS } from '../../../../../../lib/cache-tag'
import type { Episode as EpisodeType } from '../../../../../../schemas/annict/episodes'
import type { UnPromise } from '../../../../../../types/util-types'

export const getEpisode = async (episodeId: EpisodeType['id']) => {
  const query = graphql(`
    query getEpisode($episodeId: Int!) {
      searchEpisodes(annictIds: [$episodeId]) {
        nodes {
          annictId
          work {
            annictId
            title
          }
          numberText
          prevEpisode {
            annictId
            numberText
          }
          nextEpisode {
            annictId
            numberText
          }
          title
          satisfactionRate
          recordsCount
          recordCommentsCount
          viewerDidTrack
          records (hasComment: true, first: 16) {
            nodes {
              annictId
              user {
                annictId
                username
                avatarUrl
                name
                description
                createdAt
                followersCount
                followingsCount
              }
              comment
              createdAt
              ratingState
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { episodeId },
      {
        fetchOptions: {
          next: { tags: [CACHE_TAGS.EPISODE(episodeId), CACHE_TAGS.EPISODE_RECORDS(episodeId)] },
        },
      },
    )
    .toPromise()

  if (data === undefined || data.searchEpisodes === null) {
    console.error(`[/works/{workId}/episodes/${episodeId}] Failed to fetch episode`, error)
    notFound()
  }

  const episode = data.searchEpisodes.nodes?.at(0)

  if (episode === undefined || episode === null) {
    notFound()
  }

  return {
    id: episode.annictId,
    title: episode.title,
    numberText: episode.numberText,
    satisfactionRate: episode.satisfactionRate,
    recordsCount: episode.recordsCount,
    recordCommentsCount: episode.recordCommentsCount,
    viewerDidTrack: episode.viewerDidTrack,
    records:
      episode.records?.nodes
        ?.filter((record) => record !== null)
        .map((record) => ({
          id: record.annictId,
          comment: record.comment,
          createdAt: `${record.createdAt}`,
          ratingState: record.ratingState,
          user: {
            id: record.user.annictId,
            username: record.user.username,
            avatarUrl: record.user.avatarUrl ?? '',
            name: record.user.name,
            description: record.user.description,
            createdAt: `${record.user.createdAt}`,
            followersCount: record.user.followersCount,
            followingsCount: record.user.followingsCount,
          },
        })) ?? [],
    work: {
      id: episode.work.annictId,
      title: episode.work.title,
    },
    prevEpisode:
      episode.prevEpisode === null
        ? null
        : {
            id: episode.prevEpisode.annictId,
            numberText: episode.prevEpisode.numberText,
          },
    nextEpisode:
      episode.nextEpisode === null
        ? null
        : {
            id: episode.nextEpisode.annictId,
            numberText: episode.nextEpisode.numberText,
          },
  }
}

export type Episode = UnPromise<ReturnType<typeof getEpisode>>
