'use server'

import { graphql } from 'gql.tada'
import { P, match } from 'ts-pattern'
import { MEDIA_TEXT } from '../../../../constants/text/media'
import { SEASON_NAME_TEXT } from '../../../../constants/text/season'
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
            media_text: MEDIA_TEXT(work.media),
            season_name_text: match([work.seasonYear, work.seasonName])
              .with([P.nullish, P._], () => null)
              .with([P.number, P.nullish], ([year]) => `${year}年`)
              .with(
                [P.number, P.string],
                ([year, season]) => `${year}年${SEASON_NAME_TEXT(season)}`,
              )
              .exhaustive(),
            watchers_count: work.watchersCount,
            reviews_count: work.reviewsCount,
            episodes_count: work.episodesCount,
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
