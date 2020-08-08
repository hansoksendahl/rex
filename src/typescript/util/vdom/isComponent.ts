/** @author Hans Oksendahl */

import { NodeKeys } from "./constants.ts";
import { AbstractComponent, AbstractNode } from "./types.ts";

/**
 * Return whether an abstract node is of the type component
 * @param item 
 */
export default function isComponent(
  item: AbstractNode,
): item is AbstractComponent {
  return item.type === NodeKeys.Component;
}