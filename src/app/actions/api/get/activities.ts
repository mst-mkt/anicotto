'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Activity } from '../../../../schemas/annict/activities'
import type { User } from '../../../../schemas/annict/users'

export const getFollowingActivities = async (page = 1) => {
  await auth()

  const activitiesResult = await annictApiClient.getFollowingActivities(
    { query: { per_page: 20, page, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_ACTIVITY], revalidate: 60 } },
  )

  if (activitiesResult.isErr()) {
    console.error('Failed to fetch following activities:', activitiesResult.error)
    return null
  }

  return { data: activitiesResult.value.activities, next_page: activitiesResult.value.next_page }
}

export const getUserActivities = async (username: User['username'], page = 1) => {
  await auth()

  const activitiesResult = await annictApiClient.getActivities(
    { query: { filter_username: username, page, per_page: 20, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.USER_ACTIVITY(username)] } },
  )

  if (activitiesResult.isErr()) {
    console.error(`Failed to fetch user activities (${username}):`, activitiesResult.error)
    return null
  }

  return { data: activitiesResult.value.activities, next_page: activitiesResult.value.next_page }
}

export const getUserActivityCountsPerDay = async (username: User['username']) => {
  await auth()

  const currentDate = new Date()
  const lastMonthDate = new Date(
    currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
    currentDate.getDate(),
  )

  const groupByDay = (activities: Activity[]) => {
    const rangeDate = [...Array(30)].map((_, i) => {
      const date = new Date(currentDate)
      date.setUTCDate(date.getUTCDate() - i)
      return date.toISOString().split('T')[0]
    })

    return rangeDate.map((date) => {
      const activitiesByDate = activities.filter((activity) =>
        activity.created_at.startsWith(date),
      ).length

      return { date, activities: activitiesByDate }
    })
  }

  const getActivitiesImpl = async (page = 1): Promise<Activity[]> => {
    const PER_PAGE = 50
    const activitiesResult = await annictApiClient.getActivities(
      { query: { filter_username: username, page, per_page: PER_PAGE, sort_id: 'desc' } },
      { next: { tags: [CACHE_TAGS.USER_ACTIVITY(username)] } },
    )

    if (activitiesResult.isErr()) {
      return []
    }

    const activities = activitiesResult.value.activities
    const lastActivity = activities.at(-1)

    if (lastActivity === undefined || new Date(lastActivity.created_at) < lastMonthDate) {
      return activities
    }

    const nextActivities = await getActivitiesImpl(page + 1)

    return [...activities, ...nextActivities]
  }

  const activities = await getActivitiesImpl()
  const filteredActivities = activities.filter(
    (activity) => new Date(activity.created_at) > lastMonthDate,
  )

  const groupedActivities = groupByDay(filteredActivities)

  return groupedActivities
}

export const getUserActivityCountsPerAction = async (username: User['username']) => {
  await auth()

  const currentDate = new Date()
  const lastMonthDate = new Date(
    currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
    currentDate.getDate(),
  )

  const groupByAction = (activities: Activity[]) => {
    return activities.reduce(
      (acc, activity) => {
        acc[activity.action] += 1
        return acc
      },
      {
        create_record: 0,
        create_multiple_records: 0,
        create_review: 0,
        create_status: 0,
      },
    )
  }

  const getActivitiesImpl = async (page = 1): Promise<Activity[]> => {
    const PER_PAGE = 50
    const activitiesResult = await annictApiClient.getActivities(
      { query: { filter_username: username, page, per_page: PER_PAGE, sort_id: 'desc' } },
      { next: { tags: [CACHE_TAGS.USER_ACTIVITY(username)] } },
    )

    if (activitiesResult.isErr()) {
      return []
    }

    const activities = activitiesResult.value.activities
    const lastActivity = activities.at(-1)

    if (lastActivity === undefined || new Date(lastActivity.created_at) < lastMonthDate) {
      return activities
    }

    const nextActivities = await getActivitiesImpl(page + 1)

    return [...activities, ...nextActivities]
  }

  const activities = await getActivitiesImpl()
  const filteredActivities = activities.filter(
    (activity) => new Date(activity.created_at) > lastMonthDate,
  )

  const groupedActivities = groupByAction(filteredActivities)

  return groupedActivities
}
