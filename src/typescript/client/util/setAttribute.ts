export default function setAttribute(
  ns: string,
  element: Element,
  name: string,
  value: any,
) {
  return element.setAttributeNS(null, name, value);
}