import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Activity } from '../../../../schemas/annict/activities'
import type { User } from '../../../../schemas/annict/users'

const groupByDate = (activities: Activity[]) => {
  const currentDate = new Date()
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

export const getActivitiesPerDate = async (username: User['username']) => {
  await auth()

  const currentDate = new Date()
  const lastMonthDate = new Date(
    currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
    currentDate.getDate(),
  )

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
  const groupedActivities = groupByDate(filteredActivities)

  return groupedActivities
}

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

export const getActivitiesPerAction = async (username: User['username']) => {
  await auth()

  const currentDate = new Date()
  const lastMonthDate = new Date(
    currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
    currentDate.getDate(),
  )

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
