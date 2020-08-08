/** @author Hans Oksendahl */

import AnyKey from './AnyKey.ts';

/** Generic Object */
export type AnyObject<
  A extends AnyKey = AnyKey,
  B extends any = any,
> = { [_ in A]: B };

export type Keys<
  A extends AnyObject
> = keyof A;

export type Values<
  A extends AnyObject,
> = A extends AnyObject<Keys<A>, infer U> ? U : never;

export type Lookup<
  A extends AnyObject,
  B extends AnyKey,
> = A[B];

export type WithFallback<
  T extends AnyObject,
  U extends AnyKey,
  V extends Keys<T>,
> = U extends keyof T ? Lookup<T, U> : Lookup<T, V>;
