import {
  rotate,
  deg,
  c,
  h,
  s,
  AbstractNode,
  AnyObject,
  AnyComponent,
  AbstractChildren,
} from '../util/mod.ts';
import { start } from './renderer.ts';
import canvas from './canvas.ts';
import g from './g.ts';

window.addEventListener('DOMContentLoaded', () => {
  start(document.getElementById('app')!, c(canvas, c(g)));
})

// import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.60/index.js'

// window.addEventListener('DOMContentLoaded', () => {
//   //@ts-ignore
//   let el = window.document.getElementById('app')
//   ReactDOM.hydrate(<div>test</div>, el)
// })
