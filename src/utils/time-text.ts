import { match } from 'ts-pattern'

export const timeText = (time: string | Date) => {
  const input = new Date(time)
  const now = new Date()

  const diff = now.getTime() - input.getTime()

  return match(diff)
    .when(
      (diff) => diff < 1000,
      () => 'たった今',
    )
    .when(
      (diff) => diff < 6_0000,
      () => `${Math.floor(diff / 1000)}秒前`,
    )
    .when(
      (diff) => diff < 360_0000,
      () => `${Math.floor(diff / 6_0000)}分前`,
    )
    .when(
      (diff) => diff < 8640_0000,
      () => `${Math.floor(diff / 3600_000)}時間前`,
    )
    .when(
      (diff) => diff < 6048_0000,
      () => `${Math.floor(diff / 8640_0000)}日前`,
    )
    .otherwise(() => input.toLocaleString())
}
