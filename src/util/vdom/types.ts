import { AnyFunction } from '../types.ts';
import { NodeKeys, Namespace } from './constants.ts';

// Generics

export type AnyObject = { [_: string]: any };

// Text

export type TextValue = string | number;

export interface AbstractText<T extends TextValue = TextValue> {
  type: NodeKeys.Text,
  value: T,
  toString(): T,
}

// Element

export type HTMLTags =
  | 'a'
  | 'abbr'
  | 'acronym'
  | 'address'
  | 'applet'
  | 'area'
  | 'article'
  | 'aside'
  | 'audio'
  | 'b'
  | 'base'
  | 'basefont'
  | 'bdi'
  | 'bdo'
  | 'big'
  | 'blockquote'
  | 'body'
  | 'br'
  | 'button'
  | 'canvas'
  | 'caption'
  | 'center'
  | 'cite'
  | 'code'
  | 'col'
  | 'colgroup'
  | 'data'
  | 'datalist'
  | 'dd'
  | 'del'
  | 'details'
  | 'dfn'
  | 'dialog'
  | 'dir'
  | 'div'
  | 'dl'
  | 'dt'
  | 'em'
  | 'embed'
  | 'fieldset'
  | 'figcaption'
  | 'figure'
  | 'font'
  | 'footer'
  | 'form'
  | 'frame'
  | 'frameset'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'head'
  | 'header'
  | 'hr'
  | 'html'
  | 'i'
  | 'iframe'
  | 'img'
  | 'input'
  | 'ins'
  | 'kbd'
  | 'label'
  | 'legend'
  | 'li'
  | 'link'
  | 'main'
  | 'map'
  | 'mark'
  | 'meta'
  | 'meter'
  | 'nav'
  | 'noframes'
  | 'noscript'
  | 'object'
  | 'ol'
  | 'optgroup'
  | 'option'
  | 'output'
  | 'p'
  | 'param'
  | 'picture'
  | 'pre'
  | 'progress'
  | 'q'
  | 'rp'
  | 'rt'
  | 'ruby'
  | 's'
  | 'samp'
  | 'script'
  | 'section'
  | 'select'
  | 'small'
  | 'source'
  | 'span'
  | 'strike'
  | 'strong'
  | 'style'
  | 'sub'
  | 'summary'
  | 'sup'
  | 'svg'
  | 'table'
  | 'tbody'
  | 'td'
  | 'template'
  | 'textarea'
  | 'tfoot'
  | 'th'
  | 'thead'
  | 'time'
  | 'title'
  | 'tr'
  | 'track'
  | 'tt'
  | 'u'
  | 'ul'
  | 'var'
  | 'video'
  | 'wbr';

export type SVGTags =
  | 'animateMotion'
  | 'animateTransform'
  | 'circle'
  | 'clipPath'
  | 'color-profile'
  | 'defs'
  | 'desc'
  | 'discard'
  | 'ellipse'
  | 'feBlend'
  | 'feColorMatrix'
  | 'feComponentTransfer'
  | 'feComposite'
  | 'feConvolveMatrix'
  | 'feDiffuseLighting'
  | 'feDisplacementMap'
  | 'feDistantLight'
  | 'feDropShadow'
  | 'feFlood'
  | 'feFuncA'
  | 'feFuncB'
  | 'feFuncG'
  | 'feFuncR'
  | 'feGaussianBlur'
  | 'feImage'
  | 'feMerge'
  | 'feMergeNode'
  | 'feMorphology'
  | 'feOffset'
  | 'fePointLight'
  | 'feSpecularLighting'
  | 'feSpotLight'
  | 'feTile'
  | 'feTurbulence'
  | 'filter'
  | 'foreignObject'
  | 'g'
  | 'hatch'
  | 'hatchpath'
  | 'image'
  | 'line'
  | 'linearGradient'
  | 'marker'
  | 'mask'
  | 'mesh'
  | 'meshgradient'
  | 'meshpatch'
  | 'meshrow'
  | 'metadata'
  | 'mpath'
  | 'path'
  | 'pattern'
  | 'polygon'
  | 'polyline'
  | 'radialGradient'
  | 'rect'
  | 'script'
  | 'set'
  | 'solidcolor'
  | 'stop'
  | 'style'
  | 'svg'
  | 'switch'
  | 'symbol'
  | 'text'
  | 'textPath'
  | 'title'
  | 'tspan'
  | 'unknown'
  | 'use'
  | 'view';

export type AbstractProperties = AnyObject & {
  style?: AnyObject;
}

export type AbstractNode =
  | AbstractText
  | AbstractElement
  | AbstractComponent;

export type AbstractChildren = AbstractNode[];

export interface AbstractTag<
  T extends Namespace = Namespace,
  U extends string = string,
> {
  type: NodeKeys.Element,
  namespace: T,
  tag: U,
  toString(): string,
}

export type AbstractElement<
  T extends Namespace = Namespace,
  U extends string = string,
> = AbstractTag<T, U> & {
  properties?: AbstractProperties,
  children?: AbstractChildren,
};

// Component

export type AnyBareComponent =
  () => AbstractNode;

export type AnyPropComponent =
  (properties: AnyObject) => AbstractNode;

export type AnyComponent<T extends AnyFunction = AnyFunction> =
  T extends AnyBareComponent ? T : AnyPropComponent;

export type ComponentProperties<T extends AnyPropComponent> = Parameters<T>[0];

export interface AbstractFunction<
  T extends AnyComponent = AnyComponent
> {
  type: NodeKeys.Component,
  component: T,
}

export type AbstractComponent<
  T extends AnyPropComponent = AnyPropComponent,
> = AbstractFunction<T> & {
  properties?: ComponentProperties<T>;
  children?: ComponentProperties<T>['children'];
}
