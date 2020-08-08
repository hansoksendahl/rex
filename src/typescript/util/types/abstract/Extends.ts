export type ExtendsLeft<
  A,
  B,
  C = never,
> = A extends B ? A : C;

export type ExtendsRight<
  A,
  B,
  C = never,
> = A extends B ? B : C;

export type Extends<A, B, C = never> = ExtendsLeft<A, B, C>;
