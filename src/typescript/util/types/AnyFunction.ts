/** @author Hans Oksendahl */

/** Generic Function */
export type AnyFunction<
  A extends any[] = any[],
  B = any,
> = (..._: A) => B;

export type Params<
  A extends AnyFunction,
> = A extends AnyFunction<infer U> ? U : never;

export type Return<
  A extends AnyFunction,
> = A extends AnyFunction<any[], infer U> ? U : never;

export type Comparator = (prev: any, next: any) => boolean;