/** @author Hans Oksendahl */
import { NodeKeys } from './constants.ts';
import {
  AbstractComponent,
  AnyComponent,
  ComponentProperties,
  AnyBareComponent,
  AbstractChildren,
} from './types.ts';
import processParams from './processParams.ts';

export default function createComponent<
  T extends AnyBareComponent
>(
  component: T
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  properties: Parameters<T>[0]
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  children: AbstractChildren,
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  properties: ComponentProperties<T>,
  children: AbstractChildren,
): AbstractComponent<T>;
export default function createComponent(
  component: AnyComponent,
  ...params: any[]
) {
  const node: AbstractComponent<typeof component> = {
    type: NodeKeys.Component,
    component,
  };

  processParams(params, node);

  return node;
}
