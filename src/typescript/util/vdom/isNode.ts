/** @author Hans Oksendahl */

import { AbstractNode } from "./types.ts";
import isComponent from "./isComponent.ts";
import isText from "./isText.ts";
import isElement from "./isElement.ts";

export default function isNode(
  node: any,
): node is AbstractNode {
  return (
    isComponent(node) ||
    isElement(node) ||
    isText(node)
  );
}