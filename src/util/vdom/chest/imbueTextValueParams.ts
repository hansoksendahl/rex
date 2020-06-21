import { ComponentParams, VDOMProperties } from './types.ts';

/**
 * Author: Hans Oksendahl
 */
import isTextValue from './isTextValue.ts';
import createChildren from './createChildren.ts';

/**
 * Massage the parameters to `createElement` after `tag`
 * 
 *     createElement(namespace: string, tag: string, ...params: any[])
 * 
 * Such that the following functional signatures become possible.
 * 
 *     createElement(namespace: string, tag: string, child: TextValue | AbstractNode)
 * 
 *     createElement(namespace: string, tag: string, child: Array<TextValue | AbstractNode>)
 * 
 * This is a terrible hack done on an otherwise conistent API.
 */
export default function imbueTextValueParams<T extends VDOMProperties>(
  params: ComponentParams,
  node: T,
): T {
  switch(params.length) {
    case 2: {
      const [properties, children] = params;
  
      node.properties = properties;
      node.children = createChildren(children);
      break;
    }
    case 1: {
      const [param] = params;
  
      if (Array.isArray(param) || isTextValue(param)) {
        node.children = createChildren(param);
      } else {
        node.properties = param;
      }
  
      break;
    }
  }

  return node;
}