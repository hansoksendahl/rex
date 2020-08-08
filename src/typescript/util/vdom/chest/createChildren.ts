/** @author Hans Oksendahl */
import createText from '../createText.ts';
import { AbstractNode, TextValue } from '../types.ts';
import isTextValue from './isTextValue.ts'
import isNode from '../isNode.ts';

export default function(
  nodes: TextValue | AbstractNode | Array<AbstractNode | TextValue>,
) {
  if (!nodes) {
    return [];
  } else if(isTextValue(nodes)) {
    return [createText(nodes)];
  } else if (isNode(nodes)) {
    return [nodes];
  } else {
    const children = [];

    for (const node of nodes) {
      const child = isTextValue(node)
        ? createText(node)
        : node;

      children.push(child);
    }

    return children;
  }
}