/** @author Hans Oksendahl */
import {
  AnyKey,
  AnyObject,
  Keys,
  WithFallback,
} from './types/mod.ts';

/**
 * A `which` is like a `switch` statement that uses object lookups.
 * 
 * Unlike a `switch` statement in a function the return result of a `which` is
 * deterministic preserving type information.
 * 
 * @param {object} ref
 * @param {string} [defaultKey]
 */
export default function createWhich<T extends AnyObject>(
  ref: T,
): <U extends keyof T>(key: U) => T[U]
export default function createWhich<T extends AnyObject, U extends Keys<T>>(
  ref: T,
  defaultKey: U,
): <V extends AnyKey>(key?: V) => WithFallback<T, V, U>
export default function createWhich<T extends AnyObject>(
  ref: T,
  defaultKey?: Keys<T>,
): any {
  return (
    key: AnyKey
  ) => (
    defaultKey
      ? ref[key as Keys<T>] || defaultKey && ref[defaultKey]
      : ref[key as Keys<T>]
  );
}

