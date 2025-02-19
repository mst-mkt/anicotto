import type { UserRecord } from './get-records'

export type GroupedRecords = Omit<UserRecord, 'episode' | 'comment' | 'rating'> & {
  records: {
    id: UserRecord['id']
    episode: UserRecord['episode']
    comment: UserRecord['comment']
    rating: UserRecord['rating']
  }[]
}

export const groupRecords = (records: UserRecord[]) => {
  return records.reduce((acc, record) => {
    const lastGroup = acc.at(-1)

    if (lastGroup !== undefined && lastGroup.work.id === record.work.id) {
      acc.pop()
      acc.push({
        ...lastGroup,
        records: [
          ...lastGroup.records,
          {
            id: record.id,
            episode: record.episode,
            comment: record.comment,
            rating: record.rating,
          },
        ],
      })

      return acc
    }

    acc.push({
      ...record,
      records: [
        {
          id: record.id,
          episode: record.episode,
          comment: record.comment,
          rating: record.rating,
        },
      ],
    })

    return acc
  }, [] as GroupedRecords[])
}
