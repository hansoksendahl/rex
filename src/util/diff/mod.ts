/** @author Hans Oksendahl */
import { Action, DiffKeys } from './types.ts';
import createKeyAction from './createKeyAction.ts';

export { Action, DiffKeys };

/**
 * 
 * @param previous The previous tree
 * @param current The current tree
 * @param overrideKeys Some keys to you know... override stuff.
 */
export default function diff<
  T extends object,
  U extends object,
  V extends string[],
>(
  previous: T,
  current: U,
  overrideKeys?: V,
) {
  const changes: Action[] = [];
  let keys: Set<string>;

  if (!overrideKeys) {
    keys = new Set([
      ...Object.keys(previous || []),
      ...Object.keys(current || []),
    ]);
  } else {
    keys = new Set(overrideKeys);
  }

  for (let key of keys) {
    const previousValue = previous
      ? previous[key]
      : void 0;
    const previousHasKey = previousValue !== void 0;
    const currentValue = current
      ? current[key]
      : void 0;
    const currentHasKey = currentValue !== void 0;

    if (previousHasKey && !currentHasKey) {
      changes.push(createKeyAction(DiffKeys.remove, key, previousValue));
    } else if (!previousHasKey && currentHasKey) {
      changes.push(createKeyAction(DiffKeys.create, key, currentValue));
    } else if (previousValue !== currentValue) {
      changes.push(createKeyAction(DiffKeys.update, key, currentValue));
    }
  }

  return changes.length > 0 ? changes : null;
}
