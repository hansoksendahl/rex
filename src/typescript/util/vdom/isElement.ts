/** @author Hans Oksendahl */

import { NodeKeys } from './constants.ts';
import { AbstractElement, AbstractNode } from "./types.ts";

/**
 * Return whether an abstract node is of the type element
 * @param item 
 */
export default function isElement(
  item: AbstractNode,
): item is AbstractElement {
  return item.type === NodeKeys.Element;
}