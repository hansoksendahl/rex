import { AnyFunction } from "./types/mod.ts";


export type Measurement = {
  type: Measurements,
  magnitude: number,
  toString: AnyFunction,
}

export enum Measurements {
  Turn = 'turn',
  Deg = 'deg',
  Rad = 'rad',
  Grad = 'grad',
  Percent = '%',
  Px = 'px',
  Em = 'em',
  Rem = 'rem',
}

export function createMeasurement(
  type: Measurements,
  magnitude: number,
) {
  return {
    type,
    magnitude,
    toString: () => `${magnitude}${type}`
  }
}

export function em(
  magnitude: number,
) {
  return createMeasurement(Measurements.Em, magnitude)
}

export function rem(
  magnitude: number,
) {
  return createMeasurement(Measurements.Rem, magnitude);
}

export function px(
  magnitude: number,
) {
  return createMeasurement(Measurements.Px, magnitude);
}

export function percent(
  magnitude: number,
) {
  return createMeasurement(Measurements.Percent, magnitude);
}

export function turn(
  magnitude: number,
) {
  return createMeasurement(Measurements.Turn, magnitude);
}

export function deg(
  magnitude: number,
) {
  return createMeasurement(Measurements.Deg, magnitude);
}

export function rad(
  magnitude: number,
) {
  return createMeasurement(Measurements.Rad, magnitude);
}

export function grad(
  magnitude: number,
) {
  return createMeasurement(Measurements.Grad, magnitude);
}
