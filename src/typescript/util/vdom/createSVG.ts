/** @author Hans Oksendahl */
import createElement from './createElement.ts';
import { SVGTags } from './types.ts';
import { Namespace } from './constants.ts';

/**
 * Create an abstract representation of an SVG element.
 * 
 * @param tag An SVG tag name
 * @param params
 */
export default function svg(
  tag: SVGTags,
  ...params: any[]
) {
  return createElement(
    Namespace.SVG,
    tag,
    ...params as [any, any]
  );
}