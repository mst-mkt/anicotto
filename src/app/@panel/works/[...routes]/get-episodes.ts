import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/graphql'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Work } from '../../../../schemas/annict/works'
import type { UnPromise } from '../../../../types/util-types'

export const getEpisodes = async (workId: Work['id']) => {
  const query = graphql(`
    query getEpisodes($workId: Int!) {
      searchWorks(annictIds: [$workId]) {
        nodes {
          episodes(orderBy: { field: SORT_NUMBER, direction: ASC }, last: 24 ) {
            nodes {
              annictId
              number
              numberText
              satisfactionRate
              recordsCount
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(
      query,
      { workId },
      { fetchOptions: { next: { tags: [CACHE_TAGS.WORKS_SEASON(`${workId}`)] } } },
    )
    .toPromise()

  if (data === undefined || data.searchWorks === null) {
    console.error(`[works/${workId}] Failed to fetch episodes`, error)
    return []
  }

  return (
    data.searchWorks.nodes
      ?.at(0)
      ?.episodes?.nodes?.filter((episode) => episode !== null)
      .map((episode) => ({
        id: episode.annictId,
        numberText:
          episode.numberText ?? (episode.number === null ? '不明' : `第${episode.number}話`),
        satisfactionRate: episode.satisfactionRate ?? 0,
        recordsCount: episode.recordsCount,
      })) ?? []
  )
}

export type Episode = UnPromise<ReturnType<typeof getEpisodes>>[number]
