/**
 * Remove an attribute
 * @param ns 
 * @param element 
 * @param name 
 */
export default function removeAttribute(
  ns: string,
  element: Element,
  name: string,
) {
  return element.removeAttributeNS(ns, name);
}