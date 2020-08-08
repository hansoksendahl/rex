import { DiffKeys, createRoute } from '../../../util/mod.ts';
import { ElementWithStyle } from './types.ts';

function setStyle(
  element: ElementWithStyle,
  key: string,
  value: any,
) {
  element.style![key] = value;
}

function removeStyle(
  element: ElementWithStyle,
  key: string,
) {
  setStyle(element, key, null);
}

export default createRoute({
  [DiffKeys.create]: setStyle,
  [DiffKeys.remove]: removeStyle,
  [DiffKeys.update]: setStyle,
});