/** @author Hans Oksendahl */
import createWhich from './createWhich.ts';
import {
  AnyFunction,
  AnyObject,
  WithFallback,
  AnyKey,
  Keys,
} from './types/mod.ts';

/** A lookup table of functions */
export type Methods = AnyObject<AnyKey, AnyFunction>;

/**
 * Create a routing function.
 * 
 * @param methods
 * @param [defaultKey]
 */
export default function createRoute<T extends Methods>(
  methods: T,
): <U extends Keys<T>>(key: U, params: Parameters<T[U]>) => ReturnType<T[U]>
export default function createRoute<T extends Methods, U extends Keys<T>>(
  methods: T,
  defaultKey: U,
): <V extends AnyKey>(key: V, params: Parameters<WithFallback<T, V, U>>) => ReturnType<WithFallback<T, V, U>>
export default function createRoute<T extends Methods>(
  methods: T,
) {
  const which = createWhich(methods);

  return <U extends AnyKey>(
    key: U,
    params: Parameters<T[U]>
  ) => which(key)(...params);
}