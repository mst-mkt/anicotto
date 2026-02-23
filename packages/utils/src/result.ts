export type Ok<T> = { readonly ok: true; readonly value: T }
export type Err<E> = { readonly ok: false; readonly error: E }
export type Result<T, E> = Ok<T> | Err<E>

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value })

export const err = <E>(error: E): Err<E> => ({ ok: false, error })

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.ok

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => !result.ok

export const match = <T, E, U>(
  result: Result<T, E>,
  onOk: (value: T) => U,
  onErr: (error: E) => U,
): U => (result.ok ? onOk(result.value) : onErr(result.error))

export const map = <T, E, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> =>
  result.ok ? ok(fn(result.value)) : result

export const mapErr = <T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> =>
  result.ok ? result : err(fn(result.error))

export const andThen = <T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> => (result.ok ? fn(result.value) : result)

export const fromPromise = async <T, E>(
  promise: Promise<T>,
  mapError: (error: unknown) => E,
): Promise<Result<T, E>> => {
  try {
    return ok(await promise)
  } catch (error) {
    return err(mapError(error))
  }
}

export const tryCatch = <T, E>(fn: () => T, mapError: (error: unknown) => E): Result<T, E> => {
  try {
    return ok(fn())
  } catch (error) {
    return err(mapError(error))
  }
}
