import { describe, expect, test } from 'vitest'

import { emptyToNull, parseIntOrNull } from './normalize'

describe('emptyToNull', () => {
  test('empty string -> null', () => expect(emptyToNull('')).toBe(null))
  test('null -> null', () => expect(emptyToNull(null)).toBe(null))
  test('undefined -> null', () => expect(emptyToNull(undefined)).toBe(null))
  test('non-empty -> as is', () => expect(emptyToNull('hello')).toBe('hello'))
  test('whitespace -> as is', () => expect(emptyToNull(' ')).toBe(' '))
})

describe('parseIntOrNull', () => {
  test('"42" -> 42', () => expect(parseIntOrNull('42')).toBe(42))
  test('"-1" -> -1', () => expect(parseIntOrNull('-1')).toBe(-1))
  test('"007" -> 7', () => expect(parseIntOrNull('007')).toBe(7))
  test('"3.14" -> 3', () => expect(parseIntOrNull('3.14')).toBe(3))
  test('"abc" -> null', () => expect(parseIntOrNull('abc')).toBe(null))
  test('empty -> null', () => expect(parseIntOrNull('')).toBe(null))
  test('null -> null', () => expect(parseIntOrNull(null)).toBe(null))
  test('undefined -> null', () => expect(parseIntOrNull(undefined)).toBe(null))
})
