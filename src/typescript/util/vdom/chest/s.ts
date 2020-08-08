/** @author Hans Oksendahl */
import { createSVG, SVGTags } from '../mod.ts';
import imbueTextValueParams from './imbueTextValueParams.ts';
import { ComponentParams } from './types.ts';

/**
 * Create an abstract SVG element
 * @param tag
 */
function createAbstractSVG<T extends SVGTags>(
  tag: T
) {
  return (...params: ComponentParams) => {
    const node = createSVG(tag);
    
    imbueTextValueParams(params, node);

    return node;
  };
}

export default {
  animateMotion: createAbstractSVG('animateMotion'),
  animateTransform: createAbstractSVG('animateTransform'),
  circle: createAbstractSVG('circle'),
  clipPath: createAbstractSVG('clipPath'),
  colorProfile: createAbstractSVG('color-profile'),
  defs: createAbstractSVG('defs'),
  desc: createAbstractSVG('desc'),
  discard: createAbstractSVG('discard'),
  ellipse: createAbstractSVG('ellipse'),
  feBlend: createAbstractSVG('feBlend'),
  feColorMatrix: createAbstractSVG('feColorMatrix'),
  feComponentTransfer: createAbstractSVG('feComponentTransfer'),
  feComposite: createAbstractSVG('feComposite'),
  feConvolveMatrix: createAbstractSVG('feConvolveMatrix'),
  feDiffuseLighting: createAbstractSVG('feDiffuseLighting'),
  feDisplacementMap: createAbstractSVG('feDisplacementMap'),
  feDistantLight: createAbstractSVG('feDistantLight'),
  feDropShadow: createAbstractSVG('feDropShadow'),
  feFlood: createAbstractSVG('feFlood'),
  feFuncA: createAbstractSVG('feFuncA'),
  feFuncB: createAbstractSVG('feFuncB'),
  feFuncG: createAbstractSVG('feFuncG'),
  feFuncR: createAbstractSVG('feFuncR'),
  feGaussianBlur: createAbstractSVG('feGaussianBlur'),
  feImage: createAbstractSVG('feImage'),
  feMerge: createAbstractSVG('feMerge'),
  feMergeNode: createAbstractSVG('feMergeNode'),
  feMorphology: createAbstractSVG('feMorphology'),
  feOffset: createAbstractSVG('feOffset'),
  fePointLight: createAbstractSVG('fePointLight'),
  feSpecularLighting: createAbstractSVG('feSpecularLighting'),
  feSpotLight: createAbstractSVG('feSpotLight'),
  feTile: createAbstractSVG('feTile'),
  feTurbulence: createAbstractSVG('feTurbulence'),
  filter: createAbstractSVG('filter'),
  foreignObject: createAbstractSVG('foreignObject'),
  g: createAbstractSVG('g'),
  hatch: createAbstractSVG('hatch'),
  hatchpath: createAbstractSVG('hatchpath'),
  image: createAbstractSVG('image'),
  line: createAbstractSVG('line'),
  linearGradient: createAbstractSVG('linearGradient'),
  marker: createAbstractSVG('marker'),
  mask: createAbstractSVG('mask'),
  mesh: createAbstractSVG('mesh'),
  meshgradient: createAbstractSVG('meshgradient'),
  meshpatch: createAbstractSVG('meshpatch'),
  meshrow: createAbstractSVG('meshrow'),
  metadata: createAbstractSVG('metadata'),
  mpath: createAbstractSVG('mpath'),
  path: createAbstractSVG('path'),
  pattern: createAbstractSVG('pattern'),
  polygon: createAbstractSVG('polygon'),
  polyline: createAbstractSVG('polyline'),
  radialGradient: createAbstractSVG('radialGradient'),
  rect: createAbstractSVG('rect'),
  script: createAbstractSVG('script'),
  set: createAbstractSVG('set'),
  solidcolor: createAbstractSVG('solidcolor'),
  stop: createAbstractSVG('stop'),
  style: createAbstractSVG('style'),
  svg: createAbstractSVG('svg'),
  switch: createAbstractSVG('switch'),
  symbol: createAbstractSVG('symbol'),
  text: createAbstractSVG('text'),
  textPath: createAbstractSVG('textPath'),
  title: createAbstractSVG('title'),
  tspan: createAbstractSVG('tspan'),
  unknown: createAbstractSVG('unknown'),
  use: createAbstractSVG('use'),
  view: createAbstractSVG('view'),
};