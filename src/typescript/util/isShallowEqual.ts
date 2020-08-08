import { Comparator } from './types/mod.ts';

/**
 * Check that `a` and `b` are equal.
 * 
 * @param a 
 * @param b 
 */
function areEqual(
  a: any,
  b: any,
) {
  return a === b;
}

/**
 * Check that all the top level properties of `prev` and `next` are equal.
 * 
 * @param prev 
 * @param next 
 * @param equalityCheck 
 */
export default function areParamsShallowEqual(
  prev: any[] | void,
  next: any[],
  equalityCheck: Comparator = areEqual,
) {
  if (!prev || (prev && prev.length !== next.length)) {
    return false;
  } else {
    return prev.every((prevItem, i) => equalityCheck(prevItem, next[i]));
  }
}