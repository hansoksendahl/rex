import { AbstractNode, AbstractProperties, AbstractChildren } from '../../../util/vdom/mod.ts';

export type AnyFunction<T = any> = (..._: any[]) => T;

export interface Methods {
  onEnter: AnyFunction;
  onExit: AnyFunction;
  onNext: AnyFunction;
  onInit: AnyFunction;
}

export interface MemoEntry {
  element: Element | Text;
  node: AbstractNode | AbstractChildren,
}

export interface ElementWithStyle extends Element, AbstractProperties {}
