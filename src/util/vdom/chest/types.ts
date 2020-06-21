import {
  AbstractProperties,
  AbstractNode,
  TextValue,
} from '../mod.ts';

export interface VDOMProperties {
  properties?: AbstractProperties,
  children?: AnyChild,
}

export type AnyChild = TextValue | Array<TextValue | AbstractNode>

export type ComponentParams =
  | []
  | [AnyChild]
  | [AbstractProperties, AnyChild]
  | [AbstractProperties];
