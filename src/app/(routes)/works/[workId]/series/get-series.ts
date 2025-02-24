import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../../lib/api/graphql'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { Work } from '../../../../../schemas/annict/works'
import type { UnNullable, UnPromise } from '../../../../../types/util-types'

export const getWorkSeries = async (workId: Work['id']) => {
  const query = graphql(`
    query getWorkSeries($workId: Int!) {
      searchWorks( annictIds: [$workId], first: 1) {
        nodes {
          annictId
          seriesList (first: 50) {
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
                    seasonYear
                    seasonName
                    watchersCount
                    reviewsCount
                    episodesCount
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
    .query(
      query,
      { workId },
      {
        fetchOptions: { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_SERIES(workId)] } },
      },
    )
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
              seasonYear: work.seasonYear,
              seasonName: work.seasonName,
              watchersCount: work.watchersCount,
              reviewsCount: work.reviewsCount,
              episodesCount: work.episodesCount,
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
