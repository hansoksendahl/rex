/** @author Hans Oksendahl */
import processParams from './processParams.ts';
import { NodeKeys, Namespace } from './constants.ts';
import {
  AbstractElement,
  AbstractProperties,
  AbstractChildren,
  AbstractTag,
} from './types.ts';

/**
 * Create an abstract representation of a DOM element.
 * 
 * @param namespace A namespace associated with the node
 * @param tag The named tag
 */
export default function createElement<
  T extends Namespace,
  U extends string
>(
  namespace: T,
  tag: U,
): AbstractTag<T, U>;
export default function createElement<
  T extends Namespace,
  U extends string,
  V extends AbstractProperties,
>(
  namespace: T,
  tag: U,
  properties: V,
): AbstractTag<T, U> & { properties: V }
export default function createElement<
  T extends Namespace,
  U extends string,
  V extends AbstractChildren,
>(
  namespace: T,
  tag: U,
  children: V,
): AbstractTag<T, U> & { children: AbstractChildren }
export default function createElement<
  T extends Namespace,
  U extends string,
  V extends AbstractProperties,
  W extends AbstractChildren,
>(
  namespace: T,
  tag: U,
  properties: V,
  children: W,
): AbstractTag<T, U> & { properties: V, children: AbstractChildren }
export default function createElement(
  namespace: Namespace,
  tag: string,
  ...params: any[]
) {
  const element: AbstractElement = {
    type: NodeKeys.Element,
    namespace,
    tag,
    toString() {
      const attributes = this.properties
        ? Object.keys(this.properties).reduce(
            (memo, key) => {
              const pair = `${key}="${this.properties![key]}"`;

              return `${memo} ${pair}`;
            },
            ''
          )
        : '';
      const children = this.children
        ? this.children.map(child => `${child}`)
        : '';
      
      return `<${this.tag}${attributes}>${children}</${this.tag}>`
    }
  };

  processParams(params, element);

  return element;
}
