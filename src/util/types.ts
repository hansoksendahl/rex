export type AnyFunction<T = any> = (..._: any[]) => T;

export type AnyStringKeyedObject = {
  [_: string]: string;
};

export type WithFallback<
  T extends object,
  U,
  V extends keyof T,
> = U extends keyof T ? T[U] : T[V];

export type CompareFunction<T = any, U = any> = (a: T, b: U) => boolean;