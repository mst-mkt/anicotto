'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { User } from '../../../../schemas/annict/users'

export const getFollowings = async (username: User['username'], page = 1) => {
  await auth()

  const followingsResult = await annictApiClient.getFollowing(
    { query: { filter_username: username, sort_id: 'desc', per_page: 16, page } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.FOLLOWING(username)] } },
  )

  if (followingsResult.isErr()) {
    console.error(`Failed to fetch followings (${username}):`, followingsResult.error)
    return null
  }

  return { data: followingsResult.value.users, next_page: followingsResult.value.next_page }
}

export const getIsFollowing = async (from: User['username'], to: User['username']) => {
  await auth()

  const getIsFollowingImpl = async (page = 1) => {
    const PER_PAGE = 50
    const followingResult = await annictApiClient.getFollowing(
      { query: { filter_username: to, page, per_page: PER_PAGE } },
      {
        next: {
          tags: [
            CACHE_TAGS.USER(from),
            CACHE_TAGS.USER(to),
            CACHE_TAGS.FOLLOWING(to),
            CACHE_TAGS.FOLLOWERS(from),
            CACHE_TAGS.IS_FOLLOWER(to, from),
          ],
        },
      },
    )

    if (followingResult.isErr()) {
      console.error(`Failed to fetch is-following (${from}->${to}):`, followingResult.error)
      return false
    }

    const following = followingResult.value.users

    const isInclude = following.some((user) => user.username === from)
    const isLastPage = following.length < PER_PAGE

    if (isInclude || isLastPage) {
      return isInclude
    }

    return await getIsFollowingImpl(page + 1)
  }

  return await getIsFollowingImpl()
}
