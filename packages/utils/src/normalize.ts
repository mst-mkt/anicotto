export const emptyToNull = (value: string | undefined | null): string | null => {
  if (value?.length === 0) return null
  return value ?? null
}

export const parseIntOrNull = (value: string | undefined | null): number | null => {
  const v = emptyToNull(value)
  if (v === null) return null
  const num = Number.parseInt(v, 10)
  return Number.isNaN(num) ? null : num
}
