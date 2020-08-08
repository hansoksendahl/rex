/** @author Hans Oksendahl */
import { NodeKeys } from './constants.ts';
import { AbstractText, TextValue } from './types.ts';

/**
 * The function `createText` is almost brutal in its simplicity it creates an
 * abstract representation of a text node. A leaf on the proverbial VDOM tree.
 * 
 * @param value 
 */
export default function createText<T extends TextValue>(
  value: T
): AbstractText<T> {
  return { type: NodeKeys.Text, value };
}