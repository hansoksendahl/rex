import { AnyChild } from "../util/mod.ts";
import { useState } from './renderer.ts';
import { s } from '../util/mod.ts';

interface CanvasProps {
  children: AnyChild
  setDimensions(_: [number, number]): void,
}

export default function canvas({
  children,
  setDimensions,
}: CanvasProps) {
  const [ref, setRef] = useState(null);

  return s.svg(
    {
      _: setRef,
      width: ref && ref.clientWidth || 0,
      height: ref && ref.clientHeight || 0,
      style: {
        width: '100%',
        height: '100%',
      }
    },
    children,
  )
}