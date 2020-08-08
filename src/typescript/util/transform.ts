import { Measurement } from './measurement.ts';

export enum Transforms {
  Matrix = 'matrix',
  Rotate = 'rotate',
  Scale = 'scale',
  ScaleX = 'scaleX',
  ScaleY = 'scaleY',
  Translate = 'translate',
  TranslateX = 'translateX',
  TranslateY = 'translateY',
}

export function createTransformType(
  type: Transforms,
  ...measurements: (Measurement | number)[]
) {
  return {
    type,
    measurements,
    toString: () => `${type}(${measurements.join(', ')})`
  }
}

export function matrix(
  ...measurement: number[]
) {
  return createTransformType(Transforms.Matrix, ...measurement)
}

export function rotate(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.Rotate, ...measurement)
}

export function scale(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.Scale, ...measurement);
}

export function scaleX(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.ScaleX, ...measurement);
}

export function scaleY(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.ScaleY, ...measurement);
}

export function translate(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.Translate, ...measurement);
}

export function translateX(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.TranslateX, ...measurement);
}

export function translateY(
  ...measurement: Measurement[]
) {
  return createTransformType(Transforms.TranslateY, ...measurement);
}
