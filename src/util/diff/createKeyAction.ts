import { DiffKeys } from './types.ts';

export default function createKeyAction<
  T extends DiffKeys,
  U extends string,
  V extends any
>(
  type: T,
  key: U,
  value: V,
) {
  return {
    type,
    key,
    value
  };
};