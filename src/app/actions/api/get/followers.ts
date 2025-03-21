'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { User } from '../../../../schemas/annict/users'

export const getFollowers = async (username: User['username'], page = 1) => {
  await auth()

  const followersResult = await annictApiClient.getFollowers(
    { query: { filter_username: username, sort_id: 'desc', per_page: 16, page } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.FOLLOWERS(username)] } },
  )

  if (followersResult.isErr()) {
    console.error(`Failed to fetch followers (${username}):`, followersResult.error)
    return null
  }

  return { data: followersResult.value.users, next_page: followersResult.value.next_page }
}

export const getIsFollowed = async (from: User['username'], to: User['username']) => {
  await auth()

  const getIsFollowedImpl = async (page = 1) => {
    const PER_PAGE = 50
    const followedResult = await annictApiClient.getFollowing(
      { query: { filter_username: from, page, per_page: PER_PAGE } },
      {
        next: {
          tags: [
            CACHE_TAGS.USER(from),
            CACHE_TAGS.USER(to),
            CACHE_TAGS.FOLLOWING(from),
            CACHE_TAGS.FOLLOWERS(to),
            CACHE_TAGS.IS_FOLLOWER(from, to),
          ],
        },
      },
    )

    if (followedResult.isErr()) {
      console.error(`Failed to fetch is-followed (${from}->${to}):`, followedResult.error)
      return false
    }

    const following = followedResult.value.users

    const isInclude = following.some((user) => user.username === to)
    const isLastPage = following.length < PER_PAGE

    if (isInclude || isLastPage) {
      return isInclude
    }

    return await getIsFollowedImpl(page + 1)
  }

  return await getIsFollowedImpl()
}
