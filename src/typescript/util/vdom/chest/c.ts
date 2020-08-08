/** @author Hans Oksendahl */
import { createComponent, AnyComponent } from '../../../util/vdom/mod.ts';
import imbueTextValueParams from './imbueTextValueParams.ts';
import { ComponentParams } from './types.ts';

export default function createAbstractComponent<T extends AnyComponent>(
  component: T,
  ...params: ComponentParams<T>
) {
  const node = createComponent(component);

  imbueTextValueParams(params, node as object);

  return node;
}