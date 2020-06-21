/** @author Hans Oksendahl */
import { NodeKeys } from './constants.ts';
import {
  AbstractComponent,
  AbstractFunction,
  AnyComponent,
  ComponentProperties,
  AnyBareComponent,
} from './types.ts';
import processParams from './processParams.ts';

export default function createComponent<
  T extends AnyBareComponent
>(
  component: T
): AbstractFunction<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  properties: ComponentProperties<T>
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  children: ComponentProperties<T>['children'],
): AbstractComponent<T>;
export default function createComponent<
  T extends AnyComponent,
>(
  component: T,
  properties: Omit<ComponentProperties<T>, 'children'>,
  children: ComponentProperties<T>['children'],
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
