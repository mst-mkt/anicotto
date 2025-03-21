'use server'

import { graphql } from 'gql.tada'
import { annictGraphqlClient } from '../../../../lib/api/annict-graphql/client'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import { fetchAndSetWorkStatusCache, getWorkStatusCache } from '../../../../lib/cache/status'
import { getValidWorkImage } from '../../../../lib/images/valid-url'
import type { Work } from '../../../../schemas/annict/works'

export const getWorkSeries = async (workId: Work['id']) => {
  const query = graphql(`
    query getWorkSeries($workId: Int!) {
      searchWorks(annictIds: [$workId], first: 1) {
        nodes {
          annictId
          seriesList (first: 50) {
            nodes {
              annictId
              name
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
    console.error(`Failed to fetch series of work (${workId}):`, error)
    return null
  }

  const seriesList = work.seriesList?.nodes?.filter((series) => series !== null) ?? []

  await fetchAndSetWorkStatusCache(
    seriesList
      .flatMap((series) => series?.works?.edges ?? [])
      .flatMap((edge) => edge?.item ?? [])
      .map((work) => work.annictId),
  )

  return await Promise.all(
    seriesList.map(async (series) => ({
      id: series.annictId,
      name: series.name,
      works: await Promise.all(
        series.works?.edges
          ?.flatMap((edge) => edge?.item ?? [])
          .map(async (work) => ({
            id: work.annictId,
            title: work.title,
            media: work.media,
            seasonYear: work.seasonYear,
            seasonName: work.seasonName,
            watchersCount: work.watchersCount,
            reviewsCount: work.reviewsCount,
            episodesCount: work.episodesCount,
            thumbnail: await getValidWorkImage(work.annictId.toString(), [
              work.image?.recommendedImageUrl,
              work.image?.facebookOgImageUrl,
              work.image?.twitterNormalAvatarUrl,
              work.image?.twitterAvatarUrl,
            ]),
            status: {
              kind: getWorkStatusCache(work.annictId),
            },
          })) ?? [],
      ),
    })),
  )
}

export type WorkSeries = NonNullable<Awaited<ReturnType<typeof getWorkSeries>>>
