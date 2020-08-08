/** @author Hans Oksendahl */

import { NodeKeys } from './constants.ts';
import { AbstractNode, AbstractText } from './types.ts';

/**
 * Return whether an abstract node is of the type text
 * @param item 
 */
export default function isText(
  item: AbstractNode,
): item is AbstractText {
  return item.type === NodeKeys.Text;
}
