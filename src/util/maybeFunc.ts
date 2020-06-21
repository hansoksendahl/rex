/** @author Hans Oksendahl */
import { isFunction } from './runTypes/mod.ts';
type AnyFunction<A = any> = (..._: any[]) => A;

type MaybeParameters<A> = A extends AnyFunction ? Parameters<A> : [];

type MaybeReturn<A> = A extends AnyFunction ? ReturnType<A> : A;

export default function maybeFunc<A>(
  maybeFunc: A,
  ...params: MaybeParameters<A>
): MaybeReturn<A> {
  return typeof maybeFunc === 'function'
    ? maybeFunc(...params)
    : maybeFunc;
}
