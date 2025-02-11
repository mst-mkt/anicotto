import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../../lib/api/graphql'
import type { Work } from '../../../../../schemas/annict/works'
import type { UnNullable, UnPromise } from '../../../../../types/util-types'

export const getWorkSeries = async (workId: Work['id']) => {
  const query = graphql(`
    query getWorkSeries($workId: Int!) {
      searchWorks( annictIds: [$workId], first: 1) {
        nodes {
          annictId
          seriesList {
            nodes {
              annictId
              name
              nameEn
              works (orderBy: { field: SEASON, direction: DESC }) {
                edges {
                  item {
                    annictId
                    title
                    media
                    image {
                      recommendedImageUrl
                      facebookOgImageUrl
                      twitterNormalAvatarUrl
                      twitterAvatarUrl
                      copyright
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { data, error } = await annictGraphqlClient
    .query(query, { workId }, { fetchOptions: { next: { tags: [`work-series-${workId}`] } } })
    .toPromise()

  const [work] = data?.searchWorks?.nodes ?? []

  if (work === undefined || work === null) {
    console.error(`[/works/${workId}/series] Failed to fetch work series:`, error)
    return null
  }

  return (
    work.seriesList?.nodes
      ?.filter((series) => series !== null)
      .map((series) => ({
        id: series.annictId,
        name: series.name,
        nameEn: series.nameEn,
        works:
          series.works?.edges
            ?.flatMap((edge) => edge?.item)
            ?.filter((work) => work !== null && work !== undefined)
            .map((work) => ({
              id: work.annictId,
              title: work.title,
              media: work.media,
              image: {
                recommendedImageUrl: work.image?.recommendedImageUrl ?? null,
                facebookOgImageUrl: work.image?.facebookOgImageUrl ?? null,
                twitterNormalAvatarUrl: work.image?.twitterNormalAvatarUrl ?? null,
                twitterAvatarUrl: work.image?.twitterAvatarUrl ?? null,
                copyright: work.image?.copyright ?? null,
              },
            })) ?? [],
      })) ?? []
  )
}

export type Series = UnNullable<UnPromise<ReturnType<typeof getWorkSeries>>>[number]
