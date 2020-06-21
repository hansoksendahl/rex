/** @author Hans Oksendahl */
import createElement from './createElement.ts';
import { HTMLTags } from './types.ts';
import { Namespace } from './constants.ts';

/**
 * Create an abstract representation of an HTML element.
 * 
 * @param tag An HTML tag name
 * @param params 
 */
export default function html(
  tag: HTMLTags,
  ...params: any[]
) {
  return createElement(
    Namespace.HTML,
    tag,
    ...params as [any, any]
  );
}
