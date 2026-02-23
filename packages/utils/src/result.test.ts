import { describe, expect, test } from 'vitest'

import {
  type Result,
  andThen,
  err,
  fromPromise,
  isErr,
  isOk,
  map,
  mapErr,
  match,
  ok,
  tryCatch,
} from './result'

describe('ok', () => {
  test('creates an Ok result', () => {
    const result = ok(42)

    expect(result).toStrictEqual({ ok: true, value: 42 })
  })
})

describe('err', () => {
  test('creates an Err result', () => {
    const result = err('failure')

    expect(result).toStrictEqual({ ok: false, error: 'failure' })
  })
})

describe('isOk', () => {
  test('returns true for Ok', () => {
    const input = ok(1)

    const result = isOk(input)

    expect(result).toBe(true)
  })

  test('returns false for Err', () => {
    const input = err('e')

    const result = isOk(input)

    expect(result).toBe(false)
  })
})

describe('isErr', () => {
  test('returns true for Err', () => {
    const input = err('e')

    const result = isErr(input)

    expect(result).toBe(true)
  })

  test('returns false for Ok', () => {
    const input = ok(1)

    const result = isErr(input)

    expect(result).toBe(false)
  })
})

describe('match', () => {
  test('calls onOk for Ok', () => {
    const input = ok(10)

    const result = match(
      input,
      (v) => v * 2,
      () => -1,
    )

    expect(result).toBe(20)
  })

  test('calls onErr for Err', () => {
    const input: Result<number, string> = err('bad')

    const result = match(
      input,
      (v) => `value: ${v}`,
      (e) => `error: ${e}`,
    )

    expect(result).toBe('error: bad')
  })
})

describe('map', () => {
  test('transforms the value of Ok', () => {
    const input = ok(5)

    const result = map(input, (v) => v.toString())

    expect(result).toStrictEqual(ok('5'))
  })

  test('passes through Err unchanged', () => {
    const input = err('fail')

    const result = map(input, (v: number) => v * 2)

    expect(result).toBe(input)
  })
})

describe('mapErr', () => {
  test('transforms the error of Err', () => {
    const input = err('bad')

    const result = mapErr(input, (e) => ({ message: e }))

    expect(result).toStrictEqual(err({ message: 'bad' }))
  })

  test('passes through Ok unchanged', () => {
    const input = ok(42)

    const result = mapErr(input, (e: string) => ({ message: e }))

    expect(result).toBe(input)
  })
})

describe('andThen', () => {
  const parsePositive = (n: number) => (n > 0 ? ok(n) : err('not positive' as const))

  test('chains Ok into another Result', () => {
    const input = ok(5)

    const result = andThen(input, parsePositive)

    expect(result).toStrictEqual(ok(5))
  })

  test('chains Ok into Err when fn fails', () => {
    const input = ok(-1)

    const result = andThen(input, parsePositive)

    expect(result).toStrictEqual(err('not positive'))
  })

  test('passes through Err without calling fn', () => {
    const input = err('initial error')

    const result = andThen(input, parsePositive)

    expect(result).toBe(input)
  })
})

describe('fromPromise', () => {
  test('wraps resolved promise as Ok', async () => {
    const promise = Promise.resolve(42)

    const result = await fromPromise(promise, () => 'fail')

    expect(result).toStrictEqual(ok(42))
  })

  test('wraps rejected promise as Err', async () => {
    const promise = Promise.reject(new Error('boom'))

    const result = await fromPromise(promise, (e) => (e as Error).message)

    expect(result).toStrictEqual(err('boom'))
  })
})

describe('tryCatch', () => {
  test('wraps successful fn as Ok', () => {
    const fn = () => JSON.parse('{"a":1}')

    const result = tryCatch(fn, () => 'parse error')

    expect(result).toStrictEqual(ok({ a: 1 }))
  })

  test('wraps throwing fn as Err', () => {
    const fn = () => JSON.parse('invalid')

    const result = tryCatch(fn, () => 'parse error')

    expect(result).toStrictEqual(err('parse error'))
  })
})
