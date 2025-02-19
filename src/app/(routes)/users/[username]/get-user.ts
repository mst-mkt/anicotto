import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'
import type { User } from '../../../../schemas/annict/users'

export const getUser = async (username: User['username']) => {
  await auth()

  const userResult = await annictApiClient.getUsers(
    { query: { filter_usernames: [username], per_page: 1 } },
    { next: { tags: [`user-${username}`] } },
  )

  if (userResult.isErr()) {
    console.error('[/users/[username] Failed to fetch user:', userResult.error)
    return null
  }

  return userResult.value.users.at(0) ?? null
}

export const getMe = async () => {
  await auth()

  const meResult = await annictApiClient.getMe({}, { next: { tags: ['me'] } })

  if (meResult.isErr()) {
    console.error('[/me] Failed to fetch me:', meResult.error)
    return null
  }

  return meResult.value
}

export const getIsFollowed = async (from: User['username'], to: User['username']) => {
  await auth()

  const getIsFollowedImpl = async (page = 1) => {
    const PER_PAGE = 50
    const followedResult = await annictApiClient.getFollowing(
      { query: { filter_username: from, page, per_page: PER_PAGE } },
      { next: { tags: [`following-${from}-${to}`] } },
    )

    if (followedResult.isErr()) {
      console.error('[/users/{username}] Failed to fetch followed:', followedResult.error)
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

export const getIsFollowing = async (from: User['username'], to: User['username']) => {
  await auth()

  const getIsFollowingImpl = async (page = 1) => {
    const PER_PAGE = 50
    const followingResult = await annictApiClient.getFollowing(
      { query: { filter_username: to, page, per_page: PER_PAGE } },
      { next: { tags: [`following-${from}-${to}`] } },
    )

    if (followingResult.isErr()) {
      console.error('[/users/{username}] Failed to fetch following:', followingResult.error)
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
