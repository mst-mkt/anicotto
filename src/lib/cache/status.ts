import type {
  ActivityWithThumbnail,
  ActivityWithThumbnailAndStatus,
} from '../../app/actions/api/get/activities'
import type { WorkWithThumbnail, WorkWithThumbnailAndStatus } from '../../app/actions/api/get/works'
import type { Status } from '../../schemas/annict/common'
import type { Work } from '../../schemas/annict/works'
import { annictApiClient } from '../api/annict-rest/client'
import { CACHE_TAGS } from '../cache-tag'

const workStatusCache = new Map<Work['id'], Status>()

export const getWorkStatusCache = (workId: Work['id']): Status => {
  return workStatusCache.get(workId) ?? 'no_select'
}

export const fetchAndSetWorkStatusCache = async (workIds: Work['id'][]) => {
  const uncachedIds = workIds.filter((id) => workStatusCache.get(id) === undefined)

  if (uncachedIds.length > 0) {
    const statusResult = await annictApiClient.getMyWorks(
      { query: { filter_ids: uncachedIds, per_page: uncachedIds.length } },
      { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES] } },
    )

    if (statusResult.isErr()) {
      return
    }

    for (const work of statusResult.value.works) {
      workStatusCache.set(work.id, work.status.kind)
    }
  }
}

export const withStatusWorks = async (
  works: WorkWithThumbnail[],
): Promise<WorkWithThumbnailAndStatus[]> => {
  const worksWithCachedStatus = works.map((work) => ({
    ...work,
    status: {
      kind: workStatusCache.get(work.id),
    },
  }))

  const uncachedIds = worksWithCachedStatus
    .filter((work) => work.status.kind === undefined)
    .map((work) => work.id)

  if (uncachedIds.length === 0) {
    return worksWithCachedStatus as WorkWithThumbnailAndStatus[]
  }

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: uncachedIds, per_page: uncachedIds.length } },
    { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES] } },
  )

  if (statusResult.isErr()) {
    return worksWithCachedStatus.map((work) => ({
      ...work,
      status: {
        kind: work.status.kind ?? 'no_select',
      },
    }))
  }

  for (const work of statusResult.value.works) {
    workStatusCache.set(work.id, work.status.kind)
  }

  const worksWithStatus = works.map((work) => ({
    ...work,
    status: {
      kind: workStatusCache.get(work.id) ?? 'no_select',
    },
  }))

  return worksWithStatus
}

export const withStatusWork = async (
  work: WorkWithThumbnail,
): Promise<WorkWithThumbnailAndStatus> => {
  const cachedStatus = workStatusCache.get(work.id)

  if (cachedStatus !== undefined) {
    return {
      ...work,
      status: { kind: cachedStatus },
    }
  }

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [work.id], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES] } },
  )

  if (statusResult.isErr()) {
    return {
      ...work,
      status: { kind: 'no_select' },
    }
  }

  const status = statusResult.value.works.at(0)?.status.kind

  if (status !== undefined) {
    workStatusCache.set(work.id, status)
  }

  return {
    ...work,
    status: { kind: status ?? 'no_select' },
  }
}

export const withStatusActivities = async (
  activities: ActivityWithThumbnail[],
): Promise<ActivityWithThumbnailAndStatus[]> => {
  const activitiesWithCachedStatus = activities.map((activity) => ({
    ...activity,
    work: {
      ...activity.work,
      status: {
        kind: workStatusCache.get(activity.work.id),
      },
    },
  }))

  const uncachedIds = activitiesWithCachedStatus
    .filter((activity) => activity.work.status.kind === undefined)
    .map((activity) => activity.work.id)

  if (uncachedIds.length === 0) {
    return activitiesWithCachedStatus as ActivityWithThumbnailAndStatus[]
  }

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: uncachedIds, per_page: uncachedIds.length } },
    { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES] } },
  )

  if (statusResult.isErr()) {
    return activitiesWithCachedStatus.map((activity) => ({
      ...activity,
      work: {
        ...activity.work,
        status: {
          kind: activity.work.status.kind ?? 'no_select',
        },
      },
    }))
  }

  for (const work of statusResult.value.works) {
    workStatusCache.set(work.id, work.status.kind)
  }

  const activitiesWithStatus = activities.map((activity) => ({
    ...activity,
    work: {
      ...activity.work,
      status: {
        kind: workStatusCache.get(activity.work.id) ?? 'no_select',
      },
    },
  }))

  return activitiesWithStatus
}
