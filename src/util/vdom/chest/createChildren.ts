/** @author Hans Oksendahl */
import createText from '../createText.ts';
import { AbstractNode, TextValue } from '../types.ts';
import isTextValue from './isTextValue.ts'

export default function(
  nodes: TextValue | Array<AbstractNode | TextValue>,
) {
  if (isTextValue(nodes)) {
    return [createText(nodes)];
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