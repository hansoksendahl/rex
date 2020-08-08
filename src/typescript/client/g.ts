import { AnyChild, TextValue } from "../util/mod.ts";
import { useState } from './renderer.ts';
import { s } from '../util/mod.ts';

interface GProps {
  children: AnyChild;
  size: [number, number];
  origin?: [number, number];
  position?: [number, number];
  rotate?: TextValue;
}

export default function g({
  children,
  size = [2, 2],
  origin = [0, 0],
  position = [0, 0],
}: GProps) {
  const [width, height] = size;
  const [originX, originY] = origin;
  const [positionX, positionY] = position;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = originX - halfWidth + positionX;
  const y = originY - halfHeight + positionY;

  return s.g(
    {
      style: {
        width: width,
        height: height,
        x: x,
        y: y,
      },
    },
    children,
  )
}