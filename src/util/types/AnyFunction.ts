/** @author Hans Oksendahl */
type AnyFunction<
  A extends any[] = any[],
  B = any,
> = (..._: A) => B;

export default AnyFunction;
