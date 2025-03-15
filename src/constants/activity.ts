import type { Activity } from '../schemas/annict/activities'

export const ACTIVITY_TEXT = (activity: Activity) => {
  return (
    {
      create_record: '記録を追加しました',
      create_status: 'ステータスを更新しました',
      create_multiple_records:
        activity.action === 'create_multiple_records'
          ? `${activity.multiple_records.length}件の記録を追加しました`
          : '',
      create_review: 'レビューを追加しました',
    } as const satisfies Record<Activity['action'], string>
  )[activity.action]
}
