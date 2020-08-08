import { D } from './constants.ts';

/**
 * Create a namespaced DOM element.
 * @param ns 
 * @param name 
 * @param options 
 */
export default function createElement(
  ns: string,
  name: string,
  options?: object,
): Element {
  return D.createElementNS(ns, name, options);
};
