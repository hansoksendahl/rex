/** @author Hans Oksendahl */
import { TextValue } from '../types.ts';

const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';

export default function isTextValue(
  node: any,
): node is TextValue {
  const type = typeof node;

  return type === TYPE_STRING || type === TYPE_NUMBER;
}