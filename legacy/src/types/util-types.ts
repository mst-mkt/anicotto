export type UnPromise<T> = T extends Promise<infer U> ? U : T
export type UnNullable<T> = T extends null | undefined ? never : T
