import { match } from 'ts-pattern'
import type { Activity } from '../../schemas/annict/activities'
import type { Status } from '../../schemas/annict/common'
import type { Episode } from '../../schemas/annict/episodes'
import type { Record } from '../../schemas/annict/records'
import type { Review } from '../../schemas/annict/reviews'
import type { User } from '../../schemas/annict/users'
import type { ActivityWithThumbnail } from '../actions/api/get/activities'
import type { WorkWithThumbnail } from '../actions/api/get/works'

export type GroupedActivity =
  | {
      id: Activity['id']
      action: 'create_records'
      user: User
      created_at: string
      works: {
        work: WorkWithThumbnail
        records: {
          episode: Episode
          record: Record
        }[]
      }[]
    }
  | {
      id: Activity['id']
      action: 'create_reviews'
      user: User
      created_at: string
      works: {
        work: WorkWithThumbnail
        reviews: Review[]
      }[]
    }
  | {
      id: Activity['id']
      action: 'create_status'
      user: User
      created_at: string
      works: {
        work: WorkWithThumbnail
        status: Status
      }[]
    }

export const groupActivity = (activities: ActivityWithThumbnail[]) =>
  activities.reduce((acc: GroupedActivity[], activity) => {
    const lastActivity = acc.at(-1)

    const shouldGroup =
      lastActivity !== undefined &&
      lastActivity.user.id === activity.user.id &&
      [
        lastActivity.action === 'create_records' && activity.action === 'create_record',
        lastActivity.action === 'create_reviews' && activity.action === 'create_review',
        lastActivity.action === 'create_status' && activity.action === 'create_status',
      ].some(Boolean)

    if (!shouldGroup) {
      return acc.concat(
        match(activity)
          .returnType<GroupedActivity[]>()
          .with({ action: 'create_record' }, (act) => [
            {
              id: act.id,
              action: 'create_records',
              user: act.user,
              created_at: act.created_at,
              works: [
                {
                  work: act.work,
                  records: [
                    {
                      episode: act.episode,
                      record: act.record,
                    },
                  ],
                },
              ],
            },
          ])
          .with({ action: 'create_multiple_records' }, (act) => [
            {
              id: act.id,
              action: 'create_records',
              user: act.user,
              created_at: act.created_at,
              works: [
                {
                  work: act.work,
                  records: act.multiple_records.map((mr) => ({
                    episode: mr.episode,
                    record: mr.record,
                  })),
                },
              ],
            },
          ])
          .with({ action: 'create_review' }, (act) => [
            {
              id: act.id,
              action: 'create_reviews',
              user: act.user,
              created_at: act.created_at,
              works: [
                {
                  work: act.work,
                  reviews: [act.review],
                },
              ],
            },
          ])
          .with({ action: 'create_status' }, (act) => [
            {
              id: act.id,
              action: 'create_status',
              user: act.user,
              created_at: act.created_at,
              works: [
                {
                  work: act.work,
                  status: act.status.kind,
                },
              ],
            },
          ])
          .exhaustive(),
      )
    }

    return match([activity, lastActivity])
      .returnType<GroupedActivity[]>()
      .with([{ action: 'create_record' }, { action: 'create_records' }], ([act, lastAct]) => [
        ...acc.slice(0, -1),
        {
          ...lastAct,
          works:
            act.work.id === lastAct.works.at(-1)?.work.id
              ? lastAct.works.slice(0, -1).concat([
                  {
                    work: act.work,
                    records: (lastAct.works.at(-1)?.records ?? []).concat([
                      {
                        episode: act.episode,
                        record: act.record,
                      },
                    ]),
                  },
                ])
              : lastAct.works.concat([
                  {
                    work: act.work,
                    records: [
                      {
                        episode: act.episode,
                        record: act.record,
                      },
                    ],
                  },
                ]),
        },
      ])
      .with(
        [{ action: 'create_multiple_records' }, { action: 'create_records' }],
        ([act, lastAct]) => [
          ...acc.slice(0, -1),
          {
            ...lastAct,
            works:
              act.work.id === lastAct.works.at(-1)?.work.id
                ? lastAct.works.slice(0, -1).concat([
                    {
                      work: act.work,
                      records: (lastAct.works.at(-1)?.records ?? []).concat(
                        act.multiple_records.map((mr) => ({
                          episode: mr.episode,
                          record: mr.record,
                        })),
                      ),
                    },
                  ])
                : lastAct.works.concat([
                    {
                      work: act.work,
                      records: act.multiple_records.map((mr) => ({
                        episode: mr.episode,
                        record: mr.record,
                      })),
                    },
                  ]),
          },
        ],
      )
      .with([{ action: 'create_review' }, { action: 'create_reviews' }], ([act, lastAct]) => [
        ...acc.slice(0, -1),
        {
          ...lastAct,
          works:
            act.work.id === lastAct.works.at(-1)?.work.id
              ? lastAct.works.slice(0, -1).concat([
                  {
                    work: act.work,
                    reviews: (lastAct.works.at(-1)?.reviews ?? []).concat([act.review]),
                  },
                ])
              : lastAct.works.concat([
                  {
                    work: act.work,
                    reviews: [act.review],
                  },
                ]),
        },
      ])
      .with([{ action: 'create_status' }, { action: 'create_status' }], ([act, lastAct]) => [
        ...acc.slice(0, -1),
        {
          ...lastAct,
          works:
            act.work.id === lastAct.works.at(-1)?.work.id
              ? lastAct.works.slice(0, -1).concat([
                  {
                    work: act.work,
                    status: act.status.kind,
                  },
                ])
              : lastAct.works.concat([
                  {
                    work: act.work,
                    status: act.status.kind,
                  },
                ]),
        },
      ])
      .otherwise(() => [])
  }, [])
