import {
  AbstractProperties,
  AbstractNode,
  TextValue,
} from '../mod.ts';
import { AnyComponent, ComponentProperties } from '../types.ts';

export interface VDOMProperties {
  properties?: AbstractProperties,
  children?: AnyChild,
}

export type AnyChild = AbstractNode | TextValue | Array<TextValue | AbstractNode>

export type ComponentParams<T extends AnyComponent = AnyComponent> =
  | []
  | [AnyChild]
  | [ComponentProperties<T>, AnyChild]
  | [ComponentProperties<T>];
